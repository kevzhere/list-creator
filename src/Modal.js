import React, { Component } from 'react';
import Backdrop from './Backdrop';

class Modal extends Component {

    state = {
        value: "",
        empty: false
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    submit = (e) => {
        e.preventDefault();
        this.setState({empty: false});
        const {value} = this.state;
        if(!value){
            this.setState({empty: true})
            return;
        }
        this.props.newList(value);
        this.setState({empty: false, value: ""});
        this.props.modalClosed();
    }

    canceled = (e) =>{
        e.preventDefault();
        this.setState({empty: false, value: ""});
        this.props.modalClosed();
    }

    render () {
        return (
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className="modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <form className="newList">
                        <h3>Enter your new list's name below</h3>
                        {this.state.empty ? <p>Please enter a name</p> : null}
                        <input type="text"  value={this.state.value} onChange={this.handleChange} placeholder="Enter your new list name"/><br/>                        
                        <button className="submitButton" onClick={this.submit}>Submit</button>
                        <button className="cancelButton" onClick={this.canceled}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal;
