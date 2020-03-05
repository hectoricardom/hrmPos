import React, { Component } from 'react';
import './style.css';
import * as Util from '../../state/Util';

const monthsList_Short =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];

export  class GraphMultiLine extends Component {

  constructor(props) {
    super(props);  
    this.state = {        
      key:0,
      activeGraphtab:0,
    };
  }


  activeGraphtab(i){
    this.setState({activeGraphtab:i});
   }





  render() {
    const {graph,axleX,margin} = this.props;   
    
    var l = Object.keys(graph).length;
    var Wgraph = 320;
    var Xgraph = 32;
    var _max = sumMaxMultiData(graph);
    var _min = sumMinMultiData(graph);
    var range = l>0?_max-_min===0?null:_max-_min:null;
    const Moneys = range>0?createAmmountList(_max,_min):null;
    var YbyUnit = (26*8)/range;



    return (
          <div  className={'_graphHRM_'}  style={{position: 'relative', left: '0px', top: '0px', width: `${Wgraph+20}px`, height: '100%',marginBottom:'50px'}} aria-label="Un gráfico.">
            <svg width={Wgraph+20} height="300" aria-label="Un gráfico." style={{overflow: 'hidden'}}>
              <defs id="_ABSTRACT_RENDERER_ID_32"><clipPath id="_ABSTRACT_RENDERER_ID_33"><rect x={Xgraph} y="45" width={Wgraph} height="210"></rect></clipPath></defs>
              <rect x="0" y="0" width={Wgraph} height="300" stroke="none" strokeWidth="0" fill="transparent"></rect>
              <g>
                <rect x={Xgraph} y="45" width={Wgraph} height="210" stroke="none" strokeWidth="0" fillOpacity="0" fill="transparent"></rect>
                <g clipPath="">
                  <g>
                  {Moneys && Moneys.map((mn,In2)=>{
                    var xIn = (In2*26)+46;
                    let colorFill =  In2%2===0?"#d6d6d6":"#efefef";     
                    var xInText = (In2*26)+50;  
                    let colorFillText =  mn>=0?"#9e9e9e":"#c62828";
                    let _label = mn;
                    if(_max<20){
                      _label = In2%2===0?mn:""; 
                    }
                      return(
                        <g key={In2}>
                          <text textAnchor="middle" x={'15'} y={xInText} fontFamily="Arial" fontSize="9" stroke="none" strokeWidth="0" fill={colorFillText}>{_label}</text>
                          <rect x={Xgraph} y={xIn} width={Wgraph} height="1" stroke="none" strokeWidth="0" fill={colorFill} key={In2}></rect>  
                        </g>                  
                      )
                  })} 
                  
                  </g>                  
                  
                    {Object.keys(graph).map((grphData,i2nd) =>{                     
                      if(graph[grphData]){
                        let dPath = createD_Path_List_Year(graph[grphData]['data'],YbyUnit,_max,axleX,margin);
                        var stroke_dasharray = null
                        var strokeWidth = 1.6;
                        if(i2nd>0){
                          if(i2nd%2===0){
                             stroke_dasharray = i2nd
                             strokeWidth = 1.9;
                          }
                          else{
                             stroke_dasharray =  i2nd*2;
                          }
                          
                        }
                        return (
                          <g  key={`grphData_${grphData}`} >
                            <path d={dPath} strokeWidth={strokeWidth} fillOpacity="1" fill="none" style={{stroke:graph[grphData]['color']}} strokeDasharray={stroke_dasharray}></path>
                          </g>
                        )
                      }else{
                        return null
                      }
                      
                    })                                       
                    }
                  
                </g>
                <g></g>
                <g>
                  {axleX && axleX.map((mnt,In2)=>{                    
                    return(
                      <g key={In2}>
                        <text textAnchor="middle" x={mnt.x} y="272.2" fontFamily="Arial" fontSize="10" stroke="none" strokeWidth="0" fill="#9e9e9e">{mnt.label}</text>
                      </g>
                    )
                  })}

                  {/*false && Moneys.map((mn,In2)=>{
                    var xIn = (In2*26)+50;  
                    let colorFill =  mn>=0?"#9e9e9e":"#c62828";                
                      return(
                        <g key={In2}>
                          <text textAnchor="middle" x={'15'} y={xIn} fontFamily="Arial" fontSize="9" stroke="none" strokeWidth="0" fill={colorFill}>{mn}</text>
                        </g>
                      )
                  })
                */}                 
                    
                  </g>
                </g>
                </svg>
            </div>
    );
  }
}

var _width = 340;


function createD_Path_List_Year(g,YbyUnit,max,axleX,margin){

  var dPath = '';
  Object.keys(g).map((_day,In2)=>{
    if(g[_day]){   
      let Yp = (max-g[_day])*YbyUnit+46;
      let multiplier = (_width-margin)/axleX.length;
      let Xp = (In2*multiplier)+margin;   
      
      let Xvert = Xp.toFixed(2);
      let Yvert = Yp.toFixed(2); 
      if(In2===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }
    }else{
      let Yp = (max)*YbyUnit+46;
      let multiplier = (_width-margin)/axleX.length;
      let Xp = (In2*multiplier)+margin;   
      let Xvert = Xp.toFixed(2);
      let Yvert = Yp.toFixed(2);   
      if(In2===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }
    }   
  })
  return dPath;
}



function sumMaxMultiData(g){
  var _max = 0; 
  Object.keys(g).map(dys=>{
    var list = g[dys] && g[dys]['data'];    
    list && Object.keys(list).map(wk=>{
      if(list[wk]){        
        let _import = list[wk];
        if(_import>_max){
          _max = _import;
        }
      }
    })
  })  
  return _max;
}

function sumMinMultiData(g){
  var _min = 1000000000;
    Object.keys(g).map(dys=>{
      var list = g[dys] && g[dys]['data'];
      list && Object.keys(list).map(wk=>{        
          let _import = list[wk];
          if(_import<_min){
            _min = _import;
          }
        
      })
    })  
    return _min;
  }







function createAmmountList(max,min){  
  var y = [];
  var range = max-min;
  if(range!==0){
    let mtl = range/8;
    for(let i=0;i<=8;i++){
      if(mtl){
        y.push(Math.floor(max-(mtl*i)));
      }
    }
  }else{
    let mtl = Math.ceil(max*2/8);
    for(let i=0;i<=8;i++){
      if(mtl){
        y.push(Math.floor(max*2-(mtl*i)));
      }
    }
  }
   
 return y;
}

/*
function createXAxleList(g){
  var y = [];
  var Index0 = Object.keys(g)[0];  
  var list = g[Index0] && g[Index0]['data'];
  list && Object.keys(list).map((mnt,In2)=>{
      var xIn = (In2*27)+30;     
      var wdate = Util.getWeekDate(parseInt(mnt));
      var _label_ = In2%2==0?wdate.getTime()>(new Date()).getTime()?'':`${monthsList_Short[wdate.getMonth()]}, ${wdate.getDate()}`:'';     
      y.push({x:xIn,label:_label_})
  }) 
  return y;
}
*/

