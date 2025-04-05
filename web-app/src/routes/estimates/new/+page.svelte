<script lang="ts">
    import { t } from "$lib/translations/index";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import {
        repository as repositoryClient,
        Client,
    } from "$lib/models/clients";
    import { repository, EstimateLine, Estimate } from "$lib/models/estimates";
    import { hasErrors, errors } from "$lib/models/estimates.svelte";
    import LineEditModal from "./LineEditModal.svelte";
    import EditClientModal from "../../clients/EditModal.svelte";
    import SelectClientModal from "../../clients/SelectModal.svelte";
    import { createRandomRef, round } from "$lib/base/utils";
    import alerts from "$lib/stores/alerts.svelte";

    let client = $state<Client | null>(null);
    let lines = $state<EstimateLine[]>([]);
    let estimateInfos = $state({
        name: "Devis",
        reference: createRandomRef(),
        discountOnTotal: 0,
        issueDate: new Date().toISOString().split("T")[0],
        validityDate: null,
    });

    let selectedLine: EstimateLine | null = null;
    let editModal: LineEditModal;
    let popover: HTMLUListElement | null = null;
    let editClientModal: EditClientModal;
    let selectClientModal: SelectClientModal;

    let totalHT = $derived(
        lines.reduce((acc, line) => acc + line.totalWithoutTax, 0),
    );
    let totalTVA = $derived(
        lines.reduce((acc, line) => acc + line.totalTax, 0),
    );
    let totalTTC = $derived(lines.reduce((acc, line) => acc + line.total, 0));

    onMount(async () => {
        let clientId = page.url.searchParams.get("clientId");
        if (clientId) {
            client = await repositoryClient.getById(clientId);
        }
    });

    async function add() {
        let line = await editModal.show();
        if (line == null) return;
        lines.push(line);
    }

    function removeSelected() {
        if (selectedLine == null) return;
        // Close popover
        popover?.togglePopover(false);
        lines = lines.filter((l) => l !== selectedLine);
    }

    async function editSelected() {
        if (selectedLine == null) return;
        // Open modal
        let edited = await editModal.show(selectedLine);
        if (edited == null) return;

        // Update line in lines array
        let index = lines.indexOf(selectedLine);
        if (index !== -1) {
            lines[index] = edited;
        }
    }

    async function createClient() {
        client = await editClientModal.show(new Client());
    }

    async function selectClient() {
        client = await selectClientModal.show(new Client());
    }

    async function save() {
        let estimate = new Estimate();
        estimate.name = estimateInfos.name;
        estimate.client = client;
        estimate.lines = lines;
        estimate.reference = estimateInfos.reference;
        estimate.issueDate = estimateInfos.issueDate
            ? new Date(Date.parse(estimateInfos.issueDate))
            : null;
        estimate.validityDate = estimateInfos.validityDate
            ? new Date(Date.parse(estimateInfos.validityDate))
            : null;
        estimate.discount = estimateInfos.discountOnTotal;

        if (hasErrors(estimate)) {
            alerts.error(Object.values(errors).filter(Boolean).join(", "));
            return;
        }

        try {
            await repository.create(estimate);
        } catch (e) {
            console.error(e);
            alerts.error($t("estimates.create.error"));
        }
    }
</script>

