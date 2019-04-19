import React from 'react'
import { Link } from 'react-router-dom'
import Currency from 'react-currency-formatter'
import { urlApi } from '../../support/urlApi';
import Axios from 'axios';
import swal from 'sweetalert'

class ManageTransaction extends React.Component {
    state = { transactionList: [], isEdit: false, idEdit: 0 }
    componentDidMount() {
        this.getTransaction()
    }

    getTransaction = () => {
        Axios.get(urlApi + '/transaction/all')
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")
                } else {
                    this.setState({ transactionList: res.data })
                }
            })
            .catch((err) => console.log(err))
    }

    saveBtn=()=>{
        var status = this.refs.status.value
        // alert(status)
        Axios.put(urlApi+'/transaction/update/'+this.state.idEdit, {status})
        .then((res) => {
            if (res.data.error) {
                swal("Error", res.data.msg, "error")
            } else {
                
                swal("Success", "Edit status success", "success")
                this.setState({ transactionList: res.data })
            }
        })
        .catch((err) => console.log(err))
    }

    renderTransaction = () => {
        var data = this.state.transactionList.map((val) => {

            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.order_date}</td>
                    <td><Currency quantity={val.total} currency="IDR" /></td>
                    {
                        this.state.idEdit === val.id ?
                            <td>
                                <select ref='status'>
                                    <option value={0}>Havent Pay</option>
                                    <option value={1}>Paid</option>

                                </select>
                            </td>
                            :
                            <td>{val.status === 0 ? 'Havent pay' : 'Paid'}</td>

                    }
                    {
                        this.state.idEdit === val.id ?

                            <td><input type='button' className='tombol' value='SAVE' onClick={this.saveBtn} />
                                <input type='button' style={{ marginLeft: '20px' }} className='tombol' value='CANCEL' onClick={() => { this.setState({ idEdit: 0 }) }} />
                            </td>

                            :
                            <td><input type='button' className='tombol' value='EDIT' onClick={() => this.setState({ isEdit: true, idEdit: val.id })} />
                                <Link to={'/transaction-detail/' + val.id}><input style={{ marginLeft: '20px' }} type='button' className='tombol' value='DETAIL' /></Link>
                            </td>

                    }
                    {/* <Link to={'/transaction-detail/' + val.id}><td><input type='button' className='tombol' value='DETAIL' /></td></Link> */}
                </tr>
            )
        })
        return data
    }

    render() {
        return (
            <div className="container" style={{ marginTop: '70px' }}>
                <h3>Manage Transaction</h3>
                <Link to='/finished-transaction'><input type='button' className='tombol' value='Finished Transaction' style={{ float: 'right', marginBottom: '30px' }} /></Link>

                <center>

                    <table className='table' style={{ width: '90%' }}>

                        <thead style={{ textAlign: 'center' }}>

                            <td>ID Order</td>
                            <td>Order Date</td>
                            <td>Total</td>
                            <td>Status</td>
                            <td></td>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>

                            {this.renderTransaction()}

                        </tbody>

                    </table>

                </center>


            </div>
        )
    }
}

export default ManageTransaction