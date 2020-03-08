import * as types from '../constants/ActionTypes';
import { GRAPHQLURL } from '../constants/Api';
import * as _Util from './Util';



const currentYear = (new Date()).getFullYear();




export var _Dispatch = null;
export var _State = null;
export var _historyHash = null;




/***********************************************************************************     COMMON   ***************************************************************************************************/
  




/*

  
  var swRegistration = null;
  var isSubscribed = null;      
  let deferredPrompt;
  var btnAdd = null


    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(swReg) {
        swRegistration = swReg;
        
        initialiseUI();
        //displayNotification();
        if (Notification.permission === "granted") {
          
        } else if (Notification.permission === "blocked") {
        
          
        } else {
          Notification.requestPermission(function(status) {
            console.log('Notification permission status:', status);
          });
        }

    })
  }

  
      
    function initialiseUI() {
      window.addEventListener("beforeinstallprompt", function(e) { 
        // log the platforms provided as options in an install prompt 
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        deferredPrompt.prompt();
        document.querySelector('data-add-home-screen')
        btnAdd = document.querySelector('[data-add-home-screen=true]');        
        btnAdd && btnAdd.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          //btnAdd.style.display = 'none';
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice
            .then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
              } else {
                console.log('User dismissed the A2HS prompt');
              }
              deferredPrompt = null;
            });
        });
        e.userChoice.then(function(outcome) { 
          console.log(outcome); // either "accepted" or "dismissed"
        }, console.log(''));         
      });

    }


*/




function initLocalStorage(f){
  if(!window.localStorage.getItem('provider')){        
    window.localStorage.setItem('provider',f.name)
    
  }
  if(!window.localStorage.getItem('email')){  
    window.localStorage.setItem('email',f.email)
  }
  if(!window.localStorage.getItem('lng')){  
    window.localStorage.setItem('lng','es')
  }
  if(!window.localStorage.getItem('title-pdf-attendance')){  
    window.localStorage.setItem('title-pdf-attendance',false);
  }
  if(!window.localStorage.getItem('size-pdf-attendance')){  
    window.localStorage.setItem('size-pdf-attendance','a4');
  }
}






export  function getUserProfile() {
  return async function (dispatch, getState) {

    if(!_Dispatch){
      _Dispatch = dispatch;
    }
    if(!_State){
      _State = getState;
    }
    let webP = await _Util.SupportWebp();
    loadLazyImage()
    dispatch(UpdKeyValue({key:'webP',value:webP})); 
    var doc = {id:'dgt047j3',limit:1000,page:1,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindbyIdUser!){
      payload:  getUsersbyId(user: $doc) {
        id, 
        name,
        email, 
        phone,
        roles,
        Finansas,
        Daycare,
        Almacen,
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var f = res.data?res.data.payload:null; 
      if(f){
        var routeList = {
          "finances":f.Finansas?true:false,
          "daycare":f.Daycare?true:false,
          "resume":f.Finansas?true:false, 
          "settings":true,
          "logout":true,
        }
        dispatch(UpdKeyValue({key:'routeList',value:routeList})); 
        initLocalStorage(f);      
        delete f[`roles`];
        delete f[`id`];
        dispatch(getCategories());
        dispatch(retrieveUserSuccess(f));  
        dispatch(UpdKeyValue({key:'authenticate',value:true})); 
        dispatch(appLoaded(true));

      }else{
        //dispatch(retrieveUserSuccess(null));
        dispatch(UpdKeyValue({key:'authenticate',value:false}));
        dispatch(appLoaded(true));
      }
    })
    .catch(error => {
      dispatch(appLoaded(true));
      dispatch(UpdKeyValue({key:'authenticate',value:false}));
      dispatch(retrieveUserSuccess(null));  
      console.log(error); //eslint-disable-line
    });
  };
}

export function UpdProfile(doc){ 
  return function (dispatch, getState) {  
  const query= `
  mutation($doc: UpdateUser!){
    payload:  updateUser(user: $doc) {
      id, 
      name,
      email, 
      phone,
      roles,
      Finansas,
      Daycare,
      Almacen,
    }
  }  
  `;
  let variables={doc};       
  _Util.fetchGraphQL(GRAPHQLURL,{query,variables})     
    .then(res=>{      
      var f = res.data.payload;
      if(f){
        var RlDec =_Util.Base64.decode(f[`roles`])
        if(_Util.isJson(RlDec)){
          var tjson = JSON.parse(RlDec);
          tjson[`setting`] = {
            "/resume":true,    
            "/settings":true,
            "/logout":true,
          }
          dispatch(retrieveRouteSuccess(tjson));
        }
        if(!window.localStorage.getItem('provider')){        
          window.localStorage.setItem('provider',f.name)
          
        }
        if(!window.localStorage.getItem('email')){  
          window.localStorage.setItem('email',f.email)
        }
        dispatch(retrieveUserSuccess(f));      
        delete f[`roles`];
        delete f[`id`];
      }else{dispatch(retrieveUserSuccess(null)); }
    }).catch(e=>{ });
  }
}
  

export function updateWidthScreen(v){
  return function (dispatch, getState) {  
    dispatch(UpdIsMobile(v))
  }
}



export function retrieveUserSuccess(res) {
  return {
    type: types.USERPROFILE_SUCCESS,
    user : res
  };
}

export function retrieveRouteSuccess(res) {
  return {
    type: types.ROUTES_SUCCESS,
    _routes : res
  };
}


/*
export function reduceKEYbyVALUE(res) {
  return {
    type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
    param: res
  };
}
*/

export function UpdIsMobile(res) {
  return {
    type: types.ISMOBILE_SUCCESS,
    isMobile : res
  };
}

export function updTabColor(c) {
  return {
    type: types.TAB_COLOR_SUCCESS,
    tab_color : c
  };
}

export function appLoaded(res) {
  return {
    type: types.APPLOADED_SUCCESS,
    appLoaded: res
  };
}
 


export function UpdateCalendarParams(fld,v){
  return function (dispatch, getState) {   
    const state = getState().common;
    var _forms = state.calendar;
    if(!_forms[fld]){
      _forms[fld] = {}
    }
    _forms[fld] =v;
    dispatch(CalendarFormSuccess(_forms)); 
    const tt = state.calendarObserve+1;
    dispatch(CalendarOberves(tt));
  }
}

export function CalendarFormSuccess(res) {
  return {
    type: types.CALENDAR_FORMS_SUCCESS,
    calendar : res
  };
}

