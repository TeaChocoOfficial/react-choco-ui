//-Path: "react-choco-ui/lib/src/custom/size.ts"
import { ChocoUi } from '$Type/Choco';
import { useTheme } from '$/theme/useTheme';

export class Size {
    private _value?: ChocoUi.Size.Obj;

    constructor(
        param?:
            | Size
            | string
            | number
            | ChocoUi.Size.Obj
            | ChocoUi.Size.Function,
    ) {
        const theme = useTheme();
        if (typeof param === 'number' || typeof param === 'string') {
            // If param is number or string, apply to all sizes
            this._value = {};
            theme.responsive.keys.forEach((key) => {
                this._value![key] = param;
            });
        } else if (param instanceof Size) {
            // If param is another Size instance, copy its value
            this._value = { ...param.value };
        } else if (typeof param === 'function') {
            // If param is a function, execute it for each key
            this._value = {};
            theme.responsive.keys.forEach((key) => {
                const percent = theme.responsive.percent[key];
                const result = param(percent, key);
                this._value![key] = result;
            });
        } else if (typeof param === 'object') {
            // If param is SizeObj, use it directly
            this._value = { ...param };
        }
    }

    // Get the raw value object
    get value(): ChocoUi.Size.Obj {
        return { ...this._value };
    }

    // Calculate responsive values based on theme percentages
    get response(): ChocoUi.Size.Obj {
        const theme = useTheme();
        const result: ChocoUi.Size.Obj = {};

        theme.responsive.keys.forEach((key) => {
            const value = this._value?.[key];

            if (value === undefined || value === null) {
                // If no value for this breakpoint, try to find from smaller breakpoints
                const currentIndex = theme.responsive.keys.indexOf(key);
                for (let i = currentIndex - 1; i >= 0; i--) {
                    const smallerKey = theme.responsive.keys[i];
                    if (
                        this._value?.[smallerKey] !== undefined &&
                        this._value[smallerKey] !== null
                    ) {
                        result[key] = this._value[smallerKey];
                        return;
                    }
                }
                // If no value found in smaller breakpoints, set to null
                result[key] = undefined;
            } else {
                // Calculate percentage based on theme
                const percent = theme.responsive.percent[key] / 100;
                if (typeof value === 'number') {
                    const fixed = 10 ** theme.responsive.fixed;
                    result[key] = Math.round(value * percent * fixed) / fixed;
                } else {
                    // For other strings or unknown formats, return as is
                    result[key] = value;
                }
            }
        });

        return result;
    }

    // Utility methods to set values for specific breakpoints
    set(key: ChocoUi.Size.Key, value: ChocoUi.Size.Value): Size {
        if (!this._value) this._value = {};
        this._value[key] = value;
        return this;
    }

    get(key: ChocoUi.Size.Key): ChocoUi.Size.Value | undefined {
        return this._value?.[key];
    }
}
