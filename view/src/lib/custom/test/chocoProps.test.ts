//-Path: "react-choco-ui/lib/src/custom/chocoProps.ts"
import { tw } from '$/config/utils';
import { ChocoUi } from '$Type/Choco';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

// ค่าคงที่แบบสั้น
const sizes = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
    24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
] as const;

const colors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
] as const;

// ฟังก์ชันสร้าง object แบบสั้น
const createObj = (prefix: string, values: readonly any[]) =>
    Object.fromEntries(values.map((v) => [v, `${prefix}-${v}`]));

// สร้าง color variants แบบเรียบง่าย (ไม่มี nested structure)
const createColorVariants = (prefix: string) => {
    const result: Record<string, string> = {};

    // สีพื้นฐาน
    result.transparent = `${prefix}-transparent`;
    result.white = `${prefix}-white`;
    result.black = `${prefix}-black`;

    // สีต่างๆ พร้อมระดับ 500 (default)
    colors.forEach((color) => {
        result[color] = `${prefix}-${color}-500`;
    });

    // สีต่างๆ พร้อมระดับอื่นๆ
    colors.forEach((color) => {
        [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach((shade) => {
            result[`${color}.${shade}`] = `${prefix}-${color}-${shade}`;
        });
    });

    return result;
};

export const boxVariantsCva = cva('CBox', {
    variants: {
        // Variants หลัก
        variant: {
            default: '',
            primary: 'bg-blue-500 text-white',
            secondary: 'bg-gray-500 text-white',
            success: 'bg-green-500 text-white',
            danger: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            outlined: 'border border-gray-300 bg-transparent',
            ghost: 'bg-transparent hover:bg-gray-100',
        },

        // Layout พื้นฐาน
        full: {
            true: 'w-full h-full',
        },

        // Width & Height
        width: createObj('w', ['auto', 'full', 'screen', 'fit']),
        height: createObj('h', ['auto', 'full', 'screen', 'fit']),

        // Spacing
        p: createObj('p', sizes),
        m: createObj('m', sizes),

        // Specific sizes
        w: createObj('w', sizes),
        h: createObj('h', sizes),

        // Colors - ใช้โครงสร้างแบบเรียบ
        bg: createColorVariants('bg'),
        clr: createColorVariants('text'),

        // Border & Radius
        rounded: createObj('rounded', ['none', 'sm', 'md', 'lg', 'full']),
        border: { none: 'border-0', default: 'border', thick: 'border-2' },

        // Shadow
        shadow: createObj('shadow', ['none', 'sm', 'md', 'lg']),

        // Display & Position
        display: createObj('', ['block', 'flex', 'grid', 'hidden']),
        position: createObj('', ['static', 'relative', 'absolute', 'fixed']),
    },
});

const boxVariants = tv({
    base: 'transition-colors',
    variants: {
        h: {
            10: 'h-10',
            20: 'h-20',
            32: 'h-32',
            auto: 'h-auto',
            full: 'h-full',
        },
        w: {
            10: 'w-10',
            20: 'w-20',
            32: 'w-32',
            auto: 'w-auto',
            full: 'w-full',
        },
        // ... variants อื่นๆ
    },
    defaultVariants: {
        h: 'auto',
        w: 'auto',
    },
});

export function chocoProps<UiType extends ChocoUi.Ui>({
    p,
    m,
    h,
    w,
    bg,
    full,
    className,
    ...props
}: UiType['Prop']): UiType['Prop'] {
    const variantClass = boxVariants({ h, w });

    const classes = clsx(
        full && 'w-full h-full',
        typeof h === 'number' && !boxVariants.variants.h?.[h] && `h-[${h}px]`,
        typeof w === 'number' && !boxVariants.variants.w?.[w] && `w-[${w}px]`,
        p && `p-[${p}px]`,
        m && `m-[${m}px]`,
        bg && `bg-${bg}-500`,
        className,
    );

    const dynamicClasses = [
        full && 'w-full h-full',
        typeof h === 'number' && !boxVariants.variants.h?.[h] && `h-[${h}px]`,
        typeof w === 'number' && !boxVariants.variants.w?.[w] && `w-[${w}px]`,
        p && `p-[${p}px]`,
        m && `m-[${m}px]`,
        bg && `bg-${bg}-500`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return {
        className: [variantClass, dynamicClasses].filter(Boolean).join(' ') || undefined,
        // tw(boxVariants({ p, m, w, h, bg, full, className })) || undefined,
        ...props,
    } as UiType['Prop'];
}
