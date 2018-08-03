import React, { Component } from 'react';
import './App.css';
import List from './List.js';
import Header from './Header.js';

class App extends Component {

  state = {
    lists :[
      {name: "list1", myItems: ["item1", "item2"]},
      {name: "list12", myItems: ["item123", "item234"]}]
  }

  addItem = (val, list) => {
    let {lists} = this.state;
    lists.forEach((oldList)=>{
      if(oldList.name === list.name){
        oldList.myItems.push(val);
      }
      return oldList;      
    })
    this.setState({lists});
  }

  deleteItem = (val, list) =>{
    let {lists} = this.state;
    lists.forEach((oldList)=>{
      if(oldList.name === list.name){
        oldList.myItems.splice(oldList.myItems.indexOf(val), 1);
      }
      return oldList;      
    })
    this.setState({lists});
  }

  newList = (list) =>{
    console.log(list);
    if(this.alreadyExist(list)){
      alert("Please use a different name!");
      return;
    }
    let {lists} = this.state;
    lists.push({name: list, myItems: []});
    this.setState({lists});
  }

  deleteList = (name) => {
    const lists = this.state.lists.filter((list)=> list.name !== name);
    this.setState({lists});

  }

  alreadyExist= (val) => {
    const {lists} = this.state;
    let repeat = false;
    lists.forEach((list)=>{
      if(list.name.toLowerCase() === val.toLowerCase())
        repeat = true;      
    })
    return repeat;
  }

  render() {
    const {lists} = this.state;
    const renderLists = lists.map((list)=>
        <List 
            key={list.name}
            addItem={this.addItem}
            deleteItem={this.deleteItem}
            myItems={list}
            deleteList={this.deleteList}
        />
    );
    return (
      <div>
        <Header newList={this.newList}/>
        <div className="listContainer">          
          {renderLists}
        </div>
      </div>
    );
  }
}

export default App;
