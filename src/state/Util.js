import fetch from 'isomorphic-fetch';
import loadScript from 'load-script';
import CryptoJS from 'crypto-js';


const googleMaps_GLOBAL = 'googleMaps'
//const gmapUrl = `https://maps.google.com/maps/api/js?sensor=false`
const gmapUrl = `https://maps.googleapis.com/maps/api/js?libraries=places`


const fingerprint_GLOBAL = 'Fingerprint2'
const firebaseUrl = `https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.8.0/fingerprint2.min.js`







export function getFingerPrint() {
    return new Promise((resolve, reject) => {        
        getSDK(firebaseUrl, fingerprint_GLOBAL).then(fp => {
            fp().get(function(result, components) { 
                resolve(result);
            })    
        }) 
    })      
  };
  
  export function getGmpAddress() {
    return new Promise((resolve, reject) => {
        getSDK(gmapUrl, googleMaps_GLOBAL).then(fp => {
            var geocoder = new window.google.maps.Geocoder(); 
            resolve(geocoder);             
        }) 
    })      
  };

  

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export function buildTimeString_(displayTime, showHour) {
    var h = Math.floor(displayTime / 3600);
    var m = Math.floor((displayTime / 60) % 60);
    var s = Math.floor(displayTime % 60);
    if (s < 10) s = '0' + s;
    var text = m + ':' + s;
    if (showHour) {
      if (m < 10) text = '0' + text;
      text = h + ':' + text;
    }
    return text;
  };
  


export function isJson(s) {
    var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
  }
  
  
export function list2Array(a) {
    var r = [];
    for(let x=0;x<a.length;x++){
        r.push(a[x]);
    }
    return r;
}
    
export const Base64 = {
  
  
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  
  
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
  
        input = Base64._utf8_encode(input);
  
        while (i < input.length) {
  
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
  
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
  
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
  
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  
        }
  
        return output;
    },
  
  
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
        while (i < input.length) {
  
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
  
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
  
            output = output + String.fromCharCode(chr1);
  
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
  
        }
  
        output = Base64._utf8_decode(output);
  
        return output;
  
    },
  
    _utf8_encode: function(string) {        
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    },
  
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0,c1,c2,c3;
        var c = c1 = c2 = 0;
  
        while (i < utftext.length) {
  
            c = utftext.charCodeAt(i);
  
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
  
        }
  
        return string;
    }
  
  }
 

  //// 20180103115629
  // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=87dfa1c669eea853da609d4968d294be
  
  export function isLandscape() {
    return (window.orientation === 90 || window.orientation === -90);
  }
  
  export function isPortrait() {
    return window.innerHeight > window.innerWidth;
  }




  export function calcTotal(itemOnCart, id,orderId){  
    let value = 0;
    let currentOrder = itemOnCart && itemOnCart[orderId] && itemOnCart[orderId][id]  && itemOnCart[orderId][id];
    let currentSize = currentOrder && currentOrder['size'];
    let valueOrder = 0;
    let QtyOrder = currentOrder && currentOrder['qty'];
    let currentSizeKey = currentSize && Object.keys(currentSize)[0];  
    let valeSize = currentSizeKey && currentSize[currentSizeKey]?currentSize[currentSizeKey]:0;
    valueOrder += valeSize;
    currentOrder && currentOrder['extras']   && Object.keys(currentOrder['extras']).map(_ext=>{
      let _extQty = currentOrder['extras'][_ext]['qty']?currentOrder['extras'][_ext]['qty']:0;
      let _price = currentOrder['extras'][_ext]['price']?currentOrder['extras'][_ext]['price']:0;
      if(_extQty>0){
        valueOrder += _price*_extQty; 
      }          
    })
    value = valueOrder * QtyOrder;
    return value;
  }
  
  
  export function calcTotalCart(itemOnCart){
    let value = 0;
    itemOnCart && Object.keys(itemOnCart).map(orderId=>{
      let valueOrder = 0;
      let QtyOrder = 1;
      Object.keys(itemOnCart[orderId]).map(id=>{
        let currentOrder = itemOnCart && itemOnCart[orderId] && itemOnCart[orderId][id]  && itemOnCart[orderId][id];
        let currentSize = currentOrder && currentOrder['size'];
        QtyOrder = currentOrder && currentOrder['qty'];
        let currentSizeKey = currentSize && Object.keys(currentSize)[0];  
        let valeSize = currentSizeKey && currentSize[currentSizeKey]?currentSize[currentSizeKey]:0;
        valueOrder += valeSize;
        currentOrder && currentOrder['extras']   && Object.keys(currentOrder['extras']).map(_ext=>{
          let _extQty = currentOrder['extras'][_ext]['qty']?currentOrder['extras'][_ext]['qty']:0;
          let _price = currentOrder['extras'][_ext]['price']?currentOrder['extras'][_ext]['price']:0;
          if(_extQty>0){
            valueOrder += _price*_extQty; 
          }          
        })
      })
      value += valueOrder * QtyOrder;
    })
    return value;
  }
  
  



/*
  export function Y(){
    if (window.document) {
              var a = Element.prototype;
              a.requestFullscreen = a.requestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen || a.webkitRequestFullscreen;
              a = Document.prototype;
              a.exitFullscreen = a.exitFullscreen || a.mozCancelFullScreen || a.msExitFullscreen || a.webkitExitFullscreen;
              "fullscreenElement" in document || (
                Object.defineProperty(document, "fullscreenElement", {
                  get: function() {
                  var doc = document;
                          return doc.mozFullScreenEnabled || doc.msFullscreenEnabled || document.webkitFullscreenEnabled
                      }
                }),
                 Object.defineProperty(document, "fullscreenEnabled", {
                      get: function() {
                        var doc = document;
                          return doc.mozFullScreenEnabled || doc.msFullscreenEnabled || document.webkitFullscreenEnabled
                      }
                  })
                );
              document.addEventListener("webkitfullscreenchange", Tg);
              document.addEventListener("webkitfullscreenerror", Tg);
              document.addEventListener("mozfullscreenchange", Tg);
              document.addEventListener("mozfullscreenerror", Tg);
              document.addEventListener("MSFullscreenChange", Tg);
              document.addEventListener("MSFullscreenError", Tg)
          }
      };
  
  

  function Tg(a) {
    var b = a.type.replace(/^(webkit|moz|MS)/, "").toLowerCase();
    if ("function" === typeof Event) var c = new Event(b, a);
    else c = document.createEvent("Event");c.initEvent(b, a.bubbles, a.cancelable);
    a.target.dispatchEvent(c)
  }
  
  */


export  function IsFullScreen(elm) {
    //window.innerWidth == elm.clientWidth && window.innerHeight == elm.clientHeight
    var rs = false;
    if((window.innerWidth == elm.clientWidth)) {
        rs = true;
    }
    return rs;
}


export  function srt2Json(srt) {
    srt = srt.replace(/(\r\n|\n|\r)/gm,"&*^");
    var SrtL=[],nObjSrt = {id:null,start:null,end:null,startSt:null,endSt:null,text:''};
    srt.split('&*^').map(f=>{
        if(isNaN(f)){
            if(f.indexOf('-->')>3){
                nObjSrt.start = time2number(f.split('-->')[0]);
                nObjSrt.end = time2number(f.split('-->')[1]);
                nObjSrt.startSt = (f.split('-->')[0]);
                nObjSrt.endSt = (f.split('-->')[1]);
            }
            else{
                nObjSrt.text += f+'\n'; 
            }  
        }
        else{
            if(f===''){               
                if(nObjSrt.id){
                    SrtL.push(nObjSrt);
                }
                nObjSrt = {id:null,start:null,end:null,startSt:null,endSt:null,text:''};
            }
            else{
                nObjSrt.id = parseInt(f);
            }
        }        
    })    
    return SrtL
}

export  function m3u82srt(srt,host) {
    srt = srt.replace(/(\r\n|\n|\r)/gm,"&*^");
    var Url = null;
    srt.split('&*^').map(f=>{
        if(f.indexOf('.srt')>=0){  
            Url =host+'/stream/'+f;            
        }
    })
    return Url;
}


export  function srtBySecond(s,arr) {    
    var start = 0,end = arr.length,factor=10, range=end-start,step=range/factor;
    var txt = null;    
    for(var i=0;i<factor;i++){
        var Ind = Math.floor((i*step)+start);
        var ArrStep = arr[Ind];
        var Cst = ArrStep.start
        var Cend = ArrStep.end
        if(Cst>s){
            end=Ind;
            range=end-start;
            step=range/factor; 
        }
        else if(Cst<s){
            start=Ind;
            range=end-start
            ;step=range/factor; 
        }
        if(range<100){ 
            break
        } 
        
    }
    
    for(var i = start;i<=end;i++){        
        var CSt = arr[i];
        if(CSt){
            var Cst = CSt.start
            var Cend = CSt.end            
            if(Cst<=s && Cend>=s){
                txt = CSt.text;    
            }
        }
    }
    return txt
}


function time2number(s){
    var tm = s.split(':'),num = 0;
    if(tm.length>2){
        num = parseFloat(tm[0])*3600+parseFloat(tm[1])*60+parseFloat(tm[2])        
    }
    else{
        num = parseFloat(tm[1])*60+parseFloat(tm[2])
    }
    return num;
}

export const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        console.log('style changed!');
    });    
});
  



export function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

// From ArrayBuffer to Buffer:

export function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}


