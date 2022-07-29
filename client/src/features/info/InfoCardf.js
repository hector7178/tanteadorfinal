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
  h
}) {
  const dispatch = useDispatch();
 
 
  return (
    <div className={h===true?'displayinfo':'containerinfo'}>
     
      <div className='infoExtra'>
    
      {
       
          <div className="info-extra-body">
            
            <span className="crono-infoextra">{info}</span>
            
            <div className='info-btn'>
              <button type="button" className={`buttonMasMenos-2 border-${color} text-${color}`} onClick={() => dispatch(decrementInfo())}><Dash width="100%" height="100%"/></button>
              
              <button type="button" className={`buttonMasMenos-2 d-grid align-items-center textwhite  bg-${color} border-${color}`} onClick={() => dispatch(incrementInfo())}> <Plus fill='#ffffff' width="100%" height="100%"/></button>
            </div>

          
         
          </div>
      }
    </div>
  </div>
  );
}
