import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
import { NavLink , withRouter} from 'react-router-dom';

import * as Print2 from '../../state/printDoc';
import './style.css';

import ItemDetailRestaurantRx from '../ItemDetailRestaurant';
import * as Util from '../../state/Util';

import Icons from '../Icons/Icons';

import InputText from '../InputText';

var cartFormName = 'cartData';

const InfoUserFromName = 'InfoUser';




function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve,    
    gettingObserve:state.common.gettingObserve,
    filterObserve: state.common.filterObserve,
    data:state.common.filters[ownProps.operation],
    groups: state.common.filters["groups"],
    dataObj: state.common[ownProps.operation],
    categories: state.common.categories,
    calendar: state.common.calendar,
    year: state.common.year,
    month: state.common.month,
    blobImagesList: state.common.blobImagesList,
    thumbnailJsonBlobObserve: state.common.thumbnailJsonBlobObserve,
    isMobile: state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}







class CartRestarant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,      
      _Id: Util.generateUUID(),
      itmActive:null,
      show:false,
      item2cart:{}
    };
  }

  componentDidMount() {  
    var _th = this;
    const {forms} = this.props;
    setTimeout(()=>{
      _th.setState({show:true});
      var fff = forms[cartFormName];
      if(fff){
        _th.setState({item2cart:fff});
      }
    },40)
   
  } 
  
  
  componentWillMount(){    
    
  }
  
  componentWillUnmount(){    

  }
  

  showItems(){  
    var _th = this; 
    _th.setState({show:!_th.state.show});
  }
  

     
  close_DetailView(id){ 
    var _th = this;         
    var options = {id:id};
    this.props.dialogActions.CloseView(options); 
    _th.setState({itmActive:null,dimension:{}});
  }

