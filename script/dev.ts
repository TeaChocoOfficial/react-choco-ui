//-Path: "react-choco-ui/script/dev.ts"
import * as path from 'path'; // ถ้าต้องการ cwd (working directory)
import concurrently from 'concurrently';

const running = concurrently(
    [
        {
            name: 'BuildNode',
            command: 'pnpm build',
            prefixColor: '#00ff00',
            cwd: path.join(__dirname, '..'),
        },
        {
            name: 'BuildLib',
            command: 'pnpm lib',
            prefixColor: '#00ff00',
            cwd: path.join(__dirname, '..'),
        },
        {
            name: 'View',
            command: 'pnpm dev',
            prefixColor: '#ffff00',
            cwd: path.join(__dirname, '..', 'view'),
        },
        {
            name: 'Storybook',
            command: 'pnpm storybook',
            prefixColor: '#ff69b4',
            cwd: path.join(__dirname, '..', 'view'),
        },
    ],
    {
        prefix: 'name', // แสดงชื่อใน log
        // restartTries: 3, // ลอง restart ถ้าครั้งใดล้มเหลว (optional)
        killOthersOn: ['failure', 'success'], // หยุดทุก process ถ้ามีตัวใดตัวหนึ่งสำเร็จหรือล้มเหลว
    },
);

// จัดการผลลัพธ์
// running.result
//     .then(() => console.log('ทุกคำสั่งเสร็จสิ้นแล้ว!'))
//     .catch((failures) => console.error('มีปัญหา:', failures));
