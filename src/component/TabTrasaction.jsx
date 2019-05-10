import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ManageTransaction from '../component/admin/manageTransaction2'
import Transaction from '../component/transaction'
import FinishedTransaction from '../component/admin/finishedTransaction'
import { connect } from 'react-redux'
import OnProcessTransaction from './onProcessTransaction'
import cookie from 'universal-cookie'
import PageNotFound from './pageNotFound';
const objCookie = new cookie()

class TabTransaction extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        if (objCookie.get('username') === undefined) {
            return <PageNotFound />
        }
        return (
            <div className='container' style={{ marginTop: '80px' }}>
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
                                        <ManageTransaction /> : this.props.role === 'user' && this.state.activeTab === '1' ?
                                            <Transaction /> : null
                                }
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                {
                                    this.state.activeTab === '2' ?
                                        <OnProcessTransaction /> : null
                                }

                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                {
                                    this.state.activeTab === '3' ?
                                        <FinishedTransaction />
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
        role: state.user.role
    }
}

export default connect(mapStateToProps)(TabTransaction)