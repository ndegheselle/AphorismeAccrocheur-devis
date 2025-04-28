export default /*html*/`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>

<body>

    <header>
        <div class="flex justify-between">
            <div>
                <h1 class="text-5xl font-light">DEVIS</h1>
                <div class="badge badge-ghost font-light text-xl">
                    <h2>n°{{estimate.reference}}</h2>
                </div>
            </div>
            <img class="w-24 rounded" src="{{business.logoUrl}}" />
        </div>

        <div class="mt-4">
            <p>
                <b>Date :</b>
                {{estimate.date}}
            </p>
            <p>
                <b>Validité :</b>
                {{estimate.validity}}
            </p>
        </div>
    </header>
    <div class="divider"></div>
    <main>
        <div class="grid grid-cols-2 gap-2">
            <div class="card bg-base-200">
                <div class="card-body">
                    <b>{{business.name}}</b>
                    <p>{{business.fullAdress}}</p>
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

        <table class="table table-pin-rows table-pin-cols">
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
                    <td>{{line.unitPrice}}€</td>
                    <td>{{line.quantity}}</td>
                    <td>{{line.totalTax}}€</td>
                    <td class="flex">
                        <span>{{line.totalWithoutTax}}€</span>
                        {{#if line.discount}}
                        <span class="ms-2 badge badge-xs badge-soft badge-success">
                            {{-line.discount}}%
                        </span>
                        {{/if}}
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
        <div class="flex">
            <div class="card bg-base-200 shadow-md ms-auto w-xs">
                <div class="card-body gap-0">
                    <h2 class="card-title">Total</h2>
                    <div class="flex">
                        <span class="font-thin opacity-50">HT</span>
                        <span class="ms-auto text-right">
                            {{estimate?.totalWithoutTax}}€
                        </span>
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">TVA</span>
                        <span class="ms-auto text-right">
                            {{estimate?.totalTax}}€
                        </span>
                    </div>
                    <div class="flex">
                        <span class="font-thin opacity-50">TTC</span>
                        <b class="ms-auto text-right">
                            {{estimate?.total}}€
                        </b>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>

</html>
`;