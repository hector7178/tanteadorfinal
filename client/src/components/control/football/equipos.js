
import './futbol.css';

export default function equipos(props){
  
return(
    <div className='equipos' >
            <div className="card-equipo-panel">
               <div className='foto-equipo'></div> 
              <input
                type="text"
                className="seleccion-equipos"
                placeholder={props.team1}
                value={props.team1}
                id="team1"
                aria-label="Team1"
                onChange={props.inputChanged} />
            </div>
          
       
            <div className="card-equipo-panel" >
              <div className='foto-equipo' ></div> 
              <input
                type="text"
                className="seleccion-equipos"
                placeholder={props.team2}
                value={props.team2}
                id="team2"
                aria-label="Team2"
                onChange={props.inputChanged}  />
            </div>
    </div>
)

}
