import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        scoreLimit: 40,
        homeScore: 0,
        awayScore: 0,
        homeTieBreakScore: 0,
        awayTieBreakScore: 0,
        homeGames: 0,
        pastHomeGames: { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 },
        awayGames: 0,
        pastAwayGames: { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 },
        homeSets: 0,
        awaySets: 0,
        advantage: '',
        server: 'home',
        deuce: false,
        isTieBreak: false,
        tieBreakLimit: 7,
        showTieBreak: false,
        gameNumber: 6,
        setTotalHome:0,
        setTotalAway:0,
        volleyballHome:0,
        volleyballAway:0,
        selectSet:'',
        pastTime: { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 },
        time:0,
        saque:1,
       
    },
    reducers: {
        setShowTieBreak: state => {
            state.showTieBreak = !state.showTieBreak;
       
        },
        updatetime: (state, action) => {
            let next = state.time + action.payload;
            

            state.time = next;
        },
        timeGame: (state, action,sc) => {
            
            
            let updatedTime = {[`set${sc}`]: state.time  };
            state.pastTime = { ...state.pastTime, ...updatedTime};
        },
        setSaque: (state, action) => {
            const [saques]=action.payload;
            
            state.saque=+saques;
        },
        updateScoreLimit: (state, action) => {
            state.scoreLimit = action.payload;
        },
        
        updateTieBreakLimit: (state, action) => {
            state.tieBreakLimit = action.payload;
            
        },
        updateServer: state => {
            state.server =
                state.server === 'home' ?
                    'away' : 'home';
        }, updateSetTotal: (state, action) => {
            const [points, player] = action.payload;
            var next;

            switch (player) {
                case 'home':
                    next = state.setTotalHome + points;
                    if (next >= 0) {
                        state.setTotalHome += points;
                    }
                    break;
                case 'away':
                    next = state.setTotalAway+ points;
                    if (next >= 0) {
                        state.setTotalAway += points;
                    }
                    break;
                default:
                    break;
            }
        },
        updateGameNumber: (state, action) => {
            state.gameNumber = action.payload;
        },
        selectSets: (state, action) => {
            const [sets] = action.payload;
            
           state.selectSet= Number(sets);

           if(window.confirm('deseas editar los valores del set?')){
           state.homeGames = 0;
            state.awayGames = 0;
           }

           
        },
        updateScore: (state, action) => {
            const [points, player] = action.payload;
            var next;

            switch (player) {
                case 'home':
                    next = state.homeScore + points;
                    if (next >= 0) {
                        state.homeScore += points;
                    }
                    break;
                case 'away':
                    next = state.awayScore + points;
                    if (next >= 0) {
                        state.awayScore += points;
                    }
                    break;
                default:
                    break;
            }
        },
        updateScoreMenos: (state, action) => {
            const [ player, setIndex] = action.payload;
            
           
            const next=state.homeScore;
            const next2 = state.awayScore;
           
            
            switch (player) {
                case 'home':
                    
                   if(next>4 ){
                    if(next>(next2+2)|next2>(next+2)){
                    let updatedHome = { [`set${setIndex}`]: state.homeGames };
                    let updatedAway = { [`set${setIndex}`]: state.awayGames };

                    state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
                    state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };
                    }

                   
                }
                    break;
                case 'away':
                   
                    if (next > 4) {
                        if(next>(next2+2)|next2>(next+2)){
                            let updatedHome = { [`set${setIndex}`]: state.homeGames };
                            let updatedAway = { [`set${setIndex}`]: state.awayGames };
        
                            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
                            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };
                            }
                    }
                    break;
                default:
                    break;
            }
        },
        updateTieBreakScore: (state, action) => {
            const [points, player] = action.payload;
             
            if(state.homeTieBreakScore >= 0 && state.awayTieBreakScore >= 0){
                giveTieBreakScore(state, points, player);
            }
            if (state.homeTieBreakScore===-1||state.awayTieBreakScore===-1){
                state.homeTieBreakScore=0
                state.awayTieBreakScore=0
            }
           
        },
        updateTennisScore: (state, action) => {
            const [points, player,setIndex] = action.payload;
            const s= state.selectSet===''?`set${setIndex}`:`set${state.selectSet+1}`;
            const sc=state.selectSet===''?setIndex:state.selectSet+1;
            
            calculateScore(state, points, player,sc);
            
           
            
            let updatedHome = {[s]: state.homeGames };
            let updatedAway = { [s]: state.awayGames };

            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };
            let next = player === 'home' ?
    state.pastHomeGames
    :
    state.pastAwayGames

    let otherScore = player === 'home' ?
    state.pastAwayGames
    :
    state.pastHomeGames;
    
    
    if (next.set1>=5&&
        next.set1 >= otherScore.set1 + 2&&s==='set1') {
        state.homeGames = 0;
        state.awayGames = 0;
        
        let updatedTime = {'set1': state.time  };
        state.pastTime = { ...state.pastTime, ...updatedTime};
        state.time =0;
        state.selectSet=1;

    if(next===state.pastHomeGames){ 
    state.setTotalHome += 1
     }else{ 
    state.setTotalAway+= 1;
    }
    } 
    
    if (next.set2>=5&&
        next.set2 >= otherScore.set2 + 2&&s==='set2') {
        state.homeGames = 0;
        state.awayGames = 0;
        let updatedTime = {'set2': state.time  };
        state.pastTime = { ...state.pastTime, ...updatedTime};
        state.time =0;
        state.selectSet=2;

    if(next===state.pastHomeGames){ 
    state.setTotalHome += 1
     }else{ 
    state.setTotalAway+= 1;
    }
    } 
    
    if (next.set3>=5&&
        next.set3 >= otherScore.set3 + 2&&s==='set3') {
        state.homeGames = 0;
        state.awayGames = 0;
        let updatedTime = {'set3': state.time  };
        state.pastTime = { ...state.pastTime, ...updatedTime};
        state.time =0;
        state.selectSet=3;
    if(next===state.pastHomeGames){ 
    state.setTotalHome += 1
     }else{ 
    state.setTotalAway+= 1;
    }
    } 
    
    if (next.set4>=5&&
        next.set4 >= otherScore.set4 + 2&&s==='set4') {
        state.homeGames = 0;
        state.awayGames = 0;
        let updatedTime = {'set4': state.time  };
        state.pastTime = { ...state.pastTime, ...updatedTime};
        state.time =0;
        state.selectSet=4;
    if(next===state.pastHomeGames){ 
    state.setTotalHome += 1
     }else{ 
    state.setTotalAway+= 1;
    };
    } 
    
    if (next.set5>=5&&
        next.set5 >= otherScore.set5 + 2&&s==='set5') {
        state.homeGames = 0;
        state.awayGames = 0;
        let updatedTime = {'set4': state.time  };
        state.pastTime = { ...state.pastTime, ...updatedTime};
        state.time =0;

    if(next===state.pastHomeGames){ 
    state.setTotalHome += 1
     }else{ 
    state.setTotalAway+= 1;
    }
    } 


    if ((state.homeGames === state.gameNumber)
        && (state.awayGames === state.gameNumber)) {
        state.isTieBreak = true;
    }

        },
        updateVolleyBallScore: (state, action) => {
            const [points, player,setIndex] = action.payload;
            
            calculateVolleyballScore(state, points, player, setIndex);

           
        },
        
        updateGames: (state, action) => {
            const [points, player, setIndex] = action.payload;
        
            const s= state.selectSet===''?`set${setIndex}`:`set${state.selectSet+1}`;


            giveGame(state, player, points);

            let updatedHome = { [s]: state.homeGames };
            let updatedAway = { [s]: state.awayGames };

            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };
            
            let next = player === 'home' ?
            state.pastHomeGames
            :
            state.pastAwayGames
        
            let otherScore = player === 'home' ?
            state.pastAwayGames
            :
            state.pastHomeGames;
            
            
            if (next.set1>=5&&
                next.set1 >= otherScore.set1 + 2&&s==='set1') {
                state.homeGames = 0;
                state.awayGames = 0;
                
                let updatedTime = {'set1': state.time  };
                state.pastTime = { ...state.pastTime, ...updatedTime};
                state.time =0;
                state.selectSet=1;
        
            if(next===state.pastHomeGames){ 
            state.setTotalHome += 1
             }else{ 
            state.setTotalAway+= 1;
            }
            } 
            
            if (next.set2>=5&&
                next.set2 >= otherScore.set2 + 2&&s==='set2') {
                state.homeGames = 0;
                state.awayGames = 0;
                let updatedTime = {'set2': state.time  };
                state.pastTime = { ...state.pastTime, ...updatedTime};
                state.time =0;
                state.selectSet=2;
        
            if(next===state.pastHomeGames){ 
            state.setTotalHome += 1
             }else{ 
            state.setTotalAway+= 1;
            }
            } 
            
            if (next.set3>=5&&
                next.set3 >= otherScore.set3 + 2&&s==='set3') {
                state.homeGames = 0;
                state.awayGames = 0;
                let updatedTime = {'set3': state.time  };
                state.pastTime = { ...state.pastTime, ...updatedTime};
                state.time =0;
                state.selectSet=3;
            if(next===state.pastHomeGames){ 
            state.setTotalHome += 1
             }else{ 
            state.setTotalAway+= 1;
            }
            } 
            
            if (next.set4>=5&&
                next.set4 >= otherScore.set4 + 2&&s==='set4') {
                state.homeGames = 0;
                state.awayGames = 0;
                let updatedTime = {'set4': state.time  };
                state.pastTime = { ...state.pastTime, ...updatedTime};
                state.time =0;
                state.selectSet=4;
            if(next===state.pastHomeGames){ 
            state.setTotalHome += 1
             }else{ 
            state.setTotalAway+= 1;
            };
            } 
            
            if (next.set5>=5&&
                next.set5 >= otherScore.set5 + 2&&s==='set5') {
                state.homeGames = 0;
                state.awayGames = 0;
                let updatedTime = {'set4': state.time  };
                state.pastTime = { ...state.pastTime, ...updatedTime};
                state.time =0;
        
            if(next===state.pastHomeGames){ 
            state.setTotalHome += 1
             }else{ 
            state.setTotalAway+= 1;
            }
            } 
        
        
            if ((state.homeGames === state.gameNumber)
                && (state.awayGames === state.gameNumber)) {
                state.isTieBreak = true;
            }
        },
        updateVolleyBallGames: (state, action) => {
            const [points, player] = action.payload;
            const s= `set${state.selectSet+1}`;
            giveGame(state, player, points);
            

            let updatedHome = { [s]: state.homeScore };
            let updatedAway = { [s]: state.awayScore };

            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };

            if (state.homeGames === (state.gameNumber - 1)
                && state.awayGames === (state.gameNumber - 1)) {
                state.isTieBreak = true;
            }
        },
        updateSets: (state, action) => {
            const [points, player] = action.payload;
            var next;
            switch (player) {
                case 'home':
                    next = state.homeSets + points;
                    if (next >= 0) {
                        state.homeSets += points;
                        /*                         state.homeGames = 0;
                                                state.awayGames = 0; */
                        state.isTieBreak = false;
                    }
                    break;
                case 'away':
                    next = state.awaySets + points;
                    if (next >= 0) {
                        state.awaySets += points;
                        /*                         state.homeGames = 0;
                                                state.awayGames = 0; */
                        state.isTieBreak = false;
                    }
                    break;
                default:
                    break;
            }
        },
        updatePastGames: (state, action) => {
            const setIndex = action.payload;
            let updatedHome = { [`set${setIndex}`]: state.homeGames };
            let updatedAway = { [`set${setIndex}`]: state.awayGames };

            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };

            state.homeGames = 0;
            state.awayGames = 0;


        },
        resetGames: state => {
            state.homeGames = 0;
            state.awayGames = 0;
            state.isTieBreak = false;
        },
        resetSets: state => {
            state.homeSets = 0;
            state.awaySets = 0;
            state.isTieBreak = false;
        },
        resetScores: state => {
            state.homeScore = 0;
            state.awayScore = 0;
            state.advantage = '';
            state.deuce = false;
        },
        resetTieBreak: state => {
            state.homeTieBreakScore = 0;
            state.awayTieBreakScore = 0;
        },
        resetAll: state => {
            state.homeScore = 0;
            state.awayScore = 0;
            state.homeTieBreakScore = 0;
            state.awayTieBreakScore = 0;
            state.homeGames = 0;
            state.awayGames = 0;
            state.pastHomeGames = { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 };
            state.pastAwayGames = { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 };
            state.homeSets = 0;
            state.awaySets = 0;
            state.advantage = '';
            state.deuce = false;
            state.isTieBreak = false;
            state.setTotalHome=0;
            state.setTotalAway=0;
            state.pastTime= { set1: 0, set2: 0, set3: 0, set4: 0, set5: 0 };
            state.time=0;
        },
        
    },
});




