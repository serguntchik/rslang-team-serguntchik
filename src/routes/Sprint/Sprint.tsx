import React, { useEffect, useCallback } from 'react';
import {
    InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card } from './Card';
// import { style } from './style';
import './Sprint.css';

// import { SprintStartPage } from './SprintStartPage';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface wordItem {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}
interface wordItemMix {
    correct: boolean;
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string;
}

export const Sprint: React.FC = () => {
    const [level, setLevel] = React.useState('1');
    const [startGame, setStartGame] = React.useState(false);
    const [cards, setCards] = React.useState<wordItemMix[]>([]);
    const [currentWord, setCurrentWord] = React.useState('');
    const [translateWord, settranslateWord] = React.useState('');
    const [indexWord, setindexWord] = React.useState(0);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value);
    };

    useEffect(() => {
        if (startGame) {
            fetch(`${process.env.REACT_APP_BASE_URL}/words`)
                .then((response) => response.json())
                .then((data) => {
                    const firstWordTranslate = data[0].wordTranslate;
                    setCards(
                        data.map((item: wordItemMix, index: number) => {
                            const wordTranslate = index % 2 === 0
                                ? data[index + 2]?.wordTranslate || firstWordTranslate
                                : item.wordTranslate;
                            return {
                                ...item,
                                wordTranslate,
                                correct: index % 2 !== 0,
                            };
                        }),
                    );
                });
        }
    }, [startGame]);

    const startChangeLevel = () => {
        setStartGame(true);
    };

    const changeCard = useCallback(() => {
        console.log(indexWord, cards, '222');
        setindexWord(indexWord + 1);
        if (indexWord % 2) {
            setCurrentWord(cards[indexWord].word);
            settranslateWord(cards[indexWord + 2].wordTranslate);
        }
        if (indexWord === cards.length) {
            setOpen(true);
        }
    }, [indexWord]);

    return cards.length === 0 ? (
        <div className="sprint">
            <h1 className="h1">Спринт</h1>
            <div>
                «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
                <ul>
                    <li>Используйте мышь, чтобы выбрать</li>
                </ul>
                <div className="sprint">
                    <FormControl fullWidth>
                        <InputLabel id="sprint-level-select-label">Уровень</InputLabel>
                        <Select
                            labelId="sprint-level-select-label"
                            id="sprint-level-select"
                            value={level}
                            label="Level"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </FormControl>
                    <button className="btns btn-start" type="button" onClick={startChangeLevel}>
                        НАЧАТЬ
                    </button>
                </div>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    ) : (
        <Card word={currentWord} translateWord={translateWord} changeCard={changeCard} />
    );
};