export const fetchGet = async graphQLUrl => {
    const res = await fetch(graphQLUrl, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `HRMsgsdgsdgsdgsdgr2341241hgf`
      }
      //,body: serializedParams
    });
    const resJSON = await res.json();
    const {errors} = resJSON;
    return {data:resJSON, error: errors};
};

//https://translate.google.com/translate_a/single?client=t&sl=es&tl=en&hl=es&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=2&ssel=3&tsel=6&kc=10&tk=290284.131358&q=dime%20como%20estas%20locas

//C:/Bento4/bin/mp4hls C:/MediaStream/tiVHWvNhoAwG4eWb/tiVHWvNhoAwG4eWb.mp4 -o C:/MediaStream/tiVHWvNhoAwG4eWb -f




export function getSDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true) {
    if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
      return Promise.resolve(window[sdkGlobal])
    }
    return new Promise((resolve, reject) => {
      if (sdkReady) {
        const previousOnReady = window[sdkReady]
        window[sdkReady] = function () {
          if (previousOnReady) previousOnReady()
          resolve(window[sdkGlobal])
        }
      }
      loadScript(url, err => {
        if (err) reject(err)
        if (!sdkReady) {
          resolve(window[sdkGlobal])
        }
      })
    })
  }
  



export const getClassCode = id => {
    var cClss = Base64.encode(id).toString()
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;
    
};



export const cleanbase64 = id => {
    var cClss = id;
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;
    
};

export const UniqueArray = (c) => {
    var a = JSON.stringify(c);
    a = JSON.parse(a);
    var t = [],tobj = {};
    for(var i=0;i<a.length;i++){
        if(!tobj[a[i].id]){            
            t.push(a[i]);
            tobj[a[i].id]=true
        }
    }
    return t;
}



export async function supportsWebp() {
    if (!window.createImageBitmap) return false;
    
    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  }
  
  export async function SupportWebp(){
    if(await supportsWebp()) {
      return true
    }
    else {
        return false
    }
  };

  export  function InitWebp(){
    //WebpToCanvas = window.Module.cwrap('WebpToSDL', 'number', ['array', 'number']);    
  };




export function compareArraybyID(arr1,arr2) {
    var ta1 = arr1.map(d=>d.id);
    var ta2 = arr2.map(d=>d.id);
    return JSON.stringify(ta1)===JSON.stringify(ta2)
}

export function convertArray2Obj(arr1,key) {
    key=key?key:'id';
    var obj ={};
    if(arr1.length>0){
        arr1.map(s=>{
            obj[s[key]]=s;
        })
    }else{
        obj = null
    }
   return obj;
}

export function convertArray2ObjGroupby(arr1,key) {
    key=key?key:'id';
     var obj ={};
    if(arr1.length>0){
        arr1.map(s=>{
            if(!obj[s[key]]){
                obj[s[key]]=[];
            }
            obj[s[key]].push(s);
        })
    }else{
        obj = null
    }
   return obj;
}

export function convertObj2Array(obj) {
    var arr = [];
    obj && ObjectKeys(obj).map(o=>{
        arr.push(obj[o]);
    })    
   return arr;
}





export const getBrowserUserAgent = ()=>{
    var br = navigator.userAgent;
    var User = {
        platform:null,     
        Mozilla:null,
        AppleWebKit:null,
        Chrome:null,
        Safari:null,
        IsMobile:false  
    }  
    br = br.toString().replace('(KHTML, like Gecko)','');
    var stream_start = br.indexOf('(') + 1, stream_end = br.lastIndexOf(')');
    var _plattForm = br.slice(stream_start, stream_end).trim();
    User.platform = {arch:_plattForm.split(';')[0],os:_plattForm.split(';')[1],build:_plattForm.split(';')[2]};  
    br = br.toString().replace('('+_plattForm+')','').split(' ');
    br.map(att =>{
        if(att.indexOf('Mozilla/')>=0){
            User.Mozilla = att.split('Mozilla/')[1];
        }
        else if(att.indexOf('AppleWebKit/')>=0){
            User.AppleWebKit = att.split('AppleWebKit/')[1];
        }
        else if(att.indexOf('Chrome/')>=0){
            User.Chrome = att.split('Chrome/')[1];
        }
        else if(att.indexOf('Safari/')>=0){
            User.Safari = att.split('Safari/')[1];
        }
        else if(att.indexOf('Mobile')>=0){
            User.IsMobile = true;
        }
    })
    return User;
  }


  ///sendImmunizationEmail 


export const monthsList_Short =[``,`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];


export const _dayShortNames = {"en":['S','M','T','W','T','F','S'],"es":['D','L','M','M','J','V','S']}
export const _monthNames = {"en":['','January','February','March','April','May','June','July','August','September','October','November','December'],"es":['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']}
export const _dayLargeNames = {"en":["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"],"es":["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes", "Sabado"]} ;

export function parseDate(d) {
    var lng = localStorage.getItem('lng');
    d = Number(d);     
    var tp =  new Date(d);
    return `${_monthNames[lng][tp.getMonth()+1]} ${tp.getDate()}, ${tp.getFullYear()}`;
}

export function parseFullDate(d) {
    var lng = localStorage.getItem('lng');
    d = Number(d);     
    var tp =  new Date(d);
    return `${tp.getDate()} de ${_monthNames[lng][tp.getMonth()+1]} del ${tp.getFullYear()}`;
}


export function parseDateShort(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${monthsList_Short[tp.getMonth()+1]} ${tp.getDate()}`;
}

export function parseDay(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${tp.getDate()}`;
}

export function parseMonthShort(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${monthsList_Short[tp.getMonth()+1]}`;
}

export function sumArraybyKey(a,k) {
    var sumK = 0;
    a.map(d=>{
        sumK += d[k];
    })
    return sumK.toFixed(2);
}


/*        */
export function GroupbyMonth(a) {    
    var gb = {}  
    a.map(d=>{
        var dtc = new Date(parseInt(d.date));
        var yyyy = dtc.getFullYear()       
        var numyearmonth =  dtc.getMonth()+dtc.getFullYear()*12;
     
        if(!gb[yyyy]){
            gb[yyyy] = {};
            gb[yyyy][`list`] = {};
            gb[yyyy][`total`] = 0;
        }  
        if(!gb[yyyy][`list`][numyearmonth]){
            gb[yyyy][`list`][numyearmonth]  = {};
            gb[yyyy][`list`][numyearmonth][`list`] = [];
            gb[yyyy][`list`][numyearmonth][`total`] = 0;
        }
        gb[yyyy][`list`][numyearmonth][`list`].push(d);
        var f = d.import;
        if(typeof(f)==="number"){
            gb[yyyy][`list`][numyearmonth][`total`]  += f;
            gb[yyyy][`total`] += f;
        }        
    })      
    return gb;
}

export function GroupbyMonthXCategories(a,c) {
    //if(ig.date && (new Date(parseInt(ig.date))).getFullYear()==_year){ } 
    var gb = {};   
    if(c){
        a.map(d=>{
            var f = 0; 
            if(d.group && c[d.group] && c[d.group][`id`]){
                var dtc = new Date(parseInt(d.date));
                var yyyy = dtc.getFullYear()
                if(!gb[yyyy]){
                    gb[yyyy]={};
                }
                if(!gb[yyyy][d.group]){
                    gb[yyyy][d.group] = {};
                    gb[yyyy][d.group][`list`] = {};
                    gb[yyyy][d.group][`total`] = 0;
                }               
                var numyearmonth =  dtc.getMonth()+dtc.getFullYear()*12;       
                if(!gb[yyyy][d.group][`list`][numyearmonth]){
                        gb[yyyy][d.group][`list`][numyearmonth] = {};
                        gb[yyyy][d.group][`list`][numyearmonth][`list`] = [];
                        gb[yyyy][d.group][`list`][numyearmonth][`total`] = 0;
                }
                gb[yyyy][d.group][`list`][numyearmonth][`list`].push(d);
                f = d.import;            
                if(typeof(f)==="number"){// && f%1!==0){
                    gb[yyyy][d.group][`total`] += f;
                    gb[yyyy][d.group][`list`][numyearmonth][`total`]  += f;
                }        
            } 
        })
    }    
    return gb;
}


export function groupByType(a) {
    var _type='type';
    var gb = {}; 
    for(var h in a){
        var d = a[h];        
        if(d[_type]){
            if(!gb[d[_type]]){
                gb[d[_type]] = [];
            }            
            gb[d[_type]][d.id] = d;                    
        } 
    }   
    return gb;
}

export function groupByShift(a,k) {
    var _type='group';
    var gb = {};       
    for(var h in a){        
        var d = a[h];
        if(d[_type]){
            if(!gb[d[_type]]){
                gb[d[_type]] = [];
            }
            if(k && k[d.kid]){
                gb[d[_type]].push(d);   
            }                 
        } 
    }    
    return gb;
}


