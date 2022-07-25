import {React, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInterval } from '../../components/control/useInterval';
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
  updateInitialTime,
  halfTime,
  
 
} from './timerSlice';
import './timer.css';
export default function TimerSinBotones({
  ascending,
  extraTime,
  sinbotones,
  p2,
  color,
  info,children,start,periodo,show
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
    <button key={index} type="button" className="boton-tiempo-2 border-warning" onClick={() => {
      dispatch(updateInitialTime(time));
      dispatch(updateMinutes(time));
      dispatch(updateSeconds(0));

    }}>
      {time}:{padNumber(0)}
    </button>
  );
     const half=()=>info===2?dispatch(halfTime()):null
     
       return (
    <div className='timersinbotones'>
    {

        
          <div className='cronometro'>
            <div className='titulocrono'>
            <h5 style={{fontSize:'2em'}}>{show?`T ${periodo}`:'Reloj'}</h5>
            </div>
            <div className='botones-reloj-crono'>
            <span className="time" >{padNumber(minutes)}:{padNumber(seconds)}</span>
            <div className='btns-crono' >
              
              <button type="button" className={`btn-crono border-${color} rounded-pill`} onClick={() => {
                dispatch(setTimerActive(true));
                half();}} >Iniciar</button>
              <button type="button" className={`btn-crono border-${color}  rounded-pill`} onClick={() => dispatch(setTimerActive(false))} >Pausa</button>
              
            </div>
            
            </div>
            
            
          </div>
      }
    </div>
  );
}
