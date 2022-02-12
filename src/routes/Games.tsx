import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const Games: React.FC = () => (
    <div className="games">
        <h1>Игры</h1>
        <div>
            <Link to="sprint">
                <button className="btns btn_color1" type="button">
                    Спринт
                </button>
            </Link>
        </div>
        <Outlet />
    </div>
);
