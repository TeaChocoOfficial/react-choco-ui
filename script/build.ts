//-Path: "react-choco-ui/script/build.ts"
import * as path from 'path';
import * as fs from 'fs-extra';
import { devlog, sourceDirs } from './data';
import * as chokidar from 'chokidar';

const getLibDir = (...parts: string[]) =>
    path.join(__dirname, '..', 'lib', ...parts);
const getNodeDir = (...parts: string[]) =>
    path.join(
        __dirname,
        '..',
        'view/node_modules/@teachoco-official',
        ...parts,
    );

const dists = sourceDirs.map((dir) => getLibDir(dir.lib, 'dist'));
// เพิ่ม: เส้นทางของ package.json สำหรับแต่ละ sourceDir
const packageJsonPaths = sourceDirs.map((dir) =>
    getLibDir(dir.lib, 'package.json'),
);

// สร้างโฟลเดอร์ปลายทางถ้ายังไม่มี
sourceDirs.forEach((dir) => fs.ensureDirSync(getNodeDir(dir.name)));

const findFiles = (filePath: string) => {
    // หา sourceDir ที่ตรงกับ filePath
    const sourceDir = sourceDirs.find((dir) =>
        filePath.startsWith(getLibDir(dir.lib)),
    );
    if (!sourceDir) return;

    const index = sourceDirs.indexOf(sourceDir);
    if (index === -1) return;

    const destDirsForThis = getNodeDir(sourceDirs[index].name);
    const relativePath = path.relative(getLibDir(sourceDir.lib), filePath);
    const destPath = path.join(destDirsForThis, relativePath);

    const libPaths =
        (sourceDir.libs
            ?.map((lib) => {
                if (!sourceDirs.find((dir) => dir.lib === lib)) return;
                const libNodePath = getLibDir(
                    lib,
                    'node_modules/@teachoco-official',
                );
                const libPath = path.join(
                    libNodePath,
                    sourceDir.name,
                    relativePath,
                );
                return libPath;
            })
            .filter(Boolean) as string[]) ?? [];
    return [destPath, ...libPaths];
};

// ฟังก์ชันคัดลอกไฟล์แบบมี retry mechanism
const copyFileWithRetry = async (
    filePath: string,
    destPath: string,
    retries = 3,
    delay = 100,
) => {
    for (let i = 0; i < retries; i++) {
        try {
            // ใช้ fs-extra copy แทน native copyfile เพื่อหลีกเลี่ยง EBUSY
            await fs.copy(filePath, destPath, { overwrite: true });
            if (devlog)
                console.log(`คัดลอกไฟล์: ${filePath} ไปยัง ${destPath}`);
            return;
        } catch (err: any) {
            if (err.code === 'EBUSY' && i < retries - 1) {
                // รอแล้วลองใหม่
                await new Promise((resolve) =>
                    setTimeout(resolve, delay * (i + 1)),
                );
                continue;
            }
            if (devlog)
                console.error(
                    `เกิดข้อผิดพลาดในการคัดลอกไฟล์ ${filePath}:`,
                    err,
                );
            return;
        }
    }
};

const copyFile = async (filePath: string) => {
    const destPaths = findFiles(filePath);
    if (!destPaths) return;

    // ใช้ Promise.all เพื่อคัดลอกพร้อมกันทั้งหมด
    await Promise.all(
        destPaths.map((destPath) => copyFileWithRetry(filePath, destPath)),
    );
};

// ฟังก์ชันสำหรับลบไฟล์
const removeFile = async (filePath: string) => {
    const destPaths = findFiles(filePath);
    if (!destPaths) return;

    await Promise.all(
        destPaths.map(async (destPath) => {
            try {
                await fs.remove(destPath);
                if (devlog) console.log(`ลบไฟล์: ${destPath}`);
            } catch (err) {
                if (devlog)
                    console.error(
                        `เกิดข้อผิดพลาดในการลบไฟล์ ${destPath}:`,
                        err,
                    );
            }
        }),
    );
};

// ตั้งค่า chokidar เพื่อตรวจจับการเปลี่ยนแปลง (ปรับให้เฝ้าดูทั้ง dist และ package.json)
const watcher = chokidar.watch([...dists, ...packageJsonPaths], {
    persistent: true,
    ignoreInitial: false, // คัดลอกไฟล์ทั้งหมดเมื่อเริ่มต้น
    ignored: ['**/node_modules/**', '**/.git/**'], // ละเว้นโฟลเดอร์ที่ไม่ต้องการ
    awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100,
    },
});

// เมื่อมีการเปลี่ยนแปลงไฟล์
watcher
    .on('all', (event, filePath) => {
        if (['add', 'change'].includes(event)) copyFile(filePath);
    })
    .on('unlink', (filePath) => removeFile(filePath))
    .on('error', (error) => console.error('เกิดข้อผิดพลาดใน watcher:', error));

console.log(`กำลังตรวจจับการเปลี่ยนแปลงใน ${dists.join(', ')}...`);
