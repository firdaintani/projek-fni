import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import swal from 'sweetalert2'
import Loader from 'react-loader-spinner'
import Currency from 'react-currency-formatter'
class Checkout2 extends React.Component {
    state = { data : {}, getData: false }
    componentDidMount() {
        this.getTotal()
        
    }

    getTotal = () => {
      
        var id = this.props.match.params.id
        // alert(id)
        Axios.get(urlApi + '/transaction/total/' + id)
            .then((res) => {
                if (res.data.error) {
                    swal.fire("Error", res.data.msg, "error")
                } else {
                    
                    this.setState({ data:res.data[0], getData: true })

                }
            })
            .catch((err) => console.log(err))

    }
    render() {
        // var {total, payment_due, account_name, account_number, bank_pict} = this.state.data.data
        if (this.state.getData) {
            return (
                <div className="container" style={{ marginTop: '80px' }}>
                    {/* <h1>Checkout Success</h1> */}
                    <center>
                        <div style={{ marginTop: '100px' }}>
                            <p>TOTAL PAYMENT :</p>
                            <h3><Currency quantity={this.state.data.total} currency="IDR" /></h3>
                            <p style={{ fontSize: '21px', paddingTop: "20px" }}>PAYMENT DETAILS</p>
                                    
                            <div className='row' style={{ width: '600px', alignSelf:'center' }}>
                                <div className="col-md-6">
                                    <img src={this.state.data.bank_pict} alt={this.state.data.account_name} style={{ width: '200px'}} />

                                </div>
                                <div className="col-md-6">

                                    <p>ACCOUNT NAME : {this.state.data.account_name}</p>
                                    <p>ACCOUNT NO. {this.state.data.account_number} </p>

                                </div>
                            </div>
                            <p style={{ fontWeight: 'bold' }}>Pay and upload your proof of payment before {this.state.data.payment_due}</p>

                        </div>
                    </center>

                    <div style={{ border: '1px solid black' }}>
                        <h5 style={{ padding: '10px' }}>INFORMATION</h5>
                        <ul>
                            <li>You can pay a maximum of 2 x 24 hours from the time you checkout.</li>
                            <li>After making a payment, it is required to upload proof of payment.</li>
                            <li>If you don't pay after 2x24 hours, the transaction will be canceled.</li>

                        </ul>
                    </div>
                </div>
            )

        }
        return (
            <div>
                <center>
                    <Loader
                        type="ThreeDots"
                        color="#000000"
                        height="300"
                        width="300"
                    />
                </center>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        total: state.totalPayment.total
    }
}



export default connect(mapStateToProps)(Checkout2)