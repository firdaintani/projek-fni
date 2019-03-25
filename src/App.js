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

class App extends Component {
  render() {
    return (
      <div>
         <SlideMenu/>
        <Navbar/>
        {/* <SlideMenu/> */}
        <Route path='/' component={Home} exact/>
        <Route path='/login' component={Login} exact/>
        <Route path='/register' component={Register} exact/>
        {/* <Home/> */}
       
        <Route path='/product/:category' component={Product}/>
        {/* <Footer/> */}
      </div>
      );
  }
}

export default App;
