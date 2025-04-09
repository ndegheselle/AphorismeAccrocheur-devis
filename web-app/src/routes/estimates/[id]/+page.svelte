<script lang="ts">
    import { t } from "$lib/translations/index";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { repository, Estimate } from "$lib/models/estimates";
    import {
        repository as clientRepo,
        Client,
    } from "$lib/models/clients";
    import { round, formatDate } from "$lib/base/utils";
    import { goto } from "$app/navigation";
    import confirmation from "$lib/stores/confirm.svelte";
    import alerts from "$lib/stores/alerts.svelte";
    import ClientSummary from "$routes/clients/Summary.svelte";
    import BusinessSummary from "$routes/user/business/Summary.svelte";
    import { repository as businessRepo, Business } from "$lib/models/business";

    let estimate = $state<Estimate>();
    let client = $state<Client>();
    let business = $state<Business | null>(null);

    onMount(async () => {
        estimate = await repository.getById(page.params.id);
        client = await clientRepo.getById(estimate?.clientId!);
        business = await businessRepo.getFirstOrDefault();
    });

    function clone() {
        goto(`/estimates/new?basedOn=${estimate?.$id}`);
    }

    function print() {}

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
                </h1>
                <details class="ms-auto dropdown dropdown-end">
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
                            <button onclick={print}>
                                <i class="fa-solid fa-print"></i>
                                Imprimer
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
            <div class="card-body">
                <h2 class="card-title">Total</h2>
                <div>
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
                        <span class="ms-auto text-right">
                            {estimate?.total}€
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
