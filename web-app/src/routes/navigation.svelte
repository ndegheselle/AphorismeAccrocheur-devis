<div class="navbar bg-base-300">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl">O'Artisan</a>
    </div>
    <div class="flex-none">
        <button
            class="btn btn-ghost"
            onclick="authentificationModal.showModal()">Sign in</button
        >
    </div>
</div>

<dialog id="authentificationModal" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Sign in</h3>
        <div class="flex flex-col gap-4 mt-4">
            <label class="input input-bordered flex items-center gap-2">
                <i class="fa-solid fa-user"></i>
                <input type="text" class="grow" placeholder="Username" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                <i class="fa-solid fa-key"></i>
                <input type="password" class="grow" />
            </label>

            <button class="btn btn-primary ml-auto">Login</button>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
