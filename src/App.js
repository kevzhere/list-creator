import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import './App.css';
import List from './List.js';
import Header from './Header.js';

class App extends Component {

  state = {
    lists :[{name: "list1", myItems: ["item1", "item2"]},
    {name: "list2", myItems: ["item3", "item4"]}]
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

  onDragEnd = result => {
    const {destination, source, draggableId } = result;

        if(!destination){
            return;
        }
        if(
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        )
        return;
        const {lists} = this.state;
        let destLoc = 0,
        targetLoc = 0;
        const destinationList = lists.filter((val, index) =>{
          if(val.name === destination.droppableId){
            destLoc = index;
            return val;
          }
          return null;
        });

        const targetList = lists.filter((val, index) =>{
          if(val.name === source.droppableId){
            targetLoc = index;
            return val;
          }
          return null;
        });


        const destListItems = Array.from(destinationList[0].myItems);
        destListItems.splice(destination.index, 0, draggableId);
        const sourceListItems = Array.from(targetList[0].myItems);
        sourceListItems.splice(source.index, 1);
        const newDestList = {
            name: destination.droppableId,
            myItems: destListItems
        };
        const newSourceList = {
            name: source.droppableId,
            myItems: sourceListItems
        }

        let newState = {
              ...this.state,
          }
        newState.lists[targetLoc] = newSourceList;
        newState.lists[destLoc] = newDestList;
        this.setState(newState);
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          {renderLists}
        </DragDropContext>          
        </div>
      </div>
    );
  }
}

export default App;
