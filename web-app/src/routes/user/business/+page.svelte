<script lang="ts">
    import { Business } from "$lib/models/business";
    import { t } from "$lib/translations/index";
    import { errors } from "$lib/models/business.svelte";

    let business = $state<Business>(new Business());
</script>

<div class="container mx-auto">
    <fieldset
        class="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box mx-auto mb-2">
        <legend class="fieldset-legend">{$t("business.title")}</legend>

        <div class="flex gap-2">
            <div class="avatar">
                <div class="w-24 rounded">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div class="w-full">
                <label class="fieldset-label" for="logo">
                    {$t("business.logo")} *
                </label>
                <input type="file" class="file-input w-full" name="logo" />
                <p class="fieldset-label">Taille maximum 50MB</p>
            </div>
        </div>

        <!-- Name -->
        <label class="fieldset-label" for="businessName">
            {$t("business.name")} *
        </label>
        <input
            type="text"
            class="input w-full"
            class:input-error={errors.businessName}
            name="businessName"
            bind:value={business.businessName} />
        <p class="fieldset-label text-error">{errors.businessName}</p>

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

        <button class="btn btn-primary mt-4">Sauvegarder</button>
    </fieldset>
</div>
