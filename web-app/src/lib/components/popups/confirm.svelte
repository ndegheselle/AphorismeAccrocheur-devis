<script lang="ts">
    import confirmation, { content } from "$lib/stores/confirm.svelte";
</script>

<dialog bind:this={content.modal} class="modal" onclose={() => confirmation.close()}>
    <div class="modal-box">
        <button
            onclick={() => confirmation.close()}
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button
        >
        <h3 class="text-lg font-bold">{content.title}</h3>
        <p class="py-4">{content.message}</p>
        <div class="modal-action">
            <button class="btn" onclick={() => confirmation.close()}>Annuler</button>
            <button class="btn btn-primary" onclick={() => confirmation.close(true)}
                >Confirmer</button
            >
        </div>
    </div>
    <div class="modal-backdrop">
        <button onclick={() => confirmation.close()}> Close </button>
    </div>
</dialog>