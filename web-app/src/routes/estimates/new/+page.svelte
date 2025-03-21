<script lang="ts">
    import { t } from "$lib/translations/index";
</script>

<div class="container m-auto py-4">
    <fieldset
        class="fieldset mx-auto w-md bg-base-200 border border-base-300 p-4 rounded-box"
    >
        <legend class="fieldset-legend text-2xl">Nouveau client</legend>
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
        <label class="fieldset-label">Adresse</label>
        <input type="text" class="input w-full" placeholder="my-awesome-page" />

        <div class="grid grid-cols-3 gap-2">
            <div class="col-span-2">
                <label class="fieldset-label" for="lastname">Ville</label>
                <input type="text" name="lastname" class="input" />
            </div>
            <div class="col-span-1">
                <label class="fieldset-label" for="firstname">Code postal</label
                >
                <input type="text" class="input" name="firstname" />
            </div>
        </div>
        <label class="fieldset-label" for="email">Email</label>
        <input type="email" class="input w-full" name="email" />
        <label class="fieldset-label" for="phone">Téléphone</label>
        <input type="tel" class="input w-full" name="phone" />
    </fieldset>
    <div class="divider">OU</div>
</div>
