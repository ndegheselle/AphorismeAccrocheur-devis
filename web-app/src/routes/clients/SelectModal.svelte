<script lang="ts">
    import { onMount } from "svelte";
    import { repository, Client } from "$lib/models/clients";
    import { t } from "$lib/translations/index";
    import { createDeferred, Deferred } from "$lib/base/deferred";
    import Pagination from "$lib/components/navigation/pagination.svelte";

    let selectedClient: Client = new Client();
    let deferred: Deferred<Client | null>;
    let modal: HTMLDialogElement;

    let clients = $state<Client[]>([]);

    let page = $state<number>(1);
    let total = $state<number>(1);
    let capacity = $state<number>(1);

    $effect(() => {
        repository.getAll(page, capacity).then((paginated) => {
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
    <div class="modal-box">
        <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onclick={() => close()}>✕</button
        >
        <h3 class="text-lg font-bold">Sélectionner un client</h3>

        <label class="input w-full mt-2">
            <i class="fa-solid fa-magnifying-glass opacity-50"></i>
            <input type="search" required placeholder="Recherche" />
        </label>
        <ul class="list bg-base-100 rounded-box shadow-md">
            {#each clients as client}
                <li class="list-row">
                    <div>
                        <div>{client.fullName}</div>
                        <div class="text-xs uppercase font-semibold opacity-60">
                            {client.fullAddress}
                        </div>
                    </div>
                </li>
            {/each}
        </ul>

        <div class="flex">
            <Pagination bind:total bind:page bind:capacity />
        </div>

        <div class="modal-action">
            <button class="btn" onclick={() => close()}
                >{$t("common.cancel")}</button
            >
            <button class="btn btn-primary" onclick={select}
                >Sélectionner</button
            >
        </div>
    </div>
    <div class="modal-backdrop">
        <button onclick={() => close()}> Close </button>
    </div>
</dialog>
