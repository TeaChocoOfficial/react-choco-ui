//-Path: "react-choco-ui/lib/src/hooks/fileManager/hook/useFileIcons.tsx"
import { Obj } from '@teachoco-dev/cli';
import { CIcon } from '@teachoco-official/react-choco-custom';
import { CActivity } from '@teachoco-official/react-choco-base';

export const useFileIcons = (size: number) => {
    const fileIcons = {
        pdf: <CIcon icon="FaRegFilePdf" fontS={size} />,
        jpg: <CIcon icon="FaRegFileImage" fontS={size} />,
        jpeg: <CIcon icon="FaRegFileImage" fontS={size} />,
        png: <CIcon icon="FaRegFileImage" fontS={size} />,
        txt: <CIcon icon="FaRegFileLines" fontS={size} />,
        doc: <CIcon icon="FaRegFileWord" fontS={size} />,
        docx: <CIcon icon="FaRegFileWord" fontS={size} />,
        mp4: <CIcon icon="FaRegFileVideo" fontS={size} />,
        webm: <CIcon icon="FaRegFileVideo" fontS={size} />,
        mp3: <CIcon icon="FaRegFileAudio" fontS={size} />,
        m4a: <CIcon icon="FaRegFileAudio" fontS={size} />,
        zip: <CIcon icon="FaRegFileZipper" fontS={size} />,
        ppt: <CIcon icon="FaRegFilePowerpoint" fontS={size} />,
        pptx: <CIcon icon="FaRegFilePowerpoint" fontS={size} />,
        xls: <CIcon icon="FaRegFileExcel" fontS={size} />,
        xlsx: <CIcon icon="FaRegFileExcel" fontS={size} />,
        exe: <CIcon icon="FaLaptopFile" fontS={size} />,
        html: <CIcon icon="FaRegFileCode" fontS={size} />,
        css: <CIcon icon="FaRegFileCode" fontS={size} />,
        js: <CIcon icon="FaRegFileCode" fontS={size} />,
        php: <CIcon icon="FaRegFileCode" fontS={size} />,
        py: <CIcon icon="FaRegFileCode" fontS={size} />,
        java: <CIcon icon="FaRegFileCode" fontS={size} />,
        cpp: <CIcon icon="FaRegFileCode" fontS={size} />,
        c: <CIcon icon="FaRegFileCode" fontS={size} />,
        ts: <CIcon icon="FaRegFileCode" fontS={size} />,
        jsx: <CIcon icon="FaRegFileCode" fontS={size} />,
        tsx: <CIcon icon="FaRegFileCode" fontS={size} />,
        json: <CIcon icon="FaRegFileCode" fontS={size} />,
        xml: <CIcon icon="FaRegFileCode" fontS={size} />,
        sql: <CIcon icon="FaRegFileCode" fontS={size} />,
        csv: <CIcon icon="FaRegFileCode" fontS={size} />,
        md: <CIcon icon="FaRegFileCode" fontS={size} />,
        svg: <CIcon icon="FaRegFileCode" fontS={size} />,
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
