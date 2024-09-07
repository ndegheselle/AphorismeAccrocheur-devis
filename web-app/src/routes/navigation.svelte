<script lang="ts">
    import AuthService from "$lib/authentification.svelte";
    import { t } from "$lib/translations/index";

    import Authentification from "./authentification.svelte";

    let auth = AuthService.auth;
    let authentificationModal: Authentification;
</script>

<div class="navbar bg-base-300">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl">O'Artisan</a>
    </div>
    <div class="flex-none">
        {#if !auth.isConnected}
            <button
                class="btn btn-ghost"
                onclick={() => authentificationModal.show()}
            >
                <i class="fa-solid fa-user"></i>
                {$t("common.auth.login")}
            </button>
        {:else}
            <div class="dropdown dropdown-end">
                <div class="avatar m-2" tabindex="0" role="button">
                    <div
                        class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2"
                    >
                        <img src="https://avatar.iran.liara.run/public" />
                    </div>
                </div>
                <ul
                    class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                    <li>
                        <button
                            class="btn btn-ghost"
                            onclick={AuthService.logout}
                        >
                            <i class="fa-solid fa-right-from-bracket"></i>
                            {$t("common.auth.logout")}
                        </button>
                    </li>
                </ul>
            </div>
        {/if}
    </div>
</div>

<Authentification bind:this={authentificationModal} />
