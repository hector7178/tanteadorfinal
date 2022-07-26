
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
  selectExtraTime,
  incrementExtraTime,
  decrementExtraTime,
  selectTeam1,
  selectTeam2,
  setTeam1,
  setTeam2,
  resetFouls,
  resetInfo,
  
} from '../../../features/info/infoSlice';
import {
  updateScore,
  selectHomeScore,
  selectAwayScore,
  resetScores,
  resetAll,
} from '../../../features/scores/scoreSlice';
import useControl from '../useControl';
import ScoreCard from '../../../features/scores/ScoreCard';
import InfoCard from '../../../features/info/InfoCard';
import Timer from '../../../features/timer/Timer';
import BasicExample from '../navbar';
import Equipos from './equipos';

import { resetTime, updateInitialTime,halfTime } from '../../../features/timer/timerSlice';
import Balon from './footballsvg/balon';
import Ajustes from './footballsvg/ajustes';
import Penales from './footballsvg/penales';
import './futbol.css'

export default function FootballControl() {
  const dispatch = useDispatch();

  const scoreboardId = useControl('Football', true);
  const period = useSelector(selectPeriod);

  const extraTime = useSelector(selectExtraTime);

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
    dispatch(updateInitialTime(0));
    return () => {
      dispatch(resetInfo())
      dispatch(resetAll())
      dispatch(resetTime())
    }
  }, [])
  const [pages, setPages]= useState('1' )
  const handlepage = () => setPages('1');
  const handlegoles= () => setPages('2');
  const handlepenales= () => setPages('3');
   console.log(pages)

  return (
    <div className='pagina-futbol'>
      
      <div className='top position-relative'>< BasicExample color='success' scoreboardId={scoreboardId}/><Balon color='#23a96b' className='svg'/><h1 className='texto'>Futbol</h1></div>
      <div className='contenido'>
        
          {pages==='1'?<Equipos team1={team1} page={pages} team2={team2} inputChanged={inputChanged} />:<div className='equipos'>
              <div className="card-equipo-panel text-center">
               <div className='foto-equipo'></div>{team1}</div>
               <div className="card-equipo-panel text-center">
               <div className='foto-equipo'></div>{team2}</div>
            </div>
          }<div className={pages==='1'?"scoreboard-card-futbol":"scoreboard-card-futbol-2 "}>

            {pages==='1'?
            <div className="scoreboard-tiempo">
              <InfoCard
              color='success'
              title="Tiempo"
              info={period}
              incrementInfo={incrementPeriod}
              decrementInfo={decrementPeriod}
              halfTime={halfTime}
              />
            
              <Timer color='success' start='d-flex justify-content-start' info={period} control ascending />
            
         
            </div>
            :pages==='2' ?
            <div className='panel-goles'>
            <div className='tiempo-ext-panel-2'>
              <InfoCard  p2 
              color='success'
              title="T. Extra "
              info={extraTime}
              incrementInfo={incrementExtraTime}
              decrementInfo={decrementExtraTime}
              extraTime/>
              <Timer color='success' p2 control ascending sinbotones/>
              </div>
            <div className="scoreboard-goles">
                
  
         
              <ScoreCard
                p2 
                className='goles'
                score={homeScore}
                updateScore={updateScore}
                points={[-1, 1]}
                player={'home'}
              />
              <div className="panel-goles">
                  <h5 className="text-center center titulos">Goles</h5>
                  <button
                    type="button"
                    className="botton-reset"
                    onClick={() => dispatch(resetScores())}>Reset</button>
                </div>
              <ScoreCard
              className='goles'
                score={awayScore}
                updateScore={updateScore}
                points={[-1, 1]}
                player={'away'}
              />
           
          </div>
              
              
              </div> 


              :pages==='3'?
              <div className="scoreboard-card-penales">
                <div className='timer-extra'><Timer control ascending sinbotones>
                  </Timer>
                <InfoCard  p2 
                color='success'
                title="T. Extra "
                info={extraTime}
                incrementInfo={incrementExtraTime}
                decrementInfo={decrementExtraTime}
                extraTime/>
                </div>
              <div className="penales">
                <InfoCard p2
                color='success'
                  title="Local"
                  info={homeFouls}
                  incrementInfo={incrementHomeFouls}
                  decrementInfo={decrementHomeFouls}
                />
                <div className="penales-panel">
                <h5 className="text-sub">Penales</h5>
                
                
                <button
                  type="button"
                  className="botton-reset-p"
                  onClick={() => dispatch(resetFouls())}
                >
                  Reset
                </button>
                </div>
                <InfoCard p2
                  color='success'
                  title="Visitante"
                  info={awayFouls}
                  incrementInfo={incrementAwayFouls}
                  decrementInfo={decrementAwayFouls}
                />
              </div>
            </div>:'not found'}

          </div>
    </div>
   
      
      <div className='navegacion' ><Ajustes color={pages==='1'?'#58b358':'#8a8a8b'} onClick={handlepage}/><Balon color={pages==='2'?'#58b358':'#8a8a8b'} onClick={handlegoles}/><Penales color={pages==='3'?'#58b358':'#8a8a8b'} onClick={handlepenales}/></div>
    </div>
  );
}