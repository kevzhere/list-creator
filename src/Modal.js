import React, { Component } from 'react';
import Backdrop from './Backdrop';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    submit = (e) => {
        e.preventDefault();

    }

    cancel = (e) =>{
        e.preventDefault();
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
                    <form>
                        <h1>Enter your new list's name below</h1>
                        <input type="text" placeholder="Enter your new list name" refs="newName"/>
                        <button className="submitButton" onClick={this.submit}>Submit</button>
                        <button className="cancelButton" onclick={this.cancel}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal;
