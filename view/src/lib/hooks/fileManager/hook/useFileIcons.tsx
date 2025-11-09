//-Path: "react-choco-ui/lib/src/hooks/fileManager/hook/useFileIcons.tsx"
import { Obj } from '@teachoco-dev/cli';
import { CIcon } from '$Compo/template/CIcon';
import { CActivity } from '$Compo/config/CActivity';

export const useFileIcons = (size: number) => {
    const fileIcons = {
        pdf: <CIcon icon="FaRegFilePdf" size={size} />,
        jpg: <CIcon icon="FaRegFileImage" size={size} />,
        jpeg: <CIcon icon="FaRegFileImage" size={size} />,
        png: <CIcon icon="FaRegFileImage" size={size} />,
        txt: <CIcon icon="FaRegFileLines" size={size} />,
        doc: <CIcon icon="FaRegFileWord" size={size} />,
        docx: <CIcon icon="FaRegFileWord" size={size} />,
        mp4: <CIcon icon="FaRegFileVideo" size={size} />,
        webm: <CIcon icon="FaRegFileVideo" size={size} />,
        mp3: <CIcon icon="FaRegFileAudio" size={size} />,
        m4a: <CIcon icon="FaRegFileAudio" size={size} />,
        zip: <CIcon icon="FaRegFileZipper" size={size} />,
        ppt: <CIcon icon="FaRegFilePowerpoint" size={size} />,
        pptx: <CIcon icon="FaRegFilePowerpoint" size={size} />,
        xls: <CIcon icon="FaRegFileExcel" size={size} />,
        xlsx: <CIcon icon="FaRegFileExcel" size={size} />,
        exe: <CIcon icon="FaLaptopFile" size={size} />,
        html: <CIcon icon="FaRegFileCode" size={size} />,
        css: <CIcon icon="FaRegFileCode" size={size} />,
        js: <CIcon icon="FaRegFileCode" size={size} />,
        php: <CIcon icon="FaRegFileCode" size={size} />,
        py: <CIcon icon="FaRegFileCode" size={size} />,
        java: <CIcon icon="FaRegFileCode" size={size} />,
        cpp: <CIcon icon="FaRegFileCode" size={size} />,
        c: <CIcon icon="FaRegFileCode" size={size} />,
        ts: <CIcon icon="FaRegFileCode" size={size} />,
        jsx: <CIcon icon="FaRegFileCode" size={size} />,
        tsx: <CIcon icon="FaRegFileCode" size={size} />,
        json: <CIcon icon="FaRegFileCode" size={size} />,
        xml: <CIcon icon="FaRegFileCode" size={size} />,
        sql: <CIcon icon="FaRegFileCode" size={size} />,
        csv: <CIcon icon="FaRegFileCode" size={size} />,
        md: <CIcon icon="FaRegFileCode" size={size} />,
        svg: <CIcon icon="FaRegFileCode" size={size} />,
    } as const;

    return (key?: keyof typeof fileIcons | string) => (
        <CActivity show={key !== undefined}>
            {
                fileIcons[
                    Obj.keys(fileIcons).find((icon) => icon === key)
                        ? (key as keyof typeof fileIcons)
                        : 'doc'
                ]
            }
        </CActivity>
    );
};
