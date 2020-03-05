
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './state/store';
import { HashRouter } from 'react-router-dom';
import Home from './component'
import * as Util from './state/Util';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      badUser:false
    };
  }

  componentDidMount(){
   Util.changetheme(true);
  }


  render() {
    return (
      <div>
        <Provider store={store}>
          <HashRouter>
            <Home/>
          </HashRouter>                
        </Provider>
      </div>
    );
  }
}

export default App;