function giveTieBreakScore(state, points, player) {
    
    let next = player === 'home'?
        state.homeTieBreakScore + points
        :
        state.awayTieBreakScore + points

    let otherScore = player === 'home' ?
        state.awayTieBreakScore
        :
        state.homeTieBreakScore;

    if ((state.isTieBreak  && next >= state.tieBreakLimit)
        && next >= otherScore + 2) {

        player === 'home' ?
            state.homeTieBreakScore += 1
            :
            state.awayTieBreakScore += 1;

        player === 'home' ?
            state.homeGames += 1
            :
            state.awayGames += 1;

        player === 'home' ?
            state.homeSets += 1
            :
            state.awaySets += 1;

        state.isTieBreak = false;
    } else {
        player === 'home' ?
            state.homeTieBreakScore += points
            :
            state.awayTieBreakScore += points;
    }
}

function giveGame(state, player, points) {
    let next = player === 'home' ?
        points + state.homeGames
        :
        points + state.awayGames;

    let otherGame = player === 'home' ?
        state.awayGames
        :
        state.homeGames;
    if ((state.isTieBreak && otherGame < next) ||
        (next >= state.gameNumber && next >= otherGame + 2)) {
        /*         player === 'home' ?
                    state.homeSets += 1
                    :
                    state.awaySets += 1; */

        player === 'home' ?
            state.homeGames += points
            :
            state.awayGames += points;
        state.isTieBreak = false;
    } else if (next >= 0) {
        player === 'home' ?
            state.homeGames += points
            :
            state.awayGames += points;

            
    }
    
}

