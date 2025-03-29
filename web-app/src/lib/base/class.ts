export function copyFrom<T>(cls: new () => T, source: any): T {
    const instance = new cls();
    for (const p in instance)
        instance[p] = (p in source ? source : instance)[p];
    return instance;
}