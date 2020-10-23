import React, { Component } from "react";
import "../App.css";

class Countdown extends Component {
  state = {
    // Boolean to keep a track of end time
    timerOn: false,
    //Track starting time
    timerStart: 0,
    //Track of current time
    timerTime: 0
  };
// Start Timer
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime 
    });
    // interval function to decrease the value in milisecond
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        //When the timer value reaches zero
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };
  //Stop Button workings
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  // reset Button
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };
  //Hard Reset button
    hard_resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: 0,
        timerStart: 0,
      });
    }
  };
  // Set the starting timing
  adjustTimer = input => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      
      if (input === "incHours" && timerTime + 3600000 < 216000000) {  //Increase Hour value
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) { // Decrease Hour Value
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) { //Increase Minutes Value
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) { // Decrease minutes Value
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) { // Increase seconds Value
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) { // Decrease Seconds Value
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  render() {
    
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="Countdown">
        <div className="Countdown-header">Countdown</div>
        <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <div className="Countdown-display">
          <button onClick={() => this.adjustTimer("incHours")}>&#8679;</button>
          <button onClick={() => this.adjustTimer("incMinutes")}>
            &#8679;
          </button>
          <button onClick={() => this.adjustTimer("incSeconds")}>
            &#8679;
          </button>

          <div className="Countdown-time">
            {hours} : {minutes} : {seconds}
          </div>

          <button onClick={() => this.adjustTimer("decHours")}>&#8681;</button>
          <button onClick={() => this.adjustTimer("decMinutes")}>
            &#8681;
          </button>
          <button onClick={() => this.adjustTimer("decSeconds")}>
            &#8681;
          </button>
        </div>

        {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
          <button className="Button-start" onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <button className="Button-stop" onClick={this.stopTimer}>
            Stop
          </button>
        )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
            <button className="Button-start" onClick={this.startTimer}>
              Resume
            </button>
          )}

        {(timerOn === false || timerTime < 1000) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <button className="Button-reset" onClick={this.resetTimer}>
              Reset
            </button>
          )}
        {(timerOn === false || timerTime < 1000) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <button className="Button-reset" onClick={this.hard_resetTimer}>
              Hard Reset
            </button>
          )}
      </div>
    );
  }
}

export default Countdown;
