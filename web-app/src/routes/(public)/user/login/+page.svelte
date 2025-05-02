<script lang="ts">
    import { goto } from "$app/navigation";
    import auth from "$lib/stores/auth.svelte";
    import { t } from "$lib/translations/index";

    let authForm = $state({
        email: "test@test.com",
        password: "test1234",
        isLoading: false,
        isError: false,
    });

    async function login() {
        authForm.isLoading = true;
        authForm.isError = !(await auth.login(
            authForm.email,
            authForm.password,
        ));
        authForm.isLoading = false;
        if (!authForm.isError) {
            // TODO : goto previous page before login
            goto("/estimates");
        }
    }
</script>

<div class="card bg-base-200 w-96 shadow-xl m-auto p-4">
    <div class="card-body">
        <h2 class="card-title">{$t("user.login")}</h2>
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
                    {$t("user.login.error")}
                </small>

                <button class="btn btn-primary" onclick={login}>
                    <span
                        class:hidden={!authForm.isLoading}
                        class="loading loading-spinner loading-md"
                    ></span>
                    <i class="fa-solid fa-right-to-bracket"></i>
                    {$t("user.login")}
                </button>

                <div class="divider">{$t("user.register.alt")}</div>

                <a class="btn" href="/user/register">
                    {$t("user.register")}
                </a>
            </div>
        </div>
    </div>
</div>