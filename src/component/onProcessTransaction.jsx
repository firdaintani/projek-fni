import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import cookie from 'universal-cookie'
import PageNotFound from './pageNotFound';
const objCookie = new cookie()

class OnProcessTransaction extends React.Component {
    state = { transaction: [] }

    componentDidMount() {
        this.getDataTransaction()
    }
    getDataTransaction = () => {
        if (this.props.role === 'admin') {
            Axios.get(urlApi + '/transaction/onprocessall')
                .then((res) => {
                    if (res.data.error) {
                        Swal.fire("Error", res.data.msg, "error")
                    } else {
                        this.setState({ transaction: res.data })
                    }
                })
                .catch((err) => console.log(err))

        }
        else {
            Axios.get(urlApi + '/transaction/onprocess?username=' + this.props.username)
                .then((res) => {
                    if (res.data.error) {
                        Swal.fire("Error", res.data.msg, "error")
                    } else {

                        this.setState({ transaction: res.data })
                    }
                })

                .catch((err) => console.log(err))

        }
    }

    renderDataTransaction = () => {

        var data = this.state.transaction.map((val) => {
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.order_date}</td>
                    <td>{val.total}</td>
                    {
                        this.props.role === 'admin' ?
                            <td><a href={urlApi + '/' + val.payment_picture} target="_blank" rel="noopener noreferrer" title={'Click to enlarge picture'}><img src={urlApi + '/' + val.payment_picture} style={{ width: '70px', height: '70px', cursor: 'pointer' }}></img></a></td> : null
                    }

                    <td><Link to={'/transaction-detail/' + val.id}><input type="button" className='tombol' value="DETAIL" /></Link></td>
                    {
                        this.props.role === 'admin' ?
                            <td><input type="button" className='tombol' value="CONFIRM" onClick={() => this.confirmPayment(val.id)} /></td> : null
                    }
                    {
                        this.props.role === 'admin' ?
                            <td><input type="button" className='tombol' value="CANCEL"  onClick={() => this.cancelPayment(val.id)} /></td> : null
                    }
                </tr>
            )
        })
        return data
    }
    cancelPayment = (id)=>{
        // alert(id)
        Swal.fire({
            title:'Please wait', 
            onOpen :() =>{
                Swal.showLoading()
            }
        })
        Axios.put(urlApi + '/transaction/cancel/' + id)
            .then((res) => {
                if (res.data.error) {
                    Swal.close()
                    Swal.fire("Error", res.data.msg, "error")
                } else {
                    Swal.close()
                    Swal.fire("Success", "Payment Canceled", "success")
                    this.setState({ transaction: res.data })
                }
            })
    
    }
    confirmPayment = (id) => {
        Swal.fire({
            title:'Please wait', 
            onOpen :() =>{
                Swal.showLoading()
            }
        })
        Axios.put(urlApi + '/transaction/confirm/' + id)
            .then((res) => {
                if (res.data.error) {
                    Swal.close()
                    Swal.fire("Error", res.data.msg, "error")
                } else {
                    Swal.close()
                    Swal.fire("Success", "Payment Confirmation Success. Data moved to Finished Transaction", "success")
                    this.setState({ transaction: res.data })
                }
            })
    }

    render() {
        if (objCookie.get('username') === undefined) {
            return <PageNotFound />
        }
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                <center>

                    <table className='table' style={{ width: '90%' }}>

                        {
                            this.props.role === 'user' ?

                                <thead style={{ textAlign: 'center' }}>

                                    <td>Order ID</td>
                                    <td>Order Date</td>
                                    <td>Total Payment</td>
                                    <td></td>
                                </thead>
                                : this.props.role === 'admin' ?

                                    <thead style={{ textAlign: 'center' }}>

                                        <td>Order ID</td>
                                        <td>Order Date</td>
                                        <td>Total Payment</td>
                                        <td>Payment Picture</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        

                                    </thead> : null


                        }

                        <tbody style={{ textAlign: 'center' }}>

                            {this.renderDataTransaction()}

                        </tbody>

                    </table>

                </center>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        role: state.user.role
    }
}

export default connect(mapStateToProps)(OnProcessTransaction)
