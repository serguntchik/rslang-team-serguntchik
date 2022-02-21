import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const Games = () => (
    <div className="games">
        <h1>Игры</h1>
        <Link to="audio">
            <Button color="success" type="button">
                Аудиовызов
            </Button>
        </Link>
    </div>
);
