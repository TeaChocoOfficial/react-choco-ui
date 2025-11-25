//-Path: "react-choco-ui/lib/src/components/config/CActivity.tsx"
import { Activity, ActivityProps } from 'react';

type CActivityProps = Omit<ActivityProps, 'children'> & {
    hide?: boolean;
    show?: boolean;
    children?: React.ReactNode;
};

export const CActivity: React.FC<CActivityProps> = ({
    mode,
    show,
    hide,
    children,
    ...prop
}) => (
    <Activity
        {...prop}
        mode={
            mode ??
            (show !== undefined
                ? show
                    ? 'visible'
                    : 'hidden'
                : hide
                ? 'hidden'
                : 'visible')
        }
    >
        {children}
    </Activity>
);

CActivity.displayName = 'CActivity';
