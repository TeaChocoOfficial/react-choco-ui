//-Path: "react-choco-ui/lib/src/theme/theme.ts"
import { ChocoUi } from '$Type/Choco';
import { ChocoShade } from '$/custom/ChocoShade';

export const defaultTheme: ChocoUi.Theme = {
    responsive: {
        keys: ['m', 't', 'l', 'd'],
        fixed: 2,
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
        main: {
            // Primary - สีหลักของแบรนด์ (น้ำเงิน)
            primary: new ChocoShade('hsl(221, 83%, 53%)'), // #2563eb

            // Secondary - สีรอง (เทา)
            secondary: new ChocoShade('hsl(215, 14%, 34%)'), // #4b5563

            // Info - สีข้อมูล (ฟ้า)
            info: new ChocoShade('hsl(199, 89%, 48%)'), // #0ea5e9

            // Success - สีสำเร็จ (เขียว)
            success: new ChocoShade('hsl(142, 76%, 36%)'), // #16a34a

            // Warn - สีคำเตือน (ส้ม)
            warn: new ChocoShade('hsl(25, 95%, 53%)'), // #ea580c

            // Error - สีข้อผิดพลาด (แดง)
            error: new ChocoShade('hsl(0, 84%, 60%)'), // #dc2626

            // Inverse - สีสำหรับพื้นหลังเข้ม (ขาว)
            inverse: new ChocoShade('hsl(0, 0%, 100%)'), // #ffffff
        },
        text: {
            // Primary - ข้อความหลัก (เข้มมาก)
            primary: new ChocoShade('hsl(222, 47%, 11%)'), // #0f172a

            // Secondary - ข้อความรอง (เข้มปานกลาง)
            secondary: new ChocoShade('hsl(215, 16%, 47%)'), // #64748b

            // Info - ข้อความข้อมูล
            info: new ChocoShade('hsl(201, 96%, 32%)'), // #075985

            // Success - ข้อความสำเร็จ
            success: new ChocoShade('hsl(142, 65%, 24%)'), // #166534

            // Warn - ข้อความคำเตือน
            warn: new ChocoShade('hsl(21, 90%, 37%)'), // #9a3412

            // Error - ข้อความผิดพลาด
            error: new ChocoShade('hsl(0, 74%, 42%)'), // #b91c1c

            // Inverse - ข้อความบนพื้นสีเข้ม
            inverse: new ChocoShade('hsl(0, 0%, 100%)'), // #ffffff
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: {
            small: '0.875rem',
            medium: '1rem',
            large: '1.25rem',
        },
    },
};
