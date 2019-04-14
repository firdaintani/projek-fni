import React, { Component } from 'react';
import './App.css';
import Navbar from './component/Navbar'
import Home from './component/home/Header'
// import SlideMenu from './component/slideMenu3'
import { Route } from 'react-router-dom';
import Product from './component/product'
import Login from './component/Login'
import Register from './component/Register'
import ProductDetail from './component/productDetail'
import Cart from './component/cart2'
import ScrollToTop from './component/scrollToTop'
import Profile from './component/Profile'
import VerifyEmail from './component/verifyEmail'
import ManageCategory from './component/admin/manageCat'
import ManageBrand from './component/admin/manageBrand'
import ManageProduct from './component/admin/manageProduct'
import AddProduct from './component/admin/addProduct'
import cookie from 'universal-cookie'
import { keepLogin, cookieChecked , countCart} from './1. action'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SlideMenu2 from './component/slidemenu2.jsx'

var objCookie = new cookie()


class App extends Component {
  componentDidMount() {

    var username = objCookie.get('username')
    if (username !== undefined) {
      this.props.keepLogin(username)
      this.props.countCart(username)
    }
    else {
      this.props.cookieChecked()
    }

  }
  render() {
    if (this.props.cookie) {
      return (
        <div>
          <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 100 }}>
          <SlideMenu2 />
          {/* <SlideMenu /> */}
          
            <Navbar />
          
          </div>

          <ScrollToTop>
            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/product-detail/:id' component={ProductDetail} exact />
            <Route path='/cart' component={Cart} exact />
            <Route path='/manage-category' component={ManageCategory} exact />
            <Route path='/manage-brand' component={ManageBrand} exact />
            <Route path='/manage-product' component={ManageProduct} exact />
            <Route path='/add-product' component={AddProduct} exact />
            <Route path='/profile' component={Profile} exact />
            <Route path='/verify' component={VerifyEmail} exact />
            <Route path='/product/:category' component={Product} />
          
          </ScrollToTop>

        </div>
      );
    }

    return <div>
      <center>
        <Loader
          type="ThreeDots"
          color="#000000"
          height="300"
          width="300"
        />
      </center>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    cookie: state.user.cookie
  }
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked, countCart })(App));
