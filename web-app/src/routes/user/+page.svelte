<script lang="ts">
    import auth from "$lib/stores/auth.svelte";
    import { t } from "$lib/translations/index";
</script>

<div class="container flex-1 mx-auto">
    <div class="card bg-base-200 w-full shadow-xl my-2 mx-auto">
        <div class="card-body">
            <h2 class="card-title">
                <img class="w-16"
                    alt={$t("user.avatar.alt")}
                    src="https://avatar.iran.liara.run/public"
                />
                <span>{auth.currentUser?.name}</span>
            </h2>
            <div class="flex flex-col gap-4 mt-4">
                <div>
                    <h3 class="font-bold text-slate-600">E-mail</h3>
                    <span>{auth.currentUser?.email}</span>
                </div>
                <div>
                    <h3 class="font-bold text-slate-600">{$t("user.phone")}</h3>
                    <span>{auth.currentUser?.phone}</span>
                </div>
            </div>
        </div>
    </div>
</div>

