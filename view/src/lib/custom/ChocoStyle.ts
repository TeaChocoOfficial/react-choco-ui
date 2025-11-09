//-Path: "react-choco-ui/lib/src/custom/ChocoStyle.ts"
import { useTheme } from '$/theme/useTheme';
import { ChocoUi } from '$Type/Choco';
import { Ary, Obj } from '@teachoco-dev/cli';

export class ChocoStyle {
    cs: ChocoUi.Emotion.InterpolationObject;
    spacingKeys: (keyof ChocoUi.Props)[] = [
        'm',
        'mt',
        'ml',
        'mr',
        'mb',
        'my',
        'mx',
        'p',
        'pt',
        'pl',
        'pr',
        'pb',
        'py',
        'px',
    ];
    applyKeys: {
        [key in keyof ChocoUi.Props]?:
            | ChocoUi.Emotion.CSSOthers
            | keyof ChocoUi.Emotion.CSSOthers
            | (keyof ChocoUi.Emotion.CSSOthers)[]
            | ((value: ChocoUi.Props[key]) => ChocoUi.Emotion.CSSOthers);
    } = {
        // Spacing - Margin
        m: 'margin',
        mt: 'marginTop',
        ml: 'marginLeft',
        mr: 'marginRight',
        mb: 'marginBottom',
        my: ['marginTop', 'marginBottom'],
        mx: ['marginLeft', 'marginRight'],

        // Spacing - Padding
        p: 'padding',
        pt: 'paddingTop',
        pl: 'paddingLeft',
        pr: 'paddingRight',
        pb: 'paddingBottom',
        py: ['paddingTop', 'paddingBottom'],
        px: ['paddingLeft', 'paddingRight'],

        // Dimensions - Width & Height
        w: 'width',
        h: 'height',
        wh: (value) => ({
            width: value,
            height: value,
        }),

        // Min Dimensions
        minH: 'minHeight',
        minW: 'minWidth',
        minWh: (value) => ({
            minWidth: value,
            minHeight: value,
        }),

        // Max Dimensions
        maxH: 'maxHeight',
        maxW: 'maxWidth',
        maxWh: (value) => ({
            maxWidth: value,
            maxHeight: value,
        }),

        // Full Size
        full: { width: '100%', height: '100%' },
        wFull: { width: '100%' },
        hFull: { height: '100%' },

        // Screen Size
        screen: { width: '100vw', height: '100vh' },
        wScreen: { width: '100vw' },
        hScreen: { height: '100vh' },

        // Display
        flex: { display: 'flex' },
        block: { display: 'block' },

        // Colors
        bg: 'background',
        clr: 'color',
        bgClr: 'backgroundColor',
    };
    constructor(styles: unknown) {
        this.cs = styles as ChocoUi.Emotion.InterpolationObject;
        if (this.cs && typeof this.cs === 'object') {
            this.processStyles();
        } else {
            console.log('this not object', this.cs);
        }
    }

    private spacing(value: ChocoUi.CSS): ChocoUi.CSS {
        if (typeof value !== 'number') return value;
        const theme = useTheme();
        return value * theme.responsive.spacing;
    }

    private processStyles() {
        const keys = Obj.keys(this.cs);

        keys.forEach((key) => {
            const keyProp = key as keyof ChocoUi.Props;
            const isSpacing = Boolean(
                this.spacingKeys.find((key) => key === keyProp),
            );
            const mapping = this.applyKeys[keyProp];
            const value = this.cs[key];

            console.log(isSpacing);
            const setSpacing = (value: ChocoUi.CSS): ChocoUi.CSS =>
                isSpacing ? this.spacing(value) : value;

            if (mapping) {
                if (Ary.is(mapping)) {
                    mapping.forEach(
                        (map) =>
                            (this.cs[map as keyof typeof this.cs] =
                                setSpacing(value)), // กำหนดค่าให้ property ใหม่
                    );
                    delete this.cs[key]; // ลบ key เดิมหลังจากกำหนดค่าทั้งหมดแล้ว
                } else if (typeof mapping === 'function') {
                    // Handle function mappings (for complex values)
                    const result = (
                        mapping as (
                            value: ChocoUi.CSS,
                        ) => ChocoUi.Emotion.CSSOthers
                    )(value);
                    Object.assign(this.cs, result);
                } else if (typeof mapping === 'string') {
                    // Handle string mappings (simple key-value)
                    this.cs[mapping]; //= setSpacing(value);
                    delete this.cs[key];
                } else {
                    if (value === true) {
                        Obj.map(
                            mapping,
                            (value, mapKey) =>
                                (this.cs[mapKey as keyof typeof this.cs] =
                                    setSpacing(value as ChocoUi.CSS)),
                        );
                        delete this.cs[key];
                    }
                }
            }
        });
    }
}
