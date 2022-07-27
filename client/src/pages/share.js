import React, { useState, useEffect } from 'react';
import {
    getScoreBoard
} from '../services/scoreboard.service';
import FootballShow from '../components/show/FootballShow';
import BasketballShow from '../components/show/BasketballShow';
import TennisShow from '../components/show/TennisShow';
import RugbyShow from '../components/show/RugbyShow';
import HandballShow from '../components/show/HandballShow';
import VolleyballShow from '../components/show/VolleyballShow';
import HockeyShow from '../components/show/HockeyShow';
import config from "../config";

import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './styles/share.scss';
// const api = 'http://localhost:8080';
// const api = 'http://18.231.181.224:8080/';
const api = config.urlApi;
const socket = io(api);

export default function Share() {
    const { scoreboardId } = useParams();
    const [board, setBoard] = useState({});

    const renderSportBoard = (sport, board) => {
        switch (sport) {
            case 'Football':
                return <FootballShow {...board} />;
            case 'Basketball':
                return <BasketballShow {...board} />;
            case 'Tennis':
                return <TennisShow {...board} />;
            case 'Rugby':
                return <RugbyShow {...board} />;
            case 'Handball':
                return <HandballShow {...board} />;
            case 'Volleyball':
                return <VolleyballShow {...board} />;
            case 'Hockey':
                return <HockeyShow {...board} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        async function fetchScoreBoard() {
            setBoard(await getScoreBoard(scoreboardId));
        }
        fetchScoreBoard();
    }, [scoreboardId]);

    useEffect(() => {
        socket.on('updateBoard', board => {
            setBoard(board);
        });
        return () => socket.disconnect();
    }, []);

    return (
        <div className="scoreboard-share row g-5 align-items-center justify-content-center">
            {
                renderSportBoard(board.sport, board)
            }
        </div >
    );
}
