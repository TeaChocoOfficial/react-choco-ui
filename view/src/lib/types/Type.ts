//-Path: "react-choco-ui/lib/src/types/Type.ts"

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type ValueOf<T> = T[keyof T];
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
