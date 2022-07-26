import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectTeam1,
    selectTeam2,
    setTeam1,
    setTeam2,
    resetInfo,
    selectPeriod
} from '../../../features/info/infoSlice';
import {
    updateTennisScore,
    updateGames,
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
    selectAdvantage,
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
    updateScoreMenos,
    updateSetTotal,
    selectsetTotalHome,
    selectsetTotalAway,
    selectSets,
    selectSet,
    updatetime,
    timeGame,
    selecttime,
    selectPasttime,
    setSaque,
    selectSaque

    
} from '../../../features/scores/scoreSlice';
import useControl from '../useControl';
import {setTimerActive} from '../../../features/timer/timerSlice';
import ScoreCard2 from '../../../app/features2/scores/ScoreCard';
import './tennis.css';
import { resetTime,selectTimerActive, } from '../../../features/timer/timerSlice';
import Timer from '../../../features/timer/Timer';
import ScoreCard from '../../../features/scores/ScoreCard';
import ScoreSet from '../../../features/scores/Scoreset';
import Tennis from './svgtennis';
import BasicExample from '../navbar';
import Silbato from '../basketballs/silbatosvg';
import Svg3page from './3PagesSvg'
import  Ajustes from '../football/footballsvg/ajustes';
import { useInterval } from '../useInterval';

 export default function TennisControl() {
    const dispatch = useDispatch();

    const scoreboardId = useControl('Tennis', true);
    const period = useSelector( selectPeriod);
    const homeScore = useSelector(selectHomeScore);
    const awayScore = useSelector(selectAwayScore);
    const timerActive = useSelector(selectTimerActive);
    const time = useSelector(selecttime);
    const setTotalHome = useSelector(selectsetTotalHome);
    const setTotalAway = useSelector(selectsetTotalAway);

    const homeTieBreakScore = useSelector(selectHomeTieBreakScore);
    const awayTieBreakScore = useSelector(selectAwayTieBreakScore);

    const advantage = useSelector(selectAdvantage);

    const isTieBreak = useSelector(selectIsTieBreak);

    const server = useSelector(selectServer);

    const homeGames = useSelector(selectHomeGames);
    const awayGames = useSelector(selectAwayGames);

    const pastHomeGames = useSelector(selectPastHomeGames);
    const pastAwayGames = useSelector(selectPastAwayGames);

    const homeSets = useSelector(selectHomeSets);
    const awaySets = useSelector(selectAwaySets);

    const team1 = useSelector(selectTeam1);
    const team2 = useSelector(selectTeam2);
    const set =useSelector(selectSet);
    const pastTime =useSelector(selectPasttime);
    const saque =useSelector(selectSaque);

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
        dispatch(updateScoreLimit(40));
        dispatch(updateGameNumber(6));
        dispatch(updateTieBreakLimit(7));
        return () => {
            dispatch(resetInfo())
            dispatch(resetAll())
            dispatch(resetTime())
        }
    }, [])

//modal
const [modalShow, setModalShow] = useState(false);


//configuracion n set
    

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
    let p=Set.length;  
    const z=Object.entries(pastAwayGames)[p-1][0]


    const [page, setpage]=useState('1')
    const pagina1= ()=> setpage('1');
    const pagina2= ()=> setpage('2');
    const pagina3= ()=> setpage('3');
    const pagina4= ()=> setpage('4');
   const [selset, hSelSet]=useState('');
   
    const select = (e) => hSelSet(e);
    
 
   console.log(time)
   
  useInterval(() => {
    if (timerActive) {
      dispatch(updatetime(1));
    } 
  },60000);
