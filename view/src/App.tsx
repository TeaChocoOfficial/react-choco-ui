//-Path: "react-choco-ui/view/src/App.tsx"
import Test from './app/Test';
import Split from './app/Split';
import FileManager from './app/FileManager';
import { CFPSDisplay } from './lib/components/custom/CFPSDisplay';
import { ChocoShade, ChocoUiProvider } from '@teachoco-official/react-choco-ui';

export default function App() {
    return (
        <ChocoUiProvider baseCss>
            {/* <CFPSDisplay
                visible
                memory
                hideBtn
                graph
                advanced
                position="bottom-right"
            /> */}
            {/* <Test /> */}
            {/* <Split /> */}
            <FileManager />
        </ChocoUiProvider>
    );
}