export function GroupbyWeek(a) {
    //if(ig.date && (new Date(parseInt(ig.date))).getFullYear()==_year){ } 
    var gb = {};   
    a.map(d=>{
        var dtc = new Date(parseInt(d.date));
        var yyyy = dtc.getFullYear()       
        if(!gb[yyyy]){
            gb[yyyy] = {};
            gb[yyyy][`list`] = {};
            gb[yyyy][`maxImport`] = 0;
            gb[yyyy][`maxWeek`] = 0;   
            gb[yyyy][`minWeek`] = (new Date()).getTime();
        }        
        var numyearmonth =  dtc.getWeek()+dtc.getFullYear()*52
        if(! gb[yyyy][`list`][numyearmonth]){
            gb[yyyy][`list`][numyearmonth] = {};            
            var wday = 5 - dtc.getDay();
            var day = dtc.getDate()-wday;
            if(day<=0){ 
                day = dtc.getDate()-(wday-7);
            }
            var ndt = new Date(`${ dtc.getMonth()+1}/${day}/${dtc.getFullYear()}`);
            gb[yyyy][`list`][numyearmonth][`date`] = ndt.getTime();
            gb[yyyy][`list`][numyearmonth]['total'] = 0;            
        }
        gb[yyyy][`list`][numyearmonth]['total'] =  gb[yyyy][`list`][numyearmonth]['total'] + parseFloat(d.import);
        if( gb[yyyy][`list`][numyearmonth]['total']> gb[yyyy][`maxImport`]){
            gb[yyyy][`maxImport`]= gb[yyyy][`list`][numyearmonth]['total'];
        }
        if(numyearmonth> gb[yyyy][`maxWeek`]){
            gb[yyyy][`maxWeek`]=numyearmonth;
        }
        if(numyearmonth< gb[yyyy][`minWeek`]){
            gb[yyyy][`minWeek`]=numyearmonth;
        }
    })     
    return gb;
}


export function GroupbyCategories(a,c) {
    var gb = {};
    a.map(d=>{        
        if(d.group && c[d.group] && c[d.group][`id`]){
            var dtc = new Date(parseInt(d.date));
            var yyyy = dtc.getFullYear()
            if(!gb[yyyy]){
                gb[yyyy]={};
            }
            if(!gb[yyyy][d.group]){
                gb[yyyy][d.group] = {};
                gb[yyyy][d.group][`list`] = {};
                gb[yyyy][d.group][`maxImport`] = 0;
                gb[yyyy][d.group][`maxWeek`] = 0;   
                gb[yyyy][d.group][`minWeek`] = (new Date()).getTime();
            }            
            var numyearmonth =  dtc.getWeek()+dtc.getFullYear()*52
            if(!gb[yyyy][d.group][`list`][numyearmonth]){
                gb[yyyy][d.group][`list`][numyearmonth] = {};            
                var wday = 5 - dtc.getDay();
                var day = dtc.getDate()-wday;
                if(day<=0){ 
                    day = dtc.getDate()-(wday-7);
                }
                var ndt = new Date(`${ dtc.getMonth()+1}/${day}/${dtc.getFullYear()}`);
                gb[yyyy][d.group][`list`][numyearmonth][`date`] = ndt.getTime();
                gb[yyyy][d.group][`list`][numyearmonth]['total'] = 0;            
            }
            gb[yyyy][d.group][`list`][numyearmonth]['total'] = gb[yyyy][d.group][`list`][numyearmonth]['total'] + parseFloat(d.import);
            if(gb[yyyy][d.group][`list`][numyearmonth]['total']>gb[yyyy][d.group][`maxImport`]){
                gb[yyyy][d.group][`maxImport`]=gb[yyyy][d.group][`list`][numyearmonth]['total'];
            }
            if(numyearmonth>gb[yyyy][d.group][`maxWeek`]){
                gb[yyyy][d.group][`maxWeek`]=numyearmonth;
            }
            if(numyearmonth<gb[yyyy][d.group][`minWeek`]){
                gb[yyyy][d.group][`minWeek`]=numyearmonth;
            }
        }
    })
      
    return gb;
}


export function GroupbyKeyValue(a,k2c,v2c) {
    var gb = {}   
    var tt = 0;
    for (var fl in a) {        
        for (var i in a[fl]['list']) {
            var itm = a[fl]['list'][i];            
            if(itm[k2c].toFixed(2).toString().toLowerCase().indexOf(v2c.toLowerCase())>=0){
                if(!gb[fl]){
                    gb[fl]={}
                    gb[fl]["list"]=[]
                    gb[fl]["total"]=0
                }
                gb[fl]["total"] += itm[k2c];
                tt += itm[k2c];
                gb[fl]["list"].push(itm);                
            }    
        }
    }    
    return {gbyMonth:gb,tt:tt};
}

export function GroupbyMultiKeyValue(a,k1,k2,v2c) {
    var gb = {}   
    var tt = 0;
    var kmn ='import'
    for (var fl in a) {        
        for (var i in a[fl]['list']) {
            var itm = a[fl]['list'][i];   
                
            if(itm[k1] && itm[k1].toString().toLowerCase().indexOf(v2c.toLowerCase())>=0){
                if(!gb[fl]){
                    gb[fl]={}
                    gb[fl]["list"]=[]
                    gb[fl]["total"]=0
                }
                gb[fl]["total"] += itm[kmn];
                tt += itm[kmn];
                gb[fl]["list"].push(itm);
            } 
            else if(itm[k2] && itm[k2].toString().toLowerCase().indexOf(v2c.toLowerCase())>=0){
                if(!gb[fl]){
                    gb[fl]={}
                    gb[fl]["list"]=[]
                    gb[fl]["total"]=0
                }
                gb[fl]["total"] += itm[kmn];
                tt += itm[kmn];
                gb[fl]["list"].push(itm);                
            }
        }
    }    
    return {gbyMonth:gb,tt:tt};
}




export function GroupbyKey(a,key) {
    var gb = {}
    a.map(d=>{            
        if(!gb[d[key]]){
            gb[d[key]] = [];
        }
        gb[d[key]].push(d);
    })
    return gb;
}

export function febMaxDays(year){
    if ( (year%100!==0)){
        if((year%4===0) || (year%400===0)){
            return 29;
        }else{
            return 28;
        }
    }else{
      return 28;
    }
  }

export function NextMonth(month){
    if (month>8){
      return `${month}`;
    }else{
      return `0${month}`;
    }
  }

  export function sumary(year, ingresos, gastos,groupsObj){
    var suM = {};      
    ObjectKeys(ingresos).map(ig=>{      
      if(parseInt(ig/12)===year){       
          var mnt = ig%12;                     
          if(!suM[mnt]){
            suM[mnt] = {}       
            var sumIng = ingresos[ig][`total`];          
            suM[mnt][`month`]=mnt;
            suM[mnt][`ingresos`]=sumIng;
            suM[mnt][`gastos`]=0;                    
          }else{
            var sumIng = ingresos[ig][`total`]; 
            var NsumIng = suM[mnt].ingresos + sumIng;
            suM[mnt][`ingresos`]=NsumIng;            
          }
      }
    })    
    ObjectKeys(gastos).map(ig=>{
        if(parseInt(ig/12)===year){
            var mnt = ig%12;             
            if(!suM[mnt]){
                suM[mnt] = {}
                var sumIng = gastos[ig][`total`];
                
                if(!sumIng){
                    suM[mnt][`gastos`]=0;
                }
                if(sumIng && typeof(sumIng)==="number" && sumIng>=0){
                    if(!suM[mnt][`gastos`] || typeof(suM[mnt][`gastos`])!=="number"){
                        suM[mnt][`gastos`] =0;   
                    }          
                    suM[mnt][`gastos`] += sumIng;     
                }else if(!sumIng){
                    suM[mnt][`gastos`]=0;
                }
                suM[mnt][`ingresos`]=0;              
              gastos[ig][`list`].map(ct=>{
                if(!suM[mnt][`details`]){
                    suM[mnt][`details`]={};
                }
                suM[mnt][`month`]=mnt;                
                var Catg=`others`;
                if(groupsObj[ct.group]){
                    Catg = groupsObj[ct.group].name;
                }
                suM[mnt][`details`][Catg]=0;  
                var f = ct.import;            
                if(typeof(f)==="number" && f>=0){// && f%1!==0){
                    suM[mnt][`details`][Catg] += f;                   
                }
              })                        
            }else{
                if(!suM[mnt][`details`]){
                    suM[mnt][`details`]={}
                }                
                var sumIng = gastos[ig][`total`];    
                if(sumIng && typeof(sumIng)==="number" && sumIng>=0){
                    if(!suM[mnt][`gastos`] || typeof(suM[mnt][`gastos`])!=="number"){
                        suM[mnt][`gastos`] =0;   
                    }          
                    suM[mnt][`gastos`] += sumIng;     
                }else if(!sumIng){
                    suM[mnt][`gastos`]=0;
                }
                gastos[ig][`list`].map(ct=>{    
                    var Catg=`others`
                    if(groupsObj[ct.group]){
                        Catg = groupsObj[ct.group].name
                    }                
                    if(typeof(suM[mnt][`details`][Catg])==="number" && suM[mnt][`details`][Catg]>=0){}else{
                        suM[mnt][`details`][Catg]=0
                    }         
                    var f = ct.import;            
                    if(typeof(f)==="number" && f>=0){// && f%1!==0){
                        suM[mnt][`details`][Catg] += f;                   
                    }
                  })
              
            }
        }
      })     
      return suM
  }


  export function sumaryYear(filters,groupsObj,_year){
      
    var suM = {}, ingresos = filters['ingresos'][`_root_`], gastos = filters['gastos'][`_root_`];
    ingresos.map(ig=>{
        var knD = `ingresos`;
            if(!suM[knD]){
                suM[knD]={}
            }
            if(!suM[knD][`details`]){
                suM[knD][`details`]={}
            }
            if(!suM[knD][`total`]){
                suM[knD][`total`]=0
            } 
        if(ig.date && (new Date(parseInt(ig.date))).getFullYear()==_year){                                  
            var Catg=`others`
            if(groupsObj[ig.group]){
                Catg = groupsObj[ig.group].name
            }
            if(!suM[knD][`details`][Catg]){
                suM[knD][`details`][Catg]=0
            }
            var f = ig.import;    

            if(typeof(f)==="number"){
                suM[knD][`details`][Catg] += f;
                suM[knD][`total`]   += f                
            }
            else{
            f = parseFloat(ig.import)
                suM[knD][`details`][Catg] += f;
                suM[knD][`total`]   += f 
            } 
        }
         
    })
    gastos.map(ig=>{
        var knD = `gastos`;
        if(!suM[knD]){
            suM[knD]={}
        }
        if(!suM[knD][`details`]){
            suM[knD][`details`]={}
        }
        if(!suM[knD][`total`]){
            suM[knD][`total`]=0
        }
        if(ig.date && (new Date(parseInt(ig.date))).getFullYear()==_year){ 
            var Catg=`others`
            if(groupsObj[ig.group]){
                Catg = groupsObj[ig.group].name
            }
            if(!suM[knD][`details`][Catg]){
                suM[knD][`details`][Catg]=0
            }
            var f = ig.import;   
            if(typeof(f)==="number"){
                suM[knD][`details`][Catg] += f;
                suM[knD][`total`]   += f                
            }else{
                f = parseFloat(ig.import)
                suM[knD][`details`][Catg] += f;
                suM[knD][`total`]   += f 
            } 
        } 
      })
      return suM
  }






  var lastUpdate = null;   
  export function _EventSourceFunction(commonStore) {
    var Ct = new Date();
    lastUpdate = Ct.getTime();
    if (!!window.EventSource) {  
      var fps = window.localStorage.getItem('fpXb');      
      commonStore._EventSource = new EventSource(`${commonStore.serverUrl}/getChanges?fp=${fps}&tk=${commonStore.token}`)
      commonStore._EventSource.addEventListener('message', function(e) { 
        if(isJson(e.data)){
          var ac = JSON.parse(e.data);            
          if(ac.data){                     
            const {action,data} = ac;
            const dd = JSON.stringify(data);
            var _data = getJson2P(dd);
            delete _data[`updatedAt`];
            delete _data[`createdAt`];  
            if(action===`TokenExpired`){
                window.localStorage.removeItem('jwt');                
            }
            if(action===`Update`){
                commonStore.update(ac.collection.toLowerCase(),_data); 
            }
            else if(action===`Add`){
              commonStore.add(ac.collection.toLowerCase(),_data);
            }
            else if(action===`Remove`){
              commonStore.remove(ac.collection.toLowerCase(),_data.id);
            }
            //commonStore.load(`appLoaded`,true)             
          }else if(ac.hash){
            window.localStorage.setItem('sHash',ac.hash);
          }          
          else{
              var Ct = new Date();
              if(Ct.getTime()>lastUpdate+5000){
                //window.localStorage.removeItem('jwt');
              }                 
                //commonStore.load(`appLoaded`,true)
          }          
        }
        else{
          //console.log(e)
        } 
      }, false)
      commonStore._EventSource.addEventListener('open', function(e) {          
      }, false) 
  
      commonStore._EventSource.addEventListener('error', function(e) {
        if (e.readyState == EventSource.CLOSED) {
          //console.log("Connection was closed")
        }
      }, false)
      
      commonStore.load(`_EventSourceAction`,commonStore._EventSourceAction+1); 
    }
  }


