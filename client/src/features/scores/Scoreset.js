import { useDispatch,useSelector } from 'react-redux';
import {useState} from 'react';
import {ReplyFill} from 'react-bootstrap-icons';
import { 
  updateServer,
  selectHomeScore,
  selectAwayScore, } from './scoreSlice';
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
    actualizar,

    
  }) {
    
  const dispatch = useDispatch();
  const homeScore = useSelector(selectHomeScore);
  const awayScore = useSelector(selectAwayScore);

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
if(score===0){
  dispatch(updateScore([15, player,set]));
}if(score===15){
  dispatch(updateScore([30, player,set]));
}if(score===30){
  dispatch(updateScore([40, player,set]));
}if(score===40){
  dispatch(updateScore([50, player,set]));}


}
let next=player==='away'?
homeScore
:
awayScore;


 return (
    <div className='e text-center '>
            <div className='nset'>{advantage === undefined ? ''
                  : advantage === "" ? score
                    : advantage === player ? 'AD' : score}</div>
          <div className='score-buttons'> <button type="button" className={`boton-goles-cir btn-set btn-g bg-white   border-${color}`}
      > {score===0?score:<ReplyFill fill="#ff9f59" width='100%' height='100%' className=''/>} </button>
      <button className={`boton-goles-cir btn-set btn-g ${score===40?'bg-naranja text-white':null} border-${color} bgn-white ${advantage === player ?'bg-orange text-white': null}`} onClick={buttonsScore} >{ advantage === player ?'Game':score===40? (next=== 40?'Deuce':'Game'): score}</button>
      </div>    
    </div>
  )
}
