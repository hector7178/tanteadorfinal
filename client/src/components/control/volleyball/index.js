import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTeam1,
    selectTeam2,
    setTeam1,
    setTeam2,
    setShowTimer,
    resetInfo,
    selectShowTimer
} from '../../../features/info/infoSlice';
import {
    updateVolleyBallScore,
    updateVolleyBallGames,
    updateSets,
    selectHomeScore,
    selectAwayScore,
    selectHomeGames,
    selectAwayGames,
    selectPastHomeGames,
    selectPastAwayGames,
    selectHomeSets,
    selectAwaySets,
    resetScores,
    selectIsTieBreak,
    resetGames,
    resetSets,
    resetAll,
    selectServer,
    updateTieBreakScore,
    selectHomeTieBreakScore,
    selectAwayTieBreakScore,
    resetTieBreak,
    setShowTieBreak,
    updatePastGames,
    updateScoreLimit,
    updateGameNumber,
    updateTieBreakLimit,
    selectsetTotalHome,
    selectsetTotalAway
} from '../../../features/scores/scoreSlice';
import BasicExample from '../navbar';
import useControl from '../useControl';
import Timer from '../../../features/timer/Timer';
import ScoreSet from '../../../features/scores/Scoreset'
import ScoreCard from '../../../features/scores/ScoreCard';
import PelotaVol  from './Svgvoley';
import Ajustes from '../football/footballsvg/ajustes'
import '../styles/ScoreBoard.scss';
import { resetTime } from '../../../features/timer/timerSlice';
import './voley.css';

export default function VolleyBallControl() {
    const dispatch = useDispatch();

    const scoreboardId = useControl('Volleyball', true);

     const setTotalHome = useSelector(selectsetTotalHome);
    const setTotalAway = useSelector(selectsetTotalAway);

    const homeScore = useSelector(selectHomeScore);
    const awayScore = useSelector(selectAwayScore);

    const isTieBreak = useSelector(selectIsTieBreak);

    const homeTieBreakScore = useSelector(selectHomeTieBreakScore);
    const awayTieBreakScore = useSelector(selectAwayTieBreakScore);

    const showTimer = useSelector(selectShowTimer);
    const server = useSelector(selectServer);

    const homeGames = useSelector(selectHomeGames);
    const awayGames = useSelector(selectAwayGames);

    const pastHomeGames = useSelector(selectPastHomeGames);
    const pastAwayGames = useSelector(selectPastAwayGames);

    const homeSets = useSelector(selectHomeSets);
    const awaySets = useSelector(selectAwaySets);

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
        dispatch(updateScoreLimit(25));
        dispatch(updateGameNumber(3));
        dispatch(updateTieBreakLimit(15));

        return () => {
            dispatch(resetInfo())
            dispatch(resetAll())
            dispatch(resetTime())
        }
    }, [])
    const [page, setpage]=useState('1')
    const pagina1= ()=> setpage('1');
    const pagina2= ()=> setpage('2');
    
    
    const [Set, aggset]=useState(['0']);
    
    const newSet = (sets)=> {
        
    const aggsets= [...Set,sets];

         aggset(aggsets)};

    const delSet = ()=>{
        aggset(oldsets=>{
            const newlist=[...oldsets]
            newlist.pop()
            return newlist
        })
    }   
    const [selset, hSelSet]=useState('');
   
    
