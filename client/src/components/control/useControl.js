import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectHomeFouls,
    selectAwayFouls,
    selectPeriod,
    selectExtraTime,
    selectTeam1,
    selectTeam2,
    selectShowExtraTime,
    selectShowTimer
} from '../../features/info/infoSlice';
import {
    selectHomeScore,
    selectAwayScore,
    selectHomeGames,
    selectAwayGames,
    selectHomeSets,
    selectAwaySets,
    selectScoreLimit,
    selectPastHomeGames,
    selectPastAwayGames,
    selectServer,
    selectHomeTieBreakScore,
    selectAwayTieBreakScore,
    selectShowTieBreak,
    selectAdvantage
} from '../../features/scores/scoreSlice';
import {
    selectMinutes, selectSeconds,
    selectTimerActive
} from '../../features/timer/timerSlice';
import {
    updateScoreBoard,
    createScoreBoard
} from '../../services/scoreboard.service';

export default function useControl(sport, countdown) {
    const team1 = useSelector(selectTeam1);
    const team2 = useSelector(selectTeam2);

    const period = useSelector(selectPeriod);
    const server = useSelector(selectServer);

    const homeFouls = useSelector(selectHomeFouls);
    const awayFouls = useSelector(selectAwayFouls);

    const extraTime = useSelector(selectExtraTime);
    const scoreLimit = useSelector(selectScoreLimit);

    const homeScore = useSelector(selectHomeScore);
    const awayScore = useSelector(selectAwayScore);

    const advantage = useSelector(selectAdvantage);
    const homeTieBreakScore = useSelector(selectHomeTieBreakScore);
    const awayTieBreakScore = useSelector(selectAwayTieBreakScore);

    const pastHomeGames = useSelector(selectPastHomeGames);
    const pastAwayGames = useSelector(selectPastAwayGames);

    const homeGames = useSelector(selectHomeGames);
    const awayGames = useSelector(selectAwayGames);

    const homeSets = useSelector(selectHomeSets);
    const awaySets = useSelector(selectAwaySets);

    const showExtraTime = useSelector(selectShowExtraTime);
    const showTimer = useSelector(selectShowTimer);
    const showTieBreak = useSelector(selectShowTieBreak);

    const minutes = useSelector(selectMinutes);
    const seconds = useSelector(selectSeconds);
    const timerActive = useSelector(selectTimerActive);

    const [scoreboardId, setId] = useState({});


    const updateBoard = async () => {
        let data = {
            sport: sport,
            team1: team1,
            team2: team2,
            period: period,
            homeFouls: homeFouls,
            awayFouls: awayFouls,
            extraTime: extraTime,
            scoreLimit: scoreLimit,
            homeScore: homeScore,
            awayScore: awayScore,
            homeTieBreakScore: homeTieBreakScore,
            awayTieBreakScore: awayTieBreakScore,
            showTieBreak: showTieBreak,
            advantage: advantage,
            homeGames: homeGames,
            awayGames: awayGames,
            pastHomeGames: pastHomeGames,
            pastAwayGames: pastAwayGames,
            homeSets: homeSets,
            awaySets: awaySets,
            timerActive: timerActive,
            showExtraTime: showExtraTime,
            timerActive: timerActive,
            minutes: minutes,
            seconds: seconds,
            server: server
        };
        await updateScoreBoard(scoreboardId, data);
    };

    useEffect(() => {
        async function initScoreBoard() {
            let data = {
                sport: sport,
                team1: team1,
                team2: team2,
                period: period,
                homeFouls: homeFouls,
                awayFouls: awayFouls,
                extraTime: extraTime,
                scoreLimit: scoreLimit,
                homeScore: homeScore,
                awayScore: awayScore,
                homeTieBreakScore: homeTieBreakScore,
                awayTieBreakScore: awayTieBreakScore,
                showTieBreak: showTieBreak,
                advantage: advantage,
                homeGames: homeGames,
                awayGames: awayGames,
                pastHomeGames: pastHomeGames,
                pastAwayGames: pastAwayGames,
                homeSets: homeSets,
                awaySets: awaySets,
                timerActive: timerActive,
                showExtraTime: showExtraTime,
                timerActive: timerActive,
                minutes: minutes,
                seconds: seconds,
                server: server
            };
            setId(await createScoreBoard(data));
        }
        initScoreBoard();
    }, [
        sport,
        team1,
        team2,
        period,
        homeFouls,
        awayFouls,
        extraTime,
        scoreLimit,
        homeScore,
        awayScore,
        homeTieBreakScore,
        awayTieBreakScore,
        showTieBreak,
        advantage,
        homeGames,
        awayGames,
        pastHomeGames,
        pastAwayGames,
        homeSets,
        awaySets,
        showExtraTime,
        showTimer,
        timerActive,
        minutes,
        seconds,
        server
    ]);

    useEffect(() => {
        async function initScoreBoard() {
            await updateBoard();
        }
        initScoreBoard();
    });
    return scoreboardId;
}