function calculateVolleyballScore(state, points, player,setIndex) {
    let next = player === 'home' ?
        points + state.homeScore
        :
        points + state.awayScore;

    let otherScore = player === 'home' ?
        state.awayScore
        :
        state.homeScore;
    const s= state.selectSet===''?`set${setIndex}`: `set${state.selectSet+1}`;    
    if (next >= state.scoreLimit &&

        next >= otherScore + 2) {
            player === 'home' ?

       

            
            state.homeScore = next
            :
            state.awayScore = next;
            let updatedHome = {[s]: state.homeScore }
            let updatedAway = { [s]: state.awayScore}
          

            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };

           
        state.homeScore = 0;
        state.awayScore = 0;

        player === 'home' ?
            state.homeGames += 1
            :
            state.awayGames += 1;

    } else if (next >= 0) {
        player === 'home' ?

       

            
            state.homeScore = next
            :
            state.awayScore = next;
            let updatedHome = {[s]: state.homeScore };
            let updatedAway = { [s]: state.awayScore };

            state.pastHomeGames = { ...state.pastHomeGames, ...updatedHome };
            state.pastAwayGames = { ...state.pastAwayGames, ...updatedAway };


    }

}

function calculateScore(state, points, player,sc) {
    let pp=player==='home'?
                state.homeScore
                :
                state.awayScore
    let sp=player==='home'?
                state.awayScore
                :
                state.homeScore           
          
     if (pp>=40 && (sp>=40)!==(pp>=40)) {
        giveScoreWithAdvantage(state, player);
    } else if (state.advantage !== '' && state.advantage !== player) {
        setDeuce(state);
    } else if (state.deuce) {
        state.deuce = false;
        state.advantage = player;
    } else {
        giveScore(state, points, player,sc);
    }

    
}

