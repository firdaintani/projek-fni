import React from 'react'
import '../support/css/productDetail.css'
// import ContentZoom from 'react-content-zoom';
import Currency from 'react-currency-formatter'
import Axios from 'axios'
import { urlApi } from '../support/urlApi'
import swal from 'sweetalert'
import { connect } from 'react-redux'
import { countCart } from '../1. action'
import { withRouter } from 'react-router-dom'
import nl2br from 'react-newline-to-break'
class ProductDetail extends React.Component {
    state = { qty: 1, product: {}, error: "", qtyCart: 0 }

    componentDidMount() {
        this.getQtyProduct()
        this.getDetail()
    }
    getQtyProduct = () => {
        Axios.get(urlApi + '/cart/qtyproduct?username=' + this.props.username + '&id=' + this.props.match.params.id)
            .then((res) => {
                if (res.data.error) {
                    swal('Error', res.data.msg, "error")
                } else {
                    if (res.data.length > 0) {
                        this.setState({ qtyCart: res.data[0].quantity })
                    }
                }
            })
    }
    getDetail = () => {

        var idUrl = this.props.match.params.id
        // alert(idUrl)
        Axios.get(urlApi + '/product/product-detail/' + idUrl)
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")
                } else {
                    var newdata = { ...res.data[0] }
                    newdata.product_image = urlApi + '/' + res.data[0].product_image
                    delete res.data[0].product_image

                    this.setState({ product: newdata })

                }
            })
    }

    kurang = () => {
        if (this.state.qty > 1) {

            this.setState({ qty: this.state.qty - 1, error: '' })
        }
    }
    tambah = () => {

        if (this.state.qty === (this.state.product.stock - this.state.qtyCart)) {
            this.setState({ error: this.state.qtyCart > 0 ? `not over the available stock. You already had ${this.state.qtyCart} pcs on cart` : "not over the available stock" })
        } else {
            this.setState({ qty: this.state.qty + 1 })

        }

    }

    addToCart = (id) => {

        if (this.props.username) {
            var newData = { username: this.props.username, product_id: id, quantity: this.state.qty }
            Axios.post(urlApi + '/cart/add', newData)
                .then((res) => {
                    if (res.data.error) {
                        swal("Error", res.data.msg, "error")
                    } else {
                        this.props.countCart(this.props.username)
                        this.getQtyProduct()
                        swal("Success", "Product has been added to cart", "success")
                    }
                })


        }
        else {
            swal("Warning!", "You need to login!", "warning")
                .then((willLogin) => {
                    if (willLogin) {

                        this.props.history.push('/login');
                    }
                });


        }
    }



    render() {
        var { name, price, id, description, product_image, stock, discount } = this.state.product
        return (
            <div className='container' style={{ marginTop: '70px', padding: '30px' }}>
                <div className='row'>
                    <div className='col-4'>
                        <center>
                            {/* <p  onClick={()=>alert(typeof(this.state.image))}>asa</p> */}
                            <img src={product_image} alt='produk ' className='product-image-detail mx-auto'></img>

                        </center>
                    </div>
                    <div className='col-8 mt-auto mb-auto' >

                        <h3 className='navbar-brand' style={{ whiteSpace: 'normal' }}>{name}</h3><br></br>
                        {
                            discount > 0 ?

                                <p style={{ textDecoration: 'line-through', color: 'red', display: 'inline' }}><Currency quantity={price} currency="IDR" /></p>

                                : null

                        }
                        <p style={{ fontStyle: 'italic', display: 'inline' }}> <Currency quantity={price - (price * (discount / 100))} currency="IDR" /></p>

                        <p>Stock : {stock}</p>
                        <p >{nl2br(description)}</p>
                        <div className='row'>
                            <div className='col-5'>
                                <div className='row'>
                                    <div className='col-3'>
                                        <i className="fas fa-minus" onClick={this.kurang} style={{ cursor: 'pointer' }}></i>
                                    </div>
                                    <div className='col-6' style={{ textAlign: "center", marginLeft: '-30px' }} >
                                        <span>{this.state.qty}</span>

                                    </div>
                                    <div className='col-3'>
                                        <i className="fas fa-plus" onClick={this.tambah} style={{ cursor: 'pointer' }}></i>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <hr style={{ width: '215px', marginLeft: 0, borderTop: '2px black solid' }}></hr>
                        <p style={{ color: 'red' }}>{this.state.error}</p>

                        {
                            stock === 0 ?
                                <input type='button' className='tombol-disabled disabled' value='ADD TO CART'></input>
                                :
                                <input type='button' className='tombol' style={{ width: '215px' }} value='ADD TO CART' onClick={() => this.addToCart(id)}></input>

                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default withRouter(connect(mapStateToProps, { countCart })(ProductDetail))