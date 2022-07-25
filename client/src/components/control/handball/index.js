import { useEffect,useState } from 'react';
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
import useControl from '../useControl';
import ScoreCard from '../../../features/scores/ScoreCard';
import InfoCard from '../../../features/info/InfoCard';
import Timer from '../../../features/timer/Timer';
import TimerSinBotones from '../../../features/timer/timersinbotones';
import ExtraTime from '../../../features/timer/ExtraTime';
import '../styles/ScoreBoard.scss';
import BasicExample from '../navbar';
import Balon from '../football/footballsvg/balon';
import Ajustes from '../football/footballsvg/ajustes';
import Silbato from '../basketballs/silbatosvg';
import { resetTime, updateInitialTime } from '../../../features/timer/timerSlice';
import './handball.css';
export default function HandballControl() {
  const dispatch = useDispatch();

  const scoreboardId = useControl('Handball', true);
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
    dispatch(updateInitialTime(30));
    return () => {
      dispatch(resetInfo())
      dispatch(resetAll())
      dispatch(resetTime())
    }
  }, [])
  const [page, setpage]=useState('1')
  const pagina1= ()=> setpage('1');
  const pagina2= ()=> setpage('2');
  const pagina3= ()=> setpage('3');
  
  return (
    <div className="scoreboard-handball">
      <div className='topvol bg-primary'>
                    <BasicExample color='primary' scoreboardId={scoreboardId}/>
                    <Balon fill='#4283e3' className='svg-top'/>
                    <h1 className='titulotop'>Handball</h1>
                    <button className='btn-volreset' onClick={ ()=> window.confirm('seguro?')?()=>{
                    dispatch(resetInfo());
                    dispatch(resetAll());
                    dispatch(resetTime());}:null}>Reset </button>
                </div>
      <div className="formhandball">

      <form className="scoreboardform-rugby">
          <div className="equiposrug">
            <div className='logo-equipo'>
            </div>
            <div className="card-body-rug">
              {page==='1'?<input
                type="text"
                className="equipo"
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
                className="equipo"
                placeholder={team2}
                value={team2}
                id="team2"
                aria-label="Team2"
                onChange={inputChanged} />:team2}
            </div>
          </div>
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
            color='primary'
            h={true}
            >
          
            <ExtraTime extraTime={[30,20,5]} color='primary' titulo='Duracion'/>
            </InfoCard>
          
          <Timer
            control
            color='primary'
            start='justify-content-start d-flex'
          />
        </div>:page==='2'?
        
        <div className="handballPuntos">
          <TimerSinBotones show periodo={period} color='primary' start='justify-content-start d-flex'/>
          <div className="handball-puntos">
            <ScoreCard
              score={homeScore}
              updateScore={updateScore}
              points={[-1, 1]}
              player={'home'}
              color='primary'
            />
          <div className="handballbo">
            <h5 className="handballfoul-titulo">Puntos</h5>
            <button
              type="button"
              className="btn-sm col-xs-2 col-md-1 btn btn-danger"
              onClick={() => dispatch(resetScores())}
            >
              Reset
            </button>

          </div>
            <ScoreCard
              score={awayScore}
              updateScore={updateScore}
              points={[-1, 1]}
              player={'away'}
              color='primary'
              
            />
          </div>
          
        </div>:page==='3'?
          <div className="handball-fouls">
            <TimerSinBotones show periodo={period} color='primary' start='justify-content-start d-flex'/>
         
            
            <div className="handballfoul">
              <InfoCard
              title="Local"
              info={homeFouls}
              incrementInfo={incrementHomeFouls}
              decrementInfo={decrementHomeFouls}
              color='primary'
              p2
            /><div className='handballbo2'>
            <h5 className="handballfoul-titulo">Fouls</h5>
            <button
              type="button"
              className="btn-sm col-xs-2 col-md-1 btn btn-danger"
              onClick={() => dispatch(resetFouls())}
            >
              Reset
            </button>
            </div>
            <InfoCard
              p2
              title="Visitante"
              info={awayFouls}
              incrementInfo={incrementAwayFouls}
              decrementInfo={decrementAwayFouls}
              color='primary'
            />
          </div>
          
            </div>
          :null
        
        

}         </div>

        
      </div>

      <div className='navegacion'><Ajustes color={page==='1'?'#0d6efd':'#8a8a8b'} onClick={pagina1}/><Balon fill={page==='2'?'#0d6efd':'#8a8a8b'} onClick={pagina2}/><Silbato fill={page==='3'?'#0d6efd':'#8a8a8b'} onClick={pagina3}/></div>

    </div >
  );
}