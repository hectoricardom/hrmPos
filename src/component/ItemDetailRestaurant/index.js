import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';




import BezelAddCart from '../BezelAddCart';

import RippleHRM from '../RippleHRM';

import './style.css';

import IngredientOptionRx from '../IngredientOption';


import * as Util from '../../state/Util';
import { NavLink , withRouter} from 'react-router-dom';

import Icons from '../Icons/Icons';




var cartFormName = 'cartData';






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










class ItemDetailRestarant extends Component {

  close_DetailView(){
    if(typeof this.props.closeView === "function"){
      this.props.closeView()
    }
  }

  render(){    
    const {dimension, 
    id, 
    orderId,
    item, 
    extras,
    groupActive,    
  } = this.props;

      return (
        <ItemDetailDesktopRestarantRX 
          closeView={this.close_DetailView.bind(this)} 
          dimension={dimension} 
          id={id} 
          orderId={orderId} 
          item={item} 
          extras={extras}
          groupActive={groupActive}
        />
        )
  }  
  
}














class ItemDetailDesktopRestarant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,      
      _Id: Util.generateUUID(),
      itmActive:null,
      show:false,
      isInCart:false,
      itemAddedCart:false,
      itemAddedOverlay:false,
      item2cart:{}
    };
  }

  componentDidMount() {  
    var _th = this;
    const {forms, orderId} = this.props;
    setTimeout(()=>{
      _th.setState({show:true});
      var fff = forms[cartFormName];
      let isInCart = false;
      if(fff && orderId && fff[orderId]){
        isInCart = true;
      }
      if(fff){
        _th.setState({item2cart:fff, isInCart:isInCart});
      }
    },40)
   
  } 
  
  
  componentWillMount(){    
    
  }
  
  componentWillUnmount(){    

  }
  
  closeView(){  
    if(typeof this.props.closeView === "function"){
      this.props.closeView()
    }
  }

  updOrder(g,groupActive,i,q,p){    
    const {id,orderId, item} = this.props;
    var _item2cart = this.state.item2cart;
    if(!_item2cart[orderId]){
      _item2cart[orderId] = {};
      _item2cart[orderId][id] = {};
      _item2cart[orderId][id]['qty'] = 1;
      _item2cart[orderId][id]['name'] = item.name;
      _item2cart[orderId][id]['category'] = groupActive;
      _item2cart[orderId][id]['picture'] = item.picture;
    }
    if(!_item2cart[orderId][id]['extras']){
      _item2cart[orderId][id]['extras'] = {}
    }
    if(!_item2cart[orderId][id]['extras'][i]){
      _item2cart[orderId][id]['extras'][i] = {};
      _item2cart[orderId][id]['extras'][i]['qty'] = 0;
      _item2cart[orderId][id]['extras'][i]['price'] = p;
      _item2cart[orderId][id]['extras'][i]['group'] = g;
      let extraGrpDetail= commonActions.extrasOptions[g][i];
      _item2cart[orderId][id]['extras'][i]['picture'] = extraGrpDetail.picture;
    }
    if(!isNaN(q)){
      _item2cart[orderId][id]['extras'][i]['qty'] += q*1;   
    }else{
      _item2cart[orderId][id]['extras'][i]['qty'] = 0;
    }
    this.setState({item2cart:_item2cart})  
    // this.props.actions.UpdateFormbyName(cartFormName,_item2cart);    
  }

  updOrderSize(i,groupActive){
    const { item, id, orderId} = this.props;
    var _item2cart = this.state.item2cart;
    if(!_item2cart[orderId]){
      _item2cart[orderId] = {};
      _item2cart[orderId][id] = {};
      _item2cart[orderId][id]['qty'] = 1;
      _item2cart[orderId][id]['name'] = item.name;
      _item2cart[orderId][id]['category'] = groupActive;
      _item2cart[orderId][id]['picture'] = item.picture;

    }   
    if(!_item2cart[orderId][id]['size']){
      _item2cart[orderId][id]['size'] = {}
    }

    _item2cart[orderId][id]['size'] = {}; 
    _item2cart[orderId][id]['size'][i] = item['size'][i];
    this.setState({item2cart:_item2cart})
    // this.props.actions.UpdateFormbyName(cartFormName,_item2cart);        
  }


  SaveView(id,currentSizeKey){  
    const { item2cart } = this.state;
    if(currentSizeKey){
      this.props.actions.UpdateFormbyName(cartFormName,item2cart);     
      this.bezelCart.Open();
    }
  }

  showItems(){  
    var _th = this; 
    _th.setState({show:!_th.state.show});
  }
  

  
  showItem(id){
    var _th = this; 
    if(this.state.itmActive!==id){ 
      var attrItm = `[item-plate="${id}"]`;
      var attrImg = `[img-item-plate="${id}"]`;
      var attrTitle = `[title-item-plate="${id}"]`;     
      var attrprice = `[price-item-plate="${id}"]`;      
     
      var elItm = document.querySelector(attrItm);
      var elImg = document.querySelector(attrImg);
      var elTitle = document.querySelector(attrTitle);
      var elPrice = document.querySelector(attrprice);

      var backDetails = `[back-item-detail]`;
      var elmbackDetails = document.querySelector(backDetails);
     // elmbackDetails.setAttribute("back-item-detail", true);

      var dimension = {
        item:elItm?elItm.getBoundingClientRect():{},
        img:elImg?elImg.getBoundingClientRect():{},
        title:elTitle?elTitle.getBoundingClientRect():{},
        price:elPrice?elPrice.getBoundingClientRect():{}
      }
      
      _th.setState({itmActive:id,dimension:dimension});

    }
   
  }
  


  calcTotal(){  
    const {id, orderId} = this.props;
    let value = 0;
    let currentOrder = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id];
    let currentSize = currentOrder && currentOrder['size'];


    let currentSizeKey = currentSize && Object.keys(currentSize)[0];  
    let valeSize = currentSizeKey && currentSize[currentSizeKey]?currentSize[currentSizeKey]:0;
    value += valeSize;
    currentOrder && currentOrder['extras']   && Object.keys(currentOrder['extras']).map(_ext=>{
      let _extQty = currentOrder['extras'][_ext]['qty']?currentOrder['extras'][_ext]['qty']:0;
      let _price = currentOrder['extras'][_ext]['price']?currentOrder['extras'][_ext]['price']:0;
      if(_extQty>0){
        value += _price*_extQty; 
      }          
    })

    return value;
  }
  


  ConfirmSave(){ 
    if(typeof this.props.closeView === "function"){
      this.props.closeView()
     }
  }


  refbezel = r => {
    this.bezelCart = r
  }


  render() {
    const { item, id, dimension, extras, groupActive, orderId, isMobile } = this.props;
    let currentOrder = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id];
    let currentSize = currentOrder  && currentOrder['size'];
    let currentSizeKey = currentSize && Object.keys(currentSize)[0];
    console.log('isRunningStandalone',Util.isRunningStandalone())
    if (Util.isRunningStandalone()) {
      console.log(' This code will be executed if app is running standalone ')
    }
   
    let ImgUrlLogo = item.picture; 
    let ImgUrl = commonActions.getBlobImage(ImgUrlLogo) || ImgUrlLogo;
      return(
        <div  is-mobile={isMobile?'true':'false'} className={`_items_details_`} item-plate={`${id}`} style={{}}>
          <BezelAddCart ref={this.refbezel} name={item.name} ImgUrl={ImgUrl} done={this.ConfirmSave.bind(this,id)} />
          
                          <style>
                            {`
                            ${dimension && item?`
                            .menu_items_Container .menu_items_.show .details img{
                              
                              
                              --img-item-plate-left: ${dimension.img.left}px ;
                              --img-item-plate-top:  ${dimension.img.top}px ;
                              --title-item-plate-left:  ${dimension.title.left}px ;
                              --title-item-plate-top:  ${dimension.title.top}px ;
                              --price-item-plate-left:  ${dimension.price.left}px ;
                              --price-item-plate-top:  ${dimension.price.top}px ;                             
                            }
                            `:""
                          }
                          `}
                          </style>
                          <div className={`details `} onClick={this.showItem.bind(this,id)}>                            
                            {isMobile?
                              <div className="backBtn"  onClick={this.closeView.bind(this,id)}>
                                <Icons name={'arrowBack'} color={'#5d5d5d'} size={24}/>             
                              </div>
                             :null
                            }
                            {isMobile?null:
                             <div className="flexSpace"/>
                            }
                            <img src={ImgUrl} alt={'logo'} height={160} width={160} img-item-plate={`${id}`}/>      
                            <div className={`spec`}>                    
                              <div className="title_text" title-item-plate={`${id}`}>
                                {item.name}
                              </div>
                              {isMobile?null:
                              <div className="price" price-item-plate={`${id}`}>
                                ${currentSize?currentSize[currentSizeKey].toFixed(2):item.price.toFixed(2)}
                              </div>
                            }
                            </div> 
                            {isMobile?null:
                            <div className="flexSpace"/>
                            }
                            {isMobile?null:
                            <div className="qty" >
                             QTY: <span>{1}</span>
                            </div>
                            }
                          </div>
                          <div className={`_items_details_extras`} >
                          {
                            item.size && 
                            <div className={`_title_label_`}>
                                <h5>{'Sizes'}: </h5> 
                                <div className="flexSpace"/>
                                <p>{currentSizeKey?'':'Required'} </p>                                
                            </div>
                            }
                            <div className={`_items_details_extras_size`} >
                              
                            {
                                item.size && Object.keys(item.size).map(sz=>{
                                  let sizePrice= item.size[sz];                                  
                                  let sizeActive = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id]['size']   && this.state.item2cart[orderId][id]['size'][sz];                                 
                                  return(
                                    <div key={sz}  className={`_items_details_size ${sizeActive?'_activeSize':''}`}>
                                        <div  className={`_items_details_size_wrapper`}  onClick={this.updOrderSize.bind(this,sz,groupActive)}>
                                          <h5>{sz}</h5>
                                          <div>                                            
                                            <div className={`_size_price`}>{sizePrice.toFixed(2)}</div>
                                          </div>
                                        </div>
                                    </div>
                                  )
                                })

                            }
                            </div>
                            <div>      
                            {
                              extras && Object.keys(commonActions.extrasOptions).map(_extGrp=>{
                                let extraGrpDetail= commonActions.extrasOptions[_extGrp];
                                return(
                                  <div>
                                    <div className={`_title_label_`}>
                                      <h5>{_extGrp}:</h5>
                                    </div>
                                    <div className={`_title_label_`}>
                                      <h5>{_extGrp}: </h5> 
                                      <div className="flexSpace"/>
                                      <p>{'Optional'} </p>                                
                                  </div>
                                    <div className={`_items_details_extras_size`} >                              
                                    {
                                      extras && Object.keys(extraGrpDetail).map(_ext=>{
                                        let extDetail= extraGrpDetail[_ext];
                                        let _item2cart = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id]['extras'] && this.state.item2cart[orderId][id]['extras'][_ext];                                                                
                                        return(
                                            <IngredientOptionRx  key={_ext} id={_ext} item={extDetail} updOrder={this.updOrder.bind(this,_extGrp,groupActive)} item2cart={_item2cart} />
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                )
                              })
                            }                            
                            </div>


                          </div>
                          {isMobile?
                          <div className={`_add_2_cart_ ${currentSizeKey?'valid':'invalid'}`}   onClick={this.SaveView.bind(this,id,currentSizeKey)}>
                            <RippleHRM />
                            <div className={`_body_`}>

                              <div className="flexSpace"/>
                              <div className={`_label_`}>
                                  {'Add to Cart'}
                              </div>
                              <div className="flexSpace"/>
                              <div className={`_total_`}>
                                  ${this.calcTotal().toFixed(2)}
                              </div> 
                            </div> 
                          </div>
                          :
                          <div className={`_items_details_footer`} >
                            <div className="flexSpace"/>
                            <div  className={`_actions_`}>                           
                                <div className={`btn_action _cancel_`}  onClick={this.closeView.bind(this,id)}>
                                    Cancel
                                </div>
                                <div className="flexSpace"/>
                                {currentSizeKey?
                                <NavLink to={{pathname: '/restaurant', search:`?vId=${id}&tb=cart`}} className={`btn_action _add2cart_`} onClick={this.SaveView.bind(this,id)}>
                                    {this.state.isInCart?`Update Cart`:`Add to Cart`}
                                </NavLink>:null}
                            </div>
                          </div>}
             </div>
                    
      )
    }
}



