<script lang="ts">
    import { t } from "$lib/translations/index";
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

    async function print() {
        if (estimate?.$id == null) return;

        try {
            await serverless.generateEstimatePdf(estimate);
        } catch {
            alerts.error("Impossible de générer le PDF.");
        }
    }

    export async function show(_business: Business | null, _estimate: Estimate, _client: Client) {
        business = _business;
        estimate = _estimate;
        client = _client;
        modal.show();
        
        iframe.srcdoc = await html.generateEstimate({
            logoUrl: business?.logoUrl
        }, {});
        console.log(iframe.srcdoc);
    }

    export function close() {
        modal.close();
    }
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box h-11/12 w-lg flex flex-col">

        <iframe bind:this={iframe} title="Preview PDF" class="w-full h-full rounded-md">

        </iframe>

        <div class="modal-action">
            <button class="btn" onclick={() => close()}>
                {$t("common.cancel")}
            </button>
            <button class="btn btn-primary" onclick={() => print()}>
                Imprimer
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