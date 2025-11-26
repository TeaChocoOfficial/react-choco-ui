//-Path: "react-choco-ui/lib/src/hooks/fileManager/hook/useDetectOutsideClick.ts"
import { useEffect, useRef, useState } from 'react';

export interface UseDetectOutsideClickReturn<Element extends HTMLElement> {
    ref: React.RefObject<Element | null>;
    isClicked: boolean;
    setIsClicked: (value: boolean) => void;
}

export type HandleOutsideClick = (
    event: MouseEvent,
    ref: React.RefObject<Element | null>,
) => void;

export type UseDetectOutsideClick = <Element extends HTMLElement>(
    handleOutsideClick?: HandleOutsideClick,
    ref?: React.RefObject<Element | null>,
) => UseDetectOutsideClickReturn<Element>;

export const useDetectOutsideClick: UseDetectOutsideClick = <
    Element extends HTMLElement,
>(
    handleOutsideClick: HandleOutsideClick = () => {},
    ref: React.RefObject<Element | null> = useRef<Element>(null),
) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (event: MouseEvent) => {
        if (!ref.current?.contains(event.target as Node)) {
            setIsClicked(true);
            handleOutsideClick(event, ref);
        } else {
            setIsClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick, true);
        document.addEventListener('mousedown', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
            document.removeEventListener('mousedown', handleClick, true);
        };
    }, []);

    return { ref, isClicked, setIsClicked };
};
