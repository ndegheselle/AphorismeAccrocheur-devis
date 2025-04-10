<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { t } from "$lib/translations/index";
    import { repository, Client } from "$lib/models/clients";
    import {
        repository as repositoryEstimate,
        Estimate,
    } from "$lib/models/estimates";
    import confirmation from "$lib/stores/confirm.svelte";
    import { goto } from "$app/navigation";
    import alerts from "$lib/stores/alerts.svelte";
    import Edit from "../EditModal.svelte";
    import Summary from "../Summary.svelte";

    let editModal: Edit;
    let client: Client | undefined;
    let estimates: Estimate[] = [];

    onMount(async () => {
        client = await repository.getById(page.params.id);
        estimates = await repositoryEstimate.getByClient(client?.$id!);
    });

    function remove() {
        confirmation
            .show(
                "Supprimer le client",
                "Êtes-vous sûr de vouloir supprimer ce client ?",
            )
            .then(async (result) => {
                if (!result) return;
                if (client?.$id == null) return;
                await repository.remove(client.$id);
                goto("/clients");
                alerts.success("Client supprimé avec succès !");
            });
    }

    async function edit() {
        if (client == null) return;
        let edited = await editModal.show(client);
        if (edited) {
            client = edited;
        }
    }
</script>

<div class="container mx-auto py-4">
    <div class="grid grid-cols-2 gap-2">
        <div class="col-span-2 card bg-base-300 shadow-md">
            <div class="card-body">
                <div class="flex">
                    <h2 class="card-title">
                        <i class="fa-solid fa-user"></i>
                        Client
                    </h2>
                    <details class="ms-auto dropdown dropdown-end">
                        <summary class="btn btn-ghost">
                            <i class="fa-solid fa-ellipsis"></i>
                        </summary>
                        <ul
                            class="menu dropdown-content bg-base-100 rounded-box shadow-md">
                            <li>
                                <button onclick={edit}>
                                    <i class="fa-solid fa-pen"></i>
                                     Modifier
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

                <Summary {client} />
            </div>
        </div>
        <div class="col-span-2 md:col-span-1 card bg-base-200 shadow-md">
            <div class="card-body">
                <div class="flex">
                    <h2 class="card-title">
                        <i class="fa-solid fa-file-invoice"></i>
                        {$t("navigation.estimates")}
                    </h2>
                    <a
                        class="ms-auto btn btn-circle"
                        href="/estimates/new?clientId={client?.$id}"
                        aria-label="Add estimate">
                        <i class="fa-solid fa-plus"></i>
                    </a>
                </div>

                {#if estimates.length === 0}
                    <div class="flex h-20">
                        <span class="text-sm m-auto opacity-60">
                            Aucun devis trouvé
                        </span>
                    </div>
                {:else}
                    <ul class="list bg-base-100 rounded-box shadow-md">
                        {#each estimates as estimate}
                            <li class="list-row p-2">
                                <a href="/estimates/{estimate.$id}">
                                    <span class="font-semibold">
                                        {estimate.reference}
                                    </span>
                                    <span class=" text-xs">
                                        {estimate.name}
                                    </span>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        </div>
        <div class="col-span-2 md:col-span-1 card bg-base-200 shadow-md">
            <div class="card-body">
                <h2 class="card-title">
                    <i class="fa-solid fa-file"></i>
                    {$t("navigation.invoices")}
                </h2>
                <p>Coming soon</p>
            </div>
        </div>
    </div>
</div>
<Edit bind:this={editModal} />
