import React from 'react'
import Currency from 'react-currency-formatter';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import {connect} from 'react-redux'
import swal from 'sweetalert';

class Transaction extends React.Component {
    state = { transactionList: [], openDetail: false }
    
    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction=()=>{
        Axios.get(urlApi+'/transaction/data?username='+this.props.username)
        .then((res)=>{
            if(res.data.error){
                swal("Error", res.data.msg, "error")
            }else{
                this.setState({transactionList: res.data})
            }
        })
        .catch((err)=>console.log(err))
    }
    
    renderTransaction = () => {
        var data = this.state.transactionList.map((val) => {
           
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.order_date}</td>
                    <td><Currency quantity={val.total} currency="IDR"/></td>
                    <td>{val.status === 0 ? 'Havent pay' : 'Paid'}</td>
                  <Link to={'/transaction-detail/'+val.id}><td><input type='button' className='tombol' value='DETAIL' /></td></Link>  
                </tr>
            )
        })
        return data
    }
    render() {
        return (
            <div className="container font" style={{ marginTop: '80px' }}>
                <center>

                    <table className='table' style={{ width: '90%' }}>

                        <thead style={{ textAlign: 'center' }}>

                            <td>Order ID</td>
                            <td>Order Date</td>
                            <td>Total Payment</td>
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

const mapStateToProps=(state)=>{
    return {
        username : state.user.username
    }
}

export default connect(mapStateToProps)(Transaction)