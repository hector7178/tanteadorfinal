import { useDispatch } from 'react-redux';
import { setShowExtraTime } from './infoSlice';
import './info.css';
import {Plus, Dash} from 'react-bootstrap-icons';

export default function InfoCard({
  title,
  info,
  incrementInfo,
  decrementInfo,
  extraTime,
  p2,
  color,
  children,
  halfTime,
  h,w
  
}) {
  const dispatch = useDispatch();
 
 
  return (
    <div className={h===true?'displayinfo':'containerinfo'}>
      <div >
        {children}
      </div>
      
      <div className={
      incrementInfo && decrementInfo ?
        p2?'infocard-2':h===true?'infocard-2':"infocard" :
        "col-sm-12 col-md-6 bg-transparent card text-center"
    }>
      {
        title ?
          <div className="cardheader">
            <h5 className='titulos' >{title}</h5>
          </div>
          : null
      }
      {
        incrementInfo && decrementInfo ?
          <div className={`cardbody ${w} d-grid align-items-center`}>
            <div className={p2?"reloj-2":"reloj"}>
              <button type="button" className={`buttonMasMenos-2 bg-white border-${color} text-${color}`} onClick={() => dispatch(decrementInfo())}><Dash width="100%" height="100%"/></button>
              <span className="crono">{info}</span>
              <button type="button" className={`buttonMasMenos-2 d-grid align-items-center textwhite  bg-${color} border-${color}`} onClick={() => dispatch(incrementInfo())}> <Plus fill='#ffffff' width="100%" height="100%"/></button>
            </div>

          {
             /* extraTime ?
                <button
                type="button"
                  className="extraTimeBtn"
                  onClick={() => dispatch(setShowExtraTime())}
                >
                  Mostrar Tiempo Extra
                </button>
                :
                null*/
            }
          </div>
          :
          <div className="card-body-reloj">
            <span className="score-reloj">{info}</span>
          </div>
      }
    </div>
  </div>
  );
}
