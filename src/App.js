import React from 'react'
import BUTTON from './button.jsx'
import './App.css'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      currnum: '0',
      operation: ''
    }
    this.chooseOperation = this.chooseOperation.bind(this)
    this.compute = this.compute.bind(this);
    this.appendNumber = this.appendNumber.bind(this);
  }
  clear = () => {
    this.setState({
      currnum: '0',
      operation: ''
    })
  }
  appendNumber = (e) => {
    if(this.state.currnum === '0'){
      this.setState({
        currnum: e.target.value
      })
    }else {
      this.setState({
        currnum: this.state.currnum + e.target.value,
        operation: ''
      })
    }
    
  }
  chooseOperation = (e) => {
    const value = e.target.value;
    const {currnum} = this.state;
    const last = /[\+\-\*\/]$/;
    this.setState({
      operation: value,
      currnum: currnum + value
    })
    if(currnum.toString().includes("*-") || currnum.toString().includes("/-") || currnum.toString().includes("+-") ){
      this.setState({
        currnum: currnum.slice(0,-2) + value
      })
    }else if(e.target.value === "-"){
      this.setState({
        currnum: currnum + value
      })
    }else if(last.test(currnum.toString())){
      this.setState({
        currnum: currnum.slice(0,-1) + value
      })
    }
  }
  compute ()  {
    const {currnum, operation} = this.state;
    if(operation.indexOf(currnum.toString().slice(-1)) > -1){
        return;
    }
    this.setState({
      currnum: eval(currnum),
      operation: ''
    })
  }
  decimal = () => {
    const {currnum} = this.state;
    const splitted = currnum.split(/[\+\-\*\/]/);
    const last = splitted.slice(-1)[0];
    if(last.includes('.')) {
      return;
    }else {
      this.setState({
        currnum: currnum + '.'
      })
    }
  }

  render(){
    return (
      <div className="App">
        <div className='calculator'>
          <div className='display' id="display">
            <div>{this.state.currnum}</div>
          </div>
            <BUTTON  clear = {this.clear} 
            appendNumber={this.appendNumber}
            chooseOperation = {this.chooseOperation}
            compute = {this.compute}
            decimal = {this.decimal}/>
        </div>
        
      </div>
    );
  }
  
}

export default App;
