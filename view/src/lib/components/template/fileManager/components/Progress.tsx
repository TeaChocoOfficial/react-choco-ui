//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Progress.tsx"
import './Progress.scss';
import { createUi } from '$/custom/test/createUi';
import { useTranslation } from '$Hook/fileManager/context/TranslationProvider';

export const Progress = createUi(
    ({ percent = 0, isCanceled = false, isCompleted = false, error }) => {
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
);
