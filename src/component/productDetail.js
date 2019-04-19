import React from 'react'
import '../support/css/productDetail.css'
// import ContentZoom from 'react-content-zoom';
import Currency from 'react-currency-formatter'
import Axios from 'axios'
import {urlApi} from '../support/urlApi'
import swal from 'sweetalert'
import {connect} from 'react-redux'
import {countCart} from '../1. action'
import {withRouter} from 'react-router-dom'

class ProductDetail extends React.Component{
    state={qty:1, product:{}}

    componentDidMount(){
        this.getDetail()
    }

    getDetail=()=>{

        var idUrl = this.props.match.params.id
        // alert(idUrl)
        Axios.get(urlApi+'/product/product-detail/'+idUrl)
        .then((res)=>{
            if(res.data.error){
                swal("Error", res.data.msg, "error")
            }else{
                var newdata = {...res.data[0]}
                
                // newdata.product_image = `${urlApi}/${res.data[0].product_image}`
                newdata.product_image = urlApi+'/'+res.data[0].product_image
                delete res.data[0].product_image
                
                this.setState({product :newdata})
                
            }
        })
    }

    kurang=()=>{
        if(this.state.qty>1){

            this.setState({qty:this.state.qty-1})
        }
    }
    tambah=()=>{
        this.setState({qty:this.state.qty+1})
     
    }

    addToCart=(id)=>{
        // alert(id+' add to cart')
        // alert(this.state.qty)
        if(this.props.username){
            var newData = {username : this.props.username, product_id : id, quantity : this.state.qty }
            Axios.post(urlApi+'/cart/add', newData)
            .then((res)=>{
                if(res.data.error){
                    swal("Error", res.data.msg, "error")
                }else{
                    this.props.countCart(this.props.username)
                    swal("Success", "Product has been added to cart", "success")
                    
                }
            })
    
    
        }
        else{
            swal("Error","You need to login!", "error")
            .then((willLogin) => {
                if (willLogin) {
               
                  this.props.history.push('/login');
                }
              });

            
        }
    }

    
    
    render(){
        var {name, price, id, description, product_image} = this.state.product
        return(
            <div className='container' style={{marginTop:'70px', padding:'30px'}}>
                <div className='row'>
                    <div className='col-5'>
                    {/* <p  onClick={()=>alert(typeof(this.state.image))}>asa</p> */}
                        <img src={product_image} alt='produk ' className='product-image-detail mx-auto'></img>
                        {/* <ContentZoom zoomPercent={160}
                        largeImageUrl={this.state.image}
                        imageUrl={this.state.image}
                        contentHeight={450}
                        contentWidth={450} />
                         */}
                    </div>
                    <div className='col-7 mt-auto mb-auto' >
                    
                        <h3 className='navbar-brand'>{name}</h3>
                        <p style={{fontStyle:'italic'}}><Currency quantity={price} currency="IDR"/></p>
                        <p>{description}</p>
                       <div className='row'>
                       <div className='col-5'>
                            <div className='row'>
                                <div className='col-3'>
                                {/* <input type="button" value='-' onClick={this.kurang} style={{marginTop:'10px'}}></input> */}
                                <i class="fas fa-minus" onClick={this.kurang} style={{cursor:'pointer'}}></i>
                                </div>
                                <div className='col-6' style={{textAlign:"center",marginLeft:'-30px'}} >
                                <span>{this.state.qty}</span>

                                </div>
                                <div className='col-3'>
                                <i class="fas fa-plus" onClick={this.tambah} style={{cursor:'pointer'}}></i>

                                </div>
                                
                            </div>
                       </div>
                        </div>
                        <hr style={{width:'180px', marginLeft:0, borderTop:'2px black solid'}}></hr>
                             
                        <input type='button' className='tombol' value='ADD TO CART' onClick={()=>this.addToCart(id)}></input>   
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        username : state.user.username
    }
}

export default withRouter(connect(mapStateToProps,{countCart})(ProductDetail))