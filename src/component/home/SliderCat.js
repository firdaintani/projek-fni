import React, { Component } from "react";
import Slider from "react-slick";
import '../../support/css/slider.css'
import {Link} from 'react-router-dom'

export default class SwipeToSlide extends Component {
    state={category : [{name:'Brush Pen', img : 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/A70D9A47ECEB4D8C81619175CA992EDB/10539419_2.jpg?fit=inside|540:540'},
    {name:'Watercolor Paper', img:'https://cdn10.bigcommerce.com/s-vw57mn/products/23572/images/128447/Strathmore-Watercolor-Paper-9X12-120173730914_image1__08302.1532545134.1280.1280.jpg?c=2'},
    {name:'Watercolor', img:'https://images-na.ssl-images-amazon.com/images/I/711WsXx64IL._SX425_.jpg'},
    {name:'Drawing Pen', img:'http://cdn.shopify.com/s/files/1/2087/9013/products/product-image-247620518_1200x1200.jpg?v=1526870440'},
    {name:'Brush Paint', img:'https://cdn.shopify.com/s/files/1/2398/2457/products/12-10-8-brush-set_RE_2048x.jpg?v=1515043388'},{name:'Grid Paper', img: 'https://images-na.ssl-images-amazon.com/images/I/71otkSqj7hL._AC._SR180,230.jpg'}]}


    renderCategory=()=>{
        var data = this.state.category.map((val)=>{
            return (
                <div>
                <Link to={'/product/'+val.name}><div className='card'>
                    <img className="card-img-top gambar-produk" src={val.img} alt="Card" />
                    
                    <div class="overlay">
                        <div class="text-overlay">{val.name}</div>
                    </div>
            
                </div>
                </Link>
                
                    
                    
                </div>
        
            )
        })
        return data
    }
  render() {
    const settings = {
      className: "center slides",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      swipeToSlide: true,
      arrows: true,
  
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };
    return (
      <div style={{marginBottom:'70px',marginLeft:'70px',marginRight:'70px'}}>
     
        <Slider {...settings}>
            {this.renderCategory()}
        </Slider>
      </div>
    );
  }
}