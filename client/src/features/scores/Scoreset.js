import { useDispatch } from 'react-redux';
import {useState} from 'react';
import { updateServer } from './scoreSlice';
import './score.css'
import '../../components/control/tennis/tennis.css'
export default function ScoreSet(
  {
    title,
    score,
    updateScore,
    points,
    advantage,
    server,
    updateDelScore,
    tennis,
    color,
    set,
    player,
    actualizar
    
  }) {
    
  const dispatch = useDispatch();
  const pointButton = (point, index) => (
    <button key={index} type="button" className={`boton-goles-cir border-${color}`}
      onClick={() => dispatch(updateScore([point, player,set]))}>
      {
        (point > 0 && !tennis) ?
          `+${point}`
          :
          point
      }
    </button>
  );
const [p, setp]=useState(15);

function buttonsScore(){
setp((s)=>score===40? s=0:s===30?s+10:s===40?s='AD':s==='AD'?s=15:s+15);

dispatch(updateScore([p, player,set]));

}


console.log(score)
console.log(p)
 return (
    <div className='e text-center '>
            <div className='nset'>{advantage === undefined ? score
                  : advantage === "" ? score
                    : advantage === player ? 'AD' : <div>&nbsp;</div>}</div>
          <div className='score-buttons'> <button type="button" className={`boton-goles-cir btn-set btn-g bg-white   border-${color}`}
      > {score} </button>
      <button className={`boton-goles-cir btn-set btn-g  border-${color} ${advantage === player ?'bg-orange text-white': 'bg-white'}`} onClick={buttonsScore} >{ advantage === player ?'Game': p}</button>
      </div>    
    </div>
  )
}
