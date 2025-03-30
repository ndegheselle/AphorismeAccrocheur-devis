<script lang="ts">
    import { createDeferred, Deferred } from "$lib/base/deferred";
    import { EstimateLine } from "$lib/models/estimates";
    import { clearErrors, displayErrors } from "$lib/base/errors";
    import { t } from "$lib/translations/index";

    let fieldset: HTMLFieldSetElement;
    let modal: HTMLDialogElement;
    let deferred: Deferred<EstimateLine | null>;

    // Using object instead of class for reactivity
    let line = $state({
        name: "",
        unitPrice: 1,
        quantity: 1,
        tax: 20,
        discount: 0,
    });
    let isEdit = $state(false);

    let totalWithoutTax = $derived(line.unitPrice * line.quantity);
    let totalTax = $derived((totalWithoutTax * line.tax) / 100);
    let total = $derived(
        totalWithoutTax + totalTax * (1 - line.discount / 100),
    );

    export function show(
        _line: EstimateLine | null = null,
    ): Promise<EstimateLine | null> {
        if (_line) {
            line.name = _line.name;
            line.unitPrice = _line.unitPrice;
            line.quantity = _line.quantity;
            line.tax = _line.tax;
            line.discount = _line.discount;
        }
        isEdit = !!_line;

        deferred = createDeferred<EstimateLine | null>();
        modal.show();
        return deferred.promise;
    }

    async function validate() {
        close(true);
    }

    export function close(success: boolean = false) {
        if (success) {
            let _line = new EstimateLine();
            _line.name = line.name;
            _line.unitPrice = line.unitPrice;
            _line.quantity = line.quantity;
            _line.tax = line.tax;
            _line.discount = line.discount;
            deferred.resolve(_line);
        } else {
            deferred.resolve(null);
        }
        modal.close();
    }
</script>

<dialog bind:this={modal} class="modal">
    <fieldset
        class="fieldset w-md modal-box bg-base-200 border border-base-300 p-4 rounded-box"
        bind:this={fieldset}
    >
        <legend class="fieldset-legend">Nouvelle ligne</legend>

        <label class="fieldset-label" for="name">Nom *</label>
        <input
            type="text"
            class="input w-full"
            required
            name="name"
            bind:value={line.name}
        />

        <div class="flex gap-2">
            <div>
                <label class="fieldset-label" for="unitPrice">Prix (€) *</label>
                <input
                    type="number"
                    class="input"
                    required
                    name="unitPrice"
                    bind:value={line.unitPrice}
                />
            </div>
            <div>
                <label class="fieldset-label" for="tax">TVA (%)</label>
                <input
                    type="number"
                    class="input"
                    required
                    name="tax"
                    bind:value={line.tax}
                />
            </div>

            <div>
                <label class="fieldset-label" for="quantity">Quantité</label>
                <input
                    type="number"
                    class="input"
                    required
                    name="quantity"
                    bind:value={line.quantity}
                />
            </div>

            <div>
                <label class="fieldset-label" for="discount"
                    >Réduction (%)</label
                >
                <input
                    type="number"
                    class="input"
                    required
                    name="discount"
                    bind:value={line.discount}
                />
            </div>
        </div>
        <p class="fieldset-label">{$t("common.fields.required")}</p>

        <div class="ms-auto flex w-20">
            <span class="font-thin opacity-50">HT</span>
            <span class="ms-auto text-right">{totalWithoutTax} €</span>
        </div>
        <div class="ms-auto flex w-20">
            <span class="font-thin opacity-50">TVA</span>
            <span class="ms-auto text-right">{totalTax} €</span>
        </div>
        <div class="ms-auto flex w-20">
            <span class="font-thin opacity-50">TTC</span>
            <span class="ms-auto text-right">{total} €</span>
        </div>

        <div class="modal-action">
            <button class="btn" onclick={() => modal.close()}
                >{$t("common.cancel")}</button
            >
            <button class="btn btn-primary" onclick={() => validate()}
                >{isEdit ? "Modifier" : "Ajouter"}</button
            >
        </div>
    </fieldset>
    <div class="modal-backdrop">
        <button onclick={() => close()}> Close </button>
    </div>
</dialog>
