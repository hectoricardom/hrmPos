import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
import { NavLink , withRouter} from 'react-router-dom';


import './style.css';

import ItemDetailRestaurantRx from '../ItemDetailRestaurant';
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







class MenuItemsRestarant extends Component {
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


  close_DialogView(id,i){ 
    var _th = this;       
    const { isMobile} = this.props;    
    var options = {id:id}; 
    if(isMobile){
      this.props.dialogActions.CloseView(options);
    }else{
      this.props.dialogActions.CloseDialog(options);
    }
   
  }

  
  showItem(id,groupActive){  
    var _th = this; 
    const {list, extras, isMobile, forms, history} = this.props;   
    let _item = list[id];    
    var _item2cart = forms[cartFormName];
    if(_item.directOrder){
      //var _item2cart = this.state.item2cart;
      let orderId= id.concat('_').concat(Util.gen6CodeId());
      if(!_item2cart){
        _item2cart = {};
      }
      if(!_item2cart[orderId]){
        _item2cart[orderId] = {};
        _item2cart[orderId][id] = {};
        _item2cart[orderId][id]['qty'] = 1;
        _item2cart[orderId][id]['name'] = _item.name;
        _item2cart[orderId][id]['category'] = groupActive;
        _item2cart[orderId][id]['picture'] = _item.picture;

      }   
      if(!_item2cart[orderId][id]['size']){
        _item2cart[orderId][id]['size'] = {}
      }

      _item2cart[orderId][id]['size'] = {}; 
      _item2cart[orderId][id]['size']['*'] = _item['price'];

      this.setState({item2cart:_item2cart})
      this.props.actions.UpdateFormbyName(cartFormName,_item2cart);
      history.push("/restaurant?tb=cart");

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
        let formName = `item_WDetails${id}`;   
        let _id = Util.Base64.encode(`_${formName}_`); 
        let _cont = <DialogDuplicateItemRX close={this.close_DialogView.bind(this,_id)} dimension={dimension} id={id} item={_item} extras={extras} confirm={this.confirm.bind(this,_id)}/>
        let _width = isMobile?'360px':'550px';
        let options = {id:_id,zIndex:700,height:'300px',width:_width,content:_cont};
        if(isMobile){
          this.props.dialogActions.OpenView(options);
        }else{
          this.props.dialogActions.OpenDialog(options);
        }
      }
      else{
        _th.setState({itmActive:id,dimension:dimension});      
          let formName = `item_Details${id}`;   
          let _id = Util.Base64.encode(`_${formName}_`); 
          let _cont = 
            <ItemDetailRestaurantRx 
              closeView={this.close_DetailView.bind(this,_id)} 
              dimension={dimension} 
              id={id} 
              orderId={id.concat('_').concat(Util.gen6CodeId())} 
              item={_item} 
              extras={extras}
              groupActive={groupActive}
            />
          let options = {id:_id,zIndex:500,height:450,content:_cont};
          this.props.dialogActions.OpenView(options);

      }
    }
   
  }
  


  
  confirm(id2Close,id,item,dimension){ 
    var _th = this;         
    const { extras} = this.props;  
    _th.close_DialogView(id2Close);
    _th.setState({itmActive:id,dimension:dimension});      
    let formName = `item_Details${id}`;   
    let _id = Util.Base64.encode(`_${formName}_`); 
    let _cont = <ItemDetailRestaurantRx closeView={this.close_DetailView.bind(this,_id)} dimension={dimension} id={id} orderId={id.concat('_').concat(Util.gen6CodeId())} item={item} extras={extras}/>
    let options2 = {id:_id,zIndex:500,height:450,content:_cont};
    this.props.dialogActions.OpenView(options2);
    
  }


  goToCart(){

  }



  render() {
    const { groupActive, list } = this.props;


    const {show, itmActive, dimension } = this.state;
    
    let data =  commonActions.data;

    var options = Object.keys(data);
      return (
          <div className="menu_items_Container ViewDetails" >                    
                    {
                      groupActive && list && Object.keys(list).map((itm2,ind2)=>{
                        let factor = .15;
                        let delay = (ind2+1)*factor;
                        return(
                          <style>
                            {`
                            
                            .menu_items_Container .menu_items_.show._child_${ind2+1}{
                                  -moz-transition-delay: ${delay}s;
                                  -webkit-transition-delay: ${delay}s;
                                  -o-transition-delay: ${delay}s;
                                  transition-delay: ${delay}s;
                            }
                            .menu_items_Container .menu_items_.hide._child_${ind2+1}{
                              -moz-transition-delay: ${0}00ms;
                              -webkit-transition-delay: ${0}00ms;
                              -o-transition-delay: ${0}00ms;
                              transition-delay: ${0}00ms;
                            }
                            
                            `}
                          }</style>
                        )
                      })
                    }
                    
                    {groupActive && list && Object.keys(list).map((itm,ind_2)=>{
                      let item2Show = list[itm];
                      var _style={};
                      if(dimension && itm === itmActive){
                        _style={
                          "--item-plate-left": `${dimension.item.left}px`,
                          "--item-plate-top":  `${dimension.item.top}px`,
                          width: '100vw',
                          marginLeft: `calc( var(--item-plate-left) /-2 )`,
                          marginTop: `calc( var(--item-plate-top) /-2 )`,                          
                          minHeight: `250px`
                      };
                      }

                      return(
                        <div className={`menu_items_  _child_${ind_2+1} ${show?'show':'hide'}`} item-plate={`${itm}`} style={{}}>
                          <style>
                            {`
                            ${dimension && itm === itmActive?`
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
                          <div className={`details ${itm === itmActive?"show":"hide"}`} onClick={this.showItem.bind(this,itm,groupActive)}>                            
                            <img src={item2Show.picture} alt={'logo'} height={160} width={160} img-item-plate={`${itm}`}/>                           
                            <div className="title_text" title-item-plate={`${itm}`}>
                              {item2Show.name}
                            </div>
                            <div className="price" price-item-plate={`${itm}`}>
                              {item2Show.price}
                            </div>
                          </div>
                        </div>
                      )
                    }) }
        </div> 
      )
    }
}


