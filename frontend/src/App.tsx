// App.tsx
import * as React from 'react';
import { ThemeContext, themes } from './components/ThemeContext';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import HomePage from './pages/HomePage'; // Import the home page component

const App: React.FC = () => {
    const [theme, setTheme] = React.useState(themes.light);
    const [currentPage, setCurrentPage] = React.useState('Home');

    const toggleTheme = () => {
        setTheme(theme === themes.dark ? themes.light : themes.dark);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="App" style={{ background: `${theme.background} !important`, color: `${theme.foreground} !important` }}>
                <NavBar />
                <Banner currentPage={currentPage} setCurrentPage={setCurrentPage} />
                {/* Render the home page component */}
                <HomePage />
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
