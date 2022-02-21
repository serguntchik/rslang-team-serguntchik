import React, { useEffect } from 'react';
import {
    Button, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Card } from './Card';
import { style } from './style';
import './Sprint.css';
import { baseUrl } from '../../core/api';

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
    const [pageWord, setPageWord] = React.useState(0);
    const [min] = React.useState(0);
    const [max] = React.useState(29);
    const [answers, setAnwers] = React.useState<wordItemMix[]>([]);
    const [answersFalse, setAnwersFalse] = React.useState<wordItemMix[]>([]);
    const [colorCircle, setcolorCircle] = React.useState('white');

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        setStartGame(false);
        setCards([]);
        setCurrentWord('');
        settranslateWord('');
        setindexWord(0);
        setPageWord(0);
        setAnwers([]);
        setAnwersFalse([]);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value);
        setPageWord(Math.floor(Math.random() * (max - min)) + min);
    };

    const getWords = async () => {
        const response = await axios.get(`${baseUrl}/words?page=${pageWord}&group=${level}`);
        return response.data;
    };

    useEffect(() => {
        if (startGame) {
            const response = getWords();
            response.then((data) => {
                const firstWordTranslate = data[0].wordTranslate;
                setCurrentWord(data[0].word);
                settranslateWord(data[0].wordTranslate);
                setCards(
                    data.map((item: wordItemMix, index: number) => {
                        // eslint-disable-next-line max-len
                        const wordTranslate = index % 2 === 0 ? data[index + 2]?.wordTranslate || firstWordTranslate : item.wordTranslate;
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

    const changeCardTrue = () => {
        setindexWord(indexWord + 1);
        if (cards.length === 0 && cards[0].correct === true) {
            answers.push(cards[0]);
        } else {
            setCurrentWord(cards[indexWord].word);
            settranslateWord(cards[indexWord].wordTranslate);
            if (cards[indexWord].correct === true) {
                answers.push(cards[indexWord]);
            }
            if (cards[indexWord].correct === false) {
                answersFalse.push(cards[indexWord]);
            }
            if (indexWord === cards.length - 1) {
                setOpen(true);
            }
        }
    };

    const changeCardFalse = () => {
        setindexWord(indexWord + 1);
        if (cards.length === 0 && cards[0].correct === false) {
            answers.push(cards[0]);
        } else {
            setCurrentWord(cards[indexWord].word);
            settranslateWord(cards[indexWord].wordTranslate);
            if (cards[indexWord].correct === false) {
                answers.push(cards[indexWord]);
            }
            if (cards[indexWord].correct === true) {
                answersFalse.push(cards[indexWord]);
            }
            if (indexWord === cards.length - 1) {
                setOpen(true);
            }
        }
    };

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
        </div>
    ) : (
        <div className="sprint">
            <Card
                word={currentWord}
                translateWord={translateWord}
                colorCircle={colorCircle}
                changeCardTrue={changeCardTrue}
                changeCardFalse={changeCardFalse}
                handleClose={handleClose}
            />
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className="wrapper__close_btn">
                            <Button onClick={handleClose}>Закрыть</Button>
                        </div>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Поздравляем, отличный результат!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            ЗНАЮ:
                            {answers.length}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            НЕ ЗНАЮ:
                            {answersFalse.length}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};
