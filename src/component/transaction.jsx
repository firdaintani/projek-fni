import React from 'react'
import Currency from 'react-currency-formatter';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import {connect} from 'react-redux'
import swal from 'sweetalert';
import cookie from 'universal-cookie'
import PageNotFound from './pageNotFound';
import {withRouter} from 'react-router-dom'

const objCookie = new cookie()
class Transaction extends React.Component {
    state = { transactionList: [], openDetail: false }
    
    // componentDidMount(){
    //     this.getDataTransaction()
    // }

    componentDidMount(){
        alert('masuk')
        if(this.props.dataTransaction)
       this.setState({transactionList:this.props.dataTransaction})
       
    }

    componentWillReceiveProps(newProps){

        this.setState({transactionList:newProps.dataTransaction})
        }

    // getDataTransaction=()=>{
    //     alert(this.props.linkUrl)
    //     if(this.props.location.search){
    //         alert(this.props.linkUrl)
    //     }else{
    //         Axios.get(urlApi+'/transaction/data?username='+this.props.username)
    //         .then((res)=>{
    //             if(res.data.error){
    //                 swal("Error", res.data.msg, "error")
    //             }else{
    //                 this.setState({transactionList: res.data})
    //             }
    //         })
    //         .catch((err)=>console.log(err))
    
    //     }
    // }
    
    renderTransaction = () => {
        var data = this.state.transactionList.map((val) => {
           
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.order_date}</td>
                    <td><Currency quantity={val.total} currency="IDR"/></td>
                    <td>{val.payment_due}</td>
                  <Link to={'/transaction-detail/'+val.id}><td><input type='button' className='tombol' value='DETAIL' /></td></Link>  
               
               
             </tr>
            )
        })
        return data
    }
    render() {
        if(objCookie.get('username')===undefined){
            return <PageNotFound/>
        }
        return (
            <div className="container font" style={{ marginTop: '20px' }}>
                <center>

                    <table className='table'>

                        <thead style={{ textAlign: 'center' }}>

                            <td>Order ID</td>
                            <td>Order Date</td>
                            <td>Total Payment</td>
                            <td>Payment Due</td>
                            
                            <td></td>
                            {/* <td></td> */}
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

export default withRouter(connect(mapStateToProps)(Transaction))