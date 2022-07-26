import * as React from "react"
import '../styles/SvgStyles.css'
const Silbato = (props) => (
  <div className='ajustes d-grid'>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 439.9 439.9"
    style={{
      enableBackground: "new 0 0 439.9 439.9",
    }}
    xmlSpace="preserve"
    {...props}
    
     height= '100%'
      width= '100%'
  >
    <path fill={props.color} d="m284.1 142.7-16.2-10.1 40.5-64.9 16.2 10.1-40.5 64.9zm-54.6-94.9h-19.1v76.5h19.1V47.8zm-58.1 84.8-40.5-64.9-16.2 10.2 40.5 64.9 16.2-10.2zm268.5 87.3L285 252.4c1.9 7.701 1.9 17.201 1.9 24.9 0 63.1-51.6 114.801-114.8 114.801-53.5 0-97.5-36.301-110.9-84.102-5.7 3.801-13.4 7.602-23 7.602-21 0-38.2-17.201-38.2-38.201s17.2-38.2 38.2-38.2c9.6 0 17.2 3.799 23 7.6 13.4-47.8 57.4-84.1 110.9-84.1h19.1v38.2h57.4v-38.2h191.201v57.2h.099zM57.4 277.3c0-11.5-7.7-19.1-19.1-19.1s-19.1 7.6-19.1 19.1 7.7 19.1 19.1 19.1 19.1-7.6 19.1-19.1z" />
  </svg>
  {props.children}
  </div>
)

export default Silbato
