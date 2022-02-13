import React from 'react';
import { BasicSelect } from './BasicSelect';
import './Sprint.css';

const select = BasicSelect();
const count = 0;
const timer = 0;

export const Sprint: React.FC = () => (
    <div className="sprint">
        <h1 className="h1">Спринт</h1>
        <div>
            «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
            <ul>
                <li>Используйте мышь, чтобы выбрать</li>
            </ul>
            <div className="sprint">
                {select}
                <button className="btns btn-start" type="button">
                    НАЧАТЬ
                </button>
            </div>
        </div>
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