function giveScoreWithAdvantage(state, player) {
    state.advantage = '';
    state.deuce = false;
    state.homeScore = 0;
    state.awayScore = 0;
    player === 'home' ?
        state.homeGames += 1
        :
        state.awayGames += 1;

    if (state.homeGames === 6 && state.awayGames === 6) {
        state.isTieBreak = true;
    }

}

function giveScore(state, points, player,sc) {
    let otherScore = player === 'home' ?
        state.awayScore
        :
        state.homeScore;
    if (points >= state.scoreLimit && points === otherScore&&state.deuce ===false) {
        state.deuce = true;

        player === 'home' ?
            state.homeScore = state.scoreLimit
            :
            state.awayScore = state.scoreLimit;

    } else if (points >= 0 && points <= state.scoreLimit) {
        player === 'home' ?
            state.homeScore = points
            :
            state.awayScore = points;

    } else if (points >= state.scoreLimit) {
        state.advantage = '';
        state.deuce = false;
        state.homeScore = 0;
        state.awayScore = 0;

        giveGame(state, player, 1);
       

        if (state.homeGames === state.gameNumber
            && state.awayGames === state.gameNumber) {
            state.isTieBreak = true;
        }
    } else {
        player === 'home' ?
            state.homeScore = 0
            :
            state.awayScore = 0;

    }

}

