//-Path: "react-choco-ui/lib/dev/src/hooks/fileManager/context/TranslationProvider.tsx"
import i18n, { TFunction } from 'i18next';
import { FileManager } from '../fileManager';
import { initI18n, Locales } from '../locales';
import { createContext, useContext, useEffect, useState } from 'react';

// เพิ่ม type สำหรับ translation function
type TranslationFunction = (
    key: keyof FileManager.Locale,
    option?: object,
) => FileManager.Locale[keyof FileManager.Locale];

// แก้ไข type ของ Context
const I18nContext = createContext<TranslationFunction>((key) => key);

export type FileManagerTranslationProviderProps = {
    language: Locales;
    children: React.ReactNode;
};

export const TranslationProvider: React.FC<
    FileManagerTranslationProviderProps
> = ({ language, children }) => {
    const [t, setT] = useState<
        TFunction<['translation', ...string[]], undefined>
    >(() => i18n.t.bind(i18n));

    useEffect(() => {
        initI18n(language);
        setT(() => i18n.t.bind(i18n));
    }, [language]);

    return (
        <I18nContext.Provider value={t as TranslationFunction}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => useContext(I18nContext);
