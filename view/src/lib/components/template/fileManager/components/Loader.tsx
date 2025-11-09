//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Loader.tsx"
import './Loader.scss';
import { ChocoUi } from '$Type/Choco';
import { createUi } from '$/custom/test/createUi';
import { CIcon } from '$Compo/template/CIcon';

export type LoaderType = ChocoUi.Ui<'div', { loading?: boolean }>;

export const Loader = createUi<LoaderType>(
    ({ loading = false, className, ...props }, ref) => {
        if (!loading) return null;

        return (
            <div
                ref={ref}
                className={`loader-container ${className}`}
                {...props}
            >
                <CIcon icon="ImSpinner2" className="spinner" />
            </div>
        );
    },
    'Loader',
);
