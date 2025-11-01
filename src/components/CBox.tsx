//-Path: "react-choco-ui-test/src/components/CBox.tsx"

export interface CBoxProps {
    children?: React.ReactNode;
}

export const CBox: React.FC<CBoxProps> = (prop) => {
    return <div {...prop} />;
};
