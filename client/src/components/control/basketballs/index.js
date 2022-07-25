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
    }
  }, [])
  const [pages, setPages]= useState('1' )
  const handlepage = () => setPages('1');
  const handlegoles= () => setPages('2');
  const handlepenales= () => setPages('3');

  return (
    <div className="scoreboard-basket">
      <div className='top-pagina'>
        <Dribbble color='#ffd761' className='balon'/>
        <h1 className='basket-text' >Basketball</h1>
       <BasicExample  color='warning' scoreboardId={scoreboardId}/>
      </div>
      <div className="contenido-basket">
        {pages==='1'?<form className="equipos-basket">
          <div className="equipo-a">
            <div className="card-header-bask">
              <div className='logo-equipos'></div>
              <input
                type="text"
                className="input-equipo"
                placeholder={team1}
                value={team1}
                id="team1"
                aria-label="Team1"
                onChange={inputChanged} />
            </div>
          </div>
          <div className="equipo-b">
            <div className="card-header-bask">
              <div className="logo-equipos"></div>
              <input
                type="text"
                className="input-equipo"
                placeholder={team2}
                value={team2}
                id="team2"
                aria-label="Team2"
                onChange={inputChanged} />
            </div>
          </div>
        </form>:<div className='equipos-basket2 text-center'><div ClassNAme='equipo-a'><div className="logo-equipos"></div>{team1}</div><div className="equipo-b"><div className="logo-equipos"></div>{team2}</div></div>}

       { pages==='1'?
        <div className="pagina-ajustes">
          <InfoCard  color='warning'
            title="Tiempo"
            info={period}
            incrementInfo={incrementPeriod}
            decrementInfo={decrementPeriod}>
                   
          </InfoCard>
          <Timer
          color='warning'
          start='justify-content-start'
            control
            extraTime={[12, 10, 5]}
          />
        </div>: pages==='2'?
        <div className="pagina-puntos">
        <div className="pag_2">
        <Timer2
        p2
        color='warning'
        control>
          <InfoCard   
            p2 
            color='warning'
            info={period}
            incrementInfo={incrementPeriod}
            decrementInfo={decrementPeriod}>
                   
          </InfoCard>

        </Timer2>

        </div>

        <div className="puntos-bask">
          <ScoreCard2
            color='warning'
            score={homeScore}
            updateScore={updateScore}
            points={[+1, +2,+3,-1,-2,-3]}
            player={'home'}
          />
           <div className='reset'><h5 className="col-sm-12 col-md-12 text-center">Puntos</h5>
          <button
            type="button"
            className="btn-sm col-xs-2 col-md-1 rounded-pill btn btn-danger"
            onClick={() => dispatch(resetScores())}
          >
            Reset
          </button></div>
          <ScoreCard2
            color='warning'
            score={awayScore}
            updateScore={updateScore}
            points={[+1, +2,+3,-1,-2,-3]}
            player={'away'}
          />
        </div>
      </div>
        :pages==='3'?
        <div className="pagina-foul">
          <Timer start='justify-content-start' color='warning'/>          
          <div className="fouls">
            <InfoCard
            color='warning'
              title="Local"
              info={homeFouls}
              incrementInfo={incrementHomeFouls}
              decrementInfo={decrementHomeFouls}
            /><div className="reset">
            <h5 className="col-sm-12 col-md-12 text-center">Fouls</h5>
            <button
              type="button"
              className="btn-sm col-xs-2 rounded-pill col-md-1 btn btn-danger"
              onClick={() => dispatch(resetFouls())}
            >
              Reset
            </button>
          </div>
            <InfoCard
            color='warning'
              title="Visitante"
              info={awayFouls}
              incrementInfo={incrementAwayFouls}
              decrementInfo={decrementAwayFouls}
            />
          </div>
        </div>
        :
        <div className="pagina-ajustes">
          <InfoCard
            title="Periodo"
            info={period}
            incrementInfo={incrementPeriod}
            decrementInfo={decrementPeriod}
          />
          <Timer
            control
            extraTime={[12, 10, 5]}
          />
        </div> }


        

       
         </div>
         <div className='navegacion' ><Ajustes color={pages==='1'?'#ffc107':'#8a8a8b'} onClick={handlepage}/><Dribbble height={'100%'} width={'100%'} fill={pages==='2'?'#ffc107':'#8a8a8b'} onClick={handlegoles}/><Silbato color={pages==='3'?'#ffc107':'#8a8a8b'} onClick={handlepenales}/></div>
       
      </div>
   
  );
}