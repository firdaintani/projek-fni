import React from 'react'
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'universal-cookie'
import Currency from 'react-currency-formatter'
import PageNotFound from '../PageNotFound';

const objCookie = new cookie()
class FinishedTransaction extends React.Component {
    state = {
        data: {

            columns:
                [
                    {
                        label: 'Order ID',
                        field: 'id',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Order Date',
                        field: 'order_date',
                        sort: 'asc',
                        width: 300
                    },
                    {
                        label: 'Total',
                        field: 'total',
                        sort: 'asc',
                        width: 300
                    },

                    {
                        label: 'Detail',
                        field: 'detail',
                        sort: 'disabled',
                        width: 20
                    }
                ],
            rows: []
        }
    }

    componentDidMount() {
       
        this.mapData(this.props.data)
    }
    componentWillReceiveProps(newProps) {
        this.mapData(newProps.data)
    }

    mapData = (data) => {

        var newData = { ...this.state.data }
        var dataBr = data.map((val) => {

            return {
                id: val.id,
                order_date: `${val.order_date}`,
                total: <Currency quantity={val.total} currency="IDR" />,
                detail: <Link to={'/transaction-detail/' + val.id}><input type='button' value='detail' className='btn btn-success' /></Link>

            }
        })
        newData.rows = dataBr
        this.setState({ data: newData })

    }

    render() {
        if (objCookie.get('username') === undefined) {
            return <PageNotFound />
        }
        return (
            <div className="container" style={{ marginTop: '20px' }}>

                {
                    this.state.data.rows.length === 0 ?
                        <h4>Transaction Empty</h4> :
                        <MDBDataTable
                            striped
                            bordered
                            small
                            data={this.state.data}
                        />
                }

            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}
export default connect(MapStateToProps)(FinishedTransaction)