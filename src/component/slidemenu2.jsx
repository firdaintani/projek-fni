import React, { Component } from 'react';
import { MDBCollapse, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import './../support/css/slidemenu2.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class ModalPage extends Component {
    state = {
        modal: false,
        modal8: false,
        collapseID: ""

    }
    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    // toggle = nr => () => {

    //     let modalNumber = 'modal' + nr

    //     this.setState({
    //         [modalNumber]: !this.state[modalNumber]
    //         , collapseID:""});

    // }


    toggle = () => {


        this.setState({
            modal: !this.state.modal
            , collapseID: ""
        });

    }

    render() {
        return (
            <div className='font'>
                {/* <MDBBtn color="info" onClick={this.toggle(8)}>Right</MDBBtn> */}
                <div>
                    <i onClick={this.toggle} class="fas fa-bars fa-2x icon-menu" ></i>
                </div>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} fullHeight position="left">
                    <MDBModalHeader toggle={this.toggle}></MDBModalHeader>
                    <MDBModalBody>
                        <Link to='/' ><p className='menu-item outline-none' onClick={this.toggle}>Home</p></Link>

                        <Link to='/product/all'><p className="menu-item outline-none" onClick={this.toggle}>Shop</p></Link>
                        
                        { this.props.role==='admin' ?
                            <div>
                                <p onClick={this.toggleCollapse("basicCollapse")} style={{ cursor: 'pointer' }} className='menu-item'>Manage &nbsp;&nbsp;&nbsp; <i class="fas fa-angle-down"></i></p>
                                <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                                    <ul>
                                        <Link to='/manage-product'><li className='menu-item' onClick={this.toggle}>Manage Product</li></Link>
                                        <Link to='/manage-category'><li className='menu-item' onClick={this.toggle}>Manage Category</li></Link>
                                        <Link to='/manage-brand'><li className='menu-item' onClick={this.toggle}>Manage Brand</li></Link>
                                    </ul>
                                </MDBCollapse>
                            </div> : 
                            <Link to='/profile'>
                            <p className="menu-item outline-none" onClick={this.toggle}>Profile  {this.props.username}</p></Link>
                       
                        }
                    </MDBModalBody>

                </MDBModal>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(ModalPage);