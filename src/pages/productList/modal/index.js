import React from 'react';
import { Modal } from 'antd';

/**
 * @description 模态框组件
 * @date 2020-06-12
 * @class ModalContent
 * @extends {React.Component}
 */
class ModalContent extends React.Component {
    constructor () {
        super()
        this.updatePrice=this.updatePrice.bind(this)
    }
    /**
     * @description 修改模态框中商品的价格
     * @date 2020-06-12
     * @param {*} e
     * @memberof ModalContent
     */
    updatePrice(e){
        let value=e.target.value
        this.props.changeObjHander(value)
    }
    /**
     * @description 点击模态框的确定按钮
     * @memberof ModalContent
     */
    handleOk =()=> {
        this.props.changePriceHander()
    }
    
    /**
     * @description 点击模态框的取消按钮
     * @memberof ModalContent
     */
    handleCancel =() => {
        this.props.unopenModalHander()

    }
    render () {
        let { visible, product } =this.props
        return (
            <Modal
                title="修改商品价格"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div>名称<input className='input' value={ product.name } readOnly/></div>
                <div>价格<input className='input' onChange={ this.updatePrice } value={ product.price }/></div>
                <div>数量<input className='input'  value={ product.count } readOnly/></div>
            </Modal>
        )

    }
}

export default ModalContent;