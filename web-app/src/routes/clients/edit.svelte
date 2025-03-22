<script lang="ts">
    let { modal = $bindable() } = $props();
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <h3 class="text-lg font-bold">Nouveau client</h3>
        <fieldset class="fieldset">
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label class="fieldset-label" for="firstname">Prénom</label>
                    <input type="text" class="input" name="firstname" />
                </div>
                <div>
                    <label class="fieldset-label" for="lastname">Nom</label>
                    <input type="text" name="lastname" class="input" />
                </div>
            </div>
            <label class="fieldset-label" for="adress">Adresse</label>
            <input type="text" class="input w-full" name="adress" />

            <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2">
                    <label class="fieldset-label" for="lastname">Ville</label>
                    <input type="text" name="lastname" class="input" />
                </div>
                <div class="col-span-1">
                    <label class="fieldset-label" for="firstname"
                        >Code postal</label
                    >
                    <input type="text" class="input" name="firstname" />
                </div>
            </div>
            <label class="fieldset-label" for="email">Email</label>
            <input type="email" class="input w-full" name="email" />
            <label class="fieldset-label" for="phone">Téléphone</label>
            <input type="tel" class="input w-full" name="phone" />
        </fieldset>
        <div class="modal-action">
            <button class="btn" onclick={() => modal.close()}>Annuler</button>
            <button class="btn btn-primary" onclick={() => modal.close()}>Créer</button>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
