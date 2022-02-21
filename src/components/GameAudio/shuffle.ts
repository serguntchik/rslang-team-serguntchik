function shuffleIndex(array: Array<number>) {
    const arr = array;
    let randomIndex;
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
}

function rand(position: number, wordsRu: Array<string>) {
    const index: Array<number> = [];

    while (index.length < 3) {
        const rndAnswer = Math.floor(Math.random() * 20);
        if (rndAnswer !== position && !index.includes(rndAnswer)) {
            index.push(rndAnswer);
        }
    }
    index.push(position);

    const randomIndex = shuffleIndex(index);
    const shuffleWords: Array<string | undefined> = [];

    randomIndex.forEach((element) => shuffleWords.push(wordsRu.find((_el, i) => i === element)));

    return shuffleWords;
}

export default rand;
