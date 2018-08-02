import React, { Component } from 'react';
import { FaArchive } from 'react-icons/fa';
import Modal from "./Modal.js";

class Header extends Component{

    state= {
        show: true
    }

    showModal=()=>{
        this.setState((prevState)=>{return {show: !prevState.show}});
        console.log(this.state.show);
    }

    render(){
        return(
            <div className="header">
                <FaArchive className='logo' size="30px"/>
                <nav>
                    <ul>
                        <li><span>test1</span></li>
                        <li onClick={this.showModal}><span>test2</span></li>
                    </ul>
                </nav>
                <Modal show={this.state.show} modalClosed={this.showModal}/>
            </div>
        );
    }
}

export default Header;