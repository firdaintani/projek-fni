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

class App extends Component {
  render() {
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
        {/* <Home/> */}
       
        <Route path='/product/:category' component={Product}/>
        {/* <Footer/> */}
        </ScrollToTop>
     
      </div>
      );
  }
}

export default App;
