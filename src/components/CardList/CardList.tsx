import React, { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../../core/api';
import { ICardData, ICardPropsData } from '../../utils/alias';
import { CardItem } from '../Card/Card';

export const CardList: React.FC<ICardPropsData> = ({ words }) => {
    const [currentPlayingWord, setCurrentPlayingWord] = useState<ICardData | null>(null);
    const audioElement = useRef(new Audio());

    const onPlayClicked = (word: ICardData, flag: boolean) => {
        if (flag) {
            audioElement.current.pause();
            audioElement.current.currentTime = 0;
        }
        setCurrentPlayingWord(word !== currentPlayingWord || flag ? word : null);
    };

    const play = () => {
        const audioFile = audioElement.current;
        const arr = [currentPlayingWord?.audio, currentPlayingWord?.audioMeaning, currentPlayingWord?.audioExample];
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

    useEffect(() => {
        play();
    }, [currentPlayingWord]);

    useEffect(() => {
        console.log();

        return () => {
            audioElement.current.pause();
        };
    }, [words]);

    return (
        <div>
            {words.map((card) => (
                <CardItem key={card.id} word={card} play={onPlayClicked} isPlaying={card !== currentPlayingWord} />
            ))}
        </div>
    );
};
