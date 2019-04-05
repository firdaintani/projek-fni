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
import {Link} from 'react-router-dom'
import '../support/css/navbar3.css'
import {connect} from 'react-redux'

class Navbar1 extends React.Component {
  constructor(props) {
    super(props);
    this.keyPress =this.keyPress.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,isOpenSearch: false
 
    };
  }

  keyPress=(event)=>{
    if(event.keyCode===13){
      
      alert(this.refs.searchbox.value)
      this.refs.inputsearch.className = 'd-flex'
    }
  }
    
    ubah=()=>{
      
      if(this.state.isOpenSearch===false){
      this.refs.inputsearch.className+=" active";
      // alert(this.state.isOpenSearch +'if')  
    }
      else{
      alert(this.refs.searchbox.value)
      this.refs.inputsearch.className = 'd-flex'
      // alert(this.state.isOpenSearch+' else')
      }
      this.setState({isOpenSearch: !this.state.isOpenSearch});
      // alert(this.state.isOpenSearch+' luar')
      
    }
    close=()=>{

      this.refs.inputsearch.className = 'd-flex'
      this.setState({isOpenSearch:false})
    }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar light expand="md" className='nav font'>
          <NavbarBrand className="navbar-brand"  href="/">ST-ART</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
          
        <form className="d-flex" role='search' ref='inputsearch'>
        <div className="input-group" >
          <input type="text" className="form-control" placeholder="Search item here..." ref='searchbox' onKeyDown={this.keyPress}/>
          <div className="input-group-append">
          <i class="fas fa-times"onClick={this.close}></i> 
              
          </div>
          <div className="input-group-append">
          <i class="fas fa-search" onClick={this.ubah} ></i>
            
          </div>
        </div>
      </form>
              <NavItem>
                <NavLink href='/product/all' className='nav-item'>Shop</NavLink>
              
              </NavItem>
              <NavItem>
              <Link to='/cart'><a className="nav-link" href="/"><i class="fas fa-shopping-cart"></i></a></Link> 
              
              </NavItem>
              <NavItem>
                { this.props.username==='' ?
              <Link to='/login'><input className='tombol' type='button' value='LOGIN'/></Link>
              : 
              <input className='tombol' type='button' value='LOGOUT' onClick={this.logoutBtn}/>
            }
              </NavItem>
                   
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    username : state.user.username
  }
}

export default connect(mapStateToProps)(Navbar1)