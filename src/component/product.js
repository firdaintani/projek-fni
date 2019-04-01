import React from 'react'
import {Link} from 'react-router-dom'
import ProductList from './productList'
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
// import SideBar from 'react-fixed-sidebar';

export default class Product extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          category:[{link:'all',title:'All'},{link:'brush-pen',title:'Brush Pen'},
          {link:'drawing-pen',title:'Drawing Pen'},
          {link:'watercolor-paper',title:'Watercolor Paper'},
          {link:'watercolor',title:'Watercolor'},
          {link:'brush-paint',title:'Brush Paint'}]
        };
      }
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
    
    // state={category:[{link:'all',title:'All'},{link:'brush-pen',title:'Brush Pen'},
    // {link:'drawing-pen',title:'Drawing Pen'},
    // {link:'watercolor-paper',title:'Watercolor Paper'},
    // {link:'watercolor',title:'Watercolor'},
    // {link:'brush-paint',title:'Brush Paint'}]}

    renderCategory=()=>{
        var data = this.state.category.map((val)=>{
            return (
                <Link to={val.link}><div>{val.title}</div></Link>

            )
        })
        return data
    }

    
    getProps=()=>{
        var cat = this.props.match.params.category
        // alert(cat)
       return (
           <ProductList category={cat}/>
       )
    }
    render(){
        return(
            <div className='row' style={{marginTop:'70px', paddingTop:'10px',display: "flex", alignItems: "flex-start" }}>
                <div className='col-9' style={{overflow: 'auto'}}>
                    <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            {/* <select>
                                <option disabled selected hidden style={{border:'none', borderBottom:'1px solid black'}}>Sort by</option>

                                <option>Price</option>
                            </select> */}
                           
                        </div>
                    </div>
               
                    {this.getProps()}
                    </div>
                </div>
                <div className='col-3' style={{height:'100%',borderLeft:'2px solid black', position:"fixed", right:0}}>
                    {this.renderCategory()}
                    <div style={{marginTop:'50px'}}></div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                        Sort by
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem>A to Z</DropdownItem>
                        <DropdownItem>Z to A</DropdownItem>
                        <DropdownItem>Price, low to high</DropdownItem>
                        {/* <DropdownItem divider /> */}
                        <DropdownItem>Foo Action</DropdownItem>
                        <DropdownItem>Bar Action</DropdownItem>
                        <DropdownItem>Quo Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </div>
          
            </div>
            // <div style={{ height: 1280, overflow: 'auto' }}>
            // <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            //     <StickyBox style={{ border: '3px solid green' }}>Sidebar</StickyBox>
            //     <div style={{ height: 150, border: '3px solid blue' }}>Main Content</div>
            // </div>
            // </div>
        )
    }
}