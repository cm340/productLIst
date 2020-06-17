import React, { Component } from 'react';
import { Pagination } from 'antd';

/**
 * @description 
 * @date 2020-06-16 分页组件
 * @class PaginationContent
 * @extends {Component}
 */
class PaginationContent extends Component {

    changePizeHander=(pageIndex)=>{
        this.props.changePize(pageIndex)
    }
    render() {
        const {  totalNum, pageIndex, PageSize } = this.props
        return (
            <div>
                <Pagination 
                    defaultCurrent={pageIndex} 
                    defaultPageSize={PageSize}
                    total={totalNum}
                    onChange={this.changePizeHander}
                />
            </div>
        )
    }
}
export default PaginationContent;