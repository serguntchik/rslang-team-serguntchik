import React from 'react';
import { ActionAreaCard } from '../../components';
import './Team.css';

const infoTeam = [
    {
        id: '1',
        image: '/sergey.jpg',
        about: 'Тимлид, разработал архитектуру приложения и руководил командой.',
        name: 'Сергей ',
        git: 'https://github.com/Olga-plus',
    },
    {
        id: '2',
        image: '/viktor.jpg',
        about: 'Настроил аутентификацию, разработал игру "Аудиовызов".',
        name: 'Виктор ',
        git: 'https://github.com/Olga-plus',
    },
    {
        id: '3',
        image: '/avapanda.png',
        about: 'Разработал страницы словаря и учебника.',
        name: 'Любомир ',
        git: 'https://github.com/Olga-plus',
    },
    {
        id: '4',
        image: '/olga.jpg',
        about: 'Сделала главную страницу, разработала игру "Спринт"',
        name: ' Ольга ',
        git: 'https://github.com/Olga-plus',
    },
];

export const Team: React.FC = () => (
    <div className="teams">
        <h1>Наша команда</h1>
        <div className="wrapper__team_page">
            {infoTeam.map((item) => (
                <ActionAreaCard image={item.image} about={item.about} name={item.name} git={item.git} />
            ))}
        </div>
    </div>
);
