//-Path: "react-choco-ui/lib/src/components/CBox.tsx"

export type CBoxProps = {
    children?: React.ReactNode;
};

export function CBox(prop: CBoxProps) {
    return <div {...prop} />;
}
