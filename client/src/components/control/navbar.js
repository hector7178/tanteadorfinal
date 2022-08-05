import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom"
import Offcanvas from 'react-bootstrap/Offcanvas';
import './tennis/tennis.css'
import {  resetInfo} from '../../features/info/infoSlice';
import {resetScores,resetAll,} from '../../features/scores/scoreSlice';
import { useDispatch } from 'react-redux';
import { resetTime, updateInitialTime } from '../../features/timer/timerSlice';
import {CalendarEvent, CalendarXFill,ArrowRepeat,HouseFill,List,ChevronLeft } from 'react-bootstrap-icons'

function BasicExample({scoreboardId, color,SvgTop, titulo}) {
  const dispatch = useDispatch();
  const ResetAll=() => {
    dispatch(resetInfo());
    dispatch(resetScores());
    dispatch(resetTime());
  }
  const [show, setShow]= useState(false);
  const handleClose=()=> setShow(false);
  const handleShow=()=> setShow(true);

 const raiseInvoiceClicked=()=>
 {
    const url = `/share/${scoreboardId }`;
    window.open(url, '_blank');
}

        return (
          <>
          <List fill='#ffffff' width="40px" height="40px" onClick={handleShow} className='svgNav'/>
          <Navbar>
            
            <Container>
              <Navbar.Offcanvas
                   show={show} onHide={handleClose} >
                    <Offcanvas.Header className={`col-12 bg-${color} justify-content-center text-white position-relative d-flex  overflow-hidden`}>
                     <ChevronLeft width="35px" height="35px" className='svgNav' onClick={handleClose} fill='#ffffff'/> {SvgTop} <h1 className='text-white nav-titulo position-absolute'>{titulo}</h1>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='nav-body-tan d-flex justify-content-center  row col-12'>
                      <Nav className="justify-content-start align-items-center g-1 mt-5 flex-grow-1 ">
                        <Nav.Link className= {`mb-4 text-center nav-btns  rounded-pill  bg-${color} text-white  nav-link`} as={Link} to="/"><HouseFill className='navsvg'/>Home </Nav.Link>
                        <Nav.Link className= {`mb-4 text-center nav-btns  rounded-pill  bg-${color} text-white nav-link`} onClick={ResetAll} > <ArrowRepeat className='navsvg'/> Reset tablero</Nav.Link>
                        <Nav.Link className={`mb-4 text-center  nav-btns  rounded-pill  bg-${color} text-white   nav-link`} onClick={raiseInvoiceClicked} > <CalendarEvent className='navsvg'/> Mostrar tablero</Nav.Link>
                        <Nav.Link className= {`mb-4 text-center nav-btns  rounded-pill  bg-${color} text-white nav-link`} ><CalendarXFill className='navsvg'/>Finalizar tablero</Nav.Link>
                      </Nav>
                     
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
              
           </Container>
           </Navbar>
          </>
        );
      }

export default BasicExample;