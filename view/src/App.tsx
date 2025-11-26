//-Path: "react-choco-ui/view/src/App.tsx"
import Test from './app/Test';
import Split from './app/Split';
import FileManager from './app/FileManager';
import {
    ChocoShade,
    ChocoUiProvider,
} from '@teachoco-official/react-choco-base';

export default function App() {
    return (
        <ChocoUiProvider
            baseCss
            createTheme={({ ChocoShade }) => ({
                def: {
                    palette: {
                        main: {
                            secondary: new ChocoShade('#ff5500'),
                        },
                    },
                },
            })}
        >
            <Test />
            {/* <Split /> */}
            {/* <FileManager /> */}
        </ChocoUiProvider>
    );
}
