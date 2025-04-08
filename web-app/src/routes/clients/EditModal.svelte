<script lang="ts">
    import { repository, Client } from "$lib/models/clients";
    import { hasErrors, errors } from "$lib/models/clients.svelte";
    import alerts from "$lib/stores/alerts.svelte";
    import { t } from "$lib/translations/index";
    import { createDeferred, Deferred } from "$lib/base/deferred";

    let client = $state<Client>(new Client());
    let deferred: Deferred<Client | null>;
    let modal: HTMLDialogElement;

    async function save() {
        if (hasErrors(client)) return;
        
        try {
            // Create client
            if (client.exists) client = await repository.update(client);
            else client = await repository.create(client);
            close(true);
        } catch {
            alerts.error($t("clients.edit.error"));
        }
    }

    export function show(_client: Client): Promise<Client | null>  {
        deferred = createDeferred<Client | null>();
        modal.show();
        return deferred.promise;
    }

    export function close(success: boolean = false) {
        modal.close();
        deferred.resolve(success ? client : null);
    }

</script>

<dialog bind:this={modal} class="modal">
    <fieldset
        class="fieldset w-md modal-box bg-base-200 border border-base-300 p-4 rounded-box"
    >
        <legend class="fieldset-legend"
            >{client.exists ? $t("clients.edit") : $t("clients.new")}</legend
        >
        <div class="grid grid-cols-3 gap-2">
            <div>
                <label class="fieldset-label" for="firstName"
                    >{$t("clients.firstName")}</label
                >
                <input
                    type="text"
                    class="input"
                    required
                    name="firstName"
                    bind:value={client.firstName}
                />
            </div>
            <div class="col-span-2">
                <label class="fieldset-label" for="lastName"
                    >{$t("clients.lastName")} *</label
                >
                <input
                    type="text"
                    name="lastName"
                    class:input-error={errors.lastName}
                    class="input"
                    bind:value={client.lastName}
                />
                <p class="fieldset-label text-error">{errors.lastName}</p>
            </div>
        </div>
        <div>
            <label class="fieldset-label" for="adress"
                >{$t("clients.adress")} *</label
            >
            <input
                type="text"
                class="input w-full"
                class:input-error={errors.adress}
                name="adress"
                bind:value={client.adress}
            />
            <p class="fieldset-label text-error">{errors.adress}</p>
        </div>
        <div class="grid grid-cols-3 gap-2">
            <div class="col-span-2">
                <label class="fieldset-label" for="city"
                    >{$t("clients.city")} *</label
                >
                <input
                    type="text"
                    class="input"
                    class:input-error={errors.city}
                    name="city"
                    bind:value={client.city}
                />
                <p class="fieldset-label text-error">{errors.city}</p>
            </div>
            <div class="col-span-1">
                <label class="fieldset-label" for="zipCode"
                    >{$t("clients.zipCode")} *</label
                >
                <input
                    type="text"
                    class="input"
                    class:input-error={errors.zipCode}
                    name="zipCode"
                    bind:value={client.zipCode}
                />
                <p class="fieldset-label text-error">{errors.zipCode}</p>
            </div>
        </div>
        <div>
            <label class="fieldset-label" for="email">{$t("clients.email")}</label>
            <input
                type="email"
                class="input w-full"
                class:input-error={errors.email}
                name="email"
                bind:value={client.email}
            />
            <p class="fieldset-label text-error">{errors.email}</p>
        </div>
        <div>
            <label class="fieldset-label" for="phone">{$t("clients.phone")}</label>
            <input
                type="tel"
                class="input w-full"
                class:input-error={errors.phone}
                name="phone"
                bind:value={client.phone}
            />
            <p class="fieldset-label text-error">{errors.phone}</p>
        </div>
        <p class="fieldset-label">{$t("common.fields.required")}</p>
        <div class="modal-action">
            <button class="btn" onclick={() => close()}
                >{$t("common.cancel")}</button
            >
            <button class="btn btn-primary" onclick={() => save()}
                >{client.exists
                    ? $t("common.update")
                    : $t("common.create")}</button
            >
        </div>
    </fieldset>
    <div class="modal-backdrop">
        <button onclick={() => close()}>
            Close
        </button>
    </div>
</dialog>