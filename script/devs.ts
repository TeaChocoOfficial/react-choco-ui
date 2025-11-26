//-Path: "react-choco-ui/script/devs.ts"
import * as path from 'path'; // ถ้าต้องการ cwd (working directory)
import { sourceDirs } from './data';
import concurrently from 'concurrently';

concurrently(
    sourceDirs.map((dir) => ({
        name: 'Libart ' + dir.lib.toLocaleUpperCase(),
        command: 'pnpm dev',
        prefixColor: '#0000ff',
        cwd: path.join(__dirname, '..', 'lib', dir.lib),
    })),
    {
        prefix: 'name', // แสดงชื่อใน log
        // restartTries: 3, // ลอง restart ถ้าครั้งใดล้มเหลว (optional)
        killOthersOn: ['failure', 'success'], // หยุดทุก process ถ้ามีตัวใดตัวหนึ่งสำเร็จหรือล้มเหลว
    },
);
