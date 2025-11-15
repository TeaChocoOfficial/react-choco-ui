//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Collapse.tsx"
import { ChocoUi } from '$Type/Choco';
import { useState, useEffect } from 'react';
import { customUi } from '$/custom/customUi';
import { useCollapse } from 'react-collapsed';

export type CollapseType = ChocoUi.Ui<
    'div',
    { open: boolean; children?: React.ReactNode }
>;

export const Collapse = customUi<CollapseType>(
    'div',
    'Collapse',
)(({ props: { open, children } }) => {
    const [isExpanded, setExpanded] = useState(open);
    const { getCollapseProps } = useCollapse({
        isExpanded,
        duration: 500,
    });

    useEffect(() => {
        setExpanded(open);
    }, [open, setExpanded]);

    return <div {...getCollapseProps()}>{children}</div>;
})();
