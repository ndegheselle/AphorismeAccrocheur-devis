<script lang="ts">
    import { t } from "$lib/translations/index";
    import Edit from "./edit.svelte";

    let edit : HTMLDialogElement;
</script>

<div class="container mx-auto py-4">
    <div class="card bg-primary shadow-md">
        <div class="card-body">
            <h1 class="text-center text-2xl font-bold">
                Ajouter un nouveau client
            </h1>
            <button class="btn mt-4 mx-auto" onclick={() => edit.showModal()}>
                <i class="fa-solid fa-plus"></i>
                {$t("common.new")}
            </button>
        </div>
    </div>
</div>
<Edit bind:modal={edit}/>