import http from 'k6/http';
import {check} from 'k6';
import {SharedArray} from "k6/data";
import {sampleGameList} from "./gameList.js";

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export const options = {
    scenarios: {
        // warm up the caches
        warmup: {
            executor: 'constant-vus',
            vus: 5,
            duration: '1m',
        },
        // do the actual benchmark
        benchmark: {
            executor: 'ramping-vus',
            stages: [
                {duration: '20m', target: 100},
            ],
            startVUs: 0,
            gracefulRampDown: '10s',
            // wait a bit before starting the benchmark
            startTime: '75s',
        }
    }
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
