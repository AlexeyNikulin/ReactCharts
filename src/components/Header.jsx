import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const Header = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <a 
        style={{ marginRight: '1rem' }}
        className="flow-text right" 
        href="/" 
        onClick={logoutHandler}>Выйти</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><NavLink to="/line-charts">Линейный график</NavLink></li>
          <li><NavLink to="/pie-charts">Круговой график</NavLink></li>
        </ul>
      </div>
    </nav>
  )
};

export default Header;
