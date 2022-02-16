import React, { useContext, useEffect, useState } from 'react';

import './Manual.css';

import { CardList, Groups, PaginationRounded } from '../../components';
import { getAllUserAggregatedWords, getWords } from '../../core/api';
import { ICardData, IGetCurrentUser } from '../../utils/alias';
import { MyContext } from '../../core/context';

export const Manual: React.FC = () => {
    const [cards, setCards] = useState<ICardData[]>([]);
    const [group, setGroup] = useState(0);
    const [page, setPage] = useState(0);
    const value = useContext(MyContext);

    const sortedWords = (words: ICardData[], arr2: ICardData[]) => {
        const newWords = words.map((item) => {
            const elem = item;
            arr2.forEach((card) => {
                /* eslint no-underscore-dangle: [1, { "allow": ["__place"] }] */
                if (card._id === elem.id) {
                    elem.isDifficult = true;
                }
            });
            return elem;
        });
        setCards(newWords);
    };

    useEffect(() => {
        const getCardData = async () => {
            const words: ICardData[] = await getWords({ group, page });
            const difficultWords: ICardData[] = await getAllUserAggregatedWords({ userId: value?.id, group, page });
            sortedWords(words, difficultWords);
        };
        getCardData();
    }, [value, page, group]);

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
