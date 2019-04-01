import React from 'react'
import {Link} from 'react-router-dom'
import '../support/css/cart.css'
import Currency from 'react-currency-formatter';
import swal from 'sweetalert'

export default class Cart extends React.Component{
    state ={category : '',selectedId:-1,qty:0, productCart:[
        {id:1,name:"Artline Stix",img:'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/9/9/1325149/1325149_d8cbf445-f019-4f55-850a-3044117d7f62.jpg',price:10000,qty:10},
        {id:2,name:"Artline Stix Set",img:'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/8/27/6464162/6464162_df32b645-8ffc-4fcd-8ed2-0800aae57591_600_600.jpg',price:105000,qty:10},
        {id:3,name:"Tombow Dual Brush Pen Set 10 Tropical",img:'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56189_1.jpg',price:370000,qty:10},
        {id:4,name:"Tombow Dual Brush Pen Set 10 Primary",img:'https://d1v72txp4rf8db.cloudfront.net/media/catalog/product/cache/b74395f3dea86789ca23abf7766ff8b9/t/o/tom_56167_1_2.jpg',price:370000,qty:10}

    ]}
    kurang=()=>{
        if(this.state.qty>1){
        
            this.setState({qty:this.state.qty-1})
        }
    }
    tambah=()=>{
       
        this.setState({qty:this.state.qty+1})
    }
    
    editBtn=(id, qty)=>{
        this.setState({selectedId: id, qty:qty})
    }

    deleteBtn=(id)=>{
        // alert(id+' telah dihapus')
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
     
            if (willDelete) {
                    
                swal(`Poof! Product ${id} has been deleted!`, {
                icon: "success",
              });
            } else {
              swal("Your product is safe!");
            }
          });
     
    }

    checkoutBtn=()=>{
        alert('checkout')
    }

    saveBtn=(val)=>{
        alert(val.name + 'disimpan')
        // this.setState({})
        // this.cancelBtn()
    }

    cancelBtn=()=>{
        this.setState({selectedId:-1})
    }

    renderCart =()=>{
        var data = this.state.productCart.map((val)=>{
            if(this.state.selectedId===val.id){
                return (
                    <tr>
                    <td>
                        <div className='row mb-auto mt-auto d-flex align-items-center'>
                            <div className='col-4' >
                                <img src={val.img} alt='product' style={{width:'200px', height:'200px', display:'inline'}}/>
                            </div>
                            <div className='col-7' >
                                <p style={{fontStyle:'bold', fontSize:'20px'}}>{val.name}</p>
                            
                                {/* <p>{val.qty} x <span> <Currency quantity={val.price} currency="IDR"/></span> </p> */}
                            <div className='row'>
                                <div className='col-3'>
                                    {/* <input type="button" value='-' onClick={this.kurang} style={{marginTop:'10px'}}></input> */}
                                    <i class="fas fa-minus" onClick={this.kurang} style={{cursor:'pointer'}}></i>
                                </div>
                                <div className='col-2' style={{textAlign:"center",marginLeft:'-50px'}} >
                                    <span>{this.state.qty}</span>
    
                                </div>
                                <div className='col-7'>
                                    <i class="fas fa-plus" onClick={this.tambah} style={{cursor:'pointer', marginRight:'10px'}}></i>
                                    x <Currency quantity={val.price} currency="IDR"/>
                                </div>
                            </div>
                            </div>
                        </div>
                    </td>
                    <td >
                    <span className='save-button' onClick={()=>this.saveBtn(val)}>Save</span><span className='edit-button' onClick={this.cancelBtn}>Cancel</span>
                    <p style={{float:"right"}} ><Currency quantity={val.qty*val.price} currency="IDR"/></p>
                    </td>
                </tr>
    
                )
            }

            return (
                <tr>
                <td>
                    <div className='row mb-auto mt-auto d-flex align-items-center'>
                        <div className='col-4' >
                            <img src={val.img} alt='product' style={{width:'200px', height:'200px', display:'inline'}}/>
                        </div>
                        <div className='col-7' >
                            <p style={{fontStyle:'bold', fontSize:'20px'}}>{val.name}</p>
                        
                            <p>{val.qty} x <span> <Currency quantity={val.price} currency="IDR"/></span> </p>
                        
                        </div>
                    </div>
                </td>
                <td >
                <p className='edit-button' onClick={()=>this.editBtn(val.id, val.qty)}>Edit</p>
                <p style={{float:"right"}} ><Currency quantity={val.qty*val.price} currency="IDR"/><i class="fas fa-times" style={{paddingLeft:'20px', cursor:'pointer'}} onClick={()=>this.deleteBtn(val.id)}></i></p>
                </td>
            </tr>
            )
        })
        return data
    }

    getTotal=()=>{
        var total=0
        for(var i=0;i<this.state.productCart.length;i++){
            total+=(this.state.productCart[i].qty*this.state.productCart[i].price)
        }
        return total
    }
    render(){
        return(
            <div className='container' style={{marginTop:'70px',paddingTop:'40px'}}>
            <center>
               <table className='table' style={{width:'900px'}}>
                    <thead>
                        <td style={{fontSize:'24px'}}>CART</td>
                       
                        <td><Link to='/product/all'><input type='button' className='tombol' value='CONTINUE SHOPPING' style={{float:'right'}}></input></Link></td>
                    </thead>
                    <tbody>

                        {this.renderCart()}
                    
                    </tbody> 
                    <tfoot>
                        <tr>
                            <td style={{fontWeight:'bold', verticalAlign:'middle'}}>Total : </td>
                            <td style={{fontWeight:'bold'}}>
                            <div className='row d-flex align-items-center'>
                            <div className='col-5'>
                                    <Currency quantity={this.getTotal()} currency="IDR"/>

                                </div>
                                <div className='col-5'>
                                    <input type='button' style={{float:"left"}} className='tombol' value='CHECKOUT' onClick={this.checkoutBtn}></input>
    
                                </div>

                            </div>
                            
                            
                            </td>
                        </tr>
                    </tfoot>
               </table>
               </center>
            </div>
        )
    }
}