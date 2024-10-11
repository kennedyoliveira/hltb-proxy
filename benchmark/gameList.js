export function sampleGameList(sampleSize) {
    const gameNames = open('./game-list.txt').split('\n');
    return gameNames
        .filter(name => !name.includes('?'))
        .sort(() => 0.5 - Math.random())
        .slice(0, sampleSize);
}