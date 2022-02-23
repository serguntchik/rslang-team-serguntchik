import React, { useContext, useEffect, useState } from 'react';

import { CardList, Groups, PaginationRounded } from '../../components';
import { getAllUserAggregatedWords } from '../../core/api';
import { MyContext } from '../../core/context';
import { ICardData } from '../../utils/alias';

export const DifficultWords: React.FC = () => {
    const [cards, setCards] = useState<ICardData[]>([]);
    const [group, setGroup] = useState(0);
    const [page, setPage] = useState(0);
    const { currentUser } = useContext(MyContext);

    useEffect(() => {
        const getCardData = async () => {
            const words: ICardData[] = await getAllUserAggregatedWords({ userId: currentUser?.id, group, page });
            const newWords = words.map((word) => {
                const newWord = word;
                newWord.isDifficult = true;
                return newWord;
            });
            setCards(newWords);
        };
        getCardData();
    }, [page, group]);

    const deleteWord = (word: ICardData) => {
        /* eslint no-underscore-dangle: [1, { "allow": ["__place"] }] */
        setCards(cards.filter((card) => card._id !== word._id));
    };

    return (
        <div className="manual">
            <div className="controls">
                <Groups setGroup={setGroup} />
                <PaginationRounded setPage={setPage} />
            </div>
            {cards.length ? <CardList words={cards} remove={deleteWord} /> : <p>Не найдено слов</p>}
        </div>
    );
};
