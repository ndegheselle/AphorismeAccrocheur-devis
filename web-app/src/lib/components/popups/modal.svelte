<script lang="ts">
    type Deferred<T = void> = {
        promise: Promise<T>;
        resolve: (value: T) => void;
        reject: (reason?: any) => void;
    };

    function createDeferred<T = void>(): Deferred<T> {
        let resolve!: (value: T) => void;
        let reject!: (reason?: any) => void;

        const promise = new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
        });

        return { promise, resolve, reject };
    }

    function show() {
        deferred = createDeferred<boolean>();
        modal.showModal();
        return deferred.promise;
    }

    function close(success: boolean = false) {
        modal.close();
        deferred.resolve(success);
    }

    let deferred: Deferred<boolean>;
    let modal: HTMLDialogElement;
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
