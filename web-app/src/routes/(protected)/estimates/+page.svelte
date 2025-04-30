<script lang="ts">
    import { t } from "$lib/translations/index";
    import { repository, Estimate } from "$lib/models/estimates";
    import Pagination from "$lib/components/navigation/Pagination.svelte";
    import { formatDate } from "$lib/base/utils";

    let page = $state<number>(1);
    let total = $state<number>(1);
    let capacity = $state<number>(25);
    let searchText = $state<string>("");

    let estimates = $state<Estimate[]>([]);

    $effect(() => {
        repository.getAll(page, capacity).then((paginated) => {
            estimates = paginated.results;
            total = paginated.total;
        });
    });

    $effect(() => {
        repository.search(searchText, page, capacity).then((paginated) => {
            estimates = paginated.results;
            total = paginated.total;
        });
    });

</script>

<div class="container mx-auto py-4">
    <div class="card bg-primary shadow-md">
        <div class="card-body">
            <h1 class="text-center text-2xl font-bold">
                Créer un nouveau devis
            </h1>
            <a class="btn mt-4 mx-auto" href="/estimates/new">
                <i class="fa-solid fa-plus"></i>
                {$t("common.new")}
            </a>
        </div>
    </div>
    <label class="input mt-2 ms-auto input-sm">
        <i class="fa-solid fa-magnifying-glass opacity-50"></i>
        <input type="search" required placeholder="Recherche" bind:value={searchText} />
      </label>
    

    <div
        class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-2"
    >
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Référence</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {#each estimates as estimate}
                    <tr>
                        <th>
                            <a href="/estimates/{estimate.$id}"
                                >{estimate.reference}</a
                            ></th
                        >
                        <td>{formatDate(estimate.issueDate)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <Pagination bind:total bind:page bind:capacity />
</div>
