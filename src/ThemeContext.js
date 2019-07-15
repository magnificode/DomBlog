import React, { useContext, createContext, useState, useEffect } from 'react';

const defaultContextData = {
  dark: false,
  themeToggle: () => {}
}

const ThemeContext = createContext(defaultContextData);
const useTheme = () => useContext(ThemeContext);

const useEffectTheme = () => {
  const [themeState, setThemeState] = useState({
    dark: false,
    hasThemeLoaded: false
  });
  useEffect(() => {
    const lsTheme = localStorage.getItem('darkTheme') === 'true';
    setThemeState({ ...themeState, dark: lsTheme, hasThemeLoaded: true });
  }, []);

  return [themeState, setThemeState];
}

const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useEffectTheme();

  if (!themeState.hasThemeLoaded) {
    return <div />;
  }

  const themeToggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem('darkTheme', dark);
    setThemeState({ ...themeState, dark });
  };

  return (
    <ThemeContext.Provider
      value={{
        dark: themeState.dark,
        themeToggle
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, useTheme, ThemeContext};