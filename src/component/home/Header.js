import React from 'react';
import gambar from '../../support/img/img-header.jpg'
import '../../support/css/header.css'
import Slider from './SliderCat'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import {Link} from 'react-router-dom'

class Header extends React.Component{
    // state={isLogin:false}
    render(){
        return (
            <div className='container'>
                <div className='row' style={{margin:'70px', paddingTop:'20px'}}>
                    <div className='col-6 mt-auto mb-auto'>
                        <div className='header-text'>ST-ART</div>
                        <div className='header-text'>WELCOMES</div>
                        <div className='header-text'>YOU</div>
                        <div>Your trusted art supplies</div>

                        <div>
                            <Link to='/product/all'><input type='button' className='tombol' value='SHOP NOW' style={{marginTop:'10px'}}></input>
                            </Link></div>
                    </div>
                    <div className='col-6'>
                        {/* <img src={gambar} style={{height:}} alt='header pict'/> */}
                        <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={gambar} alt="Card cap" />
                        
                    </div>
                    </div>
                </div>
                <hr class="garis"></hr>
                <div style={{marginTop:'70px'}}>
                    <center>
                        <h3 className='navbar-brand'>ABOUT</h3>
                        <p style={{marginLeft:'140px',marginRight:'140px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque lectus, dapibus sit amet consequat id, feugiat nec nunc. Mauris maximus, nisl eget sollicitudin fringilla, elit eros bibendum sem, sed tincidunt massa diam sit amet tellus. Mauris nec imperdiet tellus. Suspendisse tincidunt ligula eu ante pharetra hendrerit. Nam eget ante.</p>
                    </center>
                </div>
                <hr class="garis"></hr>
                <center><h3 className='navbar-brand' style={{marginTop:'30px'}}>CATEGORIES</h3></center>
                <Slider/>
                <hr class="garis"></hr>
            </div>
            
        )
    }
}
export default Header