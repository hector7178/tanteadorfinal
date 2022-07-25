import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom"
import Offcanvas from 'react-bootstrap/Offcanvas';
import './tennis/tennis.css'
import {  resetInfo} from '../../features/info/infoSlice';
import {resetScores,resetAll,} from '../../features/scores/scoreSlice';
import { useDispatch } from 'react-redux';
import { resetTime, updateInitialTime } from '../../features/timer/timerSlice';


function BasicExample({scoreboardId, color}) {
  const dispatch = useDispatch();
  const ResetAll=() => {
    dispatch(resetInfo());
    dispatch(resetScores());
    dispatch(resetTime());
  }
        return (
          <>
            {['lg'].map((expand) => (
              <Navbar key={expand} expand={expand} className="mb-3  position-absolute top-50 start-0">
                <Container fluid>
                  <Navbar.Toggle className='navbar-light bg-light' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header className={`col-12 bg-${color}`} closeButton>
                      
                    </Offcanvas.Header>
                    <Offcanvas.Body className='nav-body-tan d-flex justify-content-center  row col-12'>
                      <Nav className="justify-content-start align-items-center g-1 mt-5 flex-grow-1 ">
                        <Nav.Link className= {`mb-4 text-center  w-75 rounded-pill btn bg-${color} text-white fs-1  nav-link`} as={Link} to="/">Home </Nav.Link>
                        <Nav.Link className= {`mb-4 text-center  w-75 rounded-pill btn bg-${color} text-white fs-1  nav-link`} onClick={ResetAll} >Reset tablero</Nav.Link>
                        <Nav.Link className={`mb-4 text-center  w-75 rounded-pill btn bg-${color} text-white fs-1  nav-link`} as={Link} to={`/share/${scoreboardId }`}>Mostrar tablero</Nav.Link>
                        <Nav.Link className= {`mb-4 text-center  w-75 rounded-pill btn bg-${color} text-white fs-1  nav-link`} >Finalizar tablero</Nav.Link>
                      </Nav>
                     
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))}
          </>
        );
      }

export default BasicExample;