/*
  close_DialogView(id,i){ 
    var _th = this;         
    var options = {id:id}; 
    _th.props.dialogActions.CloseDialog(options); 
    //_th.setState({itmActive:null,dimension:{}});
  }
*/
  
  showItem(id){  
    var _th = this; 
    const {list, extras, forms} = this.props;   
    let _item = list[id];    
    var _item2cart = forms[cartFormName];
    if(_item.directOrder){     
      if(!_item2cart[id]){
        _item2cart[id] = {};
        _item2cart[id]['size'] = {};
      }   
      _item2cart[id]['size'] = {}; 
      _item2cart[id]['size']['one'] = _item['price'];
      this.setState({item2cart:_item2cart})
      this.props.actions.UpdateFormbyName(cartFormName,_item2cart);

    }else if(this.state.itmActive!==id){
     
      let attrItm = `[item-plate="${id}"]`;
      let attrImg = `[img-item-plate="${id}"]`;
      let attrTitle = `[title-item-plate="${id}"]`;     
      let attrprice = `[price-item-plate="${id}"]`;      
        
      let elItm = document.querySelector(attrItm);
      let elImg = document.querySelector(attrImg);
      let elTitle = document.querySelector(attrTitle);
      let elPrice = document.querySelector(attrprice);

      let dimension = {
        item:elItm?elItm.getBoundingClientRect():{},
        img:elImg?elImg.getBoundingClientRect():{},
        title:elTitle?elTitle.getBoundingClientRect():{},
        price:elPrice?elPrice.getBoundingClientRect():{}
      }
          /*
          var backDetails = `[back-item-detail]`;
          var elmbackDetails = document.querySelector(backDetails);
          elmbackDetails.setAttribute("back-item-detail", true);
          */
      
      var isInCart = false;
      _item2cart && Object.keys(_item2cart).map(ordN=>{
        Object.keys(_item2cart[ordN]).map(_ids=>{
          if(_ids===id){
            isInCart = true;            
          }
        })
      }
      )

      if(isInCart){
          //_th.setState({itmActive:id,dimension:dimension});      
        /*
        let formName = `item_WDetails${id}`;   
        let _id = Util.Base64.encode(`_${formName}_`); 
        let _cont = <DialogDuplicateItemRX close={this.close_DialogView.bind(this,_id)} dimension={dimension} id={id} item={_item} extras={extras} confirm={this.confirm.bind(this,_id)}/>
        let options = {id:_id,zIndex:700,height:'300px',width:'550px',content:_cont};
        this.props.dialogActions.OpenDialog(options);
        */
      }
      else{
        _th.setState({itmActive:id,dimension:dimension});      
          let formName = `item_Details${id}`;   
          let _id = Util.Base64.encode(`_${formName}_`); 
          let _cont = <ItemDetailRestaurantRx closeView={this.close_DetailView.bind(this,_id)} dimension={dimension} id={id} orderId={id.concat('_').concat(Util.gen6CodeId())} item={_item} extras={extras}/>
          let options = {id:_id,zIndex:500,height:450,content:_cont};
          this.props.dialogActions.OpenView(options);

      }
    }
   
  }
  



  goToCart(){

  }





  HandleEdit(orderId, id){
    const { itemOnCart } = this.props;
    
    let _item =itemOnCart[orderId][id];
    let category = _item && _item['category']
    let extras = category && commonActions.data[category]['extras'];
    let data =  category && commonActions.data[category]['list'][id]?commonActions.data[category]['list'][id]:{};

    // let dataMenu =  data && data[groupActive] && data[groupActive]['list'] &&  data && data[groupActive]['list'][plateId];
    
     /*
    let _cont = 
    <DialogCheckoutCartRX 
      close={this.close_DialogView.bind(this,_id)} 
      itemOnCart={itemOnCart}
      confirm={this.ConfirmDelete.bind(this,_id)}
    />
    let options = {id:_id,zIndex:700,height:'550px',width:'450px',content:_cont};
    this.props.dialogActions.OpenDialog(options);
    */
    let formName = `item_Details${id}`;   
    let _id = Util.Base64.encode(`_${formName}_`); 
    let _cont = <ItemDetailRestaurantRx 
      closeView={this.close_DetailView.bind(this,_id)} 
      id={id} 
      orderId={orderId} 
      item={data} 
      extras={extras}/>
    let options = {id:_id,zIndex:500,height:450,content:_cont};
    this.props.dialogActions.OpenView(options);    
  }
  


  HandleCheckOut(){
    const { itemOnCart, isMobile } = this.props;
    let formName = `cart_checkout${Util.generateUUID()}`;   
    let _id = Util.Base64.encode(`_${formName}_`); 
    /*
    let _item =itemOnCart[id];
    let data =  commonActions.data;
    let dataMenu =  data && data[groupActive] && data[groupActive]['list'] &&  data && data[groupActive]['list'][plateId];
    */
    
    let _cont = 
    <DialogCheckoutCartRX 
      close={this.close_DialogView.bind(this,_id)} 
      itemOnCart={itemOnCart}
      confirm={this.ConfirmDelete.bind(this,_id)}
    />
    let options = {id:_id,zIndex:700,height:'550px',width:'450px',content:_cont};
    if(isMobile){
      this.props.dialogActions.OpenView(options);
    }else{
      this.props.dialogActions.OpenDialog(options);
    }
    
  }
  



  HandleDelete(id,plateId){
    const { itemOnCart, isMobile } = this.props;
    let formName = `item_WDetails${id}`;   
    let _id = Util.Base64.encode(`_${formName}_`); 
    let _item =itemOnCart[id];
    let dataMenu =  _item?_item[plateId]:{};
    let _cont = <DialogDeleteItemOnCartRX close={this.close_DialogView.bind(this,_id)} dataMenu={dataMenu} id={id} item={_item} confirm={this.ConfirmDelete.bind(this,_id)}/>
    let options = {id:_id,zIndex:700,height:'300px',width:'550px',content:_cont};
    
    if(isMobile){
      this.props.dialogActions.OpenView(options);
    }else{
      this.props.dialogActions.OpenDialog(options);
    }
  }
  

  ConfirmDelete(idClose, orderNo){
    const { itemOnCart } = this.props;
    var _item2cart = itemOnCart; 
    delete _item2cart[orderNo]
    this.props.actions.UpdateFormbyName(cartFormName,_item2cart);
    this.close_DialogView(idClose)
  }

  close_DialogView(id){ 
    var _th = this;        
    const { isMobile } = _th.props; 
    var options = {id:id};
    if(isMobile){
      _th.props.dialogActions.CloseView(options); 
    }else{
      _th.props.dialogActions.CloseDialog(options); 
    } 
    
    //_th.setState({itmActive:null,dimension:{}});
  }

  HandlePlusQty(orderNo,plateId){
    const { itemOnCart } = this.props;
    var _item2cart = itemOnCart; 
    _item2cart[orderNo][plateId]['qty'] += 1;
    this.props.actions.UpdateFormbyName(cartFormName,_item2cart);
  }

  HandleMinusQty(orderNo,plateId){
    const {  itemOnCart } = this.props;
    var _item2cart = itemOnCart; 
    if(_item2cart[orderNo][plateId]['qty']>1){
      _item2cart[orderNo][plateId]['qty'] -= 1;
      this.props.actions.UpdateFormbyName(cartFormName,_item2cart);
    }
  }



  render() {
    const { itemOnCart, isMobile } = this.props;
    let isInCart = true;
    var _item2cart = itemOnCart; 
    var totalCart = Util.calcTotalCart(itemOnCart);
      return (
            <div is-mobile={isMobile?'true':'false'} is-in-cart={'true'} className={`graph_Container isInCart ${isInCart?'isVisible':''}`} style={{width:isInCart?'99%':0}} >
                  {isMobile?null:<div className={'header_title_group'}>
                      <h3>{'CART'}</h3> 
                      <div className={'__save__btn'} >
                          <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#f8d6d3'}}  onClick={this.HandleCheckOut.bind(this)}>
                              <div className="hoverDiv orangeFlex "/>
                              <span className="text2D orangeFlex">{`CheckOut`} ${(totalCart+totalCart*0.06).toFixed(2)}</span>              
                          </div>
                      </div>                     
                    </div>}

                    {isMobile?totalCart>0?
                    <div className={`btnFloatCheckOut`}  onClick={this.HandleCheckOut.bind(this)}>
                        <div  className={`_wrp_`}>
                          <h5> 
                            {'CHECKOUT'}
                          </h5>
                          <p>
                            {(totalCart+totalCart*0.06).toFixed(2)}
                          </p>
                        </div>
                    </div>
                    :
                    <div className={`btnFloatCheckOut`}>
                      <div  className={`_wrp_`}>
                        <h5> 
                          {'Car is Empty'}
                        </h5>
                        <p>                       
                        </p>
                      </div>
                    </div>
                  :null}
                   {
                    _item2cart && Object.keys(_item2cart).map((orderNo,indOrd)=>{
                      return(<div>
                          {_item2cart[orderNo] && Object.keys(_item2cart[orderNo]).map((plateId)=>{ 
                            let orderDetail = _item2cart[orderNo][plateId];                        
                            let currentSize = orderDetail && orderDetail['size'];   
                            let currentQty = orderDetail && orderDetail['qty'];
                            let currentName = orderDetail && orderDetail['name'];
                            let currentPicture = orderDetail && orderDetail['picture'];                             
                            let currentSizeKey = currentSize && Object.keys(currentSize)[0]; 
                            let currentExtras = orderDetail && orderDetail['extras'];         
                            //let item =  data && data[groupActive]&& data[groupActive]['list'] &&  data && data[groupActive]['list'][plateId];
                            let isLastItem = Object.keys(_item2cart).length-1 === indOrd?true:false;
                            if(orderDetail){                              
                              let ImgUrlPlt = commonActions.getBlobImage(currentPicture) || currentPicture;
                              let total = Util.calcTotal(itemOnCart,plateId,orderNo) || 0;                              
                             
                              return(
                                <div className={`_cart_item_ ${isLastItem?'_last':''}`}>
                                  <div className={'_cart_item_top_'}>
                                    <div className={'_cart_item_top_left_'} onClick={this.HandleEdit.bind(this,orderNo,plateId)}>
                                      <img src={ImgUrlPlt} alt={''} />
                                      {isMobile?null:<div >
                                        <div  className={'_cart_item_name_'}>
                                        {currentSizeKey?currentSizeKey!=='*'?currentSizeKey:null:null} {currentName}
                                        </div>
                                      </div>
                                      }
                                    </div>
                                    <div className="flexSpace"/>
                                    <div className={'_cart_item_top_right_'}>
                                      <div >
                                      {isMobile?<div >
                                        <div  className={'_cart_item_name_'}>
                                        {currentSizeKey?currentSizeKey!=='*'?currentSizeKey:null:null} {currentName}
                                        </div>
                                      </div>
                                      :null}
                                        <div  className={'_cart_item_price_'}>
                                          ${total?total.toFixed(2):0}
                                        </div>
                                        {isMobile?null:
                                        <div className={isMobile?'_flexDisplay_':''}>
                                        <div  className={'_cart_item_edit_qty_'}>
                                          <div className={'__save__btn'} >
                                            <div className="center--Container grayStyle numberBtn" style={{"--color-tab--base--hover":'#f8d6d3'}} onClick={this.HandleMinusQty.bind(this,orderNo,plateId)}>
                                              <div className="hoverDiv orangeFlex "/>
                                              {currentQty>1?
                                              <Icons name={'minus'} color={'#555'} size={28}/>
                                              :null}
                                            </div>
                                          </div>
                                          <div  className={'_cart_item_qty_'}>
                                          {currentQty}
                                          </div>
                                          <div className={'__save__btn'} >
                                            <div className="center--Container grayStyle numberBtn" style={{"--color-tab--base--hover":'#f8d6d3'}}  onClick={this.HandlePlusQty.bind(this,orderNo,plateId)}>
                                              <div className="hoverDiv orangeFlex "/>
                                              <Icons name={'add'} color={'#555'} size={24}/>            
                                            </div>
                                          </div>
                                        </div>

                                        <div  className={'_cart_item_size_'}>
                                          <div className={'__save__btn'} >
                                            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#f8d6d3'}}  onClick={this.HandleDelete.bind(this,orderNo,plateId)}>
                                              <div className="hoverDiv fireRed "/>
                                              <span className="text2D fireRed">{`Remove`}</span>              
                                            </div>
                                          </div>
                                        </div>
                                        </div>
                                      }
                                      </div>
                                    
                                    
                                  </div>
                                  </div>
                                  {isMobile?
                                        <div className={isMobile?'_flexDisplay_':''}>
                                           <div  className={'_cart_item_size_'}>
                                          <div className={'__save__btn'} >
                                            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#f8d6d3'}}  onClick={this.HandleDelete.bind(this,orderNo,plateId)}>
                                              <div className="hoverDiv fireRed "/>
                                              <span className="text2D fireRed">{`Remove`}</span>              
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flexSpace"/>
                                       
                                        <div  className={'_cart_item_edit_qty_'}>
                                          <div className={'__save__btn'} >
                                            <div className="center--Container grayStyle numberBtn" style={{"--color-tab--base--hover":'#f8d6d3'}} onClick={this.HandleMinusQty.bind(this,orderNo,plateId)}>
                                              <div className="hoverDiv orangeFlex "/>
                                              {currentQty>1?
                                              <Icons name={'minus'} color={'#555'} size={28}/>
                                              :null}
                                            </div>
                                          </div>
                                          <div  className={'_cart_item_qty_'}>
                                          {currentQty}
                                          </div>
                                          <div className={'__save__btn'} >
                                            <div className="center--Container grayStyle numberBtn" style={{"--color-tab--base--hover":'#f8d6d3'}}  onClick={this.HandlePlusQty.bind(this,orderNo,plateId)}>
                                              <div className="hoverDiv orangeFlex "/>
                                              <Icons name={'add'} color={'#555'} size={24}/>            
                                            </div>
                                          </div>
                                        </div>
                                        </div>
                                    :null  }

                                 {currentExtras? <div className={`_separator_`}/>  :null}
                                  <div  className={'_cart_item_sub_'} style={currentExtras?{minHeight:'100px'}:{}}>
                                    {
                                      currentExtras && Object.keys(currentExtras).map(_extra_=>{
                                        let _qty = currentExtras[_extra_]['qty'];
                                        if(_qty!==0){
                                          let extrapicture= currentExtras[_extra_]['picture'];
                                          let ImgUrl = commonActions.getBlobImage(extrapicture);
                                          return(
                                            <div className={`_cart_item_sub_extras ${_qty>0?'add':'rmv'}`}>                                          
                                              <img src={ImgUrl} alt={''} />
                                              <div className={'_qty'}>
                                              {_qty>0?_qty:'X'}
                                              </div>
                                              <div className={'_name'}>
                                              {_extra_}
                                              </div>                                          
                                            </div>
                                          )
                                        }else{
                                          return null;
                                        }
                                      })
                                    }                                  
                                  </div>
                                </div>
                              )
                            }else{
                              return null
                            }
                          })}
                      </div>)                     
                      
                    })
                   }
                  
                </div>         
      )
    }
}


