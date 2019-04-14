import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Axios from 'axios';
import {urlApi} from '../../support/urlApi'
// import ModalManageCat from './modalManageCat'
import swal from 'sweetalert'
import { MDBBtn, MDBModal, MDBModalBody,MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ManageCat extends React.Component{
  
    
    state={ data : {
      columns: [
       
        {
          label : 'No',
          field:'no',
          sort : 'asc',
          width : 100
        },
        {
          label : 'Category',
          field : 'category_name',
          sort : 'asc',
          width : 300
        }, 
        {
          label : 'Edit',
          field : 'edit',
          sort : 'disabled',
          width:20
        },
        {
          label : 'Delete',
          field : 'delete',
          sort : 'disabled',
          width:20
        }
      ],
      rows: []
  }, isEdit: false,
  editItem : null
  
  }
  
    
  componentDidMount(){
    this.getCategory()
  }

  
  mapData=(data)=>{
    var newData = {...this.state.data}
   
    var dataBr = data.map((val, index)=>{
      return {
        no : index+1,
        category_name : `${val.category_name}`,
        edit : <input type='button' value='edit' className='btn btn-primary' onClick={()=>this.editBtn(val)}/>,
        delete : <input type='button' value='delete' className='btn btn-danger' onClick={()=>this.deleteBtn(val.id)}/>
      }
    })
    newData.rows=dataBr
    
    this.setState({data:newData})

  }
  
  getCategory=()=>{
    Axios.get(urlApi+'/category/all')
    .then((res)=>{
      if(res.data.error){
        swal("Error",res.data.msg,'error')
      }else{
        this.mapData(res.data)
      }
    })
    .catch((err)=>console.log(err))
  }

  saveEdit=()=>{
    var category_name = this.refs.editCategory.value

    if(category_name){
      Axios.put(urlApi+'/category/update/'+this.state.editItem.id, {category_name})
      .then((res)=>{
        if(res.data.error)
        {
          swal("Failed",res.data.msg, "error")

        }
        else{
          swal("Success!","Product has been updated", "success");
          // this.getCategory()
          this.mapData(res.data)
          this.cancelBtn()

        }
      })
      .catch((err)=>console.log(err))

    }else{
      this.cancelBtn()
    }
  }

  editBtn=(val)=>{
    // alert(val.category_name)
    this.setState({isEdit:true,editItem:val})
  }

  cancelBtn=()=>{
    this.setState({isEdit:false, editItem:null})
  }

  deleteBtn=(id)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Axios.delete(urlApi+'/category/delete/'+id)
        .then((res)=>{
          if(res.data.error){
            swal({
              text: res.data.msg,
              icon: "warning",
            })  
          }else{
            this.mapData(res.data)
            swal("Data has been deleted!", {
              icon: "success",
            });
    
          }
        })
      } else {
        swal("Your data is safe!");
      }
    });
  }

  addCategory=()=>{
    var category_name = this.refs.inputCategory.value
    if(category_name===''){
      swal({
        text: "Must not empty!",
        icon: "warning",
      })
    }else{
      // alert(category)
      Axios.post(urlApi+'/category/add', {category_name})
      .then((res)=>{
        if(res.data.error){
          swal({
            text: res.data.msg,
            icon: "warning",
          })  
        }
        else{
          swal("Success!","Product has been added", "success");
          this.mapData(res.data)
      }
      })
    }
  }


  render(){
  return (
      <div className='container' style={{marginTop:'100px'}}>
      {/* {this.state.data.rows.id} */}
      <h3>Manage Category</h3>
          <div className='row'>
            <div className='col-md-5'>
              <input type='text' placeholder='enter category' ref='inputCategory' className='form-border outline-none'></input>
            </div>
            <div className='col-md-4'>
              <input type='button' className='tombol outline-none' value='ADD' onClick={this.addCategory}></input>
            </div>
          
          </div>
   
      <div ></div>
      <MDBDataTable
        striped
        bordered
        small
        data={this.state.data}
      />
{/* 
      {
        this.state.isEdit ? <ModalManageCat/>: null}
      } */}
        { this.state.isEdit?    
      <MDBModal isOpen={this.state.isEdit} toggle={this.cancelBtn}>
      <MDBModalHeader toggle={this.cancelBtn}>Edit Category {this.state.editItem.category_name}</MDBModalHeader>
        <MDBModalBody>
          <input type='text' placeholder={this.state.editItem.category_name} style={{width:'100%'}} ref='editCategory'/>
      
          
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary"  onClick={this.saveEdit}>Save changes</MDBBtn>
          <MDBBtn color="secondary" onClick={this.cancelBtn}>Close</MDBBtn>
     
        </MDBModalFooter>
        </MDBModal>
     :null 
    }
      </div>

    );
      
    }

 
}
export default ManageCat;