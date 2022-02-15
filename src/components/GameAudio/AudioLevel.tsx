import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

const AudioLevel: React.FC<{ levelHandler: (arg: number) => void }> = ({ levelHandler }) => {
    const level = [0, 1, 2, 3, 4, 5];

    return (
        <Box
            sx={{
                margin: '50px auto',
                borderRadius: '10px',
                width: 500,
                background: 'rgb(255 214 207 / 69%)',
            }}
        >
            <p className="game-tittle"> Аудиовызов</p>
            <p className="game-subtitle"> «Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух.</p>
            <Stack direction="column" alignItems="center" justifyContent="center">
                {level.map((el) => (
                    <Button color="secondary" size="large" onClick={() => levelHandler(el)} key={el}>
                        {`${el + 1} -й уровень`}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};
export default AudioLevel;
