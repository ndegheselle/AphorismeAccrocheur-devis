<script lang="ts">
    let { business } = $props();
</script>

{#if business}
<div class="flex gap-2">
    <div class="avatar">
        <div class="w-24 rounded">
            <img src={business.logoUrl} alt="Logo" />
        </div>
    </div>
    <div class="grow">
        <b>{business.name}</b>
        <p>{business.fullAddress}</p>
        {#if business.email}
            <a href="mailto:{business.email}">{business.email}</a>
        {/if}
        {#if business.phone}
            <a href="tel:{business?.phone}">{business.phone}</a>
        {/if}
    </div>
</div>
{:else}
<div class="flex h-16">
    <span class="text-sm m-auto opacity-60">
        <i class="fa-regular fa-building me-2"></i> L'entreprise n'est pas configuré
    </span>
</div>
{/if}
