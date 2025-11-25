//-Path: "react-choco-ui/lib/src/custom/ChocoShade.ts"
import { CColor } from './CColor';
import { ChocoUi } from '$Type/Choco';
import { Obj } from '@teachoco-dev/cli';

export class ChocoShade implements ChocoUi.Color.Colors {
    0: CColor;
    1: CColor;
    2: CColor;
    3: CColor;
    4: CColor;
    5: CColor;
    6: CColor;
    7: CColor;
    8: CColor;
    9: CColor;
    10: CColor;
    private readonly minShade: ChocoUi.Color.Shade.Key = 0;
    private readonly maxShade: ChocoUi.Color.Shade.Key = 10;
    constructor(color?: ChocoUi.Color.Type, alpha?: number, reverse?: boolean);
    constructor(color?: ChocoUi.Color.Type, reverse?: boolean);
    constructor(
        color?: ChocoUi.Color.Type,
        alphaOrReverse?: number | boolean,
        reverse: boolean = alphaOrReverse === true ? true : false,
    ) {
        const alpha =
            typeof alphaOrReverse === 'boolean' ? undefined : alphaOrReverse;
        const shadeStep: number = 0.5;
        const rgba = CColor.getRgba(color, alpha); // Static method call
        const mainShade = (this.maxShade * shadeStep) / 2;
        const effectiveAlpha = alpha !== undefined ? alpha : rgba.a;
        for (
            let index: ChocoUi.Color.Shade.Key = this.minShade;
            index <= this.maxShade;
            index++
        ) {
            const shade = reverse
                ? mainShade - index * shadeStep
                : -mainShade + index * shadeStep;
            const amount = shade / (mainShade * shadeStep);
            const chocoColor = new CColor(color, effectiveAlpha);
            this[index] = chocoColor.darker(amount);
        }
    }
    get main(): CColor {
        return this[
            ((this.minShade + this.maxShade) / 2) as ChocoUi.Color.Shade.Key
        ];
    }
    hex(color?: ChocoUi.Color.Type, alpha?: number): ChocoUi.Color.Hex {
        const rgba =
            color !== undefined
                ? CColor.getRgba(color, alpha)
                : this.main.rgba();
        return this.main.hex(rgba, alpha);
    }
    hld() {
        
    }
    toString(): ChocoUi.Color.Hex {
        return this.hex();
    }
    toArray(color?: ChocoUi.Color.Type): number[] {
        const rgba = color ? CColor.getRgba(color) : this.main.rgba();
        return [rgba.r, rgba.g, rgba.b, rgba.a];
    }
    alpha(amount: number, isThis?: boolean): CColor {
        return this.main.alpha(amount, isThis);
    }
    clone(rgba?: ChocoUi.Color.Rgba): CColor {
        return this.main.clone(rgba);
    }
    map<MapCallback>(
        callbackfn: ChocoUi.Color.Shade.MapCallbackFn<MapCallback>,
    ): MapCallback[] {
        if (typeof callbackfn !== 'function') {
            throw new TypeError('callbackfn must be a function');
        }
        return Obj.keys(this)
            .filter((key) => !isNaN(Number(key)))
            .map((key, index) =>
                callbackfn(
                    this[key as ChocoUi.Color.Shade.Key],
                    key as ChocoUi.Color.Shade.Key,
                    index,
                ),
            ) as MapCallback[];
    }
}
