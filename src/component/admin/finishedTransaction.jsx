import React from 'react'
import { MDBDataTable } from 'mdbreact';
import Axios from 'axios';
import { urlApi } from '../../support/urlApi';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'

class FinishedTransaction extends React.Component {
    state = {
        data: {
            columns: [

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
                    label: 'Delete',
                    field: 'delete',
                    sort: 'disabled',
                    width: 20
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
    }


    mapData = (data) => {
        var newData = { ...this.state.data }
        var dataBr = data.map((val) => {
            return {
                id: val.id,
                order_date: `${val.order_date}`,
                total: `${val.total}`,
                delete: <input type='button' value='delete' className='btn btn-danger' onClick={() => this.deleteBtn(val.id)} />,
                detail: <Link to={'/transaction-detail/' + val.id}><input type='button' value='detail' className='btn btn-success' /></Link>

            }
        })
        newData.rows = dataBr
        this.setState({ data: newData })

    }

    getDataFinished = () => {
        Axios.get(urlApi + '/transaction/finished')
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")
                } else {
                    this.mapData(res.data)
                }
            })
            .catch((err) => console.log(err))
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
        return (
            <div className="container" style={{ marginTop: '80px' }}>
                <h3>Finished Transaction</h3>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={this.state.data}
                />
            </div>
        )
    }
}
export default FinishedTransaction