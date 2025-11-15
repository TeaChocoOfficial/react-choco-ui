//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Progress.tsx"
import './Progress.scss';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export type ProgressType = ChocoUi.Ui<
    'div',
    {
        error?: React.ReactNode;
        percent?: number;
        isCanceled?: boolean;
        isCompleted?: boolean;
    }
>;

export const Progress = customUi<ProgressType>(
    'div',
    'Progress',
)(
    ({
        props: { percent = 0, isCanceled = false, isCompleted = false, error },
    }) => {
        const t = useTranslation();

        return (
            <div role="progressbar" className="fm-progress">
                {!error && (
                    <div className="fm-progress-bar">
                        <div
                            className="fm-progress-bar-fill"
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                )}
                {isCanceled ? (
                    <span className="fm-upload-canceled">{t('canceled')}</span>
                ) : error ? (
                    <span className="fm-upload-canceled">{error}</span>
                ) : (
                    <div className="fm-progress-status">
                        <span>
                            {isCompleted
                                ? t('completed')
                                : t('percentDone', { percent })}
                        </span>
                    </div>
                )}
            </div>
        );
    },
)();
