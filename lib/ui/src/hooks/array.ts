//-Path: "react-choco-ui/lib/src/hooks/array.ts"

export namespace ARY {
    export type Length<Value, Length extends number> = Array<Value> & {
        length: Length;
    };
    export type ElementType<T> = T extends (infer U)[]
        ? U
        : T extends ReadonlyArray<infer U>
        ? U
        : never;

    export type ExtractGuardType<T> = T extends (x: unknown) => x is infer R
        ? R
        : T extends (x: unknown) => boolean
        ? unknown
        : never;

    export function at<T>(array: T[], index: number): T | undefined {
        if (index >= 0) {
            return array[index];
        }
        return array[array.length + index];
    }

    export function is<
        T extends (item: unknown) => boolean,
        ItemType = ExtractGuardType<T>,
    >(array: unknown, guard?: T): array is ItemType[] {
        if (!Array.isArray(array)) return false;
        return guard ? array.every(guard) : true;
    }

    export function first<T>(array: T[]): T | undefined {
        return array[0];
    }

    export function last<T>(array: T[]): T | undefined {
        return array.length > 0 ? array[array.length - 1] : undefined;
    }

    export function isEmpty<T>(array: T[]): boolean {
        return array.length === 0;
    }

    export function isNotEmpty<T>(array: T[]): boolean {
        return array.length > 0;
    }

    export function groupBy<T>(
        array: T[],
        keySelector: (item: T) => string,
    ): Record<string, T[]> {
        return array.reduce((groups, item) => {
            const key = keySelector(item);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {} as Record<string, T[]>);
    }

    export function chunk<T>(array: T[], size: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    export function unique<T>(array: T[]): T[] {
        return [...new Set(array)];
    }

    export function uniqueBy<T, K>(
        array: T[],
        keySelector: (item: T) => K,
    ): T[] {
        const seen = new Set<K>();
        return array.filter((item) => {
            const key = keySelector(item);
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    export function filter<T>(
        array: T[],
        predicate: (item: T, index: number) => boolean,
    ): T[] {
        return array.filter(predicate);
    }

    export function map<T, U>(
        array: T[],
        mapper: (item: T, index: number) => U,
    ): U[] {
        return array.map(mapper);
    }

    export function reduce<T, U>(
        array: T[],
        reducer: (acc: U, item: T, index: number) => U,
        initialValue: U,
    ): U {
        return array.reduce(reducer, initialValue);
    }

    export function find<T>(
        array: T[],
        predicate: (item: T, index: number) => boolean,
    ): T | undefined {
        return array.find(predicate);
    }

    export function some<T>(
        array: T[],
        predicate: (item: T, index: number) => boolean,
    ): boolean {
        return array.some(predicate);
    }

    export function every<T>(
        array: T[],
        predicate: (item: T, index: number) => boolean,
    ): boolean {
        return array.every(predicate);
    }
}
