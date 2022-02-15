import React, { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../../core/api';
import { ICardData, ICardPropsData } from '../../utils/alias';
import { CardItem } from '../Card/Card';

export const CardList: React.FC<ICardPropsData> = ({ props }) => {
    const [currentPlayingWord, setCurrentPlayingWord] = useState<ICardData | null>(null);
    const audioElement = useRef(new Audio());
    let currentWordFlag = false;

    const onPlayClicked = (word: ICardData, flag: boolean) => {
        currentWordFlag = flag;

        setCurrentPlayingWord(word !== currentPlayingWord || flag ? word : null);
    };

    const play = () => {
        const audioFile = audioElement.current;
        const arr = [currentPlayingWord?.audio, currentPlayingWord?.audioExample, currentPlayingWord?.audioMeaning];
        let trackIndex = 0;

        const playAudio = (src: string) => {
            audioFile.src = src;
            audioFile.currentTime = 0;
            audioFile.play();
        };

        const playNext = () => {
            const soundPath = `${baseUrl}/${arr[trackIndex]}`;
            playAudio(soundPath);
            trackIndex += 1;
            if (trackIndex > arr.length) {
                audioFile.removeEventListener('ended', playNext);
                setCurrentPlayingWord(null);
            }
        };

        if (currentWordFlag) {
            audioFile.pause();
            audioFile.currentTime = 0;
        } else {
            playNext();
            audioFile.addEventListener('ended', playNext);
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
    }, [props]);

    return (
        <div>
            {props.map((card) => (
                <CardItem key={card.id} word={card} play={onPlayClicked} isPlaying={card !== currentPlayingWord} />
            ))}
        </div>
    );
};
