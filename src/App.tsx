import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getCurrentUser } from './core/api';
import { MyContext } from './core/context';
import { LogIn, Footer, ResponsiveAppBar } from './components';
import {
    DifficultWords, Games, MainPage, Manual, Statistic, Team,
} from './routes';
import { IGetCurrentUser } from './utils/alias';

export const App = () => {
    const [currentUser, setCurrentUser] = useState<IGetCurrentUser | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user);
        };
        localStorage.getItem('token') && getUser();
    }, []);

    return (
        <MyContext.Provider value={currentUser}>
            <BrowserRouter>
                <div className="App">
                    <ResponsiveAppBar />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="auth" element={<LogIn />} />
                        <Route path="games" element={<Games />} />
                        <Route path="manual" element={<Manual />} />
                        {currentUser ? (
                            <Route path="difficult" element={<DifficultWords />} />
                        ) : (
                            <Route path="difficult" element={<p>Необходимо авторизоваться</p>} />
                        )}
                        <Route path="statistic" element={<Statistic />} />
                        <Route path="team" element={<Team />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </MyContext.Provider>
    );
};
