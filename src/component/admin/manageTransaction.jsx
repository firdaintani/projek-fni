import React from 'react'
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { urlApi } from '../../support/urlApi'
import swal from 'sweetalert'

import Currency from 'react-currency-formatter'
import {connect} from 'react-redux'
import PageNotFound from '../pageNotFound'
import {withRouter} from 'react-router-dom'

class ManageTransaction extends React.Component {
    state = {
       searchKey : '',
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

    getTransaction = (link) => {
      
            Axios.get(urlApi + link)
            .then((res) => {
                if (res.data.error) {
                    swal("Error", res.data.msg, "error")
                } else {
                   
                    this.mapData(res.data)
                }
            })
            .catch((err) => console.log(err))
       
        
    }
    componentDidMount() {
        if(this.props.linkUrl){         
            this.getTransaction(this.props.linkUrl)
        }else{
            this.getTransaction('/transaction/search?s=1')

        }   
     }
  

    componentWillReceiveProps(newProps){
           if(newProps.linkUrl){
        
            this.getTransaction(newProps.linkUrl)
        }else{
            this.getTransaction('/transaction/search?s=1')

        }   
        }

    mapData = (data) => {
        var newData = { ...this.state.data }
        var dataBr = data.map((val) => {
            return {
                id: val.id,
                username : val.username,
                order_date: `${val.order_date}`,
                total: <Currency quantity={val.total} currency="IDR"/>,
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
    render() {
        if(this.props.role!=='admin'){
            return <PageNotFound/>
        }
        return (
            <div className="container" style={{ marginTop: '20px' }}>
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

              <p>{this.props.linkUrl}</p>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        role : state.user.role
    }
}

export default withRouter(connect(mapStateToProps)(ManageTransaction))