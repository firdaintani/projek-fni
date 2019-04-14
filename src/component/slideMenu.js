import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { MDBBtn, MDBCollapse } from "mdbreact";

class SlideMenu extends React.Component {
    
       state = {
          menuOpen: false,collapseID: ""
        }

    
        toggleCollapse = collapseID => () => {
          if(this.state.collapseID){
          this.refs.collapsemd.className='display-collapse'
        }else{
          this.refs.collapsemd.className=''
                }
          this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
          }));
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

      // toggleCollapse () {
      //   this.setState({menuCollapse: !this.state.menuCollapse})
      // }
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
          this.props.role==='admin' ? 
          <Link className="menu-item outline-none" to='/manage-product' onClick={() => this.closeMenu()}>
        Manage Product Category
        </Link> : null
        }
        
        <MDBBtn color="info" onClick={this.toggleCollapse("basicCollapse")} style={{ marginBottom: "1rem" }}>
          Toggle2
        </MDBBtn>
      
        <MDBCollapse id="basicCollapse"  isOpen={this.state.collapseID} ref='collapsemd' >
          <p>
              {this.state.collapseID}
            Anim pariatur cliche reprehenderit, enim eiusmod high life
            accusamus terry richardson ad squid. Nihil anim keffiyeh
            helvetica, craft beer labore wes anderson cred nesciunt sapiente
            ea proident.
          </p>
        </MDBCollapse>
        
        {/* {this.state.username} */}
        
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