export function CalendarOberves(res) {
  return {
    type: types.CALENDAR_OBSERVES,
    calendarObserve : res
  };
}

export function UpdKeyValue(res) {
  return {
    type: types.UPD_KEY_VALUE,
    kv : res
  };
}
/*
function getImg() {
[`unbridledSpirit.png`].map(im=>{
  var url = 'http://hectoricardom.net/getStatic/';
  var ext = im.split('.').pop().toLocaleLowerCase();
  var type  = _Util.extList[ext]
  Image2Caching(url,im,type);
})
}

    
function Image2Caching(url,param,type) {
    var _ImagesList ={};
    if(!_ImagesList[param]){
      _ImagesList[param] = {} 
      _ImagesList[param].pth = null;  
      var _parm = param;      
       var xhr = new XMLHttpRequest();
          xhr.open( "GET", url  + _parm, true );
          xhr.responseType = "arraybuffer";
          xhr.onload = function( e ) {
            if (xhr.status === 200) {
              var arrayBufferView = new Uint8Array( this.response );              
              if(arrayBufferView.length>200){
                var base64String = btoa(
                  new Uint8Array(arrayBufferView)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                var blob = new Blob( [ arrayBufferView ], { type: type || "image/jpeg" } );
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob); 
                console.log(base64String)             
                _ImagesList[param].buffer = base64String;
                _ImagesList[param].pth = imageUrl;
                _ImagesList[param].type = type || "image/jpeg";
                console.log(_ImagesList) 
              }
            }             
          };  
        xhr.send();          
    }  
  }
*/


  export function languageUpd(res) {
    return {
      type: types.LANGUAGE_OBSERVES,
      lng : res
    };
  }


  
function add(coll,payload,state,dispatch,action,reCalc){
  var startStime = (new Date()).getTime(); 
  var obj = state[coll]
  obj[payload.id] = payload;
  var oldL = _Util.convertObj2Array(obj);
  dispatch(action(obj));
  if(reCalc){
    reCalc(coll,oldL,state,dispatch);
  }
  else{    
    dispatch(retrieveFilterOberves());
  }
  dispatch(gettingObserve());

  //console.log('add duration ',(new Date()).getTime()-startStime);
}


function update(coll,payload,state,dispatch,action,reCalc){
  var obj = state[coll]
  obj[payload.id] = payload;
  var oldL = _Util.convertObj2Array(obj);  
  dispatch(action(obj));
  if(reCalc){
    reCalc(coll,oldL,state,dispatch);
  }
  else{
    dispatch(retrieveFilterOberves());
  }
  dispatch(gettingObserve());
}

function remove(coll,payload,state,dispatch,action,reCalc){
  var obj = state[coll];  
  delete obj[payload];
  var startStime = (new Date()).getTime(); 
  var oldL = _Util.convertObj2Array(obj);
  dispatch(action(obj));
  if(reCalc){
    reCalc(coll,oldL,state,dispatch);
  }
  else{    
    dispatch(retrieveFilterOberves());
  }
  dispatch(gettingObserve());
  //console.log('remove duration ',(new Date()).getTime()-startStime);
}




function gettingObserve(){
  return function (dispatch, getState) {
    const state = getState().common; 
    var next = state.gettingObserve+1;
    dispatch(UpdKeyValue({key:'gettingObserve',value:next}));
  }
}






/***************************************** GASTOS CRUD OPERATIONS  *****************************************************************/







