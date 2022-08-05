import React from 'react';
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
export default function Timer({
  ascending,
  extraTime,
  sinbotones,
  voley,
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
    <div className={sinbotones?'reloj-fut-sin':`reloj-fut`}>
    {

        
          <div className={p2?'reloj-fut-grid-2':sinbotones?'reloj-fut-grid-2':'reloj-fut-grid'}>
            <div className={p2?'crono-2':sinbotones?'crono-sin':"crono"} >
            {voley?<h5> { `Tiempo set${voley}`} </h5>:<h5 style={{fontSize:'2em'}}>{show?`T ${periodo}`:'Reloj'}</h5>}
            </div>
            <div className={p2?"botones-reloj-2":sinbotones?"botones-reloj-sin":"botones-reloj"}>
            <span className="time" >{padNumber(minutes)}:{padNumber(seconds)}</span>
            {children}
             {sinbotones?'' : <div className='botones'><button type="button" className={`btn aggt text-white  btn-sm btn-time bg-${color}`} onClick={() => dispatch(incrementSeconds(60))}>+60</button>
              <button type="button" className={`btn aggt text-white btn-sm btn-time bg-${color}`} onClick={() => dispatch(incrementSeconds(10))}>+10</button>
              <button type="button" className={`btn aggt text-white  btn-sm btn-time bg-${color}`}onClick={() => dispatch(incrementSeconds(1))}>+1</button>
              <button type="button" className={`btn aggt btn-sm btn-time border-${color}`} onClick={() => dispatch(decrementSeconds(60))}>-60</button>
              <button type="button" className={`btn aggt btn-sm btn-time border-${color}`} onClick={() => dispatch(decrementSeconds(10))}>-10</button>
              <button type="button" className={`btn aggt btn-sm btn-time border-${color}`} onClick={() => dispatch(decrementSeconds(1))}>-1</button>
              </div>}
            </div>
            
            <div className={`reloj-fut-crono ${start}`}>
            
            
              {
                extraTime ?
                  <div>
                  {extraTime.map((time, index) => timeButton(time, index))}</div>
                  :
                  null
              }
            
            <div className={p2?"botones-re-ini-pau-2":"botones-re-ini-pau"} >
              
              <button type="button" className={`boton-tiempo-2 border-${color}`} onClick={() => {
                dispatch(setTimerActive(true));
                half();}} >Iniciar</button>
              <button type="button" className={`boton-tiempo-2 border-${color}`} onClick={() => dispatch(setTimerActive(false))} >Pausa</button>
              <button type="button" className={`boton-tiempo-2 bg-danger text-white border-danger`} onClick={() => {
                dispatch(resetTime());dispatch(setTimerActive(false));
              }} >Reset</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
