import { useDispatch } from 'react-redux';
import './timer.css'
import {
    updateMinutes,
    updateSeconds,
    updateInitialTime} from './timerSlice';


export default function ExtraTime({extraTime,color, titulo}){
const dispatch = useDispatch();
const padNumber = (number) => number.toString().padStart(2, '0');

    
  const timeButton = (time, index) => (
    <button key={index} type="button" className={`boton-tiempo-2 fs-10 border-${color?color:'warning'} `} onClick={() => {
      dispatch(updateInitialTime(time));
      dispatch(updateMinutes(time));
      dispatch(updateSeconds(0));

    }}>
      {time}:{padNumber(0)}
    </button>
  );
return(
    <div className='duracion'>
       <h5 className='time-titulo'>{titulo}</h5> 
    <div className='extratime'>
    {extraTime.map((time, index) => timeButton(time, index))}
    </div>
    </div>
                  
)
}