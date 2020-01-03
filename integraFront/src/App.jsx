import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';
import MainRouter from './components/MainRouter'
import LoginComponent from './components/LoginComponent'
import HomeComponent from './components/HomeComponent';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends Component {
  
  constructor(props){
    super(props)
  }

  state = {
    inputValue: ''
  }
  
  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }


  render() {

    const {clickButton, newValue} = this.props;

    const { inputValue } = this.state;

    return(
      <div className='App'>
        {/*
        <BrowserRouter>
          <Switch>
            {this.props.children},
            <Route path="/" exact Component={HomeComponent}></Route>
            <Route path="/login" Component={LoginComponent}/>
            <Route path="/menu" Component={HomeComponent}/>
          </Switch>
        </BrowserRouter>*/
        }
        {
        <MainRouter/>
        }
      </div>      
  );


/*
    return (
      <div className="App" style={{ paddingTop: '10px' }}>
        <input
          onChange={this.inputChange}
          type='text'
          value={inputValue}
        />
        <button onClick={() => clickButton(inputValue)}>
          Click me!
        </button>
        <h1>{newValue}</h1>
      </div>
    );*/
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);