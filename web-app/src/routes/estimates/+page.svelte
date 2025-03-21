<script lang="ts">
    import { t } from "$lib/translations/index";
</script>

<div class="container mx-auto py-4">
    <div class="card bg-primary shadow-md">
        <div class="card-body">
            <h1 class="text-center text-2xl font-bold">Créer un nouveau devis</h1>
            <a class="btn mt-4 mx-auto" href="/estimates/new">
                <i class="fa-solid fa-plus"></i>
                {$t("common.new")}
            </a>
        </div>
    </div>
</div>
