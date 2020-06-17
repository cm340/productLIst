import React, { Component } from 'react'

export default class Search extends Component {
    searchHander=(e)=>{
        this.props.search(e.target.value)
    }
    render() {
        return (
            <div>
                <input placeholder='请输入商品名' onChange={this.searchHander}/>
                <button>搜索</button>
            </div>
        )
    }
}
