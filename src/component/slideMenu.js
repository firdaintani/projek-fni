import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { MDBCollapse } from "mdbreact";

class SlideMenu extends React.Component {
    
       state = {
          menuOpen: false,collapseID: ""
        }

    
        toggleCollapse = collapseID => () => {
          this.setState(prevState => ({
              collapseID: prevState.collapseID !== collapseID ? collapseID : ""
          }));
      }
    
      // This keeps your state in sync with the opening/closing of the menu
      // via the default means, e.g. clicking the X, pressing the ESC key etc.
      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
      }
      

    toggle = () => {


      this.setState({
          menuOpen: !this.state.menuOpen
          , collapseID: ""
      });

  }
      
      // This can be used to close the menu, e.g. when a user clicks a menu item
      closeMenu () {
        this.setState({menuOpen: false})
      }
    
      // This can be used to toggle the menu, e.g. when using a custom icon
      // Tip: You probably want to hide either/both default icons if using a custom icon
      // See https://github.com/negomi/react-burger-menu#custom-icons
      toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
      }

    render(){

    return (
        <div>
      <Menu  isOpen={this.state.menuOpen} 
      onStateChange={(state) => this.handleStateChange(state)}>
        <Link to='/' className='menu-item outline-none' onClick={() => this.closeMenu()} >Home</Link>

          <Link className="menu-item outline-none" to='/product/all' onClick={() => this.closeMenu()}>
        Shop
        </Link>
        {
          this.props.role==='admin' ? 
          <div>
          <p onClick={this.toggleCollapse("basicCollapse")} style={{ cursor: 'pointer' }} className='menu-item'>Manage &nbsp;&nbsp;&nbsp; <i class="fas fa-angle-down"></i></p>
          <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
              <ul>
                  <Link to='/manage-product'><li className='menu-item' onClick={this.toggle}>Manage Product</li></Link>
                  <Link to='/manage-category'><li className='menu-item' onClick={this.toggle}>Manage Category</li></Link>
                  <Link to='/manage-brand'><li className='menu-item' onClick={this.toggle}>Manage Brand</li></Link>
                  <Link to='/transaction'><li className='menu-item' onClick={this.toggle}>Manage Transaction</li></Link>

              </ul>
          </MDBCollapse>
      </div> : this.props.role==='user' ?
      <div>
          <Link to='/transaction' ><p className='menu-item outline-none' onClick={this.toggle}>Transaction</p></Link>
      </div> : null
        }
        
      </Menu>
      {/* <CustomIcon onClick={() => this.toggleMenu()} /> */}
      </div>
    );
  };
}


const mapStateToProps=(state)=>{
  return {
    role : state.user.role
  }
}

export default connect(mapStateToProps)(SlideMenu)