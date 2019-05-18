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

const objCookie = new cookie()

class TabTransaction extends React.Component {
    state = {data : [], searchKey:'' ,  activeTab: '1'}
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    

    pushUrl = () => {     
        var newLink = `/transaction/search?m=${this.refs.selectMonth.value}`
      
        this.props.history.push(newLink)
        this.setState({ searchKey: newLink})
        
       
    }

    filterBtn=()=>{
    if( this.refs.selectMonth.value >0)
       this.pushUrl()
       else{
           this.props.history.push('/transaction')
       }
      
    }

    displayMonth = () => {
        return (
            <div className="col-md-2">

                <select className='form-control' ref='selectMonth'>
                    <option value={0} >All</option>
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
                                        <OnProcessTransaction linkUrl={this.state.searchKey} /> : null
                                }

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                {
                                    this.state.activeTab === '3' ?
                                        <FinishedTransaction linkUrl={this.state.searchKey} /> 
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