export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CartRestarant));









class DialogDeleteItemOnCart extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      editView:false
    };
  }

  componentDidMount() {  
   
  } 

  closeView(){  
    if(typeof this.props.close === "function"){
      this.props.close()
    }
  }

  HandleConfirm(i, d, p){    
    if(typeof this.props.confirm === "function"){
      this.props.confirm(i,d,p);
    }
  }
  
  

  EditView() {
    this.setState({editView:!this.state.editView});
  } 

  
  render(){
    const {item, id, dataMenu, thumbnailJsonBlobObserve} = this.props;
    
    let style2Print = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"};    
    let style2PrintError = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"};
    
    if(dataMenu){ 
    let ImgUrl = commonActions.getBlobImage(dataMenu.picture) || dataMenu.picture;               
      return(
          <div  className={`_dialog_ingredient_edit  _duplicateOrder`} style={style2PrintError}>          
            <div  className={`_details_`}>  
              <div className="printcallout" >
                <div className="printcallout-body">
                  <div className={`printcallout-icon `}>
                    <img src={ImgUrl} alt={''} />
                  </div>
                  <div className="printcallout-message">
                    <div>
                        <span>{dataMenu.name.toUpperCase()}</span>
                    </div>
                    <div>
                      {false?`with OrderId ${id.toUpperCase()}`:''}
                    </div>
                    <div>
                      {`Will be delete !!!`}
                    </div>
                    <div className={`_size_price`}> {item.price>0?<span>{``}</span>:<span>{''}</span>}</div>   
                  </div>
                </div>
              </div>
            </div>
            <div  className={`_actions_`}>             
              <div className="flexSpace"/>
              <div className={'__save__btn '}>
              <NavLink to={{pathname: '/restaurant', search:`?vId=${id}&tb=cart`}}  onClick={this.closeView.bind(this)}>
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                  <div className="hoverDiv grayStyle "/>
                  <span className="text2D grayStyle">{'Cancel'}</span>              
                </div> 
                </NavLink>
              </div>
              
              <div className={'__save__btn'} >
                  <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleConfirm.bind(this,id)}>
                    <div className="hoverDiv fireRed "/>
                    <span className="text2D fireRed">{`Delete`}</span>
                  </div> 
                </div>
            </div>          
          </div>
      )
    }else{
      return null;
    }
  }
}