<div class="container mx-auto py-4 h-full flex flex-col">
    <div class="flex">
        <input
            type="text"
            class="input input-ghost text-2xl my-auto font-thin w-full"
            bind:value={estimateInfos.name}
        />
        <button class="ms-2 btn btn-primary" onclick={save}>
            <i class="fa-solid fa-save"></i> Sauvegarder
        </button>
        <button
            class="ms-2 btn btn-circle"
            aria-label="Ajouter une ligne"
            onclick={add}
        >
            <i class="fa-solid fa-plus"></i>
        </button>
    </div>
    <div
        class="flex-grow overflow-y-auto mt-2 overflow-x-auto rounded-box border border-base-content/5 bg-base-200"
    >
        <table class="table table-xs table-pin-rows table-pin-cols">
            <thead>
                <tr>
                    <td width="100%">Nom</td>
                    <td>Prix (€)</td>
                    <td>Quantité</td>
                    <td>TVA (%)</td>
                    <td>Réduction (%)</td>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each lines as line}
                    <tr>
                        <td>{line.name}</td>
                        <td>{line.unitPrice}</td>
                        <td>{line.quantity}</td>
                        <td>{line.tax}</td>
                        <td>{line.discount}</td>
                        <td>
                            <button
                                class="btn btn-ghost"
                                aria-label="Actions"
                                popovertarget="line-edit"
                                style="anchor-name:--anchor-1"
                                onclick={() => {
                                    selectedLine = line;
                                }}
                            >
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-6 mt-2 gap-2">
        <div
            class="col-span-2 card bg-base-200 shadow-md min-h-40"
            class:border-error={errors.client}
        >
            {#if client}
                <div class="card-body py-2">
                    <div class="flex">
                        <h2 class="card-title">
                            <i class="fa-solid fa-user"></i>
                            {client?.firstName}
                            {client?.lastName}
                        </h2>
                        <button
                            class="btn btn-circle ms-auto"
                            aria-label="Modifier client"
                            onclick={() => (client = null)}
                        >
                            <i class="fa-solid fa-close"></i>
                        </button>
                    </div>

                    <p>{client?.adress}, {client?.city} {client?.zipCode}</p>
                    {#if client?.email}
                        <a href="mailto:{client?.email}">{client?.email}</a>
                    {/if}
                    {#if client?.phone}
                        <a href="tel:{client?.phone}">{client?.phone}</a>
                    {/if}
                </div>
            {:else}
                <div class="card-body py-2">
                    <div class=" m-auto flex flex-col">
                        <button class="btn" onclick={selectClient}>
                            <i class="fa-solid fa-user"></i>
                            Sélectionner un client
                        </button>
                        <div class="divider">OU</div>
                        <button class="btn mx-auto" onclick={createClient}>
                            <i class="fa-solid fa-plus"></i>
                            Créer un client
                        </button>
                    </div>
                </div>
            {/if}
        </div>
        <div class="col-span-2 card bg-base-200 shadow-md">
            <div class="card-body py-2">
                <h2 class="card-title">Infos</h2>
                <fieldset class="fieldset p-0">
                    <label
                        class="input w-full tooltip tooltip-left"
                        data-tip="Référence"
                        class:input-error={errors.reference}
                    >
                        <i class="fa-solid fa-hashtag opacity-50"></i>
                        <input
                            type="text"
                            class="grow"
                            placeholder="Référence"
                            bind:value={estimateInfos.reference}
                        />
                    </label>
                    <p class="fieldset-label text-error">{errors.reference}</p>
                    <label
                        class="input w-full tooltip tooltip-left"
                        data-tip="Date"
                        class:input-error={errors.issueDate}
                        ><i class="fa-solid fa-calendar-day opacity-50"></i>
                        <input
                            type="date"
                            class="grow"
                            placeholder="Date"
                            bind:value={estimateInfos.issueDate}
                        />
                    </label>
                    <p class="fieldset-label text-error">{errors.issueDate}</p>
                    <label
                        class="input w-full tooltip tooltip-left"
                        data-tip="Date d'échéance"
                        class:input-error={errors.validityDate}
                    >
                        <i class="fa-solid fa-calendar-xmark opacity-50"></i>
                        <input
                            type="date"
                            class="grow"
                            placeholder="Date d'échéance"
                            bind:value={estimateInfos.validityDate}
                        />
                    </label>
                    <p class="fieldset-label text-error">
                        {errors.validityDate}
                    </p>
                </fieldset>
            </div>
        </div>

        <div
            class="card bg-base-200 shadow-md col-span-2 lg:col-span-1 lg:col-start-6 lg:col-end-7"
        >
            <div class="card-body py-2">
                <h2 class="card-title">Total</h2>

                <label class="input w-full">
                    Réduction (%)
                    <input
                        type="number"
                        bind:value={estimateInfos.discountOnTotal}
                    />
                </label>
                <div>
                    <div class="flex">
                        <span class="font-thin opacity-50">HT</span>
                        <span class="ms-auto text-right"
                            >{round(totalHT)} €</span
                        >
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">TVA</span>
                        <span class="ms-auto text-right"
                            >{round(totalTVA)} €</span
                        >
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">TTC</span>
                        <span class="ms-auto text-right"
                            >{round(totalTTC)} €</span
                        >
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">Total</span>
                        <span class="ms-auto text-right"
                            >{round(
                                totalTTC *
                                    (1 - estimateInfos.discountOnTotal / 100),
                            )}
                            €</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Récupération du client -->
<!-- Info de -->

<ul
    bind:this={popover}
    class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
    popover
    id="line-edit"
    style="position-anchor:--anchor-1"
>
    <li>
        <button onclick={editSelected}
            ><i class="fa-solid fa-pen"></i> Modifier</button
        >
    </li>
    <li>
        <button class="text-error" onclick={removeSelected}
            ><i class="fa-solid fa-trash"></i> Supprimer</button
        >
    </li>
</ul>

<LineEditModal bind:this={editModal} />
<EditClientModal bind:this={editClientModal} />
<SelectClientModal bind:this={selectClientModal} />

<style>
    .border-error {
        border-color: var(--color-error) !important;
        border-width: 2px !important;
    }
</style>
