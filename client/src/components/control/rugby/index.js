import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementPeriod,
  decrementPeriod,
  selectPeriod,
  selectTeam1,
  selectTeam2,
  setTeam1,
  setTeam2,
  resetInfo
} from '../../../features/info/infoSlice';
import {
  updateScore,
  selectHomeScore,
  selectAwayScore,
  resetScores,
  resetAll,
} from '../../../features/scores/scoreSlice';
import {setTimerActive} from '../../../features/timer/timerSlice';
import BasicExample from '../navbar';
import useControl from '../useControl';
import ScoreCard2 from '../../../app/features2/scores/ScoreCard';
import InfoCard from '../../../features/info/InfoCard';
import Timer from '../../../features/timer/Timer';
import '../styles/ScoreBoard.scss';
import { resetTime, updateInitialTime } from '../../../features/timer/timerSlice';
import Ajustes from '../football/footballsvg/ajustes';
import PelotaRugby from './rugbysvg';
import Equipo from '../football/equipos'
import './rugby.css';

export default function RugbyControl() {
  const dispatch = useDispatch();

  const scoreboardId = useControl('Rugby', true);
  const period = useSelector(selectPeriod);

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
      dispatch(setTimerActive(false))
    }
  }, [])
  const [page, setpage]=useState('1')
  const pagina1= ()=> setpage('1');
  const pagina2= ()=> setpage('2');

  return (
    <div className="scoreboardrugby">
       <div className='topvol bg-verde'>
                    <BasicExample color='verde' titulo='Rugby' SvgTop={<PelotaRugby fill='#69c16f'  className='svg svg-nav position-absolute'/>}  scoreboardId={scoreboardId}/>
                    <PelotaRugby fill='#69c16f' className='svg-top'/>
                    <h1 className='titulorug'>Rugby</h1>
                    <button className='btn-volreset' onClick={ ()=> window.confirm('seguro?')?()=>{
                    dispatch(resetInfo());
                    dispatch(resetAll());
                    dispatch(resetTime());
                    dispatch(setTimerActive(false));}:null}>Reset </button>
                </div>
      <div className={page==='2'?'scoreboard-rugby-2':"scoreboard-rugby"}>
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
       { page==='1'?
        <div className='rugpage1'><InfoCard
            title="Periodo"
            info={period}
            incrementInfo={incrementPeriod}
            decrementInfo={decrementPeriod}
            color='verde'
          />
          <Timer color='verde' start='justify-content-start d-flex' control ascending/>
          
          </div>:page==='2'?
          <div className='rugpage2'>
            <div className="timer-rugby">
          
          <Timer show color='verde' titulo='Futbol' periodo={period} control ascending start='justify-content-start d-flex'/>
        </div>
        <div className="scoreboard-puntos-rugby">
          

          <div className="puntos-rugby">
            <ScoreCard2
              score={homeScore}
              updateScore={updateScore}
              points={[+2, +3,+5, -2, -3, -5]}
              player={'home'}
              color='verde'
              ba={true}
            />
            <div className="card-header-rugby">
            <h5 className="titulos-rug text-center rounded-pill">Puntos</h5>
            <button
              type="button"
              className="button-reset rounded-pill"
              onClick={() =>  window.confirm('seguro?')?dispatch(resetScores()):null}
            >
              Reset
            </button>

            </div>
            <ScoreCard2
              score={awayScore}
              updateScore={updateScore}
              points={[+2, +3, +5, -2, -3, -5]}
              player={'away'}
              color='verde'
              ba={true}
             
            />
          </div>
        </div>

        
        </div>:null
}

       
      </div>
      <div className='navegacion-rugby'><Ajustes color={page==='1'?'#24b524':'#8a8a8b'} onClick={pagina1}>Ajustes</Ajustes><PelotaRugby fill={page==='2'?'#24b524':'#8a8a8b'} onClick={pagina2}>Puntos</PelotaRugby></div>

    </div >
  );
}