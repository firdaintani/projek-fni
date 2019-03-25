import React from 'react'
import {Route,Link} from 'react-router-dom'
import ProductList from './productList'

export default class Product extends React.Component{
    render(){
        return(
            <div className='row' style={{marginTop:'70px', paddingTop:'10px'}}>
                <div className='col-9'>
                    <div className='container'>
                    <Route to='product/:category' component={ProductList}/>
                    </div>
                </div>
                <div className='col-3' style={{borderLeft:'3px solid black'}}>
                   <Link to={'all'}><div>All</div></Link>
                   <Link to={'brush-pen'}><div>Brush Pen</div></Link>
                   

                </div>
          
            </div>
        )
    }
}