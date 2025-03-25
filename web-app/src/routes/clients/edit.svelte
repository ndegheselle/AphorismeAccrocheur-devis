<script lang="ts">
    import { Client } from "$lib/models/clients"
    import clients from "$lib/models/clients"

    let client: Client = new Client();
    let { modal = $bindable() } = $props();

    async function save()
    {
        console.log(await clients.create(client));
    }

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
                    <input type="text" class="input" required name="firstname" value={client.firstName}/>
                </div>
                <div>
                    <label class="fieldset-label" for="lastname">Nom</label>
                    <input type="text" name="lastname" class="input" value={client.lastName}/>
                </div>
            </div>
            <label class="fieldset-label" for="adress">Adresse</label>
            <input type="text" class="input w-full" name="adress" value={client.address}/>

            <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2">
                    <label class="fieldset-label" for="lastname">Ville</label>
                    <input type="text" name="lastname" class="input" value={client.city}/>
                </div>
                <div class="col-span-1">
                    <label class="fieldset-label" for="zipCode"
                        >Code postal</label
                    >
                    <input type="text" class="input" name="zipCode" value={client.zipCode}/>
                </div>
            </div>
            <label class="fieldset-label" for="email">Email</label>
            <input type="email" class="input w-full" name="email" value={client.email}/>
            <label class="fieldset-label" for="phone">Téléphone</label>
            <input type="tel" class="input w-full" name="phone" value={client.phone} />
        </fieldset>
        <div class="modal-action">
            <button class="btn" onclick={() => modal.close()}>Annuler</button>
            <button class="btn btn-primary" onclick={save}>Créer</button>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
