//-Path: "react-choco-ui/lib/base/src/theme/theme.ts"
import { ChocoUi } from '../types/ChocoUi';
import { ChocoShade } from '../custom/color/ChocoShade';

const defThemeMode: ChocoUi.Theme.Mode = 'dark';

export function themeMode(mode?: ChocoUi.Theme.Mode): ChocoUi.Theme.Mode {
    if (typeof window !== 'undefined' && localStorage) {
        if (mode) localStorage.setItem?.('theme mode', mode);
        let themeMode = localStorage.getItem?.('theme mode');
        if (themeMode === null) {
            const { matches } =
                window.matchMedia?.('(prefers-color-scheme: dark)') ?? {};
            themeMode = matches ? 'dark' : 'light';
            localStorage.setItem('theme mode', themeMode);
        }
        return themeMode as ChocoUi.Theme.Mode;
    }
    return defThemeMode;
}
export const defaultTheme: ChocoUi.Theme.Def = {
    mode: themeMode(),
    dark: {
        palette: {
            common: {
                body: new ChocoShade('hsl(222, 14%, 10%)'), // พื้นหลังหลัก dark
                surface: new ChocoShade('hsl(222, 14%, 15%)'), // พื้นผิว
            },
            main: {
                paper: new ChocoShade('hsl(222, 14%, 18%)'),

                // Primary - สีหลักของแบรนด์ (น้ำเงินเข้ม)
                primary: new ChocoShade('hsl(0, 0%, 25%)'),

                // Inverse - สีสำหรับพื้นหลังเข้ม (เทาอ่อน)
                inverse: new ChocoShade('hsl(222, 14%, 95%)'),
            },
            text: {
                paper: new ChocoShade('hsl(222, 14%, 80%)'),

                // Primary - ข้อความหลัก (เทาอ่อน)
                primary: new ChocoShade('hsl(222, 14%, 95%)'),

                // Inverse - ข้อความบนพื้นสีเข้ม (เทาเข้ม)
                inverse: new ChocoShade('hsl(222, 14%, 15%)'),
            },
        },
    },
    light: {
        palette: {
            common: {
                body: new ChocoShade('hsl(0, 0%, 98%)'), // พื้นหลังหลัก light
                surface: new ChocoShade('hsl(0, 0%, 100%)'), // พื้นผิว
            },
            main: {
                paper: new ChocoShade('hsl(0, 0%, 100%)'),

                // Primary - สีหลักของแบรนด์ (น้ำเงิน)
                primary: new ChocoShade('hsl(0, 0%, 85%)'),

                // Inverse - สีสำหรับพื้นหลังอ่อน (เทาเข้ม)
                inverse: new ChocoShade('hsl(222, 14%, 20%)'),
            },
            text: {
                paper: new ChocoShade('hsl(222, 14%, 20%)'),

                // Primary - ข้อความหลัก (เทาเข้ม)
                primary: new ChocoShade('hsl(0, 0%, 5%)'),

                // Inverse - ข้อความบนพื้นสีอ่อน (เทาอ่อน)
                inverse: new ChocoShade('hsl(222, 14%, 95%)'),
            },
        },
    },
    def: {
        responsive: {
            keys: ['m', 't', 'l', 'd'],
            fixed: 4,
            spacing: 4,
            percent: {
                m: 40,
                t: 60,
                l: 80,
                d: 100,
            },
            breakpoints: {
                m: 40,
                t: 60,
                l: 80,
                d: 100,
            },
        },
        palette: {
            common: {
                overlay: new ChocoShade('hsla(0, 0%, 20%, 0.5)'), // overlay

                gray: new ChocoShade('hsl(0, 0%, 60%)'),

                // Blue scale - สำหรับ primary และ info
                blue: new ChocoShade('hsl(217, 91%, 60%)'),

                // Green scale - สำหรับ success
                green: new ChocoShade('hsl(142, 71%, 45%)'),

                // Red scale - สำหรับ error
                red: new ChocoShade('hsl(0, 84%, 60%)'),

                // Orange scale - สำหรับ warning
                orange: new ChocoShade('hsl(25, 95%, 53%)'),
            },
            main: {
                // Secondary - สีรอง (ฟ้าอมเขียว)
                secondary: new ChocoShade('hsl(20, 60%, 30%)'),

                // Info - สีข้อมูล (ฟ้า)
                info: new ChocoShade('hsl(199, 89%, 48%)'), // #0ea5e9

                // Success - สีสำเร็จ (เขียว)
                success: new ChocoShade('hsl(142, 76%, 36%)'), // #16a34a

                // Warn - สีคำเตือน (ส้ม)
                warn: new ChocoShade('hsl(40, 95%, 53%)'), // #ea580c

                // Error - สีข้อผิดพลาด (แดง)
                error: new ChocoShade('hsl(0, 84%, 60%)'), // #dc2626
            },
            text: {
                // Secondary - สีรอง (ฟ้าอมเขียว)
                secondary: new ChocoShade('hsl(0, 0%, 90%)'),

                // Info - ข้อความข้อมูล
                info: new ChocoShade('hsl(199, 89%, 25%)'), // #0284c7

                // Success - ข้อความสำเร็จ
                success: new ChocoShade('hsl(142, 65%, 24%)'), // #166534

                // Warn - ข้อความคำเตือน
                warn: new ChocoShade('hsl(40, 95%, 30%)'), // #c2410c

                // Error - ข้อความผิดพลาด
                error: new ChocoShade('hsl(0, 74%, 32%)'), // #b91c1c
            },
        },
        // สีเพิ่มเติมสำหรับการใช้งานทั่วไป
        font: {
            unit: 'em',
            divide: 16,
            family: [
                'Inter',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            size: {
                xs: 12, // 0.75rem * 16 = 12px
                sm: 14, // 0.875rem * 16 = 14px
                base: 16, // 1rem * 16 = 16px
                lg: 18, // 1.125rem * 16 = 18px
                xl: 20, // 1.25rem * 16 = 20px
                '2xl': 24, // 1.5rem * 16 = 24px
                '3xl': 30, // 1.875rem * 16 = 30px
                '4xl': 36, // 2.25rem * 16 = 36px
            },
            weight: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                extrabold: 800,
            },
        },
        shape: {
            border: { radius: 2, width: 1 },
            shadows: [
                'none',
                '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                '0 35px 60px -15px rgb(0 0 0 / 0.3)',
            ],
        },
        shadows: [
            'none',
            '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            '0 35px 60px -15px rgb(0 0 0 / 0.3)',
        ],
        zIndex: {
            hide: -1,
            base: 0,
            docked: 10,
            dropdown: 1000,
            sticky: 1100,
            banner: 1200,
            overlay: 1300,
            modal: 1400,
            popover: 1500,
            skipLink: 1600,
            toast: 1700,
            tooltip: 1800,
        },
    },
};
