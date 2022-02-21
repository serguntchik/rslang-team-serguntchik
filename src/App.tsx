import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getCurrentUser } from './core/api';
import { MyContext } from './core/context';
import {
    AudioContainer, Authentication, LogIn, Footer, ResponsiveAppBar,
} from './components';
import {
    DifficultWords, Games, MainPage, Manual, Statistic, Team,
} from './routes';
import { IGetCurrentUser } from './utils/alias';

export const App = () => {
    const [currentUser, setCurrentUser] = useState<IGetCurrentUser | null>(null);
    const context = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);
    const getUser = async () => {
        const user: IGetCurrentUser = await getCurrentUser();
        setCurrentUser(user);
    };

    useEffect(() => {
        localStorage.getItem('token') && getUser();
    }, []);

    return (
        <MyContext.Provider value={context}>
            <BrowserRouter>
                <div className="App">
                    <ResponsiveAppBar />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="auth" element={<Authentication />} />
                        <Route path="games" element={<Games />} />
                        <Route path="games/audio" element={<AudioContainer />} />
                        <Route path="login" element={<LogIn />} />
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
