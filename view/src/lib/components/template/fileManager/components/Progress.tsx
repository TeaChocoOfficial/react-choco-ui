//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Progress.tsx"
// import './Progress.scss';
import { CBox } from '$Compo/ui/CBox';
import { CText } from '$Compo/ui/CText';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export interface ProgressProps {
    error?: React.ReactNode;
    percent?: number;
    isCanceled?: boolean;
    isCompleted?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
    error,
    percent = 0,
    isCanceled = false,
    isCompleted = false,
}) => {
    const t = useTranslation();

    return (
        <CBox g={2} dFlex column role="progressbar" className="fm-progress">
            {!error && (
                <CBox
                    h={5}
                    fullW
                    borR={1}
                    bgClr="paper"
                    className="fm-progress-bar"
                >
                    <CBox
                        fullH
                        borR={1}
                        fullMaxW
                        bgClr="secondary"
                        className="fm-progress-bar-fill"
                        style={{ width: `${percent}%` }}
                    />
                </CBox>
            )}
            {isCanceled || error ? (
                <CText
                    clr="error"
                    fontS={0.75}
                    fontW="semibold"
                    className="fm-upload-canceled"
                >
                    {error ? error : t('canceled')}
                </CText>
            ) : (
                <CBox
                    dFlex
                    jcBetween
                    fontS={0.75}
                    fontW="semibold"
                    className="fm-progress-status"
                >
                    <CText>
                        {isCompleted
                            ? t('completed')
                            : t('percentDone', { percent })}
                    </CText>
                </CBox>
            )}
        </CBox>
    );
};
