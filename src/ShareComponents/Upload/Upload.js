import { React, inject, observer, withRouter, NavLink } from '../../../Utils/Sources'
import {Util, Icons, CircleProgress } from '../ShareComponents'

import './style.css';
import { Certificate } from 'crypto';

@inject('commonStore')
@withRouter
@observer
export default class UploadFiles extends React.Component {
  componentWillMount() {
    
  }
  componentDidMount() {  
    var _th6 = this;    
    _th6.makeFileRequest = _th6.makeFileRequest.bind(this);
    _th6.cancelUpload = _th6.cancelUpload.bind(this);
    _th6.reloadUpload = _th6.reloadUpload.bind(this);
  }
  handleScroll(event){
  }

  makeFileRequest(url, params, file){  
    var _th2 = this;
    let formData = new FormData(),
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //for (let i = 0; i < files.length; i++) {}
    formData.append("file", file, file.name);
    

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.response));                
            } else {
              console.log(`error`);
              console.log(xhr.response);
            }
        }
    };

    xhr.upload.onprogress = (event) => {
        let progress = Math.round(event.loaded / event.total * 100);
        this.props.commonStore.UploadList[file.name][`progress`] = progress;
        this.props.commonStore.UploadProgress()
       
    };

    xhr.open('POST', url, true);     
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("autorization", "e7d278c5-d443-aa4c-a001-8ebd9bbb9073");
    xhr.send(formData);
    this.props.commonStore.UploadList[file.name][`xhr`] = xhr; 
  }


reloadUpload(u){
  var _th2 = this;
  var UploadUrl = `http://localhost:9090/UploadVideo`;
  _th2.makeFileRequest(UploadUrl, [], u.metadata);
  _th2.props.commonStore.UploadList[u.metadata.name][`aborted`] = false;  
}

  dropHandler (ev) {
    var _th2 = this;
    var UploadUrl = `http://localhost:9090/UploadVideo`;
    ev.preventDefault();
    if (ev.dataTransfer.items) { 
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();          
          this.props.commonStore.UploadList[file.name] = {};
          this.props.commonStore.UploadList[file.name][`metadata`] = file;
          this.props.commonStore.UploadList[file.name][`progress`] = 0;
          this.props.commonStore.UploadList[file.name][`aborted`] = false;          
          _th2.makeFileRequest(UploadUrl, [], file);
          this.props.commonStore.uploadStarted = true;
          this.props.commonStore.UploadProgress()
        }
      }
    } else {      
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    } 
    
    
    removeDragData(ev)
  }

  cancelUpload(c){
    c.xhr.abort();
    this.props.commonStore.UploadList[c.metadata.name][`aborted`] = true; 
  }

  dragOverHandler (ev){    
    ev.preventDefault();
  }

  render() {


    const {uploadProgress, UploadList, uploadStarted} =  this.props.commonStore;
    var inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}
    var UPloadProg = null;
                  
    if(uploadStarted){
      UPloadProg = <div className="uploadProgressContainer" style={{minHeight:`150px`}}>
        <div  className="Header">
            Uploading {Object.keys(UploadList).length} Elements
        </div>
        <div  className="List">
            {
             
            Object.keys(UploadList).map((r,i)=>{              
              const itm = UploadList[r];              
              
              var _Icon = `text`;             
              if(extList[itm.metadata.name.split(`.`).pop()]){
                _Icon = extList[itm.metadata.name.split(`.`).pop()].icon;
              }              
              return(
                <div key={r + i} className="uploadProgressItem">
                  <div className={``} style={{padding:`0px 5px`,height:`30px`,width:`30px`,display:`inline-flex`}}>
                      <Icons name={_Icon} color={'#333'} size={24}/> 
                    </div>                      
                    <span className="title fileName">
                        {itm.metadata.name}  
                    </span>
                  <div className="flexSpace" />
                  {itm.aborted?
                  <div>
                          <div className={`loadingProgress`} style={{padding:`0px 5px`,height:`30px`,width:`30px`}}>
                            <Icons name={`info`} color={'firebrick'} size={24}/>
                          </div>
                          <div className={`cancelProgress`} style={{padding:`0px 5px`,height:`30px`,width:`30px`}} onClick={()=>{this.reloadUpload(itm)}}>
                            <Icons name={`reload`} color={'#333'} size={24}/> 
                          </div>
                    </div>:
                    <div>
                      <div className={`loadingProgress`} style={{padding:`0px 5px`,height:`30px`,width:`30px`}}>
                        <CircleProgress progress={itm.progress}/>
                      </div>
                      <div className={`cancelProgress`} style={{padding:`0px 5px`,height:`30px`,width:`30px`}} onClick={()=>{this.cancelUpload(itm)}}>
                        <Icons name={`cancel`} color={'#333'} size={24}/> 
                      </div>
                    </div>
              }
                </div>
              )
            })
          }
          </div>
        </div>
    }     
    
    
      return (
        <div>
          <div style={{minHeight:`650px`, position:`absolute`}} onDrop={this.dropHandler.bind(this)} onDragOver={this.dragOverHandler}>          
            <p> Browse or Drag n Drop files ...</p>
            <input type={`file`} style={inputFileStyle}/>
          </div>
          {UPloadProg}
        </div>
      );
    }
    
  
}




function removeDragData(ev) { 

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to remove the drag data
    ev.dataTransfer.items.clear();
  } else {
    // Use DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
}



var extList = {
  webp:{mime:`image/webp`,icon:`image`},
  jpg:{mime:`image/jpg`,icon:`image`},
  png:{mime:`image/png`,icon:`image`},
  gif:{mime:`image/gif`,icon:`image`},
  mp3:{mime:`audio/mp3`,icon:`audio`},
  wav:{mime:`audio/wav`,icon:`audio`},
  acc:{mime:`audio/acc`,icon:`audio`},
  gif:{mime:`image/gif`,icon:`image`},
  ts:{mime:`video/MP2T`,icon:`video`},
  m3u8:{mime:`application/x-mpegURL`,icon:`video`},
  mp4:{mime:`video/MP4`,icon:`video`},
  mov:{mime:`video/MP4`,icon:`video`},
  avi:{mime:`video/MP4`,icon:`video`},
  mkv:{mime:`video/MP4`,icon:`video`},
  js:{mime:`application/javascript; charset=UTF-8`,icon:`text`},
  css:{mime:'text/css; charset=utf-8',icon:`text`},
  html:{mime:`text/html; charset=UTF-8`,icon:`text`},
} 
