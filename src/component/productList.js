import React from 'react'

export default class ProductList extends React.Component{
    state ={category : ''}

    componentDidMount(){
        this.getDataCategory()
        alert('masuk')

    }
    getDataCategory=()=>{
        var cat = this.props.match.params.category
        this.setState({category:cat})
    }
    render(){
        return(
            <div>
              hahaha
                {this.state.category}
            </div>
        )
    }
}