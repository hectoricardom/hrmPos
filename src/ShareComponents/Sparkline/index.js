
import React, { Component } from 'react';
import {Util } from '..'
import './style.css';

const _Sparkline = (props =>{  
    var colorStroke = props.color || `rgb(121, 134, 203)`
    var colorFill = colorStroke.replace(')',`,0.2)`);
    var _Height = props._height || 80;
    var _Width = props._width || 240; 
    var maxHeight = props.data.maxImport+1;
    var maxWidth = props.data.maxWeek+1;
    var minWidth = props.data.minWeek;    
    var rangeWidth = (_Width-10)/(maxWidth- minWidth);
    var rangeHeigth = (_Height/2)/maxHeight;    
    var dPath = ``;
    var dFPath = ``;
    var pointsCircle = [];
    Object.keys(props.data.list).map((pnt,IndX)=>{ 
      var pointData = props.data.list[pnt];
      var Yp = (_Height/1.8)-(pointData.total*rangeHeigth);
      var Xp = _Width - ((maxWidth - pnt)*rangeWidth);      
      var Xvert = Xp.toFixed(2);
      var Yvert = Yp.toFixed(2);    
      pointsCircle.push({x:Xvert,y:Yvert,date:Util.parseDateShort(pointData.date),total:pointData.total})  
      if(IndX===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }      
    })
    var fillSparkLine = `V ${_Height} L 4 ${_Height} Z`;
    

    const handleMouseMove =(c) =>{ 
      if(!props.hover){
        if (typeof props.updState === 'function') {
          props.updState({key:`rect`,value:c}); 
          props.updState({key:`open`,value:true});         
        }
      }      
    }
    const handleMouseOut =() =>{  
      if (typeof props.updState === 'function') {
        props.updState({key:`open`,value:false});         
      }
    }
    var svgW = _Width;
    var svgH = _Height;
    var baseStyle = {width:svgW, height:svgH}
    //var AlignHorzText = `5`;

    if(window.outerWidth!==props._ScreenWidth){
      if (typeof props.updateSizeState === 'function') {
        props.updateSizeState(window.outerWidth);         
      }
    }

    if(window.outerWidth<=2600){
      svgW = "100%";
      //AlignHorzText = `30%`;
      baseStyle = {width:svgW, height:svgH}
    }

if(dPath.length>0){
  dFPath = `${dPath} ${fillSparkLine}`;
}
    
//1024   960
//330   466



    var _Line = null,_Lineh = null;
    //var info = null;
    var text1 = null;
    var text2 = null;
    if(props.open){
      var t1x=(props.line.y*1)-40;
      var t2x=(props.line.x*1)+2;      
      var wdt1 = props.line.total.toFixed(2).toString().length * 6 + 14 + 16;
      var h1 = _Width-(wdt1+10);
      var wdt2 = props.line.date.toString().length * 6.5+16;
      var h2 = (_Height*1)-30
      if(t1x+20>_Height){
        t1x=(props.line.y*1)-10;
      }
      if(t2x+60>(_Width*0.93)){
        t2x=(props.line.x*1)-wdt2;
      }
      _Line = <line className="sparkline--cursor" x1={props.line.x} x2={props.line.x} y1={_Height} y2={props.line.y} strokeWidth="2" strokeDasharray="2"></line>;
      _Lineh = <line className="sparkline--cursor" x1={_Width} x2={props.line.x} y1={props.line.y} y2={props.line.y} strokeWidth="2" strokeDasharray="2"></line>;      
      text1 = <div className="sparkline--text" style={{top:t1x,left:h1,color:colorStroke,width:wdt1,borderColor:colorStroke}}>{`$ ${props.line.total.toFixed(2)}`}</div>
      text2 = <div className="sparkline--text" style={{top:h2,left:t2x,color:colorStroke,width:wdt2,borderColor:colorStroke}}>{`${props.line.date}`}</div>
    }
    return (
      <div className="SparklineBase" style={baseStyle}>
            <svg className="" width={svgW} height={svgH} strokeWidth="1" stroke={colorStroke} fill={colorFill}>
                <path className="sparkline--fill" d={`${dFPath}`} stroke="none"></path>
                <path className="sparkline--line" d={dPath} fill="none"></path>
                {_Line}
                {_Lineh}
                {pointsCircle.map(crc=>{
                  return(
                    <circle  key={`${crc.x}--${crc.y}`} className="sparkline--spot" cx={crc.x} cy={crc.y} r="1.25" fill={colorStroke} onMouseMove={()=>handleMouseMove(crc)} onMouseOut={()=>handleMouseOut()}></circle>
                  )
                })}                
            </svg>
            {text1}
            {text2}
      </div>
    )  
});


export default class Sparkline extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          hover:false,
          ScreenWidth:0,
          width:0,
          height:0,
          rect:null
        };
      }
  componentDidMount() {  
    var _th6_ = this; 
    _th6_.setState({width:_th6_.MS_Elem.offsetWidth});
    _th6_.setState({height:_th6_.MS_Elem.parentNode.offsetHeight})  
    
  } 
  
  updateState(e){    
    this.setState({[e.key]:e.value});
  }
 
  updateSizeState(e){    
    var _th6_ = this;
    _th6_.setState({ScreenWidth:e});
    _th6_.setState({open:false});
    if(_th6_.MS_Elem){
      _th6_.setState({width:_th6_.MS_Elem.offsetWidth});
      if(_th6_.MS_Elem.offsetWidth>=600){
        _th6_.setState({height:_th6_.MS_Elem.offsetWidth/5}) 
      }else{
        _th6_.setState({height:120}) 
      }
       
    }   
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { Id,data, _height, _width ,isMobile, color} = this.props;
    return (
      <div ref={this.ref}> 
        <_Sparkline Id={Id} color={color} data={data} open={this.state.open} line={this.state.rect} hover={this.state.hover} _height={this.state.height} _width={this.state.width} _ScreenWidth={this.state.ScreenWidth} updState={this.updateState.bind(this)}  updateSizeState={this.updateSizeState.bind(this)}/>    
      </div>
    );
  }
}

