<script>
    import { t } from "$lib/translations/index";
    import alerts from "$lib/stores/alerts.svelte"
</script>

<div class="container mx-auto py-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-1 space-y-4">
            <div class="card bg-base-200 shadow-md">
                <div class="card-body">
                    <h2 class="card-title"><i class="fa-solid fa-address-book"></i> {$t("navigation.clients")}</h2>
                    <p>
                        A card component has a figure, a body part, and inside
                        body there are title and actions parts
                    </p>
                </div>
            </div>

            <!-- Second cell on the left -->
            <div class="card bg-base-200 shadow-md">
                <div class="card-body">
                    <h2 class="card-title"><i class="fa-solid fa-file"></i> {$t("navigation.invoices")}</h2>
                    <p>
                        A card component has a figure, a body part, and inside
                        body there are title and actions parts
                    </p>
                </div>
            </div>
        </div>

        <!-- Right column - one large cell -->
        <div class="md:col-span-2">
            <div class="card bg-base-200 shadow-md">
                <div class="card-body">
                    <h2 class="card-title"><i class="fa-solid fa-file-invoice"></i> {$t("navigation.estimates")}</h2>
                    <p>
                        A card component has a figure, a body part, and inside
                        body there are title and actions parts
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
