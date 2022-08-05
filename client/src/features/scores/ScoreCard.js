import { useDispatch } from 'react-redux';
import { updateServer } from './scoreSlice';
import './score.css';
import {Plus, Dash} from 'react-bootstrap-icons';

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
    set,
    crono
  }) {
   
   
    
  const dispatch = useDispatch();
  
 
  const pointButton = (point, index) => (
    <button key={index} type="button" className={`boton-goles-cir ${index<2?`bg-${color} text-white`:'bg-white'} btn-w  border-${color}`}
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
      updateScore ?title?'goles':
        "golest" :
        "col-sm-12 col-md-6 bg-transparent card text-center"
    }>
     {title? <div className="card-header-goles">
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
      </div>:null}
      {
        updateScore ?
          <div className="card-body-goles">
            <span className={crono}>
              {
                advantage === undefined ? score
                  : advantage === "" ? score
                    : advantage === player ? 'AD' : <div>&nbsp;</div>
              }
            </span>
            <div className="botones-goles">
              {
               points.length===2?
               <>
               <button  type="button" className={`boton-goles-cir text-${color} d-flex justify-content-center btn-w bg-white border-${color}`} onClick={()=>dispatch(updateScore([points[0], player,set]))}><Dash width="100%" height="100%"/></button>
                <button  type="button" className={`boton-goles-cir d-flex justify-content-center btn-w bg-${color} border-${color}`}onClick={()=>dispatch(updateScore([points[1], player,set]))}><Plus fill='#ffffff' width="100%" height="100%"/></button>
               </>
               :
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
