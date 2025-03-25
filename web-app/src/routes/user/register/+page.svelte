<script lang="ts">
    import { goto } from "$app/navigation";
    import auth from "$lib/stores/auth.svelte";
    import { t } from "$lib/translations/index";

    let authForm = $state({
        name: "Test test",
        email: "test@test.com",
        password: "test1234",
        confirmPassword: '',
        isLoading: false,
        error: "",
    });

    async function register() {
        authForm.isLoading = true;

        try {
            await auth.register(
                authForm.email,
                authForm.password,
                authForm.name,
            );
            goto("/");
        } catch (error: any) {
            error = error.message;
        }
    }
</script>

<div class="card bg-base-200 w-96 shadow-xl mx-auto">
    <div class="card-body">
        <h2 class="card-title">{$t("user.register")}</h2>
        <div>
            <div class="flex flex-col gap-4 mt-4">
                <label class="input input-bordered flex items-center gap-2">
                    <input
                        class="grow"
                        placeholder="{$t("user.name")}"
                        bind:value={authForm.name}
                    />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <i class="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        class="grow"
                        placeholder="E-mail"
                        bind:value={authForm.email}
                    />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <i class="fa-solid fa-key"></i>
                    <input
                        type="password"
                        class="grow"
                        placeholder="{$t("user.password")}"
                        bind:value={authForm.password}
                    />
                </label>
                <label 
                class:input-error={authForm.confirmPassword != authForm.password}  class="input input-bordered flex items-center gap-2">
                    <i class="fa-solid fa-key"></i>
                    <input
                        type="password"
                        class="grow"
                        placeholder="{$t("user.password.confirm")}"
                        bind:value={authForm.confirmPassword}
                    />
                </label>

                <small class="text-error" class:hidden={!authForm.error}>
                    <i class="fa-solid fa-warning"></i>
                    {authForm.error}
                </small>

                <button class="btn btn-primary" onclick={register}>
                    <span
                        class:hidden={!authForm.isLoading}
                        class="loading loading-spinner loading-md"
                    ></span>
                    {$t("user.register")}
                </button>
            </div>
        </div>
    </div>
</div>
