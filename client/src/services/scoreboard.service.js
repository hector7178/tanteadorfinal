import axios from 'axios';
import config from "../config";

// const api = 'http://localhost:8080';
const api = config.urlApi;

export async function createScoreBoard(data) {
    data.date = new Date();
    const response = await axios.post(api + "/scoreboard", data).catch(err => {
        console.log(err);
    });
    return response.data.insertedId;
}

export async function updateScoreBoard(scoreboardId , data){
    const response = await axios.put(api + `/scoreboard/${scoreboardId}`, data).catch(err => {
        console.log(err);
    });
    return response.data;
}

export async function getScoreBoard(scoreboardId){
    const response = await axios.get(api + `/share/${scoreboardId}`).catch(err => {
        console.log(err);
    });
    return response.data;
}
