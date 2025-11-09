//-Path: "react-choco-ui/lib/src/custom/chocoProps copy 2.ts"
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';

class StyleManager {
    private static instance: StyleManager;
    private styleCache = new Set<string>();
    private pendingStyles = new Set<string>();
    private classCache = new Map<string, string>();
    private flushTimeout: NodeJS.Timeout | null = null;
    private styleElement: HTMLStyleElement | null = null;

    static getInstance(): StyleManager {
        if (!StyleManager.instance) {
            StyleManager.instance = new StyleManager();
        }
        return StyleManager.instance;
    }

    private scheduleFlush(): void {
        if (this.flushTimeout) clearTimeout(this.flushTimeout);
        this.flushTimeout = setTimeout(() => {
            this.flushPendingStyles();
            this.flushTimeout = null;
        }, 16);
    }

    private getOrCreateStyleElement(): HTMLStyleElement {
        if (!this.styleElement && typeof document !== 'undefined') {
            const element = document.createElement('style');
            element.id = 'choco-dynamic-styles';
            document.head.appendChild(element);
            this.styleElement = element;
        }
        return this.styleElement!;
    }

    private flushPendingStyles(): void {
        if (this.pendingStyles.size === 0) return;

        const styleEl = this.getOrCreateStyleElement();
        const stylesToAdd = Array.from(this.pendingStyles).join('\n') + '\n';

        if (styleEl.sheet) {
            this.pendingStyles.forEach((css) => {
                try {
                    styleEl.sheet?.insertRule(
                        css,
                        styleEl.sheet.cssRules.length,
                    );
                } catch (e) {
                    styleEl.textContent += css + '\n';
                }
            });
        } else {
            styleEl.textContent += stylesToAdd;
        }

        this.pendingStyles.clear();
    }

    injectStyle(
        className: string,
        value: number,
        type: 'h' | 'w' | 'p' | 'm',
    ): void {
        if (this.styleCache.has(className)) return;

        const property = this.getPropertyByType(type);
        const css = `.${className} { ${property}: ${value * 0.25}rem; }`;

        this.pendingStyles.add(css);
        this.styleCache.add(className);

        if (this.pendingStyles.size >= 8) {
            this.flushPendingStyles();
        } else {
            this.scheduleFlush();
        }
    }

    private getPropertyByType(type: 'h' | 'w' | 'p' | 'm'): string {
        const propertyMap = {
            h: 'height',
            w: 'width',
            p: 'padding',
            m: 'margin',
        };
        return propertyMap[type];
    }

    getDynamicClass(
        value: number | undefined,
        type: 'h' | 'w' | 'p' | 'm',
    ): string | null {
        if (value === undefined) return null;

        const cacheKey = `${type}-${value}`;
        if (this.classCache.has(cacheKey)) {
            return this.classCache.get(cacheKey)!;
        }

        const className = `choco-${type}-${value}`;
        this.classCache.set(cacheKey, className);
        return className;
    }
}

class ChocoPropsProcessor {
    private styleManager: StyleManager;

    constructor() {
        this.styleManager = StyleManager.getInstance();
    }

    process<UiType extends ChocoUi.Ui>(
        props: UiType['Prop'],
        name: string,
    ): UiType['Prop'] {
        const { full, flex, block, h, w, p, m, className, ...rest } = props;

        const dynamicClasses = this.generateDynamicClasses({ h, w, p, m });
        this.injectDynamicStyles({ h, w, p, m });

        return {
            className: tw(
                'ChocoUi',
                name,
                { flex, block, full },
                dynamicClasses,
                className,
            ),
            ...rest,
        } as UiType['Prop'];
    }

    private generateDynamicClasses(dimensions: {
        h?: number;
        w?: number;
        p?: number;
        m?: number;
    }): string[] {
        const { h, w, p, m } = dimensions;
        return [
            this.styleManager.getDynamicClass(h, 'h'),
            this.styleManager.getDynamicClass(w, 'w'),
            this.styleManager.getDynamicClass(p, 'p'),
            this.styleManager.getDynamicClass(m, 'm'),
        ].filter(Boolean) as string[];
    }

    private injectDynamicStyles(dimensions: {
        h?: number;
        w?: number;
        p?: number;
        m?: number;
    }): void {
        const { h, w, p, m } = dimensions;

        if (h !== undefined)
            this.styleManager.injectStyle(`choco-h-${h}`, h, 'h');
        if (w !== undefined)
            this.styleManager.injectStyle(`choco-w-${w}`, w, 'w');
        if (p !== undefined)
            this.styleManager.injectStyle(`choco-p-${p}`, p, 'p');
        if (m !== undefined)
            this.styleManager.injectStyle(`choco-m-${m}`, m, 'm');
    }
}

// Singleton instance
const chocoPropsProcessor = new ChocoPropsProcessor();

// Export main function
export function chocoProps<UiType extends ChocoUi.Ui>(
    props: UiType['Prop'],
    name: string,
): UiType['Prop'] {
    return chocoPropsProcessor.process(props, name);
}
