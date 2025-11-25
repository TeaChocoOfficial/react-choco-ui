//-Path: "react-choco-ui/main.ts"
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chokidar from 'chokidar';

// กำหนด path ต้นทางและปลายทาง
const libParts = ['all', 'base', 'ui'];
const destDirs = libParts.map((part) =>
    path.join(__dirname, `view/src/lib/${part}`),
);
const sourceDirs = libParts.map((part) =>
    path.join(__dirname, `lib/${part}/src`),
);

// สร้างโฟลเดอร์ปลายทางถ้ายังไม่มี (สำหรับแต่ละตัวใน array)
destDirs.forEach((dir) => fs.ensureDirSync(dir));

// ฟังก์ชันสำหรับคัดลอกไฟล์
const copyFile = (filePath: string) => {
    // หา sourceDir ที่ตรงกับ filePath
    const sourceDir = sourceDirs.find((dir) => filePath.startsWith(dir));
    if (!sourceDir) return;

    const index = sourceDirs.indexOf(sourceDir);
    if (index === -1) return;

    const destDirsForThis = destDirs[index];
    const relativePath = path.relative(sourceDir, filePath);
    const destPath = path.join(destDirsForThis, relativePath);

    fs.copy(filePath, destPath, { overwrite: true }, (err) => {
        if (err) {
            console.error(`เกิดข้อผิดพลาดในการคัดลอกไฟล์ ${filePath}:`, err);
        } else {
            console.log(`คัดลอกไฟล์: ${filePath} ไปยัง ${destPath}`);
        }
    });
};

// ฟังก์ชันสำหรับลบไฟล์
const removeFile = (filePath: string) => {
    // หา sourceDir ที่ตรงกับ filePath
    const sourceDir = sourceDirs.find((dir) => filePath.startsWith(dir));
    if (!sourceDir) return;

    const index = sourceDirs.indexOf(sourceDir);
    if (index === -1) return;

    const destDirsForThis = destDirs[index];
    const relativePath = path.relative(sourceDir, filePath);
    const destPath = path.join(destDirsForThis, relativePath);

    fs.remove(destPath, (err) => {
        if (err) {
            console.error(`เกิดข้อผิดพลาดในการลบไฟล์ ${destPath}:`, err);
        } else {
            console.log(`ลบไฟล์: ${destPath}`);
        }
    });
};

// ตั้งค่า chokidar เพื่อตรวจจับการเปลี่ยนแปลงสำหรับทุก sourceDirs
const watcher = chokidar.watch(sourceDirs, {
    persistent: true,
    ignoreInitial: false, // คัดลอกไฟล์ทั้งหมดเมื่อเริ่มต้น
    ignored: ['**/node_modules/**', '**/.git/**'], // ละเว้นโฟลเดอร์ที่ไม่ต้องการ
});

// เมื่อมีการเปลี่ยนแปลงไฟล์
watcher
    .on('add', (filePath) => {
        copyFile(filePath);
    })
    .on('change', (filePath) => {
        copyFile(filePath);
    })
    .on('unlink', (filePath) => {
        removeFile(filePath);
    })
    .on('error', (error) => {
        console.error('เกิดข้อผิดพลาดใน watcher:', error);
    });

console.log(`กำลังตรวจจับการเปลี่ยนแปลงใน ${sourceDirs.join(', ')}...`);
