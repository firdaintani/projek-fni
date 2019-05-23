import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cookie from 'universal-cookie'
import PageNotFound from '../PageNotFound';
import Currency from 'react-currency-formatter';

const objCookie = new cookie()

class CanceledTransaction extends React.Component {
    state = { transaction: [] }

    componentDidMount() {
        this.setState({ transaction: this.props.data })

    }



    componentWillReceiveProps(newProps) {
        this.setState({ transaction: newProps.data })

    }


    renderDataTransaction = () => {

        var data = this.state.transaction.map((val) => {
            return (
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.order_date}</td>
                    <td><Currency quantity={val.total} currency="IDR" /></td>


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
        if (this.state.transaction.length === 0) {
            return (
                <h4>Transaction Empty</h4>
            )
        } else {


            return (
                <div className="container" style={{ marginTop: '20px' }}>
                    <center>

                        <table className='table' style={{ width: '90%' }}>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Total Payment</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {this.renderDataTransaction()}
                            </tbody>
                        </table>
                    </center>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStateToProps)(CanceledTransaction)
