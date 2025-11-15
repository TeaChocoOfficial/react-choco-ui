//-Path: "react-choco-ui/view/src/App.tsx"
import Test from './app/Test';
import { CFPSDisplay } from './lib/components/custom/CFPSDisplay';
import { ChocoUiProvider } from '@teachoco-official/react-choco-ui';

export default function App() {
    return (
        <ChocoUiProvider>
            {/* <CFPSDisplay
                visible
                memory
                hideBtn
                graph
                advanced
                position="bottom-right"
            /> */}
            <Test />
        </ChocoUiProvider>
    );
}
