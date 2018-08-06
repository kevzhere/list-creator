import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { FaTrash } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';



class List extends Component{
    
    state = {
        items: this.props.myItems,
        value: "",
        placeholder: "Add new item"
    }

    componentWillReceiveProps(props){
        this.setState({items: props.myItems});
    }
 
    newItem = (val, list) => {
        val.preventDefault();
        const newItem = this.state.value;
        if(!newItem){
            return;
        }
        if(this.state.items.myItems.includes(newItem)){
            this.setState({value: "", placeholder: "That item is already on the list"});
            return;
        }
        this.props.addItem(newItem, list);
        this.setState({value: ""});
    }

    removeItem = (val, list) => {
        this.props.deleteItem(val, list);
    }

    removeList = ()=>{
        this.props.deleteList(this.state.items.name);
    }

    handleChange = (e) => {
        this.setState({value: e.target.value, placeholder:"Add new item"})
    }

    render(){
        const {items} = this.state;
        let list = null;

        if(items){
            list = items.myItems.map((item, index)=>(
                <Draggable
                    draggableId={item}
                    index={index}
                    key={index}
                >
                {provided => (
                    <li 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                            <span onClick={()=>this.removeItem(item, items)}>
                                <FaTrash/>
                            </span>
                        {item}
                    </li>
                )}                    
                </Draggable>
            ));
        }

        return(
            <div className="container">
                <h1>{items.name}<FaTimes className="close" onClick={this.removeList}/></h1>
                <form onSubmit={(val) =>this.newItem(val, items)}>
                    <input type="text" onChange={this.handleChange} value={this.state.value} placeholder={this.state.placeholder} ref="newItem"/>
                </form>
                <Droppable droppableId={items.name}>
                    {provided => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {list ? list: null}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default List;