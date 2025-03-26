enum EnumAlertType {
    Info,
    Success,
    Error,
    Warning,
}

class Alert
{
    message: string;
    type: EnumAlertType;

    constructor(message: string, type: EnumAlertType)
    {
        this.message = message;
        this.type = type;
    }

    close() {
        let index = stack.indexOf(this);
        if (index > -1)
            stack.splice(index, 1);
    }
}

const ALERT_DEFAULT_DELAY = 3000;
let stack = $state<Array<Alert>>([]);

function show(message: string, type: EnumAlertType) {
    let alert = new Alert(message, type);
    stack.push(alert);
    // Close after delay
    setTimeout(() => alert.close(), ALERT_DEFAULT_DELAY);
}

export { stack, EnumAlertType }
export default {
    info(message: string) { show(message, EnumAlertType.Info); },
    success(message: string) { show(message, EnumAlertType.Success); },
    error(message: string) { show(message, EnumAlertType.Error); },
    warning(message: string) { show(message, EnumAlertType.Warning); }
}