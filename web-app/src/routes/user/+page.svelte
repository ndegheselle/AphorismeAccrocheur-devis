<script lang="ts">
    import auth from "$lib/stores/auth.svelte";
    import { t } from "$lib/translations/index";
    import { repository, Business } from "$lib/models/business";
    import { onMount } from "svelte";
    import EditModal from "$routes/user/business/EditModal.svelte";
    import Summary from "$routes/user/business/Summary.svelte";

    let business = $state<Business | null>(null);
    let modal: EditModal;

    onMount(async () => {
        // Check if we are editing an existing business
        let existingBusiness = await repository.getFirstOrDefault();
        if (existingBusiness) {
            business = existingBusiness;
        }
    });

    function updateBusiness() {
        if (!business) return;
        modal.show(business);
    }
    function createBusiness() {
        modal.show(new Business());
    }
</script>

<div class="container mx-auto py-4">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div class="card bg-base-200 shadow-md">
            <div class="card-body">
                <h2 class="card-title">Utilisateur</h2>

                <div class="grid grid-cols-6 gap-2">
                    <img
                        class="w-16"
                        alt={$t("user.avatar.alt")}
                        src="https://avatar.iran.liara.run/public" />
                    <div>
                        <h3 class="font-bold text-slate-600">Nom</h3>
                        <span>{auth.currentUser?.name}</span>
                    </div>
                    <div class="col-span-4">
                        <h3 class="font-bold text-slate-600">E-mail</h3>
                        <span>{auth.currentUser?.email}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-base-200 col-span-2 shadow-md">
            <div class="card-body">
                <div class="flex">
                    <h2 class="card-title">Entreprise</h2>
                    {#if business}
                        <button
                            class="ms-auto btn btn-sm btn-circle ms-auto"
                            aria-label="Modifier entreprise"
                            onclick={() => updateBusiness()}>
                            <i class="fa-solid fa-edit"></i>
                        </button>
                    {/if}
                </div>
                {#if business}
                    <Summary {business} />
                {:else}
                    <div class="flex flex-col m-auto gap-2">
                        <span class="text-sm m-auto opacity-60"> L'entreprise n'est pas encore configurée.
                        </span>
                        <button
                            class="btn btn-primary"
                            onclick={() => createBusiness()}>
                            Configurer
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<EditModal bind:this={modal} />
