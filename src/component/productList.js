import React from 'react'
import { withRouter} from 'react-router-dom'
import Currency from 'react-currency-formatter';
import '../support/css/productList.css'
import {urlApi} from '../support/urlApi'

// import FormatCurrency from 'react-format-currency';


 class ProductList extends React.Component{
    state ={product:[]}

    toProdDetail=(id)=>{

        this.props.history.push('/product-detail/'+id);
    }

    renderProdukJsx = () => {
        if(this.state.product.length>0){
        var jsx = this.state.product.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3 border-card" onClick={()=>this.toProdDetail(val.id)}>
                <p className='border-brand'>{val.brand_name}</p>
               {
                   val.stock===0 ?
                   <div class="overlay-pict">
                   <img title={val.name} className="card-img-top gambar-list" src={urlApi+'/'+val.product_image} alt="Card" /> 
                  <div class="overlay-text">Out of Stock</div>
              </div>
                :
               
                <img title={val.name +' '+val.stock} className="card-img-top gambar-list" src={urlApi+'/'+val.product_image} alt="Card" />

               } 
               
               
               
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
    }else{
        return (
            <div>
                Product not found. Try another keyword.
            </div>
        )
    }
}

    componentDidMount(){
        // alert('masuk')
        this.setState({product:this.props.product})
    }

    componentWillReceiveProps(newProps){
        this.setState({product:newProps.product})
    }


    render(){
        return(
                <div className='row' style={{marginLeft:'40px', paddingBottom:'10px'}}>
                    {this.renderProdukJsx()}
                </div>
        )
    }
}

export default withRouter(ProductList)