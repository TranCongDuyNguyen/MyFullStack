import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from './store';
import TopNavBar from './components/TopNavBar';
import Landing from './components/Landing';
import PrivateRoute from './components/PrivateRoute';
import { loadUser } from './actions/authAction';

import ListItemPage from './components/pages/ListItemPage';
import ManagementPage from './components/pages/ManagementPage';

class App extends Component {
  
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <TopNavBar/>
            {/*<Users/>*/}
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/itemlist" component={ListItemPage}/>
            <PrivateRoute exact path="/management" component={ManagementPage}/> 
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
