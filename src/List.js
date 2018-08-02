import React, { Component } from 'react';

class List extends Component{
    
    newItem = (val) => {
        val.preventDefault();
        const newItem = this.refs.newItem.value;
        this.props.addItem(newItem);
    }

    render(){
        return(
            <div className="container">
                <h1>list name</h1>
                <form onSubmit={this.newItem}>
                <input type="text" placeholder="Add New Item" ref="newItem"/>
                </form>
                <ul></ul>
            </div>
        );
    }
}

export default List;