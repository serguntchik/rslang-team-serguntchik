import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import { App } from './App';
import { Games, Manual, Statistic } from './routes';
import { Footer, ResponsiveAppBar } from './components';

const rootElement = document.getElementById('root');

render(
    <BrowserRouter>
        <div className="App">
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="games" element={<Games />} />
                <Route path="manual" element={<Manual />} />
                <Route path="statistic" element={<Statistic />} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>,
    rootElement,
);
