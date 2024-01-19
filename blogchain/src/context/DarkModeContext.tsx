import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

interface DarkModeProviderProps {
  children: ReactNode;
}
function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode: boolean) => !isDarkMode);
  }
  const contextValue: DarkModeContextType = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark mode was used out of DarkModePorvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
