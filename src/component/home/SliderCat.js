import React, { Component } from "react";
import Slider from "react-slick";
import '../../support/css/slider.css'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import {urlApi} from '../../support/urlApi'
import Axios from 'axios'

export default class SwipeToSlide extends Component {
    state={category : []}

    componentDidMount(){
      this.getCategory()
    }
    getCategory=()=>{
      Axios.get(urlApi+'/category/all')
      .then((res)=>{
        if(res.data.error){
          swal("Error",res.data.msg,'error')
        }else{
          this.setState({category:res.data})
        }
      })
      .catch((err)=>console.log(err))
    }


    renderCategory=()=>{
        var data = this.state.category.map((val)=>{
            return (
                <div>
                <Link to={'/product/search?category='+val.id}><div className='card'>
                    <img className="card-img-top gambar-produk" src={urlApi +'/'+val.category_picture} alt="Card" />
                    
                    <div class="overlay">
                        <div class="text-overlay">{val.category_name}</div>
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