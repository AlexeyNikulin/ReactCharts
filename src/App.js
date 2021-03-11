import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import Auth from './pages/Auth';
import LineCharts from './pages/LineCharts';
import PieCharts from './pages/PieCharts';
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import Loader from './components/Loader';

function App() {
  const {token, login, logout, ready} = useAuth();
  const isAuthenticated = !!token;

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout
    }}>
      { isAuthenticated &&
        <>
          <Header/>
          <Switch>
            <Route exact path="/line-charts" render={() => <LineCharts/>}/>
            <Route exact path="/pie-charts" render={() => <PieCharts/>}/>
            <Redirect to="/line-charts" />
          </Switch>
        </>
      }
      {
        !isAuthenticated &&
          <Switch>
            <Route exact path="/auth" render={() => <Auth/>}/>
            <Redirect to="/auth" />
          </Switch>
      }
    </AuthContext.Provider>
  );
}

export default App;
