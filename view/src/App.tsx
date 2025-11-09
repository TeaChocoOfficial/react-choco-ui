//-Path: "react-choco-ui/view/src/App.tsx"
import Test from './app/Test';
import { FPSDisplay } from './lib/components/custom/FPSDisplay';
import { ChocoUiProvider } from '@teachoco-official/react-choco-ui';

export default function App() {
    return (
        <ChocoUiProvider>
            <FPSDisplay
                visible
                memory
                hideBtn
                graph
                advanced
                position="bottom-right"
            />
            <Test />
        </ChocoUiProvider>
    );
}
