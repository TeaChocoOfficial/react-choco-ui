//-Path: "react-choco-ui/view/src/app/FileManager.tsx"
import { useState } from 'react';
import C, { ChocoUi } from '@teachoco-official/react-choco-ui';

export default function FileManager() {
    const [files, setFiles] = useState([
        {
            name: 'Documents',
            isDirectory: true, // Folder
            path: '/Documents', // Located in Root directory
            updatedAt: '2024-09-09T10:30:00Z', // Last updated time
        },
        {
            name: 'Pictures',
            isDirectory: true,
            path: '/Pictures', // Located in Root directory as well
            updatedAt: '2024-09-09T11:00:00Z',
        },
        {
            name: 'Ado',
            isDirectory: true, // Folder
            path: '/Ado', // Located in Root directory
            updatedAt: '2024-09-09T10:30:00Z', // Last updated time
        },
        {
            name: 'Pic.png',
            isDirectory: false, // File
            path: '/Pictures/Pic.png', // Located inside the "Pictures" folder
            updatedAt: '2024-09-08T16:45:00Z',
            size: 2048, // File size in bytes (example: 2 KB)
        },
        {
            name: 'Undertale',
            isDirectory: true,
            path: '/Pictures/Undertale', // Located in Root directory as well
            updatedAt: '2024-09-09T11:00:00Z',
        },
        {
            name: 'Sans.png',
            isDirectory: false, // File
            path: '/Pictures/Undertale/Sans.png', // Located inside the "Pictures" folder
            updatedAt: '2024-09-08T16:45:00Z',
            size: 2048, // File size in bytes (example: 2 KB)
        },
    ]);

    return (
        <C.Box screenH>
            <C.FileManager
                color="success"
                files={files}
                collapsibleNav
                actions={new Map([])}
                language="th-TH"
                layout="list"
                permissions={{
                    copy: true,
                    move: true,
                    rename: true,
                    upload: true,
                    create: true, // Disable "Create Folder"
                    delete: true, // Disable "Delete"
                    download: true, // Enable "Download"
                }}
            />
        </C.Box>
    );
}