export function getJson2P(p){
    return JSON.parse(p);
}

export function ObjectKeys(p) {    
    var r =[];
    try{
       r= Object.keys(p);       
    }
    catch(e){
        for (var k in p) {
           r.push(k);
        }
    }
    return r
  }


  

export function MaxDayperMotnh(yyyy,mm){
    if(!yyyy || !mm){
        return null
    }
    var y = parseInt(yyyy.toString()),m= parseInt(mm.toString())
    var _dayPerMonth = [0,31,febMaxDays(y),31,30,31,30,31,31,30,31,30,31]
    return _dayPerMonth[m];
}

  
export function isInteger(f) {
    return typeof(f)==="number" && f%1===0;
}

export function isFloat(f) {
   return typeof(f)==="number" && f%1!==0;
}

export const extList = {
    webp:`image/webp`,
    jpg:`image/jpg`,
    png:`image/png`,
    gif:`image/gif`,
    ts:`video/MP2T`,
    m3u8:`application/x-mpegURL`,
    mp4:`video/MP4`,
    m4s:`text/plain`,
    js:`application/javascript; charset=UTF-8`,
    css:'text/css; charset=utf-8',
    mpd:`application/dash+xml`,
    svg:`image/svg+xml`,
    html:`text/html; charset=UTF-8`
} 

export function isEmail(value){
    const re = /.+@.+/;
    var rs = false;    
    if (re.test(value)) {
        rs = true
    }
    return rs;
}

export function isDate(yyyy,mm,dd){
    var rs = false;
    if(isInteger(yyyy) && isInteger(mm) && isInteger(dd)){
        if(mm<10){ mm='0'+mm}
        if(dd<10){ dd='0'+dd}
        //var dtDDMM = `${dd}/${mm}/${yyyy}`; const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
        var dtMMDD = `${mm}/${dd}/${yyyy}`;  
        const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((19|20)\d{2})/g;        
        if (validDateMMDDYYYY.test(dtMMDD)) {  
            rs = true
        }
        else{
            rs = false
        }
    }    
    return rs;
}

export function formatDate(yyyy,mm,dd){    
    var rs = null;
    if(isInteger(yyyy) && isInteger(mm) && isInteger(dd)){
        if(mm<10){ mm='0'+mm}
        if(dd<10){ dd='0'+dd}
        //var dtDDMM = `${dd}/${mm}/${yyyy}`; const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
        var dtMMDD = `${mm}/${dd}/${yyyy}`;  
        const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((19|20)\d{2})/g;        
        if (validDateMMDDYYYY.test(dtMMDD)) {  
            rs = dtMMDD
        }
        else{
            rs = null
        }
    }    
    return rs;
}

export function formatSDate(s){
    var rs = null;
    var yyyy=s.split('/')[2],mm=s.split('/')[0],dd=s.split('/')[1];
    if(isInteger(yyyy) && isInteger(mm) && isInteger(dd)){
        if(mm<10){ mm='0'+mm}
        if(dd<10){ dd='0'+dd}
        //var dtDDMM = `${dd}/${mm}/${yyyy}`; const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
        var dtMMDD = `${mm}/${dd}/${yyyy}`;  
        const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2|3)\d{1})\/((19|20)\d{2})/g;        
        if (validDateMMDDYYYY.test(dtMMDD)) {  
            rs = dtMMDD
        }
        else{
            rs = null
        }
    }    
    return rs;
}


export function ValidateForm(fmr,fv){
    var rs = {valid:false,fld:''};
    if(fmr){
        rs = {valid:true,fld:''};        
        ObjectKeys(fmr).map(fl=>{
            var params = fv[fl];
            var isValid = ValidateField(fmr[fl],params);        
            if(!isValid.valid){
                rs = isValid;
                return rs;
            }
        })
    }        
    return rs;
}

function isNumeric(num){
    return !isNaN(num)
}

