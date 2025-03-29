<script lang="ts">
    import { createDeferred, Deferred } from "$lib/base/deferred";

    let deferred: Deferred<boolean>;
    let modal: HTMLDialogElement;
    
    export function show() {
        deferred = createDeferred<boolean>();
        modal.show();
        return deferred.promise;
    }

    export function close(success: boolean = false) {
        modal.close();
        deferred.resolve(success);
    }

    let { children } = $props();
</script>

<dialog bind:this={modal} class="modal">
    {@render children?.()}
    <div class="modal-backdrop">
        <button onclick={() => close()}>
            Close
        </button>
    </div>
</dialog>
