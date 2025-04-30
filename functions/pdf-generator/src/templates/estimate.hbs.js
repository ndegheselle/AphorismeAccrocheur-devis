export default /*html*/`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body class="p-4">
    <header>
        <div class="flex justify-between">
            <div>
                <h1 class="text-5xl font-light">DEVIS</h1>
                <div class="badge badge-ghost font-light text-xl">
                    <h2>{{estimate.reference}}</h2>
                </div>
            </div>
            <img class="w-24 rounded" src="{{business.logoUrl}}" />
        </div>

        <div class="mt-4">
            <p>
                <b>Date :</b>
                {{formatDate estimate.issueDate}}
            </p>
            <p>
                <b>Validité :</b>
                {{formatDate estimate.validityDate}}
            </p>
        </div>
    </header>
    <div class="border-b border-gray-200 my-3"></div>
    <main class="flex flex-col">
        <div class="grid grid-cols-2 gap-2">
            <div class="card bg-base-200">
                <div class="card-body">
                    <b>{{business.name}}</b>
                    <p>{{business.fullAddress}}</p>
                    <p>{{business.phone}}</p>
                    <p>{{business.email}}</p>
                </div>
            </div>
            <div class="card bg-base-200">
                <div class="card-body">
                    <b>Destinataire</b>
                    <p>{{client.fullName}}</p>
                    <p>{{client.fullAdress}}</p>
                    <p>{{client.phone}}</p>
                    <p>{{client.email}}</p>
                </div>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <td width="100%">Nom</td>
                    <td>Prix (€)</td>
                    <td>Quantité</td>
                    <td>Total TVA</td>
                    <td>Total HT</td>
                </tr>
            </thead>
            <tbody>
                {{#each estimate.lines }}
                <tr>
                    <td>{{this.name}}</td>
                    <td>{{this.unitPrice}}€</td>
                    <td>{{this.quantity}}</td>
                    <td>{{this.totalTax}}€</td>
                    <td class="flex">
                        <span>{{this.totalWithoutTax}}€</span>
                        {{#if this.discount}}
                        <span class="ms-2 badge badge-sm badge-soft badge-success">
                            -{{this.discount}}%
                        </span>
                        {{/if}}
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
        <div class="flex">
            <div class="my-auto">
                <h2 class="text-xl">Informations de paiement</h2>
                <p class="text-sm text-gray-600">Paiement par carte bancaire, virement ou chèque.</p>
                <p class="text-sm text-gray-600">Merci de bien vouloir indiquer le numéro de devis lors du paiement.</p>
            </div>
            <div class="card bg-base-200 ms-auto w-xs">
                <div class="card-body gap-0">
                    <h2 class="card-title">Total</h2>
                    <div class="flex">
                        <span class="font-thin opacity-50">HT</span>
                        <span class="ms-auto text-right">
                            {{estimate.totalWithoutTax}}€
                        </span>
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">TVA</span>
                        <span class="ms-auto text-right">
                            {{estimate.totalTax}}€
                        </span>
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">TTC</span>
                        <b class="ms-auto text-right">
                            {{estimate.total}}€
                        </b>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-b border-gray-200 my-3"></div>

        <div class="flex justify-between">
            <div class="ms-auto">
                <h2 class="text-sm text-gray-600">Signature</h2>
                <div class="mt-1 border border-gray-200 rounded-lg w-96 h-20">
                </div>
            </div>
        </div>

    </main>
</body>

</html>
`;