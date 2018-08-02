import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import List from './List.js';
import Header from './Header.js';

class App extends Component {


  addItem = (val) => {
    console.log(val);
  }

  newList = () =>{
    
  }

  render() {
    return (
      <div>
        <Header/>
        <List addItem={this.addItem}/>
      </div>
    );
  }
}

export default App;
