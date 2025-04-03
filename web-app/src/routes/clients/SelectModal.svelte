<script lang="ts">
    import { onMount } from "svelte";
    import { repository, Client } from "$lib/models/clients";
    import { t } from "$lib/translations/index";
    import { createDeferred, Deferred } from "$lib/base/deferred";
    import Pagination from "$lib/components/navigation/Pagination.svelte";

    let deferred: Deferred<Client | null>;
    let modal: HTMLDialogElement;

    let clients = $state<Client[]>([]);
    let selectedClient = $state<Client | null>(null);

    let page = $state<number>(1);
    let total = $state<number>(1);
    let capacity = $state<number>(25);
    let searchText = $state<string>("");


    $effect(() => {
        selectedClient = null;
        repository.search(searchText, page, capacity).then((paginated) => {
            clients = paginated.results;
            total = paginated.total;
        });
    });

    async function select() {
        close(true);
    }

    export function show(_client: Client): Promise<Client | null> {
        deferred = createDeferred<Client | null>();
        modal.show();
        return deferred.promise;
    }

    export function close(success: boolean = false) {
        modal.close();
        deferred.resolve(success ? selectedClient : null);
    }
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box min-h-[30rem] flex flex-col">
        <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onclick={() => close()}>✕</button
        >
        <h3 class="text-lg font-bold">Sélectionner un client</h3>

        <label class="input w-full mt-2 input-sm">
            <i class="fa-solid fa-magnifying-glass opacity-50"></i>
            <input type="search" required placeholder="Recherche" bind:value={searchText} />
        </label>
        <ul class="list bg-base-100 rounded-box shadow-md mt-1">
            {#each clients as client}
                <li class="list-row p-2 cursor-pointer" class:bg-primary={client == selectedClient} onclick={() => (selectedClient = client)} >
                    <div>{client.fullName}</div>
                    <div class="ms-auto my-auto text-xs uppercase font-semibold opacity-60">
                        {client.fullAddress}
                    </div>
                </li>
            {/each}
        </ul>

        <div class="mt-auto pt-1">
            <Pagination bind:total bind:page bind:capacity />
        </div>

        <div class="modal-action mt-1">
            <button class="btn" onclick={() => close()}
                >{$t("common.cancel")}</button
            >
            <button class="btn btn-primary" class:btn-disabled={selectedClient == null} onclick={select}
                >Sélectionner</button
            >
        </div>
    </div>
    <div class="modal-backdrop">
        <button onclick={() => close()}> Close </button>
    </div>
</dialog>
