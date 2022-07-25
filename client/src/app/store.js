import { configureStore } from '@reduxjs/toolkit';
import infoReducer from '../features/info/infoSlice';
import scoreReducer from '../features/scores/scoreSlice';
import timerReducer from '../features/timer/timerSlice';

export default configureStore ({
    reducer: {
        info: infoReducer,
        score: scoreReducer,
        timer: timerReducer
    }
});
