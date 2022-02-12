import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import { App } from './App';
import {
    Games, Manual, Statistic, Team, Sprint,
} from './routes';
import { AuthForm, Footer, ResponsiveAppBar } from './components';
import { Provider } from './core/context';

const rootElement = document.getElementById('root');

render(
    <BrowserRouter>
        <div className="App">
            <Provider value={localStorage.getItem('token')}>
                <ResponsiveAppBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="auth" element={<AuthForm />} />
                    <Route path="games" element={<Games />} />
                    <Route path="games/sprint" element={<Sprint />} />
                    <Route path="manual" element={<Manual />} />
                    <Route path="statistic" element={<Statistic />} />
                    <Route path="team" element={<Team />} />
                </Routes>
                <Footer />
            </Provider>
        </div>
    </BrowserRouter>,
    rootElement,
);
