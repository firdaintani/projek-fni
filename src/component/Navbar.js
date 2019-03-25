import React from 'react'
import '../support/css/navbar.css'
// import SlideMenu from './slideMenu'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    
    render (){
        return (
            <div className='navbar-fixed'>
           
          
            <nav className="navbar navbar-expand-md navbar-light">
               
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    {/* <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/"><i class="fas fa-bars"></i></a>
                    </li>
                   
                    </ul> */}
                </div>
                <div className="mx-auto order-0">
                    <a className="navbar-brand mx-auto" href="/">ST-ART</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                    <span className="navbar-toggler-icon" />
                    </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/"><i class="fas fa-shopping-cart"></i></a>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="/"><i class="fas fa-user"></i></a> */}
                            <Link to='/login'><input className='tombol' type='button' value='LOGIN'/></Link>
                    </li>
                   
                    </ul>
                </div>
                </nav>
                </div>

        )
    }
}

export default Navbar