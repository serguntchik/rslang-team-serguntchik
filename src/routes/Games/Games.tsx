import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Games.css';

export const Games: React.FC = () => (
    <div className="games">
        <h1>Игры</h1>
        <div className="conteiner_card">
            <div className="cover card_color1">Cаванна</div>
            <div className="cover card_color2">
                <Link to="sprint">Спринт</Link>
            </div>
        </div>
        <div className="conteiner_card">
            <div className="cover card_color3">Аудиовызов</div>

            <div className="cover card_color4">Своя игра</div>
        </div>
        <Outlet />
    </div>
);
