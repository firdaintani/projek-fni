import React from 'react'
import {Link} from 'react-router-dom'
import ProductList from './productList'
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
import queryString from 'query-string';
import '../support/css/product.css';
import '../support/css/productList.css'

import {withRouter} from 'react-router-dom'

import Currency from 'react-currency-formatter';
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import swal from 'sweetalert';

class Product extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          dropdownOpen: false,
          category:[{id:1,link:'all',title:'All'},{id:2,link:'brush-pen',title:'Brush Pen'},
          {id:3,link:'drawing-pen',title:'Drawing Pen'},
          {id:4,link:'watercolor-paper',title:'Watercolor Paper'},
          {id:5,link:'watercolor',title:'Watercolor'},
          {id:6,link:'brush-paint',title:'Brush Paint'}],
          cat: '', id: 'category1',
          product:[
            ]
        };
      }
    


    changeActive=(id)=>{
       
        this.textInput.className+='active'
    }

    renderCategory=()=>{
        var data = this.state.category.map((val,index)=>{
          
            return (
                <Link to={val.link} className='text-link font ' ><div ref={(div) => {this.reflink = div}} >{val.title}</div></Link>

            )
        })
        return data
    }

    componentDidMount(){
        this.getCat()
        this.getProductList()
    }

    getProductList=()=>{
        Axios.get(urlApi+'/product/product-list')
        .then((res)=>{
            if(res.data.error){
                swal("Error", res.data.msg,"error")

            }else{
                this.setState({product : res.data})
            }
        })
        .catch((err)=>console.log(err))
    }

    getCat=()=>{
        var cat = this.props.match.params.category
        this.setState({cat})
    }

    toProdDetail=(id)=>{

        this.props.history.push('/product-detail/'+id);
    }
    

    getProps=()=>{
        var cat = this.props.match.params.category
        let url = this.props.location.search;
        if(url){
            let params = queryString.parse(url);
            // alert(url)
            console.log(url)
            console.log(params)
            // alert(params.sortby)
        }else{
            // alert('Gaada')

        }


        
       return (
           <ProductList category={cat}/>
       )
    }

    renderProdukJsx = () => {
        var jsx = this.state.product.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3 border-card" style={{width: '18rem'}} onClick={()=>this.toProdDetail(val.id)}>
                {/* <p style={{textAlign:'center',marginTop:'20px'}} className='border-brand'>{val.brand_name}<i class="fas fa-cart-plus icon-add-cart" onClick={()=>alert('add to cart'+ val.id)}></i></p> */}
                <p style={{textAlign:'center',marginTop:'20px'}} className='border-brand'>{val.brand_name}</p>
                
                    <img title={val.name} className="card-img-top gambar-list" src={urlApi+'/'+val.product_image} alt="Card" />
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


    render(){
        return(
            <div className='row' style={{marginTop:'70px', paddingTop:'10px',display: "flex", alignItems: "flex-start" }}>
                <div className='col-9' style={{overflow: 'auto'}}>
                    <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            {/* <select>
                                <option disabled selected hidden style={{border:'none', borderBottom:'1px solid black'}}>Sort by</option>

                                <option>Price</option>
                            </select> */}
                           
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                    {this.renderProdukJsx()}
                </div>
                    {/* {this.getProps()} */}
                    </div>
                </div>
                <div className='col-3' style={{height:'100%',borderLeft:'2px solid black', position:"fixed", right:0}}>
                    <div><h4 className='title-text'>Categories</h4></div>
                    {this.renderCategory()}
                    <div style={{marginTop:'50px'}}></div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                        Sort by
                        </DropdownToggle>
                        <DropdownMenu>
                        <Link to={'/product/'+this.props.match.params.category+'?sortby=date-asc'}><DropdownItem>Date, new to old</DropdownItem></Link>
                        <Link to={'/product/'+this.props.match.params.category+'?sortby=date-desc'}><DropdownItem>Date, old to new</DropdownItem></Link>
                        <Link to={'/product/'+this.props.match.params.category+'?sortby=name-asc'}><DropdownItem>Product Name, A to Z</DropdownItem></Link>
                        <Link to={'/product/'+this.props.match.params.category+'?sortby=name-desc'}><DropdownItem>Product Name, Z to A</DropdownItem></Link>
                        <Link to={'/product/'+this.props.match.params.category+'?sortby=price-asc'}><DropdownItem>Price, low to high</DropdownItem></Link>
                        <Link to={'/product/'+this.props.match.params.category+'?sortby=price-desc'}><DropdownItem>Price, high to low</DropdownItem></Link>

                        </DropdownMenu>
                    </Dropdown>
                    {/* <div className="row">
                    <div className="col mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... "  />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" id="button-addon2" ><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                        <div className="card p-2">
                            
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  -1">Cari Produk</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Toko</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Toko"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari User</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari User"></input> 

                                <button className="btn btn-info"><i class="fas fa-filter"></i> Filter</button>                               
                            </form>

                        </div>
                        
                    </div>
                
                
                </div> */}
                <div className="row">
                    <div className="col mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control outline-none" placeholder="Masukkan kata kunci ... "  />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" id="button-addon2" ><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                    </div>
                </div>
                <h5 className='mt-5'>Filter by price</h5>

                <div className="row">
                    <div className="col-5 mt-1">
                    <input type='number' className='form-control outline-none' placeholder='min'></input>
                    </div>
                    <div className='col-2 mb-auto mt-auto'>
                    <center>
                    <h4>-</h4>
                    </center>
                    </div>
                    <div className='col-5 mt-1'>
                    <input type='number' className='form-control outline-none' placeholder='max'></input>
                    </div>

                </div>
                <div className='row mt-4 font'>
                    <div className='col'>
                    <input type='button'  style={{width:'100%'}} className='tombol' value='FILTER'/>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(Product)