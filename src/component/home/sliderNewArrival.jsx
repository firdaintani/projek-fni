import React, { Component } from "react";
import Slider from "react-slick";
import '../../support/css/sliderDiscount.css'
import Currency from 'react-currency-formatter'
import swal from 'sweetalert'
import {urlApi} from '../../support/urlApi'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'
 class SliderNewArrival extends Component {
    state={product : []}

    componentDidMount(){
      this.getNewArrival()
    }

    getNewArrival=()=>{
      Axios.get(urlApi+'/product/new')
      .then((res)=>{
        if(res.data.error){
          swal("Error",res.data.msg,'error')
        }else{
          this.setState({product:res.data})
        }
      })
      .catch((err)=>console.log(err))
    }

    toProdDetail=(id)=>{

      this.props.history.push('/product-detail/'+id);
     }

    renderProdukJsx = () => {
      var jsx = this.state.product.map((val) => {
          return (
              <div className="card mb-3 border-card" onClick={()=>this.toProdDetail(val.id)}>
                <center>
                <p className='border-brand-onslider'>{val.brand_name}</p>
                </center>
                <img title={val.name} className="card-img-top gambar-list" src={urlApi+'/'+val.product_image} alt="Card" />

                {   
                        val.discount > 0 ?
                        <div className='discount-triangle'>
                        <div className='discount'>{val.discount}%</div>
                        </div>
                        : null
                    }

                <div className="card-body">
                <div>
                <h4  style={{fontSize:'17px',textAlign:'center',height:'auto'}}>{val.name}</h4></div>
                <p style={{fontWeight:'500', textAlign:'center', paddingTop:'5px'}}><Currency quantity={val.price - (val.price*(val.discount/100))} currency="IDR" /></p>
                </div>
              </div>
          )
      })

      return jsx
    
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
            {this.renderProdukJsx()}
        </Slider>
      </div>
    );
  }
}
export default withRouter(SliderNewArrival)