const btnresetall= () =>{
    
    if( window.confirm('seguro?')){
    dispatch(resetInfo());
    dispatch(resetAll());
    dispatch(resetTime());
    dispatch(setTimerActive(false));
}}
  

    return (
        <div className="scoreboard-tennis">
            <div className='top-tennis'>
            <Tennis fill='#ff9f59' className='svg-tennis'/> 
            <BasicExample color='naranja' titulo='Tenis' SvgTop={<Tennis fill='#ff9f59'  className='svg svg-nav position-absolute'/>}  scoreboardId={scoreboardId}/>
                   
            <h1 className='titulos-tennis'>Tenis</h1>
            <button className='btn-volreset' onClick={
                  btnresetall }>Reset </button>
            </div>
            <div className="tennis">
            
                       
               {page==='1'?
                <div className="pagina-ajustes-te">
                    <div className="set">
                        
                        <table className="tennis-sets">
                            <thead className="botton-set rounded-pill">
                                <tr className='botton-set-list rounded-pill'>
                                        {Set.map((entry,index)=> ( 
                                        <th className={`sets `} key={index} scope="col">
                                            
                                        <button
                                            type="button"
                                            key={index} 
                                            className={`buttonsets rounded-pill  ${set===index?'bg-naranja text-white':'pobre'}`}
                                            onClick={()=> {
                                                select(Object.entries(pastHomeGames)[index][0]);
                                                dispatch(selectSets(`${index }`));
                                                }}>   <div className={``}>
                                            <h1 className='t-set'>Set{index+1}</h1>

                                        <div className='f-p k'><h1 className='f-p'>{Object.entries(pastHomeGames)[index][1]}</h1><h1 className='f-p'>|</h1><h1 className='f-p'>{Object.entries(pastAwayGames)[index][1]}</h1></div>
                                        </div>
                                        </button>
                                                        
                                    </th>))}
                                </tr> 
                            </thead >
                            
                            
                            <div className="jugadores-set">
                               <div className="jugadores-set-name">
                               <div className='name-set'>{page==='1'?
                                    <div className="name">
                                        <input
                                            type="name"
                                            className="nombres form-control"
                                            placeholder={team1}
                                            value={team1}
                                            id="team1"
                                            aria-label="Team1"
                                            onChange={inputChanged} />
                                           
                                            </div> :
                                            <h3 className='jugador-2'>{team1}</h3>
                                  }
                                   
                                
                                   {page==='1'? 
                                   <div className="name">
                                        <input
                                            type="text"
                                            className="nombres form-control"
                                            placeholder={team2}
                                            value={team2}
                                            id="team2"
                                            aria-label="Team2"
                                            onChange={inputChanged} />
                                    </div>
                                    :
                                    <h3 className='jugador-2'>{team2}</h3>}

                                    </div>

                                    <div className='SetEquipos'>
                                    <div className='set-col'>{Set.map((entry,index) => 
                                    
                                     <div className='games-sets position-relative'>
                                        <div className='position-absolute timegame'>{Object.entries(pastTime)[index][1]}</div>
                                        <div className={`sp ${index===0?' t':null} ${set===index?'bg-naranja text-white':'bg-white'}`} key={index}>{Object.entries(pastHomeGames)[index][1]}</div>
                                        <div className={`sp ${index===0?' b':null} ${set===index?'bg-naranja text-white':'bg-white'}`} key={index}>{Object.entries(pastAwayGames)[index][1]}</div>
                                     </div>)} 
                                     <div className='games-sets'>
                                        <div className="sp bt tf">{setTotalHome}</div>
                                        <div className="sp bt bf">{setTotalAway}</div>
                                    </div>
                                    </div>
                                   
                                    
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </table>
                    </div>
                    
                <div className='cantidad-sets'>
                    
                    <div className='numero-de-set'>
                        <h1 className='titulo-set'>Cantidad de sets</h1>
                        <div className='set-control'>
                        <button className='del-aggset rounded-pill' onClick={delSet}>-</button>
                        <span className='nset'>{Set.length} </span>
                        <button className='del-aggset bg-orange rounded-pill text-white'onClick={Set.length < 5?()=>{ newSet(`${Set.length}`)}:null}>+</button>
                        </div>
                    </div>
                    <div className='single-par ' >
                        <h1 className='titulo-set'>partido</h1>
                        <div className='partido-select'>
                            <button className='partido rounded-pill'>Single</button>
                            <button className='partido bg-orange rounded-pill text-white'>Dobles</button>
                        </div>
                    </div>
                </div>
                <Timer color='orange' start='d-flex justify-content-start' control ascending />
                </div>
            :page==='2'?

                <div className="scoreboard-page2-tennis">
<div className="card-headerpages2-tennis">


                            <thead className="botton-set rounded-pill">
                                <tr className='botton-set-list rounded-pill'>
                                {Set.map((entry,index)=> ( 
                                        <th className={`sets `} key={index} scope="col">
                                            {console.log(index)}
                                        <button
                                            type="button"
                                            key={index} 
                                            className={`buttonsets rounded-pill  ${set==index?'bg-naranja text-white':'pobre'}`}
                                            onClick={()=> {
                                                select(Object.entries(pastHomeGames)[index][0]);
                                                dispatch(selectSets(`${index }`));
                                                }}>   <div className={``}>
                                            <h1 className='t-set'>Set{index+1}</h1>

                                        <div className='f-p k'><h1 className='f-p'>{Object.entries(pastHomeGames)[index][1]}</h1><h1 className='f-p'>|</h1><h1 className='f-p'>{Object.entries(pastAwayGames)[index][1]}</h1></div>
                                        </div>
                                        </button>
                                                        
                                    </th>))}
                                </tr> 
                            </thead >
                            
                            <div className='nombres-segundap'>
                                <h1 onClick={()=>dispatch(setSaque([1]))} className='name-player position-relative'>
                                {saque===1?<Tennis  fill='#ff9f59' className='svgSaque position-absolute d-flex justify-self-center'/>:null}
                                {team1}</h1>
                                <h1 className='name-player' >|</h1>
                                <h1 onClick={()=>dispatch(setSaque([2]))} className='name-player position-relative'>
                                {saque===2?<Tennis fill='#ff9f59' className='position-absolute svgSaque d-flex justify-self-center'/>:null}
                                {team2}</h1>
                                </div>
                                </div>
                <div className="setactualizacion">
                            <ScoreCard
                                
                                score={homeGames}
                                updateScore={updateGames}
                                points={[-1, 1]}
                                player='home'
                                color='orange'
                                set={Set.length}
                                actualizar={updateScoreMenos}
                                crono='goles-con'
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
                                updateScore={updateGames}
                                points={[-1, 1]}
                                player='away'
                                color='orange'
                                set={Set.length}
                                crono='goles-con'
                            />
                </div>
<div className="set-score">
    <ScoreSet
        score={homeScore}
        updateDelScore={updateScoreMenos}
        updateScore={updateTennisScore}
        points={[0, 15, 30, 40, 'AD']}
        advantage={advantage}
        player='home'
        server={server === 'home'}
        tennis
        actualizar={updateScoreMenos}
        set={Set.length}
        color='orange'
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
    <ScoreSet
        score={awayScore}
        updateDelScore={updateScoreMenos}
        updateScore={updateTennisScore}
        points={[0, 15, 30, 40, 'AD']}
        advantage={advantage}
        player='away'
        server={server === 'away'}
        tennis
        actualizar={updateScoreMenos}
        set={Set.length}
        color='orange'
    />
</div>
                </div>
                    
            :page==='3'?
                

                <div className="scoreboard-3pag-tenis">
                    <div className="card-headerpages3-tennis">
                            <thead className="botton-set rounded-pill">
                                <tr className='botton-set-list rounded-pill'>
                                {Set.map((entry,index)=> ( 
                                        <th className={`sets `} key={index} scope="col">
                                            {console.log(index)}
                                        <button
                                            type="button"
                                            key={index} 
                                            className={`buttonsets rounded-pill  ${set==index?'bg-naranja text-white':'pobre'}`}
                                            onClick={()=> {
                                                select(Object.entries(pastHomeGames)[index][0]);
                                                dispatch(selectSets(`${index }`));
                                                }}>   <div className={``}>
                                            <h1 className='t-set'>Set{index+1}</h1>

                                        <div className='f-p k'><h1 className='f-p'>{Object.entries(pastHomeGames)[index][1]}</h1><h1 className='f-p'>|</h1><h1 className='f-p'>{Object.entries(pastAwayGames)[index][1]}</h1></div>
                                        </div>
                                        </button>
                                                        
                                    </th>))}
                                </tr> 
                            </thead >
                            <div className="jugadores-set">
                            <div className="jugadores-set-name">
                               <div className='name-set'>{page==='1'?
                                    <div className="name">
                                        <input
                                            type="name"
                                            className="nombres form-control"
                                            placeholder={team1}
                                            value={team1}
                                            id="team1"
                                            aria-label="Team1"
                                            onChange={inputChanged} />
                                           
                                            </div> :
                                            <h3 className='jugador-2'>{team1}</h3>
                                  }
                                   
                                
                                   {page==='1'? 
                                   <div className="name">
                                        <input
                                            type="text"
                                            className="nombres form-control"
                                            placeholder={team2}
                                            value={team2}
                                            id="team2"
                                            aria-label="Team2"
                                            onChange={inputChanged} />
                                    </div>
                                    :
                                    <h3 className='jugador-2'>{team2}</h3>}

                                    </div>
                                    <div className='SetEquipos'>
                                    <div className='set-col'>{Set.map((entry,index) => 
                                     <div className='games-sets'>
                                        <div className={`sp ${index===0?' t':null} bg-white`} key={index}>{Object.entries(pastHomeGames)[index][1]}</div>
                                        <div className={`sp ${index===0?' b':null} bg-white`} key={index}>{Object.entries(pastAwayGames)[index][1]}</div>
                                     </div>)} 
                                     <div className='games-sets'>
                                        <div className="sp bt tf">{setTotalHome}</div>
                                        <div className="sp bt bf">{setTotalAway}</div>
                                    </div>
                                    </div>
                                   
                                    
                                    </div>
                            </div>   
                        </div> 
                        <div className='nombres-segundap'>
                                <h1 onClick={()=>dispatch(setSaque([1]))} className='name-player position-relative'>
                                {saque===1?<Tennis  fill='#ff9f59' className='svgSaque position-absolute d-flex justify-self-center'/>:null}
                                {team1}</h1>
                                <h1 className='name-player' >|</h1>
                                <h1 onClick={()=>dispatch(setSaque([2]))} className='name-player position-relative'>
                                {saque===2?<Tennis fill='#ff9f59' className='position-absolute svgSaque d-flex justify-self-center'/>:null}
                                {team2}</h1>
                                </div>
                    </div>

                    
                        <div className="set-score-3">
                            <div className='botonreset'>
                            <h5 className="score-tit">Sets Total</h5>
                            
                            <button
                                type="button"
                                className="button-reset rounded-pill"
                                onClick={() => window.confirm('seguro?')?dispatch(resetSets()):null}
                            >
                                Reset
                            </button></div>
                            <div className='tennis-sets-3'>
                            <ScoreCard
                                score={setTotalHome}
                                updateScore={updateSetTotal}
                                advantage={advantage}
                                player='home'
                                server={server === 'home'}
                                tennis
                                points={[-1,+1]}
                                set={Set.length}
                                color='orange'
                                crono='goles-con'
                            />
                           
                            <ScoreCard
                                score={setTotalAway}
                                updateScore={updateSetTotal}
                                advantage={advantage}
                                points={[-1,+1]}
                                player='away'
                                server={server === 'away'}
                                tennis
                                set={Set.length}
                                color='orange'
                                crono='goles-con'
                            /></div>

                        </div>
                      
                    
                    
                </div>
                
            :page==='4'?
                

                <div className="tiebreak">

                    
                    <table className="tennis-sets-4">
                            <thead className="botton-set rounded-pill">
                                <tr className='botton-set-list rounded-pill'>
                                {Set.map((entry,index)=> ( 
                                        <th className={`sets `} key={index} scope="col">
                                            {console.log(index)}
                                        <button
                                            type="button"
                                            key={index} 
                                            className={`buttonsets rounded-pill  ${set==index?'bg-naranja text-white':'pobre'}`}
                                            onClick={()=> {
                                                select(Object.entries(pastHomeGames)[index][0]);
                                                dispatch(selectSets(`${index }`));
                                                }}>   <div className={``}>
                                            <h1 className='t-set'>Set{index+1}</h1>

                                        <div className='f-p k'><h1 className='f-p'>{Object.entries(pastHomeGames)[index][1]}</h1><h1 className='f-p'>|</h1><h1 className='f-p'>{Object.entries(pastAwayGames)[index][1]}</h1></div>
                                        </div>
                                        </button>
                                                        
                                    </th>))}
                                </tr> 
                            </thead >
                            <div className='nombres-segundap'>
                                <h1 onClick={()=>dispatch(setSaque([1]))} className='name-player position-relative'>
                                {saque===1?<Tennis  fill='#ff9f59' className='svgSaque position-absolute d-flex justify-self-center'/>:null}
                                {team1}</h1>
                                <h1 className='name-player' >|</h1>
                                <h1 onClick={()=>dispatch(setSaque([2]))} className='name-player position-relative'>
                                {saque===2?<Tennis fill='#ff9f59' className='position-absolute svgSaque d-flex justify-self-center'/>:null}
                                {team2}</h1>
                                </div>

                            
                        </table>
                                        <div className='cantidadSet'>
                                        <h1 className='titulo-set'>Cantidad de sets</h1>
                                            <div className='cantidadDeSet'>
                                                <div className='numero-de-set'>
                                                
                                                <div className='set-control'>
                                                <button className='del-aggset rounded-pill' onClick={()=>dispatch(updateSetTotal([-1,'home']))}>-</button>
                                                <span className='nset'>{setTotalHome} </span>
                                                <button className='del-aggset bg-orange rounded-pill text-white'onClick={()=>dispatch(updateSetTotal([1,'home']))}>+</button>
                                                </div>
                                            </div>
                                            
                                            <div className='numero-de-set'>
                                                
                                                <div className='set-control'>
                                                <button className='del-aggset  rounded-pill' onClick={()=>dispatch(updateSetTotal([-1,'away']))}>-</button>
                                                <span className='nset'>{setTotalAway} </span>
                                                <button className='del-aggset bg-orange rounded-pill text-white'onClick={()=>dispatch(updateSetTotal([1,'away']))}>+</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                    
                
                <div className="setactualizacion">
                    <ScoreCard
                        
                        score={homeTieBreakScore}
                        updateScore={updateTieBreakScore}
                        points={[-1, 1]}
                        player={'home'}
                        color='orange'
                        crono='goles-con'
                    />
                    <div className="botonreset">
                    <h5 className="acore-tit">TieBreak</h5>
                    <button
                        type="button"
                        className="button-reset rounded-pill"
                        onClick={() => window.confirm('seguro?')?dispatch(resetTieBreak()):null}
                    >
                        Reset
                    </button>

                    </div>
                    <ScoreCard
                        
                        score={awayTieBreakScore}
                        updateScore={updateTieBreakScore}
                        points={[-1, 1]}
                        player={'away'}
                        color='orange'
                        crono='goles-con'
                    />
                </div>
                <button onClick={() => {dispatch(setShowTieBreak());}} 
                className='showtimebreak rounded-pill text-naranja border-naranja'>Mostrar TieBreak</button>
                </div>:'' }
                
                
            </div>
            <div className='navegacion-bas'><Ajustes color={page==='1'?'#ffa500':'#8a8a8b'} onClick={pagina1}>Ajustes</Ajustes><Tennis height={'100%'} width={'100%'} fill={page==='2'?'#ffa500':'#8a8a8b'} onClick={pagina2}>Game</Tennis><Svg3page fill={page==='3'?'#ffa500':'#8a8a8b'} onClick={pagina3}>Sets </Svg3page><Silbato color={page==='4'?'#ffa500':'#8a8a8b'} onClick={pagina4}>Tiebreak</Silbato></div>
        </div>
    );
}