export function ValidateField(value,params){
    var rs = {valid:true,msg:''};    
    ObjectKeys(params).map(pr=>{   
        if(pr==='required'){
            if(value.length==0){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        } 
        if(pr==='number'){            
            if(isNaN(value)){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }    
        if(pr==='minLenght'){
            if(value.length<params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='minValue'){
            if(value<=params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='maxLenght'){
            if(value.length>params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='maxValue'){
            if(value>=params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        
    })
    return rs;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
     date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  
  // Returns the four-digit year corresponding to the ISO week of the date.
  Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
  }


  Date.prototype.dayOfYear= function(){
    var j1= new Date(this);
    j1.setMonth(0, 0);
    return Math.round((this-j1)/8.64e7);
}


  export const ColorList = [`237, 64, 122`,`184, 103, 198`,`255, 138, 101`,`79, 194, 247`,`124, 77, 255`,`0, 105, 92`,'38, 198, 218',`0, 137, 123`];
  const ColorHEXList = [`#4a148c`,`#f50057`,`#00e676`,`#f4511e`,`#00bcd4`,`#7986cb`,`#e57373`,`#ffea00`,`#DD2C00`,`#ba2d65`,`#7986cb`,`#cddc39`,`#ffb300`,`#00c853`,`#ff3d00`,`#ef9a9a`,`#9e00c5`];


  export const RouteColorList = {"/gastos":"198, 40, 40","/ingresos":"21, 101, 192","/dashboard":"78, 52, 46","/attendance":"124, 30, 163","/kids":"0, 96, 100","/groups":"244, 67, 54","/settings":"146, 152, 155","/logout":"146, 152, 155",}
  





  var Qh=/^[\w+/_-]+[=]{0,2}$/, Nh=/[?&]($|#)/, Lh=/#|$/

/*
  //https://r1---sn-vgqsrnll.googlevideo.com/videoplayback?c=WEB&clen=6309913&itag=251&ipbits=0&ctier=A&key=yt6&expire=1534058655&ms=au%2Crdu&id=o-AH6nN8y53Sjm31T_3c3oJft8SK5AGmfW3IDZcBWv4-N7&mv=m&mt=1534036959&pl=12&mn=sn-vgqsrnll%2Csn-vgqskned&mm=31%2C29&source=youtube&requiressl=yes&mime=audio%2Fwebm&ip=74.131.146.243&ei=P4xvW6WhJsGmDPf6qcAJ&pfa=5&lmt=1518971115491457&sparams=clen%2Cctier%2Cdur%2Cei%2Cgir%2Chightc%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpfa%2Cpl%2Crequiressl%2Csource%2Cexpire&gir=yes&hightc=yes&fvip=1&dur=388.261&keepalive=yes&initcwndbps=1405000&alr=yes&signature=2C13AD8249F7F35E7DE5CB4C6000612FA41514EA.85779B077061A228BBB72FF3AF7C2A25DE3C244B&cpn=XmYWb9WoJOEGBxE6&cver=2.20180809&rn=1&rbuf=0
  function mObjectURL(data, type)
  {
      var blob;
      try {
          blob = new Blob( data, { type: type });
      } catch(e) {
          if (!window.BlobBuilder) {
              window.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
          }
          if (window.BlobBuilder) {
              var bb = new BlobBuilder();
              bb.append(data.join("\n"));
              blob = bb.getBlob(type);
          }
      }
      return blob && URL.createObjectURL(blob);
  }*/

  export function getBrowser(usera) {
    var useragent = usera || navigator.userAgent;
    var os = false;
    var browser = false;
    var icon = '';
    var name = '';
    var verTag = '';
    var nameTrans = '';
    var current = false;
    var brand = false;
    var details = {};

    if (Object(useragent).details !== undefined) {
        return useragent.details;
    }
    useragent = (' ' + useragent).toLowerCase();

    
    if (useragent.indexOf('windows phone') > 0) {
        icon = 'wp.png';
        os = 'Windows Phone';
    }
    else if (useragent.indexOf('android') > 0) {
        os = 'Android';
    }
    else if (useragent.indexOf('windows') > 0) {
        os = 'Windows';
    }
    else if (useragent.indexOf('iphone') > 0) {
        os = 'iPhone';
    }
    else if (useragent.indexOf('imega') > 0) {
        os = 'iPhone';
    }
    else if (useragent.indexOf('ipad') > 0) {
        os = 'iPad';
    }
    else if (useragent.indexOf('mac') > 0
        || useragent.indexOf('darwin') > 0) {
        os = 'Apple';
    }
    else if (useragent.indexOf('linux') > 0) {
        os = 'Linux';
    }
    else if (useragent.indexOf('blackberry') > 0) {
        os = 'Blackberry';
    }

    if (useragent.indexOf(' edge/') > 0) {
        browser = 'Edge';
    }
    else if (useragent.indexOf('iemobile/') > 0) {
        icon = 'ie.png';
        brand = 'IEMobile';
        browser = 'Internet Explorer';
    }
    else if (useragent.indexOf('opera') > 0 || useragent.indexOf(' opr/') > 0) {
        browser = 'Opera';
    }
    else if (useragent.indexOf(' dragon/') > 0) {
        icon = 'dragon.png';
        browser = 'Comodo Dragon';
    }
    else if (useragent.indexOf('vivaldi') > 0) {
        browser = 'Vivaldi';
    }
    else if (useragent.indexOf('maxthon') > 0) {
        browser = 'Maxthon';
    }
    else if (useragent.indexOf('electron') > 0) {
        browser = 'Electron';
    }
    else if (useragent.indexOf('palemoon') > 0) {
        browser = 'Palemoon';
    }
    else if (useragent.indexOf('cyberfox') > 0) {
        browser = 'Cyberfox';
    }
    else if (useragent.indexOf('waterfox') > 0) {
        browser = 'Waterfox';
    }
    else if (useragent.indexOf('iceweasel') > 0) {
        browser = 'Iceweasel';
    }
    else if (useragent.indexOf('seamonkey') > 0) {
        browser = 'SeaMonkey';
    }
    else if (useragent.indexOf('lunascape') > 0) {
        browser = 'Lunascape';
    }
    else if (useragent.indexOf(' iron/') > 0) {
        browser = 'Iron';
    }
    else if (useragent.indexOf('avant browser') > 0) {
        browser = 'Avant';
    }
    else if (useragent.indexOf('polarity') > 0) {
        browser = 'Polarity';
    }
    else if (useragent.indexOf('k-meleon') > 0) {
        browser = 'K-Meleon';
    }
    else if (useragent.indexOf(' crios') > 0) {
        browser = 'Chrome';
        details.brand = verTag = 'CriOS';
    }
    else if (useragent.indexOf('chrome') > 0) {
        browser = 'Chrome';
    }
    else if (useragent.indexOf('safari') > 0) {
        verTag = 'Version';
        browser = 'Safari';
    }
    else if (useragent.indexOf('firefox') > 0) {
        browser = 'Firefox';
    }
    else if (useragent.indexOf(' otter/') > 0) {
        browser = 'Otter';
    }
    else if (useragent.indexOf('thunderbird') > 0) {
        browser = 'Thunderbird';
    }
    else if (useragent.indexOf('es plugin ') === 1) {
        icon = 'esplugin.png';
        browser = 'ES File Explorer';
    }
    else if (useragent.indexOf('megasync') > 0) {
        browser = 'MEGAsync';
    }
    else if (useragent.indexOf('msie') > 0
        || useragent.indexOf('trident') > 0) {
        browser = 'Internet Explorer';
    }

    // Translate "%1 on %2" to "Chrome on Windows"
    if ((os) && (browser)) {
        name = (brand || browser) + ' on ' + os;
        //nameTrans = String(l && l[7684]).replace('%1', brand || browser).replace('%2', os);
    }
    else if (os) {
        name = os;
        icon = icon || (os.toLowerCase() + '.png');
    }
    else if (browser) {
        name = browser;
    }
    else {
        name = 'Unknown';
        icon = 'unknown.png';
    }
    if (!icon && browser) {
        if (browser === 'Internet Explorer' || browser === 'Edge') {
            icon = 'ie.png';
        }
        else {
            icon = browser.toLowerCase() + '.png';
        }
    }

    details.name = name;
    details.nameTrans = nameTrans || name;
    details.icon = icon;
    details.os = os || '';
    details.browser = browser;
    details.version =
        (useragent.match(RegExp("\\s+" + (verTag || brand || browser) + "/([\\d.]+)", 'i')) || [])[1] || 0;

    // Determine if the OS is 64bit
    details.is64bit = /\b(WOW64|x86_64|Win64|intel mac os x 10.(9|\d{2,}))/i.test(useragent);

    // Determine if using a browser extension
    details.isExtension = (current  || useragent.indexOf('megext') > -1);

    if (useragent.indexOf(' MEGAext/') !== -1) {
        var ver = useragent.match(/ MEGAext\/([\d.]+)/);

        details.isExtension = ver && ver[1] || true;
    }

    if (brand) {
        details.brand = brand;
    }

    // Determine core engine.
    if (useragent.indexOf('webkit') > 0) {
        details.engine = 'Webkit';
    }
    else if (useragent.indexOf('trident') > 0) {
        details.engine = 'Trident';
    }
    else if (useragent.indexOf('gecko') > 0) {
        details.engine = 'Gecko';
    }
    else {
        details.engine = 'Unknown';
    }

    // Product info to quickly access relevant info.
    details.prod = details.name + ' [' + details.engine + ']'
        + (details.brand ? '[' + details.brand + ']' : '')
        + '[' + details.version + ']'
        + (details.isExtension ? '[E:' + details.isExtension + ']' : '')
        + '[' + (details.is64bit ? 'x64' : 'x32') + ']';
        
    return details;
}



const languageL_L={
    0:{en: "yes",es:"si"},
    1:{en: "attendance",es:"asistencia"},
    2:{en: "incomes",es:"ingresos"},
    3:{en: "kids",es:"niños"},
    4:{en: "kid",es:"niño"},
    5:{en: "shift",es:"turno"},
    6:{en: "groups",es:"grupos"},
    7:{en: "group",es:"grupo"},
    8:{en: "dashboard",es:"resumen"},
    9:{en: "settings",es:"herramientas"},
    10:{en: "setting",es:"herramienta"},
    11:{en: "logout",es:"salir"},
    12:{en: "daycare",es:"guardería"},
    13:{en: "save",es:"salvar"},
    14:{en: "delete",es:"borrar"},
    15:{en: "remove",es:"remover"},
    16:{en: "edit",es:"editar"},
    17:{en: "confirm",es:"confirmar"},
    18:{en: "title",es:"titulo"},
    19:{en: "description",es:"descripcion"},
    20:{en: "date",es:"fecha"},
    21:{en: "filter",es:"filtro"},
    22:{en: "order by",es:"ordenar por"},
    23:{en: "filter by",es:"filtrar por"},
    24:{en: "year",es:"año"},
    25:{en: "month",es:"mes"},
    26:{en: "day",es:"dia"},
    27:{en: "Date of Birth",es:"Fecha de Nacimiento"},
    28:{en: "cancel",es:"cancelar"},
    29:{en: "close",es:"cerrar"},
    30:{en: "address",es:"direccion"},
    31:{en: "cellphone",es:"telefono"},
    32:{en: "name",es:"nombre"},
    33:{en: "categories",es:"categorias"},
    34:{en: "vaccination",es:"vacunacion"},
    35:{en: "contract",es:"contrato"},
    36:{en: "import",es:"importe"},
    37:{en: "parent Name",es:"Nombre de los Padres"},
    38:{en: "Email sent to",es:"Mensaje enviado a"},
    39:{en: "please check your email we sent a new key",es:"por favor revise su correo electrónico, le enviamos una nueva clave"},
    40:{en: "Email sent to",es:"Mensaje enviado a"},
    41:{en: "store",es:"almacen"},
    42:{en: "finance",es:"finanza"},
    43:{en: "Are you want to eliminate it",es:"Esta seguro que desea elimiarlo"},
    44:{en: "open App",es:"abrir Aplicacion"},
    45:{en: "Profile Updated",es:"Perfil Actualizado"},
    46:{en: "Profile",es:"Perfil"},
    47:{en: "You want to permanently delete",es:"Desea eliminar permanentemente"},
    48:{en: "You want to send an email to",es:"Desea enviar un correo a"},
    49:{en: "does not have registered email",es:"no tiene correo registrado"},
    50:{en: "requesting vaccines for",es:"solicitando las vacunas de"},
    51:{en: "requesting the contract for",es:"solicitando el contrato de"},    
    52:{en: "options",es:"opciones"},
    53:{en: "expenses",es:"gastos"},
    54:{en: "income",es:"ingresos"},
    55:{en: "kind",es:"type"},    
    56:{en: "losses",es:"perdidas"},
    57:{en: "earnings",es:"ganancias"},
    58:{en: "orders",es:"ordenes"},
    59:{en: "printer",es:"impresora"},
    60:{en: "The Field",es:"El campo"},
    61:{en: "is not a number",es:"no es un numero"},
    62:{en: "is required",es:"es obligatorio"},
    63:{en: "is too short",es:"es muy corto"},
    64:{en: "is too long",es:"es muy largo"},
    65:{en: "it must be greater than",es:"debe ser mayor que"},
    66:{en: "it must be less than",es:"debe ser menor que"},
    67:{en: "Function",es:"Funciones"},
    68:{en: "it must be less than",es:"debe ser menor que"},

    91:{en: "Language",es:"Idioma"},
    92:{en: "Dark Theme",es:"Tema Oscuro"},
    93:{en: "On",es:"Endendido"},
    94:{en: "Off",es:"Apagado"},
    95:{en: "Choose your language",es:"Seleccione su idioma "},
    96:{en: "Dark theme turns the light surfaces of the page dark, creating an experience ideal for night.",es:"Este tema oscurece las zonas claras de la página, lo que brinda una experiencia ideal para la noche."},
    97:{en: "Your setting will apply to this browser only.",es:"Tu configuración se aplicará solo en este navegador."},
    98:{en: "Choose the functions you want to use.",es:"Seleccione las funciones que desea utilizar."},
    99:{en: "This option makes the title of the groups visible in the assistance.",es:"Esta opcion hace visible el titulo de los grupo en la asistencia."},
    100:{en: "This option defines the size sheet to print.",es:"Esta opcion define el tamaño de hoja a imprimir."},
    
    
    110:{en: "What days do you work?",es:"Qué días trabajas?"},

    

    192:{en: "Spanish",es:"Español"},
    193:{en: "English",es:"Ingles"},
 }


 export function translatetext(s){   
    var r = s;    
    var lng = window.localStorage.getItem('lng') || 'en';
    if(languageL_L[s]){
      r = languageL_L[s][lng];
    }  
    return r;
  }
//Resume_Year=2018;

 /*
  YearsList={},
  CustomersList={},
  cdate= `6/20/2018`,  
  year=2018,
  _dayShortNames = {"en":['S','M','T','W','T','F','S'],"es":['D','L','M','M','J','V','S']},
  _monthNames = {"en":['','January','February','March','April','May','June','July','August','September','October','November','December'],"es":['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']},
  _dayLargeNames = {"en":["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"],"es":["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes", "Sabado"]},
  */
  var month= 6,
  _dayPerMonth = [0,31,febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31],
  _counter = 1;
  //_MonthDataToRender = [];

  var montsDaysSum = 0;
 export function printYear(y){
    var _allYear2Render={};
    montsDaysSum = 0;
    [1,2,3,4,5,6,7,8,9,10,11,12].map(m=>{
      var mnt = printMonth(m,y);
      _allYear2Render[m]=mnt;
    })
    return _allYear2Render;
  }


  export function printMonth(m,year){
    const month_ =   m || month;
    const dateNow = new Date();
    const _day = dateNow.getDate();
    const _month = dateNow.getMonth();
    const _year = dateNow.getFullYear();    
    const _nextDateString = `${NextMonth(month_)}/01/${year}`; 
    const _nextDate = new Date(_nextDateString);
    const _numOfDays = _dayPerMonth[month_];
    _counter=1;
    var _week= 0;
    var _weekdays= _nextDate.getDay();
    var _weekdays2 = _weekdays;
    var _MonthDataToRender=[];
    _MonthDataToRender.push([]);    
    while (_weekdays>0){      
      _weekdays--;
      _MonthDataToRender[_week].push({d:null,cls:"monthPre"})
   } 
   while (_counter <= _numOfDays){   
      if (_weekdays2 > 6){
        _weekdays2 = 0;
        _week++;
        _MonthDataToRender.push([]);         
      } 
      var dayOfyear = _counter+montsDaysSum;
      if (_counter === _day && _month+1 === month_  && year === _year){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays dayNow",dy:dayOfyear})
      }

      else if(_weekdays2 ===0){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays isWeekEnd",dy:dayOfyear})
      } 
      else if(_weekdays2 ===6){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays isWeekEnd",dy:dayOfyear})
      } 
      else{    
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays",dy:dayOfyear})
      }   
      if(_counter===_numOfDays){        
        montsDaysSum += _numOfDays;       
      }   
      _weekdays2+=1;
      _counter+=1;  

   }  
   return _MonthDataToRender;
  }





  export function printYearWeekly(year){
    var month =   1;   
    var  _nextDateString = `${NextMonth(month)}/01/${year}`; 
    var _nextDate = new Date(_nextDateString);    
    var _numOfDays = _dayPerMonth[month];
    const _numOfYear = 337+  febMaxDays(year);    
        _counter=1;
        var _counterDay = 1;
        var _week= 0;
        var _weekdays= _nextDate.getDay();
        var _weekdays2 = _weekdays;
        var _MonthDataToRender={};        
        while (_counter <= _numOfYear){ 
                    
            if (_weekdays2 > 6){
                _weekdays2 = 0;
                _week++;
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
            }            
            if(_weekdays2 ===0){
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
                _MonthDataToRender[_week]['start'] = {}
                _MonthDataToRender[_week]['start']['day'] =_counterDay;
                _MonthDataToRender[_week]['start']['class'] ="monthDays isWeekEnd";
                _MonthDataToRender[_week]['start']['month'] = month;
            } 
            else if(_weekdays2 ===6){
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
                _MonthDataToRender[_week]['end'] = {}
                _MonthDataToRender[_week]['end']['day'] =_counterDay;
                _MonthDataToRender[_week]['end']['class'] ="monthDays isWeekEnd";
                _MonthDataToRender[_week]['end']['month'] = month;
            }                 
            
            _weekdays2+=1;
            _counter+=1;
            if(_counterDay>=_numOfDays){
                _counterDay =1;
                month += 1;  
                _numOfDays = _dayPerMonth[month];
            }else{
                _counterDay +=1; 
            } 
            
        }
   return _MonthDataToRender;
  }


  export function getDayofyear(d){
    var now = new Date();
    if(d){
        now = new Date(d);
    }
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }


  function SumDays(days) {
    var day0 = -2209143600000 || '12/30/1899';
    var result = new Date(day0);
    result.setDate(result.getDate() + days);
    return result;
  }



  export function hiddeEmail(d){
    var email = '';
      if(d && d.indexOf('@')>3){
        var h = d.split('@')[0];
        var domain = d.split('@')[1];
        var ast2Hdd = h.length;    
        email = h.substring(0, 3);
        for(var i = 1;i< ast2Hdd-3;i++){
            email += `•`;
        }
        email += h.substring(ast2Hdd-1, ast2Hdd);    
        email += '@'+domain;
      }
    
    return email;
  }


/*
  function week2print(){    
    var ct = new Date(this.state.datepicked);
    var week2print = {};
    var dOw = ct.getDay();        
    var InitWek = ct.getDate()-(dOw-0);
    var EndWek = ct.getDate()+(6-dOw);
    var mnt = ct.getMonth()+1;
    var yrs = ct.getFullYear();
    var Iyrs = yrs;
    var Imnt = mnt;
    var IdXm = InitWek;
    if(InitWek<1){
      Iyrs = yrs-1;
      Imnt = 12;
      IdXm = MaxDayperMotnh(Iyrs,Imnt) + (InitWek);
    }
    week2print['Iwk'] = `${Imnt}/${IdXm}/${Iyrs}`;
    var dXm = MaxDayperMotnh(yrs,mnt);
    if(EndWek>dXm){
      mnt = mnt+1;
      EndWek = EndWek-dXm;          
    }
    if(mnt>12){
      mnt = 1;
      yrs = yrs+1;
    }
    week2print['ewk'] = `${mnt}/${EndWek}/${yrs}`;  
}
*/
export function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}


export const generateUUID = () => {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };
  
   
  export function genId() {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 16;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }
  
  export function gen6CodeId() {
    var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 6;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }




  var animatinClass ='';
  var _root =null,_rootC = null, dark = false, scroll = 0,totalHeight=0;
  export function addScroll2(s) { 
     // document.addEventListener('scroll',scrollEvent);
  }
  
  
  export function scroll2(s) {   
      _rootC = !_rootC?document.getElementById('content_body'):_rootC;   
      animatinClass = `.52s`;
      setTimeout(()=>{
          _rootC.style.transform = `translate3d(0px,-${s}px,0)`;
          _rootC.style['transition-duration'] = animatinClass;   
          window.scrollTo(0,s);     
          setTimeout(()=>{
              animatinClass = `.12s`;
          },500)       
      },5)
  }
  
  
  export function UpdateTotalHeight(th) {
      _rootC = !_rootC?document.getElementById('content_body'):_rootC;
      if(th){
          totalHeight=th/2;
          _rootC.style['max-height'] = totalHeight+'px'; 
      }
  }
  
  
  export function scrollEvent(t) {   
      console.log('scrollEvent') 
      _rootC = !_rootC?document.getElementById('content_body'):_rootC;        
      totalHeight<=100 && calc_TotalHeight();    
      totalHeight = totalHeight!==t?totalHeight=t:totalHeight;    
      scroll  =  window.pageYOffset || document.documentElement.scrollTop;    
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      if(_rootC && totalHeight>scroll*2+windowHeight){
          _rootC.style['transition-duration'] = animatinClass;     
          _rootC.style.transform = `translate3d(0px,-${scroll}px,0)`;
      }
  }
  
  
  
  function calc_TotalHeight() {
      var sumH=0;
      var section_list = document.querySelectorAll('[section-index]');
      for(var i =0;i<section_list.length;i++){
          var hh = section_list[i];        
          sumH+=hh.getBoundingClientRect().height;                  
      }
      totalHeight=sumH/2;
      if(!_rootC){
          _rootC = document.getElementById('content_body');
      }else{
          _rootC.style['max-height'] = totalHeight+'px'; 
      }
  }
  
  
  export function bodyOverflow(b){
      var bdy  = document.getElementsByTagName('body')[0];
      if(b){      
        bdy.style.overflowY = `hidden`;
        bdy.style.width = `calc( 100% - 16px)`;
      }else{
        bdy.style.overflowY = `scroll`;
        bdy.style.width = `100%`; 
      }    
  }
  
    var keys = {33:1, 34:1, 35:1, 36:1,  38: 1, 40: 1};
  
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
     
  function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
  }
    
  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }
  
  
  export function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }
    
  export function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }
  
  
  //#ffa724

var themes = {
    light :{
        "--dropDown--background--color":"#f9f9f9",
        "--footer--text-color--":" #c4c4c4 ",
        "--background--color--cards":"#fafafa",
        "--slide__card--p-color--":"#6e6e6e",
        "--slide__card--title-color--":"#5e5e5e",
        "--tip__card--p-color--":"#777",
        "--color-logo_":"#333",
        "--color-base--hover":"#4285f4",
        "--color-tab--base--hover":"#039be5",
        "--background--color":"#f5f5f5",        
        "--background--header--color":" #f5f5f5",
        "--svg--header--color":" #f5f5f5",        
        "--colorText_":" #263238",
        "--icon--color_":" #b0bec5",
        "--tip__card--backgropund-Color--":"#fff",
        "--screen--width--px--":window.outerWidth+'px',
        "--screen--width--":window.outerWidth,
        "--calendar--back--color--":"#e8f0fe",
        "--tab--nav-Color--":"#5f6368",    
        "--tab--nav-icon-color--":"#c7c7c7",
        "--fill--theme--color":"#666",
        "--app-body-content-wapper--":'100%',    
        "--app-body-content-wapper--left--":'0',   
            

    },dark:{
        "--dropDown--background--color":" #263238",
        "--footer--text-color--":"#3a3a3a ",
        "--screen--width--px--":window.outerWidth+'px',
        "--background--color--cards":" #263238",
        "--slide__card--p-color--":"#aaaaaa",
        "--slide__card--title-color--":"#e5e5e5",
        "--tip__card--p-color--":"#aaaaaa",
        "--color-logo_":"#fff",
        "--color-base--hover":"##ff7817",
        "--color-tab--base--hover":"#039be5",
        "--background--color":" #263238",
        "--background--header--color":" #263238",
        "--colorText_":" #e5e5e5",
        "--icon--color_":" #b0bec5",
        "--tip__card--backgropund-Color--":"#444",
        "--tab--nav-Color--":"#aaaaaa",
        "--tab--nav-icon-color--":"#aaaaaa",
        "--svg--header--color":" #f5f5f5",  
        "--fill--theme--color":"#f5f5f5",
        "--app-body-content-wapper--":window.outerWidth+'px',  
    }
}



  
  export function changetheme(s){
      if(!_root){
          _root = document.getElementById('root');
      }    
      if(s){
          _root.style = convertJson2Style(themes.light);       
        }
      else{
          dark = !dark;
          dark?_root.style = convertJson2Style(themes.dark):_root.style = convertJson2Style(themes.light);          
      }          
  }

  export function changethemeKey(th,k,v){
    themes[th][k] = v;
    dark?_root.style = convertJson2Style(themes.dark):_root.style = convertJson2Style(themes.light);
  }

  
    const convertJson2Style =(j) =>{
        var sty = '';
        Object.keys(j).map(k=>{
            sty += `${k}:${j[k]};`; 
        })
        return sty;
    }

  
  
  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }
  
  

    
    export const parseQuery =(url) =>{
      var urlParams = new URLSearchParams(url);
      var  obj = {};
      var entries = urlParams.entries();
      for(var pair of entries) { 
          obj[pair[0]]= pair[1]; 
      }    
      return obj
    } 
  
  
 

    
  export const getClientError = errors => {
      if (!errors) {
        return;
      }
      const error = errors[0].message;
      if (!error || error.indexOf('{"_error"') === -1) {
        return {_error: 'Server query error'};
      }
      return JSON.parse(error);
  };
  
  export const prepareGraphQLParams = graphParams => {    
      graphParams.query = graphParams.query.replace(/\s/g, '');
      return JSON.stringify(graphParams);
      
  };
  
  
  export const prepareBodyParams = q => {
      return JSON.stringify(q);
  };
  
  
  
  
  
  
  
  export const  fetchGraphQL = async (url,graphParams) => {
      const serializedParams = prepareGraphQLParams(graphParams);     
      var fp = window.localStorage.getItem('fpXb');
      var tempK = genId();
  
      // console.log(graphParams) 
      
      var encRypt = CryptoJS.AES.encrypt(serializedParams, tempK).toString()
      var encRyptK = CryptoJS.AES.encrypt(tempK, fp).toString()
  
      var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
     

      var authToken = getAuth();
      var fbtkClnt = window.localStorage.getItem('fbtkClnt');
      const graphQLUrl = `${url}/streamdata`;
      const res = await fetch(graphQLUrl, {
        method: 'post',
        headers: {
          //'Content-Type': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `${authToken}:${fp}`,
          'x-fb-tk': `${fbtkClnt}`,        
        },
        body: bsParams
      });
      const resJSON = await res.text();    
      var _Data = {};
      var basD = Base64.decode(resJSON);  
      if(isJson(basD)){        
          var basdJson = JSON.parse(basD)
          if(basdJson.status===200){            
              var kb = CryptoJS.AES.decrypt(basdJson.k, fp).toString(CryptoJS.enc.Utf8);
              var decdData = CryptoJS.AES.decrypt(basdJson.r, kb).toString(CryptoJS.enc.Utf8);
              if(isJson(decdData)){
                  _Data = JSON.parse(decdData);
              }
          }if(basdJson.status===500){
              
          }
      }     
      const {data, errors} = _Data;
      //console.log(data)
      return {data, error: getClientError(errors)};
  };
  
  
  export const fetchPostUrlC = async (url,graphParams) => {
      const serializedParams = prepareBodyParams(graphParams);
      var fp = window.localStorage.getItem('fpXb');     
      var encRypt = CryptoJS.AES.encrypt(serializedParams, fp).toString()
      var bsParams = JSON.stringify({q:Base64.encode(encRypt)});   
      var authToken = getAuth();
      const graphQLUrl = `${url}/apivh2`;
      const res = await fetch(graphQLUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}:${fp}`,
        },
        body: bsParams
      });
      const resJSON = await res.text();    
      var _Data = {};
      var bytes = CryptoJS.AES.decrypt(Base64.decode(resJSON), fp);
      var basD = bytes.toString(CryptoJS.enc.Utf8);
      if(basD && isJson(basD)){
          _Data = JSON.parse(basD);
      }     
      const {data, errors} = _Data;
      return {data, error: getClientError(errors)};
  };
  
  

    export const fetchGetUrl = async v => {
        var authToken = getAuth();
      var fp = window.localStorage.getItem('fpXb'); 
      const res = await fetch(v, {
        method: 'get',     
        headers: {
          //'Content-Type': 'text/plain',
          'mode': 'no-cors',
          'Content-Type': 'application/json',
          'Authorization': `${authToken}:${fp}`,
        },     
      });
      const resJSON = await res.json();    
      return resJSON;
    };
    
  
    export const fetchPostUrl = async v => {
        var authToken = getAuth();
        var fp = window.localStorage.getItem('fpXb'); 
        const res = await fetch(v, {
            method: 'post',
            headers: {
            //'Content-Type': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': `${authToken}:${fp}`,
            },
            body:``     
        });
      const resJSON = await res.json();    
      return resJSON;
    };
    
  

  
    export function parseCokies(v){
        var objCokies = {};
        v.split(';').map(ck=>{
            objCokies[ck.split('=')[0]]=ck.split('=')[1];
        }) 
        return objCokies
    }
  
    
    export function getAuth(){
        var h = new RegExp('@','g') 
        var authToken = window.localStorage.getItem('jwt_hrm_fincance')?window.localStorage.getItem('jwt_hrm_fincance').replace(h,'='):'';
        //var _parseCokies = parseCokies(document.cookie);
        //if(_parseCokies && _parseCokies['jwt_hrm_fincance']){authToken =_parseCokies['jwt_hrm_fincance'].replace(h,'=');}
        return authToken
    }
  

  
  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }
  
  Date.prototype.getWeek = function() {
      var date = new Date(this.getTime());
       date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    
  
    Date.prototype.getWeekYear = function() {
      var date = new Date(this.getTime());
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      return date.getFullYear();
    }
  
  
  

  export function ssnValidate(v){
      return /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(v)
  }
  
  export function phoneValidate(v){
      return /^[\dX]{3}-?[\dX]{3}-?[\dX]{4}$/.test(v)
  }
  
  export function dobValidate(v){
      return /^(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(v)
  }
  
  export function isNumber(v){
      return /\[0-9]/.test(v)
  }
  
  
  
  
  
  
export  var validations = function(validate,data){
    var rs = {valid:true,msg:''};
    if(!data){
        rs =  {valid:false,msg:'missing data'};
    }
    ObjectKeys(validate).map(fld=>{
        if(fld && data){          
            if(data[fld]===undefined){ rs = {valid:false,msg:`not field data`}; }
            else if(data[fld]===null){ rs = {valid:false,msg:`not field data`}; }
            else{
                var _value =data[fld].toString();
                //console.log(_value);
                ObjectKeys(validate[fld]).map(vld=>{
                    if(vld==='minLength'){
                    if(_value.toString().length<validate[fld][vld]){
                        rs = {valid:false,msg:'value lenght is not enough'};
                    }        
                    }
                    if(vld==='number' && validate[fld][vld]){
                    let _v = !isNaN(_value)?true:false;  
                    rs = {valid:_v,msg:'number invalid'};      
                    }
                    if(vld==='minValue'){
                        if(_value<validate[fld][vld]){
                            rs = {valid:false,msg:'value is less than the required'};
                        }        
                    }
                    if(vld==='maxValue'){
                        if(_value>validate[fld][vld]){
                            rs = {valid:false,msg:'value is grather than the required'};
                        }        
                    }
                    if(vld==='date' && validate[fld][vld]){
                        let _v = !isNaN(_value)?(new Date(parseInt(_value.toString()))).getTime()?true:false:false;    
                        rs = {valid:_v,msg:'date invalid'};     
                    }
                    if(vld==='phone' && validate[fld][vld]){
                        let _v = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(_value)   
                        rs = {valid:_v,msg:'phone invalid'};     
                    } 
                    if(vld==='ssn' && validate[fld][vld]){
                        let _v = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(_value)   
                        rs = {valid:_v,msg:'ssn invalid'};     
                    }
                    if(vld==='email' && validate[fld][vld]){
                        let _v = emailValidate(_value)   
                        rs = {valid:_v,msg:'email invalid'};     
                    } 
                    if(vld==='required' && !_value){            
                        rs = {valid:false,msg:`value required ${fld}`};     
                    } 
                })             
            }
        }
    })
    return rs;
  }


  export function getWeek(t) {
    let _dayMiliseconds = 86400000;
    var date = new Date(t);
    date.setHours(0, 0, 0, 0);
    var week1 = new Date(date.getFullYear(), 0, 4);
    var day1 = new Date(date.getFullYear(), 0, 1);    
    var roundWeek = 6-week1.getDay();
    var dayDifferences = Math.round((date.getTime() - day1.getTime()) / _dayMiliseconds);
    let weekOfYear = 1 + Math.round((dayDifferences - roundWeek) / 7)
    
    return weekOfYear;
  }


  export function getWeekDate(wk) {    
    var week1 = new Date((new Date()).getFullYear(), 0, 4);
    week1.setDate(week1.getDate() + (wk-1)*7 - week1.getDay());
    return week1;
  }






  export function date2pretyfy(dt) {
    var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();   
    return `${monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`;  
  }


  export function dateWday2pretyfy(dt) {
    var y = new Date(dt);
    var date = dt?isNaN(y.getTime())?new Date():y:y;
    return `${_dayLargeNames['es'][date.getDay()].slice(0,3)}, ${date.getDate()} ${monthsList_Short[date.getMonth()+1]}`;  
  }
  
  export function weekdate2pretyfy(dt) {
    var date = !isNaN(dt)?new Date(parseInt(dt.toString())):new Date(); 
    var ws = new Date(date.setDate(date.getDate() + (0-date.getDay())));
    var we = new Date(date.setDate(date.getDate() + (6-date.getDay())));   
    return `${monthsList_Short[ws.getMonth()+1]} ${ws.getDate()} - ${monthsList_Short[we.getMonth()+1]} ${we.getDate()}`;  
  }


  export async function getAddress(q){
      q = q.split('%20').map((e)=>{return e.capitalize()}).join('%20');
      var api = `https://www.google.com/s?tbm=map&gs_ri=maps&suggest=p&authuser=0&hl=es&gl=us&pb=!2i4!4m9!1m3!1d14928.327758595553!2d-85.77029233022462!3d38.10847554999999!2m0!3m2!1i1059!2i913!4f13.1!7i20!10b1!12m6!2m3!5m1!6e2!20e3!10b1!16b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i200!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m3!1sl6hwXOW6E8uSjwSvgLeYBQ!3b1!7e81!23m2!4b1!10b1!24m26!2b1!5m5!2b1!3b1!5b1!6b1!7b1!10m1!8e3!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!30m1!2b1!36b1!43b1!52b1!55b1!56m1!1b1!26m4!2m3!1i80!2i92!4i8!34m1!3b1!37m1!1e81!47m0!49m1!3b1&pf=t&tch=1&q=${q}`     
      const res = await fetch(api, {
          method: 'get',
          headers: {
          }     
        });
        const resJSON = await res.text();
        return parseAddress(resJSON);          
  }
  
  function parseAddress(body){
      var a = { }
      body = body.replace(/\\/g, '')            
      var _null = new RegExp('null','g');            
      body = body.replace(_null, "");        
      body.split('","e":"')[0].split(']n,,,,[,,').map(s=>{
          s = s.replace(/\//g, "")                                
          var xtr = s;
          var dd = xtr && xtr.indexOf('","') >= 0 ? xtr.split('","')[1] && xtr.split('","')[1].split('",,[,,')[0] : xtr && xtr.indexOf(']n,,,["') >= 0?xtr.split(']n,,,["')[1].split('"]n,,,,,,')[0]:'';
          var position = xtr && xtr.indexOf(']n,,[["') >= 0 ? xtr.split(']n,,[["')[0]: xtr && xtr.indexOf(']n,,,["') >= 0 ? xtr.split(']n,,,["')[0]:'';   
          var addr = dd && dd.split(',');
          var address = addr && addr[0];
          var city = addr && addr[1];
          var state = addr && addr[2];                        
          if(state && !a[dd]){
              var tt = {address:address,city:city,state:state,position:position}                    
              a[dd] = tt;
          }                
      })
      return a; 
  }
  
  
  

  export function radixSortLSD(_input_array, getKey) {
    var numberOfBins = 256;
    var Log2ofPowerOfTwoRadix = 8;
    var _output_array = new Array(_input_array.length);
    var count = new Array(numberOfBins);
    var _output_array_has_result = false;

    var bitMask = 255;
    var shiftRightAmount = 0;

    var startOfBin = new Array( numberOfBins );
    var endOfBin   = new Array( numberOfBins );
    
    while( bitMask != 0 )    // end processing digits when all the mask bits have been processed and shifted out, leaving no bits set in the bitMask
    {
        for (var i = 0; i < numberOfBins; i++ )
            count[ i ] = 0;
        for (var _current = 0; _current < _input_array.length; _current++ )    // Scan the array and count the number of times each digit value appears - i.e. size of each bin
            count[ extractDigit( getKey(_input_array[ _current ]), bitMask, shiftRightAmount ) ]++;

        startOfBin[ 0 ] = endOfBin[ 0 ] = 0;
        for( var i = 1; i < numberOfBins; i++ )
            startOfBin[ i ] = endOfBin[ i ] = startOfBin[ i - 1 ] + count[ i - 1 ];
		
        for ( var _current = 0; _current < _input_array.length; _current++ )
            _output_array[ endOfBin[ extractDigit( getKey(_input_array[ _current ]), bitMask, shiftRightAmount ) ]++ ] = _input_array[ _current ];
        
        bitMask <<= Log2ofPowerOfTwoRadix;
        shiftRightAmount += Log2ofPowerOfTwoRadix;
        _output_array_has_result = !_output_array_has_result;
        
        var tmp = _input_array, _input_array = _output_array, _output_array = tmp;    // swap input and output arrays
    }
    if ( _output_array_has_result )
        for ( var _current = 0; _current < _input_array.length; _current++ )    // copy from output array into the input array
            _input_array[ _current ] = _output_array[ _current ];
    
    return _input_array;
}

var extractDigit = function( a, bitMask, shiftRightAmount ) {
    var digit = (a & bitMask) >>> shiftRightAmount;	// extract the digit we are sorting based on
    return digit;
}




export function date2pretyfy2(dt) {  
    var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();   
    date.setHours(date.getHours());
    return `${monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`;  
}
  
export function time2pretyfy2(dt,ss) {
    var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();
    date.setHours(date.getHours());
    var MM = date.getMinutes();
    var sec = date.getSeconds();
    var SS = ss?`:${sec>9?sec:`0${sec}`}`:'';
    return `${date.getHours()}:${MM>9?MM:`0${MM}`}${SS}`;
 }



export function emailValidate(v){
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
}