console.log(selset)
    return (
        <div className="scoreboard-page-volleyball">
            <div className="scoreboard-volleyball">
                <div className='topvol bg-primary'>
                    <BasicExample color='primary' scoreboardId={scoreboardId}/>
                    <PelotaVol fill='#3c86f5' className='svg-top'/>
                    <h1 className='titulotop'>Volleyball</h1>
                    <button className='btn-volreset' onClick={ ()=>{
                    dispatch(resetInfo());
                    dispatch(resetAll());
                    dispatch(resetTime());}}>Reset </button>
                </div>
            {page==='1'? <div className="pagina-ajustes-te">
                    <div className="set">
                        
                        <table className="tennis-sets">
                            <thead className="botton-set rounded-pill">
                                <tr className='botton-set-list'>
                                    {Set.map((entry,index)=> ( 
                                    <th className='sets' key={index} scope="col">
                                        <button
                                            type="button"
                                            
                                            className={`buttonsets-vol rounded-pill ${Object.entries(pastHomeGames)[index][0]===selset?'bg-primary text-white':null}`}
                                            onClick={()=> hSelSet(Object.entries(pastHomeGames)[index][0])}
                                        >   <div className='tp-set'>
                                            <h1 className='t-set'>Set{index+1}</h1>
                                            <div className='f-p k'><h1 className='f-p'>{Object.entries(pastHomeGames)[index][1]}</h1>:<h1 className='f-p'>{Object.entries(pastAwayGames)[index][1]}</h1></div>
                                            </div>
                                        </button>
                                       
                                    </th>))}
                                </tr> 
                            </thead >
                            
                            <tbody className="jugadores-set">
                                <tr className="jugador-1">
                                    <th scope="row">{team1}</th>
                                    <th className='set-col'>{Set.map((entry,index) =>  <td className="sp-vol t" key={index}>{Object.entries(pastHomeGames)[index][1]}</td>)}<td className="sp-vol bt t">{homeGames}</td></th>
                                </tr>
                                <tr className="jugador-2">
                                    <th scope="row">{team2}</th>
                                    <th className='set-col'>{Set.map((entry,index) =>  <td className="sp-vol b" key={index}>{Object.entries(pastAwayGames)[index][1]}</td>)}<td className="sp-vol bt b">{awayGames}</td></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <form className="jugadores-t">
                    <div className="jugador1">
                        <div className="name">
                            <input
                                type="name"
                                className="nombres"
                                placeholder={team1}
                                value={team1}
                                id="team1"
                                aria-label="Team1"
                                onChange={inputChanged} />
                        </div>
                    </div>
                    <div className="jugador2">
                        <div className="name">
                            <input
                                type="text"
                                className="nombres"
                                placeholder={team2}
                                value={team2}
                                id="team2"
                                aria-label="Team2"
                                onChange={inputChanged} />
                        </div>
                    </div>
                </form>
                <div className='cantidad-sets-vol'>
                    
                    <div className='numero-de-set'>
                        <h1 className='titulo-set'>Cantidad de sets</h1>
                        <div className='set-control'>
                        <button className='del-aggset-vol' onClick={delSet}>-</button>
                        <span className='nset'>{Set.length} </span>
                        <button className='del-aggset-vol bg-primary  text-white'onClick={Set.length < 5?()=>{ newSet(`${Set.length}`)}:null}>+</button>
                        </div>
                    </div>
                    
                </div>
                <Timer color='primary' control ascending />
                </div>:page==='2'?

<div className="scoreboard-page2-tennis">
<div className="card-headerpages2-tennis">
<div className='setbotton rounded-pill'><tr className='botton-set-list'>
     {Set.map((entry,index)=> ( 
        <th className='sets' key={index} scope="col">
      <button type="button"  className={`buttonsets-vol rounded-pill ${Object.entries(pastHomeGames)[index][0]===selset?'bg-primary text-white':null}`} onClick={() =>hSelSet(Object.entries(pastHomeGames)[index][0])}>   <div className='tp-set'>
            <h1 className='t-set'>Set{index+1}</h1>
            <div className='f-p k'><h1 className='f-p'>{Object.entries(pastHomeGames)[index][1]}</h1>:<h1 className='f-p'>{Object.entries(pastAwayGames)[index][1]}</h1></div>
           </div>
        </button></th>))}
 </tr></div> 
<div className='nombres-segundap'><h1>{team1}</h1><h1>|</h1><h1>{team2}</h1></div>
</div>
                <div className="setactualizacion">
                            <ScoreCard
                                
                                score={homeGames}
                                updateScore={updateVolleyBallGames}
                                points={[-1, 1]}
                                player='home'
                                color='primary'
                                set={Set.length}
                                
                                />
                            <div className='botonreset'>
                                <h5 className="acore-tit">Games</h5>
                                <button
                                type="button"
                                className="button-reset rounded-pill"
                                onClick={() => window.confirm('seguro?')?dispatch(resetGames()):null}
                                >
                                    
                                Reset
                                </button>
                                </div>
                            <ScoreCard
                                
                                score={awayGames}
                                updateScore={updateVolleyBallGames}
                                points={[-1, 1]}
                                player='away'
                                color='primary'
                                set={Set.length}
                            />
                </div>
<div className="set-score">
    <ScoreCard
        score={homeScore}
        updateScore={updateVolleyBallScore}
        points={[-1,+1]}
        
        player='home'
        server={server === 'home'}
        set={Set.length}
        color='primary'
    />
    <div className='botonreset'>
        <h5 className="acore-tit">Puntos</h5>
    <button
        type="button"
        className="button-reset rounded-pill"
        onClick={() =>window.confirm('seguro?')? dispatch(resetScores()):null}
    >
        Reset
    </button>
    </div>
    <ScoreCard
        score={awayScore}
        updateScore={updateVolleyBallScore}
        points={[-1,+1]}
        player='away'
        server={server === 'away'}
        set={Set.length}
        color='primary'
    />
</div>
</div>:null}
<div className='navegacion'><Ajustes color={page==='1'?'#0d6efd':'#8a8a8b'} onClick={pagina1}/><PelotaVol fill={page==='2'?'#0d6efd':'#8a8a8b'} onClick={pagina2}/></div>


            </div>
        </div>
    );
}