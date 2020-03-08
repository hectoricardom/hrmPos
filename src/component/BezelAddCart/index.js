



import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import './style.css';



export default class BezelAddCart extends Component {

  constructor(props) {
        super(props);        
        this.state = {
          open:false,
          itemAddedCart:false,
          itemAddedOverlay:false,
        };
  }

  componentDidMount() {  
    
  }  
  componentWillUnmount(){
  
  }



  Open(){    
    var _th = this;
    _th.setState({itemAddedOverlay:true})
    setTimeout(()=>{
      setTimeout(()=>{
        _th.setState({itemAddedCart:false, itemAddedOverlay:false})
        if(typeof _th.props.done === "function"){
          _th.props.done()
         }
      },1100)
      _th.setState({itemAddedCart:true})
    },20)
  }

 

  render() {  
    const {  ImgUrl, name } = this.props;
    const {itemAddedOverlay, itemAddedCart} = this.state;
    return(
      <div bezel-added-cart={itemAddedCart?'true':'false'} className={`addCartbezel`} style={{"--bezel--color--base--":'var(--color-base--hover)'}}>
            <div className={`_banner_`}>           
            {itemAddedOverlay?
              <img src={ImgUrl} alt={''} /> 
            :null}
              <div className={'_donut_'}/>
              <div className={'_done_'}>
                <Icons name={'success'} color={'#fff'} size={36}/>
              </div>
              <div className={'_saving_text_'}>
                <span>
                  {`Adding ${name} to cart`}
                </span>               
              </div>
            </div>
            {itemAddedOverlay? <div  className={`_overlay_`}/>:null}
        </div>
    )
  }
}