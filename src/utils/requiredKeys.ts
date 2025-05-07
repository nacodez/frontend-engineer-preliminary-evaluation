export type RequiredKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

export function ensureRequiredKeys<T extends object>(obj: T): T {

    const objKeys = Object.keys(obj) as Array<keyof T>;


    const missingKeys: string[] = [];


    objKeys.forEach(key => {
        if (obj[key] === undefined) {
            missingKeys.push(key as string);
        }
    });

    if (missingKeys.length > 0) {
        throw new Error(`Missing required keys: ${missingKeys.join(', ')}`);
    }

    return obj;
}

export function extractRequiredProperties<T extends object>(obj: T): Pick<T, RequiredKeys<T>> {
    const result = {} as Pick<T, RequiredKeys<T>>;

    const objKeys = Object.keys(obj) as Array<keyof T>;

    objKeys.forEach(key => {
        if (obj[key] !== undefined) {

            (result as any)[key] = obj[key];
        }
    });

    return result;
}