import React, { Component } from 'react';
import { FaArchive } from 'react-icons/fa';
import Modal from "./Modal.js";

class Header extends Component{

    state= {
        show: false
    }

    showModal=()=>{
        this.setState((prevState)=>{return {show: !prevState.show}});
    }

    render(){
        return(
            <div className="header">
                <FaArchive className='logo' size="30px"/>
                <ul className="headerItem">
                    <li onClick={this.showModal}>New List</li>
                </ul>
                <Modal 
                    show={this.state.show} 
                    modalClosed={this.showModal}
                    newList={this.props.newList}    
                />
            </div>
        );
    }
}

export default Header;