import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as commonActions from '../../state/commonActions';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';




class Logout extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false,            
    };
  }



   componentDidMount() {
      this.props.history.push(`/settings`);
      window.localStorage.setItem('jwt_hrm_fincance','');
      document.cookie = `jwt_hrm_fincance=${''}; expires=${(new Date())}; path=/`;  
      localStorage.setItem('_codeValidation_',null);
      localStorage.setItem('_codeValidationPhone_',null); 
      this.props.actions.getUserProfile();  
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
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));