<script lang="ts">
    import { t } from "$lib/translations/index";
    let { page = 1, total = 1, capacity = 25 } = $props();
</script>

<div class="join mt-2 mx-auto">
    <button class="join-item btn" class:btn-disable={page == 1}><i class="fa-solid fa-chevron-left"></i></button>
    <button class="join-item btn">Page {page}</button>
    <button class="join-item btn" class:btn-disable={page * capacity >= total}><i class="fa-solid fa-chevron-right"></i></button>
</div>