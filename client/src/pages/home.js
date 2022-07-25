import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/home.scss';
import Balon from '../components/control/football/footballsvg/balon';
import HockeySvg from '../components/control/hockey/hockeysvg';
import {Dribbble} from 'react-bootstrap-icons';
import PelotaRugby from '../components/control/rugby/rugbysvg';
import Tennis from '../components/control/tennis/svgtennis';
import PelotaVol from '../components/control/volleyball/Svgvoley';


export default function Home() {
    const history = useNavigate();

    const sports = [
        'Football',
        'Basketball',
        'Tennis',
        'Rugby',
        'Handball',
        'Volleyball',
        'Hockey'
    ];
 
   


    const sportCard = (sport, key) => (
        <div key={key} className="col" style={{maxWidth:'40%'}}
    >
          <div className="p-3 border  text-center sport-card" onClick={() => history('/scoreboard/' + sport)}>
            <div className="absolute">
              <h3 style={{zIndex:'1'}}className='rela'>{sport}</h3>
             <div> {key===0?<Balon fill='#bc7ad3' className='rela'/>:key===1?<Dribbble height='65px' width='65px'  fill='#bc7ad3' className='rela'/>:key===2?<Tennis fill='#bc7ad3' className='rela'/>:key===3?<PelotaRugby fill='#bc7ad3' className='rela'/>:key===4?<Balon fill='#bc7ad3' className='rela'/>:key===5?<PelotaVol fill='#bc7ad3'className='rela'/>:key===6?<HockeySvg fill='#bc7ad3'className='rela'/>:null}</div>
            </div>
          </div>
        </div>
    );

    return (
        <div className="container inicio" style={{paddingRight: '0', paddingLeft: '0'}}>

          <div className='row i'>
          
          <div className='row menu'><div className='titulo'><h1>Deportes</h1></div></div>
          <div className='row deportes'>
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 justify">
            {
              sports.map((sport, index) => sportCard(sport, index))
            }
            </div>
          </div>
          
          <div className='row footer'><div className='footer' ></div></div>
          </div>
        </div>
    );
}
