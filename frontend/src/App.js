import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import store from './store';
import Users from './components/Users/Users';
import TopNavBar from './components/TopNavBar';
import MyItemList from './components/MyItemList';
import ItemModal from './components/ItemModal';
import { loadUser } from './actions/authAction';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <TopNavBar/>
          <Container>
            <ItemModal/>
            <MyItemList/>
          </Container>
          {/*<Users/>*/}
        </div>
      </Provider>
    );
  }
}

export default App;
