import React from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import './Sprint.css';

export interface SprintCard {
    word: string;
    translateWord: string;
    changeCard: () => void;
}

export const Card = (props: SprintCard) => {
    const { word, translateWord, changeCard } = props;
    return (
        <div className="container_sprint_card">
            <div className="sprint sprint_card">
                <div className="sprint_words">
                    <div className="sprint_word">{word}</div>
                    <div className="sprint_translate">{translateWord}</div>
                </div>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" name="true" onClick={changeCard}>
                        {' '}
                        Верно
                        {' '}
                    </Button>
                    <Button variant="outlined" color="secondary" name="false" onClick={changeCard}>
                        {' '}
                        Неверно
                        {' '}
                    </Button>
                </Stack>
            </div>
        </div>
    );
};
