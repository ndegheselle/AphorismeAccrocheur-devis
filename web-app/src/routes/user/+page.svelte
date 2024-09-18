<script lang="ts">
    import AuthService from "$lib/authentification.svelte";
    import { t } from "$lib/translations/index";
    let auth = AuthService.auth;
</script>

<div class="container flex-1 mx-auto">
    <div class="card bg-base-200 w-full shadow-xl my-2 mx-auto">
        <div class="card-body">
            <h2 class="card-title">
                <img class="w-16"
                    alt={$t("user.avatar.alt")}
                    src="https://avatar.iran.liara.run/public"
                />
                <span>{auth.user?.name}</span>
            </h2>
            <div class="flex flex-col gap-4 mt-4">
                <div>
                    <h3 class="font-bold text-slate-600">E-mail</h3>
                    <span>{auth.user?.email}</span>
                </div>
                <div>
                    <h3 class="font-bold text-slate-600">{$t("user.phone")}</h3>
                    <span>{auth.user?.phone}</span>
                </div>
            </div>
        </div>
    </div>
</div>

