//-Path: "react-choco-ui/lib/src/components/config/CActivity.tsx"
import { Activity, ActivityProps, useMemo } from 'react';

type CActivityProps = ActivityProps & { hide?: boolean; show?: boolean };

export const CActivity = ({ mode, show, hide, ...prop }: CActivityProps) => {
    const finalMode = useMemo(
        () =>
            mode ??
            (show !== undefined
                ? show
                    ? 'visible'
                    : 'hidden'
                : hide
                ? 'hidden'
                : 'visible'),
        [mode, show, hide],
    );
    return <Activity {...prop} mode={finalMode} />;
};

CActivity.displayName = 'CActivity';
