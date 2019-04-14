import React from 'react';
import '../../support/css/manageCategory.css'
import Axios from 'axios';
import { urlApi } from '../../support/urlApi';
import swal from 'sweetalert';

class ManageCategory extends React.Component{
  state={category:[], isEdit:false}

  componentDidMount(){
    this.getCategory()
  }


  getCategory=()=>{
    Axios.get(urlApi+'/category/all')
    .then((res)=>{
      this.setState({category: res.data})
    })
    .catch((err)=>console.log(err))
  }
  addCategory=()=>{
    var category = this.refs.inputCategory.value
    if(category===''){
      alert('jangan kosong')
    }else{
      alert(category)
    }
  }

  editBtn=()=>{
    this.setState({isEdit:true})
  }

  deleteBtn=(id)=>{
    alert(id)
  }

  renderCategory=()=>{
    var data = this.state.category.map((val,index)=>{
        return (
          <tr>
            <td>
              {index+1}
            </td>
            <td>
              {val.category_name}
            </td>
            <td>
              <input type='button' className='tombol' value='Edit' onClick={this.editBtn}></input> &nbsp;
              <input type='button' className='tombol' value='Delete' onClick={()=>this.deleteBtn(val.id)}></input>

            </td>

          </tr>
        )
    })
    alert(typeof(data))
    return data
  }
  
  render(){
     return(
       <div className='container' style={{marginTop:'80px'}}>
          <h3>Manage Category</h3>
          <div className='row'>
            <div className='col-md-5'>
              <input type='text' placeholder='enter category' ref='inputCategory' className='form-border outline-none'></input>
            </div>
            <div className='col-md-4'>
              <input type='button' className='tombol outline-none' value='ADD' onClick={this.addCategory}></input>
            </div>
          
          </div>
          <table className='table mt-5'>
              <thead>
                <td>No</td>
                <td>Category</td>
                <td>Action</td>
              </thead>
              <tbody>
              { this.renderCategory()}
              </tbody>
        
          </table>

       </div>
     )
   }
}
export default ManageCategory;