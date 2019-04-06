import React, { Component } from 'react';
import './App.css';
import Navbar from './component/Navbar'
import Home from './component/home/Header'
// import Footer from './component/footer'
import SlideMenu from './component/slideMenu'
import {Route} from 'react-router-dom';
import Product from './component/product'
import Login from './component/Login'
import Register from './component/Register'
import ProductDetail from './component/productDetail'
import Cart from './component/cart'
import ScrollToTop from './component/scrollToTop'
import Profile from './component/Profile'
import cookie from 'universal-cookie'
import {keepLogin, cookieChecked} from './1. action'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
// import ManageCategory from './component/admin/manageCategory'
import ManageCategory from './component/admin/manageCat'
import ManageBrand from './component/admin/manageBrand'
var objCookie = new cookie()


class App extends Component {
  componentDidMount(){
    
    var username = objCookie.get('username')
    if(username !== undefined){
      this.props.keepLogin(username)
      
    }
    else{
      this.props.cookieChecked()
    }
   
  }
  render() {
    if(this.props.cookie){
    return (
      <div>
        <div style={{position:'fixed', width:'100%', top:0, zIndex:100}}>
        <SlideMenu/>
          <Navbar/>
        
        </div>

        <ScrollToTop>
        {/* <SlideMenu/> */}
       
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/product-detail' component={ProductDetail} exact/>
          <Route path='/cart' component={Cart} exact/>
          <Route path='/manage-category' component={ManageCategory} exact />
          <Route path='/manage-brand' component={ManageBrand} exact />
    
          <Route path='/profile' component={Profile} exact />
       
          <Route path='/product/:category' component={Product}/>  
        {/* <Footer/> */}
        </ScrollToTop>
     
      </div>
      );
    }
    
    return <div className='centervh'>
              <Loader
                type="Bars"
                color="#00BFFF"
                height="100"	
                width="100"
                />
          </div>
  }
}

const mapStateToProps=(state)=>{
  return {
    cookie : state.user.cookie
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin,cookieChecked})(App));
