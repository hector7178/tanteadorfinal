import { useDispatch } from 'react-redux';
import { setShowExtraTime } from './infoSlice';
import './info.css'

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
  h
}) {
  const dispatch = useDispatch();
 
 
  return (
    <div className={h===true?'displayinfo':null}>
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
          <div className="cardbody d-grid align-items-center">
            <div className={p2?"reloj-2":"reloj"}>
              <button type="button" className={p2?`buttonMasMenos-2 font-weight-bold text-white border-${color} bg-${color}`:`buttonMasMenos font-weight-bold bg-white  text-${color} border-2 border-${color}`} onClick={() => dispatch(decrementInfo())}>-</button>
              <span className="crono">{info}</span>
              <button type="button" className={p2?`buttonMasMenos-2 d-grid align-items-center font-weight-bold border-2 text-white bg-${color} border-${color}`:`buttonMasMenos font-weight-bold bg-${color}  text-white border-2 border-${color}`} onClick={() => dispatch(incrementInfo())}>+</button>
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