const DialogDeleteItemOnCartRX = connect(mapStateToProps, mapDispatchToProps)(DialogDeleteItemOnCart);





class DialogCheckoutCart extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      tipView:true,
      ConfirmView:false,
      tip:0,
      rangeTip:0
    };
  }

  componentDidMount() {  
   
  } 

  closeView(){  
    if(typeof this.props.close === "function"){
      this.props.close()
    }
  }

  HandleConfirm(){    
    this.setState({tipView:false});
  }
  
  updTip(t) {
    this.setState({tip:t,rangeTip:t});
  } 

  EditView() {
    this.setState({editView:!this.state.editView});
  } 

  HandleContinue() {
    this.setState({tipView:false});
  } 

  handleTipRangeChange(e) {
    var _value = parseFloat((e.target.value).toString());    
    this.setState({tip:_value});
    this.setState({tip:_value,rangeTip:_value});
  } 

  handleTipRangeBlur(e) {    
    this.setState({rangeTip:this.state.tip});
  } 

  HandleCheckOutConfirm(){
    this.setState({ConfirmView:true});
  }

  handlerInputValue(){


  }

  updConfirmMethod(v){
    this.setState({confirmMethod:v});
  }


  HandleSubmitOrder(){
    const {itemOnCart, forms} = this.props;
    var _frmName = forms && forms[InfoUserFromName]?forms[InfoUserFromName]:{};
    let cart = {
      id:Util.genId(),
      date:(new Date()).getTime(),
      tip:this.state.tip,
      items:itemOnCart,
      info:_frmName
    }
    this.props.actions.UpdateFormbyName('orderSuccess',cart);
    this.props.actions.UpdateFormbyName(cartFormName,{});
    Print2.PrintReceiptOrder(cart);
    this.closeView();
  }


  
  render(){
    const {forms, id, itemOnCart, isMobile, thumbnailJsonBlobObserve} = this.props;
    
    let style2Print = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"};    
    let style2PrintError = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"};
    let amount = Util.calcTotalCart(itemOnCart);
    let total = amount && (amount + amount*0.06);
    var _frmName = forms && forms[InfoUserFromName]?forms[InfoUserFromName]:{}; 
   
    return(
          <div is-mobile={isMobile?'true':'false'} className={`_dialog_add_tip ${isMobile?'isMobile':''} ${this.state.tipView?'':'_checkList_'}`} style={style2PrintError}> 
            <div  className={`_dialog_add_tip_header`} >
              {this.state.tipView?` Add Tip `:this.state.ConfirmView?`Confirm`:`CheckOut`}
            </div>
            {this.state.tipView? 
            <div className={`_body_ tipView`}>
              <div className={`_dialog_add_tip_totals`}>
                <div className={`_dialog_add_tip_totals_wrp`}>
                  <div className={`_total_items`}>
                    <p>Amount</p>
                    <span>${amount?amount.toFixed(2):0.00}</span>
                  </div>           
                  <div className="flexSpace"/>
                  <div className={`_total_items`}>
                    <p>Total</p>
                    <span>${total?total.toFixed(2):0.00}</span>
                  </div>
                </div>
              </div>
              <div className={`_dialog_add_tip_amount`}>
                ${this.state.tip.toFixed(2)}
              </div>
              <div className={`_dialog_add_tip_range`}>
                <input type="range" min="1" max="25" step="0.25" class="slider" id="myRange" value={this.state.rangeTip} onChange={this.handleTipRangeChange.bind(this)} onMouseUp={this.handleTipRangeBlur.bind(this)}/>
              </div>
              

              <div className={`_dialog_add_tip_btns`}>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,0)}>
                    <p>cash</p>
                  </div>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,amount*.15)}>
                    <p>${amount?(amount*.15).toFixed(2):0.00}</p>
                    <p>15%</p>
                  </div>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,amount*.2)}>
                    <p>${amount?(amount*.2).toFixed(2):0.00}</p>
                    <p>20%</p>
                  </div>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,amount *.3)}>
                    <p>${amount?(amount *.3).toFixed(2):0.00}</p>
                    <p>30%</p>
                  </div>
              </div>
            </div>
            :this.state.ConfirmView?
              <div className={`_body_ confirmView`}>
                <div className={`_dialog_add_tip_range`}>                  
                  <InputText icon={`textFormat`} form={InfoUserFromName} field={`name`} minLength={3} placeholder={'Name'} OnChange={this.handlerInputValue.bind(this,`name`)}  initvalue={_frmName[`name`]}/>
                </div>
                <div>
                <div className={`_total_items`}>
                    <p>Choose a way to send your receipt?</p>
                </div>
                <div className={`_dialog_add_tip_btns`}>
                  <div className={`_tip_box_ ${this.state.confirmMethod==="email"?"_active":""}`} onClick={this.updConfirmMethod.bind(this,'email')}>                    
                    <Icons name={'email'} color={'#555'} size={26}/>
                    <p>Email</p>
                  </div>
                  <div className={`_tip_box_ ${this.state.confirmMethod==="phone"?"_active":""}`} onClick={this.updConfirmMethod.bind(this,'phone')}>
                    <Icons name={'cellphone'} color={'#555'} size={26}/>
                    <p>Phone</p>
                  </div>                  
                </div>
                {this.state.confirmMethod==="phone"?
                <div className={`_dialog_add_tip_range`}>
                  <InputText icon={`textFormat`} form={InfoUserFromName} field={`phoneNumber`} phone={true} placeholder={'Phone Number'} OnChange={this.handlerInputValue.bind(this,`phoneNumber`)}  initvalue={_frmName[`phoneNumber`]}/>
                </div>:null}
                {this.state.confirmMethod==="email"?
                <div className={`_dialog_add_tip_range`}>
                  <InputText icon={`textFormat`} form={InfoUserFromName} field={`email`} email={true} placeholder={'Email'} OnChange={this.handlerInputValue.bind(this,`email`)}  initvalue={_frmName[`email`]}/>
               </div>
               :null}
                </div>
            </div>
            :
            <div className={`_body_ `}>
                <div>
                  { itemOnCart && Object.keys(itemOnCart).map(orderId=>{
                    return (
                      <div key={orderId} className={`_order_`}>
                      {
                        Object.keys(itemOnCart[orderId]).map(pltId=>{
                          let pltItem =  itemOnCart[orderId][pltId]
                          let sizeKey = itemOnCart[orderId][pltId]['size'] && Object.keys(itemOnCart[orderId][pltId]['size'])[0];
                          let amount = itemOnCart[orderId][pltId]['size'][sizeKey];
                          let _extras = itemOnCart[orderId][pltId]['extras'];
                          return (
                            <div  key={pltId} className={`_order_detail_`}>
                              <div  className={`_order_detail_item`}>
                                <span>{pltItem.qty>1?pltItem.qty:''} {sizeKey?sizeKey!=='*'?sizeKey:null:null} {pltItem.name} </span> 
                                <div className="flexSpace"/>
                                <div className={'_price'}>{(amount*pltItem.qty).toFixed(2)}</div>
                              </div>
                              <div className={'_extras_'}>
                                {
                                  _extras && Object.keys(_extras).map(extId=>{
                                    let extrDetails = _extras[extId];
                                    return(
                                      <div key={extId}  className={'_extras_Items_'}>
                                  {extrDetails.qty<0?<p>{`no ${extId}`}</p>:<p>{extId} {extrDetails.qty>0?extrDetails.price>0?`  $${extrDetails.price*extrDetails.qty}`:'':''}</p>}
                                        <div className="flexSpace"/>
                                        {extrDetails.qty>=0?extrDetails.price>0?<div className={'_price'}>{((extrDetails.price*extrDetails.qty)*pltItem.qty).toFixed(2)}</div>:null:null}
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            
                            </div>
                          )
                        })
                      } 
                      </div>
                    )
                  })}  
                </div>
                <div className={`_separator_`}/> 
                <div  className={`_checkout_totals_wrp`}>
                  <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                    <span>Amount</span>  <p>{amount.toFixed(2)}</p>
                    </div>
                  </div>
                  {
                    this.state.tip?
                    <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                      <span>Tip</span> <p>{this.state.tip.toFixed(2)}</p>
                    </div>
                  </div>:null
                  }
                  
                  <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                    <span>Tax (6%)</span>  <p>{(amount*.06).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                    <span>Total</span>  <p>{(total+this.state.tip).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
            </div>
            }
            <div  className={`_actions_`}>             
              <div className="flexSpace"/>
              <div className={'__save__btn '}>
              <NavLink to={{pathname: '/restaurant', search:`?vId=${id}&tb=cart`}}  onClick={this.closeView.bind(this)}>
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                  <div className="hoverDiv grayStyle "/>
                  <span className="text2D grayStyle">{'Cancel'}</span>              
                </div> 
                </NavLink>
              </div>
              {this.state.tipView? 
              <div className={'__save__btn'} >
                  <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleContinue.bind(this,id)}>
                    <div className="hoverDiv orangeFlex "/>
                    <span className="text2D orangeFlex">{`Continue`}</span>
                  </div> 
                </div>:
                this.state.ConfirmView?
                <div className={'__save__btn'} >
                  <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleSubmitOrder.bind(this,id)}>
                    <div className="hoverDiv orangeFlex "/>
                    <span className="text2D orangeFlex">{`Submit Order`}</span>
                  </div> 
                </div>:
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleCheckOutConfirm.bind(this,id)}>
                    <div className="hoverDiv orangeFlex "/>
                    <span className="text2D orangeFlex">{`Checkout`}</span>
                </div>}
            </div>         
          </div>
      )
  
  }
}




