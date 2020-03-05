import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';

import * as Util from '../../../Utils/Util';
import './style.css';
import LoadingColorSpinner from '../../Icons/LoadingColorSpinner';
import Icons from '../../Icons/Icons'
import FloatBar from '../FloatBar/FloatBar'; 


  const WatchContV =  observer(props =>{  
      const getWidth =()=>{
        var h = document.getElementsByClassName('videoContainerFloat')[0];
        console.log(h)
        return `420px`
      }  
      var wdt = props.common.ScreenWidth;
      var Zheight = 520; 
      var WatchWidth = 100; 
      
      if(wdt<720){
        Zheight = wdt*0.43375;
        WatchWidth = 100;
      }
      else if(wdt<960){
        Zheight = wdt*0.43375;
        WatchWidth = 100;
      }
      var UrlV =  props.UrlIframe;
      
      var ServerOptionWidth = 30;
      var ContStyle={
        maxWidth: `${WatchWidth}px`,minHeight: '300px'

      }  
      
      return(
        <div>
          <FloatBar />   
          <div  className="WatchCont" style={{marginTop: `55px`}}>
            <div style={{margin:'0 auto',position: 'relative',display:'block',padding: '25px 0'}}>
              <div className="videoContainerFloat">
                <iframe key={Util.Base64.encode(UrlV)} src={UrlV} height={`${Zheight}px`} frameBorder={0} marginWidth={0} marginHeight={0} width={`${WatchWidth}%`} frameBorder='no' allowFullScreen={true}></iframe> 
                <div className="contentWatchDetail" >  
                  <div className="Items" style={ContStyle} >
                      
                  </div>                
                </div>
              </div>
            </div>   
            <div  style={{margin:'0 auto',position: 'relative',display:'block',minHeight:'250px'}}>     
              <div className="FlexList"  style={{display:'inline-flex',width:'calc(100% - 50px)',padding:' 25px'}}>
                
              </div>  
            </div>  
          </div>          
        </div>
      )
   

  })











@inject('commonStore')
@withRouter
@observer
export default class WatchVideo extends React.Component {

  componentWillReceiveProps (nextProps){
    //if(nextProps.MovieDetailStore.movieDt !== this.props.MovieDetailStore.movieDt && nextProps.MovieDetailStore.movieDt !== ''){  }
  }
  componentWillMount() {    
    Util.Y();
    this.linkOption = 1;
    const {commonStore,match, location } = this.props;    
    var s = Util.parseQuery(location.search);
    const {movies} = commonStore
  
   
  }

  componentDidMount() {
    //this.props.MovieDetailStore.setInitEvt(false);    
  }
  
   render() {  

    const {commonStore,match, location } = this.props;      
    var s = Util.parseQuery(location.search);
    var url = `${commonStore.serverUrl}/embed?v=${s.v}`
    return (<WatchContV common={commonStore} UrlIframe={url}/>)
  
}
}






export class VolumeRange extends React.Component {

  componentWillReceiveProps (nextProps){
    
   // if(nextProps.store.movie !== this.props.store.movie && nextProps.store.movie !== ''){  }
  }
  componentWillMount() {  
    var _th6_ = this;
    _th6_.CurrentV = _th6_.props.volume; 
    _th6_.VolElm    
  }
  componentDidMount(){     
    var _th6_ = this;
  
  }

  HandleRange(event){     
    var _th6_ = this;
  }
  
  render() {
    var _th6_ = this;         
    return (
      <input ref={instance => { _th6_.VolElm  = instance; }} type="range" min={0} max={1}  step={0.1} onInput={()=>{_th6_.HandleRange.bind(_th6_)}} onChange={()=>{_th6_.HandleRange.bind(_th6_)}}/>
    )
  }
}



/*
<div className="thumbnail-container" style={{width: `108px`, height: `60px`}}>
              <img className="thumbnail-img" src="https://c16.vidlox.tv/i/01/00525/fix1bouvj0ge0000.jpg" style={{height: `570px`, left: `-972px`, top: `-540px`}}/> 
</div>

*/