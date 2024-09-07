<script lang="ts">
    import Authentification from "$lib/authentification.svelte";
    import { t } from "$lib/translations/index";

    let authentificationModal: HTMLDialogElement;

    let authForm = $state({
        email: "test@test.com",
        password: "test1234",
        isLoading: false,
        isError: false,
    });
    
    async function login() {
        authForm.isLoading = true;
        authForm.isError = !(await Authentification.login(
            authForm.email,
            authForm.password,
        ));
        if (!authForm.isError) {
            authentificationModal.close();
        }
        authForm.isLoading = false;
    }

    export function show()
    {
        authentificationModal.show();
    }
</script>

<dialog
    id="authentificationModal"
    bind:this={authentificationModal}
    class="modal"
>
    <div class="modal-box">
        <h3 class="text-lg font-bold">{$t("common.auth.login")}</h3>
        <div>
            <div class="flex flex-col gap-4 mt-4">
                <label
                    class:input-error={authForm.isError}
                    class="input input-bordered flex items-center gap-2"
                >
                    <i class="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        class="grow"
                        placeholder="E-mail"
                        bind:value={authForm.email}
                    />
                </label>
                <label
                    class:input-error={authForm.isError}
                    class="input input-bordered flex items-center gap-2"
                >
                    <i class="fa-solid fa-key"></i>
                    <input
                        type="password"
                        class="grow"
                        bind:value={authForm.password}
                    />
                </label>

                <small class="text-error" class:hidden={!authForm.isError}>
                    <i class="fa-solid fa-warning"></i>
                    {$t("common.auth.login.error")}
                </small>

                <div class="flex gap-2 ml-auto">
                    <button
                        class="btn"
                        onclick={() => authentificationModal.close()}
                        >{$t("common.cancel")}</button
                    >
                    <button class="btn btn-primary" onclick={login}>
                        <span
                            class:hidden={!authForm.isLoading}
                            class="loading loading-spinner loading-md"
                        ></span>
                        {$t("common.auth.login")}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>