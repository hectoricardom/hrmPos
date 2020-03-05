

//import {Util, InputDate,InputText,InputSelect,Toast, Dialog} from '../ShareComponents';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import './style.css';
import * as Util from '../../state/Util';
import Icons from '../Icons/Icons'







class FilterGroupByCategories extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      validForm:true,
      asc:true      
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    
  }

 

  handlerSaveForm(i){ 
    if(typeof this.props.updChange === "function"){      
      this.props.updChange(i);
    }  
  }

  handlerInputValue(field,value){ 
    
  }

 

  clearFilter(){
    if(typeof this.props.clearFilter === "function"){      
      this.props.clearFilter();
    } 
  }


  dialogClose(){
    if(typeof this.props.closeView === "function"){      
      this.props.closeView();
    } 
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const {  active, list ,title , categories} = this.props;
    return (
      <div className="__form_group__">
        <div  className={`_form_group_cancel_`}>
        <div className={'__save__btn '}>
            <div className="center--Container grayStyle" onClick={this.dialogClose.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv grayStyle "/>
              <Icons name={'arrowBack'} color={'#1967d2'} size={18}/>             
            </div> 
          </div>          
          <div className="flexSpace"/>
          <div className={'__save__btn '} >
            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv orangeFlex "/>
              <span className="text2D orangeFlex">{'Group by categories'}</span>              
            </div> 
          </div>       
        </div>
        <div className={'option--wrapper'}>          
          <div className="__body__">
          <div  className="__Title_categories_"></div>
            {Object.keys(list).map((ing,in0)=>{
              //var y = Math.floor(mnt/12);
              let mnt = categories[ing];
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${active===ing?"__active":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handlerSaveForm.bind(this,ing)}>
                    <div  className={'__icons--'}>
                        <Icons name={active===ing?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${mnt.name}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {active===ing?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                  </div>:null}
                                  
                </div>
              )
            })}
          </div>          
        </div>
      </div>
      ) 
  }
}






function mapStateToProps6(state, ownProps) {
  return {
    categories: state.common.categories,
    formObserve: state.common.formObserve,       
  };
}

function mapDispatchToProps6(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps6, mapDispatchToProps6)(FilterGroupByCategories);


