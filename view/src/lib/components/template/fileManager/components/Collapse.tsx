//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Collapse.tsx"
import { useState, useEffect } from 'react';
import { useCollapse } from 'react-collapsed';

export type CollapseProps = { open: boolean; children?: React.ReactNode };

export const Collapse: React.FC<CollapseProps> = ({ open, children }) => {
    const [isExpanded, setExpanded] = useState(open);
    const { getCollapseProps } = useCollapse({
        isExpanded,
        duration: 500,
    });

    useEffect(() => setExpanded(open), [open, setExpanded]);

    return <div {...getCollapseProps()}>{children}</div>;
};
