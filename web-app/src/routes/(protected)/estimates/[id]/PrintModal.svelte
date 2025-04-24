<script lang="ts">
    import { t } from "$lib/translations/index";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { repository, Estimate } from "$lib/models/estimates";
    import { repository as clientRepo, Client } from "$lib/models/clients";
    import alerts from "$lib/stores/alerts.svelte";
    import { repository as businessRepo, Business } from "$lib/models/business";
    import serverless from "$lib/functions";
    import html from 'template-generator/html';

    let estimate = $state<Estimate>();
    let client = $state<Client>();
    let business = $state<Business | null>(null);
    let modal: HTMLDialogElement;
    let iframe: HTMLIFrameElement;

    onMount(async () => {
        estimate = await repository.getById(page.params.id);
        client = await clientRepo.getById(estimate?.clientId!);
        business = await businessRepo.getFirstOrDefault();
        // Ici on aime niconi <3
    });

    async function print() {
        if (estimate?.$id == null) return;

        try {
            await serverless.generateEstimatePdf(estimate);
        } catch {
            alerts.error("Impossible de générer le PDF.");
        }
    }

    export function show(_business: Business | null, _estimate: Estimate | undefined) {
        business = _business;
        estimate = _estimate;
        modal.show();
    }

    export function close() {
        modal.close();
    }
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box flex justify-center">

        <iframe bind:this={iframe} title="Preview PDF">

        </iframe>

        <div class="modal-action">
            <button class="btn" onclick={() => close()}>
                {$t("common.cancel")}
            </button>
            <button class="btn btn-primary" onclick={() => print()}>
                Imprimmer
            </button>
        </div>
    </div>
</dialog>

<!--
<div class="modal-box flex justify-center">
    <span class="loading loading-infinity loading-xl"></span>
    <span class="text-xl ms-4">
        Génération du pdf en cours ...
    </span>
</div>
-->