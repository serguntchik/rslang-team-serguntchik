import React, { useEffect, useRef, useState } from 'react';
import { ICardPlay, ICardPropsData, server } from '../../utils/alias';
import { RecipeReviewCard } from '../Card/Card';

export const CardList: React.FC<ICardPropsData> = ({ props }) => {
    const [soundSrc, setSoundSrc] = useState<string[]>([]);
    const [cardFlag, setCardFlag] = useState<ICardPlay>({ cardId: '', flag: true });
    const audioElement = useRef(new Audio());

    const play = (serv: string, arr: string[], sound: HTMLAudioElement, flag: boolean) => {
        const audioFile = sound;
        const isPlay = flag;
        let trackIndex = 0;

        function playAudio(src: string) {
            audioFile.src = src;
            audioFile.currentTime = 0;
            audioFile.play();
        }

        function playNext() {
            const soundPath = `${serv}/${arr[trackIndex]}`;
            playAudio(soundPath);
            trackIndex += 1;
            if (trackIndex === arr.length) audioFile.removeEventListener('ended', playNext);
        }

        if (isPlay) {
            audioFile.pause();
            audioFile.currentTime = 0;
            trackIndex = 0;
            // setCardFlag({ cardId: cardFlag.cardId, flag: true });
        } else {
            playNext();
            audioFile.addEventListener('ended', playNext);
        }
    };

    useEffect(() => {
        play(server, soundSrc, audioElement.current, cardFlag.flag);
    }, [cardFlag]);

    return (
        <div>
            {props.map((card) => (
                <RecipeReviewCard
                    key={card.id}
                    props={{
                        id: card.id,
                        word: card.word,
                        transcription: card.transcription,
                        wordTranslate: card.wordTranslate,
                        image: card.image,
                        textMeaning: card.textMeaning,
                        textMeaningTranslate: card.textMeaningTranslate,
                        textExample: card.textExample,
                        textExampleTranslate: card.textExampleTranslate,
                        audio: card.audio,
                        audioMeaning: card.audioMeaning,
                        audioExample: card.audioExample,
                    }}
                    isPlaying={false}
                    setSoundSrc={setSoundSrc}
                    setCardFlag={setCardFlag}
                    cardFlag={cardFlag}
                    play={play}
                />
            ))}
        </div>
    );
};
