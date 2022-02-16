import React, { useEffect, useRef, useState } from 'react';

import Grid from '@mui/material/Grid';

import { baseUrl, createUserWord, deletUserWord } from '../../core/api';
import { ICardData, ICardPropsData } from '../../utils/alias';
import { CardItem } from '../Card/Card';

export const CardList: React.FC<ICardPropsData> = ({ words, remove }) => {
    const [difficultWord, setDifficultWord] = useState<ICardData | null>(null);
    const [currentPlayingWord, setCurrentPlayingWord] = useState<ICardData | null>(null);
    const audioElement = useRef(new Audio());

    const onPlayClicked = (word: ICardData) => {
        if (currentPlayingWord) {
            audioElement.current.pause();
        }
        setCurrentPlayingWord(word);
    };

    const onPauseClicked = () => {
        audioElement.current.pause();
        setCurrentPlayingWord(null);
    };

    const play = () => {
        if (!currentPlayingWord) {
            return;
        }

        const audioFile = audioElement.current;
        const arr = [currentPlayingWord.audio, currentPlayingWord.audioMeaning, currentPlayingWord.audioExample];
        let trackIndex = 0;

        const playAudio = (src: string) => {
            audioFile.src = src;
            audioFile.currentTime = 0;
            audioFile.play();
        };

        const playNext = () => {
            if (trackIndex < arr.length) {
                const soundPath = `${baseUrl}/${arr[trackIndex]}`;
                playAudio(soundPath);
                trackIndex += 1;
            } else {
                audioFile.onended = null;
                setCurrentPlayingWord(null);
            }
        };

        if (trackIndex < arr.length) {
            playNext();
            audioFile.onended = playNext;
        }
    };

    const addToDifficult = (word: ICardData) => {
        const diffWord = word;
        createUserWord(diffWord);
        diffWord.isDifficult = true;
        setDifficultWord(diffWord);
    };
    const removeFromDifficult = (word: ICardData) => {
        deletUserWord(word);
        remove!(word);
    };

    useEffect(() => play(), [currentPlayingWord]);

    useEffect(() => audioElement.current.pause(), [words]);

    return (
        <Grid container spacing={2}>
            {words.map((card) => (
                <Grid key={card.id} item lg={3} md={4} sm={6} xs={12}>
                    <CardItem
                        word={card}
                        play={onPlayClicked}
                        pause={onPauseClicked}
                        isPlaying={card !== currentPlayingWord}
                        isDifficult={card.isDifficult!}
                        addToDifficult={addToDifficult}
                        removeFromDifficult={removeFromDifficult}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
