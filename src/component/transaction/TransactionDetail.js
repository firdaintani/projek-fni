import React from 'react'
import Currency from 'react-currency-formatter'
import { urlApi } from '../../support/urlApi';
import Axios from 'axios';
import Swal from 'sweetalert2'
import Countdown from 'react-countdown-now';
import '../../support/css/transactionDetail.css'
import { connect } from 'react-redux'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

class TransactionDetail extends React.Component {
    state = { transactionDetail: [], addressMethod: {}, selectedFile: null, modal: false }

    componentDidMount() {
        this.getTransactionDetail()
        this.getAddressDetail()

    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    valueHandler = () => {

        var value = this.state.selectedFile ? this.state.selectedFile.name : 'PICK A PICTURE'
        return value
    }
    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] })

    }

    getAddressDetail = () => {
        Axios.get(urlApi + '/transaction/address-detail/' + this.props.match.params.id)
            .then((res) => {
                if (res.data.error) {
                    Swal.fire("Error", res.data.msg, "error")
                } else {

                    this.setState({ addressMethod: res.data[0] })
                }
            })
            .catch((err) => console.log(err))

    }
    getTransactionDetail = () => {
        Axios.get(urlApi + '/transaction/transaction-detail/' + this.props.match.params.id)
            .then((res) => {
                if (res.data.error) {
                    Swal.fire("Error", res.data.msg, "error")
                } else {

                    this.setState({ transactionDetail: res.data })
                }
            })
            .catch((err) => console.log(err))
    }

    renderTransactionDetail = () => {
        var data = this.state.transactionDetail.map((val) => {
            return (
                <tr>
                    <td><img src={urlApi + '/' + val.product_image} alt='product' style={{ width: '100px', height: '100px' }}></img></td>
                    <td style={{ float: 'left' }}>{val.name}</td>
                    <td>{val.qty}</td>
                    <td><Currency quantity={val.total} currency="IDR" /></td>
                </tr>
            )
        })
        return data
    }

    UploadPayment = () => {
        if (this.state.selectedFile === null) {
            Swal.fire('Warning!',
                "Please select the picture",
                'warning')
        } else {
            Swal.fire({
                title: 'Please wait',
                onOpen: () => {
                    Swal.showLoading()
                }
            })
            var fd = new FormData()
            fd.append('payment_picture', this.state.selectedFile, this.state.selectedFile.name)
            Axios.put(urlApi + '/transaction/upload-payment/' + this.props.match.params.id, fd)
                .then((res) => {
                    if (res.data.error) {
                        Swal.close()
                        Swal.fire(
                            'Error!',
                            res.data.msg,
                            'error'
                        )
                    } else {
                        Swal.close()
                        Swal.fire(
                            'Success!',
                            'Upload Payment Picture Success! Please wait for our confirmation',
                            'success'
                        )
                        this.getAddressDetail()
                        this.getTransactionDetail()
                    }
                })
                .catch((err) => console.log(err))

        }
    }
    wrongPicture = () => {
        var id = this.props.match.params.id
        Swal.fire({
            title: 'Please wait',
            onOpen: () => {
                Swal.showLoading()
            }
        })
        Axios.put(urlApi + '/transaction/wrongpicture/' + id)
            .then((res) => {
                if (res.data.error) {
                    Swal.close()
                    Swal.fire("Error", res.data.msg, "error")
                } else {
                    Swal.close()
                    Swal.fire("Success", "Payment Canceled", "success")
                        .then((value) => {
                            this.props.history.push('/transaction')
                        });

                }
            })

    }
    cancelPayment = () => {
        // alert(id)
        var id = this.props.match.params.id
        Swal.fire({
            title: 'Please wait',
            onOpen: () => {
                Swal.showLoading()
            }
        })
        Axios.get(urlApi + '/transaction/cancel/' + id)
            .then((res) => {
                if (res.data.error) {
                    Swal.close()
                    Swal.fire("Error", res.data.msg, "error")
                } else {
                    Swal.close()
                    Swal.fire("Success", "Payment Canceled", "success")
                        .then((value) => {
                            this.props.history.push('/transaction')
                        });

                }
            })

    }
    confirmPayment = (id) => {
        Swal.fire({
            title: 'Please wait',
            onOpen: () => {
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
                        .then((value) => {
                            this.props.history.push('/transaction')
                        });

                }
            })
    }
    getTimes = () => {

        var d = new Date(this.state.addressMethod.payment_due);
        var ms = d.getTime();
        return ms - Date.now();
    }

    render() {
        var { id, total, address, province_name, postal_code, urban, sub_district, payment_picture, city, account_name, account_number, bank_pict, status, payment_due } = this.state.addressMethod
        return (
            <div className="container font" style={{ marginTop: '80px' }}>
                <center>
                    <p className='navbar-brand'>TRANSACTION DETAIL</p>
                </center>

                <div className="row">
                    <div className="col-md-5">
                        <h5 style={{ marginTop: '20px' }}>ORDER SUMMARY</h5>
                        <center>
                            <table className='table'>
                                <thead style={{ textAlign: 'center' }}>
                                    <td colSpan={2}>Product</td>

                                    <td>Quantity</td>
                                    <td>Total</td>

                                </thead>
                                <tbody style={{ textAlign: 'center' }}>

                                    {this.renderTransactionDetail()}

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', verticalAlign: 'middle' }}>Total : </td>
                                        <td></td>
                                        <td></td>
                                        <td style={{ fontWeight: 'bold', textAlign: 'right' }}>
                                            <Currency quantity={total} currency="IDR" />

                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </center>

                    </div>

                    <div className="col-md-7">

                        <h5 style={{ marginTop: '20px' }}>DELIVERY ADDRESS</h5>
                        <p>{address + ', ' + urban + ', ' + sub_district + ', ' + city + ', ' + province_name + ', ' + postal_code}</p>
                        <hr></hr>
                        <h5>PAYMENT METHOD</h5>
                        <div className='row' style={{ width: '600px', alignSelf: 'center' }}>
                            <div className="col-md-5">
                                <img src={bank_pict} alt={account_name} style={{ width: '200px' }} />

                            </div>
                            <div className="col-md-6">

                                <p>{account_name}</p>
                                <p>{account_number} </p>
                            </div>
                        </div>
                        {
                            status === 1 ?
                                <p>Payment Due : {payment_due}</p>
                                : null
                        }
                        <hr></hr>
                        <h5>PROOF OF PAYMENT</h5>
                        {
                            status === 1 ?

                                <h5 style={{ color: 'red' }}>Time Left : <Countdown date={Date.now() + this.getTimes()}>
                                    {/* <Completionist /> */}
                                </Countdown>
                                </h5> : null
                        }
                        <div>
                            {
                                payment_picture === null && this.props.role === 'user' ?
                                    <center>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type='file' ref='inputfile' style={{ display: 'none' }} onChange={this.onChangeHandler} />
                                                <input type='button' className='tombol' value={this.valueHandler()} style={{ width: '100%' }} onClick={() => this.refs.inputfile.click()} />

                                            </div>
                                            <div className="col-md-6">
                                                <input type='button' className='tombol-black' value='UPLOAD' onClick={this.UploadPayment} />
                                            </div>
                                        </div>
                                    </center>
                                    : payment_picture === null && this.props.role === 'admin' ?
                                        <p>The user has not uploaded an image</p>
                                        :
                                        <center>
                                            <a href={urlApi + '/' + payment_picture} target="_blank" rel="noopener noreferrer" title={'Click to enlarge picture'}> <img alt='payment' src={urlApi + '/' + payment_picture} className='payment-proof'></img></a>
                                        </center>
                            }
                            {
                                this.props.role === 'admin' && status === 2 ?
                                    <div style={{ marginBottom: '20px' }}>
                                        <center>
                                            <input type="button" className='tombol' value="CONFIRM PAYMENT" onClick={() => this.confirmPayment(id)} />
                                            <input type="button" className='tombol-black' value="DECLINE PAYMENT" onClick={this.toggle} style={{ marginLeft: '20px' }} />
                                        </center>
                                    </div>
                                    : null
                            }

                        </div>
                    </div>
                </div>
                {this.state.modal ?
                    <MDBContainer>

                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}>Decline Payment</MDBModalHeader>
                            <MDBModalBody>
                                <MDBBtn color="secondary" onClick={this.cancelPayment}>salah tf</MDBBtn>
                                <MDBBtn color="primary" onClick={this.wrongPicture}>gambar ga jelas</MDBBtn>
                            </MDBModalBody>

                        </MDBModal>
                    </MDBContainer>
                    : null

                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}
export default connect(mapStateToProps)(TransactionDetail)