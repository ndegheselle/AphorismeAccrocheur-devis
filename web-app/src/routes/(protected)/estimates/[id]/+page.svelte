<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { formatDate } from "$lib/base/utils";
    import { Business, repository as businessRepo } from "$lib/models/business";
    import { Client, repository as clientRepo } from "$lib/models/clients";
    import { Estimate, repository } from "$lib/models/estimates";
    import alerts from "$lib/stores/alerts.svelte";
    import confirmation from "$lib/stores/confirm.svelte";
    import { onMount } from "svelte";
    import ClientSummary from "../../clients/Summary.svelte";
    import BusinessSummary from "../../user/business/Summary.svelte";
    import PrintModal from "./PrintModal.svelte";

    let estimate = $state<Estimate>();
    let client = $state<Client>();
    let business = $state<Business | null>(null);
    let modal: PrintModal;

    onMount(async () => {
        estimate = await repository.getById(page.params.id);
        business = await businessRepo.getFirstOrDefault();
        client = await clientRepo.getById(estimate?.clientId!);
    });

    function clone() {
        goto(`/estimates/new?basedOn=${estimate?.$id}`);
    }

    function createInvoice() {
        confirmation
            .show(
                "Facturer le devis",
                "Êtes-vous sûr de vouloir transformer ce devis en facture ?",
                "fa-file-invoice-dollar",
            )
            .then(async (result) => {
                if (!result) return;
                if (estimate?.$id == null) return;
                await repository.bill(estimate.$id);
                estimate.isBilled = true;
                alerts.success("Devis facturé avec succès !");
            });
    }

    function remove() {
        confirmation
            .show(
                "Supprimer le devis",
                "Êtes-vous sûr de vouloir supprimer ce devis ?",
            )
            .then(async (result) => {
                if (!result) return;
                if (estimate?.$id == null) return;
                await repository.remove(estimate.$id);
                goto("/estimates");
                alerts.success("Devis supprimé avec succès !");
            });
    }
</script>

<div class="container mx-auto py-4 h-full flex flex-col">
    <div class="card bg-base-300 shadow-md">
        <div class="card-body">
            <div class="flex">
                <h1 class="text-2xl my-auto font-thin">
                    Devis - {estimate?.reference} 
                    {#if estimate?.isBilled}
                    <div class="badge badge-primary">Facturé</div>
                    {/if}
                </h1>

                <details class="dropdown dropdown-end ms-auto">
                    <summary class="btn btn-ghost">
                        <i class="fa-solid fa-ellipsis"></i>
                    </summary>
                    <ul
                        class="menu dropdown-content bg-base-100 rounded-box shadow-md">
                        <li>
                            <button onclick={clone}>
                                <i class="fa-solid fa-clone"></i>
                                Copier
                            </button>
                        </li>
                        <li>
                            <button onclick={() => modal.show(business, estimate!, client!)}>
                                <i class="fa-solid fa-print"></i>
                                Imprimer
                            </button>
                        </li>
                        <li>
                            <button onclick={createInvoice}>
                                <i class="fa-solid fa-file-invoice-dollar"></i>
                                Facturer
                            </button>
                        </li>
                        <li>
                            <button class="text-error" onclick={remove}>
                                <i class="fa-solid fa-trash"></i>
                                Supprimer
                            </button>
                        </li>
                    </ul>
                </details>
            </div>

            <span>
                <b>Date :</b>
                {formatDate(estimate?.issueDate)}
            </span>
            <span>
                <b>Échéance :</b>
                {formatDate(estimate?.validityDate)}
            </span>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-2">
        <div class="card bg-base-200 shadow-md">
            <div class="card-body">
                <BusinessSummary {business} />
            </div>
        </div>
        <div class="card bg-base-200 shadow-md">
            <div class="card-body">
                <ClientSummary {client} />
            </div>
        </div>
    </div>

    <div
        class="flex-grow overflow-y-auto mt-2 overflow-x-auto rounded-box border border-base-content/5 bg-base-200">
        <table class="table table-xs table-pin-rows table-pin-cols">
            <thead>
                <tr>
                    <td width="100%">Nom</td>
                    <td>Prix (€)</td>
                    <td>Quantité</td>
                    <td>Total TVA</td>
                    <td>Total HT</td>
                </tr>
            </thead>
            <tbody>
                {#each estimate?.lines || [] as line}
                    <tr>
                        <td>{line.name}</td>
                        <td>{line.unitPrice}€</td>
                        <td>{line.quantity}</td>
                        <td>{line.totalTax}€</td>
                        <td class="flex">
                            <span>{line.totalWithoutTax}€</span>
                            {#if line.discount}
                                <span
                                    class="ms-2 badge badge-xs badge-soft badge-success">
                                    {-line.discount}%
                                </span>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-6 mt-2 gap-2">
        <div
            class="card bg-base-200 shadow-md col-span-2 lg:col-span-1 lg:col-start-6 lg:col-end-7">
            <div class="card-body gap-0">
                <h2 class="card-title">Total</h2>
                <div class="flex">
                    <span class="font-thin opacity-50">HT</span>
                    <span class="ms-auto text-right">
                        {estimate?.totalWithoutTax}€
                    </span>
                </div>
                <div class="flex">
                    <span class="font-thin opacity-50">TVA</span>
                    <span class="ms-auto text-right">
                        {estimate?.totalTax}€
                    </span>
                </div>
                <div class="flex">
                    <span class="font-thin opacity-50">TTC</span>
                    <b class="ms-auto text-right">
                        {estimate?.total}€
                    </b>
                </div>
            </div>
        </div>
    </div>
</div>

<PrintModal bind:this={modal} />