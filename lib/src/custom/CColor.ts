//-Path: "react-choco-ui/lib/src/custom/CColor.ts"
// react-choco-ui/lib/src/custom/CColor.ts
import * as Chroma from 'chroma.ts';
import { ChocoUi } from '$Type/Choco';
import { ChocoShade } from './ChocoShade';

export class CColor {
    private _rgba: ChocoUi.Color.Rgba;
    private _hsla: ChocoUi.Color.Hsla;

    constructor(color?: ChocoUi.Color.Type, alpha?: number) {
        this._rgba = CColor.getRgba(color, alpha);
        this._hsla = CColor.rgbaToHsla(this._rgba);
    }

    set(color?: ChocoUi.Color.Type, alpha?: number) {
        this._rgba = CColor.getRgba(color, alpha);
        this._hsla = CColor.rgbaToHsla(this._rgba);
        return this;
    }

    rgba(rgba?: ChocoUi.Color.Rgba): ChocoUi.Color.Rgba {
        if (rgba) {
            this._rgba = rgba;
            this._hsla = CColor.rgbaToHsla(rgba);
        }
        return this._rgba;
    }

    hsla(hsla?: ChocoUi.Color.Hsla): ChocoUi.Color.Hsla {
        if (hsla) {
            this._hsla = hsla;
            this._rgba = CColor.hslaToRgba(hsla);
        }
        return this._hsla;
    }

    hex(color?: ChocoUi.Color.Type, alpha?: number): ChocoUi.Color.Hex {
        const rgba =
            color !== undefined ? CColor.getRgba(color, alpha) : this.rgba();
        return CColor.hex(rgba, alpha);
    }

    hsl(alpha?: number): ChocoUi.Color.Hsl | ChocoUi.Color.HslaStr {
        const hsla = this.hsla();
        const effectiveAlpha = alpha !== undefined ? alpha : hsla.a;
        if (effectiveAlpha === 1) {
            return `hsl(${Math.round(hsla.h)}, ${Math.round(
                hsla.s,
            )}%, ${Math.round(hsla.l)}%)` as ChocoUi.Color.Hsl;
        } else {
            return `hsla(${Math.round(hsla.h)}, ${Math.round(
                hsla.s,
            )}%, ${Math.round(
                hsla.l,
            )}%, ${effectiveAlpha})` as ChocoUi.Color.HslaStr;
        }
    }

    toString(format: 'hex' | 'hsl' = 'hex'): string {
        return format === 'hsl' ? this.hsl() : this.hex();
    }

    toArray(color?: ChocoUi.Color.Type): number[] {
        const rgba = color ? CColor.getRgba(color) : this.rgba();
        return [rgba.r, rgba.g, rgba.b, rgba.a];
    }

    toHslArray(): number[] {
        const hsla = this.hsla();
        return [hsla.h, hsla.s, hsla.l, hsla.a];
    }

    // HSL-based manipulation methods
    hue(hue: number, isThis?: boolean): CColor {
        const newHsla = new ChocoUi.Color.Hsla(
            hue,
            this._hsla.s,
            this._hsla.l,
            this._hsla.a,
        );

        if (isThis) {
            this.hsla(newHsla);
            return this;
        } else {
            return new CColor(newHsla);
        }
    }

    saturation(saturation: number, isThis?: boolean): CColor {
        const newHsla = new ChocoUi.Color.Hsla(
            this._hsla.h,
            Math.max(0, Math.min(100, saturation)),
            this._hsla.l,
            this._hsla.a,
        );

        if (isThis) {
            this.hsla(newHsla);
            return this;
        } else {
            return new CColor(newHsla);
        }
    }

    lightness(lightness: number, isThis?: boolean): CColor {
        const newHsla = new ChocoUi.Color.Hsla(
            this._hsla.h,
            this._hsla.s,
            Math.max(0, Math.min(100, lightness)),
            this._hsla.a,
        );

        if (isThis) {
            this.hsla(newHsla);
            return this;
        } else {
            return new CColor(newHsla);
        }
    }

    // Existing methods with HSL awareness
    lighter(amount = 1, isThis?: boolean) {
        const currentLightness = this._hsla.l;
        const newLightness = Math.min(100, currentLightness + amount * 10);
        return this.lightness(newLightness, isThis);
    }

    darker(amount = 1, isThis?: boolean) {
        const currentLightness = this._hsla.l;
        const newLightness = Math.max(0, currentLightness - amount * 10);
        return this.lightness(newLightness, isThis);
    }

    alpha(amount: number, isThis?: boolean): CColor {
        try {
            if (amount > 1 || amount < 0)
                throw Error(`alpha must be between 0 and 1`);

            if (isThis) {
                this._rgba.a = amount;
                this._hsla.a = amount;
                return this;
            } else {
                const newRgba = new ChocoUi.Color.Rgba(
                    this._rgba.r,
                    this._rgba.g,
                    this._rgba.b,
                    amount,
                );
                return new CColor(newRgba);
            }
        } catch (error) {
            console.error(error);
            return isThis ? this : this.clone();
        }
    }

