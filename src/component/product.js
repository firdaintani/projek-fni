import React from 'react'
import {Link} from 'react-router-dom'
import ProductList from './productList'
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
import queryString from 'query-string';
import '../support/css/product.css';
// import SideBar from 'react-fixed-sidebar';

export default class Product extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          category:[{id:1,link:'all',title:'All'},{id:2,link:'brush-pen',title:'Brush Pen'},
          {id:3,link:'drawing-pen',title:'Drawing Pen'},
          {id:4,link:'watercolor-paper',title:'Watercolor Paper'},
          {id:5,link:'watercolor',title:'Watercolor'},
          {id:6,link:'brush-paint',title:'Brush Paint'}],
          cat: '', id: 'category1'
        };
      }
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    
    // state={category:[{link:'all',title:'All'},{link:'brush-pen',title:'Brush Pen'},
    // {link:'drawing-pen',title:'Drawing Pen'},
    // {link:'watercolor-paper',title:'Watercolor Paper'},
    // {link:'watercolor',title:'Watercolor'},
    // {link:'brush-paint',title:'Brush Paint'}]}

    changeActive=(id)=>{
        // var titles= title
        // alert(this.refs.watercolor.className)
        // alert(id)
        // this.refs.id.className+='active'
        // var d = this.state.id
        this.textInput.className+='active'
    }

    renderCategory=()=>{
        var data = this.state.category.map((val,index)=>{
            // var reflink = 'category'+val.id
            return (
                <Link to={val.link} className='text-link font ' ><div ref={(div) => {this.reflink = div}} >{val.title}</div></Link>

            )
        })
        return data
    }

    componentDidMount(){
        this.getCat()
    }
    getCat=()=>{
        var cat = this.props.match.params.category
        this.setState({cat})
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
               
                    {this.getProps()}
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