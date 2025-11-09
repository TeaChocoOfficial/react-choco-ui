//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Collapse.tsx"
import { UiTypes } from '$Type/ui';
import { useState, useEffect } from 'react';
import { createUi } from '$/custom/test/createUi';
import { useCollapse } from 'react-collapsed';

export type CollapseType = UiTypes<
    'div',
    { open: boolean; children?: React.ReactNode }
>;

export const Collapse = createUi<CollapseType>(({ open, children }) => {
    const [isExpanded, setExpanded] = useState(open);
    const { getCollapseProps } = useCollapse({
        isExpanded,
        duration: 500,
    });

    useEffect(() => {
        setExpanded(open);
    }, [open, setExpanded]);

    return <div {...getCollapseProps()}>{children}</div>;
}, 'Collapse');
