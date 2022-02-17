import React, { useEffect, useState } from 'react';

import './Manual.css';

import { CardList, Groups, PaginationRounded } from '../../components';
import { getWords } from '../../core/api';
import { ICardData } from '../../utils/alias';

export const Manual: React.FC = () => {
    const [cards, setCards] = useState<ICardData[]>([]);
    const [group, setGroup] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const getCardData = async () => {
            const words: ICardData[] = await getWords({ group, page });
            setCards(words);
        };
        getCardData();
    }, [page, group]);

    return (
        <div className="manual">
            <div className="controls">
                <Groups setGroup={setGroup} />
                <PaginationRounded setPage={setPage} />
            </div>
            <CardList words={cards} />
        </div>
    );
};
