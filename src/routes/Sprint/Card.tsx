import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import './Sprint.css';

export interface SprintCard {
    word: string;
    translateWord: string;
    changeCardTrue: () => void;
    changeCardFalse: () => void;
}

export const Card = (props: SprintCard) => {
    const {
        word, translateWord, changeCardTrue, changeCardFalse,
    } = props;

    return (
        <div className="container_sprint_card">
            <div className="sprint sprint_card">
                <div className="sprint_words">
                    <div className="sprint_word">{word}</div>
                    <div className="sprint_translate">{translateWord}</div>
                </div>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" name="true" onClick={changeCardTrue}>
                        {' '}
                        Верно
                        {' '}
                    </Button>
                    <Button variant="outlined" color="secondary" name="false" onClick={changeCardFalse}>
                        {' '}
                        Неверно
                        {' '}
                    </Button>
                </Stack>
            </div>
        </div>
    );
};
