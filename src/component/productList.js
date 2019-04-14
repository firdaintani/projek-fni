import React from 'react'
import {Link} from 'react-router-dom'
import Currency from 'react-currency-formatter';
import '../support/css/productList.css'
// import FormatCurrency from 'react-format-currency';


export default class ProductList extends React.Component{
    state ={category : '', product:[
        {id:1,name:"Artline Stix",img:'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/9/9/1325149/1325149_d8cbf445-f019-4f55-850a-3044117d7f62.jpg',price:10000,brand:'Tombow', discount:20},
        {id:2,name:"Artline Stix Set",img:'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/8/27/6464162/6464162_df32b645-8ffc-4fcd-8ed2-0800aae57591_600_600.jpg',price:105000,brand:'Tombow',discount:10},
        {id:3,name:"Tombow Dual Brush Pen Set 10 Bright",img:'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/333709043F1F47B1847DC3347F0D435C/10514323.jpg?fit=inside|540:540',price:370000,brand:'Tombow',discount:20},
        {id:4,name:"Tombow Dual Brush Pen Set 10 Pastel",img:'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56187_1.jpg',price:370000,brand:'Tombow',discount:30},
        {id:5,name:"Tombow Dual Brush Pen Set 10 Tropical",img:'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56189_1.jpg',price:370000,brand:'Tombow',discount:10},
        {id:6,name:"Tombow Dual Brush Pen Set 10 Muted",img:'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56186_1.jpg',price:370000,brand:'Tombow',discount:0},
        {id:7,name:"Tombow Dual Brush Pen Set 10 Primary",img:'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56167_1_2.jpg',price:370000,brand:'Tombow',discount:10}
    ]}

    fnRedirect=(name)=>{
        return (
            <Link to='/product-detail'></Link>
        )
    }
    renderProdukJsx = () => {
        var jsx = this.state.product.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3 border-card" style={{width: '18rem'}} onClick={()=>this.fnRedirect(val.name)}>
                <p style={{textAlign:'center',marginTop:'20px'}} className='border-brand'>{val.brand}<i class="fas fa-cart-plus icon-add-cart" onClick={()=>alert('add to cart'+ val.id)}></i></p>
                    <Link to={'/product-detail/'}><img title={val.name} className="card-img-top gambar-list" src={val.img} alt="Card" /></Link>
                    {   
                        val.discount > 0 ?
                        <div className='discount-triangle'>
                        <div className='discount'>{val.discount}%</div>
                        </div>
                        : null
                    }

                    <div className="card-body">
                    <h4 className="card-text" style={{height:'30px',fontSize:'17px',textAlign:'center'}}>{val.name}</h4>
                  <div style={{textAlign:'center'}}>
                    {/* {
                        val.discount > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}><Currency quantity={val.price} currency="IDR"/>
                        </p>
                        : null
                    } */}

                    <p style={{fontWeight:'500', marginTop:'18px'}}><Currency quantity={val.price - (val.price*(val.discount/100))} currency="IDR" /></p>
                    </div>
                    {/* <p style={{textAlign:'center', paddingTop:'10px',fontWeight:'500'}}>
                    <Currency quantity={val.price} currency="IDR"/>
                    </p> */}
                    {/* <Link to={'/product-detail/' + val.id}><input type='button' className='tombol' value='Add To Cart' /></Link> */}
                    </div>
                </div>
            )
        })

        return jsx
    }

    componentDidMount(){
       
        this.setState({category:this.props.category})
    }

    componentWillReceiveProps(newProps){
        // alert('masukwilrec')
        this.setState({category:newProps.category})
    }


    render(){
        return(
            <div>
                {this.state.category}
                {/* <Link to='/product-detail'><input type='button' className='tombol' value='product view'/></Link> */}
                <div className='row justify-content-center'>
                    {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}