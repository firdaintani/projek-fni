import React from 'react'
// import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import ProductList from './productList'
import queryString from 'query-string';
import '../support/css/product.css';
import '../support/css/productList.css'

import { withRouter } from 'react-router-dom'

import Currency from 'react-currency-formatter';
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import swal from 'sweetalert';

class Product extends React.Component {
    state = {
        product: [], getData: false, catSearch: '', category: [], searchKey: '', brand: [],
        sortOption: [{ value: 'none', name: "Most Relateable" }, { value: 'data-desc', name: "Date, new to old" },
        { value: 'date-asc', name: "Date, old to new" }, { value: 'name-asc', name: "Product Name, A to Z" }, { value: 'name-desc', name: "Product Name, Z to A" }, { value: 'price-asc', name: "Price, low to high" }, { value: 'price-desc', name: "Price, high to low" }]
    }



    componentDidMount() {

        this.getCategory()
        this.getBrand()
        this.getProductList()
    }


    getCategory = () => {
        Axios.get(urlApi + '/category/all')
            .then((res) => {
                if (res.data.error) {
                    swal.fire("Error", res.data.msg, 'error')
                } else {
                    this.setState({ category: res.data })
                }
            })
            .catch((err) => console.log(err))


    }


    getBrand = () => {
        Axios.get(urlApi + '/brand/all')
            .then((res) => {
                if (res.data.error) {
                    swal.fire("Error", res.data.msg, 'error')
                } else {
                    this.setState({ brand: res.data })
                }
            })
            .catch((err) => console.log(err))


    }


