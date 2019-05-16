import React from 'react'
import { MDBDataTable } from 'mdbreact';
import Axios from 'axios';
import { urlApi } from '../../support/urlApi';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'universal-cookie'
import Currency from 'react-currency-formatter'
import PageNotFound from '../pageNotFound';

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
        this.getDataFinished()
        // console.log(this.props)
    }


    mapData = (data) => {
        var newData = { ...this.state.data }
        var dataBr = data.map((val) => {
            // if(this.props.role==='admin'){
            //     return {
            //         id: val.id,
            //         username : val.username,
            //         order_date: `${val.order_date}`,
            //         total: `${val.total}`,
            //         // delete: <input type='button' value='delete' className='btn btn-danger' onClick={() => this.deleteBtn(val.id)} />,
            //         detail: <Link to={'/transaction-detail/' + val.id}><input type='button' value='detail' className='btn btn-success' /></Link>
    
            //     }
    
            // }
            return {
                id: val.id,
                order_date: `${val.order_date}`,
                total:<Currency quantity={val.total} currency="IDR" />,
                detail: <Link to={'/transaction-detail/' + val.id}><input type='button' value='detail' className='btn btn-success' /></Link>

            }
        })
        newData.rows = dataBr
        this.setState({ data: newData })

    }

    getDataFinished = () => {
        if (this.props.role === 'admin') {
            Axios.get(urlApi + '/transaction/finished')
                .then((res) => {
                    if (res.data.error) {
                        swal("Error", res.data.msg, "error")
                    } else {
                        // alert('masuk')
                        this.mapData(res.data)
                    }
                })
                .catch((err) => console.log(err))

        }else {
            Axios.get(urlApi + '/transaction/user-finished?username='+this.props.username)
                .then((res) => {
                    if (res.data.error) {
                        swal("Error", res.data.msg, "error")
                    } else {
                        this.mapData(res.data)
                    }
                })
                .catch((err) => console.log(err))

        }
    }
    deleteBtn = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete(urlApi + '/transaction/delete/' + id)
                        .then((res) => {
                            if (res.data.error) {
                                swal({
                                    text: res.data.msg,
                                    icon: "warning",
                                })
                            } else {
                                // this.getBrand()
                                this.getDataFinished()

                                swal("Data has been deleted!", {
                                    icon: "success",
                                });


                            }
                        })
                } else {
                    swal("Your data is safe!");
                }
            });
    }


    render() {
        if(objCookie.get('username')===undefined){
            return <PageNotFound/>
        }
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                {/* <h3>Finished Transaction</h3> */}
                {
                    this.state.data.rows.length === 0 ?
                    <h4>Transaction Empty</h4>:
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
        role: state.user.role,
        username: state.user.username
    }
}
export default connect(MapStateToProps)(FinishedTransaction)