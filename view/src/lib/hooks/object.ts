//-Path: "react-choco-ui/lib/src/hooks/object.ts"
export namespace OBJ {
    export const groupBy = <T>(
        array: T[],
        keySelector: (item: T) => string,
    ): Record<string, T[]> => {
        return array.reduce((groups, item) => {
            const key = keySelector(item);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {} as Record<string, T[]>);
    };
    
    export const keys = <Object extends object>(
        object: Object,
    ): (keyof Object)[] => Object.keys(object) as (keyof Object)[];

    export const find = <Object extends object>(
        object: Object,
        method: (value: Object[keyof Object], key: keyof Object) => boolean,
    ): boolean => {
        const objKeys = keys(object);
        for (const key of objKeys) {
            if (method(object[key], key)) return true;
        }
        return false;
    };
}