const DialogCheckoutCartRX = connect(mapStateToProps, mapDispatchToProps)(DialogCheckoutCart);































/*
  HandleCheckOutConfirmDialog(){
    const { itemOnCart, isMobile } = this.props;
    let formName = `cart_checkout${Util.generateUUID()}`;   
    let _id = Util.Base64.encode(`_${formName}_`); 
   
   this.closeView();
    let _cont = 
    <DialogCheckoutConfirmRX
      close={this.close_DialogView.bind(this,_id)} 
      itemOnCart={itemOnCart}
      tip={this.state.tip}
      //confirm={this.ConfirmDelete.bind(this,_id)}
    />
    let options = {id:_id,zIndex:700,height:'550px',width:'450px',content:_cont};
    if(isMobile){
      this.props.dialogActions.OpenView(options);
    }else{
      this.props.dialogActions.OpenDialog(options);
    }
    
  }


  close_DialogView(id){ 
    var _th = this;        
    const { isMobile } = _th.props; 
    var options = {id:id};
    if(isMobile){
      _th.props.dialogActions.CloseView(options); 
    }else{
      _th.props.dialogActions.CloseDialog(options); 
    } 
    
    
  }
*/




/*








class DialogCheckoutConfirm extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      tipView:true,
      tip:0,
      rangeTip:0
    };
  }

  componentDidMount() {  
   
  } 

  closeView(){  
    if(typeof this.props.close === "function"){
      this.props.close()
    }
  }

  HandleConfirm(){    
    this.setState({tipView:false});
  }
  
  updTip(t) {
    this.setState({tip:t,rangeTip:t});
  } 

  EditView() {
    this.setState({editView:!this.state.editView});
  } 

  HandleContinue() {
    this.setState({tipView:false});
  } 

  handleTipRangeChange(e) {
    var _value = parseFloat((e.target.value).toString());    
    this.setState({tip:_value});
    this.setState({tip:_value,rangeTip:_value});
  } 

  handleTipRangeBlur(e) {    
    this.setState({rangeTip:this.state.tip});
  } 
  
  render(){
    const {item, id, itemOnCart, isMobile, thumbnailJsonBlobObserve} = this.props;
    
    let style2Print = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"};    
    let style2PrintError = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"};
    let amount = calcTotalCart(itemOnCart);
    let total = amount && (amount + amount*0.06);

    return(
          <div is-mobile={isMobile?'true':'false'} className={`_dialog_add_tip ${isMobile?'isMobile':''} ${this.state.tipView?'':'_checkList_'}`} style={style2PrintError}> 
            <div  className={`_dialog_add_tip_header`} >
              {`Confirm`}
            </div>
            <div className={`_body_ tipView`}>
              <div className={`_dialog_add_tip_totals`}>
                <div className={`_dialog_add_tip_totals_wrp`}>
                  <div className={`_total_items`}>
                    <p>Amount</p>
                    <span>${amount?amount.toFixed(2):0.00}</span>
                  </div>           
                  <div className="flexSpace"/>
                  <div className={`_total_items`}>
                    <p>Total</p>
                    <span>${total?total.toFixed(2):0.00}</span>
                  </div>
                </div>
              </div>
              <div className={`_dialog_add_tip_amount`}>
                ${this.state.tip.toFixed(2)}
              </div>
              <div className={`_dialog_add_tip_range`}>
                <input type="range" min="1" max="25" step="0.25" class="slider" id="myRange" value={this.state.rangeTip} onChange={this.handleTipRangeChange.bind(this)} onMouseUp={this.handleTipRangeBlur.bind(this)}/>
              </div>
              

              <div className={`_dialog_add_tip_btns`}>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,0)}>
                    <p>cash</p>
                  </div>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,amount*.15)}>
                    <p>${amount?(amount*.15).toFixed(2):0.00}</p>
                    <p>15%</p>
                  </div>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,amount*.2)}>
                    <p>${amount?(amount*.2).toFixed(2):0.00}</p>
                    <p>20%</p>
                  </div>
                  <div className={`_tip_box_`} onClick={this.updTip.bind(this,amount *.3)}>
                    <p>${amount?(amount *.3).toFixed(2):0.00}</p>
                    <p>30%</p>
                  </div>
              </div>
            </div>
            
            {false?
            <div className={`_body_ `}>
                <div>
                  { Object.keys(itemOnCart).map(orderId=>{
                    return (
                      <div key={orderId} className={`_order_`}>
                      {
                        Object.keys(itemOnCart[orderId]).map(pltId=>{
                          let pltItem =  itemOnCart[orderId][pltId]
                          let sizeKey = itemOnCart[orderId][pltId]['size'] && Object.keys(itemOnCart[orderId][pltId]['size'])[0];
                          let amount = itemOnCart[orderId][pltId]['size'][sizeKey];
                          let _extras = itemOnCart[orderId][pltId]['extras'];
                          return (
                            <div  key={pltId} className={`_order_detail_`}>
                              <div  className={`_order_detail_item`}>
                                <span>{pltItem.qty>1?pltItem.qty:''} {sizeKey?sizeKey!=='*'?sizeKey:null:null} {pltItem.name} </span> 
                                <div className="flexSpace"/>
                                <div className={'_price'}>{(amount*pltItem.qty).toFixed(2)}</div>
                              </div>
                              <div className={'_extras_'}>
                                {
                                  _extras && Object.keys(_extras).map(extId=>{
                                    let extrDetails = _extras[extId];
                                    return(
                                      <div key={extId}  className={'_extras_Items_'}>
                                  {extrDetails.qty<0?<p>{`no ${extId}`}</p>:<p>{extId} {extrDetails.qty>0?extrDetails.price>0?`  $${extrDetails.price*extrDetails.qty}`:'':''}</p>}
                                        <div className="flexSpace"/>
                                        {extrDetails.qty>=0?extrDetails.price>0?<div className={'_price'}>{((extrDetails.price*extrDetails.qty)*pltItem.qty).toFixed(2)}</div>:null:null}
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            
                            </div>
                          )
                        })
                      } 
                      </div>
                    )
                  })}  
                </div>
                <div className={`_separator_`}/> 
                <div  className={`_checkout_totals_wrp`}>
                  <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                    <span>Amount</span>  <p>{amount.toFixed(2)}</p>
                    </div>
                  </div>
                  {
                    this.state.tip?
                    <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                      <span>Tip</span> <p>{this.state.tip.toFixed(2)}</p>
                    </div>
                  </div>:null
                  }
                  
                  <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                    <span>Tax (6%)</span>  <p>{(amount*.06).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`_checkout_totals`}>
                    <div className="flexSpace"/>
                    <div className={`_checkout_totals_item`}>
                    <span>Total</span>  <p>{(total+this.state.tip).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
            </div>
            :null}
            <div  className={`_actions_`}>             
              <div className="flexSpace"/>
              <div className={'__save__btn '}>
              <NavLink to={{pathname: '/restaurant', search:`?vId=${id}&tb=cart`}}  onClick={this.closeView.bind(this)}>
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                  <div className="hoverDiv grayStyle "/>
                  <span className="text2D grayStyle">{'Cancel'}</span>              
                </div> 
                </NavLink>
              </div>
              {this.state.tipView? 
              <div className={'__save__btn'} >
                  <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleContinue.bind(this,id)}>
                    <div className="hoverDiv orangeFlex "/>
                    <span className="text2D orangeFlex">{`Continue`}</span>
                  </div> 
                </div>:<div className={'__save__btn'} >
                  <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleConfirm.bind(this,id)}>
                    <div className="hoverDiv orangeFlex "/>
                    <span className="text2D orangeFlex">{`Checkout`}</span>
                  </div> 
                </div>}
            </div>         
          </div>
      )
  
  }
}




const DialogCheckoutConfirmRX = connect(mapStateToProps, mapDispatchToProps)(DialogCheckoutConfirm);








*/







