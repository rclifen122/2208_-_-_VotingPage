import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
    >
      <span className="mr-2 text-lg">
        {language === 'vi' ? '🇻🇳' : '🇯🇵'}
      </span>
      <span className="text-sm font-medium text-gray-700">
        {language === 'vi' ? 'Tiếng Việt' : '日本語'}
      </span>
      <span className="ml-2 text-xs text-gray-500">
        {language === 'vi' ? '→ 日本語' : '→ Tiếng Việt'}
      </span>
    </button>
  );
};

export default LanguageToggle;
