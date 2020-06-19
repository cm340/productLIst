import React, { Component } from 'react';
import Head from './header/index';
import Search from './search/index';
import Table from './table/index';
import Modal from './modal/index';
import Pagination from './pagination/index';
export default class ProductList extends Component {
    constructor(props){
        super(props)
        this.state={
            productList:[],//商品列表总数
            pageIndex:1,//当前页面页码
            products:[],//当前页面展示的商品列表数
            visible:false,//模态框的显示与隐藏
            product:{},//被修改的对象
            totalNum: 20,//商品总条数
            pageSize:10,
            searchName:''
        }
    }
    componentDidMount(){
        this.getList()
    }
    /**
     * @description 获取所有商品数据列表
     * @param {*} searchName 搜索框输入的值 pageSize 一页的条数 pageIndex 当前页
     * @memberof ProductList
     */
    getList=()=>{
        fetch('/mock.json')
        .then((res) => {return res.json();})
        .then((data) => {
            this.setState({
                productList:data.products,
            })
            this.getCurrentProducts()
        })
       .catch((e) => {console.log(e.message);});
    }
    /**
     * @description  获取当前页面的商品列表
     * @date 2020-06-18
     * @param {string} [searchName='']
     * @memberof ProductList
     */
    getCurrentProducts(searchName=''){
        const { pageSize, pageIndex, productList}=this.state
        const searchResult=productList.filter(item=>item.name&&item.name.indexOf(searchName)>-1).slice((pageIndex-1)*pageSize,pageSize*pageIndex)
        this.setState({
            products:searchResult
        })
    }
    /**
     * @description 点击编辑按钮触发
     * @param {*} obj 带点击的对象
     * @memberof ProductList
     */
    edit=(obj)=>{
        this.setState({
            product:obj,
            visible:true
        })
    }
    /**
     * @description 修改模态框input输入框的值
     * @param {*} value 修改后的值
     * @memberof ProductList
     */
    changeObj=(value)=>{
        let newObj;
        newObj=Object.assign({},this.state.product)
        newObj.price=value
        this.setState ({
            product: newObj
        })
    
    }
    /**
     * @description 点击模态框的确认触发修改商品价格
     * @memberof ProductList
     */
    changePrice=()=>{
        const { productList, product}=this.state
        productList.some(item=>{
            if(item.id===product.id){
                item.price=product.price
                return true
            }
        })
        this.setState({
            visible:false
        })
    }
    /**
     * @description 点击按钮删除
     * @param {*} id 被删除对象的id
     * @memberof ProductList
     */
    del=(id)=>{
        const { productList }=this.state
        const arr=[id]
        const otherProducts=productList.filter(item=> {return !arr.includes(item.id)})
        this.setState({
            productList:otherProducts,
            totalNum:otherProducts.length
        },()=>this.getCurrentProducts())
    }
    /**
     * @description 页码发生改变
     * @param {*} pageIndex 当前所在页码
     * @memberof ProductList
     */
    changePage=(pageIndex)=>{
        this.setState({
            pageIndex
        },()=>this.getCurrentProducts())
    }
    render() {
        const { products, visible, product,totalNum, pageIndex, PageSize}=this.state
        return (
            <div>
                <Head/>
                <Search
                    search={this.getCurrentProducts.bind(this)}
                />
                <Table 
                    products={products}
                    edit={this.edit}
                    del={this.del}
                />
                <Modal 
                    visible={visible} 
                    product={product}
                    changeObjHander={this.changeObj}
                    changePriceHander={this.changePrice}
                />
                <Pagination
                    totalNum={totalNum}
                    changePize={this.changePage}
                    pageIndex={pageIndex}
                    PageSize={PageSize}
                />
            </div>
        )
    }
}