    clone(rgba?: ChocoUi.Color.Rgba, hsla?: ChocoUi.Color.Hsla): CColor {
        if (rgba) {
            return new CColor(rgba);
        } else if (hsla) {
            return new CColor(hsla);
        } else {
            return new CColor(this._rgba);
        }
    }

    // Static methods
    static hex(color?: ChocoUi.Color.Type, alpha?: number): ChocoUi.Color.Hex {
        try {
            const rgba = CColor.getRgba(color, alpha);
            const chromaColor = Chroma.color([rgba.r, rgba.g, rgba.b, rgba.a]);
            const effectiveAlpha = alpha !== undefined ? alpha : rgba.a;
            return chromaColor.hex(
                effectiveAlpha === 1 ? 'rgb' : 'rgba',
            ) as ChocoUi.Color.Hex;
        } catch (error) {
            console.error('Invalid color:', error);
            return '#00000000';
        }
    }

    static hsl(
        color: ChocoUi.Color.Hsl | ChocoUi.Color.HslaStr | ChocoUi.Color.Hsla,
    ): ChocoUi.Color.Hsla {
        try {
            if (color instanceof ChocoUi.Color.Hsla) {
                return new ChocoUi.Color.Hsla(
                    color.h,
                    color.s,
                    color.l,
                    color.a,
                );
            }

            if (typeof color === 'string') {
                const match = color.match(
                    /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/i,
                );
                if (match) {
                    const h = parseInt(match[1]);
                    const s = parseInt(match[2]);
                    const l = parseInt(match[3]);
                    const a = match[4] ? parseFloat(match[4]) : 1;
                    return new ChocoUi.Color.Hsla(h, s, l, a);
                }
            }

            throw new Error('Invalid HSL color format');
        } catch (error) {
            console.error('Invalid HSL color:', error);
            return new ChocoUi.Color.Hsla();
        }
    }

    static rgbaToHsla(rgba: ChocoUi.Color.Rgba): ChocoUi.Color.Hsla {
        const r = rgba.r / 255;
        const g = rgba.g / 255;
        const b = rgba.b / 255;
        const a = rgba.a;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return new ChocoUi.Color.Hsla(
            Math.round(h * 360),
            Math.round(s * 100),
            Math.round(l * 100),
            a,
        );
    }

    static hslaToRgba(hsla: ChocoUi.Color.Hsla): ChocoUi.Color.Rgba {
        const h = hsla.h / 360;
        const s = hsla.s / 100;
        const l = hsla.l / 100;
        const a = hsla.a;

        if (s === 0) {
            const value = Math.round(l * 255);
            return new ChocoUi.Color.Rgba(value, value, value, a);
        }

        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        const g = Math.round(hue2rgb(p, q, h) * 255);
        const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

        return new ChocoUi.Color.Rgba(r, g, b, a);
    }

    static getRgba(
        color?: ChocoUi.Color.Type,
        alpha?: number,
    ): ChocoUi.Color.Rgba {
        try {
            if (color === null) return new ChocoUi.Color.Rgba();

            // Handle Hsla instance
            if (color instanceof ChocoUi.Color.Hsla) {
                return CColor.hslaToRgba(color);
            }

            // Handle HSL strings
            if (
                typeof color === 'string' &&
                (color.startsWith('hsl(') || color.startsWith('hsla('))
            ) {
                const hsla = CColor.hsl(
                    color as ChocoUi.Color.Hsl | ChocoUi.Color.HslaStr,
                );
                if (alpha !== undefined) hsla.a = alpha;
                return CColor.hslaToRgba(hsla);
            }

            // Existing handling for other types
            if (color instanceof ChocoUi.Color.Rgba)
                return new ChocoUi.Color.Rgba(
                    color.r,
                    color.g,
                    color.b,
                    alpha ?? color.a,
                );
            if (color instanceof CColor)
                return new ChocoUi.Color.Rgba(
                    color.rgba().r,
                    color.rgba().g,
                    color.rgba().b,
                    alpha !== undefined ? alpha : color.rgba().a,
                );
            if (typeof color === 'number') {
                let base16 = (color >>> 0).toString(16);
                let hex: string;
                if (base16.length <= 3) {
                    hex = base16.replace(/(.)/g, '$1$1').padStart(6, '0');
                } else {
                    hex = base16.padStart(6, '0').slice(-6);
                }
                color = `#${hex}` as ChocoUi.Color.Hex;
            }
            const chromaColor = Chroma.color(
                color instanceof ChocoShade
                    ? color.hex()
                    : color ?? '#00000000',
            );
            const [r, g, b] = chromaColor.rgb();
            const effectiveAlpha =
                alpha !== undefined ? alpha : chromaColor.alpha();
            return new ChocoUi.Color.Rgba(r, g, b, effectiveAlpha);
        } catch (error) {
            console.error('Invalid color:', error);
            return new ChocoUi.Color.Rgba();
        }
    }

    static from(color?: ChocoUi.Color.Type, alpha: number = 1): CColor {
        return new CColor(color, alpha);
    }

    // Static HSL creation method
    static fromHsl(h: number, s: number, l: number, a: number = 1): CColor {
        return new CColor(new ChocoUi.Color.Hsla(h, s, l, a));
    }
}
