export interface ICardPlay {
    cardId: string;
    flag: boolean;
}

export interface ICardData {
    id?: string;
    _id?: string;
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
    userWord?: {
        difficulty: string;
    };
    isDifficult?: boolean;
}

export interface ICardProps {
    word: ICardData;
    play: (word: ICardData) => void;
    pause: () => void;
    isPlaying: boolean;
    isDifficult: boolean;
    addToDifficult: (word: ICardData) => void;
    removeFromDifficult: (word: ICardData) => void;
}

export interface IGetWords {
    userId?: string;
    group: number;
    page: number;
}

export interface IGetCurrentUser {
    email: string;
    name: string;
    id: string;
}

export interface ICreateUserWord {
    userId: string;
    wordId: string;
    word: { difficulty: string; optional?: Record<string, unknown> };
}

export interface ICardPropsData {
    words: ICardData[];
    remove?: (word: ICardData) => void;
}

export interface PaginationRoundedProps {
    setPage(page: number): void;
}

export interface GroupsProps {
    setGroup(group: number): void;
}
export interface IContextValue {
    currentUser: IGetCurrentUser | null;
    setCurrentUser?: (currentUser: IGetCurrentUser | null) => void;
}
