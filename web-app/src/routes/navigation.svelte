<script lang="ts">
    import Authentification from "$lib/authentification.svelte";

    let auth = Authentification.auth;
    let authentificationModal: HTMLDialogElement;

    let userForm = $state({
        email: "test@test.com",
        password: "test1234",
        isLoading: false,
    });

    async function login() {
        userForm.isLoading = true;
        await Authentification.login(userForm.email, userForm.password);
        authentificationModal.close();
        userForm.isLoading = false;
    }
</script>

<div class="navbar bg-base-300">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl">O'Artisan</a>
    </div>
    <div class="flex-none">
        {#if !auth.isConnected}
            <button
                class="btn btn-ghost"
                onclick={() => authentificationModal.showModal()}
                >
                <i class="fa-solid fa-user"></i>
                Sign in</button
            >
        {:else}
            <button class="btn btn-ghost" onclick={Authentification.logout}
                >Logout</button
            >
        {/if}
    </div>
</div>

<dialog
    id="authentificationModal"
    bind:this={authentificationModal}
    class="modal"
>
    <div class="modal-box">
        <h3 class="text-lg font-bold">Sign in</h3>
        <div>
            <div class="flex flex-col gap-4 mt-4">
                <label class="input input-bordered flex items-center gap-2">
                    <i class="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        class="grow"
                        placeholder="E-mail"
                        value={userForm.email}
                    />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <i class="fa-solid fa-key"></i>
                    <input
                        type="password"
                        class="grow"
                        value={userForm.password}
                    />
                </label>

                <div class="flex gap-2 ml-auto">
                    <button
                        class="btn"
                        onclick={() => authentificationModal.close()}
                        >Cancel</button
                    >
                    <button class="btn btn-primary" onclick={login}>
                        <span class:hidden={!userForm.isLoading} class="loading loading-spinner loading-md"></span>
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
