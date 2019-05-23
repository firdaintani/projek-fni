import React from 'react'
import queryString from 'query-string';
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import swal from 'sweetalert';
import Swal2 from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import './../support/css/verifyemail.css'


class VerifyEmail extends React.Component {
    state = { verify_check: false, user: null, error: '' }
    componentDidMount() {
        this.getDatafromUrl()

    }

    getDatafromUrl = () => {
        let url = this.props.location.search;
        if (url) {
            let params = queryString.parse(url);
            var username = params.username

            Axios.get(urlApi + '/user/getuser?username=' + username)
                .then((res) => {
                    if (res.data.error) {
                        swal.fire("Error", res.data.msg, "error")
                    }
                    else {

                        this.setState({ user: res.data[0] })
                    }

                })
            // alert(params.sortby)
        } else {
            alert('Gaada')

        }
    }

    resendEmail = () => {
     
        var username = this.state.user.username
        var email = this.state.user.email
        Swal2.fire({
            title: 'Please wait',
            onOpen: () => {
                Swal2.showLoading()
            }
        })

        Axios.put(urlApi + '/resend-email', { username, email })
            .then((res) => {
                if (res.data === 'success') {
                    Swal2.close()
                    swal({
                        title: "Success!",
                        text: "Please check your email to see the code",
                        icon: "success",
                    })

                } else {
                    Swal2.close()
                    this.setState({ error: res.data })
                }
            })
    }
    codeVerify = () => {
        var code = parseInt(this.refs.code_verify.value)
        if (code !== this.state.user.code_verify) {
            this.setState({ error: 'Wrong code. Check your email to see the code' })
        } else {

            var username = this.state.user.username

            Axios.put(urlApi + '/verify', { username })
                .then((res) => {
                    if (res.data.error) {
                        swal({
                            title: "Error!",
                            text: res.data.msg,
                            icon: "error",
                        })

                    }
                    swal({
                        title: "Success!",
                        text: res.data,
                        icon: "success",
                    })
                        .then((value) => {
                            this.props.history.push('/login');

                        });


                })
        }
    }


    render() {
        return (
            <div className='container' style={{ marginTop: '70px', paddingTop: '70px' }}>
                <center><h3 className='navbar-brand'>VERIFY YOUR ACCOUNT</h3></center>
                <form style={{ marginRight: '300px', marginLeft: '300px', marginTop: '30px' }}>

                    <div className="form-group">
                        <label >Please input your code here : </label><br></br>
                        <input type="number" className="form-border outline-none" ref='code_verify' />

                    </div>
                    <input type="button" onClick={this.codeVerify} className="tombol" value='VERIFY' style={{ width: '100%' }}></input>
                    {this.state.error ?
                        <div class="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                        : null

                    }
                    <p className="form-text text-muted mt-3">If you don't get the email, <span onClick={this.resendEmail} className='link-text' style={{ fontWeight: 600 }}>click here</span> to resend</p>

                </form>


            </div>
        )
    }
}

export default withRouter(VerifyEmail)