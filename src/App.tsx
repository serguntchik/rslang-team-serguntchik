import React from 'react';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer';
import Games from './routes/Games';
import Manual from './routes/Manual';
import Statistic from './routes/Statistic';
import { Outlet, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div>some content</div>
        </div>
    );
}

export default App;
