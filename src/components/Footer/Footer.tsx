import React from 'react';
import './Footer.css';

export const Footer = () => (
    <div className="footer">
        <div className="wrapper wrapper__footer">
            <div className="git_link">
                <a
                    href="https://github.com/serguntchik/rslang-team-serguntchik/tree/develop"
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '5px' }}
                >
                    Github
                </a>
                © 2022
                <a href="https://https://rs.school/" target="_blank" rel="noreferrer" style={{ padding: '5px' }}>
                    RS Shcool
                </a>
            </div>
            <div className="git_link">
                <a href="https://github.com/serguntchik" target="_blank" rel="noreferrer">
                    <div className="block_link">
                        <img src="/logo_git.svg" alt="git-logo" className="git_logo" />
                        Sergey
                    </div>
                </a>
                <a href="https://github.com/BlackHatMan" target="_blank" rel="noreferrer">
                    <div className="block_link">
                        <img src="/logo_git.svg" alt="git-logo" className="git_logo" />
                        Viktor
                    </div>
                </a>
                <a href="https://github.com/Liubomyr86" target="_blank" rel="noreferrer">
                    <div className="block_link">
                        <img src="/logo_git.svg" alt="git-logo" className="git_logo" />
                        Lubomir
                    </div>
                </a>
                <a href="https://github.com/Olga-plus" target="_blank" rel="noreferrer">
                    <div className="block_link">
                        <img src="/logo_git.svg" alt="git-logo" className="git_logo" />
                        Olga
                    </div>
                </a>
            </div>
        </div>
    </div>
);
