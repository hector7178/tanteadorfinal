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
import HockeySvg  from './hockeysvg';
import Ajustes from '../football/footballsvg/ajustes';
import InfoCard2 from '../../../features/info/InfoCardf';
import Silbato from '../basketballs/silbatosvg';
import {setTimerActive} from '../../../features/timer/timerSlice';
import { resetTime, updateInitialTime } from '../../../features/timer/timerSlice';
import '../handball/handball.css';
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
      <div className='topvol bg-verde'>
                    <BasicExample color='verde' titulo='Hockey' SvgTop={<HockeySvg fill='#69c16f'  className='svg svg-nav position-absolute'/>} scoreboardId={scoreboardId}/>
                    <HockeySvg  fill='#69cf71' className='svg-top'/>
                    <h1 className='titulotop'>Hockey</h1>
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
            color='verde'
            h={true}
            >
          
            <ExtraTime extraTime={[30,20,5]} color='verde' titulo='Duracion'/>
            </InfoCard>
          
          <Timer
            control
            color='verde'
            start='justify-content-start d-flex'
          />
        </div>:page==='2'?
        
        <div className="handball-fouls">
          <TimerSinBotones show periodo={period} color='verde' start='justify-content-start d-flex'/>
          <div className="handball-puntos">
            <ScoreCard
              score={homeScore}
              updateScore={updateScore}
              points={[-1, 1]}
              player={'home'}
              color='verde'
              crono='goles-con'
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
              color='verde'
              crono='goles-con'
              
            />
          </div>
          
        </div>:page==='3'?
          <div className="handball-fouls">
            <TimerSinBotones show periodo={period} color='verde' start='justify-content-start d-flex'/>
         
            
          <div className="penales">
                <InfoCard2 p2
                color='verde'
                  
                  info={homeFouls}
                  incrementInfo={incrementHomeFouls}
                  decrementInfo={decrementHomeFouls}
                />
                <div className="penales-panel">
                <h5 className="text-sub">Fouls</h5>
                
                
                <button
                  type="button"
                  className="botton-reset-p"
                  onClick={()=> window.confirm('seguro?')?() => dispatch(resetFouls()):null}
                >
                  Reset
                </button>
                </div>
                <InfoCard2 
                  p2
                  color='verde'
                 
                  info={awayFouls}
                  incrementInfo={incrementAwayFouls}
                  decrementInfo={decrementAwayFouls}
                />
              </div>
          
            </div>
          :null
        
        

}         </div>

        
      </div>

      <div className='navegacion'><Ajustes color={page==='1'?'#39af42':'#8a8a8b'} onClick={pagina1}>Ajustes</Ajustes><HockeySvg  fill={page==='2'?'#39af42':'#8a8a8b'} onClick={pagina2}>Puntos</HockeySvg><Silbato fill={page==='3'?'#39af42':'#8a8a8b'} onClick={pagina3}>Fouls</Silbato></div>

    </div >
  );
}