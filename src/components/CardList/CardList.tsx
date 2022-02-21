import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

import Grid from '@mui/material/Grid';

import { baseUrl, createUserWord, deleteUserWord } from '../../core/api';
import { ICardData, ICardPropsData } from '../../utils/alias';
import { CardItem } from '../Card/Card';
import { MyContext } from '../../core/context';

export const CardList: React.FC<ICardPropsData> = ({ words, remove }) => {
    const [difficultWord, setDifficultWord] = useState<ICardData | null>(null);
    const [currentPlayingWord, setCurrentPlayingWord] = useState<ICardData | null>(null);
    const audioElement = useRef(new Audio());
    const { currentUser } = useContext(MyContext);

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
        createUserWord(diffWord, currentUser?.id);
        diffWord.isDifficult = true;
        setDifficultWord(diffWord);
    };
    const removeFromDifficult = (word: ICardData) => {
        deleteUserWord(word, currentUser?.id);
        remove!(word);
    };

    useEffect(() => play(), [currentPlayingWord]);

    useEffect(() => audioElement.current.pause(), [words]);

    return (
        <Grid container spacing={2} style={{ marginBottom: '50px' }}>
            {words.map((card) => (
                /* eslint no-underscore-dangle: [1, { "allow": ["__place"] }] */
                <Grid key={card.id || card._id} item lg={3} md={4} sm={6} xs={12}>
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
