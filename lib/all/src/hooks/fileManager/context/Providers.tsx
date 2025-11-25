//-Path: "react-choco-ui/lib/src/hooks/fileManager/context/Providers.tsx"
import { Locales } from '../locales';
import { ChocoUi } from '$Type/Choco';
import { FilesProvider } from './Files';
import { LayoutProvider } from './Layout';
import { FileManager } from '../fileManager';
import { ClipBoardProvider } from './Clipboard';
import { SelectionProvider } from './Selection';
import { TriggerActionProvider } from './TriggerAction';
import { FileNavigationProvider } from './FileNavigation';
import { TranslationProvider } from './TranslationProvider';

export function Providers({
    onCut,
    onCopy,
    onPaste,
    onError,
    onSelect,
    color,
    layout = 'grid',
    language = 'en-US',
    children,
    filesData,
    onDownload,
    initialPath,
    onFolderChange,
    onSelectionChange,
}: {
    language?: Locales;
    initialPath?: string;
    children?: React.ReactNode;
    onCut?: FileManager.Callback;
    onCopy?: FileManager.Callback;
    onPaste?: FileManager.Callback;
    onSelect?: FileManager.Callback;
    layout?: FileManager.LayoutType;
    color?: ChocoUi.Color.ColorsType;
    onDownload?: FileManager.Callback;
    filesData?: FileManager.FileData[];
    onFolderChange?: FileManager.Callback;
    onSelectionChange?: FileManager.Callback;
    onError?: (error: FileManager.Error, file?: File) => void;
}) {
    return (
        <TranslationProvider language={language}>
            <FilesProvider filesData={filesData} onError={onError}>
                <FileNavigationProvider
                    initialPath={initialPath}
                    onFolderChange={onFolderChange}
                >
                    <SelectionProvider
                        onSelect={onSelect}
                        onDownload={onDownload}
                        onSelectionChange={onSelectionChange}
                    >
                        <ClipBoardProvider
                            onCut={onCut}
                            onCopy={onCopy}
                            onPaste={onPaste}
                        >
                            <LayoutProvider color={color} layout={layout}>
                                <TriggerActionProvider>
                                    {children}
                                </TriggerActionProvider>
                            </LayoutProvider>
                        </ClipBoardProvider>
                    </SelectionProvider>
                </FileNavigationProvider>
            </FilesProvider>
        </TranslationProvider>
    );
}
