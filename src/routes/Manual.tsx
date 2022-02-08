import React, { useEffect, useState } from 'react';
import { CardList, Groups, PaginationRounded } from '../components';
import { ICardData, ApiPath, server } from '../utils/alias';

export const Manual: React.FC = () => {
    const [cards, setCards] = useState<ICardData[]>([]);
    const [group, setGroup] = useState(0);
    const [page, setPage] = useState(0);

    async function getWords() {
        const response = await fetch(`${server}${ApiPath.word}?group=${group}&page=${page}`);

        const data: ICardData[] = await response.json();
        setCards(data);
    }

    useEffect(() => {
        getWords();
    }, [page, group]);

    return (
        <div className="manual">
            <Groups setGroup={setGroup} />
            <PaginationRounded setPage={setPage} />
            <CardList props={cards} />
        </div>
    );
};
