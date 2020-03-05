import React, { Component } from 'react';

class ResizeObserve extends Component {
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
    // 50 times per second, change to your needs
    const INTERVAL = 50;
    this.intervalID = setInterval(this.handleInterval, INTERVAL);
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.requestID);
    this.requestID = null;
    this.intervalID = null;
  }

  getWindowSize() {
    // Get scroll position, with IE fallback
    return {w:window.outerWidth,h:window.outerHeight};
  }

  handleInterval() {
    // Interval is only used to throttle animation frame
    cancelAnimationFrame(this.requestID);
    this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
  }

  handleRequestAnimationFrame() {
    const { width,height } = this.state;
    const ss = this.getWindowSize();

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

  render() {  
    return (
      <div/>
    );
  }
};

export default ResizeObserve;