import { useDispatch } from 'react-redux';
import { updateServer } from './scoreSlice';
import './score.css'

export default function ScoreCard(
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
    actualizar,
    set
  }) {
   
   
    
  const dispatch = useDispatch();
  
 
  const pointButton = (point, index) => (
    <button key={index} type="button" className={`boton-goles-cir btn-w bg-white border-${color}`}
      onClick={()=>dispatch(updateScore([point, player,set]))}>
      {
        (point > 0 && !tennis) ?
          `+${point}`
          :
          point
      }
    </button>
  );
const a=[-1,1];
  return (
    <div className={
      updateScore ?
        "goles" :
        "col-sm-12 col-md-6 bg-transparent card text-center"
    }>
      <div className="card-header-goles">
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
          <div className="card-body-goles">
            <span className="goles-con">
              {
                advantage === undefined ? score
                  : advantage === "" ? score
                    : advantage === player ? 'AD' : <div>&nbsp;</div>
              }
            </span>
            <div className="botones-goles">
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
