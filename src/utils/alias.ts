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
    props: ICardData;
    isPlaying: boolean;
    setSoundSrc: (arr: string[]) => void;
    setCardFlag: ({ cardId, flag }: ICardPlay) => void;
    cardFlag: ICardPlay;
    play: (serv: string, arr: string[], sound: HTMLAudioElement, flag: boolean) => void;
}

export interface ICardPropsData {
    props: ICardData[];
}

export const server = 'https://react-rs-langs.herokuapp.com';

export enum ApiPath {
    word = '/words',
}

export interface PaginationRoundedProps {
    setPage(page: number): void;
}

export interface GroupsProps {
    setGroup(group: number): void;
}
