import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Games from './routes/Games';
import Manual from './routes/Manual';
import Statistic from './routes/Statistic';
import Footer from './components/Footer';
import ResponsiveAppBar from './components/ResponsiveAppBar';
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

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root'),
// );