function setDeuce(state) {
    state.advantage = '';
    state.deuce = true;
}

export const {
    setShowTieBreak,
    updateScoreLimit,
    updateTieBreakLimit,
    updateServer,
    updateGameNumber,
    updateScore,
    updateScoreMenos,
    updateTieBreakScore,
    updateTennisScore,
    updateVolleyBallScore,
    updateGames,
    updateVolleyBallGames,
    updateSets,
    updatePastGames,
    resetScores,
    resetGames,
    resetSets,
    resetTieBreak,
    resetAll,
    updateSetTotal,
    selectSets,
    updatetime,
    timeGame,
    setSaque
    
} = scoreSlice.actions;

export default scoreSlice.reducer;

export const selectShowTieBreak = state => state.score.showTieBreak;
export const selectScoreLimit = state => state.score.scoreLimit;
export const selectHomeScore = state => state.score.homeScore;
export const selectAwayScore = state => state.score.awayScore;
export const selectHomeTieBreakScore = state => state.score.homeTieBreakScore;
export const selectAwayTieBreakScore = state => state.score.awayTieBreakScore;
export const selectHomeGames = state => state.score.homeGames;
export const selectAwayGames = state => state.score.awayGames;
export const selectHomeSets = state => state.score.homeSets;
export const selectAwaySets = state => state.score.awaySets;
export const selectAdvantage = state => state.score.advantage;
export const selectServer = state => state.score.server;
export const selectPastHomeGames = state => state.score.pastHomeGames;
export const selectPastAwayGames = state => state.score.pastAwayGames;
export const selectIsTieBreak = state => state.score.isTieBreak;
export const selectsetTotalHome = state => state.score.setTotalHome;
export const selectsetTotalAway = state => state.score.setTotalAway;
export const selectSet= state => state.score.selectSet;
export const selecttime= state => state.score.time;
export const selectPasttime= state => state.score.pastTime;
export const selectSaque= state => state.score.saque;