import React from 'react'
import {Link} from 'react-router-dom'
import Currency from 'react-currency-formatter'
import { urlApi } from '../support/urlApi';
import Axios from 'axios';
import swal from 'sweetalert'
import {connect} from 'react-redux'

class TransactionDetail extends React.Component{
    state={transactionDetail : []}

    componentDidMount(){
        this.getTransactionDetail()
    }

    getTransactionDetail=()=>{
    //  alert(this.props.match.params.id)
        Axios.get(urlApi+'/transaction/transaction-detail/'+this.props.match.params.id)
        .then((res)=>{
            if(res.data.error){
                swal("Error", res.data.msg, "error")
            }else{
    
                this.setState({transactionDetail: res.data})
            }
        })
        .catch((err)=>console.log(err))
    }

    renderTransactionDetail=()=>{
        var data= this.state.transactionDetail.map((val)=>{
            return (
                <tr>
                    <td><img src={urlApi+'/'+val.product_image} style={{width:'100px', height:'100px'}}></img></td>
                    <td style={{float: 'left'}}>{val.name}</td>
                    <td>{val.qty}</td>
                    <td><Currency quantity={val.total} currency="IDR"/></td>
                </tr>
            )
        })
        return data
    }

    render(){
        return(
            <div className="container font" style={{ marginTop: '80px' }}>
            {/* {
            this.props.role==='admin' ?
            <Link to='/manage-transaction'><input type='button' className='tombol' value='Back To Manage Transaction'/></Link>
            : */}
            <Link to='/transaction'><input type='button' className='tombol' value='Back To Transaction'/></Link>
            
            {/* } */}
            
            <h3 style={{marginTop:'20px'}}>Transaction Detail</h3>
            <center>

                    <table className='table' style={{ width: '90%' }}>

                        <thead style={{ textAlign: 'center' }}>

                            <td colSpan={2}>Product</td>
                    
                            <td>Quantity</td>
                            <td>Total</td>
                           
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>

                            {this.renderTransactionDetail()}

                        </tbody>

                    </table>

                </center>
            
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        role : state.user.role
    }
}
export default connect(mapStateToProps)(TransactionDetail)