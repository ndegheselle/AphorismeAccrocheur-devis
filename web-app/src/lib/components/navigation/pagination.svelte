<script lang="ts">
    import { t } from "$lib/translations/index";
    let {
        page = $bindable(1),
        total = $bindable(25),
        capacity = $bindable(25),
    } = $props();

    let totalPages = $derived(Math.ceil(total / capacity));;
</script>

<div class="join mt-2 mx-auto">
    <button
        class="join-item btn"
        aria-label="Première page"
        onclick="{() => page = 1}"
        ><i class="fa-solid fa-backward-step"></i></button
    >
    <button
        class="join-item btn"
        class:btn-disable={page <= 1}
        aria-label="Page précédente"
        onclick="{() => page = page - 1}"
        ><i class="fa-solid fa-chevron-left"></i></button
    >
    <span class="join-item p-2">{page} / {totalPages}</span>
    <button
        class="join-item btn"
        class:btn-disable={page >= totalPages}
        aria-label="Page suivante"
        onclick="{() => page = page + 1}"
        ><i class="fa-solid fa-chevron-right"></i></button
    >
    <button
        class="join-item btn"
        onclick="{() => page = totalPages}"
        aria-label="Dernière page"
        ><i class="fa-solid fa-forward-step"></i></button
    >
</div>
