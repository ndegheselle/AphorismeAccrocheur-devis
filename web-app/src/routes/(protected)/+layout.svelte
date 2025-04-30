<script>
    import auth from '$lib/stores/auth.svelte';
    let { children } = $props();
</script>

{#if auth.isConnected}
{@render children()}
{:else}
<div class="h-full flex">
    <span class="loading loading-spinner mx-auto my-auto"></span>
</div>
{/if}
