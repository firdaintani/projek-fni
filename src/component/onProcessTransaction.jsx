import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import cookie from 'universal-cookie'
import PageNotFound from './pageNotFound';
import Currency from 'react-currency-formatter';

const objCookie = new cookie()

class OnProcessTransaction extends React.Component {
    state = { transaction: [] }

    componentDidMount() {
        if(this.props.linkUrl){         
            this.getTransaction(this.props.linkUrl+'&s=2')
        }else{
            this.getTransaction('/transaction/search?s=2')
        }   
     }

  

    componentWillReceiveProps(newProps){
           if(newProps.linkUrl){
        
            this.getTransaction(newProps.linkUrl+'&s=2')
        }else{
            this.getTransaction('/transaction/search?s=2')

        }   
        }

    getTransaction = (link) => {
        // alert(link)
      if(this.props.role==='user'){
          link +=`&u=${this.props.username}`
      }

        Axios.get(urlApi + link)
        .then((res) => {
            if (res.data.error) {
                swal.fire("Error", res.data.msg, "error")
            } else {
               
                this.setState({transaction :res.data})
            }
        })
        .catch((err) => console.log(err))
   
    
}

    // getDataTransaction = () => {
    //     if (this.props.role === 'admin') {
    //         Axios.get(urlApi + '/transaction/onprocessall')
    //             .then((res) => {
    //                 if (res.data.error) {
    //                     Swal.fire("Error", res.data.msg, "error")
    //                 } else {
    //                     this.setState({ transaction: res.data })
    //                 }
    //             })
    //             .catch((err) => console.log(err))

    //     }
    //     else {
    //         Axios.get(urlApi + '/transaction/onprocess?username=' + this.props.username)
    //             .then((res) => {
    //                 if (res.data.error) {
    //                     Swal.fire("Error", res.data.msg, "error")
    //                 } else {

    //                     this.setState({ transaction: res.data })
    //                 }
    //             })

    //             .catch((err) => console.log(err))

    //     }
    // }

    renderDataTransaction = () => {

        var data = this.state.transaction.map((val) => {
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.order_date}</td>
                    <td><Currency quantity={val.total} currency="IDR"/></td>
                   

                    <td><Link to={'/transaction-detail/' + val.id}><input type="button" className='tombol' value="DETAIL" /></Link></td>

                </tr>
            )
        })
        return data
    }


    render() {
        if (objCookie.get('username') === undefined) {
            return <PageNotFound />
        }
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                <center>

                    <table className='table' style={{ width: '90%' }}>

                        {this.state.transaction.length === 0 ?
                            <h4>Transaction Empty</h4> :
                           

                                <thead style={{ textAlign: 'center' }}>

                                    <td>Order ID</td>
                                    <td>Order Date</td>
                                    <td>Total Payment</td>
                                    <td></td>
                                </thead>
                           


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
