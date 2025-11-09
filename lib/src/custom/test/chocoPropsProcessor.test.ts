//-Path: "react-choco-ui/lib/src/custom/chocoPropsProcessor.ts"
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';
import { Obj } from '@teachoco-dev/cli';
import { StyleManager } from './StyleManager.test';

export class ChocoPropsProcessor {
    private styleManager: StyleManager;

    constructor() {
        this.styleManager = StyleManager.getInstance();
    }

    process<UiType extends ChocoUi.Ui>(
        props: UiType['Prop'],
        name: string,
    ): UiType['Prop'] {
        const { full, flex, block, className, ...rest } = props;

        // ใช้ array แทนการเขียนซ้ำ
        const dimensions = {}; //h, w, p, m
        const dynamicClasses = this.generateDynamicClasses(dimensions);
        this.injectDynamicStyles(dimensions);

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
        [key in keyof typeof StyleManager.propertyMap]?: number;
    }): string[] {
        const classes: string[] = [];

        // ใช้ loop ลดความซ้ำซ้อน
        Obj.keys(StyleManager.propertyMap).forEach((type) => {
            const value = dimensions[type];
            const className = this.styleManager.getDynamicClass(value, type);
            if (className) classes.push(className);
        });

        return classes;
    }

    private injectDynamicStyles(dimensions: {
        [key in keyof typeof StyleManager.propertyMap]?: number;
    }): void {
        Obj.keys(StyleManager.propertyMap).forEach((type) => {
            const value = dimensions[type];
            if (value !== undefined) {
                this.styleManager.injectStyle(
                    `choco-${type}-${value}`,
                    value,
                    type,
                );
            }
        });
    }
}
