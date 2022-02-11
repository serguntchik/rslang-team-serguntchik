import React from 'react';
import { Link } from 'react-router-dom';

import './App.css';

export const App: React.FC = () => (
    <div className="App">
        <div className="wrapper__team">
            <h1>Наша команда</h1>
            <span>
                We are Sergey, Victor, Lubomir and Olga - a team of young professionals in the Rolling Scopes School
                React course, we offer you an application for learning English.
            </span>
            <Link to="/team">
                <button className="btns btn_color1" type="button">
                    more
                </button>
            </Link>
        </div>
    </div>
);
