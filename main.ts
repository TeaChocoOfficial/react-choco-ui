//-Path: "react-setup-test/main.ts"
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chokidar from 'chokidar';

// กำหนด path ต้นทางและปลายทาง
const destDir = path.join(__dirname, 'view/lib');
const sourceDir = path.join(__dirname, 'lib/src');

// สร้างโฟลเดอร์ปลายทางถ้ายังไม่มี
fs.ensureDirSync(destDir);

// ตั้งค่า chokidar เพื่อตรวจจับการเปลี่ยนแปลง
const watcher = chokidar.watch(sourceDir, {
    persistent: true,
    ignoreInitial: false, // คัดลอกไฟล์ทั้งหมดเมื่อเริ่มต้น
    ignored: ['**/node_modules/**', '**/.git/**'], // ละเว้นโฟลเดอร์ที่ไม่ต้องการ
});

// เมื่อมีการเปลี่ยนแปลงไฟล์
watcher
    .on('add', (filePath) => {
        const relativePath = path.relative(sourceDir, filePath);
        const destPath = path.join(destDir, relativePath);
        fs.copy(filePath, destPath, { overwrite: true }, (err) => {
            if (err) {
                console.error(
                    `เกิดข้อผิดพลาดในการคัดลอกไฟล์ ${filePath}:`,
                    err,
                );
            } else {
                console.log(`คัดลอกไฟล์: ${filePath} ไปยัง ${destPath}`);
            }
        });
    })
    .on('change', (filePath) => {
        const relativePath = path.relative(sourceDir, filePath);
        const destPath = path.join(destDir, relativePath);
        fs.copy(filePath, destPath, { overwrite: true }, (err) => {
            if (err) {
                console.error(
                    `เกิดข้อผิดพลาดในการคัดลอกไฟล์ที่เปลี่ยนแปลง ${filePath}:`,
                    err,
                );
            } else {
                console.log(
                    `ไฟล์เปลี่ยนแปลงและคัดลอก: ${filePath} ไปยัง ${destPath}`,
                );
            }
        });
    })
    .on('unlink', (filePath) => {
        const relativePath = path.relative(sourceDir, filePath);
        const destPath = path.join(destDir, relativePath);
        fs.remove(destPath, (err) => {
            if (err) {
                console.error(`เกิดข้อผิดพลาดในการลบไฟล์ ${destPath}:`, err);
            } else {
                console.log(`ลบไฟล์: ${destPath}`);
            }
        });
    })
    .on('error', (error) => {
        console.error('เกิดข้อผิดพลาดใน watcher:', error);
    });

console.log(`กำลังตรวจจับการเปลี่ยนแปลงใน ${sourceDir}...`);
