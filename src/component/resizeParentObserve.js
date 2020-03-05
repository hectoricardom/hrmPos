import React, { Component } from 'react';

class ResizeParentObserve extends Component {
  constructor() {
    super();

    // Initial scroll position
    this.state = {      
      width: 0,
      height: 0
    };

    // Bind handlers
    this.handleInterval = this.handleInterval.bind(this);
    this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(this);
  }

  componentWillMount() {
    const INTERVAL = 100;
    this.intervalID = setInterval(this.handleInterval, INTERVAL);
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.requestID);
    this.requestID = null;
    this.intervalID = null;
  }

  getSize() {
    // Get scroll position, with IE fallback
   //console.log(this.Elm.getBoundingClientRect())   
   
    var dmt= this.Elm.parentNode.getBoundingClientRect();
    return {w:dmt.width,h:dmt.height};
  }

  handleInterval() {
    // Interval is only used to throttle animation frame
    cancelAnimationFrame(this.requestID);
    this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
  }

  handleRequestAnimationFrame() {
    const { width,height } = this.state;

    const ss = this.Elm?this.getSize():{};    

    // Update the state only when scroll position is changed
    if (ss.w !== width || ss.h !== height) {
      if (typeof this.props.sizehandler === 'function') {      
        this.props.sizehandler(ss);
      } 
      this.setState({
        width: ss.w,
        height:ss.h
      });
    }
  }

  ref = r => {
    this.Elm = r
  }

  render() {  
    return (
      <div 
        ref={this.ref}/>
    );
  }
};

export default ResizeParentObserve;