const ItemDetailDesktopRestarantRX = connect(mapStateToProps, mapDispatchToProps)(ItemDetailDesktopRestarant);



/*




class ItemDetailMobileRestarant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,      
      _Id: Util.generateUUID(),
      itmActive:null,
      show:false,
      isInCart:false,
      item2cart:{}
    };
  }

  componentDidMount() {  
    var _th = this;
    const {forms, orderId} = this.props;
    setTimeout(()=>{
      _th.setState({show:true});
      var fff = forms[cartFormName];
      let isInCart = false;
      if(fff && orderId && fff[orderId]){
        isInCart = true;
      }
      if(fff){
        _th.setState({item2cart:fff, isInCart:isInCart});
      }
    },40)
   
  } 
  
  
  componentWillMount(){    
    
  }
  
  componentWillUnmount(){    

  }
  
  closeView(){  
    if(typeof this.props.closeView === "function"){
      this.props.closeView()
    }
  }

  updOrder(g,groupActive,i,q,p){    
    const {id,orderId, item} = this.props;
    var _item2cart = this.state.item2cart;
    if(!_item2cart[orderId]){
      _item2cart[orderId] = {};
      _item2cart[orderId][id] = {};
      _item2cart[orderId][id]['qty'] = 1;
      _item2cart[orderId][id]['name'] = item.name;
      _item2cart[orderId][id]['category'] = groupActive;
      _item2cart[orderId][id]['picture'] = item.picture;
    }
    if(!_item2cart[orderId][id]['extras']){
      _item2cart[orderId][id]['extras'] = {}
    }
    if(!_item2cart[orderId][id]['extras'][i]){
      _item2cart[orderId][id]['extras'][i] = {};
      _item2cart[orderId][id]['extras'][i]['qty'] = 0;
      _item2cart[orderId][id]['extras'][i]['price'] = p;
      _item2cart[orderId][id]['extras'][i]['group'] = g;
      let extraGrpDetail= commonActions.extrasOptions[g][i];
      _item2cart[orderId][id]['extras'][i]['picture'] = extraGrpDetail.picture;
    }
    if(!isNaN(q)){
      _item2cart[orderId][id]['extras'][i]['qty'] += q*1;   
    }else{
      _item2cart[orderId][id]['extras'][i]['qty'] = 0;
    }
    this.setState({item2cart:_item2cart})  
    // this.props.actions.UpdateFormbyName(cartFormName,_item2cart);    
  }

  updOrderSize(i,groupActive){
    const { item, id, orderId} = this.props;
    var _item2cart = this.state.item2cart;
    if(!_item2cart[orderId]){
      _item2cart[orderId] = {};
      _item2cart[orderId][id] = {};
      _item2cart[orderId][id]['qty'] = 1;
      _item2cart[orderId][id]['name'] = item.name;
      _item2cart[orderId][id]['category'] = groupActive;
      _item2cart[orderId][id]['picture'] = item.picture;

    }   
    if(!_item2cart[orderId][id]['size']){
      _item2cart[orderId][id]['size'] = {}
    }

    _item2cart[orderId][id]['size'] = {}; 
    _item2cart[orderId][id]['size'][i] = item['size'][i];
    this.setState({item2cart:_item2cart})
    // this.props.actions.UpdateFormbyName(cartFormName,_item2cart);        
  }


  SaveView(){  
    const { item2cart } = this.state;
    this.props.actions.UpdateFormbyName(cartFormName,item2cart);
    if(typeof this.props.closeView === "function"){
      this.props.closeView()
    }
  }

  showItems(){  
    var _th = this; 
    _th.setState({show:!_th.state.show});
  }
  

  
  showItem(id){
    var _th = this; 
    if(this.state.itmActive!==id){ 
      var attrItm = `[item-plate="${id}"]`;
      var attrImg = `[img-item-plate="${id}"]`;
      var attrTitle = `[title-item-plate="${id}"]`;     
      var attrprice = `[price-item-plate="${id}"]`;      
     
      var elItm = document.querySelector(attrItm);
      var elImg = document.querySelector(attrImg);
      var elTitle = document.querySelector(attrTitle);
      var elPrice = document.querySelector(attrprice);

      var backDetails = `[back-item-detail]`;
      var elmbackDetails = document.querySelector(backDetails);
     // elmbackDetails.setAttribute("back-item-detail", true);

      var dimension = {
        item:elItm?elItm.getBoundingClientRect():{},
        img:elImg?elImg.getBoundingClientRect():{},
        title:elTitle?elTitle.getBoundingClientRect():{},
        price:elPrice?elPrice.getBoundingClientRect():{}
      }
      
      _th.setState({itmActive:id,dimension:dimension});

    }
   
  }
  


  calcTotal(){  
    const {id,orderId} = this.props;
    let value = 0;
    let currentOrder = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id];
    let currentSize = currentOrder && currentOrder['size'];


    let currentSizeKey = currentSize && Object.keys(currentSize)[0];  
    let valeSize = currentSizeKey && currentSize[currentSizeKey]?currentSize[currentSizeKey]:0;
    value += valeSize;
    currentOrder && currentOrder['extras']   && Object.keys(currentOrder['extras']).map(_ext=>{
      let _extQty = currentOrder['extras'][_ext]['qty']?currentOrder['extras'][_ext]['qty']:0;
      let _price = currentOrder['extras'][_ext]['price']?currentOrder['extras'][_ext]['price']:0;
      if(_extQty>0){
        value += _price*_extQty; 
      }          
    })

    return value;
  }
  


  render() {
    const { item, id, dimension, extras, groupActive, orderId, isMobile } = this.props;
    let currentOrder = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id];
    let currentSize = currentOrder  && currentOrder['size'];
    let currentSizeKey = currentSize && Object.keys(currentSize)[0];   
   
      return(
        <div  is-mobile={isMobile?'true':'false'} className={`_items_details_`} item-plate={`${id}`} style={{}}>
                          <style>
                            {`
                            ${dimension && item?`
                            .menu_items_Container .menu_items_.show .details img{
                              
                              
                              --img-item-plate-left: ${dimension.img.left}px ;
                              --img-item-plate-top:  ${dimension.img.top}px ;
                              --title-item-plate-left:  ${dimension.title.left}px ;
                              --title-item-plate-top:  ${dimension.title.top}px ;
                              --price-item-plate-left:  ${dimension.price.left}px ;
                              --price-item-plate-top:  ${dimension.price.top}px ;                             
                            }
                            `:""
                          }
                          `}
                          </style>
                          <div className={`details `} onClick={this.showItem.bind(this,id)}>                            
                            <img src={item.picture} alt={'logo'} height={160} width={160} img-item-plate={`${id}`}/>      
                            <div className={`spec`}>                    
                              <div className="title_text" title-item-plate={`${id}`}>
                                {item.name}
                              </div>
                              <div className="price" price-item-plate={`${id}`}>
                                ${currentSize?currentSize[currentSizeKey].toFixed(2):item.price.toFixed(2)}
                              </div>
                            </div> 
                            {isMobile?null:
                            <div className="flexSpace"/>
                            }
                            {isMobile?null:
                            <div className="qty" >
                             QTY: <span>{1}</span>
                            </div>
                            }
                          </div>
                          <div className={`_items_details_extras`} >
                          {
                            item.size && 
                            <div className={`_title_label_`}>
                                <h5>{'Sizes'}</h5>
                            </div>
                            }
                            <div className={`_items_details_extras_size`} >
                              
                            {
                                item.size && Object.keys(item.size).map(sz=>{
                                  let sizePrice= item.size[sz];                                  
                                  let sizeActive = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id]['size']   && this.state.item2cart[orderId][id]['size'][sz];                                 
                                  return(
                                    <div key={sz}  className={`_items_details_size ${sizeActive?'_activeSize':''}`}>
                                        <div  className={`_items_details_size_wrapper`}  onClick={this.updOrderSize.bind(this,sz,groupActive)}>
                                          <h5>{sz}</h5>
                                          <div>                                            
                                            <div className={`_size_price`}>{sizePrice.toFixed(2)}</div>
                                          </div>
                                        </div>
                                    </div>
                                  )
                                })

                            }
                            </div>
                            <div>      
                            {
                              extras && Object.keys(commonActions.extrasOptions).map(_extGrp=>{
                                let extraGrpDetail= commonActions.extrasOptions[_extGrp];
                                return(
                                  <div>
                                    <div className={`_title_label_`}>
                                      <h5>{_extGrp}</h5>
                                    </div>
                                    <div className={`_items_details_extras_size`} >                              
                                    {
                                      extras && Object.keys(extraGrpDetail).map(_ext=>{
                                        let extDetail= extraGrpDetail[_ext];
                                        let _item2cart = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id]['extras'] && this.state.item2cart[orderId][id]['extras'][_ext];                                                                
                                        return(
                                            <IngredientOptionRx  key={_ext} id={_ext} item={extDetail} updOrder={this.updOrder.bind(this,_extGrp,groupActive)} item2cart={_item2cart} />
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                )
                              })
                            }                            
                            </div>


                          </div>
                          <div className={`_items_details_footer`} >
                            <div className={`_total_`}>
                                Total: ${this.calcTotal().toFixed(2)}
                            </div>
                            <div className="flexSpace"/>
                            <div  className={`_actions_`}>                           
                                <div className={`btn_action _cancel_`}  onClick={this.closeView.bind(this,id)}>
                                    Cancel
                                </div>
                                <div className="flexSpace"/>
                                
                                  <NavLink to={{pathname: '/restaurant', search:`?vId=${id}&tb=cart`}} className={`btn_action _add2cart_`} onClick={this.SaveView.bind(this,id)}>
                                      {this.state.isInCart?`Update Cart`:`Add to Cart`}
                                  </NavLink>
                            </div>
                          </div>
             </div>
                    
      )
    }
}







const ItemDetailMobileRestarantRX = connect(mapStateToProps, mapDispatchToProps)(ItemDetailMobileRestarant);

*/


export default  connect(mapStateToProps, mapDispatchToProps)(ItemDetailRestarant);








