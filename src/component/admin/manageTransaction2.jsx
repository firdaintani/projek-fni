import React from 'react'
import { MDBDataTable, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { urlApi } from '../../support/urlApi'
import swal from 'sweetalert'

import Currency from 'react-currency-formatter'
import {connect} from 'react-redux'
import PageNotFound from '../pageNotFound'

class ManageTransaction2 extends React.Component {
    state = {
        isEdit: false, itemEdited: {},
        data: {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Username',
                    field: 'username',
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
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Total',
                    field: 'total',
                    sort: 'asc',
                    width: 300
                },

                // {
                //     label: 'Edit',
                //     field: 'edit',
                //     sort: 'disabled',
                //     width: 20
                // },
                // {
                //     label: 'Delete',
                //     field: 'delete',
                //     sort: 'disabled',
                //     width: 20
                // },
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
        this.getTransaction()
    }

    getTransaction = () => {
        if(this.props.location.search){

        }else{
            
        }
        Axios.get(urlApi + '/transaction/all')
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")
                } else {
                    
                    this.mapData(res.data)
                }
            })
            .catch((err) => console.log(err))
    }




    mapData = (data) => {
        var newData = { ...this.state.data }
        var dataBr = data.map((val) => {
            return {
                id: val.id,
                username : val.username,
                order_date: `${val.order_date}`,
                status: 'Havent pay',
                total: <Currency quantity={val.total} currency="IDR"/>,
                // edit: <input type='button' value='edit' className='btn btn-primary' onClick={() => this.editBtn(val)} />,
                // delete: <input type='button' value='delete' className='btn btn-danger' onClick={() => this.deleteBtn(val.id)} />,
                detail: <Link to={'/transaction-detail/' + val.id}><input type='button' value='detail' className='btn btn-success' /></Link>

            }
        })
        newData.rows = dataBr
        this.setState({ data: newData })

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
                                this.getTransaction()
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

    editBtn = (val) => {
        this.setState({ isEdit: true, itemEdited: val })
    }
    cancelBtn = () => {
        this.setState({ isEdit: false, itemEdited: {} })
    }

    saveEdit = () => {
        var status = this.refs.status.value
        Axios.put(urlApi + '/transaction/update/' + this.state.itemEdited.id, { status })
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")
                } else {

                    swal("Success", "Update Success. Moved to finished transaction", "success")
                    this.mapData(res.data)
                    this.cancelBtn()
                }
            })
            .catch((err) => console.log(err))

    }
    render() {
        if(this.props.role!=='admin'){
            return <PageNotFound/>
        }
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                {/* <div className="row">
                    <div className="col-md-6">
                        <h3>Manage Transaction</h3>

                    </div>
                    <div className="col-md-6">
                        <Link to='/finished-transaction'><input type='button' className='tombol' value='Finished Transaction' style={{ float: 'right', marginBottom: '30px' }} /></Link>

                    </div>
                </div> */}
                {
                    this.state.data.rows.length===0?
                    <h4>Transaction Empty</h4> :
                    <div>
                    
                        
                    <MDBDataTable
                    striped
                    bordered
                    small
                    data={this.state.data}
                    
                />
                </div>

                }

                {
                    this.state.isEdit ?
                        <MDBModal isOpen={this.state.isEdit} toggle={this.cancelBtn}>
                            <MDBModalHeader toggle={this.cancelBtn}>Edit Status</MDBModalHeader>
                            <MDBModalBody>
                                {/* <input type='text' placeholder={this.state.editItem.brand_name} style={{width:'100%'}} ref='editBrand'/> */}
                                <form>
                                    <div className="form-group">
                                        <label >Order Date</label><br></br>
                                        <p>{this.state.itemEdited.order_date}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label><br></br>
                                        <select ref='status'>
                                            <option value={0}>Havent Pay</option>
                                            <option value={1}>Paid</option>

                                        </select>
                                    </div>
                                </form>

                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="primary" onClick={this.saveEdit}>Save changes</MDBBtn>
                                <MDBBtn color="secondary" onClick={this.cancelBtn}>Close</MDBBtn>

                            </MDBModalFooter>
                        </MDBModal>
                        : null


                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        role : state.user.role
    }
}

export default connect(mapStateToProps)(ManageTransaction2)