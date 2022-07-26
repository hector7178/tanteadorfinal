import React from 'react';
import {
    BrowserRouter, Routes, Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/home';
import Sports from './pages/sports';
import Share from './pages/share';
import NotFound from './pages/notfound'

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    <Route path="/scoreboard/:sport" exact element={<Sports/>} />
                     <Route path="/share/:scoreboardId" exact element={<Share/>} />
                  <Route path="*" exact element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </Provider>

    );
}
