<script lang="ts">
    import AuthService from "$lib/authentification.svelte";
    import { t } from "$lib/translations/index";
    let auth = AuthService.auth;
</script>

<div class="navbar bg-base-300">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">O'Artisan</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            {#if !auth.isConnected}
                <li>
                    <a href="/user/login" class="btn btn-ghost btn-circle"
                        ><i class="fa-solid fa-user"></i>
                    </a>
                </li>
            {:else}
                <div class="dropdown dropdown-end">
                    <div class="avatar m-2" tabindex="0" role="button">
                        <button class="btn btn-ghost btn-circle">
                            <img
                                alt={$t("user.avatar.alt")}
                                src="https://avatar.iran.liara.run/public"
                            />
                        </button>
                    </div>
                    <ul
                        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        <li>
                            <a href="/user"
                                ><i class="fa-solid fa-gear"></i>
                                {$t("common.parameters")}
                            </a>
                        </li>
                        <li>
                            <button
                                onclick={AuthService.logout}
                            >
                                <i class="fa-solid fa-right-from-bracket"></i>
                                {$t("user.logout")}
                            </button>
                        </li>
                    </ul>
                </div>
            {/if}
        </ul>
    </div>
</div>
