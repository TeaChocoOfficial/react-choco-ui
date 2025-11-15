//-Path: "react-choco-ui/lib/src/components/template/fileManager/components/Loader.tsx"
import './Loader.scss';
import { ChocoUi } from '$Type/Choco';
import { customUi } from '$/custom/customUi';
import { CIcon } from '$Compo/template/CIcon';

export type LoaderType = ChocoUi.Ui<'div', { loading?: boolean }>;

export const Loader = customUi<LoaderType>(
    'div',
    'Loader',
)(({ props: { loading = false, className, ...props }, ref }) => {
    if (!loading) return null;
    return (
        <div ref={ref} className={`loader-container ${className}`} {...props}>
            <CIcon icon="ImSpinner2" className="spinner" />
        </div>
    );
})();
