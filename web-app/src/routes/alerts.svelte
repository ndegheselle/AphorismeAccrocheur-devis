<script lang="ts">
    import { stack, EnumAlertType } from "$lib/stores/alerts.svelte";

    function getIcon(type: EnumAlertType): string {
        switch (type) {
            case EnumAlertType.Success:
                return "fa-circle-check";
            case EnumAlertType.Error:
            case EnumAlertType.Warning:
                return "fa-circle-exclamation";
            default:
                return "fa-circle-info";
        }
    }

    function getColor(type: EnumAlertType): string {
        switch (type) {
            case EnumAlertType.Success:
                return "alert-success";
            case EnumAlertType.Error:
                return "alert-error";
            case EnumAlertType.Warning:
                return "alert-warning";
            default:
                return "";
        }
    }
</script>

<div class="fixed left-0 right-0 top-0 z-10">
    {#each stack as alert}
        <div role="alert" class="alert {getColor(alert.type)} m-2">
            <i class="fa-solid {getIcon(alert.type)}"></i>
            <span>{alert.message}</span>
            <button
                on:click={() => alert.close()}
                class="btn btn-sm btn-circle"
                aria-label="close"><i class="fa-solid fa-xmark"></i></button
            >
        </div>
    {/each}
</div>
