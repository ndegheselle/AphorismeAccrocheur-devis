<script lang="ts">
    import { t } from "$lib/translations/index";
    const capacityOptions = [5, 10, 25, 50, 100];
    let {
        page = $bindable(1),
        total = $bindable(25),
        capacity = $bindable(25),
    } = $props();

    let totalPages = $derived(Math.ceil(total / capacity));
</script>

<div class="flex mt-1">
    <div class="join">
        <button
            class="join-item btn btn-sm"
            class:btn-disabled={page <= 1}
            aria-label="Première page"
            onclick={() => (page = 1)}
            ><i class="fa-solid fa-backward-step"></i></button
        >
        <button
            class="join-item btn btn-sm"
            class:btn-disabled={page <= 1}
            aria-label="Page précédente"
            onclick={() => (page = page - 1)}
            ><i class="fa-solid fa-chevron-left"></i></button
        >
        <span class="join-item px-2 opacity-50 py-1">{page} / {totalPages}</span>
        <button
            class="join-item btn btn-sm"
            class:btn-disabled={page >= totalPages}
            aria-label="Page suivante"
            onclick={() => (page = page + 1)}
            ><i class="fa-solid fa-chevron-right"></i></button
        >
        <button
            class="join-item btn btn-sm"
            class:btn-disabled={page >= totalPages}
            onclick={() => (page = totalPages)}
            aria-label="Dernière page"
            ><i class="fa-solid fa-forward-step"></i></button
        >
    </div>
    <select class="select w-18 ms-auto select-sm" bind:value={capacity}>
        {#each capacityOptions as option}
            <option value={option} selected={option === capacity}>{option}</option>
        {/each}
    </select>
</div>
