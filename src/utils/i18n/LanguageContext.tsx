import React, { createContext, useState, useContext, ReactNode } from 'react';
import translations, { SupportedLanguage } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof typeof translations.en) => string;
}

const defaultLanguage: SupportedLanguage = 'en';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key) => key as string,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);

  // Function to get translation for a key
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Utility to handle text direction (for RTL languages like Urdu and Arabic)
export const getTextDirection = (lang: SupportedLanguage): 'rtl' | 'ltr' => {
  return lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr';
}; 