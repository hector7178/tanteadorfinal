import { useDispatch } from 'react-redux';
import { updateServer } from './scoreSlice';
import './score.css'
export default function ScoreCard2(
  {
    title,
    score,
    updateScore,
    points,
    advantage,
    server,
    player,
    tennis,
    color,
    ba
  }) {
  const dispatch = useDispatch();
  const pointButton = (point, index) => (
    <button key={index} type="button" className={`boton-score-circl ${ba===true?'w-pe':null} border-${color} bg-white`}
      onClick={() => dispatch(updateScore([point, player]))}>
      {
        (point > 0 && !tennis) ?
          `+${point}`
          :
          point
      }
    </button>
  );

  return (
    <div className={
      updateScore ?
        "score2" :
        "score2"
    }>
      <div className="card-header-score">
        <h5>{title}</h5>
        {
          server ?
            ''
            :
            <div onClick={() => {
              if (updateScore) {
                dispatch(updateServer())
              }
            }}>
              &nbsp;
            </div>
        }
      </div>
      {
        updateScore ?
          <div className="card-body-score">
            <span className="puntos-equipos">
              {
                advantage === undefined ? score
                  : advantage === "" ? score
                    : advantage === player ? 'AD' : <div>&nbsp;</div>
              }
            </span>
            <div className="botones-puntos">
              {
                points.map((point, index) => pointButton(point, index))
              }
            </div>
          </div>
          :
          <div className="card-body share-card-body">
            <span className="score row justify-content-center">
              {
                advantage === undefined ? score
                  : advantage === "" ? score
                    : advantage === player ? 'AD' : <div>&nbsp;</div>
              }
            </span>
          </div>
      }
    </div>
  );
}
