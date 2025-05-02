<script lang="ts">
    import auth from "$lib/stores/auth.svelte";
    import { t } from "$lib/translations/index";
</script>

<div class="navbar bg-base-300">
    <div class="navbar-start">
        {#if auth.isConnected}
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <a href="/clients">
                            <i class="fa-solid fa-address-book"></i>
                            {$t("navigation.clients")}
                        </a>
                    </li>
                    <li>
                        <a href="/estimates">
                            <i class="fa-solid fa-file"></i>
                            {$t("navigation.estimates")}
                        </a>
                    </li>
                </ul>
            </div>
        {/if}
        <a href="/estimates" class="btn btn-ghost text-xl">
            AphAcr
        </a>
    </div>

    {#if auth.isConnected}
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <!--
            <li>
                <details>
                    <summary><i class="fa-solid fa-user-tie"></i> {$t("navigation.my_company")}</summary>
                    <ul class="p-2 z-100">
                        <li><a href="/products"><i class="fa-solid fa-box"></i> {$t("navigation.products")}</a></li>
                        <li><a href="/services"><i class="fa-solid fa-note-sticky"></i> {$t("navigation.services")}</a></li>
                        <li><a href="/prestations"><i class="fa-solid fa-layer-group"></i> {$t("navigation.prestations")}</a></li>
                    </ul>
                </details>
            </li>
            <li><a href="/estimates"><i class="fa-solid fa-file"></i> {$t("navigation.estimates")}</a></li>
            <li><a href="/invoices"><i class="fa-solid fa-file-invoice"></i> {$t("navigation.invoices")}</a></li>
            -->
                <li>
                    <a href="/clients">
                        <i class="fa-solid fa-address-book"></i>
                        {$t("navigation.clients")}
                    </a>
                </li>
                <li>
                    <a href="/estimates">
                        <i class="fa-solid fa-file"></i>
                        {$t("navigation.estimates")}
                    </a>
                </li>
            </ul>
        </div>
    {/if}

    <div class="navbar-end">
        <ul class="menu menu-horizontal px-1">
            {#if !auth.isConnected}
                <li>
                    <a
                        href="/user/login"
                        aria-label="Login"
                        class="btn btn-ghost btn-circle">
                        <i class="fa-solid fa-user"></i>
                    </a>
                </li>
            {:else}
                <div class="dropdown dropdown-end">
                    <div class="avatar" tabindex="0" role="button">
                        <button class="btn btn-ghost btn-circle">
                            <img
                                alt={$t("user.avatar.alt")}
                                src="https://avatar.iran.liara.run/public" />
                        </button>
                    </div>
                    <ul
                        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <a href="/user">
                                <i class="fa-solid fa-gear"></i>
                                {$t("common.parameters")}
                            </a>
                        </li>
                        <li>
                            <button onclick={() => auth.logout()}>
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
