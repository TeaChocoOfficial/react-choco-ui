//-Path: "react-choco-ui/lib/src/components/config/CGlobal.tsx"
import { ChocoUi } from '$Type/Choco';
import { ChocoStyle } from '$/custom/ChocoStyle';
import { Global, Interpolation, Theme } from '@emotion/react';

export type CGlobalProps = {
    cs: ChocoUi.Style.CS;
};

export const CGlobal: React.FC<CGlobalProps> = ({ cs }) => {
    const chocoStyle = new ChocoStyle(cs);
    return <Global styles={chocoStyle.cs as Interpolation<Theme>} />;
};
