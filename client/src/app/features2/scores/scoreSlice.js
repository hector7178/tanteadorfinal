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
        gameNumber: 6
    },
    reducers: {
        setShowTieBreak: state => {
            state.showTieBreak = !state.showTieBreak;
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
        },
        updateGameNumber: (state, action) => {
            state.gameNumber = action.payload;
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
        updateTieBreakScore: (state, action) => {
            const [points, player] = action.payload;
            giveTieBreakScore(state, points, player);
        },
        updateTennisScore: (state, action) => {
            const [points, player] = action.payload;
            calculateScore(state, points, player);
        },
        updateVolleyBallScore: (state, action) => {
            const [points, player] = action.payload;
            calculateVolleyballScore(state, points, player);
        },
        updateGames: (state, action) => {
            const [points, player] = action.payload;

            giveGame(state, player, points);

            if ((state.homeGames === state.gameNumber)
                && (state.awayGames === state.gameNumber)) {
                state.isTieBreak = true;
            }
        },
        updateVolleyBallGames: (state, action) => {
            const [points, player] = action.payload;

            giveGame(state, player, points);

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
        },
    }
});

function giveTieBreakScore(state, points, player) {
    let next = player === 'home' ?
        state.homeTieBreakScore + 1
        :
        state.awayTieBreakScore + 1;

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
            state.homeTieBreakScore += 1
            :
            state.awayTieBreakScore += 1;
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

function calculateVolleyballScore(state, points, player) {
    let next = player === 'home' ?
        points + state.homeScore
        :
        points + state.awayScore;

    let otherScore = player === 'home' ?
        state.awayScore
        :
        state.homeScore;

    if (next >= state.scoreLimit &&
        next >= otherScore + 2) {
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
    }

}

function calculateScore(state, points, player) {
    if (points === 'AD') {
        state.advantage = player;
    } else if (state.advantage !== '' && state.advantage === player) {
        giveScoreWithAdvantage(state, player);
    } else if (state.advantage !== '' && state.advantage !== player) {
        setDeuce(state);
    } else if (state.deuce) {
        state.deuce = false;
        state.advantage = player;
    } else {
        giveScore(state, points, player);
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

function giveScore(state, points, player) {
    let otherScore = player === 'home' ?
        state.awayScore
        :
        state.homeScore;
    if (points >= state.scoreLimit && points === otherScore) {
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
    resetAll
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