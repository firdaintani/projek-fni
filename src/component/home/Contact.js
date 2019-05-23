import React from 'react'
import gambar from '../../support/img/img-contact.jpg'
import '../../support/css/contact.css'
class Contact extends React.Component {
    render() {
        return (
            <div className='container'>
                <div className="row" style={{ marginTop: '70px' }}>
                    <div className="col-md-6">
                        <div className="card" style={{ width: '100%' }}>
                            <img className="card-img-top" src={gambar} alt="Card cap" />

                        </div>
                    </div>
                    <div className="col-md-6 mt-auto mb-auto">
                        <center><h3 className='navbar-brand' style={{ marginBottom: '20px' }}>CONTACT</h3></center>

                        <div style={{ marginLeft: '50px', fontSize: '18px' }}>

                            <div className="row">
                                <a className="link-text" rel="noopener noreferrer" href="http://www.instagram.com/firda_intani" target="_blank"><i className="fab fa-instagram"></i>&nbsp;&nbsp;start_supplies</a>
                            </div>
                            <div className="row">
                                <a className="link-text" rel="noopener noreferrer" href="mailto:service@start-supplies.com" target="_blank"> <i className="fas fa-envelope"></i>&nbsp;&nbsp;service@start-supplies.com</a>
                            </div>
                            <div className="row">
                                <a className="link-text" rel="noopener noreferrer" href="https://www.google.com/maps/place/Purwadhika+Startup+%26+Coding+School+BSD/@-6.3023977,106.6500593,17z/data=!3m1!4b1!4m5!3m4!1s0x2e69fb9545968651:0xa3d17293fd1fcd!8m2!3d-6.302403!4d106.652248"
                                    target="_blank"><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Jl. BSD
                  Green Office Park, GOP 9 - G Floor BSD <br></br><span style={{ marginLeft: "35px" }}> Sampora, Cisauk,Tangerang, Banten 15345</span></a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
export default Contact