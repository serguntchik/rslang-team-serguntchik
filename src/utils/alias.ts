export interface ICardPlay {
    cardId: string;
    flag: boolean;
}

export interface ICardData {
    id: string;
    group?: number;
    page?: number;
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

export interface ICardProps {
    word: ICardData;
    play: (word: ICardData, flag: boolean) => void;
    isPlaying: boolean;
}

export interface IGetWords {
    group: number;
    page: number;
    setCards: (data: ICardData[]) => void;
}
export interface ICardPropsData {
    props: ICardData[];
}

/* eslint-disable */
export enum ApiPath {
    word = '/words',
}

export interface PaginationRoundedProps {
    setPage(page: number): void;
}

export interface GroupsProps {
    setGroup(group: number): void;
}
