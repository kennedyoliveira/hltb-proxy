import http from 'k6/http';
import {check} from 'k6';
import {SharedArray} from "k6/data";
import {sampleGameList} from "./gameList.js";

const BASE_URL = 'https://proxy-hltb.fly.dev';

export const options = {
    // A number specifying the number of VUs to run concurrently.
    vus: 2,
    // A string specifying the total duration of the test run.
    duration: '5s',
};

const gameNames = new SharedArray('game_list', function () {
    const selectedGames = sampleGameList(100)

    console.log('Selected games:');
    console.log(selectedGames);

    return selectedGames;
});

export default function () {
    // pick one random game name
    const gameName = gameNames[Math.floor(Math.random() * gameNames.length)]
    const gameNameQuery = encodeURI(gameName);
    const resp = http.get(`${BASE_URL}/v1/search?q=${gameNameQuery}`, {
        tags: {
            game: gameName,
        }
    });

    check(resp, {
        'status is 200': (r) => r.status === 200,
        'CORS header is preset': (r) => r.headers['Access-Control-Allow-Origin'] === '*',
    });
}
