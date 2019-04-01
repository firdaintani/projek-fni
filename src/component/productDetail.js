import React from 'react'
import '../support/css/productDetail.css'
import ContentZoom from 'react-content-zoom';
import Currency from 'react-currency-formatter'

export default class productDetail extends React.Component{
    state={qty:1, product:{id:1, name: 'Tombow Fudenosuke Soft Tip', price: 300000, img :'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56189_1.jpg', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat congue tincidunt. Proin vestibulum nibh a eros consectetur, eu commodo nisi consectetur. Nam erat neque, posuere a congue et, venenatis sit amet turpis. Nunc interdum pellentesque elementum. Nulla at convallis leo. Integer feugiat et eros at aliquam. Etiam vehicula lectus.'}}

    kurang=()=>{
        if(this.state.qty>1){

            this.setState({qty:this.state.qty-1})
        }
    }
    tambah=()=>{
        this.setState({qty:this.state.qty+1})
     
    }

    addToCart=(id)=>{
        alert(id+' add to cart')
    }

    
    
    render(){
        var {name, price, id, desc,img} = this.state.product
        return(
            <div className='container' style={{marginTop:'70px', padding:'30px'}}>
                <div className='row'>
                    <div className='col-5'>
                        {/* <img src='https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56189_1.jpg' alt='produk ' className='img-detail mx-auto'></img> */}
                        <ContentZoom zoomPercent={160}
                        largeImageUrl={img}
                        imageUrl={img}
                        contentHeight={450}
                        contentWidth={450} />
                        
                    </div>
                    <div className='col-7 mt-auto mb-auto' >
                    
                        <h3 className='navbar-brand'>{name}</h3>
                        <p style={{fontStyle:'italic'}}><Currency quantity={price} currency="IDR"/></p>
                        <p>{desc}</p>
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