import React from 'react'
import Currency from 'react-currency-formatter';
import {Link} from 'react-router-dom'
import cookie from 'universal-cookie'
import PageNotFound from '../PageNotFound';
import {withRouter} from 'react-router-dom'

const objCookie = new cookie()
class Transaction extends React.Component {
    state = { transaction: [] }
    
    componentDidMount() {
        this.setState({transaction : this.props.data})
    
    }



    componentWillReceiveProps(newProps) {
            this.setState({transaction : newProps.data})
        
    }

    
    renderTransaction = () => {
        var data = this.state.transaction.map((val) => {
           
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
               {
                   this.state.transaction.length>0 ? 
                   <center>

                   <table className='table'>

                       <thead style={{ textAlign: 'center' }}>
                        <tr>
                           <th>Order ID</th>
                          
                           <th>Order Date</th>
                           
                           <th>Total Payment</th>
                           <th>Payment Due</th>
                           
                           <th></th>
                           </tr>
                       
                       </thead>
                       <tbody style={{ textAlign: 'center' }}>

                           {this.renderTransaction()}

                       </tbody>

                   </table>

               </center>
                   : <h4>Transaction Empty</h4>
               }
            </div>
        )
    }
}


export default withRouter(Transaction)