    getProductList = () => {

        if (this.props.location.search) {
            var newLink = this.getLink()
            Axios.get(urlApi + newLink)
                .then((res) => {
                    if (res.data.error) {
                        swal("Error", res.data.msg, "error")

                    } else {
                        // alert('masuk')
                        this.setState({ product: res.data, searchKey: newLink, getData: true })
                    }
                })
                .catch((err) => console.log(err))
        } else {

            Axios.get(urlApi + '/product/all')
                .then((res) => {
                    if (res.data.error) {
                        swal("Error", res.data.msg, "error")

                    } else {
                        this.setState({ product: res.data, getData: true })
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    getLink = () => {
        let params = queryString.parse(this.props.location.search);
        var newLink = `/product/search`
        var link = []
        if (params.key) {

            link.push({
                params: 'key',
                value: params.key
            })

        }

        if (params.category) {

            link.push({
                params: 'category',
                value: params.category
            })

        }
        if (params.brand) {

            link.push({
                params: 'brand',
                value: params.brand
            })

        }
        if (params.price_min) {

            link.push({
                params: 'price_min',
                value: params.price_min
            })

        }
        if (params.price_max) {

            link.push({
                params: 'price_max',
                value: params.price_max
            })

        }
        if (params.sortby) {
            link.push({
                params: 'sortby',
                value: params.sortby
            })
        }

        for (var i = 0; i < link.length; i++) {
            if (i === 0) {
                newLink += '?' + link[i].params + '=' + link[i].value
            } else {
                newLink += '&' + link[i].params + '=' + link[i].value
            }
        }
        //   this.props.history.push(newLink)
        //   alert(urlApi+newLink)
        return newLink
    }

    pushUrl = () => {
        var searchKeyword = this.refs.searchKeyword.value
        var category_id = this.refs.selectCategory.value
        var brand_id = this.refs.selectBrand.value
        var price_min = this.refs.priceMin.value
        var price_max = this.refs.priceMax.value

        var sortby = this.refs.sortOption.value
        // alert(sortby)
        var newLink = `/product/search`
        var params = []
        if (searchKeyword) {
            params.push({
                params: 'key',
                value: searchKeyword
            })
        }
        if (category_id > 0) {
            params.push({
                params: 'category',
                value: category_id
            })
        }
        if (brand_id > 0) {
            params.push({
                params: 'brand',
                value: brand_id
            })
        }
        if (price_min) {
            params.push({
                params: 'price_min',
                value: price_min
            })
        }
        if (price_max) {
            params.push({
                params: 'price_max',
                value: price_max
            })
        }
        if (sortby !== 'none') {
            params.push({
                params: 'sortby',
                value: sortby
            })
        }
        for (var i = 0; i < params.length; i++) {
            if (i === 0) {
                newLink += '?' + params[i].params + '=' + params[i].value
            } else {
                newLink += '&' + params[i].params + '=' + params[i].value
            }
        }

        this.props.history.push(newLink)
        this.setState({ searchKey: newLink })
        return newLink
    }


    renderCategory = () => {
         var data = this.state.category.map((val) => {
            // alert(typeof(params.category)+' and '+typeof(val.id))
            
            return (
                <option value={val.id}>{val.category_name}</option>
            )
        })
        return data
    }

    renderBrand = () => {
        var data = this.state.brand.map((val) => {
           
            return (
                <option value={val.id}>{val.brand_name}</option>
            )
        })
        return data
    }

    selectBrand = () => {
        var category = this.refs.selectCategory.value
        if (category !== "none") {
            Axios.get(urlApi + '/brand/selectbrand?category_id=' + category)
                .then((res) => {
                    if (res.data.error) {
                        swal("Error", res.data.msg, "error")

                    } else {
                        this.setState({ brand: res.data })
                    }
                })
                .catch((err) => console.log(err))

        } else {
            this.getBrand()
        }
    }



    filterBtn = () => {
        var newLink = this.pushUrl()
        this.setState({ getData: false })
        Axios.get(urlApi + newLink)
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")

                } else {

                    // alert(res.data.length + newLink)
                    this.setState({ product: res.data, searchKey: newLink, getData: true })
                    // alert(this.state.product.length)  
                }
            })
            .catch((err) => console.log(err))
        // alert(searchKeyword+category_id+brand_id+price_min+price_max) 

    }

    sortOption = () => {
        var newLink = ''
        var sortOption = this.refs.sortOption.value
        var urlParams = new URLSearchParams(this.props.location.search);
        var splitLink = urlParams.toString().split('&')
                    
        if (sortOption !== "none") {


            if (this.props.location.search) {


                if (urlParams.has('sortby')) {
                    if (urlParams.toString().includes('&')) {
                        // var splitLink = urlParams.toString().split('&')
                        splitLink.pop()
                        newLink = '/product/search?' + splitLink.join('&') + '&sortby=' + sortOption
                        // alert(newLink)
                    }
                    else {
                        newLink = '/product/search?sortby=' + sortOption
                        // alert(newLink)
                    }

                } else {
                    newLink = this.state.searchKey + '&sortby=' + sortOption
                }
            } else if (sortOption !== "none") {
                newLink = '/product/search?sortby=' + sortOption
            }
        } else if (sortOption === "none") {

            if (urlParams.has('sortby')) {
                if (urlParams.toString().includes('&')) {
                    splitLink.pop()
                    newLink = '/product/search?' + splitLink.join('&')
                    // alert(newLink)
                }
                else {
                    newLink = '/product/all'
                }

            }
        }
        this.props.history.push(newLink)
        this.setState({ searchKey: newLink })
        this.getData(newLink)
    }

    getData = (newLink) => {
        this.setState({ getData: false })

        Axios.get(urlApi + newLink)
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")

                } else {

                    // alert(res.data.length + newLink)
                    this.setState({ product: res.data, searchKey: newLink, getData: true })
                    // alert(this.state.product.length)  
                }
            })
            .catch((err) => console.log(err))

    }

    getOption = () => {
        var params = queryString.parse(this.props.location.search);
      
        var data = this.state.sortOption.map((val) => {
            if(params.sortby===val.value){
                return (
                    <option value={val.value} selected>{val.name}</option>
                )
    
            }
            return (
                <option value={val.value}>{val.name}</option>
            )
        })
        return data
    }
    render() {
        return (
            <div className='row' style={{ marginTop: '70px', paddingTop: '10px', display: "flex", alignItems: "flex-start" }}>
                <div className='col-9' style={{ overflow: 'auto' }}>
                    <div className='container'>
                        <div>
                            <p style={{ display: 'inline' }}>Sort : </p>
                            <select className="form-control" style={{ display: 'inline', width: '25%' }} ref='sortOption' onChange={this.sortOption}>
                                {this.getOption()}

                            </select>
                        </div>
                        {/* <div className='row justify-content-center'> */}
                        {/* {this.renderProdukJsx()} */}
                        {
                            this.state.getData ?
                                <ProductList product={this.state.product} />
                                :
                                <div>
                                    <center>
                                        <Loader
                                            type="ThreeDots"
                                            color="#000000"
                                            height="300"
                                            width="300"
                                        />
                                    </center>
                                </div>

                        }

                        {/* </div> */}
                    </div>
                </div>
                <div className='col-3' style={{ height: '100%', borderLeft: '2px solid black', position: "fixed", right: 0 }}>
                    <div><h4 className='title-text'>FILTER</h4></div>
                    <p>Keyword : </p>
                    <input style={{marginTop:'-18px'}} type="text" ref="searchKeyword" className="form-control outline-none" placeholder="type the product name..." />


                    <div>
                        <p style={{ display: 'inline' }}>Category : </p>
                        <select className="form-control" ref='selectCategory' style={{ width: '100% !important' }} onChange={this.selectBrand}>
                            <option value="none">All Category</option>
                            {this.renderCategory()}
                        </select>
                    </div>
                    <div>
                        <p style={{ display: 'inline' }}>Brand : </p>
                        <select className="form-control" style={{ width: '100% !important' }} ref='selectBrand'>
                            <option value='none'>All Brand</option>
                            {this.renderBrand()}
                        </select>
                    </div>
                    {/* <h5 className='mt-5'>Filter by price</h5> */}

                    <p>Price : </p>
                    <div className="row" style={{marginTop:'-20px'}}>

                        <div className="col-5 mt-1">
                            <input type='number' ref='priceMin' className='form-control outline-none' placeholder='min (Rp)' ></input>
                        </div>
                        <div className='col-2 mb-auto mt-auto'>
                            <center>
                                <h4>-</h4>
                            </center>
                        </div>
                        <div className='col-5 mt-1'>
                            <input type='number' ref='priceMax' className='form-control outline-none' placeholder='max (Rp)' ></input>
                        </div>

                    </div>
                    <div className='row mt-4 font'>
                        <div className='col'>
                            <input type='button' style={{ width: '100%' }} className='tombol' value='FILTER' onClick={this.filterBtn} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Product)