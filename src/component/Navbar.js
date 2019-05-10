import React from 'react'
import '../support/css/navbar.css'
// import SlideMenu from './slideMenu'
import {Link} from 'react-router-dom'
// import {Collapse} from 'reactstrap'
import {connect} from 'react-redux'
import {onLogout} from './../1. action'
import swal from 'sweetalert'
import {withRouter} from 'react-router-dom'

class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
  

    toggle() {
      // this.refs.navbar.style.display='none'
       this.setState(state=>({collapse:!state.collapse}))

      }

      logoutBtn=()=>{
        swal({
            // title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
          })
          .then((willLogout) => {
            if (willLogout) {
            this.props.onLogout()
              swal("You logout", {
                icon: "success",
              });
              this.props.history.push('/');
            }
          });
         
      }

    render (){

        return (
            <div>
           
            <div className='navbar-fixed'>

            <nav className="navbar navbar-expand-md navbar-light" ref='navbar' style={{overflow:'visible'}}>
               
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                       {/* <i class="fas fa-search" onClick={this.toggle} style={{marginLeft:'50px',cursor:'pointer'}}></i> */}
                        
                    </li>
                   
                    </ul>
                </div>
                <div className="mx-auto order-0">
                    <a className="navbar-brand mx-auto" href="/">ST-ART</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                    <span className="navbar-toggler-icon" />
                    </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    {
                      this.props.role==='admin' ?
                      <Link to='/manage-transaction'><p className='nav-link'>Transaction<sup><span class="badge badge-danger">1</span></sup></p></Link>                    

                        : 
                        <Link to='/cart'><a className="nav-link" href="/"><i class="fas fa-shopping-cart"><sup><span class="badge badge-danger">{this.props.cart !== 0 ? this.props.cart : null}</span></sup></i></a></Link> 

                  }
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/"><i class="fas fa-user"></i></a> */}
                           { this.props.username==='' ?
                           <span>
                           <Link to='/login'><input className='tombol font' type='button' value='LOGIN'/></Link> &nbsp;
                        <Link to='/register'><input className='tombol-black font' type='button' value='REGISTER'/></Link>
                        </span>
                        : 
                        <input className='tombol font' type='button' value='LOGOUT' onClick={this.logoutBtn}/>
                        }
                    </li>
                   
                    </ul>
                </div>
                </nav>
                
                </div>
                 </div>
                 
          //   <nav className="navbar navbar-light bg-light fixed-top navbar-expand-sm" role="navigation">
          //   <div className="container">
          //     <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span className="sr-only">Toggle navigation</span> ☰
          //     </button> <a className="navbar-brand" href="#">Brand</a>
          //     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          //       <ul className="nav navbar-nav">
          //         <li className="active nav-item"><a href="#" className="nav-link">Link</a>
          //         </li>
          //         <li className="nav-item"><a href="#" className="nav-link">Link</a>
          //         </li>
          //         <li className="dropdown nav-item"> <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">Dropdown <b className="caret" /></a>
          //           <ul className="dropdown-menu">
          //             <li className="dropdown-item"><a href="#">Action</a>
          //             </li>
          //           </ul>
          //         </li>
          //       </ul>
          //       <ul className="nav navbar-nav ml-auto">
          //         <li className="nav-item"><a href="#" className="nav-link">Link</a>
          //         </li>
          //         <li className="dropdown nav-item"> <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">Dropdown <b className="caret" /></a>
          //           <ul className="dropdown-menu">
          //             <li className="dropdown-item"><a href="#">Action</a>
          //             </li>
          //             <li className="dropdown-item"><a href="#">Another action</a>
          //             </li>
          //             <li className="dropdown-item"><a href="#">Something else here</a>
          //             </li>
          //             <li className="divider dropdown-item" />
          //             <li className="dropdown-item"><a href="#">Separated link</a>
          //             </li>
          //           </ul>
          //         </li>
          //       </ul>
          //       <form className="d-flex" role="search">
          //         <div className="input-group">
          //           <input type="text" className="form-control" placeholder="Search" />
          //           <div className="input-group-append">
          //             <button type="reset" className="btn btn-secondary">
          //               <span className="fa fa-remove">
          //                 <span className="sr-only">Close</span>
          //               </span>
          //             </button>
          //           </div>
          //           <div className="input-group-append">
          //             <button type="submit" className="btn btn-secondary">
          //               <span className="fa fa-search">
          //                 <span className="sr-only">Search</span>
          //               </span>
          //             </button>
          //           </div>
          //         </div>
          //       </form>
          //     </div>
          //   </div>
          // </nav>
          
            )
    }
}

const mapStateToProps=(state)=>{
    return {
      username : state.user.username,
      cart : state.user.cart,
      role : state.user.role
    }
  }
  
  export default withRouter(connect(mapStateToProps, {onLogout})(Navbar))
