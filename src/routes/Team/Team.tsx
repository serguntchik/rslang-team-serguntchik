import React from 'react';
import { ActionAreaCard } from '../../components';
import './Team.css';

const infoTeam = [
    {
        id: '1',
        image: '/avaredcat.png',
        about: 'team leader',
        name: 'Sergey',
    },
    {
        id: '2',
        image: '/avahusky.png',
        about: 'bbb',
        name: 'Victor',
    },
    {
        id: '3',
        image: '/avapanda.png',
        about: 'ccc',
        name: 'Lubomir',
    },
    {
        id: '4',
        image: '/avaraccoon.png',
        about: 'ddd',
        name: 'Olga',
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
