<script lang="ts">
    import { Business } from "$lib/models/business";
    import { t } from "$lib/translations/index";
    import { errors, hasErrors } from "$lib/models/business.svelte";
    import { repository } from "$lib/models/business";
    import alerts from "$lib/stores/alerts.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { createDeferred, Deferred } from "$lib/base/deferred";

    let business = $state<Business>(new Business());
    let files = $state<FileList | null>(null);
    let deferred: Deferred<Business | null>;
    let modal: HTMLDialogElement;

    onMount(async () => {
        // Check if we are editing an existing business
        let existingBusiness = await repository.getFirstOrDefault();
        if (existingBusiness) {
            business = existingBusiness;
        }
    });

    async function save() {
        if (hasErrors(business)) return;

        try {
            // Upload logo
            if (files && files.length > 0) {
                business.logoId = await repository.uploadLogo(files[0]);
            }

            if (business.exists) business = await repository.update(business);
            else business = await repository.create(business);

            goto("/dashboard");
        } catch {
            alerts.error($t("business.edit.error"));
        }
    }

    export function show(_business: Business): Promise<Business | null> {
        business = _business;
        deferred = createDeferred<Business | null>();
        modal.show();
        return deferred.promise;
    }

    export function close(success: boolean = false) {
        modal.close();
        deferred.resolve(success ? business : null);
    }
</script>

<dialog bind:this={modal} class="modal">
    <fieldset
        class="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box mx-auto mb-2">
        <legend class="fieldset-legend">{$t("business.title")}</legend>

        <div class="flex gap-2">
            <div class="avatar">
                <div class="w-24 rounded">
                    <img src={business.logoUrl} alt="Logo" />
                </div>
            </div>
            <div class="w-full">
                <label class="fieldset-label" for="logo">
                    {$t("business.logo")} *
                </label>
                <input
                    type="file"
                    class="file-input w-full"
                    name="logo"
                    accept="image/*"
                    bind:files />
                <p class="fieldset-label">Taille maximum 50MB</p>
            </div>
        </div>

        <!-- Name -->
        <label class="fieldset-label" for="name">
            {$t("business.name")} *
        </label>
        <input
            type="text"
            class="input w-full"
            class:input-error={errors.name}
            name="name"
            bind:value={business.name} />
        <p class="fieldset-label text-error">{errors.name}</p>

        <!-- Adress -->
        <label class="fieldset-label" for="adress">
            {$t("business.adress")} *
        </label>
        <input
            type="text"
            class="input w-full"
            class:input-error={errors.adress}
            name="adress"
            bind:value={business.adress} />
        <p class="fieldset-label text-error">{errors.adress}</p>

        <div class="grid grid-cols-3 gap-2">
            <div class="col-span-2">
                <label class="fieldset-label" for="city">
                    {$t("business.city")} *
                </label>
                <input
                    type="text"
                    class="input w-full"
                    class:input-error={errors.city}
                    name="city"
                    bind:value={business.city} />
                <p class="fieldset-label text-error">{errors.city}</p>
            </div>
            <div class="col-span-1">
                <label class="fieldset-label" for="zipCode">
                    {$t("business.zipCode")} *
                </label>
                <input
                    type="text"
                    class="input w-full"
                    class:input-error={errors.zipCode}
                    name="zipCode"
                    bind:value={business.zipCode} />
                <p class="fieldset-label text-error">{errors.zipCode}</p>
            </div>
        </div>

        <!-- Email -->
        <label class="fieldset-label" for="email">{$t("business.email")}</label>
        <input
            type="email"
            class="input w-full"
            class:input-error={errors.email}
            name="email"
            bind:value={business.email} />
        <p class="fieldset-label text-error">{errors.email}</p>

        <!-- Phone -->
        <label class="fieldset-label" for="phone">{$t("business.phone")}</label>
        <input
            type="tel"
            class="input w-full"
            class:input-error={errors.phone}
            name="phone"
            bind:value={business.phone} />
        <p class="fieldset-label text-error">{errors.phone}</p>

        <div class="modal-action">
            <button class="btn" onclick={() => close()}>
                {$t("common.cancel")}
            </button>
            <button class="btn btn-primary" onclick={() => save()}>
                {business.exists ? $t("common.update") : $t("common.create")}
            </button>
        </div>
    </fieldset>
    <div class="modal-backdrop">
        <button onclick={() => close()}>Close</button>
    </div>
</dialog>
