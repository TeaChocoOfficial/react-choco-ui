//-Path: "react-choco-ui/lib/src/custom/StyleManager.ts"

export class StyleManager {
    private static instance: StyleManager;
    private styleCache = new Set<string>();
    private pendingStyles = new Set<string>();
    private classCache = new Map<string, string>();
    private flushTimeout: NodeJS.Timeout | null = null;
    private styleElement: HTMLStyleElement | null = null;
    static propertyMap = {
        h: 'height',
        w: 'width',
        p: 'padding',
        m: 'margin',
    };

    static getInstance(): StyleManager {
        if (!StyleManager.instance) StyleManager.instance = new StyleManager();
        return StyleManager.instance;
    }

    private scheduleFlush(): void {
        if (this.flushTimeout) clearTimeout(this.flushTimeout);
        this.flushTimeout = setTimeout(() => {
            console.log("scheduleFlush");
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
        type: keyof typeof StyleManager.propertyMap,
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

    private getPropertyByType(
        type: keyof typeof StyleManager.propertyMap,
    ): string {
        return StyleManager.propertyMap[type];
    }

    getDynamicClass(
        value: number | undefined,
        type: keyof typeof StyleManager.propertyMap,
    ): string | null {
        if (value === undefined) return null;

        const cacheKey = `${type}-${value}`;
        if (this.classCache.has(cacheKey))
            return this.classCache.get(cacheKey)!;

        const className = `choco-${type}-${value}`;
        this.classCache.set(cacheKey, className);
        return className;
    }
}
