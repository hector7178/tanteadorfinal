import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementPeriod,
  decrementPeriod,
  incrementHomeFouls,
  decrementHomeFouls,
  incrementAwayFouls,
  decrementAwayFouls,
  selectHomeFouls,
  selectAwayFouls,
  selectPeriod,
  selectTeam1,
  selectTeam2,
  setTeam1,
  setTeam2,
  resetFouls,
  resetInfo
} from '../../../features/info/infoSlice';
import {
  updateScore,
  selectHomeScore,
  selectAwayScore,
  resetScores,
  resetAll,
} from '../../../features/scores/scoreSlice';
import ScoreCardB from '../../../app/features2/scores/ScoreCard';
import '../styles/SvgStyles.css'
import useControl from '../useControl';
import ScoreCard from '../../../features/scores/ScoreCard';
import InfoCard from '../../../features/info/InfoCard';
import Timer from '../../../features/timer/Timer';
import '../styles/ScoreBoard.scss';
import { resetTime, updateInitialTime } from '../../../features/timer/timerSlice';
import Silbato from './silbatosvg'
import {Dribbble} from 'react-bootstrap-icons'
import Ajustes from '../football/footballsvg/ajustes'
import  './basketball.css'
import BasicExample from '../navbar'
import Timer2 from '../../../app/features2/timer/Timer'
import ScoreCard2 from '../../../app/features2/scores/ScoreCard'
import Equipos from '../football/equipos';
import InfoCard2 from '../../../features/info/InfoCardf';
import {setTimerActive} from '../../../features/timer/timerSlice';
import TimerSinBotones from '../../../features/timer/timersinbotones';
import ExtraTime from '../../../features/timer/ExtraTime';

import '../handball/handball.css';
export default function BasketballControl() {
  const dispatch = useDispatch();

  const scoreboardId = useControl('Basketball', true);
  const period = useSelector(selectPeriod);

  const homeFouls = useSelector(selectHomeFouls);
  const awayFouls = useSelector(selectAwayFouls);

  const homeScore = useSelector(selectHomeScore);
  const awayScore = useSelector(selectAwayScore);

  const team1 = useSelector(selectTeam1);
  const team2 = useSelector(selectTeam2);

  const inputChanged = (event) => {
    const target = event.target;
    const value = target.value;

    if (target.id === 'team1') {
      dispatch(setTeam1(value));
    } else if (target.id === 'team2') {
      dispatch(setTeam2(value));
    }
  }

  useEffect(() => {
    dispatch(updateInitialTime(10));
    return () => {
      dispatch(resetInfo())
      dispatch(resetAll())
      dispatch(resetTime())
      dispatch(setTimerActive(false))
    }
  }, [])
  const [page, setPages]= useState('1' )
  const handlepage = () => setPages('1');
  const handlegoles= () => setPages('2');
  const handlepenales= () => setPages('3');

  return (
    <div className="scoreboard-basket">
      <div className='top-pagina'>
        <Dribbble color='#f59753' className='svg-top'/>
        <h1 className='titulotop' >Basketball</h1>
       <BasicExample  color='naranja' titulo='Basketball' SvgTop={<Dribbble fill='#f59753'  className='svg svg-nav position-absolute'/>} scoreboardId={scoreboardId}/>
       <button className='btn-volreset' onClick={ ()=> window.confirm('seguro?')?()=>{
                    dispatch(resetInfo());
                    dispatch(resetAll());
                    dispatch(resetTime());
                    dispatch(setTimerActive(false));}:null}>Reset </button>
      </div>
      <div className="formhandball">

<form className="scoreboardform-rugby form-group">
{page==='1'?
    <div className="equiposrug">
    <div className='logo-equipo'>
    Logo equipo
      </div>
      <div className="card-body-rug">
        <input
          type="text"
          className="equipo form-control"
          placeholder={team1}
          value={team1}
          id="team1"
          aria-label="Team1"
          onChange={inputChanged} ></input>
          </div></div>:
          <div className="equiposrug2 text-center">
            {team1}
            <div className='logo-equipo'>
              Logo equipo
            </div>
          </div>}
      
    
          {page==='1'?
          <div className="equiposrug">
            <div className='logo-equipo'>
          Logo equipo
            </div>
            <div className="card-body-rug">
              <input
                type="text"
                className="equipo form-control"
                placeholder={team2}
                value={team2}
                id="team1"
                aria-label="Team1"
                onChange={inputChanged} ></input>
            </div>
            </div>:
          <div className="equiposrug2 text-center borderleft">
            {team2}
            <div className='logo-equipo'>
              Logo equipo
            </div>
          </div>}
  </form>

   <div className="page-handball">

   {
    page==='1'?
    <div className="hanball-ajustes">
    
   
    <InfoCard
      title="Tiempo"
      info={period}
      incrementInfo={incrementPeriod}
      decrementInfo={decrementPeriod}
      color='naranja'
      h={true}
      >
    
      <ExtraTime extraTime={[30,20,5]} color='naranja' titulo='Duracion'/>
      </InfoCard>
    
    <Timer
      control
      color='naranja'
      start='justify-content-start d-flex'
    />
  </div>:page==='2'?
  
  <div className="handball-fouls">
    <TimerSinBotones show periodo={period} color='naranja' start='justify-content-start d-flex'/>
    <div className="handball-puntos">
      <ScoreCardB
        score={homeScore}
        updateScore={updateScore}
        points={[+1,+2,+3,-1,-2,-3]}
        player={'home'}
        color='naranja'
        crono='goles-con'
      />
    <div className="penales-panel">
      <h5 className="text-sub">Puntos</h5>
      <button
        type="button"
        className="botton-reset-p rounded-pill"
        onClick={()=> window.confirm('seguro?')?() => dispatch(resetScores()):null}
      >
        Reset
      </button>

    </div>
      <ScoreCardB
        score={awayScore}
        updateScore={updateScore}
        points={[+1,+2,+3,-1,-2,-3]}
        player={'away'}
        color='naranja'
        crono='goles-con'
        
      />
    </div>
    
  </div>:page==='3'?
    <div className="handball-fouls">
      <TimerSinBotones show periodo={period} color='naranja' start='justify-content-start d-flex'/>
   
      
    <div className="penales">
          <InfoCard2 p2
          color='naranja'
            
            info={homeFouls}
            incrementInfo={incrementHomeFouls}
            decrementInfo={decrementHomeFouls}
          />
          <div className="penales-panel">
          <h5 className="text-sub">Fouls</h5>
          
          
          <button
            type="button"
            className="botton-reset-p rounded-pill"
            onClick={()=> window.confirm('seguro?')?() => dispatch(resetFouls()):null}
          >
            Reset
          </button>
          </div>
          <InfoCard2 
            p2
            color='naranja'
           
            info={awayFouls}
            incrementInfo={incrementAwayFouls}
            decrementInfo={decrementAwayFouls}
          />
        </div>
    
      </div>
    :null
  
  

}  </div>


        

       
         </div>
         <div className='navegacion' ><Ajustes color={page==='1'?'#f3a36a':'#8a8a8b'} onClick={handlepage}>Ajusts</Ajustes><div className='ajustes d-grid'><Dribbble  height={'100%'} width={'100%'} fill={page==='2'?'#f3a36a':'#8a8a8b'} onClick={handlegoles}></Dribbble><h1 className='textsvg'>Puntos</h1></div><Silbato color={page==='3'?'#f3a36a':'#8a8a8b'} onClick={handlepenales}>Fouls</Silbato></div>
       
      </div>
   
  );
}