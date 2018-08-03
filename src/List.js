import React, { Component } from 'react';
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
            list = items.myItems.map((item)=>(
                <li key={item}><span onClick={()=>this.removeItem(item, items)}><FaTrash/></span>{item}</li>
            ));
        }
        return(
            <div className="container">
                <h1>{items.name}<FaTimes className="close" onClick={this.removeList}/></h1>
                <form onSubmit={(val) =>this.newItem(val, items)}>
                    <input type="text" onChange={this.handleChange} value={this.state.value} placeholder={this.state.placeholder} ref="newItem"/>
                </form>
                <ul>{list ? list: null}</ul>
            </div>
        );
    }
}

export default List;