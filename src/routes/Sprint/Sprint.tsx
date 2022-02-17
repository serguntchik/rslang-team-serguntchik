import {
    InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useCallback } from 'react';
import './Sprint.css';
import { Card } from './Card';
// import { SprintStartPage } from './SprintStartPage';
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

export const Sprint: React.FC = () => {
    const [level, setLevel] = React.useState('');
    const [cards, setcards] = React.useState<wordItem[]>([]);
    const [currentWord, setCurrentWord] = React.useState('');
    const [translateWord, settranslateWord] = React.useState('');
    const [levelchoise, setlevelchoise] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value as string);
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}words`)
            .then((response) => response.json())
            .then((data) => {
                if (levelchoise) {
                    setcards(data);
                    data.forEach((item: wordItem): void => {
                        setCurrentWord(item.word);
                        settranslateWord(item.wordTranslate);
                    });
                }
            });
    }, [levelchoise]);

    // const shuffle = () => {
    //     for (let i = cards.length - 1; i > 0; i--) {
    //       let j = Math.floor(Math.random() * (i + 1));
    //       [cards[i], cards[j]] = [cards[j], cards[i]];
    //     }
    //     return cards;
    //   }

    const startChangeLevel = () => {
        setlevelchoise(level);
        console.log(level);
    };

    let i = 0;
    let k = 2;

    const changeCard = useCallback(() => {
        if (i < cards.length) {
            i += 1;
            k += 1;
        }
        if (i >= cards.length) {
            setCurrentWord(`${i}`);
            settranslateWord('Finish');
        }
        if (k >= cards.length && i < cards.length) {
            k = 1;
        }
        if (i % 2 === 0) {
            setCurrentWord(cards[i].word);
            settranslateWord(cards[k].wordTranslate);
        } else {
            setCurrentWord(cards[i].word);
            settranslateWord(cards[i].wordTranslate);
        }
    }, [cards]);

    return cards.length === 0 ? (
        <div className="sprint">
            <h1 className="h1">Спринт</h1>
            <div>
                «Спринт» - это тренировка для повторения заученных слов из вашего словаря.
                <ul>
                    <li>Используйте мышь, чтобы выбрать</li>
                </ul>
                <div className="sprint">
                    <InputLabel id="demo-simple-select-label">Уровень</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
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
                    <button className="btns btn-start" type="button" onClick={startChangeLevel}>
                        НАЧАТЬ
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <Card word={currentWord} translateWord={translateWord} changeCard={changeCard} />
    );
};
