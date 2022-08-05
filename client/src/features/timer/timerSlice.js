import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        timerActive: false,
        minutes: 10,
        seconds: 0,
        initialTime:0,
        
    },
    reducers: {
        incrementSeconds: (state, action) => {
            let next = state.seconds + action.payload;
            let modulo = ((next % 60) + 60) % 60;

            if (next >= 60) {
                state.minutes += 1;
            }

            state.seconds = modulo;
        },
        decrementSeconds: (state, action) => {
            let next = state.seconds -   action.payload;

            if (next >= 0) {
                state.seconds = next;
            } else if (state.minutes > 0) {
                state.minutes -= 1;
                state.seconds = 60 + next;
            } else {
                state.seconds = 0;
            }
        },
        updateMinutes: (state, action) => {
            state.minutes = action.payload;
        },
        updateSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        resetTime: state => {
            state.minutes = state.initialTime;
            state.seconds = 0;
        },
        updateInitialTime: (state, action) => {
            state.initialTime = action.payload;
            state.minutes = action.payload;
        },
        setTimerActive: (state, action) => {
            state.timerActive = action.payload;
        }, halfTime:(state, action) => {
            state.minutes =+ 45;
        }
    }
});

export const {
    incrementSeconds, 
    decrementSeconds,
    updateMinutes, 
    updateSeconds,
    setTimerActive, 
    resetTime,
    updateInitialTime,
    halfTime
} = timerSlice.actions;

export default timerSlice.reducer;

export const selectMinutes = state => state.timer.minutes;
export const selectSeconds = state => state.timer.seconds;
export const selectTimerActive = state => state.timer.timerActive;