//-Path: "react-choco-ui/lib/src/hooks/fileManager/hook/useKeyPress.ts"
import { useEffect, useMemo, useRef } from 'react';

const normalizeKey = (key: string): string => {
    return key.toLowerCase();
};

export const useKeyPress = (
    keys: string[],
    callback: (event?: KeyboardEvent) => void,
    disable: boolean = false,
): void => {
    const lastKeyPressed = useRef<Set<string>>(new Set());
    const keysSet = useMemo(() => {
        return new Set(keys.map((key) => normalizeKey(key)));
    }, [keys]);

    const handleKeyDown = (event: KeyboardEvent): void => {
        if (event.repeat) return; // To prevent this function from triggering on key hold e.g. Ctrl hold

        lastKeyPressed.current.add(normalizeKey(event.key));

        // Check if all required keys are pressed
        const allKeysPressed = Array.from(keysSet).every((key) =>
            lastKeyPressed.current.has(key),
        );

        if (allKeysPressed && !disable) {
            event.preventDefault();
            callback(event);
            return;
        }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
        lastKeyPressed.current.delete(normalizeKey(event.key));
    };

    const handleBlur = (): void => {
        lastKeyPressed.current.clear();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        };
    }, [keysSet, callback, disable]);
};
