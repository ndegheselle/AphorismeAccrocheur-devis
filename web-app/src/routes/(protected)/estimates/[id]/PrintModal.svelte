<script lang="ts">
    import serverless from "$lib/functions";
    import { Business } from "$lib/models/business";
    import { Client } from "$lib/models/clients";
    import { Estimate } from "$lib/models/estimates";
    import html from "$lib/pdf/html";
    import alerts from "$lib/stores/alerts.svelte";
    import { t } from "$lib/translations/index";

    let estimate = $state<Estimate>();
    let client = $state<Client>();
    let business = $state<Business | null>(null);
    let modal: HTMLDialogElement;
    let loading: HTMLDialogElement;
    let iframe: HTMLIFrameElement;

    async function print() {
        if (estimate?.$id == null) return;

        modal.close();
        loading.show();
        try {
            await serverless.generateEstimatePdf(estimate);
        } catch {
            alerts.error("Impossible de générer le PDF.");
        }
        loading.close();
    }

    export async function show(
        _business: Business | null,
        _estimate: Estimate,
        _client: Client,
    ) {
        business = _business;
        estimate = _estimate;
        client = _client;
        modal.showDialog();

        iframe.srcdoc = await html.generateEstimate(business, client, estimate);
    }

    export function close() {
        modal.close();
    }
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box h-11/12 max-w-4xl flex flex-col">
        <iframe
            bind:this={iframe}
            title="Preview PDF"
            class="w-full h-full rounded-md">
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

<dialog bind:this={loading} class="modal">
    <div class="modal-box flex justify-center">
        <span class="loading loading-infinity loading-xl"></span>
        <span class="text-xl ms-4">Génération du pdf en cours ...</span>
    </div>
</dialog>