export function getGastos(y) {
  return function (dispatch, getState) {   
     var startStime = (new Date()).getTime();
    const state = getState().common;   
    var _y = y || currentYear;
    var doc = {limit:1000,page:_y ,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindGasto!){
      payload:  getGastosAll(gasto: $doc) {
        id, 
        title,        
        date,
        group,
        import, 
        owners 
      }
    }  
    `;
    let variables={doc};    

    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {  
      var payL = res.data.payload;      
      calcFilters('gastos',res.data.payload,state,dispatch);
      dispatch(retrieveGastosSuccess(_Util.convertArray2Obj(payL)));
      dispatch(gettingObserve());      
      //console.log('getGastos ',(new Date()).getTime()-startStime);
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}





export function getGastosById(id,formName) {
  return function (dispatch, getState) {    
    const state = getState().common;
    var doc = {id:id};
    const query= ` 
    query($doc: FindbyIdGasto!){
      payload:  getGastosbyId(gasto: $doc) {
        id, 
        title,   
        description,
        date,
        group, 
        image,
        import, 
        owners 
      }
    }
    `;
    let variables={doc};    

    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {  
      var payL = res.data.payload;     
      payL.image && getThumbnail(`/getReceipt?imgId=${payL.image}&webp=${state.webP}`)
      dispatch(UpdKeyValue({key:'detailByID',value:payL}));      
      dispatch(UpdateFormbyName(formName,payL));
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}


export function AddGastos(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 

    const query= `
    mutation($doc: NewGasto!){
      payload:  addGasto(gasto: $doc) {
        id, 
        title,
        date,
        group,
        import,
        owners
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      add('gastos',b,state,dispatch,retrieveGastosSuccess,calcFilters)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function UpdGastos(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateGasto!){
      payload:  updateGasto(gasto: $doc) {
        id, 
        title,       
        date,
        group, 
        import,
        owners
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data?res.data.payload:null;
      b && update('gastos',b,state,dispatch,retrieveGastosSuccess,calcFilters);
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}




export function RmvGastos(doc){  

  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateGasto!){
      payload:  removeGasto(gasto: $doc)
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload;
      if(b){
        remove('gastos',doc.id,state,dispatch,retrieveGastosSuccess,calcFilters);
      }      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}







export function retrieveGastosSuccess(res) {  
  return {
    type: types.GASTOS_SUCCESS,
    gastos : res
  };
}








/***************************************** INGRESOS CRUD OPERATIONS  *****************************************************************/





export function getIngresos(y) {
  return function (dispatch, getState) {
    const state = getState().common;  
    var _y = y || currentYear;
    var doc = {limit:1000,page:_y ,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindIngreso!){
      payload:  getIngresosAll(ingreso: $doc) {
        id, 
        title,  
        date,
        group,
        import,
      }
    } 
    `;
    let variables={doc};    
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var payL = res.data.payload
      calcFilters('ingresos',res.data.payload,state,dispatch);
      dispatch(retrieveIngresosSuccess(_Util.convertArray2Obj(payL)));
      dispatch(gettingObserve());
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}






export function getIngresosById(id,formName) {
  return function (dispatch, getState) {    
    const state = getState().common;
    var doc = {id:id};
    const query= ` 
    query($doc: FindbyIdIngreso!){
      payload:  getIngresosbyId(ingreso: $doc) {
        id, 
        title,   
        description,
        date,
        group, 
        image,
        import, 
        owners 
      }
    }  
    `;
    let variables={doc};    

    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {  
      var payL = res.data.payload;     
      payL.image && getThumbnail(`/getReceipt?imgId=${payL.image}&webp=${state.webP}`)
      dispatch(UpdKeyValue({key:'detailByID',value:payL}));
      dispatch(UpdateFormbyName(formName,payL));
      /*
      calcFilters('gastos',res.data.payload,state,dispatch);
      dispatch(retrieveGastosSuccess(_Util.convertArray2Obj(payL)));
      dispatch(gettingObserve());      
      //console.log('getGastos ',(new Date()).getTime()-startStime);
      */
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function AddIngresos(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: NewIngreso!){
      payload:  addIngreso(ingreso: $doc) {
        id, 
        title,
        date,
        group,
        import,
        owners
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      add('ingresos',b,state,dispatch,retrieveIngresosSuccess,calcFilters)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function UpdIngresos(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateIngreso!){
      payload:  updateIngreso(ingreso: $doc) {
        id, 
        title,
        date,
        group,
        import,
        owners
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      update('ingresos',b,state,dispatch,retrieveIngresosSuccess,calcFilters)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}




export function RmvIngresos(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
      mutation($doc: UpdateIngreso!){
        payload:  removeIngreso(ingreso: $doc)
      }  
      `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      if(b){
        remove('ingresos',doc.id,state,dispatch,retrieveGastosSuccess,calcFilters);
      }
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}





export function retrieveIngresosSuccess(res) {
  return {
    type: types.INGRESOS_SUCCESS,
    ingresos: res
  };
}






/***************************************** KIDS CRUD OPERATIONS  *****************************************************************/




export function getKids() {
  return function (dispatch, getState) {    
    const state = getState().common;    
    var doc = {limit:1000,page:1,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindKid!){
      payload:  getKidsAll(kid: $doc) {
        id, 
        name,
        dob, 
        address, 
        parentName,
        cellphone,
        email,
        vaccinations,
        contract3C
      }
    }  
    `;
    let variables={doc};    
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
     
      var payL = _Util.convertArray2Obj(res.data.payload);      
      //calcFiltersAttendance('kids',payL,state,dispatch);
      
      dispatch(retrieveKidsSuccess(payL));
      dispatch(getAttendances());
      dispatch(gettingObserve());
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}


export function AddKids(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 

    const query= `
    mutation($doc: NewKid!){
      payload:  addKid(kid: $doc) {
        id, 
        name,
        dob, 
        address, 
        parentName,
        cellphone,
        email,
        vaccinations,
        contract3C
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
     
      var b = res.data.payload
      add('kids',b,state,dispatch,retrieveKidsSuccess,null)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function UpdKids(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateKid!){
      payload:  updateKid(kid: $doc) {
        id, 
        name,
        dob, 
        address, 
        parentName,
        cellphone,
        email,
        vaccinations,
        contract3C
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      update('kids',b,state,dispatch,retrieveKidsSuccess,null)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}




export function RmvKids(doc){  

  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateKid!){
      payload:  removeKid(kid: $doc)
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload;
      if(b){
        remove('kids',doc.id,state,dispatch,retrieveKidsSuccess,null);
      }      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}







export function retrieveKidsSuccess(res) {  
  return {
    type: types.KIDS_SUCCESS,
    kids : res
  };
}









/***************************************** ATTENDANCE CRUD OPERATIONS  *****************************************************************/










export function getAttendances() {
  return function (dispatch, getState) {    
    const state = getState().common;    
    var doc = {limit:1000,page:1,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindAttendance!){
      payload:  getAttendancesAll(attendance: $doc) {
        id, 
        kid,
        group
      }
    }  
    `;
    let variables={doc};    
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var payL = res.data.payload;
      /*
      xdEodWWB3bY43tYT
      var _Kidstate = state.kids;      
      payL.map(d=>{
        //var kidExist = _Kidstate?_Kidstate[d.kid]?_Kidstate[d.kid]['name']:false:false;if(!kidExist){///dispatch(RmvAttendance({id:d.id}));}
        //if(!d.kid || !d.group){dispatch(RmvAttendance({id:d.id}));}
      }) 
      */  
      var payObj = _Util.convertArray2Obj(res.data.payload);    
      calcFiltersAttendance('attendances',payL,state,dispatch);
      dispatch(retrieveAttendancesSuccess(payObj));
      dispatch(gettingObserve());
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}


export function AddAttendance(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 

    const query= `
    mutation($doc: NewAttendance!){
      payload:  addAttendance(attendance: $doc) {
        id, 
        kid,
        group
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      add('attendances',b,state,dispatch,retrieveAttendancesSuccess,calcFiltersAttendance)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function UpdAttendance(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateAttendance!){
      payload:  updateAttendance(attendance: $doc) {
        id, 
        kid,
        group
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      update('attendances',b,state,dispatch,retrieveAttendancesSuccess,calcFiltersAttendance)
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}




export function RmvAttendance(doc){  

  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: UpdateAttendance!){
      payload:  removeAttendance(attendance: $doc)
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload;
      if(b){
        remove('attendances',doc.id,state,dispatch,retrieveAttendancesSuccess,calcFiltersAttendance);
      }      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}







export function retrieveAttendancesSuccess(res) {  
  return {
    type: types.ATTENDANCES_SUCCESS,
    attendances : res
  };
}





/***************************************** CATEGORIES CRUD OPERATIONS  *****************************************************************/






export function getCategories() {
  return function (dispatch, getState) {
      const store = getState().common; 
    var doc = {limit:1000,page:1,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindGroup!){
      payload:  getGroupsAll(group: $doc) {
        id, 
        name,
        type, 
        owners
      }
    } 
    `;
    let variables={doc};    
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var groupsObj  = null;
      if(res.data.payload){
        res.data.payload.map((b,inDx) => {
          if(!groupsObj){
            groupsObj = {};
          }
          groupsObj[b.id]=b;        
        })
        dispatch(retrieveCategoriesSuccess(groupsObj));
        calcFiltersGroup('groups',store,dispatch,groupsObj);
        dispatch(gettingObserve());        
      }      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}


export function AddCategory(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
    mutation($doc: NewGroup!){
      payload:  addGroup(group: $doc) {
        id, 
        name,
        type, 
        owners
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload
      var obj = state['categories']
      obj[b.id] = b;      
      dispatch(retrieveCategoriesSuccess(obj));
      calcFiltersGroup('groups',state,dispatch,obj)  
      //checkYears(b,coll);      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}



export function UpdCategory(doc){  
  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
      mutation($doc: UpdateGroup!){
        payload:  updateGroup(group: $doc) {
          id, 
          name,
          type, 
          owners
        }
      }
      `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {      
      var b = res.data.payload;
      var obj = state['categories'];
      obj[b.id] = b;
      dispatch(retrieveCategoriesSuccess(obj));
      calcFiltersGroup('groups',state,dispatch,obj)      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}

export function RmvCategory(doc){  

  return function (dispatch, getState) {    
    const state = getState().common; 
    const query= `
      mutation($doc: UpdateGroup!){
        payload:  removeGroup(group: $doc)
      }  
      `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      var b = res.data.payload;
      if(b){        
        var obj = state['categories'];

        delete obj[doc.id];      
        dispatch(retrieveCategoriesSuccess(obj));
        calcFiltersGroup('groups',state,dispatch,obj);        
      }      
    })
    .catch(error => {
      console.log(error); //eslint-disable-line
    });
  };
}









export function retrieveCategoriesSuccess(res) {
  return {
    type: types.CATEGORIES_SUCCESS,
    categories: res
  };
}










/******************************************************************************************************** */






export function RecalcFilters(coll) {
  return function (dispatch, getState) {
    if(coll){
      const store = getState().common;
      var oldL = store[coll];
      calcFilters(coll,oldL,store,dispatch)
    }    
  }
}


function calcFilters(coll,oldL,store,dispatch){
  var filters = store.filters;
  if(!filters[coll]){
    filters[coll]={}
  }
  var k = store.categories; 
  filters[coll][`_root_`]=oldL;
  var groupByWeek = _Util.GroupbyWeek(oldL)
  filters[coll][`groupByWeek`]=groupByWeek;  
  var groupbyCategorieXWeek = _Util.GroupbyCategories(oldL,k)
  filters[coll][`groupbyCategorieXWeek`]=groupbyCategorieXWeek;  
  var groupByMonth = _Util.GroupbyMonth(oldL)
  filters[coll][`groupByMonth`]=groupByMonth;  
  var gmC =  _Util.GroupbyMonthXCategories(oldL,k);
  filters[coll][`GroupbyMonthXCategories`]=gmC;
  
  dispatch(retrieveFiltersSuccess(filters)); 
 
  dispatch(retrieveFilterOberves());
}


function calcFiltersGroup(coll,store,dispatch,dt){
  var filters = store.filters; 
  if(!filters[coll]){
    filters[coll]={}
  }
  var oldL = dt || store[coll];
  var groupByType = _Util.groupByType(oldL)
  filters[coll][`groupByType`]=groupByType;
  dispatch(retrieveFiltersSuccess(filters));
  
  dispatch(retrieveFilterOberves());
}


function  calcFiltersAttendance(coll,dt,store,dispatch){
  var filters = store.filters; 
  if(!filters[coll]){
    filters[coll]={}
  }
  var oldL = dt || store[coll];
  var k = {};
  if(store["kids"]){k =  _Util.convertArray2Obj(store["kids"]);}   
  var groupByShift = _Util.groupByShift(oldL,k)
  filters[coll][`groupByShift`]=groupByShift;
  dispatch(retrieveFiltersSuccess(filters));
  dispatch(retrieveFilterOberves());  
}




export function retrieveFiltersSuccess(r) {
  return {
    type: types.FILTERS_SUCCESS,
    filters: r
  };
}











/******************************************************************************************************** */











export function UpdateFormbyName(form,v){
  return function (dispatch, getState) { 
    const state = getState().common;
    UpdForm(state,dispatch,form,v);
  }
}

function UpdForm(state,dispatch, form,v){
  var __forms = state.forms; 
  var foBs =  state.formObserve + 1;
  if(!__forms[form]){
    __forms[form] = {}
  }
  __forms[form] =v;
  dispatch(retrieveFormSuccess(__forms)); 
  dispatch(retrieveFormOberves(foBs)); 
}



export function UpdateForm(form,fld,v){
  return function (dispatch, getState) {   
    const state = getState().common;
    var _forms = state.forms;
    if(!_forms[form]){
      _forms[form] = {}
    }
    _forms[form][fld] = v; 
    dispatch(UpdKeyValue({key:'forms',value:_forms})); 
    dispatch(retrieveFilterOberves());
  }
}

export function UpdateFilterForm(form,fld,v){
  return function (dispatch, getState) {   
    const state = getState().common;    
    var _forms = state.forms;
    if(!_forms[form]){
      _forms[form] = {}
    }
    _forms[form][fld] =v;  
    dispatch(retrieveFormSuccess(_forms)); 
    dispatch(retrieveFilterOberves());
  }
}



export function retrieveFormSuccess(res) {
  return {
    type: types.FORMS_SUCCESS,
    forms : res
  };
}

export function retrieveFormOberves(res) {
  return {
    type: types.FORMS_OBSERVES,
    formObserve : res
  };
}





export function retrieveFilterOberves() {
  return function (dispatch, getState) {
    const state = getState().common;
    var foBs =  state.filterObserve + 1;
    dispatch(UpdKeyValue({key:'filterObserve',value:foBs})); 
   } 
}



export function UpdateValidationForm(form,fld,v){
  return function (dispatch, getState) {   
    const state = getState().common;
    var foBs =  state.formObserve + 1;
    var _forms = state.validationForms;
    if(!_forms[form]){
      _forms[form] = {}
    }
    _forms[form][fld] =v;
    dispatch(retrieveValidationFormSuccess(_forms));
    dispatch(retrieveFormOberves(foBs));
  }
}

export function retrieveValidationFormSuccess(res) {
  return {
    type: types.VALIDATIONFORMS_SUCCESS,
    validationForms : res
  };
}


function IdExist(iD,arr){
  var tt = arr.filter(r=>r.id===iD)
  if(tt[0]){
    return false
  }
  else{
    return true
  }
}







/************************************************************************* */



var _1year = 60000*60*24*365;


export function sendToken(_code) {
  return function (dispatch, getState) {    
    _Util.fetchPostUrl(`${GRAPHQLURL}/verifyToken?code=${_code}`) 
    .then(res => {   
      if(res && res.token){
        
        var h = new RegExp('=','g')
        var _token = res.token.replace(h,'@');
        var _expire = (new Date((new Date()).getTime()+_1year));
        document.cookie = `jwt_hrm_fincance=${_token}; expires=${_expire}; path=/`;  
        window.localStorage.setItem('jwt_hrm_fincance',_token);    
        dispatch(getUserProfile());       
      }
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}


var _stores = {
  "murphy":{ },
  "athon":{ },
  "shell":{ },
  "valero":{ },
  "walmart":{ },
  "kroger":{ },
  "chevron":{ },
  "exxon":{ },
  "sunoco":{ },
  "texaco":{ },
  "orion":{ },
  "harbor":{ },
  "depot":{ },
  "freight":{ },
  "publix":{ },
  "sedano":{ },
  "navarro":{ },
  "food":{ },
  "mart":{ },
  "store":{ },
  "walgreens":{ },
  "riteaid":{ },
  "cvs":{ },
  "thornton":{},
  "thorntons":{},
  "pilot":{},
  "circle k":{},
  "speedway":{},
  "tum":{},
  "thumb":{},
  "express":{},
  "car":{},
  "wash":{}, 
  "costco":{},
  "wholesale":{}, 
  "whole":{},
  "sam":{},
  "samsclub":{},
  "akery":{},
  "cofe":{},
  "bank":{},

}




/*
var txtxt2 = `Walgreens\n#05172 5400 NEW CUT RD\nLOUISVILLE, KY 40214\n502-375-9949\n205\n3351 0071 02/17/2020 10:59 AM\nPHOTOFINISHING 048402 A\nRETURN VA UE 0.39\n0.39\nSUBTOTAL\nSALES TAX A=6.0%\n0.39\nTOTAL\n0.41\nHSA\nCHANGE\n00\n0.59\nTHANK YOU FOR SHOPPING AT WALGREENS\nDID YOU KNOW THAT YOU CAN EARN POINTS\nON THOUSANDS OF ITEMS IN-STORE AND\nONLINE? SEE OUR WEEKLY AD FOR MORE\nINFORMATION. ITEMS CHANGE WEEKLY.\nRESTRICTIONS APPLY. FOR TERMS AND\nCONDITIONS, VISIT WALGREENS.COM/BALANCE.\nRFN# 0517-2713-3510-2002-1703\n'`

var txtxt3 = `Murphy USA 5750\n520 Taylorville Road\nShelbyville,\n03-19-19\n67:11\nSITE:\nTRACE:\n1156\nMerchMU21926793001\nSALE\nVisa Debit\n6880 ************\nEntry Method: S\nInvoicet#: 335586\nAuth.#: 597691\nCARD AMT: $ 34.02\nAPPROVED\n597691\nPUMP:\nUNLEAD\n$2.349\n$2.349\nPRICE/GAL:\nNET/GAL:\n14.481\nFUEL TOTAL:\n$34.02\nNET TOTAL:\n$34.82\n'`

var txtxt4 = `Pilot #048\nI-65 Exit 86\nGlendale KY 42740\nInvoice #\n95472\nDate\n03/02/19\nTime\n14:59\nAuth #\n569524\nDBT\nAcct#\n#####:\n6880###3#\nPump Gallons\n06 8.702\nPrice\n$ 2.159\nProduct\nAmount\nUnleaded\n$ 18.79\nTotal Sale\n$ 18.79\nSALE - Card Swiped\nThank You For\nChoosing Pilot\nPlease Come Again\nAsk us about Philmor\nand My Rewards\n'`

var txtxt5 = `Jim's Express Car Wash\n8488 Preston Hwy\nLouisuille, KY 48219\n(5 02) 742-9878\nMonthly Clubs $29.95 or Less?\nAsk For For More Info.\n2/6/2019 Wed\nGREETER: Auto\n2:52 PM\nCTN: 98 0645\nPWC: 36743\nFLEX1001\n\xd7\x91\xd7\xa8\xd7\x97\xd7\xa6\xd7\x91\nFree Tire Shine\n10.00\nSUB TOTAL\n10.60\nTOTAL\n$18.00\nAMOUNT TENDERED\nCHANGE\nPAYMENT METHOD: Visa\nAccount\n: A\xd7\xa6\xd7\x90-X\xd7\x90- 6880\nApproval\n: 685214\nThank you for your business!\nCome visit us again soon?\n"`


var txtxt6 = `b'COSTCO\nEWHOLESALE\nLouisville #1238\n3408 Bardstown Road\nLouisville, KY 40218\n26 Member 111896083696\n33906 EYE RND ROAS\n1292887 CHAMPIONBB5P\n0000223807 /BOXERBRIEFS\n96\n14.99 A\n4.00-A\n1299146 ADIDAS FT PT\n519274 LIQUOR CHOO\nDate of Birth = xx/xx/x KEYED\n19.99 A\n16.99 A\nSUBTOTAL\n62.93\n2.88\n65.8\n**** TOTAL\nEXXXXXXXXXXX\nAPp#: 501403\nResp: APPROVED\nCHIP Read\nAID: A0000000980840 VERIFIED BY PIN\nSeq# 4372\nben\nEFT/Deblt\nTran ID#: 934100004372..\nMerchant ID: 991238\nAPPROVED - Purchase\nAMOUNT: $65.81\n12/07/2019 13:07 1238 4 161 140\n65.81\nEFT/Debit\nCHANGE\nA 6.00% TAX\nTOTAL TAX\nTOTAL NUMBER OF ITEMS SOLD =\nINSTANT SAVINGS\n12/07/2012 13:07 1238 4 161 140\n2.88\n2.88\n$ 4.00\n*SEASONS GREETINGS & HAPPY HOLIDAYS*\nOP#: 140 Name: Kirsten D.\nThank You!\nPlease Come Again\nWhse:1238 Trm:4 Trn:161 OP:140\n'`


var txtxt = `CLUB\nS. HUS\nSelf Checkout\nCLUB GANAGE8 GAUID MCWHORTER\n( 502 ) 964 0379\nLOUISVILLE, KY\n12/07/19 14:20 4325 08276 091\nHECTOR\n980118729 QUESO FRESCF\n323513 PORK LOIN F\nF 980050581 GOUDA SLICEF\nE 980172093 CANOLA OIL F\n533748 OLIVES 2 PKF\nSUBTOTAL\n10.16 N\n5.98 N\n7.28 N\n7.98 N\n38.08\n38.08\n38.08\nSAMS HASTERCARD P CHEDLT\nMastercard\nAPPROVAL # 001168\n1 **** ***** ****\nTC 11CEA9BA63459022\nTERMINAL # SC010943\n*HO SIGNATURE REQUIRED\nCHANGE DUE\nVisit samsclub.com to see your savings\n# ITEMS SOLD 5\nTC# 3401 4210 0185 8796 4772\n*** MENBER COPY ***\n'`

var txtxt = `b'RECEIPT AT. 03/22/2020 No. 946636\nHAVAthon FL $280,00\nelessles, \xc3\x87ASH\nDATE\nRECEIVED FROM\nCombra\nKey Florida iletals\nDOLLARS\nO FOR RENT\nO FOR\nCASH\nACCOUNT\nthefre\nrvice\n(1-800-\nC\xd0\x9dECK\nFROM\nPAYMENT\nMONEY\nORDER\nBAL. DUE\nCREDIT\nCARD\nBY\n3-11\n'`
var txtxt = `EURO CAFE & BAKERY\n6917 SOUTHSIDE DR\nLOUISVILLE, KY 40214\n5026322309\nTransaction 117816\nTotal\n$7.00\nDEBIT CARD SALE\n$7.00\n01-Mar-2020 9:23:18A\n$7.00 | Method: CONTACTLESS\nRef #: 006100702131\n96XXXXXXXXXXXX 06\nAuth #: 082309\nMID: ********2881\nAID: A0000000980340\nAthNtwkNm: VISA\nRtInd:CREDIT\nDEVICE VERIFIED\nOnline: https://clover.com/\nAErzV\xc9\x94\xc9\x94O0/d\nClover Privacy Folicy\n'`

var txtxt = `SPEEDWAY\nLouisville KY\nTRAN# : 7723159\n3/2/2020\n9:47 AM\n05\nRegular Unleaded\n9.134 @ $2.039/GAL\nGAS TOTAL\ndunm,\n$18.62\nTAX\nTOTAL\n$18.62\nDebit\nCard Num :\nTERM: 01\nXXXXXXXXXXXXX\nTRANS TYPE:\nAPPR#: 861367\nENTRY METHOD: Chip\ncard\nCAPTURE\nUSD$ 18.62\nUS DEBIT\nAID: A0000000980840\n03/02/2020 09:45:16\nVerified by PIN\nCardholder agrees to\npay to issuer total\ncharges per the\nagreement between\ncardholder & issuer\nwww.speedway.com\n'`

*/



var dateRegExp = "^(((0[13578]|(10|12))/(0[1-9]|[1-2][0-9]|3[0-1]))|(02/(0[1-9]|[1-2][0-9]))|((0[469]|11)[-,/](0[1-9]|[1-2][0-9]|30)))[-,/]([0-9]{2}|[0-9]{4})$";
var rgX_Date = new RegExp(dateRegExp);
var floatRegExp = /^\d+\.\d{0,3}$/;


function isDateFormat(d){  
  var dt = (new Date(d));
  if( dt && dt.getTime()){
    return true;
  }else{
    return false;
  }

}

function checkSomeStore(d){
  let result = false;
  _Util.ObjectKeys(_stores).map(stre=>{
    if(!result && d.toLowerCase().indexOf(stre)>=0){
      //console.log(d, stre,'include')
      result = true
    }
  })  
  return result
}



export  function parseTextFromImg(tt,_id){
  let _total = 0;
  let description = '';
  let descriptions = {};
  let title = '';
  let titles = {};
  let amount = false;
  let date = null;
  let dates = {};
  let amounts = {};
  let _txt = tt || '';
  _txt = _txt.replace("b'",'').replace('b"','');
  let _2cmp = "\n";
  if(_txt.indexOf("\\n")>=0){
    _2cmp = "\\n";
  }
   // console.log(_txt);
   var _txt2split = _txt.split(_2cmp);
   _txt2split.map((lnT,Ind1) =>{
      var word2Split =  lnT.toLowerCase().split(' ');  
      word2Split.map((dt,Ind2)=>{ 
       
        var replaceexepcion = ['thank',' >*','you','for','choose','of','pay','paying'];
        var _value_ = dt.toLowerCase().trim();
        if(_value_.indexOf('*****')>=0){

        }
        else if(_value_.indexOf(')')>=0){

        }        
        else if(_value_){
          
           //console.log(_value_);
         
          //console.log(checkSomeStore(_value_),_value_);
          if(checkSomeStore(_value_)){
              var _ttl = lnT.trim()   
              replaceexepcion.map(_2rpl=>{
                _ttl = lnT.trim().replace(_2rpl,'');
              })
              //titles = _ttl.trim();
              // titles.push(_ttl.trim());
              titles[_ttl.trim()] = _ttl.trim();
          }
          

          checkSomeStore(_value_)



          var descriptionTips = ['invoice','auth','tc#','ref','gpay','walmart pay','paying','appr','merch','tc:','pwc:','id#','aid:','aid:','app#','no.','ransact']
          descriptionTips.map((dtp)=>{
            if(_value_.indexOf(dtp)>=0){    
              if(word2Split[word2Split.length-1]==="#"){ 
                let newdecs = lnT.trim()+': '+ _txt2split[Ind1+1];
                //description += newdecs
                descriptions[newdecs] = newdecs;
              }  
              else if(Ind2 -( word2Split.length-1)===0){
                let newdecs = lnT.trim()+': '+ _txt2split[Ind1+1];
                //description += newdecs;
                descriptions[newdecs] = newdecs;
              }else{
                //description += lnT.trim()+'; ';
                descriptions[lnT.trim()+'; '] = lnT.trim();
              }
            }
          })


         
          
          let _v2spilt = '/';
          if(_value_.split('-').length===3){
            _v2spilt= '-';
          }          
          if(_value_.split(_v2spilt).length===3){            
            let _value_Dt = _value_.replace('date','').trim();
            var m,d,y;
            if(_value_Dt.split(_v2spilt)[0] && _value_Dt.split(_v2spilt)[0].length <3 && _value_Dt.split(_v2spilt)[0].length >0){              
              m = parseInt(_value_Dt.split(_v2spilt)[0]);             
              if(parseInt(_value_Dt.split(_v2spilt)[0])>12){  }
            }
            if(_value_Dt.split(_v2spilt)[1] && _value_Dt.split(_v2spilt)[1].length >0 && _value_Dt.split(_v2spilt)[1].length <3){              
              d = parseInt(_value_Dt.split(_v2spilt)[1]);
              
              if(parseInt(_value_Dt.split(_v2spilt)[1])>31){ }
            }
            if(_value_Dt.split(_v2spilt)[2]){
              if(_value_Dt.split(_v2spilt)[2].length <5  && _value_Dt.split(_v2spilt)[2].length >1){
                y = parseInt(_value_Dt.split(_v2spilt)[2]);
              }else{
                var nyy = '';
                _value_Dt.split(_v2spilt)[2].split('').map(lett=>{                  
                  //console.log(!isNaN(lett),lett)
                  if(!isNaN(lett)){
                    nyy += lett;
                    //console.log(nyy)
                  }
                  y = parseInt(nyy);
                })
                //console.log(_value_Dt.split(_v2spilt)[2])
              } 
            }

                
            var dtF = `${m<10?'0'+m:m}/${d<10?'0'+d:d}/${y}`;
            var date2Format = (new Date(dtF));            
            if(date2Format && date2Format.getTime()){
              //date = date2Format.getTime();
              dates[date2Format.getTime()]=date2Format.getTime();
            }
          }
        
          

          var _$value = _value_.trim();
          if(_$value.indexOf('$')>=0){           
             _$value = _$value.replace('$','').trim();
          }
          if(_$value.indexOf(',')>=0){
            _$value = _$value.replace(',','.').trim();
          }         
          if (floatRegExp.test(_$value) && !isNaN(_$value)) {
              let newTotal = parseFloat(_$value)
                if(lnT.toLowerCase().trim().indexOf('amount')>=0){
                  _total=newTotal;
                  amount =  true;
                  amounts[newTotal] = newTotal;
                }
                else if(lnT.toLowerCase().trim().indexOf('total')>=0){
                  if(lnT.toLowerCase().trim().indexOf('items')>=0 || lnT.toLowerCase().trim().indexOf('tax')>=0){
  
                  }else{
                    amounts[newTotal] = newTotal;
                    if(_total<newTotal){
                      _total=newTotal;
                    } 
                  }
                }      
                else {
                  amounts[newTotal] = newTotal;
                  if(_total<newTotal){
                    _total=newTotal;
                  }  
              }
          }
        }
        
      })      
  })
  let result = {import:_total,date:date,title:title,description:description,image:_id}; 
  let resultArr = {import:amounts,date:dates,title:titles,description:descriptions,image:_id}; 
  //console.log(resultArr); 
  //console.log(JSON.stringify(resultArr)); 
  return resultArr;

}




  // parseTextFromImg(txtxt)





export  function makeFileRequest(url,parmas, file,formName,videoRef){ 
  return function (dispatch, getState) { 
    dispatch(UpdKeyValue({key:'ImageProccesDone',value:false}));
    dispatch(UpdKeyValue({key:'isLoadingReceipt',value:true}));
    
    let formData = new FormData(),
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //for (let i = 0; i < files.length; i++) {}
    formData.append("file", file, file.name);
    

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              if(_Util.isJson(xhr.response)){
                var data = JSON.parse(xhr.response);               
                if(data && data.status){
                  var d2s = parseTextFromImg(data.status,data.id);
                  //console.log(d2s);

                  dispatch(UpdKeyValue({key:'ImageProccesData',value:d2s}));
                  dispatch(UpdKeyValue({key:'ImageProccesDone',value:true}));
                  dispatch(UpdKeyValue({key:'isLoadingReceipt',value:false}));
                }
              }
                            
            } else {
              dispatch(UpdKeyValue({key:'isLoadingReceipt',value:false}));
              console.log(`error`);
              console.log(xhr.response);
            }
        }
    };

    xhr.upload.onprogress = (event) => {
        let progress = Math.round(event.loaded / event.total * 100);
        dispatch(UpdKeyValue({key:'uploadProgress',value:progress}));
        //this.props.commonStore.UploadList[file.name][`progress`] = progress;
        //this.props.commonStore.UploadProgress()
      
    };

    xhr.open('POST', url, true);     
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("autorization", "e7d278c5-d443-aa4c-a001-8ebd9bbb9073");
    xhr.send(formData);
    //this.props.commonStore.UploadList[file.name][`xhr`] = xhr; 
  }
}







export function getThumbnail(url){
  if(url){
    const state = _State().common; 
    var _thumbnailJson = state['thumbnailJsonBlob']; 
    if(_thumbnailJson && _thumbnailJson[url]){
      if(_thumbnailJson[url]['blob']){     
        return _thumbnailJson[url]['blob'];
      }else{
        return ''
      }
    }else{
      _Dispatch(getThumbnail64(url))
      return ''
    }
  }else{
    return ''
  }
    
}





function getThumbnail64(url) {
  var _url = GRAPHQLURL.concat(url);
  return function (dispatch, getState) {
    const state = getState().common; 
    var _thumbnailJson = state['thumbnailJsonBlob'];
    if(!_thumbnailJson){
      _thumbnailJson = {}
    }
    if(!_thumbnailJson[url]){
      _thumbnailJson[url] = {}
    }
    _thumbnailJson[url]['requested'] = true;
    dispatch(UpdKeyValue({key:'thumbnailJsonBlob',value:_thumbnailJson}));
    var xhr = new XMLHttpRequest();    
      xhr.open( "GET",_url , true );
      xhr.responseType = "json";
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {           
          //document.getElementById("demo").innerHTML = this.responseText;
        }
      };
      xhr.onload = function( e ) {          
        if (xhr.status === 200) {
          if(this.response && this.response.id){
            let b64_Blob = getBlob(this.response.b64,this.response.type);           
            _thumbnailJson[url]['blob']=b64_Blob;
            _thumbnailJson[url]['b64']=this.response.b64;
            //console.log(_Util.Base64.decode(this.response.b64)); 

            this.response.trns && _Util.Base64.decode(this.response.trns).split('\n').map(wrd=>{
              console.log(wrd); 
            })
            
            _thumbnailJson[url]['type']=this.response.type;
            dispatch(UpdKeyValue({key:'thumbnailJsonBlob',value:_thumbnailJson}));
            dispatch(UpdKeyValue({key:'thumbnailJsonBlobObserve',value:(new Date()).getTime()}));
            /*var yIndex = state['thumbnailJsonIndex'];
            yIndex[0]=true;
            dispatch(UpdKeyValue({key:'thumbnailJsonIndex',value:yIndex}));
            */
          }
        }
      };
    xhr.send(); 
  };             
}  









function getBlob(t,type){    
  var arrayBufferView = base64ToArrayBuffer(t);
  //Util.DecodeWebp(arrayBufferView);       
  var blob = new Blob( [ arrayBufferView ], { type: type?type:"image/jpeg" } );
  var urlCreator = window.URL || window.webkitURL;
  var imageUrl = urlCreator.createObjectURL(blob);     
  return imageUrl;
}





function base64ToArrayBuffer(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}










const rawGithub = `https://raw.githubusercontent.com/hectoricardom/hectoricardom.github.io/master/data/`;

export const extrasOptions = {
  
  vegetables:{
    "pepper":{
      price:0,
      picture:rawGithub+'pepper_small.png',
    }, 
    "onion":{
      price:0,
      picture:rawGithub+'onion_small.png',
    },
    "mushroom":{
      price:0,
      picture:rawGithub+'mushroom_small2.png',
    },
    "carrot":{
      price:0,
      picture:rawGithub+'carrot_small.png',

    },
    "broccoli":{
      price:0,
      picture:rawGithub+'broccoli_small.png',
    }  
  },   
  meats:{
    "shrimp":{
      price:1,
      picture:rawGithub+'shrimp_small.png',
    },     
    "chicken":{
      price:1,
      picture:rawGithub+'chicken_small.png',
    },  
    "beef":{
      price:1,
      picture:rawGithub+'beef_small.png',
    },
    "pork":{
      price:1,
      picture:rawGithub+'pork_small.png',
    }
  },
  seasoning:{
    salt:{
      price:0,
      picture:  rawGithub+'arroz_small.png',
    },
    "black pepper":{
      price:0,
      picture: rawGithub+'black_pepper_small.png',
    },
    "garlic":{
      price:0,
      picture:rawGithub+'garlic_small.png',
    },
  },

  

}



function loadLazyImage() {
  Object.keys(extrasOptions).map(grp=>{ 
    Object.keys(extrasOptions[grp]).map(_ext=>{    
      let imgUrl = extrasOptions[grp][_ext] && extrasOptions[grp][_ext]['picture'];
      imgUrl && getBlobImage(imgUrl);    
    })
  })
}



export function getBlobImage(url){
  if(url){
    const state = _State().common; 
    var blobImagesList = state['blobImagesList']; 
    if(blobImagesList && blobImagesList[url]){      
      if(blobImagesList[url]['blob']){     
        return blobImagesList[url]['blob'];
      }else{
        return ''
      }
    }else{
      _Dispatch(Image2Caching(url))
      return ''
    }
  }else{
    return ''
  }    
}

export function Image2Caching(url) {
  return function (dispatch, getState) {   
    const state = getState().common;
    var _ImagesList =  state.blobImagesList;
    let param = url;
    if(!_ImagesList){
      _ImagesList = {};
    }
    if(param && !_ImagesList[param]){    
      if(!_ImagesList[param]){
        _ImagesList[param] = {};
      }
      dispatch(UpdKeyValue({key:'blobImagesList',value:_ImagesList}));
      var xhr = new XMLHttpRequest();
        xhr.open( "GET", url, true );
        xhr.responseType = "arraybuffer";
        xhr.onload = function( e ) {         
          if (xhr.status === 200) {
            var arrayBufferView = new Uint8Array( this.response );              
            if(arrayBufferView.length>200){
              //var base64String = btoa(new Uint8Array(arrayBufferView).reduce((data, byte) => data + String.fromCharCode(byte), ''));
              var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
              var urlCreator = window.URL || window.webkitURL;
              var imageUrl = urlCreator.createObjectURL(blob); 
                           
              //_ImagesList[param].buffer = base64String;
              _ImagesList[param]['blob'] = imageUrl;   
              dispatch(UpdKeyValue({key:'blobImagesList',value:_ImagesList}));
              dispatch(UpdKeyValue({key:'thumbnailJsonBlobObserve',value:(new Date()).getTime()}));
            } 
          }
          else{
            _ImagesList[param]['blob'] = url;
            dispatch(UpdKeyValue({key:'blobImagesList',value:_ImagesList}));
            dispatch(UpdKeyValue({key:'thumbnailJsonBlobObserve',value:(new Date()).getTime()}));
          }             
        };  
      xhr.send();    
    }      
  }  
}


export const data = {
  appetizer:{
    logo: rawGithub+'appetizer2.png',    
    list:{
      y0872ty6n3f:{
        name:"toast",
        price:0.55,
        picture:rawGithub+'toast_bread2.png'
        ,
        size:{
          small:0.55,
          large:0.90
        }
      },
      y0f72tjln3f:{
        name:"brownie",
        price:3.05,
        picture:rawGithub+'brownies2.png',
        size:{
          small:3.05,
          large:5.85
        }
      },
    }
  },
  lunchs:{
    logo: rawGithub+'lunch.png',
    list:{
      y0872Fr7s_6n3f:{
        name:"fried rice",
        price:3.75,
        picture: rawGithub+'fried_rice.png',
        size:{
          small:3.75,
          large:7.00
        }
      },
      y0f72tPrk0vdjln3f:{
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
    logo: rawGithub+'dinner.png',
    list:{
      
    }
  },
  beverages:{
    logo: rawGithub+'beverages.png',
    list:{
      y087676ty6n3f:{
        name:"coca cola",
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
  },appetizer2:{
    logo: rawGithub+'appetizer2.png',    
    list:{
      v2_y0872ty6n3f:{
        name:"toast",
        price:0.55,
        picture:rawGithub+'toast_bread.png'
        ,
        size:{
          small:0.55,
          large:0.90
        }
      },
      v2_y0f72tjln3f:{
        name:"brownie",
        price:3.05,
        picture:rawGithub+'brownies.png',
        size:{
          small:3.05,
          large:5.85
        }
      },
    }
  },
}

