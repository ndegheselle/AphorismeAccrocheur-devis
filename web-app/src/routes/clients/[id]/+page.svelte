<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { t } from "$lib/translations/index";
    import { repository, Client } from "$lib/models/clients";

    let client: Client | undefined;
    onMount(async () => {
        client = await repository.getById(page.params.id);
    });
</script>

<div class="container mx-auto py-4">
    <div class="grid grid-cols-2 gap-2">
        <div class="col-span-2 card bg-base-300 shadow-md">
            <div class="card-body">
                <h2 class="card-title">
                    <i class="fa-solid fa-user"></i>
                    {client?.firstName}
                    {client?.lastName}
                </h2>
                <p>{client?.adress}, {client?.city} {client?.zipCode}</p>
                {#if client?.email}
                    <a href="mailto:{client?.email}">{client?.email}</a>
                {/if}
                {#if client?.phone}
                    <a href="tel:{client?.phone}">{client?.phone}</a>
                {/if}
            </div>
        </div>
        <div class="col-span-2 md:col-span-1 card bg-base-200 shadow-md">
            <div class="card-body">

                <div class="flex">
                    <h2 class="card-title">
                        <i class="fa-solid fa-file-invoice"></i>
                        {$t("navigation.estimates")}
                    </h2>
                    <button class="ms-auto btn btn-circle">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>

                <ul class="list bg-base-100 rounded-box shadow-md">
                    <li class="list-row">
                        <div>
                            <div>Dio Lupa</div>
                            <div
                                class="text-xs uppercase font-semibold opacity-60"
                            >
                                Remaining Reason
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-span-2 md:col-span-1 card bg-base-200 shadow-md">
            <div class="card-body">
                <h2 class="card-title">
                    <i class="fa-solid fa-file"></i>
                    {$t("navigation.invoices")}
                </h2>
                <p>Coming soon</p>
            </div>
        </div>
    </div>
</div>
