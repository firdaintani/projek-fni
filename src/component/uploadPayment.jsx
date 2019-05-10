import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'

class UploadPayment extends React.Component {
    state = { selectedFile: null, error: '' }

    valueHandler = () => {

        var value = this.state.selectedFile ? this.state.selectedFile.name : 'PICK A PICTURE'
        return value
    }
    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({ selectedFile: event.target.files[0] })

    }

    UploadPayment = () => {
        if (this.state.selectedFile === null) {
            Swal.fire('Warning!',
            "Please select the picture",
            'warning')
        } else {
            Swal.fire({
                title:'Please wait', 
                onOpen :() =>{
                    Swal.showLoading()
                }
            })
            var fd = new FormData()
            fd.append('payment_picture', this.state.selectedFile, this.state.selectedFile.name)
            Axios.put(urlApi + '/transaction/upload-payment/' + this.props.match.params.id, fd)
                .then((res) => {
                    if (res.data.error) {
                        // alert('er')
                        Swal.close()
                        Swal.fire(
                            'Error!',
                            res.data.msg,
                            'error'
                        )
                    } else {
                        // alert('s')
                        Swal.close()
                        Swal.fire(
                            'Success!',
                            'Upload Payment Picture Success! Please wait for our confirmation',
                            'success'
                        )
                        this.props.history.push('/transaction')
                    }
                })
                .catch((err)=>console.log(err))

        }
    }

    render() {
        return (
            <div className='container' style={{ marginTop: '80px' }}>

                <center>

                    <div style={{ width: '50%', marginTop: '150px' }}>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Upload your payment picture</label>

                            </div>
                            <div className="col-md-6">
                                <input type='file' ref='inputfile' style={{ display: 'none' }} onChange={this.onChangeHandler} />
                                <input type='button' className='btn btn-success' value={this.valueHandler()} style={{ width: '100%' }} onClick={() => this.refs.inputfile.click()} />

                            </div>
                        </div>
                        <input type='button' className='tombol' style={{ marginTop: '30px', width: '100%' }} value='UPLOAD' onClick={this.UploadPayment} />
                    </div>
                </center>


            </div>
        )
    }
}

export default withRouter(UploadPayment)