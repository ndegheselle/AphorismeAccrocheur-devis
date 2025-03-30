<script lang="ts">
    import {onMount} from "svelte";
    import { t } from "$lib/translations/index";
    import Edit from "./edit.svelte";
    import { repository, Client } from "$lib/models/clients";
    import Pagination from "$lib/components/navigation/pagination.svelte";

    let edit : Edit;
    let clients = $state<Client[]>([]);

    onMount(async() => {
        clients = await repository.getAll(25, 0);
    });

    async function create()
    {
        let client = await edit.show(new Client());
        if (client == null)
          return;
        clients.push(client);
    }
</script>

<div class="container mx-auto py-4">
    <div class="card bg-primary shadow-md">
        <div class="card-body">
            <h1 class="text-center text-2xl font-bold">
                Ajouter un nouveau client
            </h1>
            <button class="btn mt-4 mx-auto" onclick={create}>
                <i class="fa-solid fa-plus"></i>
                {$t("common.new")}
            </button>
        </div>
    </div>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-2">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>{$t("clients.firstName")} {$t("clients.lastName")}</th>
              <th>{$t("clients.adress")}</th>
              <th>{$t("clients.email")}</th>
              <th>{$t("clients.phone")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
             {#each clients as client }
            <tr>
                <th><a href="/clients/{client.$id}">{client.firstName} {client.lastName}</a></th>
                <td>{client.adress}, {client.city} {client.zipCode}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
              </tr>
             {/each}
          </tbody>
        </table>
      </div>
      <Pagination />
</div>
<Edit bind:this={edit}/>