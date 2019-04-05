import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import SlideMenu from './slideMenu';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    // this.setState({
     
    //   isOpen: !this.state.isOpen
    // });
    this.refs.inputsearch.className+=" active";

    
  }

ubah=()=>{
  
  if(this.state.isOpen===false){
  this.refs.inputsearch.className+=" active";
}else{
  alert('cari')
}
this.setState({
     
  isOpen: !this.state.isOpen
});
}
close=()=>{

  this.refs.inputsearch.className = 'd-flex'
  this.setState({isOpen:false})
}

  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-md" role="navigation">
  <div className="container">
    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span className="sr-only">Toggle navigation</span> ☰
    </button> <a className="navbar-brand" href="#">Brand</a>
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav mt-2 mt-md-0">
        <li className="active nav-item"><a href="#" className="nav-link">Home</a>
        </li>
        <li className="nav-item"><a href="#" className="nav-link">Features</a>
        </li>
      </ul>
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item"><a href="#" className="nav-link">About</a>
        </li>
        <li className="dropdown nav-item"> <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">Menu <b className="caret" /></a>
          <ul className="dropdown-menu dropdown-menu-right">
            <li className="dropdown-item"><a href="#">Action</a>
            </li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search" ref='inputsearch'>
        <div className="input-group" >
          <input type="text" className="form-control" placeholder="Search" />
          <div className="input-group-append">
            <button type="reset" className="btn btn-light" onClick={this.close}>
              <span className="icons icon-close">
                <span className="sr-only">Close</span>
              </span>
            </button>
          </div>
          <div className="input-group-append">
            <button type="button" className="btn btn-light" onClick={this.ubah}  value='cari'>
              <span className="icons icon-magnifier">
                <span className="sr-only">Search</span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</nav>

    );
  }
}