import React from 'react';
import { ActionAreaCard } from '../../components';
import './Team.css';

const infoTeam = [
    {
        id: '1',
        image: '/avaredcat.png',
        about: 'Тимлид',
        name: 'Сергей',
    },
    {
        id: '2',
        image: '/viktor.jpg',
        about: 'разработчик',
        name: 'Виктор',
    },
    {
        id: '3',
        image: '/avapanda.png',
        about: 'разработчик',
        name: 'Любомир',
    },
    {
        id: '4',
        image: '/olga.jpg',
        about: 'разработчик',
        name: 'Ольга',
    },
];

export const Team: React.FC = () => (
    <div className="teams">
        <h1>Наша команда</h1>
        <div className="wrapper__team_page">
            {infoTeam.map((item) => (
                <ActionAreaCard image={item.image} about={item.about} name={item.name} />
            ))}
        </div>
    </div>
);
