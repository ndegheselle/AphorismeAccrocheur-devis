<script lang="ts">
    import { repository, Client } from "$lib/models/clients";
    import alerts from "$lib/stores/alerts.svelte";
    import { t } from "$lib/translations/index";
    import { clearErrors, displayErrors } from "$lib/base/errors";
    import { createDeferred, Deferred } from "$lib/base/deferred";

    let fieldset: HTMLFieldSetElement;
    let client: Client = new Client();
    let deferred: Deferred<Client | null>;
    let modal: HTMLDialogElement;

    async function save() {
        clearErrors(fieldset);
        let errors = await client.checkErrors();
        if (errors.length > 0) {
            displayErrors(fieldset, errors);
            return;
        }

        try {
            // Create client
            if (clientExist()) client = await repository.update(client);
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

    function clientExist() {
        return !!client.$id;
    }

</script>

<dialog bind:this={modal} class="modal">
    <fieldset
        class="fieldset w-md modal-box bg-base-200 border border-base-300 p-4 rounded-box"
        bind:this={fieldset}
    >
        <legend class="fieldset-legend"
            >{clientExist() ? $t("clients.edit") : $t("clients.new")}</legend
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
                    class="input"
                    bind:value={client.lastName}
                />
            </div>
        </div>
        <label class="fieldset-label" for="adress"
            >{$t("clients.adress")} *</label
        >
        <input
            type="text"
            class="input w-full"
            name="adress"
            bind:value={client.adress}
        />

        <div class="grid grid-cols-3 gap-2">
            <div class="col-span-2">
                <label class="fieldset-label" for="city"
                    >{$t("clients.city")} *</label
                >
                <input
                    type="text"
                    class="input"
                    name="city"
                    bind:value={client.city}
                />
            </div>
            <div class="col-span-1">
                <label class="fieldset-label" for="zipCode"
                    >{$t("clients.zipCode")} *</label
                >
                <input
                    type="text"
                    class="input"
                    name="zipCode"
                    bind:value={client.zipCode}
                />
            </div>
        </div>
        <label class="fieldset-label" for="email">{$t("clients.email")}</label>
        <input
            type="email"
            class="input w-full"
            name="email"
            bind:value={client.email}
        />
        <label class="fieldset-label" for="phone">{$t("clients.phone")}</label>
        <input
            type="tel"
            class="input w-full"
            name="phone"
            bind:value={client.phone}
        />
        <p class="fieldset-label">{$t("common.fields.required")}</p>
        <div class="modal-action">
            <button class="btn" onclick={() => modal.close()}
                >{$t("common.cancel")}</button
            >
            <button class="btn btn-primary" onclick={() => save()}
                >{clientExist()
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