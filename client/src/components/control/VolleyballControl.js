import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTeam1,
    selectTeam2,
    setTeam1,
    setTeam2,
    setShowTimer,
    resetInfo,
    selectShowTimer
} from '../../features/info/infoSlice';
import {
    updateVolleyBallScore,
    updateVolleyBallGames,
    updateSets,
    selectHomeScore,
    selectAwayScore,
    selectHomeGames,
    selectAwayGames,
    selectPastHomeGames,
    selectPastAwayGames,
    selectHomeSets,
    selectAwaySets,
    resetScores,
    selectIsTieBreak,
    resetGames,
    resetSets,
    resetAll,
    selectServer,
    updateTieBreakScore,
    selectHomeTieBreakScore,
    selectAwayTieBreakScore,
    resetTieBreak,
    setShowTieBreak,
    updatePastGames,
    updateScoreLimit,
    updateGameNumber,
    updateTieBreakLimit,
} from '../../features/scores/scoreSlice';
import useControl from './useControl';
import Timer from '../../features/timer/Timer';
import ScoreCard from '../../features/scores/ScoreCard';
import './styles/ScoreBoard.scss';
import { resetTime } from '../../features/timer/timerSlice';

export default function VolleyBallControl() {
    const dispatch = useDispatch();

    const scoreboardId = useControl('Volleyball', true);

    const homeScore = useSelector(selectHomeScore);
    const awayScore = useSelector(selectAwayScore);

    const isTieBreak = useSelector(selectIsTieBreak);

    const homeTieBreakScore = useSelector(selectHomeTieBreakScore);
    const awayTieBreakScore = useSelector(selectAwayTieBreakScore);

    const showTimer = useSelector(selectShowTimer);
    const server = useSelector(selectServer);

    const homeGames = useSelector(selectHomeGames);
    const awayGames = useSelector(selectAwayGames);

    const pastHomeGames = useSelector(selectPastHomeGames);
    const pastAwayGames = useSelector(selectPastAwayGames);

    const homeSets = useSelector(selectHomeSets);
    const awaySets = useSelector(selectAwaySets);

    const team1 = useSelector(selectTeam1);
    const team2 = useSelector(selectTeam2);

    const inputChanged = (event) => {
        const target = event.target;
        const value = target.value;

        if (target.id === 'team1') {
            dispatch(setTeam1(value));
        } else if (target.id === 'team2') {
            dispatch(setTeam2(value));
        }
    }

    useEffect(() => {
        dispatch(updateScoreLimit(25));
        dispatch(updateGameNumber(3));
        dispatch(updateTieBreakLimit(15));

        return () => {
            dispatch(resetInfo())
            dispatch(resetAll())
            dispatch(resetTime())
        }
    }, [])

    return (
        <div className="scoreboard">
            <div className="scoreboard-container container justify-content-center align-items-center">
                <div className="row g-0">
                    <div className="col scoreboard-card card">
                        <div className="card-header row g-0 justify-content-center">
                            <h5 className="col-sm-12 col-md-12 text-center">Sets Total</h5>
                        </div>
                        <table className="table table-borderless card-body col">
                            <thead>
                                <tr>
                                    <th scope="col">
                                    </th>
                                    <th scope="col">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-period col-2"
                                            onClick={() => dispatch(updatePastGames(1))}
                                        >
                                            Set 1
                                        </button>
                                    </th>
                                    <th scope="col">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-period col-2"
                                            onClick={() => dispatch(updatePastGames(2))}
                                        >
                                            Set 2
                                        </button>
                                    </th>
                                    <th scope="col">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-period col-2"
                                            onClick={() => dispatch(updatePastGames(3))}
                                        >
                                            Set 3
                                        </button>
                                    </th>
                                    <th scope="col">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-period col-2"
                                            onClick={() => dispatch(updatePastGames(4))}
                                        >
                                            Set 4
                                        </button>
                                    </th>
                                    <th scope="col">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm btn-period col-2"
                                            onClick={() => dispatch(updatePastGames(5))}
                                        >
                                            Set 5
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">{team1}</th>
                                    {Object.entries(pastHomeGames).map((entry, index) => <td key={index}>{entry[1]}</td>)}
                                </tr>
                                <tr>
                                    <th scope="row">{team2}</th>
                                    {Object.entries(pastAwayGames).map((entry, index) => <td key={index}>{entry[1]}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col scoreboard-card card">
                        <div className="card-header row g-0 justify-content-center">
                            <h5 className="col-sm-12 col-md-12 text-center">TieBreak</h5>
                            <button
                                type="button"
                                className="btn-sm col-xs-2 col-md-2 btn btn-danger"
                                onClick={() => dispatch(resetTieBreak())}
                            >
                                Reset
                            </button>

                        </div>
                        <div className="row g-0 justify-content-center">
                            <ScoreCard
                                title="Local"
                                score={homeTieBreakScore}
                                updateScore={updateTieBreakScore}
                                points={[-1, 1]}
                                player={'home'}
                            />
                            <ScoreCard
                                title="Visitante"
                                score={awayTieBreakScore}
                                updateScore={updateTieBreakScore}
                                points={[-1, 1]}
                                player={'away'}
                            />
                        </div>
                    </div>
                </div>

                <div className="row g-0">
                    <div className="col scoreboard-card card">
                        <div className="card-header row g-0 justify-content-center">
                            <h5 className="col-sm-12 col-md-12 text-center">Set</h5>
                            <button
                                type="button"
                                className="btn-sm col-xs-2 col-md-2 btn btn-danger"
                                onClick={() => dispatch(resetSets())}
                            >
                                Reset
                            </button>

                        </div>
                        <div className="row g-0 justify-content-center">
                            <ScoreCard
                                title="Local"
                                score={homeSets}
                                updateScore={updateSets}
                                points={[-1, 1]}
                                player={'home'}
                            />
                            <ScoreCard
                                title="Visitante"
                                score={awaySets}
                                updateScore={updateSets}
                                points={[-1, 1]}
                                player={'away'}
                            />
                        </div>
                    </div>
                    <div className="col scoreboard-card card">
                        <div className="card-header row g-0 justify-content-center">
                            <h5 className="col-sm-12 col-md-12 text-center">Juego</h5>
                            <button
                                type="button"
                                className="btn-sm col-xs-2 col-md-2 btn btn-danger"
                                onClick={() => dispatch(resetGames())}
                            >
                                Reset
                            </button>

                        </div>
                        <div className="row g-0 justify-content-center">
                            <ScoreCard
                                title="Local"
                                score={homeGames}
                                updateScore={updateVolleyBallGames}
                                points={[-1, 1]}
                                player={'home'}
                            />
                            <ScoreCard
                                title="Visitante"
                                score={awayGames}
                                updateScore={updateVolleyBallGames}
                                points={[-1, 1]}
                                player={'away'}
                            />
                        </div>
                    </div>
                </div>

                <form className="scoreboard-card row g-0 justify-content-center">
                    <div className="col-sm-12 col-md-6 card text-center">
                        <div className="card-header">
                            <input
                                type="text"
                                className="col-sm-6"
                                placeholder={team1}
                                value={team1}
                                id="team1"
                                aria-label="Team1"
                                onChange={inputChanged} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 card text-center">
                        <div className="card-header">
                            <input
                                type="text"
                                className="col-sm-6"
                                placeholder={team2}
                                value={team2}
                                id="team2"
                                aria-label="Team2"
                                onChange={inputChanged} />
                        </div>
                    </div>
                </form>

                <div className="scoreboard-card card">
                    <div className="card-header row g-0 justify-content-center">
                        <h5 className="col-sm-12 col-md-12 text-center">Puntos</h5>
                        <button
                            type="button"
                            className="btn-sm col-xs-2 col-md-1 btn btn-danger"
                            onClick={() => dispatch(resetScores())}
                        >
                            Reset
                        </button>

                    </div>
                    <div className="row g-0 justify-content-center">
                        <ScoreCard
                            score={homeScore}
                            updateScore={updateVolleyBallScore}
                            points={[-1, 1]}
                            player={'home'}
                            server={server === 'home'}
                        />
                        <ScoreCard
                            score={awayScore}
                            updateScore={updateVolleyBallScore}
                            points={[-1, 1]}
                            player={'away'}
                            server={server === 'away'}
                        />
                    </div>
                </div>
                {
                    showTimer ?
                        <div className="scoreboard-card row g-0 justify-content-center">
                            <Timer control />
                        </div>
                        :
                        null
                }

                <div className="row g-0 justify-content-center scoreboard-row">
                    <button type="button" className="btn btn-primary btn-lg col-xs-2 col-md-2"
                        onClick={() => window.open(`/share/${scoreboardId}`, '_blank')}>
                        Mostrar tablero
                    </button>
                    <button
                        type="button"
                        className="btn-sm col-xs-2 col-md-2 btn btn-primary"
                        onClick={() => {
                            dispatch(setShowTimer());
                        }}
                    >
                        Mostrar Tiempo
                    </button>
                    <button
                        type="button"
                        className="btn-sm col-xs-2 col-md-2 btn btn-danger"
                        onClick={() => {
                            dispatch(resetInfo());
                            dispatch(resetAll());
                            dispatch(resetTime());
                        }}
                    >
                        Reset
                    </button>
                </div>

            </div>
        </div>
    );
}