//-Path: "react-choco-ui/lib/base/src/components/index.ts"
import { CActivity } from './CActivity';
import { CGlobal } from './CGlobal';

/** ChocoComponents */
const C = {
    Activity: CActivity,
    Global: CGlobal,
} as const;

export default C;
