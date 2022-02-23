import React from 'react';

import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

import './Footer.css';

const team = [
    {
        name: 'Sergey',
        github: 'https://github.com/serguntchik',
    },
    {
        name: 'Виктор',
        github: 'https://github.com/BlackHatMan',
    },
    {
        name: 'Любомир',
        github: 'https://github.com/Liubomyr86',
    },
    {
        name: 'Ольга',
        github: 'https://github.com/Olga-plus',
    },
];

export const Footer = () => (
    <div className="footer">
        <div className="wrapper wrapper__footer">
            <div className="git_link">
                <a
                    href="https://github.com/serguntchik/rslang-team-serguntchik/tree/develop"
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '5px' }}
                    className="footer_link"
                >
                    Github
                </a>
                © 2022
                <a
                    className="footer_link"
                    href="https://https://rs.school/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '5px' }}
                >
                    RS School
                </a>
            </div>
            <div className="git-link">
                {team.map((member) => (
                    <Button
                        key={member.name}
                        href={member.github}
                        target="_blank"
                        sx={{ my: 2, color: 'white' }}
                        startIcon={<GitHubIcon />}
                    >
                        {member.name}
                    </Button>
                ))}
            </div>
        </div>
    </div>
);
