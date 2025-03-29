import { createDeferred, Deferred } from "$lib/base/deferred";

class ConfirmContent
{
    modal: HTMLDialogElement;
    message = $state<string>();
    title= $state<string>();
}

let deferred: Deferred<boolean>;
let content = new ConfirmContent();
function show(title: string, message: string) {
    content.message = message;
    content.title = title;
    content.modal.showModal();
    deferred = createDeferred<boolean>();
    return deferred.promise;
}

function close(success: boolean = false) {
    deferred.resolve(success);
    if (content.modal.open == false)
        return;
    content.modal.close();
}

export { content }
export default {
    show,
    close
}