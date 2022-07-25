export default function TimerShow({
    minutes,
    seconds,
}) {
    const padNumber = (number) => number?.toString().padStart(2, '0');

    return (
        <div className="scoreboard-timer col-sm-12 col-md-6 bg-transparent card text-center">
            <div className="card-header">
                <h5>Tiempo</h5>
            </div>
            {
                <div>
                    <div className="card-body share-card-body timer-body">
                        <span className="time">{padNumber(minutes)}:{padNumber(seconds)}</span>
                    </div>
                </div>
            }
        </div>
    );
}
