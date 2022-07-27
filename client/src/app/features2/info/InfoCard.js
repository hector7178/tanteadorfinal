import { useDispatch } from 'react-redux';
import { setShowExtraTime } from './infoSlice';
import './info.css'

export default function InfoCard2({
  title,
  info,
  incrementInfo,
  decrementInfo,
  extraTime,
  p2
}) {
  const dispatch = useDispatch();

  return (
    <div className={
      incrementInfo && decrementInfo ?
        p2?'infocard-2':"infocard" :
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
          <div className="cardbody">
            <div className={p2?"reloj-2":"reloj"}>
              <button type="button" className={p2?"buttonMasMenos-2 bg-white":"bg-white buttonMasMenos"} onClick={() => dispatch(decrementInfo())}>-</button>
              <span className="crono">{info}</span>
              <button type="button" className={p2?"buttonMasMenos-2 bg-white":"bg-white buttonMasMenos"} onClick={() => dispatch(incrementInfo())}>+</button>
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
  );
}
