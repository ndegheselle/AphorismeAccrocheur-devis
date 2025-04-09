<script lang="ts">
    let { client } = $props();
</script>

{#if client}
    <div class="flex">
        <h2 class="card-title">
            {client.fullName}
        </h2>
    </div>

    <p>{client.fullAddress}</p>
    {#if client.email}
        <a href="mailto:{client.email}">{client.email}</a>
    {/if}
    {#if client.phone}
        <a href="tel:{client.phone}">{client.phone}</a>
    {/if}
{:else}
    <div class="flex h-16">
        <span class="text-sm m-auto opacity-60">
            <i class="fa-regular fa-user me-2"></i> Client non renseigné
        </span>
    </div>
{/if}