export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItemsRestarant));








class DialogDuplicateItem extends Component {
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

  HandleActions(i, q, p){
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
    const {item,id, dimention, thumbnailJsonBlobObserve} = this.props;
    let ImgUrl = commonActions.getBlobImage(item.picture) || item.picture;
    let style2Print = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"};    
    let style2PrintError = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"};
    
    return(
        <div  className={`_dialog_ingredient_edit  _duplicateOrder`} style={style2Print}>          
          <div  className={`_details_`}>  
            <div className="printcallout" >
              <div className="printcallout-body">
                <div className={`printcallout-icon `}>
                  <img src={ImgUrl} alt={''} />
                </div>
                <div className="printcallout-message">
                  <div>
                      The <span>{item.name}</span> is already on your Cart
                  </div>
                  <div className={`_size_price`}> {item.price>0?<span>{``}</span>:<span>{''}</span>}</div>   
                </div>
              </div>
            </div>
          </div>
          <div  className={`_actions_`}>             
            <div className="flexSpace"/>
            <div className={'__save__btn '}>
            <NavLink to={{pathname: '/restaurant', search:`?vId=${id}&tb=cart`}}  onClick={this.HandleActions.bind(this)}>
              <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                <div className="hoverDiv grayStyle "/>
                <span className="text2D grayStyle">{'Go to Cart'}</span>              
              </div> 
              </NavLink>
            </div>
            
            <div className={'__save__btn'} >
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.HandleConfirm.bind(this,id,item,dimention)}>
                  <div className="hoverDiv orangeFlex "/>
                  <span className="text2D orangeFlex">{`New ${item.name}`}</span>              
                </div> 
              </div>
          </div>          
        </div>
    )
  }
}




const DialogDuplicateItemRX = connect(mapStateToProps, mapDispatchToProps)(DialogDuplicateItem);