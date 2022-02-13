import React from 'react';
import './Sprint.css';

const count = 0;
const timer = 0;

export const Sprint: React.FC = () => (
    <div className="sprint">
        <div className="sprint card">
            <h1 className="h1">
                Текущий результат -
                {count}
            </h1>
            <div className="card_body">
                <div className="timer">{timer}</div>
            </div>
        </div>
    </div>
);
