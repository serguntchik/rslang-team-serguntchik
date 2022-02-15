/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import PageGame, { IPage } from './PageGame';
import rand from './shuffle';
import VolumeUpIcon from './VolumeUpIcon';
import ProgressGame from './ProgressGame';
import { BASE_URL } from '../../core/api';
import { Arrow } from './Arrow';

export interface resultGame {
    word: string;
    answer: boolean;
    audio: string;
}
const AudioGame: React.FC<{
    data: IPage[];
    wordsRu: string[];
    resultCallBack: (data: resultGame[]) => void;
}> = ({ data, wordsRu, resultCallBack }) => {
    const progressColor = new Array(data.length).fill('grey');
    const [isError, setError] = useState(false);
    // eslint-disable-next-line prefer-const
    let [isAnswer, setAnswer] = useState(false);
    const [position, setPosition] = useState<number>(0);
    const [choiceWord, setChoiceWord] = useState<string>('');
    const [rndAnswer, setRndAnswer] = useState<Array<string | undefined>>([]);
    const [isColorProgress] = useState(progressColor);
    const currentPage: IPage = data[position];
    const [result] = useState<resultGame[]>([]);

    useEffect(() => {
        const rnd = rand(position, wordsRu);
        setRndAnswer(rnd);
        const audio = new Audio(`${BASE_URL}${currentPage.audio}`);
        audio.play();
    }, [position]);

    const res = {
        word: currentPage.word,
        answer: false,
        audio: `${BASE_URL}${currentPage.audio}`,
    };

    const handlerAnswer = (el = '') => {
        if (!isAnswer) {
            if (el === currentPage.wordTranslate) {
                isColorProgress[position] = 'green';
                res.answer = true;
                result.push(res);
                setError(false);
            } else {
                isColorProgress[position] = 'red';
                setError(true);
                result.push(res);
            }
            isAnswer = true;
            setChoiceWord(el);
            setAnswer(true);
        }
    };

    const skip = () => {
        setChoiceWord('a');
        setError(true);
        setAnswer(true);
        isAnswer = true;
        isColorProgress[position] = 'yellow';
        result.push(res);
    };

    const next = () => {
        setAnswer(false);
        if (position === progressColor.length - 1) {
            resultCallBack(result);
        }
        setError(false);
        setChoiceWord('');
        // eslint-disable-next-line no-return-assign
        setPosition((prev) => (prev += 1));
    };

    useEffect(() => {
        const handlerKeyboard = (e: KeyboardEvent) => {
            if (!isAnswer) {
                switch (e.key) {
                case '1': {
                    handlerAnswer(rndAnswer[0]);
                    break;
                }
                case '2': {
                    handlerAnswer(rndAnswer[1]);
                    break;
                }
                case '3': {
                    handlerAnswer(rndAnswer[2]);
                    break;
                }
                case '4': {
                    handlerAnswer(rndAnswer[3]);
                    break;
                }
                default:
                    break;
                }
            }
        };

        window.document.addEventListener('keydown', handlerKeyboard);
        return () => window.document.removeEventListener('keydown', handlerKeyboard);
    }, [rndAnswer]);

    return (
        <div className="wrapper_audio">
            <Stack direction="row" justifyContent="center">
                {isColorProgress.map((el, i) => (
                    <ProgressGame key={i} color={el} />
                ))}
            </Stack>
            <Container sx={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                {choiceWord !== '' ? (
                    <PageGame page={currentPage} />
                ) : (
                    <VolumeUpIcon path={`${BASE_URL}${currentPage.audio}`} width="150px" />
                )}
            </Container>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                {rndAnswer.map((el, idx) => {
                    if (el === choiceWord) {
                        return (
                            <Button
                                key={idx}
                                variant="contained"
                                value={el}
                                size="large"
                                color={isError ? 'error' : 'success'}
                                onClick={() => handlerAnswer(el)}
                            >
                                {`${idx + 1}. ${el}`}
                            </Button>
                        );
                    }
                    if (el === currentPage.wordTranslate) {
                        return (
                            <Button
                                key={idx}
                                value={el}
                                size="large"
                                variant="contained"
                                color={isError ? 'success' : 'info'}
                                onClick={() => handlerAnswer(el)}
                            >
                                {`${idx + 1}. ${el}`}
                            </Button>
                        );
                    }
                    return (
                        <Button
                            key={idx}
                            value={el}
                            color="info"
                            size="large"
                            variant="contained"
                            disabled={isError || isAnswer}
                            onClick={() => handlerAnswer(el)}
                        >
                            {`${idx + 1}. ${el}`}
                        </Button>
                    );
                })}
            </Stack>
            <div className="game--answer-btn">
                <Button variant="outlined" onClick={isAnswer ? next : skip}>
                    {isAnswer ? <Arrow /> : 'НЕ  ЗНАЮ'}
                </Button>
            </div>
        </div>
    );
};
export default AudioGame;
