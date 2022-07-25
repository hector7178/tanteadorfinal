import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInterval } from '../../../components/control/useInterval';
import {
  incrementSeconds,
  decrementSeconds,
  updateMinutes,
  updateSeconds,
  selectMinutes,
  selectSeconds,
  selectTimerActive,
  setTimerActive,
  resetTime,
  updateInitialTime
} from './timerSlice';
import './timer.css';
export default function Timer2({
  ascending,
  extraTime,
  p2,
  children,
  color
}) {
  const dispatch = useDispatch();
  const padNumber = (number) => number.toString().padStart(2, '0');

  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const timerActive = useSelector(selectTimerActive);

  useInterval(() => {
    if (timerActive && ascending) {
      dispatch(incrementSeconds(1));
    } else if (timerActive) {
      dispatch(decrementSeconds(1));
    }
  },1000);


  const timeButton = (time, index) => (
    <button key={index} type="button" className="btn btn-primary btn-sm btn-extra-time col-2" onClick={() => {
      dispatch(updateInitialTime(time));
      dispatch(updateMinutes(time));
      dispatch(updateSeconds(0));
    }}>
      {time}:{padNumber(0)}
    </button>
  );

  return (
    <div className="reloj-tiempo">
     <div className='tiempo-selec'>
         { children}
      </div>  
          <div className={p2?'reloj-fut-grid-2':'reloj-fut-grid'}>
          <div className={p2?'crono-2':"crono"} >
            <h5 style={{fontSize:'2em'}}>Reloj</h5>
            </div>

            <div className={p2?"botones-reloj-2":"botones-reloj"}>
            
            <span className="time" >{padNumber(minutes)}:{padNumber(seconds)}</span>

            </div>
            
            <div className='reloj-fut-crono'>
            
            
              {
                extraTime ?

                  extraTime.map((time, index) => timeButton(time, index))
                  :
                  null
              }
            
            <div className={p2?"botones-re-ini-pau-2":"botones-re-ini-pau"} >
              
              <button type="button" className={`boton-tiempo-2 border-${color}`} onClick={() => dispatch(setTimerActive(true))} >Iniciar</button>
              <button type="button" className={`boton-tiempo-2 border-${color}`} onClick={() => dispatch(setTimerActive(false))} >Pausa</button>
              <button type="button" className={`boton-tiempo-2 border-${color}`} onClick={() => {dispatch(resetTime());dispatch(setTimerActive(false));}} >Reset</button>
            </div>
            </div>
      
      
          </div>
  </div>
  );
}