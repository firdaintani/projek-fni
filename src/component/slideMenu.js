import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class SlideMenu extends React.Component {
    
       state = {
          menuOpen: false,role:''
        }

        componentWillReceiveProps(newProps){
            alert(newProps.role)
            this.setState({role:newProps.role})
        }
    
      // This keeps your state in sync with the opening/closing of the menu
      // via the default means, e.g. clicking the X, pressing the ESC key etc.
      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
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
        <Link className="menu-item outline-none" to='/profile' onClick={() => this.closeMenu()}>
        Profile
        </Link>
        {
          this.state.role==='admin' ? 
          <Link className="menu-item outline-none" to='/manage-product' onClick={() => this.closeMenu()}>
        Manage Product Category
        </Link> : null
        }

        {this.state.role}
        {/* {this.state.username} */}
        
      </Menu>
      {/* <CustomIcon onClick={() => this.toggleMenu()} /> */}
      </div>
    );
  };
}


const mapStateToProps=(state)=>{
  return {
    username : state.user.username,
    role : state.user.role
  }
}

export default connect(mapStateToProps)(SlideMenu)