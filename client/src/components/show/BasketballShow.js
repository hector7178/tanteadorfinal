import ScoreCard from '../../features/scores/ScoreCard';
import InfoCard from '../../features/info/InfoCard';
import TimerShow from '../../features/timer/TimerShow';
import '../control/styles/ScoreBoard.scss';

export default function BasketballShow({
    team1,
    team2,
    period,
    homeFouls,
    awayFouls,
    homeScore,
    awayScore,
    minutes,
    seconds
}) {
    return (
        <div className="scoreboard">
            <div className="scoreboard-container container-sm justify-content-center align-items-center">

                <form className="scoreboard-card row g-0 justify-content-center">
                    <div className="col-sm-12 col-md-6 card bg-transparent text-center">
                        <div className="card-header">
                            <input
                                type="text"
                                className="col-sm-6"
                                value={team1}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 card bg-transparent text-center">
                        <div className="card-header">
                            <input
                                type="text"
                                className="col-sm-6"
                                value={team2}
                                readOnly
                            />
                        </div>
                    </div>
                </form>

                <div className="scoreboard-card card">
                    <div className="card-header row g-0 justify-content-center">
                        <h5 className="col-sm-12 col-md-12 text-center">Fouls</h5>
                    </div>
                    <div className="row g-0 justify-content-center">
                        <InfoCard
                            title="Local"
                            info={homeFouls}
                        />
                        <InfoCard
                            title="Visitante"
                            info={awayFouls}
                        />
                    </div>
                </div>

                <div className="scoreboard-card card">
                    <div className="card-header row g-0 justify-content-center">
                        <h5 className="col-sm-12 col-md-12 text-center">Puntos</h5>

                    </div>

                    <div className="row g-0 justify-content-center">
                        <ScoreCard
                            score={homeScore}
                            player={'home'}
                        />
                        <ScoreCard
                            score={awayScore}
                            player={'away'}
                        />
                    </div>
                </div>

                <div className="scoreboard-card row g-0 justify-content-center">
                    <InfoCard
                        title="Periodo"
                        info={period}
                    />
                    <TimerShow
                        minutes={minutes}
                        seconds={seconds}
                    />
                </div>
            </div>
        </div >
    );
}