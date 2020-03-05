import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';


import './style.css';

import IngredientDialogRx from '../IngredientDialog';
import * as Util from '../../state/Util';

import Icons from '../Icons/Icons';






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



























class IngredientOption extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      editView:false
    };
  }

  componentDidMount() {  
   
  } 

  
  Open_EditDialog(){        
    const {item,id} = this.props;
    var formName = `dialog_edit_ingredient_${id}`;   
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <IngredientDialogRx close={this.close_EditDialog.bind(this,_id)} updOrder={this.HandleSave.bind(this,_id)} item={item} id={id}/>
    var options = {id:_id,zIndex:750,height:'440px',width:'500px',content:_cont};
    this.props.dialogActions.OpenDialog(options); 
    this.setState({editView:false});   
  }
     
  close_EditDialog(id){ 
    var _th = this;
    var options = {id:id};
    _th.props.dialogActions.CloseDialog(options);     
    this.setState({editView:false});
  }


  HandleSave(id,i,q,p) {    
    if(typeof this.props.updOrder === "function"){
      this.props.updOrder(i,q,p);
    }     
    this.close_EditDialog(id)
  } 



  EditView() {
    this.setState({editView:!this.state.editView});
  } 

  
  render(){
    const {item, id, item2cart, thumbnailJsonBlobObserve} = this.props;   
    let ImgUrl = commonActions.getBlobImage(item.picture);
    let _qty = item2cart && item2cart['qty']?item2cart['qty']:null;
    return(
        <div  className={`_items_details_size ${_qty>0?'_activeExtraAdd':_qty<0?'_activeExtraRemove':''}`} >
          <div  className={`_items_details_size_wrapper`}  onClick={this.Open_EditDialog.bind(this,id)}>
            <h5>{id}</h5>
            {_qty? <div className={`_qty_ ${_qty>0?'_IngredientQty_':'_notIngredient_'}`}>{_qty>0?_qty:'X'}</div>:null}
            <div className={`_bottom_wrp`}>
              <img src={ImgUrl} alt={''} />
              <div className={`_size_price`}> {item.price>0?<span>{`$${item.price.toFixed(2)}`}</span>:<span className={'_free_of_charge_'}>{'Free'}</span>}</div> 
            </div>
          </div>
          <div  className={`_items_details_edit_wrapper ${this.state.editView?'show':''}`}>
            <div className={`_add_remove_ingredient`}>
              <div className={`_remove`} onClick={this.EditView.bind(this,id)}>
                <Icons name={'minus'} color={'#555'} size={48}/>
              </div>
              <div className={`_add`} onClick={this.Open_EditDialog.bind(this,id)}>
                <Icons name={'add'} color={'#555'} size={48}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}




export default  connect(mapStateToProps, mapDispatchToProps)(IngredientOption);









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

