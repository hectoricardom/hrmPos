import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';




class VerifyToken extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false,            
    };
  }



  componentDidMount() {
      const {location} = this.props
      if(location && location.search){        
        var s = Util.parseQuery(location.search);
        if(s.tk){    
          this.props.history.push(`/settings`);     
          window.localStorage.setItem('user', s.email);
          this.props.actions.sendToken(s.tk); 
        }
      }
      else{
        this.props.history.push(`/settings`);
        this.props.actions.getUserProfile(); 
      } 
  }  
 


  render() {
    return (
       <div className="loadingLoging"> 
         <LoadingColorSpinner/>
      </div>
      ) 
  }
}

//    hectoricardom@yahoo.com

// verifyAccount?tk=7A43GPZ&email=hectoricardom@yahoo.com




function mapStateToProps(state, ownProps) {
   return {     
     formObserve: state.common.formObserve
   };
 }
 
 function mapDispatchToProps(dispatch) {
   return {
     actions: bindActionCreators(commonActions, dispatch)
   };
 }
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyToken));