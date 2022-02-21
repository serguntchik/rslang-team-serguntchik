import React from 'react';
import { Link } from 'react-router-dom';

import './Games.css';

export const Games: React.FC = () => (
    <div className="games">
        <h1>Игры</h1>
        <div className="conteiner_card">
            <div className="cover card_color1">
                <Link to="audio">Аудиовызов</Link>
            </div>
            <div className="cover card_color2">
                <Link to="sprint">Спринт</Link>
            </div>
        </div>
    </div>
);
