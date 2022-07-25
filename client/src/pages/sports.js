import React from 'react';
import FootballControl from '../components/control/football'
import BasketballControl from '../components/control/basketballs';
import TennisControl from '../components/control/tennis';
import RugbyControl from '../components/control/rugby';
import HandballControl from '../components/control/handball';
import VolleyballControl from '../components/control/volleyball';
import HockeyControl from '../components/control/hockey';
import { useParams } from 'react-router-dom';
import './styles/sports.scss';

export default function Sports() {
  const { sport } = useParams();

  const renderSportBoard = () => {
    switch (sport) {
      case 'Football':
        return <FootballControl />;
      case 'Basketball':
        return <BasketballControl />;
      case 'Tennis':
        return <TennisControl />;
      case 'Rugby':
        return <RugbyControl />;
      case 'Handball':
        return <HandballControl />;
      case 'Volleyball':
        return <VolleyballControl />;
      case 'Hockey':
        return <HockeyControl />;
      default:
        return null;
    }
  };

  return (
    <div className="container-paginas" >
      
        {renderSportBoard(sport)}
      
    </div>
  );
}
