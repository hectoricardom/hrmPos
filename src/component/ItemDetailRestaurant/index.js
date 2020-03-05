import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';


import './style.css';

import IngredientOptionRx from '../IngredientOption';


import * as Util from '../../state/Util';




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
  
  closeView(){  
    if(typeof this.props.closeView === "function"){
      this.props.closeView()
    }
  }

  updOrder(g,i,q,p){    
    const {id,orderId} = this.props;
    var _item2cart = this.state.item2cart;
    if(!_item2cart[orderId]){
      _item2cart[orderId] = {}
      _item2cart[orderId][id] = {}
    }
    if(!_item2cart[orderId][id]['extras']){
      _item2cart[orderId][id]['extras'] = {}
    }
    if(!_item2cart[orderId][id]['extras'][i]){
      _item2cart[orderId][id]['extras'][i] = {};
      _item2cart[orderId][id]['extras'][i]['qty'] = 0;
      _item2cart[orderId][id]['extras'][i]['price'] = p;
      _item2cart[orderId][id]['extras'][i]['group'] = g;
    }
    if(!isNaN(q)){
      _item2cart[orderId][id]['extras'][i]['qty'] += q*1;   
    }else{
      _item2cart[orderId][id]['extras'][i]['qty'] = 0;
    }
    this.setState({item2cart:_item2cart})  
    // this.props.actions.UpdateFormbyName(cartFormName,_item2cart);    
  }

  updOrderSize(i){
    const { item, id, orderId} = this.props;
    var _item2cart = this.state.item2cart;
    if(!_item2cart[orderId]){
      _item2cart[orderId] = {};
      _item2cart[orderId][id] = {};
      _item2cart[orderId][id]['size'] = {};
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
    const { item, id, dimension, extras, forms, orderId } = this.props;
    let currentOrder = this.state.item2cart && this.state.item2cart[orderId] && this.state.item2cart[orderId][id]  && this.state.item2cart[orderId][id];
    let currentSize = currentOrder  && currentOrder['size'];
    let currentSizeKey = currentSize && Object.keys(currentSize)[0];   
   
      return(
        <div className={`_items_details_`} item-plate={`${id}`} style={{}}>
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
                            <div className="flexSpace"/>
                            <div className="qty" >
                             QTY: <span>{1}</span>
                            </div>
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
                                        <div  className={`_items_details_size_wrapper`}  onClick={this.updOrderSize.bind(this,sz)}>
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
                                            <IngredientOptionRx  key={_ext} id={_ext} item={extDetail} updOrder={this.updOrder.bind(this,_extGrp)} item2cart={_item2cart} />
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
                                <div className={`btn_action _add2cart_`} onClick={this.SaveView.bind(this,id)}>
                                  Add to Cart
                                </div>
                            </div>
                          </div>
             </div>
                    
      )
    }
}





export default  connect(mapStateToProps, mapDispatchToProps)(ItemDetailRestarant);











var data = {
  appetizer:{
    logo:"https://p.kindpng.com/picc/s/425-4253452_download-enjoy-your-favorites-with-the-appetizer-sampler.png",    
    list:{
      y0872ty6n3f:{
        name:"bread",
        price:0.55,
        picture:'https://www.budgetbytes.com/wp-content/uploads/2010/03/Homemade-Garlic-Bread-front-500x500.jpg'
      },
      y0f72tjln3f:{
        name:"brownie",
        price:3.05,
        picture:'https://www.clipartkey.com/mpngs/m/43-432775_thanksgiving-clipart-charlie-brown-transparent-background-brownie-png.png'
      },
    }
  },
  lunchs:{
    logo:"https://www.pngfind.com/pngs/m/331-3311656_plate-lunch-hd-png-download.png",
    list:{
      y0872ty6n3f:{
        name:"fried rice",
        price:3.75,
        picture:'https://www.pngfind.com/pngs/m/637-6373506_panda-express-fried-rice-chinese-fried-rice-hd.png',
        size:{
          small:3.75,
          large:7.00
        }
      },
      y0f72tjln3f:{
        name:"pork steak",
        price:5.00,
        picture:'https://images.summitmedia-digital.com/yummyph/images/2017/10/04/pork-steak-gratin.jpg',
        size:{
          small:5.00,
          large:7.50
        }
      },
    },
   extras:true

  },
  dinners:{
    logo:"https://www.a-akisushi.com/wp-content/uploads/2017/05/Hibachi-Combo.png",
    list:{
      
    }
  },
  beverages:{
    logo:"https://pngimage.net/wp-content/uploads/2018/05/beverages-png-4.png",
    list:{
      y087676ty6n3f:{
        name:"coke",
        price:1.05,
        picture:'https://icon2.cleanpng.com/20180317/hhw/kisspng-coca-cola-fizzy-drinks-fanta-sprite-coca-cola-png-transparent-images-5aadb5822422a1.230768881521333634148.jpg',
        directOrder:true
      },
      y0f72tjln3f:{
        name:"sprite",
        price:1.05,
        picture:'https://www.pinclipart.com/picdir/middle/56-567275_transparent-sprite-clip-art-royalty-free-download-sprite.png',
        directOrder:true
      },
      y0f7dssgjln3f:{
        name:"pepsi",
        price:1.05,
        picture:'https://www.pinclipart.com/picdir/middle/361-3613612_pepsi-can-png-pepsi-and-coca-cola-logo.png',
        directOrder:true
      },
      y0f52tjln3f:{
        name:"mountain dew",
        price:1.05,
        picture:'https://banner2.cleanpng.com/20180511/dhw/kisspng-fizzy-drinks-mountain-dew-beer-coca-cola-sangrita-5af5cf4be01a71.4484766915260588279179.jpg',
        directOrder:true
      },
      y0f7f342tjln3f:{
        name:"sierra mist",
        price:1.05,
        picture:'https://www.pngkit.com/png/detail/30-308769_sierra-mist-caffeinated-drink.png',
        directOrder:true
      },
    },
   extras:false
  },
  lunchs2:{
    logo:"https://www.pngfind.com/pngs/m/331-3311656_plate-lunch-hd-png-download.png",
    list:{
     
    }
  },
  dinners2:{
    logo:"https://www.a-akisushi.com/wp-content/uploads/2017/05/Hibachi-Combo.png",
    list:{
      
    }
  },
  beverages2:{
    logo:"https://pngimage.net/wp-content/uploads/2018/05/beverages-png-4.png",
    list:{
      
    }
  }
}

