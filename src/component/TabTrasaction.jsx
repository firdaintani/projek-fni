import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ManageTransaction from '../component/admin/manageTransaction'
import Transaction from '../component/transaction'
import FinishedTransaction from '../component/admin/finishedTransaction'
import { connect } from 'react-redux'
import OnProcessTransaction from './onProcessTransaction'
import cookie from 'universal-cookie'
import PageNotFound from './pageNotFound';
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import Swal from 'sweetalert2'
import queryString from 'query-string';
const objCookie = new cookie()

class TabTransaction extends React.Component {
    state = {data : [], searchKey:'' ,  activeTab: '1'}
    componentDidMount(){
        
        this.getData()

    }
    getLink = () => {
        let params = queryString.parse(this.props.location.search);
        var newLink = `/transaction/search`
        var link = []
        if (params.u) {
            link.push({
                params: 'u',
                value: params.u
            })
        }
        if (params.m) {

            link.push({
                params: 'm',
                value: params.m
            })
        }
        
        for (var i = 0; i < link.length; i++) {
            if (i === 0) {
                newLink += '?' + link[i].params + '=' + link[i].value
            } else {
                newLink += '&' + link[i].params + '=' + link[i].value
            }
        }
        this.setState({searchKey:newLink, activeTab:'1'})
        return newLink
    }

    getData=()=>{
        if(this.props.location.search){
        
            var link = this.getLink()
            if(this.props.role==='user'){
                link+='&u='+this.props.username
            }

            
            Axios.get(urlApi+link)
            .then((res) => {
                if (res.data.error) {
                    Swal.fire("Error", res.data.msg, "error")
                } else {
                    alert(res.data.length)
                    this.setState({data : res.data})
                }
            })
            .catch((err) => console.log(err))
        }else{
        if(this.props.role==='admin'){
            if(this.state.activeTab==='1'){
            Axios.get(urlApi + '/transaction/all')
            .then((res) => {
                if (res.data.error) {
                    Swal.fire("Error", res.data.msg, "error")
                } else {
                    alert(res.data.length)
                    this.setState({data : res.data})
                }
            })
            .catch((err) => console.log(err))
            }else if(this.state.activeTab==='2'){
                Axios.get(urlApi + '/transaction/onprocessall')
                .then((res) => {
                    if (res.data.error) {
                        Swal.fire("Error", res.data.msg, "error")
                    } else {
                        this.setState({ data: res.data })
                    }
                })
                .catch((err) => console.log(err))
            }else {
                Axios.get(urlApi + '/transaction/finished')
                .then((res) => {
                    if (res.data.error) {
                        Swal.fire("Error", res.data.msg, "error")
                    } else {
                        // alert('masuk')
                        this.setState({ data: res.data })
                    }
                })
                .catch((err) => console.log(err))

            }
        }
    }
    }
  

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    

    pushUrl = () => {
        if(this.props.role==='admin'){
            var username = this.refs.username.value

        }
        var selectMonth = this.refs.selectMonth.value
        // alert(sortby)
        var newLink = `/transaction/search`
        var params = []
        if (username) {
            params.push({
                params: 'u',
                value: username
            })
        }
        if (selectMonth > 0) {
            params.push({
                params: 'm',
                value: selectMonth
            })
        }
        for (var i = 0; i < params.length; i++) {
            if (i === 0) {
                newLink += '?' + params[i].params + '=' + params[i].value
            } else {
                newLink += '&' + params[i].params + '=' + params[i].value
            }
        }

        this.props.history.push(newLink)
        this.setState({ searchKey: newLink, activeTab:'1' })
        return newLink
       
    }

    filterBtn=()=>{
       var link = this.pushUrl()
      
       Axios.get(urlApi+link)
       .then((res) => {
           if (res.data.error) {
               Swal.fire("Error", res.data.msg, "error")
           } else {
               alert(res.data.length)
               this.setState({data : res.data})
           }
       })
       .catch((err) => console.log(err))
   
    }

    displayMonth = () => {
        return (
            <div className="col-md-2">

                <select className='form-control' ref='selectMonth'>
                    <option hidden >Month</option>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>

                </select>
            </div>
        )
    }
    render() {
        if (objCookie.get('username') === undefined) {
            return <PageNotFound />
        }
        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <div style={{ marginBottom: '20px' }}>
                    {
                        this.props.role==='admin' ?

                        <input type='text' className='form-control' ref='username' placeholder='username' style={{width:'160px'}}/>
                        : null
                    }
                    
                    <p className='mt-3'>Filter by month :</p>
                    <div className="row">
                       
                       
                        {this.displayMonth()}
                        <div className="col-md-2">
                            <input type="button" className='tombol-black' value='FILTER' onClick={this.filterBtn} />
                        </div>
                    </div>

                </div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Belum Dibayar
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Diproses
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Selesai
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                {/* <h4>Tab 1 Contents</h4> */}
                                {
                                    this.props.role === 'admin' && this.state.activeTab === '1' ?
                                        <ManageTransaction linkUrl={this.state.searchKey}/> : this.props.role === 'user' && this.state.activeTab === '1' ?
                                            <Transaction linkUrl={this.state.searchKey} /> : null
                                }
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                {
                                    this.state.activeTab === '2' ?
                                        <OnProcessTransaction dataTransaction={this.state.data}/> : null
                                }

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                {
                                    this.state.activeTab === '3' ?
                                        <FinishedTransaction dataTransaction={this.state.data} />
                                        : null
                                }

                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(TabTransaction)