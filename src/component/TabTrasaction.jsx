import React from 'react'
import {TabContent, TabPane, Nav, NavItem, Card, Button, CardTitle, CardText, Row,Col} from 'reactstrap'
import classnames from 'classnames'
import { NavLink } from 'mdbreact';

class TabTransaction extends React.Component{
    state={activeTab : '1'}

    toggle=(tab)=>{
        if(this.state.activeTab !=tab){
            this.setState({activeTab:tab})
        }
    }


    render(){
        return (
            <div className="container">
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({active : this.state.activeTab==='1'})} onClick={()=>{this.toggle('1')}}>
                            Tab1
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active : this.state.activeTab==='2'})} onClick={()=>{this.toggle('2')}}>
                            Tab2
                        </NavLink>
                    </NavItem>
                    
                    </Nav>        
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId='1'>
                                <Row>
                                    <Col sm='12'>
                                    <h2>Tab Content 1</h2>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId='2'>
                                <Row>
                                    <Col sm='12'>
                                    <h2>Tab Content 2</h2>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
            
            </div>
        )
    }
}
export default TabTransaction