// ThemeContext.tsx
import * as React from 'react';

export const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#302c3c",
        background: "#302c3c"
    }
};

export const ThemeContext = React.createContext({
    theme: themes.light,
    toggleTheme: () => {},
});