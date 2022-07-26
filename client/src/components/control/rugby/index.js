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
    }
  }, [])
  const [page, setpage]=useState('1')
  const pagina1= ()=> setpage('1');
  const pagina2= ()=> setpage('2');

  return (
    <div className="scoreboardrugby">
       <div className='topvol bg-success'>
                    <BasicExample color='success' scoreboardId={scoreboardId}/>
                    <PelotaRugby fill='#37a572' className='svg-top'/>
                    <h1 className='titulotop'>Rugby</h1>
                    <button className='btn-volreset' onClick={ ()=> window.confirm('seguro?')?()=>{
                    dispatch(resetInfo());
                    dispatch(resetAll());
                    dispatch(resetTime());}:null}>Reset </button>
                </div>
      <div className="scoreboard-rugby">
<form className="scoreboardform-rugby form-group">
          <div className="equiposrug">
            <div className='logo-equipo'>
            </div>
            <div className="card-body-rug">
              {page==='1'?<input
                type="text"
                className="equipo form-control"
                placeholder={team1}
                value={team1}
                id="team1"
                aria-label="Team1"
                onChange={inputChanged} />:team1}
            </div>
          </div>
          <div className="equiposrug">
            

            <div className='logo-equipo'>
            </div>
            <div className="card-body-rug">
              {page==='1'?<input
                type="text"
                className="equipo form-control"
                placeholder={team2}
                value={team2}
                id="team2"
                aria-label="Team2"
                onChange={inputChanged} />:team2}
            </div>
          </div>
        </form>
       { page==='1'?
        <div className='rugpage1'><InfoCard
            title="Periodo"
            info={period}
            incrementInfo={incrementPeriod}
            decrementInfo={decrementPeriod}
            color='success'
          />
          <Timer color='success' start='justify-content-start d-flex' control ascending/>
          
          </div>:page==='2'?
          <div className='rugpage2'>
        <div className="scoreboard-puntos-rugby">
          

          <div className="puntos-rugby">
            <ScoreCard2
              score={homeScore}
              updateScore={updateScore}
              points={[-2, -3,-5, 2, 3, 5]}
              player={'home'}
              color='success'
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
              points={[-2, -3, -5, 2, 3, 5]}
              player={'away'}
              color='success'
              ba={true}
            />
          </div>
        </div>

        <div className="timer-rugby">
          
          <Timer show color='success' periodo={period} control ascending start='justify-content-start d-flex'/>
        </div>
        </div>:null
}

       
      </div>
      <div className='navegacion'><Ajustes color={page==='1'?'#198754':'#8a8a8b'} onClick={pagina1}/><PelotaRugby fill={page==='2'?'#198754':'#8a8a8b'} onClick={pagina2}/></div>

    </div >
  );
}