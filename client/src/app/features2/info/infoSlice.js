import { createSlice } from '@reduxjs/toolkit';

export const infoSlice = createSlice({
    name: 'info',
    initialState: {
        period: 1,
        homeFouls: 0,
        awayFouls: 0,
        extraTime: 0,
        team1: 'Equipo 1',
        team2: 'Equipo 2',
        showExtraTime: false,
        showTimer: false,
    },
    reducers: {
        incrementPeriod: state => {
            let next = state.period + 1;
            if (next <= 99) {
                state.period += 1;
            }
        },
        decrementPeriod: state => {
            let next = state.period - 1;
            if (next > 0) {
                state.period -= 1;
            }
        },
        incrementExtraTime: state => {
            let next = state.extraTime + 1;
            if (next <= 99) {
                state.extraTime += 1;
            }
        },
        decrementExtraTime: state => {
            let next = state.extraTime - 1;
            if (next >= 0) {
                state.extraTime -= 1;
            }
        },
        incrementHomeFouls: state => {
            let next = state.homeFouls + 1;
            if (next <= 99) {
                state.homeFouls += 1;
            }
        },
        decrementHomeFouls: state => {
            let next = state.homeFouls - 1;
            if (next >= 0) {
                state.homeFouls -= 1;
            }
        },
        incrementAwayFouls: state => {
            let next = state.awayFouls + 1;
            if (next <= 99) {
                state.awayFouls += 1;
            }
        },
        decrementAwayFouls: state => {
            let next = state.awayFouls - 1;
            if (next >= 0) {
                state.awayFouls -= 1;
            }
        },
        setTeam1: (state, action) => {
            state.team1 = action.payload;
        },
        setTeam2: (state, action) => {
            state.team2 = action.payload;
        },
        setShowExtraTime: state => {
            state.showExtraTime = !state.showExtraTime;
        },
        setShowTimer: state => {
            state.showTimer = !state.showTimer;
        },
        resetFouls: state => {
            state.homeFouls = 0;
            state.awayFouls = 0;
        },
        resetInfo: state => {
            state.period = 1;
            state.homeFouls = 0;
            state.awayFouls = 0;
            state.extraTime = 0;
            state.team1 = 'Equipo 1';
            state.team2 = 'Equipo 2';
        }
    }
});

export const {
    incrementPeriod,
    decrementPeriod,
    incrementExtraTime,
    decrementExtraTime,
    incrementHomeFouls,
    decrementHomeFouls,
    incrementAwayFouls,
    decrementAwayFouls,
    setTeam1,
    setTeam2,
    setShowExtraTime,
    setShowTimer,
    resetFouls,
    resetInfo,
} = infoSlice.actions;

export default infoSlice.reducer;

export const selectPeriod = state => state.info.period;
export const selectHomeFouls = state => state.info.homeFouls;
export const selectAwayFouls = state => state.info.awayFouls;
export const selectExtraTime = state => state.info.extraTime;
export const selectTeam1 = state => state.info.team1;
export const selectTeam2 = state => state.info.team2;
export const selectShowExtraTime = state => state.info.showExtraTime;
export const selectShowTimer = state => state.info.showTimer;