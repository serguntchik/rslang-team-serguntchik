import React from 'react';
import { BASE_URL } from '../../core/api';
import VolumeUpIcon from './VolumeUpIcon';

export interface IPage {
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
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
}
const PageGame: React.FC<{ page: IPage }> = ({ page }) => {
    const pathImg = `${BASE_URL}${page.image}`;
    const pathAudio = `${BASE_URL}${page.audio}`;
    const audioExample = `${BASE_URL}${page.audioExample}`;

    return (
        <div className="page--audiogame">
            <img className="page--audiogame-image" width="300px" height="200px" src={pathImg} alt="" />
            <div className="page--audiogame-text">
                <div>
                    <VolumeUpIcon path={pathAudio} width="35px" />
                    <span>{page.word}</span>
                    <em className="page--audiogame-transcription">{page.transcription}</em>
                </div>
                <div>
                    <VolumeUpIcon width="35px" path={audioExample} />
                    <span dangerouslySetInnerHTML={{ __html: page.textExample }} />
                </div>
            </div>
        </div>
    );
};
export default PageGame;
