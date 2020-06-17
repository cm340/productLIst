import React, { Component } from 'react'

export default class Table extends Component {
    /**
     * @description 点击编辑触发
     * @date 2020-06-16
     * @param {*} obj 被选中的对象
     * @memberof Table
     */
    editHander(obj){
        this.props.edit(obj)
    }
    /**
     * @description 点击删除触发
     * @date 2020-06-16
     * @param {*} id 被删除对象的id
     * @memberof Table
     */
    delHander(id){
        this.props.del(id)
    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>名称</td>
                            <td>价格</td>
                            <td>数量</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.products.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.count}</td>
                                        <td>
                                            <button onClick={this.editHander.bind(this,item)}>编辑</button>
                                            <button onClick={this.delHander.bind(this,item.id)}>删除</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
