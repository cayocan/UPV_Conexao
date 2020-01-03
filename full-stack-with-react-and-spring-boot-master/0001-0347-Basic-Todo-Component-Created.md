<!---
Current Directory : /in28Minutes/git/full-stack-with-react-and-spring-boot
-->

## Complete Code Example


### /frontend/todo-app/public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>My Todo Application</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```
---

### /frontend/todo-app/public/manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```
---

### /frontend/todo-app/src/bootstrap.css

```css
@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
```
---

### /frontend/todo-app/src/App.css

```css
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background-color: #222222;
}

.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```
---

### /frontend/todo-app/src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
---

### /frontend/todo-app/src/index.css

```css
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
```
---

### /frontend/todo-app/src/components/todo/WelcomeComponent.jsx

```
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage : ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} 
                        className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
                
            </>
        )        
    }

    retrieveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService()
        // .then( response => this.handleSuccessfulResponse(response) )

        // HelloWorldService.executeHelloWorldBeanService()
        // .then( response => this.handleSuccessfulResponse(response) )

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then( response => this.handleSuccessfulResponse(response) )
        .catch( error => this.handleError(error) )
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error) {
        console.log(error.response)
        this.setState({welcomeMessage: error.response.data.message})
    }

}


export default WelcomeComponent
```
---

### /frontend/todo-app/src/components/todo/ListTodosComponent.jsx

```
import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component {

    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos : [],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)   
        this.updateTodoClicked = this.updateTodoClicked.bind(this)   
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
          .then(
              response => {
                  //console.log(response);
                  this.setState({todos : response.data})
              }
          ) 
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
         .then (
             response => {
                this.setState({message : `Delete of todo ${id} Successful`})
                this.refreshTodos()
             }
         )
        
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/todos/${id}`)
        // /todos/${id}
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        //  .then (
        //      response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //      }
        //  )
        
    }

    render() {
        console.log('render')
        return (
            <div>
                 <h1>List Todos</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}

export default ListTodosComponent
```
---

### /frontend/todo-app/src/components/todo/HeaderComponent.jsx

```
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent
```
---

### /frontend/todo-app/src/components/todo/AuthenticatedRoute.jsx

```
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class AuthenticatedRoute extends Component {    
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute
```
---

### /frontend/todo-app/src/components/todo/FooterComponent.jsx

```
import React, {Component} from 'react'

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2018 @in28minutes</span>
            </footer>
        )
    }
}

export default FooterComponent
```
---

### /frontend/todo-app/src/components/todo/LoginComponent.jsx

```
import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState(
            {
                [event.target.name]
                  :event.target.value
            }
        )
    }

    // handleUsernameChange(event) {
    //     console.log(event.target.name);
    //     this.setState(
    //         {
    //             [event.target.name]
    //               :event.target.value
    //         }
    //     )
    // }

    // handlePasswordChange(event) {
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }

    loginClicked() {
        //in28minutes,dummy
        if(this.state.username==='in28minutes' && this.state.password==='dummy'){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
            //this.setState({showSuccessMessage:true})
            //this.setState({hasLoginFailed:false})
        }
        else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password}  onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent
```
---

### /frontend/todo-app/src/components/todo/TodoComponent.jsx

```
import React, {Component} from 'react'

class TodoComponent extends Component {
    render() {
        return <div>
                Todo Component for id - {this.props.match.params.id}</div>
    }
}

export default TodoComponent
```
---

### /frontend/todo-app/src/components/todo/AuthenticationService.js

```js
class AuthenticationService {

    registerSuccessfulLogin(username,password){
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return ''
        return user
    }
}

export default new AuthenticationService()
```
---

### /frontend/todo-app/src/components/todo/ErrorComponent.jsx

```
import React from 'react'

function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support at abcd-efgh-ijkl</div>
}

export default ErrorComponent
```
---

### /frontend/todo-app/src/components/todo/TodoApp.jsx

```
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

export default TodoApp
```
---

### /frontend/todo-app/src/components/todo/LogoutComponent.jsx

```
import React, {Component} from 'react'

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                </div>
            </>
        )
    }
}

export default LogoutComponent
```
---

### /frontend/todo-app/src/components/learning-examples/FirstComponent.jsx

```
import React, { Component } from 'react'

//Class Component
class FirstComponent extends Component {
    render() {
      return (
        <div className="firstComponent">
           FirstComponent
        </div>
      )
    }
  }

export default FirstComponent
```
---

### /frontend/todo-app/src/components/learning-examples/ThirdComponent.jsx

```
import React from 'react'

function ThirdComponent() {
  return (
    <div className="thirdComponent">
       Third Component
    </div>
  )
}

export default ThirdComponent
```
---

### /frontend/todo-app/src/components/learning-examples/SecondComponent.jsx

```
import React, { Component } from 'react'

class SecondComponent extends Component {
    render() {
      return (
        <div className="secondComponent">
           Second Component
        </div>
      )
    }
}

export default SecondComponent
```
---

### /frontend/todo-app/src/components/counter/Counter.css

```css
/*
button {
    background-color: green;
    font-size : 16px;
    padding : 15px 30px;
    color : white;
    width : 100px;
}

.count {
    font-size : 50px;
    padding : 15px 30px;
}

.reset {
    background-color: red;
    width : 200px;
}

body {
    padding : 15px 30px;
}
*/
```
---

### /frontend/todo-app/src/components/counter/Counter.jsx

```
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

class Counter extends Component {

    constructor() {

        super(); //Error 1
  
        this.state = {
            counter : 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
  
    render() {
        return (
          <div className="counter">
             <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
             <CounterButton by={5} incrementMethod={this.increment}  decrementMethod={this.decrement}/>
             <CounterButton by={10} incrementMethod={this.increment}  decrementMethod={this.decrement}/>
             <span className="count">{this.state.counter}</span> 
             <div><button className="reset" onClick={this.reset}>Reset</button></div>
          </div>
        );
    }    

    reset() {
        this.setState( {counter: 0});
    }

    increment(by) { 
        //console.log(`increment from child - ${by}`)
        this.setState(
            (prevState) => {
             return {counter: prevState.counter + by}
            }
        );
    }

    decrement(by) { 
        //console.log(`increment from child - ${by}`)
        this.setState(
            (prevState) => {
             return {counter: prevState.counter - by}
            }
        );
    }

}

class CounterButton extends Component {
  //Define the initial state in a constructor
  //state => counter 0
  //constructor() {
  //    super(); //Error 1

    //   this.state = {
    //       counter : 0
    //   }

    //   this.increment = this.increment.bind(this);
    //   this.decrement = this.decrement.bind(this);
  //}
  
  render()  {
  //render = () =>  {
    //const style = {fontSize : "50px", padding : "15px 30px"};
    return (
        <div className="counter">
            <button onClick={() => this.props.incrementMethod(this.props.by)} >+{this.props.by}</button>
            <button onClick={() => this.props.decrementMethod(this.props.by)} >-{this.props.by}</button>
            {/*<span className="count" 
            >{this.state.counter}</span>*/}
        </div>
    )
  }
  
//   increment() { //Update state - counter++
//     //console.log('increment');
//     //this.state.counter++; //Bad Practice
//     this.setState({
//         counter: this.state.counter + this.props.by
//     });
    
//     this.props.incrementMethod(this.props.by);
//   }

//   decrement () {
//     this.setState({
//         counter: this.state.counter - this.props.by
//     });
    
//     this.props.decrementMethod(this.props.by);
//   }
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter
```
---

### /frontend/todo-app/src/App.test.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```
---

### /frontend/todo-app/src/api/todo/TodoDataService.js

```js
import axios from 'axios'

class TodoDataService {
    retrieveAllTodos(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }

    deleteTodo(name, id) {
        //console.log('executed service')
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

}

export default new TodoDataService()
```
---

### /frontend/todo-app/src/api/todo/HelloWorldService.js

```js
import axios from 'axios'

class HelloWorldService {
    
    executeHelloWorldService() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world');        
    }

    executeHelloWorldBeanService() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world-bean');        
    }

    executeHelloWorldPathVariableService(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);        
    }
}

export default new HelloWorldService()
```
---

### /frontend/todo-app/src/serviceWorker.js

```js
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
```
---

### /frontend/todo-app/src/logo.svg

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
    <g fill="#61DAFB">
        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
        <circle cx="420.9" cy="296.5" r="45.7"/>
        <path d="M520.5 78.1z"/>
    </g>
</svg>
```
---

### /frontend/todo-app/src/App.js

```js
import React, { Component } from 'react';
//import FirstComponent from './components/learning-examples/FirstComponent'
//import SecondComponent from './components/learning-examples/SecondComponent'
//import ThirdComponent from './components/learning-examples/ThirdComponent'
//import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         {/*<Counter/>*/}
         <TodoApp/>
      </div>
    );
  }
}

// class LearningComponents extends Component {
//   render() {
//     return (
//       <div className="LearningComponents">
//          My Hello World
//          <FirstComponent></FirstComponent>
//          <SecondComponent></SecondComponent>
//          <ThirdComponent></ThirdComponent>
//       </div>
//     );
//   }
// }

export default App;
```
---

### /frontend/todo-app/package.json

```json
{
  "name": "todo-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.18.0",
    "react": "^16.8.4",
    "react-dom": "^16.8.4",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.8"
  },
  "scripts": {
    "start": "PORT=4200 react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```
---

### /README.html

```html
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body {
  max-width: 980px;
  border: 1px solid #ddd;
  outline: 1300px solid #fff;
  margin: 16px auto;
}

body .markdown-body
{
  padding: 45px;
}

@font-face {
  font-family: fontawesome-mini;
  src: url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAABE0AA8AAAAAHWwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABWAAAADsAAABUIIslek9TLzIAAAGUAAAAQwAAAFY3d1HZY21hcAAAAdgAAACqAAACOvWLi0FjdnQgAAAChAAAABMAAAAgBtX/BGZwZ20AAAKYAAAFkAAAC3CKkZBZZ2FzcAAACCgAAAAIAAAACAAAABBnbHlmAAAIMAAABdQAAAjkYT9TNWhlYWQAAA4EAAAAMwAAADYQ6WvNaGhlYQAADjgAAAAfAAAAJAc6A1pobXR4AAAOWAAAACAAAAA0Kmz/7mxvY2EAAA54AAAAHAAAABwQPBJubWF4cAAADpQAAAAgAAAAIAEHC/NuYW1lAAAOtAAAAYQAAALxhQT4h3Bvc3QAABA4AAAAfgAAAMS3SYh9cHJlcAAAELgAAAB6AAAAhuVBK7x4nGNgZGBg4GIwYLBjYHJx8wlh4MtJLMljkGJgYYAAkDwymzEnMz2RgQPGA8qxgGkOIGaDiAIAJjsFSAB4nGNgZHZmnMDAysDAVMW0h4GBoQdCMz5gMGRkAooysDIzYAUBaa4pDA4Pwz+yMwf9z2KIYg5imAYUZgTJAQDcoQvQAHic7ZHNDYJAFIRnBXf94cDRIiyCKkCpwFCPJ092RcKNDoYKcN4+EmMPvpdvk539zQyAPYBCXEUJhBcCrJ5SQ9YLnLJe4qF5rdb+uWPDngNHTkta101pNyWa8lMhn6xx2dqUnW4q9YOIhAOOeueMSgsR/6ry+P7O5s6xVNg4chBsHUuFnWNJ8uZYwrw7chrsHXkODo7cB0dHOYCTY8kv0VE2WJKD6gOlWjsxAAB4nGNgQAMSEMgc9D8LhAESbAPdAHicrVZpd9NGFB15SZyELCULLWphxMRpsEYmbMGACUGyYyBdnK2VoIsUO+m+8Ynf4F/zZNpz6Dd+Wu8bLySQtOdwmpOjd+fN1czbZRJaktgL65GUmy/F1NYmjew8CemGTctRfCg7eyFlisnfBVEQrZbatx2HREQiULWusEQQ+x5ZmmR86FFGy7akV03KLT3pLlvjQb1V334aOsqxO6GkZjN0aD2yJVUYVaJIpj1S0qZlqPorSSu8v8LMV81QwohOImm8GcbQSN4bZ7TKaDW24yiKbLLcKFIkmuFBFHmU1RLn5IoJDMoHzZDyyqcR5cP8iKzYo5xWsEu20/y+L3mndzk/sV9vUbbkQB/Ijuzg7HQlX4RbW2HctJPtKFQRdtd3QmzZ7FT/Zo/ymkYDtysyvdCMYKl8hRArP6HM/iFZLZxP+ZJHo1qykRNB62VO7Es+gdbjiClxzRhZ0N3RCRHU/ZIzDPaYPh788d4plgsTAngcy3pHJZwIEylhczRJ2jByYCVliyqp9a6YOOV1WsRbwn7t2tGXzmjjUHdiPFsPHVs5UcnxaFKnmUyd2knNoykNopR0JnjMrwMoP6JJXm1jNYmVR9M4ZsaERCICLdxLU0EsO7GkKQTNoxm9uRumuXYtWqTJA/Xco/f05la4udNT2g70s0Z/VqdiOtgL0+lp5C/xadrlIkXp+ukZfkziQdYCMpEtNsOUgwdv/Q7Sy9eWHIXXBtju7fMrqH3WRPCkAfsb0B5P1SkJTIWYVYhWQGKta1mWydWsFqnI1HdDmla+rNMEinIcF8e+jHH9XzMzlpgSvt+J07MjLj1z7UsI0xx8m3U9mtepxXIBcWZ5TqdZlu/rNMfyA53mWZ7X6QhLW6ejLD/UaYHlRzodY3lBC5p038GQizDkAg6QMISlA0NYXoIhLBUMYbkIQ1gWYQjLJRjC8mMYwnIZhrC8rGXV1FNJ49qZWAZsQmBijh65zEXlaiq5VEK7aFRqQ54SbpVUFM+qf2WgXjzyhjmwFkiXyJpfMc6Vj0bl+NYVLW8aO1fAsepvH472OfFS1ouFPwX/1dZUJb1izcOTq/Abhp5sJ6o2qXh0TZfPVT26/l9UVFgL9BtIhVgoyrJscGcihI86nYZqoJVDzGzMPLTrdcuan8P9NzFCFlD9+DcUGgvcg05ZSVnt4KzV19uy3DuDcjgTLEkxN/P6VvgiI7PSfpFZyp6PfB5wBYxKZdhqA60VvNknMQ+Z3iTPBHFbUTZI2tjOBIkNHPOAefOdBCZh6qoN5E7hhg34BWFuwXknXKJ6oyyH7kXs8yik/Fun4kT2qGiMwLPZG2Gv70LKb3EMJDT5pX4MVBWhqRg1FdA0Um6oBl/G2bptQsYO9CMqdsOyrOLDxxb3lZJtGYR8pIjVo6Of1l6iTqrcfmYUl++dvgXBIDUxf3vfdHGQyrtayTJHbQNTtxqVU9eaQ+NVh+rmUfW94+wTOWuabronHnpf06rbwcVcLLD2bQ7SUiYX1PVhhQ2iy8WlUOplNEnvuAcYFhjQ71CKjf+r+th8nitVhdFxJN9O1LfR52AM/A/Yf0f1A9D3Y+hyDS7P95oTn2704WyZrqIX66foNzBrrblZugbc0HQD4iFHrY64yg18pwZxeqS5HOkh4GPdFeIBwCaAxeAT3bWM5lMAo/mMOT7A58xh0GQOgy3mMNhmzhrADnMY7DKHwR5zGHzBnHWAL5nDIGQOg4g5DJ4wJwB4yhwGXzGHwdfMYfANc+4DfMscBjFzGCTMYbCv6dYwzC1e0F2gtkFVoANTT1jcw+JQU2XI/o4Xhv29Qcz+wSCm/qjp9pD6Ey8M9WeDmPqLQUz9VdOdIfU3Xhjq7wYx9Q+DmPpMvxjLZQa/jHyXCgeUXWw+5++J9w/bxUC5AAEAAf//AA94nIVVX2hbZRQ/5/t7893s5ja9f7ouzdZ0TTqz3bRJmogbWya6bG6Cq0VbSV2ddIJjFtfIQHEig80Hda8yUN/0YQz8AyriiyD+xQd92R4HCnaCb3samnpumrpsCsLlfPf7zvedc37nL3CAtc/5W/wQZGA3tOBSY/g+TMjHmwzEoM1Q8+ZjRZY4oJhmBw5/YB6Za0yC5AkhlwA1A1yCBIBOwCII0Cj0U8BAMdUCzq05sKwkP7SlUY6fcJk4Fb/RyE79/6P5hjM/F4aZiXBoeMgzcqQ4Xi1hPqfDLG5FT+lchCVU3lYMyvuwhl1mqndQL0RsuloLywHtthLXI06OblTrhfWVnpSJ5+mwu/JdbtuN3IAnkW0LLMcRwaC7ktrlzridM6kVdyf9uO1UNBByI7JhwtG2sEwab07ORBeilWhqavJCqV0qzZTOl/7ZXQ5TbTcdcFelyGhhRDAQpdqp1FEX3w3cFTc1k9pJQkmm4ySCbSikxRP2QOfN+0tHS5MrpQuTU1Mk5nw0E5Xa0WvrOwDyGax9yB9ma6DAg82wHc43SAGTI4GjBWebOePAERFE8/AHaQpZASSTy8A4WwZiLQMQ82mFKATO0ILicRAoDm9p5P99E5b/fXG+kQYY3TYUuqmERWYoT0u/GNYL2q/4WB3LaVS+VynXsVYIcWw6DkCh3nX1D+VzlYN4LClF5yexSQos8exqZ3KVP+wtrC54u4Nznq6cq+xpMpUUnZ8FUYzE86ud0g28NOIv3Gj5/rmA3ABs7S/ywzFuQ4qyd6QxfNtiQIaEgp3w/entQg4Vcbqa16M5FfpeUB8t1+qeg7mI7cUyOe79wOk86gSxkVec4KPTX69++5x68Yubn5/F+w52z7u08sJX7fZXv8ekT/d2mILJxq6sn+SC6qEJknzLJCxyZEKwWVqYmAPBxBE/9DLeZiWHu7lcr/VytrCRuHojncNuTt9h46tmacmYisnSamdN2bZptcsmSysdVsy1PrOvOzF3xN64Rb937t/og9KHxYdcjIUqFAmIAHGHNzlns+RTPgeUYAQm9DwpNxfxbhhBHPaw3/gfTcXO2L+eJVIx5nsyGkvm9X4/f+bGkH45G0PaSjcMXTjcZyTvi3UdHoCDjQd3IDUVsgwYmUoJK/gp4JJxeRI0MKHZIkgynyIBqBTOUs6rOVCojvjZ4mCQz49ZMlMcp8QoYk6NoBfsxnJtsBohpa8iGJS+ZH7gU7NxME6cmF+t7cO9vB8d3jTWSct0ycW9ranXmolNDwmVkNnxe+8JtoztwS5rKJ0xWS95tQ/1zMYzg69MzUZnNtl1ofNbsml/OJm6f9wjRjpnu2o4MzHzn77IQkRd+1DjwMQ2pqSjGMMhyjrgTbBAKksuUm0iU7hI0aN2wOKOq7WYBSH0HGihj/jkiPxAfmwsEbfYrjMG+j3ij932Db/LV7I/xruNrhnroxjR9HRMb2nTvO0ZXOoHPk8H2ZhDPx93qcE/53sH5np/dkIP7zzhTVKdR/BAY/9ElkkR+A6lJGsqpJ4oQcTxpvBT3Kn58VkaJjgHyPEIws57xkaHh9KuVpDEpJZeMbZ5w/zBHi5NMQ4r5VphsFqID7TyB9eR4pX216c3AHxpdAwoqU9qg0ZJ6yVLKmMSz1iG2z27ifx18NkY0LPx1W/wCc2l5LrznrIsiKsqbmB78A9wIGx4tI8rjihVHJyY9pgMirenVq0yWg7Iw7eogG7ZgYM3qR9959A/fZkg6MnD/exlkmc+jWV4SB15XUR+eqC6l6ZmgPtN9z5JMfik05OV8ljylunJ4J+wA/FUaQSSKotsYsCWqaPBidBLcxkWx7XKFRIb45TGaEhjlF9uUVPqXOtcIwsXbBvfoZXIyRYFdkfnqjExH98xpnPczqzjX/uNdO1Y17Wpi5+6Ts8BXtjVFasp9KZ1mOiNbH65c5w6HgmyF2jFCZywM8mWjRc7T5Pmt0lRy7Y71+jYbpGyvwG4sH0XeJxjYGRgYADiwBB/53h+m68M3MwvgCIM1z5N/g6j///9v5H5BbMnkMvBwAQSBQCIcA9gAHicY2BkYGAO+p8FJF/8//v/F/MLBqAICuAFALYQB5kAeJxjfsHAwLwAiCNB+P9fbJjJmoGBMRUo/wKCAfO2EnQAAAAAANoBXgGcAgICVALaA1IDvAPkBAYEPARyAAEAAAANAF0ABAAAAAAAAgAUACQAcwAAAG4LcAAAAAB4nHWRzWrCQBSFT+pPqUIXLXTTzayKUohGKIibCoLuhbrrYtTRxCYZmYyKyz5Fd32HvlDfoO/QkziIFJtw9bvnnpl7ZwLgBt/wcHieGAf2UGd24Atcou+4RH3kuEweO66QXx1XyaHjGh6ROa7jFp/cwStfMVvhy7GHO+/e8QWuvcBxifqz4zL5xXGF/Oa4Sn53XMPE+3Bcx4P3M9DrvYmWoRWNQVN02kFXTPdCU4pSGQu5saE2meiLhU6timPtz3SSs9ypTCdqrJabWJoT5QQnymSRTkXgt0/UkUqVkVbN807ZdtmxdiEWRidi6HqItdErNbN+aO2612qd9sYAGmvsYRBhyUu0EGhQbfK/gzYCdElTOgSdB1eEFBIxFYkNV4RFJWPeZyyYpVQVHTHZx4y/yVGX2LGWFZri51TccUOn5B7nPefVCSPvGhVVwUl9znveO2KkhV8Wk82PZ8qwZf8OVcu1+fSmWCMw/HMOwXvKaysqM+p+cVuWag8tvv+c+xdd+4+teJxtjUEOwiAURJla24KliQfhUA2g/Sl+CKXx+loNrpzVezOLEY34Ron/0WhwQoszOvQYIKFwwQiNSbSBeO2SZ0tBP4j3zVjKNng32ZmtD1VVXCuOiw/pJ8S3WOU6l+K5UOTaDC4+2TjKMtN9KQf1ezLx/Sg/00FCvABHhjDjAAB4nGPw3sFwIihiIyNjX+QGxp0cDBwMyQUbGVidNjEwMmiBGJu5mBg5ICw+BjCLzWkX0wGgNCeQze60i8EBwmZmcNmowtgRGLHBoSNiI3OKy0Y1EG8XRwMDI4tDR3JIBEhJJBBs5mFi5NHawfi/dQNL70YmBhcADHYj9AAA) format('woff');
}

.markdown-body {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  color: #333333;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-body a {
  background: transparent;
}

.markdown-body a:active,
.markdown-body a:hover {
  outline: 0;
}

.markdown-body b,
.markdown-body strong {
  font-weight: bold;
}

.markdown-body mark {
  background: #ff0;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

.markdown-body sub,
.markdown-body sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
.markdown-body sup {
  top: -0.5em;
}
.markdown-body sub {
  bottom: -0.25em;
}

.markdown-body h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

.markdown-body img {
  border: 0;
}

.markdown-body hr {
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  height: 0;
}

.markdown-body pre {
  overflow: auto;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre,
.markdown-body samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

.markdown-body input {
  color: inherit;
  font: inherit;
  margin: 0;
}

.markdown-body html input[disabled] {
  cursor: default;
}

.markdown-body input {
  line-height: normal;
}

.markdown-body input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

.markdown-body table {
  border-collapse: collapse;
  border-spacing: 0;
}

.markdown-body td,
.markdown-body th {
  padding: 0;
}

.markdown-body .codehilitetable {
  border: 0;
  border-spacing: 0;
}

.markdown-body .codehilitetable tr {
  border: 0;
}

.markdown-body .codehilitetable pre,
.markdown-body .codehilitetable div.codehilite {
  margin: 0;
}

.markdown-body .linenos,
.markdown-body .code,
.markdown-body .codehilitetable td {
  border: 0;
  padding: 0;
}

.markdown-body td:not(.linenos) .linenodiv {
  padding: 0 !important;
}

.markdown-body .code {
  width: 100%;
}

.markdown-body .linenos div pre,
.markdown-body .linenodiv pre,
.markdown-body .linenodiv {
  border: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-border-top-left-radius: 3px;
  -webkit-border-bottom-left-radius: 3px;
  -moz-border-radius-topleft: 3px;
  -moz-border-radius-bottomleft: 3px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.markdown-body .code div pre,
.markdown-body .code div {
  border: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-border-top-right-radius: 3px;
  -webkit-border-bottom-right-radius: 3px;
  -moz-border-radius-topright: 3px;
  -moz-border-radius-bottomright: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.markdown-body * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.markdown-body input {
  font: 13px Helvetica, arial, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.4;
}

.markdown-body a {
  color: #4183c4;
  text-decoration: none;
}

.markdown-body a:hover,
.markdown-body a:focus,
.markdown-body a:active {
  text-decoration: underline;
}

.markdown-body hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ddd;
}

.markdown-body hr:before,
.markdown-body hr:after {
  display: table;
  content: " ";
}

.markdown-body hr:after {
  clear: both;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 1.1;
}

.markdown-body h1 {
  font-size: 30px;
}

.markdown-body h2 {
  font-size: 21px;
}

.markdown-body h3 {
  font-size: 16px;
}

.markdown-body h4 {
  font-size: 14px;
}

.markdown-body h5 {
  font-size: 12px;
}

.markdown-body h6 {
  font-size: 11px;
}

.markdown-body blockquote {
  margin: 0;
}

.markdown-body ul,
.markdown-body ol {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body ol ol,
.markdown-body ul ol {
  list-style-type: lower-roman;
}

.markdown-body ul ul ol,
.markdown-body ul ol ol,
.markdown-body ol ul ol,
.markdown-body ol ol ol {
  list-style-type: lower-alpha;
}

.markdown-body dd {
  margin-left: 0;
}

.markdown-body code,
.markdown-body pre,
.markdown-body samp {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body kbd {
  background-color: #e7e7e7;
  background-image: -moz-linear-gradient(#fefefe, #e7e7e7);
  background-image: -webkit-linear-gradient(#fefefe, #e7e7e7);
  background-image: linear-gradient(#fefefe, #e7e7e7);
  background-repeat: repeat-x;
  border-radius: 2px;
  border: 1px solid #cfcfcf;
  color: #000;
  padding: 3px 5px;
  line-height: 10px;
  font: 11px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  display: inline-block;
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

.markdown-body .headerlink {
  font: normal 400 16px fontawesome-mini;
  vertical-align: middle;
  margin-left: -16px;
  float: left;
  display: inline-block;
  text-decoration: none;
  opacity: 0;
  color: #333;
}

.markdown-body .headerlink:focus {
  outline: none;
}

.markdown-body h1 .headerlink {
  margin-top: 0.8rem;
}

.markdown-body h2 .headerlink,
.markdown-body h3 .headerlink {
  margin-top: 0.6rem;
}

.markdown-body h4 .headerlink {
  margin-top: 0.2rem;
}

.markdown-body h5 .headerlink,
.markdown-body h6 .headerlink {
  margin-top: 0;
}

.markdown-body .headerlink:hover,
.markdown-body h1:hover .headerlink,
.markdown-body h2:hover .headerlink,
.markdown-body h3:hover .headerlink,
.markdown-body h4:hover .headerlink,
.markdown-body h5:hover .headerlink,
.markdown-body h6:hover .headerlink {
  opacity: 1;
  text-decoration: none;
}

.markdown-body h1 {
  padding-bottom: 0.3em;
  font-size: 2.25em;
  line-height: 1.2;
  border-bottom: 1px solid #eee;
}

.markdown-body h2 {
  padding-bottom: 0.3em;
  font-size: 1.75em;
  line-height: 1.225;
  border-bottom: 1px solid #eee;
}

.markdown-body h3 {
  font-size: 1.5em;
  line-height: 1.43;
}

.markdown-body h4 {
  font-size: 1.25em;
}

.markdown-body h5 {
  font-size: 1em;
}

.markdown-body h6 {
  font-size: 1em;
  color: #777;
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre,
.markdown-body .admonition {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body hr {
  height: 4px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body li>p {
  margin-top: 16px;
}

.markdown-body dl {
  padding: 0;
}

.markdown-body dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

.markdown-body dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown-body blockquote {
  padding: 0 15px;
  color: #777;
  border-left: 4px solid #ddd;
}

.markdown-body blockquote>:first-child {
  margin-top: 0;
}

.markdown-body blockquote>:last-child {
  margin-bottom: 0;
}

.markdown-body table {
  display: block;
  width: 100%;
  overflow: auto;
  word-break: normal;
  word-break: keep-all;
}

.markdown-body table th {
  font-weight: bold;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid #ddd;
}

.markdown-body table tr {
  background-color: #fff;
  border-top: 1px solid #ccc;
}

.markdown-body table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

.markdown-body img {
  max-width: 100%;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.markdown-body code,
.markdown-body samp {
  padding: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(0,0,0,0.04);
  border-radius: 3px;
}

.markdown-body code:before,
.markdown-body code:after {
  letter-spacing: -0.2em;
  content: "\00a0";
}

.markdown-body pre>code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.markdown-body .codehilite {
  margin-bottom: 16px;
}

.markdown-body .codehilite pre,
.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f7f7f7;
  border-radius: 3px;
}

.markdown-body .codehilite pre {
  margin-bottom: 0;
  word-break: normal;
}

.markdown-body pre {
  word-wrap: normal;
}

.markdown-body pre code {
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body pre code:before,
.markdown-body pre code:after {
  content: normal;
}

/* Admonition */
.markdown-body .admonition {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  position: relative;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  border-left: 6px solid #333;
  padding: 10px 10px 10px 30px;
}

.markdown-body .admonition table {
  color: #333;
}

.markdown-body .admonition p {
  padding: 0;
}

.markdown-body .admonition-title {
  font-weight: bold;
  margin: 0;
}

.markdown-body .admonition>.admonition-title {
  color: #333;
}

.markdown-body .attention>.admonition-title {
  color: #a6d796;
}

.markdown-body .caution>.admonition-title {
  color: #d7a796;
}

.markdown-body .hint>.admonition-title {
  color: #96c6d7;
}

.markdown-body .danger>.admonition-title {
  color: #c25f77;
}

.markdown-body .question>.admonition-title {
  color: #96a6d7;
}

.markdown-body .note>.admonition-title {
  color: #d7c896;
}

.markdown-body .admonition:before,
.markdown-body .attention:before,
.markdown-body .caution:before,
.markdown-body .hint:before,
.markdown-body .danger:before,
.markdown-body .question:before,
.markdown-body .note:before {
  font: normal normal 16px fontawesome-mini;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 1.5;
  color: #333;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 10px;
  padding-left: 10px;
}

.markdown-body .admonition:before {
  content: "\f056\00a0";
  color: 333;
}

.markdown-body .attention:before {
  content: "\f058\00a0";
  color: #a6d796;
}

.markdown-body .caution:before {
  content: "\f06a\00a0";
  color: #d7a796;
}

.markdown-body .hint:before {
  content: "\f05a\00a0";
  color: #96c6d7;
}

.markdown-body .danger:before {
  content: "\f057\00a0";
  color: #c25f77;
}

.markdown-body .question:before {
  content: "\f059\00a0";
  color: #96a6d7;
}

.markdown-body .note:before {
  content: "\f040\00a0";
  color: #d7c896;
}

.markdown-body .admonition::after {
  content: normal;
}

.markdown-body .attention {
  border-left: 6px solid #a6d796;
}

.markdown-body .caution {
  border-left: 6px solid #d7a796;
}

.markdown-body .hint {
  border-left: 6px solid #96c6d7;
}

.markdown-body .danger {
  border-left: 6px solid #c25f77;
}

.markdown-body .question {
  border-left: 6px solid #96a6d7;
}

.markdown-body .note {
  border-left: 6px solid #d7c896;
}

.markdown-body .admonition>*:first-child {
  margin-top: 0 !important;
}

.markdown-body .admonition>*:last-child {
  margin-bottom: 0 !important;
}

/* progress bar*/
.markdown-body .progress {
  display: block;
  width: 300px;
  margin: 10px 0;
  height: 24px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #ededed;
  position: relative;
  box-shadow: inset -1px 1px 3px rgba(0, 0, 0, .1);
}

.markdown-body .progress-label {
  position: absolute;
  text-align: center;
  font-weight: bold;
  width: 100%; margin: 0;
  line-height: 24px;
  color: #333;
  text-shadow: 1px 1px 0 #fefefe, -1px -1px 0 #fefefe, -1px 1px 0 #fefefe, 1px -1px 0 #fefefe, 0 1px 0 #fefefe, 0 -1px 0 #fefefe, 1px 0 0 #fefefe, -1px 0 0 #fefefe, 1px 1px 2px #000;
  -webkit-font-smoothing: antialiased !important;
  white-space: nowrap;
  overflow: hidden;
}

.markdown-body .progress-bar {
  height: 24px;
  float: left;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #96c6d7;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), inset 0 -1px 0 rgba(0, 0, 0, .1);
  background-size: 30px 30px;
  background-image: -webkit-linear-gradient(
    135deg, rgba(255, 255, 255, .4) 27%,
    transparent 27%,
    transparent 52%, rgba(255, 255, 255, .4) 52%,
    rgba(255, 255, 255, .4) 77%,
    transparent 77%, transparent
  );
  background-image: -moz-linear-gradient(
    135deg,
    rgba(255, 255, 255, .4) 27%, transparent 27%,
    transparent 52%, rgba(255, 255, 255, .4) 52%,
    rgba(255, 255, 255, .4) 77%, transparent 77%,
    transparent
  );
  background-image: -ms-linear-gradient(
    135deg,
    rgba(255, 255, 255, .4) 27%, transparent 27%,
    transparent 52%, rgba(255, 255, 255, .4) 52%,
    rgba(255, 255, 255, .4) 77%, transparent 77%,
    transparent
  );
  background-image: -o-linear-gradient(
    135deg,
    rgba(255, 255, 255, .4) 27%, transparent 27%,
    transparent 52%, rgba(255, 255, 255, .4) 52%,
    rgba(255, 255, 255, .4) 77%, transparent 77%,
    transparent
  );
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, .4) 27%, transparent 27%,
    transparent 52%, rgba(255, 255, 255, .4) 52%,
    rgba(255, 255, 255, .4) 77%, transparent 77%,
    transparent
  );
}

.markdown-body .progress-100plus .progress-bar {
  background-color: #a6d796;
}

.markdown-body .progress-80plus .progress-bar {
  background-color: #c6d796;
}

.markdown-body .progress-60plus .progress-bar {
  background-color: #d7c896;
}

.markdown-body .progress-40plus .progress-bar {
  background-color: #d7a796;
}

.markdown-body .progress-20plus .progress-bar {
  background-color: #d796a6;
}

.markdown-body .progress-0plus .progress-bar {
  background-color: #c25f77;
}

.markdown-body .candystripe-animate .progress-bar{
  -webkit-animation: animate-stripes 3s linear infinite;
  -moz-animation: animate-stripes 3s linear infinite;
  animation: animate-stripes 3s linear infinite;
}

@-webkit-keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 60px 0;
  }
}

@-moz-keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 60px 0;
  }
}

@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 60px 0;
  }
}

.markdown-body .gloss .progress-bar {
  box-shadow:
    inset 0 4px 12px rgba(255, 255, 255, .7),
    inset 0 -12px 0 rgba(0, 0, 0, .05);
}

/* MultiMarkdown Critic Blocks */
.markdown-body .critic_mark {
  background: #ff0;
}

.markdown-body .critic_delete {
  color: #c82829;
  text-decoration: line-through;
}

.markdown-body .critic_insert {
  color: #718c00 ;
  text-decoration: underline;
}

.markdown-body .critic_comment {
  color: #8e908c;
  font-style: italic;
}

.markdown-body .headeranchor {
  font: normal normal 16px fontawesome-mini;
  line-height: 1;
  display: inline-block;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.headeranchor:before {
  content: '\e157';
}

.markdown-body .task-list-item {
  list-style-type: none;
}

.markdown-body .task-list-item+.task-list-item {
  margin-top: 3px;
}

.markdown-body .task-list-item input {
  margin: 0 4px 0.25em -20px;
  vertical-align: middle;
}

/* Media */
@media only screen and (min-width: 480px) {
  .markdown-body {
    font-size:14px;
  }
}

@media only screen and (min-width: 768px) {
  .markdown-body {
    font-size:16px;
  }
}

@media print {
  .markdown-body * {
    background: transparent !important;
    color: black !important;
    filter:none !important;
    -ms-filter: none !important;
  }

  .markdown-body {
    font-size:12pt;
    max-width:100%;
    outline:none;
    border: 0;
  }

  .markdown-body a,
  .markdown-body a:visited {
    text-decoration: underline;
  }

  .markdown-body .headeranchor-link {
    display: none;
  }

  .markdown-body a[href]:after {
    content: " (" attr(href) ")";
  }

  .markdown-body abbr[title]:after {
    content: " (" attr(title) ")";
  }

  .markdown-body .ir a:after,
  .markdown-body a[href^="javascript:"]:after,
  .markdown-body a[href^="#"]:after {
    content: "";
  }

  .markdown-body pre {
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .markdown-body pre,
  .markdown-body blockquote {
    border: 1px solid #999;
    padding-right: 1em;
    page-break-inside: avoid;
  }

  .markdown-body .progress,
  .markdown-body .progress-bar {
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .markdown-body .progress {
    border: 1px solid #ddd;
  }

  .markdown-body .progress-bar {
    height: 22px;
    border-right: 1px solid #ddd;
  }

  .markdown-body tr,
  .markdown-body img {
    page-break-inside: avoid;
  }

  .markdown-body img {
    max-width: 100% !important;
  }

  .markdown-body p,
  .markdown-body h2,
  .markdown-body h3 {
    orphans: 3;
    widows: 3;
  }

  .markdown-body h2,
  .markdown-body h3 {
    page-break-after: avoid;
  }
}
</style><style>/*GitHub*/
.codehilite {background-color:#fff;color:#333333;}
.codehilite .hll {background-color:#ffffcc;}
.codehilite .c{color:#999988;font-style:italic}
.codehilite .err{color:#a61717;background-color:#e3d2d2}
.codehilite .k{font-weight:bold}
.codehilite .o{font-weight:bold}
.codehilite .cm{color:#999988;font-style:italic}
.codehilite .cp{color:#999999;font-weight:bold}
.codehilite .c1{color:#999988;font-style:italic}
.codehilite .cs{color:#999999;font-weight:bold;font-style:italic}
.codehilite .gd{color:#000000;background-color:#ffdddd}
.codehilite .ge{font-style:italic}
.codehilite .gr{color:#aa0000}
.codehilite .gh{color:#999999}
.codehilite .gi{color:#000000;background-color:#ddffdd}
.codehilite .go{color:#888888}
.codehilite .gp{color:#555555}
.codehilite .gs{font-weight:bold}
.codehilite .gu{color:#800080;font-weight:bold}
.codehilite .gt{color:#aa0000}
.codehilite .kc{font-weight:bold}
.codehilite .kd{font-weight:bold}
.codehilite .kn{font-weight:bold}
.codehilite .kp{font-weight:bold}
.codehilite .kr{font-weight:bold}
.codehilite .kt{color:#445588;font-weight:bold}
.codehilite .m{color:#009999}
.codehilite .s{color:#dd1144}
.codehilite .n{color:#333333}
.codehilite .na{color:teal}
.codehilite .nb{color:#0086b3}
.codehilite .nc{color:#445588;font-weight:bold}
.codehilite .no{color:teal}
.codehilite .ni{color:purple}
.codehilite .ne{color:#990000;font-weight:bold}
.codehilite .nf{color:#990000;font-weight:bold}
.codehilite .nn{color:#555555}
.codehilite .nt{color:navy}
.codehilite .nv{color:teal}
.codehilite .ow{font-weight:bold}
.codehilite .w{color:#bbbbbb}
.codehilite .mf{color:#009999}
.codehilite .mh{color:#009999}
.codehilite .mi{color:#009999}
.codehilite .mo{color:#009999}
.codehilite .sb{color:#dd1144}
.codehilite .sc{color:#dd1144}
.codehilite .sd{color:#dd1144}
.codehilite .s2{color:#dd1144}
.codehilite .se{color:#dd1144}
.codehilite .sh{color:#dd1144}
.codehilite .si{color:#dd1144}
.codehilite .sx{color:#dd1144}
.codehilite .sr{color:#009926}
.codehilite .s1{color:#dd1144}
.codehilite .ss{color:#990073}
.codehilite .bp{color:#999999}
.codehilite .vc{color:teal}
.codehilite .vg{color:teal}
.codehilite .vi{color:teal}
.codehilite .il{color:#009999}
.codehilite .gc{color:#999;background-color:#EAF2F5}
</style><title>README</title></head><body><article class="markdown-body"><h1 id="your-first-full-stack-application-with-react-and-spring-boot">Your First Full Stack Application with React and Spring Boot<a class="headerlink" href="#your-first-full-stack-application-with-react-and-spring-boot" title="Permanent link"></a></h1>
<h2 id="take-your-first-steps-towards-becoming-a-full-stack-developer-with-react-and-spring-boot">Take your first steps towards becoming a Full Stack Developer with React and Spring Boot<a class="headerlink" href="#take-your-first-steps-towards-becoming-a-full-stack-developer-with-react-and-spring-boot" title="Permanent link"></a></h2>
<p>React is a one of the most popular front end view frameworks
- Components
- JSX
- State
- Props</p>
<p>In combination with other libraries, React helps in doing a wide variety of front end features
- Forms Handling
- Routing System
- HTTP Requests</p>
<p>Spring Boot is an awesome framework to build RESTful API and Microservices.</p>
<p>In this course, lets combine these awesome frameworks to create your first full stack web application.</p>
<h2 id="references">References<a class="headerlink" href="#references" title="Permanent link"></a></h2>
<ul>
<li><a href="https://github.com/facebook/create-react-app">https://github.com/facebook/create-react-app</a></li>
<li><a href="https://facebook.github.io/create-react-app/docs/troubleshooting">https://facebook.github.io/create-react-app/docs/troubleshooting</a></li>
<li><a href="https://babeljs.io/repl">https://babeljs.io/repl</a></li>
</ul>
<h2 id="installation-guides">Installation Guides<a class="headerlink" href="#installation-guides" title="Permanent link"></a></h2>
<h4 id="required-tools">Required Tools<a class="headerlink" href="#required-tools" title="Permanent link"></a></h4>
<ul>
<li>Node v8+ for npm</li>
<li>Visual Studio Code - Latest Version</li>
<li>Java 8+</li>
<li>Eclipse - Oxygen+ - (Embedded Maven From Eclipse)</li>
</ul>
<h4 id="installing-node-js-npm-visual-studio-code">Installing Node Js (npm) &amp; Visual Studio Code<a class="headerlink" href="#installing-node-js-npm-visual-studio-code" title="Permanent link"></a></h4>
<ul>
<li>Playlist - <a href="https://www.youtube.com/playlist?list=PLBBog2r6uMCQN4X3Aa_jM9qVjgMCHMWx6">https://www.youtube.com/playlist?list=PLBBog2r6uMCQN4X3Aa_jM9qVjgMCHMWx6</a></li>
<li>Steps</li>
<li>Step 01 - Installing NodeJs and NPM - Node Package Manager</li>
<li>Step 02 - Quick Introduction to NPM</li>
<li>Step 03 - Installing Visual Studio Code - Front End Java Script Editor</li>
</ul>
<h4 id="installing-java-eclipse-embedded-maven">Installing Java, Eclipse &amp; Embedded Maven<a class="headerlink" href="#installing-java-eclipse-embedded-maven" title="Permanent link"></a></h4>
<ul>
<li>Playlist - <a href="https://www.youtube.com/playlist?list=PLBBog2r6uMCSmMVTW_QmDLyASBvovyAO3">https://www.youtube.com/playlist?list=PLBBog2r6uMCSmMVTW_QmDLyASBvovyAO3</a></li>
<li>Steps</li>
<li>0 - Overview - Installation Java, Eclipse and Maven</li>
<li>1 - Installing Java JDK</li>
<li>2 - Installing Eclipse IDE</li>
<li>3 - Using Embedded Maven in Eclipse</li>
<li>4 - Troubleshooting Java, Eclipse and Maven</li>
</ul>
<h4 id="troubleshooting-installations">Troubleshooting Installations<a class="headerlink" href="#troubleshooting-installations" title="Permanent link"></a></h4>
<ul>
<li>Node JS and NPM </li>
<li><a href="https://docs.npmjs.com/common-errors">https://docs.npmjs.com/common-errors</a></li>
<li><a href="https://docs.npmjs.com/getting-started/troubleshooting">https://docs.npmjs.com/getting-started/troubleshooting</a></li>
<li>Visual Studio Code</li>
<li><a href="https://code.visualstudio.com/docs/supporting/errors">https://code.visualstudio.com/docs/supporting/errors</a></li>
<li><a href="https://code.visualstudio.com/docs/supporting/FAQ">https://code.visualstudio.com/docs/supporting/FAQ</a></li>
<li>Eclipse and Embedded Maven</li>
<li>PDF : <a href="https://github.com/in28minutes/SpringIn28Minutes/blob/master/InstallationGuide-JavaEclipseAndMaven_v2.pdf">https://github.com/in28minutes/SpringIn28Minutes/blob/master/InstallationGuide-JavaEclipseAndMaven_v2.pdf</a></li>
<li>GIT Repository For Installation : <a href="https://github.com/in28minutes/getting-started-in-5-steps">https://github.com/in28minutes/getting-started-in-5-steps</a></li>
</ul>
<h3 id="getting-started-with-spring-spring-boot-and-jpa">Getting Started with Spring, Spring Boot and JPA<a class="headerlink" href="#getting-started-with-spring-spring-boot-and-jpa" title="Permanent link"></a></h3>
<ul>
<li>Spring Tutorial for Beginners - <a href="https://www.youtube.com/watch?v=edgZo2g-LTM">https://www.youtube.com/watch?v=edgZo2g-LTM</a></li>
<li>Spring Boot Tutorial for Beginners - <a href="https://www.youtube.com/watch?v=pcdpk3Yd1EA">https://www.youtube.com/watch?v=pcdpk3Yd1EA</a></li>
<li>JPA and Hibernate Tutorial for Beginners - <a href="https://www.youtube.com/watch?v=MaI0_XdpdP8">https://www.youtube.com/watch?v=MaI0_XdpdP8</a></li>
</ul>
<h2 id="course-overview">Course Overview<a class="headerlink" href="#course-overview" title="Permanent link"></a></h2>
<h3 id="introduction">Introduction<a class="headerlink" href="#introduction" title="Permanent link"></a></h3>
<p>Developing your first full stack application with React and Spring Boot is fun.</p>
<p>In this course, you will learn the basics of full stack development developing a Basic Todo Management Application using React, Spring Boot and Spring Security Frameworks.</p>
<p>You will build the application step by step - in more than 50 steps. This course would be a perfect first step as an introduction to React and Full Stack Development.</p>
<p>You will be using React (Frontend View Framework), React Create App(To create React project), Various JavaScript Libraries (Axios, Formik, React Router), Spring Boot (REST API Framework), Spring (Dependency Management),  Spring Security (Authentication and Authorization - Basic and JWT), BootStrap (Styling Pages), Maven (dependencies management), Node (npm), Visual Studio Code (JavaScript IDE), Eclipse (Java IDE) and Tomcat Embedded Web Server. We will help you set up each one of these.</p>
<h3 id="what-you-will-learn">What You will learn<a class="headerlink" href="#what-you-will-learn" title="Permanent link"></a></h3>
<ul>
<li>You will develop your first full stack application with React and Spring Boot</li>
<li>You will learn the basic of React - React Components and Routing</li>
<li>You will learn basics of building awesome frontend applications with React</li>
<li>You will be introduced to building great RESTful APIs with Spring Boot</li>
<li>You will learn to use Spring Security to configure Basic Authentication and JWT</li>
<li>You will learn to solve the challenges of connecting an React Frontend to a RESTful API</li>
<li>You will learn to connect REST API to JPA/Hibernate with Spring Boot</li>
<li>You will learn to use a wide variety of Spring Boot Starter Projects - Spring Boot Web, and Spring Boot Data JPA</li>
<li>You will understand the best practices in designing RESTful web services</li>
<li>You will develop a Todo Management Full Stack Application step by step with login and logout functionalities</li>
<li>You will learn the magic of Spring Boot - Auto Configuration, Spring Initializr and Starter Projects</li>
<li>You will understand how to make best use of Spring Boot Actuator and Spring Boot Developer Tools</li>
<li>You will understand and use the embedded servlet container options provided by Spring Boot</li>
</ul>
<h3 id="requirements">Requirements<a class="headerlink" href="#requirements" title="Permanent link"></a></h3>
<ul>
<li>You should have prior experience with Java, Basic JavaScript and Spring Framework. </li>
<li>You should have Chrome browser installed.</li>
<li>We will help you install Eclipse, Visual Studio Code and Node JS(for npm)</li>
<li>We will help you install Chrome Restlet Client Plugin and Chrome React DevTools Plugin</li>
<li>We will help you learn the basics of Modern JavaScript, Spring Boot and JPA.</li>
</ul>
<h3 id="step-wise-details">Step Wise Details<a class="headerlink" href="#step-wise-details" title="Permanent link"></a></h3>
<h4 id="quick-overview">Quick Overview<a class="headerlink" href="#quick-overview" title="Permanent link"></a></h4>
<ul>
<li>Step 01 - Understanding Full Stack Application Architecture</li>
<li>Step 02 - Quick Overview of Modern JavaScript and TypeScript</li>
<li>Step 03 - Installing React CLI - Awesome Tool to create React Projects</li>
<li>Step 04 - Creating and Launching React Application with React CLI</li>
<li>Step 05 - Importing React App into Visual Studio Code</li>
<li>Step 06 - Exploring React CLI Commands - test, lint, e2e, serve, build</li>
<li>Step 07 - Exploring React CLI Project Structure</li>
</ul>
<h4 id="getting-hands-on-with-react">Getting Hands on With React<a class="headerlink" href="#getting-hands-on-with-react" title="Permanent link"></a></h4>
<ul>
<li>Step 08 - Introduction to React Components - Basics</li>
<li>Step 09 - Introduction to React Components - Playing with AppComponent</li>
<li>Step 10 - Generating Welcome Component with ng generate</li>
<li>Step 11 - Language Variations With an Example - Java, JavaScript and TypeScript</li>
<li>Step 12 - Generating and Setting up Login Component</li>
<li>Step 13 - Understanding Event Binding - Adding click event on Login Page</li>
<li>Step 14 - Using ngModel with 2 Way Data Binding in Login Page</li>
<li>Step 15 - Quick Review of Data Binding Approaches</li>
<li>Step 16 - Adding Hardcoded Authentication to Logic Component - ngIf directive</li>
<li>Step 17 - Implementing Routes for Login, Welcome and Error Components</li>
<li>Step 18 - Implementing Routing from Login to Welcome Component</li>
<li>Step 19 - Adding Route Parameter for Welcome Component</li>
<li>Step 20 - Create List Todos Component with ng generate</li>
<li>Step 21 - Create a Link to Todos in Welcome Component</li>
<li>Step 22 - Best Practice - Create a Todo Class </li>
<li>Step 23 - Quick Introduction to React Modules</li>
<li>Step 24 - Understanding Bootstrapping of React App with Root Module and Component</li>
<li>Step 25 - Quick Review - React Modules and Components</li>
<li>Step 26 - Overview of Next Few Steps - Bootstrap, Menu, Footer and Refactoring</li>
<li>Step 27 - Adding Bootstrap Framework and Creating Components for Menu and Footer</li>
<li>Step 28 - Using Bootstrap to Create a Menu with Navigation Links</li>
<li>Step 29 - Styling Footer and Other Components with CSS and Bootstrap</li>
<li>Step 30 - Good Practice - Use RouterLink instead of href for Routes</li>
<li>Step 31 - Creating an Independent Authentication Service Component</li>
<li>Step 32 - Using Session Storage to Store User Authentication Token</li>
<li>Step 33 - Enabling Menu Links Based on User Authentication Token</li>
<li>Step 34 - Implementing Logout to remove User Authentication Token</li>
<li>Step 35 - Securing Components using Route Guards - Part 1</li>
<li>Step 36 - Securing Components using Route Guards - Part 2</li>
<li>Step 37 - Quick Review - Authentication Service, Dependency Injection and Route Guards</li>
</ul>
<h4 id="introduction-to-web-services-and-rest">Introduction to Web Services and REST<a class="headerlink" href="#introduction-to-web-services-and-rest" title="Permanent link"></a></h4>
<ul>
<li>Step 41 - What is a Web Service?</li>
<li>Step 42 - Important How Questions related to Web Services</li>
<li>Step 43 - Web Services - Key Terminology</li>
<li>Step 44 - Introduction to RESTful Web Services</li>
</ul>
<h4 id="getting-up-and-running-with-rest-and-spring-boot">Getting Up and Running with REST and Spring Boot<a class="headerlink" href="#getting-up-and-running-with-rest-and-spring-boot" title="Permanent link"></a></h4>
<ul>
<li>Step 45 - Initializing a RESTful Services Project with Spring Boot</li>
<li>Step 46 - Creating a Hello World Service</li>
<li>Step 47 - Enhancing the Hello World Service to return a Bean</li>
<li>Step 48 - Quick Review of Spring Boot Auto Configuration and Dispatcher Servlet - What&rsquo;s happening in the background?</li>
<li>Step 49 - Enhancing the Hello World Service with a Path Variable</li>
</ul>
<h4 id="connecting-react-frontend-to-spring-boot-restful-services">Connecting React Frontend to Spring Boot Restful Services<a class="headerlink" href="#connecting-react-frontend-to-spring-boot-restful-services" title="Permanent link"></a></h4>
<ul>
<li>Step 50 - Connecting React Frontend with Restful API - 1 - Creating Data Service</li>
<li>Step 51 - Connecting React Frontend with Restful API - 2 - HttpClientModule and HttpClient</li>
<li>Step 52 - Connecting React Frontend with Restful API - 3 - Understanding Observable</li>
<li>Step 53 - Connecting React Frontend with Restful API - 4 - Understanding Subscribe</li>
<li>Step 54 - Connecting React Frontend with Restful API - 5 - Handling Error Responses</li>
<li>Step 55 - Calling Welcome HTTP Service with Path Variables</li>
<li>Step 56 - Designing RESTful Services for Todo Resource</li>
<li>Step 57 - Creating REST API for retrieving Todo List</li>
<li>Step 58 - Connecting React Frontend with Todo List RESTful Service</li>
<li>Step 59 - Creating REST API to delete a Todo - DELETE Request Method</li>
<li>Step 60 - Adding Delete Todo Feature to React Frontend</li>
<li>Step 61 - Creating Todo Component and Handle Routing</li>
<li>Step 62 - Designing Todo Page with Bootstrap Framework</li>
<li>Step 63 - Creating Retrieve Tod0 Service and Connect React Frontend</li>
<li>Step 64 - Improve Todo Page Appearance</li>
<li>Step 65 - Creating REST API for Updating Todo - PUT Request Method</li>
<li>Step 66 - Creating REST API for Creating a Todo - POST Request Method</li>
<li>Step 67 - Implementing Update Todo Feature in React Frontend</li>
<li>Step 68 - Implementing New Todo Feature in React Frontend</li>
<li>Step 69 - Improving Todo Form - Validation and Form Submit on Enter - ngSubmit</li>
<li>Step 70 - Enhancing Validation Messages on Todo Page</li>
</ul>
<h4 id="implementing-spring-security-with-basic-authentication">Implementing Spring Security with Basic Authentication<a class="headerlink" href="#implementing-spring-security-with-basic-authentication" title="Permanent link"></a></h4>
<ul>
<li>Step 71 - Overview of Security with Basic Auth and JWT</li>
<li>Step 72 - Setting up Spring Security</li>
<li>Step 73 - Configure standard userid and password</li>
<li>Step 74 - Enhancing React Welcome Data Service to use Basic Auth</li>
<li>Step 75 - Configure Spring Security to disable CSRF and enable OPTION Requests</li>
<li>Step 76 - Creating React HttpInterceptor to add Basic Auth Header</li>
<li>Step 77 - Configure HttpInterceptor as Provider in App Module</li>
<li>Step 78 - Create Basic Authentication RESTful Service in Spring Boot</li>
<li>Step 79 - Create React Basic Authentication Service</li>
<li>Step 80 - Connect Login Page to Basic Authentication Service - Part 1</li>
<li>Step 81 - Connect Login Page to Basic Authentication Service - Part 2</li>
<li>Step 82 - Refactoring React Basic Authentication Service</li>
<li>Step 83 - Refactoring HttpInterceptor to use Basic Authentication Token</li>
<li>Step 84 - Best Practice - Use Constants for URLs and Tokens</li>
</ul>
<h4 id="connecting-spring-security-with-jwt">Connecting Spring Security with JWT<a class="headerlink" href="#connecting-spring-security-with-jwt" title="Permanent link"></a></h4>
<ul>
<li>Step 85 - Introduction to JWT</li>
<li>Step 86 - Importing JWT Framework into Eclipse</li>
<li>Step 87 - Quick Tip - Resolving JWT Compilation Errors</li>
<li>Step 88 - Executing JWT Resources - Get Token and Refresh Token</li>
<li>Step 89 - Understanding JWT Spring Security Framework Setup</li>
<li>Step 90 - Creating a New User with Encoded Password</li>
<li>Step 91 - Using JWT Token in React Frontend</li>
</ul>
<h4 id="connecting-rest-api-with-jpa-and-hibernate">Connecting REST API With JPA and Hibernate<a class="headerlink" href="#connecting-rest-api-with-jpa-and-hibernate" title="Permanent link"></a></h4>
<ul>
<li>Step 92 - Setting up Todo Entity and Populating Data</li>
<li>Step 93 - Connecting GET REST APIs to JPA Repository</li>
<li>Step 94 - Connecting POST, PUT and DELETE REST APIs to JPA Repository</li>
</ul>
<h4 id="spring-boot-in-10-steps">Spring Boot in 10 Steps<a class="headerlink" href="#spring-boot-in-10-steps" title="Permanent link"></a></h4>
<ul>
<li>Introduction to Spring Boot in 10 Steps</li>
<li>Step 01 - Introduction to Spring Boot - Goals and Important Features</li>
<li>Step 02 - Developing Spring Applications before Spring Boot</li>
<li>Step 03 - Using Spring Initializr to create a Spring Boot Application</li>
<li>Step 04 - Creating a Simple REST Controller</li>
<li>Step 05 - What is Spring Boot Auto Configuration?</li>
<li>Step 06 - Spring Boot vs Spring vs Spring MVC</li>
<li>Step 07 - Spring Boot Starter Projects - Starter Web and Starter JPA</li>
<li>Step 08 - Overview of different Spring Boot Starter Projects</li>
<li>Step 09 - Spring Boot Actuator</li>
<li>Step 10 - Spring Boot Developer Tools</li>
</ul>
<h4 id="first-10-steps-in-jpa-with-h2-in-memory-database">First 10 Steps in JPA with H2 in-memory database<a class="headerlink" href="#first-10-steps-in-jpa-with-h2-in-memory-database" title="Permanent link"></a></h4>
<ul>
<li>Introduction to JPA in 10 Steps</li>
<li>Step 01 - Object Relational Impedence Mismatch - Understanding the problem that JPA solves</li>
<li>Step 02 - World before JPA - JDBC, Spring JDBC and myBatis</li>
<li>Step 03 - Introduction to JPA</li>
<li>Step 04 - Creating a JPA Project using Spring Initializr</li>
<li>Step 05 - Defining a JPA Entity - User</li>
<li>Step 06 - Defining a Service to manage the Entity - UserService and EntityManager</li>
<li>Step 07 - Using a Command Line Runner to save the User to database.</li>
<li>Step 08 - Magic of Spring Boot and In Memory Database H2</li>
<li>Step 09 - Introduction to Spring Data JPA</li>
<li>Step 10 - More JPA Repository - findById and findAll</li>
</ul>
<div class="codehilite"><pre><span class="k">for</span> file in *<span class="p">;</span> <span class="k">do</span> mv <span class="s2">&quot;</span><span class="si">${</span><span class="nv">file</span><span class="si">}</span><span class="s2">&quot;</span> <span class="s2">&quot;</span><span class="si">${</span><span class="nv">file</span><span class="p">//-/ </span><span class="si">}</span><span class="s2">&quot;</span><span class="p">;</span> <span class="k">done</span>
<span class="k">for</span> file in *<span class="p">;</span> <span class="k">do</span> mv <span class="s2">&quot;</span><span class="si">${</span><span class="nv">file</span><span class="si">}</span><span class="s2">&quot;</span> <span class="s2">&quot;</span><span class="si">${</span><span class="nv">file</span><span class="p">//   / - </span><span class="si">}</span><span class="s2">&quot;</span><span class="p">;</span> <span class="k">done</span>
<span class="k">for</span> file in *<span class="p">;</span> <span class="k">do</span> mv <span class="s2">&quot;</span><span class="si">${</span><span class="nv">file</span><span class="si">}</span><span class="s2">&quot;</span> <span class="s2">&quot;</span><span class="si">${</span><span class="nv">file</span><span class="p">//01 Step/Step</span><span class="si">}</span><span class="s2">&quot;</span><span class="p">;</span> <span class="k">done</span>
</pre></div>

<h2 id="code-snippets">Code Snippets<a class="headerlink" href="#code-snippets" title="Permanent link"></a></h2>
<h3 id="core-jwt-components">Core JWT Components<a class="headerlink" href="#core-jwt-components" title="Permanent link"></a></h3>
<div class="codehilite"><pre><span class="na">jwt.signing.key.secret</span><span class="o">=</span><span class="s">mySecret</span>
<span class="na">jwt.get.token.uri</span><span class="o">=</span><span class="s">/authenticate</span>
<span class="na">jwt.refresh.token.uri</span><span class="o">=</span><span class="s">/refresh</span>
<span class="na">jwt.http.request.header</span><span class="o">=</span><span class="s">Authorization</span>
<span class="na">jwt.token.expiration.in.seconds</span><span class="o">=</span><span class="s">604800</span>
</pre></div>

<h2 id="package-comin28minutestodoservicesjwt-import-javautilarraylist-import-javautillist-import-javautiloptional-import-orgspringframeworksecuritycoreuserdetailsuserdetails-import-orgspringframeworksecuritycoreuserdetailsuserdetailsservice-import-orgspringframeworksecuritycoreuserdetailsusernamenotfoundexception-import-orgspringframeworkstereotypeservice-service-public-class-jwtinmemoryuserdetailsservice-implements-userdetailsservice-static-listjwtuserdetails-inmemoryuserlist-new-arraylist-static-inmemoryuserlistaddnew-jwtuserdetails1l-in28minutes-2a103zhzbnpv1hfzbleu5qsdojutk2je6w6pnnnyc1ujwpczh4pl6e-role_user_2-override-public-userdetails-loaduserbyusernamestring-username-throws-usernamenotfoundexception-optionaljwtuserdetails-findfirst-inmemoryuserliststream-filteruser-usergetusernameequalsusernamefindfirst-if-findfirstispresent-throw-new-usernamenotfoundexceptionstringformatuser_not_found-s-username-return-findfirstget-component-public-class-jwttokenauthorizationonceperrequestfilter-extends-onceperrequestfilter-private-final-logger-logger-loggerfactorygetloggerthisgetclass-autowired-private-userdetailsservice-jwtinmemoryuserdetailsservice-autowired-private-jwttokenutil-jwttokenutil-valuejwthttprequestheader-private-string-tokenheader-override-protected-void-dofilterinternalhttpservletrequest-request-httpservletresponse-response-filterchain-chain-throws-servletexception-ioexception-loggerdebugauthentication-request-for-requestgetrequesturl-final-string-requesttokenheader-requestgetheaderthistokenheader-string-username-null-string-jwttoken-null-if-requesttokenheader-null-requesttokenheaderstartswithbearer-jwttoken-requesttokenheadersubstring7-try-username-jwttokenutilgetusernamefromtokenjwttoken-catch-illegalargumentexception-e-loggererrorjwt_token_unable_to_get_username-e-catch-expiredjwtexception-e-loggerwarnjwt_token_expired-e-else-loggerwarnjwt_token_does_not_start_with_bearer_string-loggerdebugjwt_token_username_value-username-if-username-null-securitycontextholdergetcontextgetauthentication-null-userdetails-userdetails-thisjwtinmemoryuserdetailsserviceloaduserbyusernameusername-if-jwttokenutilvalidatetokenjwttoken-userdetails-usernamepasswordauthenticationtoken-usernamepasswordauthenticationtoken-new-usernamepasswordauthenticationtokenuserdetails-null-userdetailsgetauthorities-usernamepasswordauthenticationtokensetdetailsnew-webauthenticationdetailssourcebuilddetailsrequest-securitycontextholdergetcontextsetauthenticationusernamepasswordauthenticationtoken-chaindofilterrequest-response-component-public-class-jwttokenutil-implements-serializable-static-final-string-claim_key_username-sub-static-final-string-claim_key_created-iat-private-static-final-long-serialversionuid-3301605591108950415l-private-clock-clock-defaultclockinstance-valuejwtsigningkeysecret-private-string-secret-valuejwttokenexpirationinseconds-private-long-expiration-public-string-getusernamefromtokenstring-token-return-getclaimfromtokentoken-claimsgetsubject-public-date-getissuedatdatefromtokenstring-token-return-getclaimfromtokentoken-claimsgetissuedat-public-date-getexpirationdatefromtokenstring-token-return-getclaimfromtokentoken-claimsgetexpiration-public-t-t-getclaimfromtokenstring-token-functionclaims-t-claimsresolver-final-claims-claims-getallclaimsfromtokentoken-return-claimsresolverapplyclaims-private-claims-getallclaimsfromtokenstring-token-return-jwtsparsersetsigningkeysecretparseclaimsjwstokengetbody-private-boolean-istokenexpiredstring-token-final-date-expiration-getexpirationdatefromtokentoken-return-expirationbeforeclocknow-private-boolean-ignoretokenexpirationstring-token-here-you-specify-tokens-for-that-the-expiration-is-ignored-return-false-public-string-generatetokenuserdetails-userdetails-mapstring-object-claims-new-hashmap-return-dogeneratetokenclaims-userdetailsgetusername-private-string-dogeneratetokenmapstring-object-claims-string-subject-final-date-createddate-clocknow-final-date-expirationdate-calculateexpirationdatecreateddate-return-jwtsbuildersetclaimsclaimssetsubjectsubjectsetissuedatcreateddate-setexpirationexpirationdatesignwithsignaturealgorithmhs512-secretcompact-public-boolean-cantokenberefreshedstring-token-return-istokenexpiredtoken-ignoretokenexpirationtoken-public-string-refreshtokenstring-token-final-date-createddate-clocknow-final-date-expirationdate-calculateexpirationdatecreateddate-final-claims-claims-getallclaimsfromtokentoken-claimssetissuedatcreateddate-claimssetexpirationexpirationdate-return-jwtsbuildersetclaimsclaimssignwithsignaturealgorithmhs512-secretcompact-public-boolean-validatetokenstring-token-userdetails-userdetails-jwtuserdetails-user-jwtuserdetails-userdetails-final-string-username-getusernamefromtokentoken-return-usernameequalsusergetusername-istokenexpiredtoken-private-date-calculateexpirationdatedate-createddate-return-new-datecreateddategettime-expiration-1000-component-public-class-jwtunauthorizedresponseauthenticationentrypoint-implements-authenticationentrypoint-serializable-private-static-final-long-serialversionuid-8970718410437077606l-override-public-void-commencehttpservletrequest-request-httpservletresponse-response-authenticationexception-authexception-throws-ioexception-responsesenderrorhttpservletresponsesc_unauthorized-you-would-need-to-provide-the-jwt-token-to-access-this-resource-public-class-jwtuserdetails-implements-userdetails-private-static-final-long-serialversionuid-5155720064139820502l-private-final-long-id-private-final-string-username-private-final-string-password-private-final-collection-extends-grantedauthority-authorities-public-jwtuserdetailslong-id-string-username-string-password-string-role-thisid-id-thisusername-username-thispassword-password-listsimplegrantedauthority-authorities-new-arraylistsimplegrantedauthority-authoritiesaddnew-simplegrantedauthorityrole-thisauthorities-authorities-jsonignore-public-long-getid-return-id-override-public-string-getusername-return-username-jsonignore-override-public-boolean-isaccountnonexpired-return-true-jsonignore-override-public-boolean-isaccountnonlocked-return-true-jsonignore-override-public-boolean-iscredentialsnonexpired-return-true-jsonignore-override-public-string-getpassword-return-password-override-public-collection-extends-grantedauthority-getauthorities-return-authorities-override-public-boolean-isenabled-return-true-configuration-enablewebsecurity-enableglobalmethodsecurityprepostenabled-true-public-class-jwtwebsecurityconfig-extends-websecurityconfigureradapter-autowired-private-jwtunauthorizedresponseauthenticationentrypoint-jwtunauthorizedresponseauthenticationentrypoint-autowired-private-userdetailsservice-jwtinmemoryuserdetailsservice-autowired-private-jwttokenauthorizationonceperrequestfilter-jwtauthenticationtokenfilter-valuejwtgettokenuri-private-string-authenticationpath-autowired-public-void-configureglobalauthenticationmanagerbuilder-auth-throws-exception-auth-userdetailsservicejwtinmemoryuserdetailsservice-passwordencoderpasswordencoderbean-bean-public-passwordencoder-passwordencoderbean-return-new-bcryptpasswordencoder-bean-override-public-authenticationmanager-authenticationmanagerbean-throws-exception-return-superauthenticationmanagerbean-override-protected-void-configurehttpsecurity-httpsecurity-throws-exception-httpsecurity-csrfdisable-exceptionhandlingauthenticationentrypointjwtunauthorizedresponseauthenticationentrypointand-sessionmanagementsessioncreationpolicysessioncreationpolicystatelessand-authorizerequests-anyrequestauthenticated-httpsecurity-addfilterbeforejwtauthenticationtokenfilter-usernamepasswordauthenticationfilterclass-httpsecurity-headers-frameoptionssameorigin-h2-console-needs-this-setting-cachecontrol-disable-caching-override-public-void-configurewebsecurity-websecurity-throws-exception-websecurity-ignoring-antmatchers-httpmethodpost-authenticationpath-antmatchershttpmethodoptions-and-ignoring-antmatchers-httpmethodget-other-stuff-you-want-to-ignore-and-ignoring-antmatchersh2-consoleshould-not-be-in-production-restcontroller-crossoriginoriginshttplocalhost4200-public-class-jwtauthenticationrestcontroller-valuejwthttprequestheader-private-string-tokenheader-autowired-private-authenticationmanager-authenticationmanager-autowired-private-jwttokenutil-jwttokenutil-autowired-private-userdetailsservice-jwtinmemoryuserdetailsservice-requestmappingvalue-jwtgettokenuri-method-requestmethodpost-public-responseentity-createauthenticationtokenrequestbody-jwttokenrequest-authenticationrequest-throws-authenticationexception-authenticateauthenticationrequestgetusername-authenticationrequestgetpassword-final-userdetails-userdetails-jwtinmemoryuserdetailsserviceloaduserbyusernameauthenticationrequestgetusername-final-string-token-jwttokenutilgeneratetokenuserdetails-return-responseentityoknew-jwttokenresponsetoken-requestmappingvalue-jwtrefreshtokenuri-method-requestmethodget-public-responseentity-refreshandgetauthenticationtokenhttpservletrequest-request-string-authtoken-requestgetheadertokenheader-final-string-token-authtokensubstring7-string-username-jwttokenutilgetusernamefromtokentoken-jwtuserdetails-user-jwtuserdetails-jwtinmemoryuserdetailsserviceloaduserbyusernameusername-if-jwttokenutilcantokenberefreshedtoken-string-refreshedtoken-jwttokenutilrefreshtokentoken-return-responseentityoknew-jwttokenresponserefreshedtoken-else-return-responseentitybadrequestbodynull-exceptionhandler-authenticationexceptionclass-public-responseentitystring-handleauthenticationexceptionauthenticationexception-e-return-responseentitystatushttpstatusunauthorizedbodyegetmessage-private-void-authenticatestring-username-string-password-objectsrequirenonnullusername-objectsrequirenonnullpassword-try-authenticationmanagerauthenticatenew-usernamepasswordauthenticationtokenusername-password-catch-disabledexception-e-throw-new-authenticationexceptionuser_disabled-e-catch-badcredentialsexception-e-throw-new-authenticationexceptioninvalid_credentials-e-public-class-authenticationexception-extends-runtimeexception-public-authenticationexceptionstring-message-throwable-cause-supermessage-cause-public-class-jwttokenrequest-implements-serializable-private-static-final-long-serialversionuid-5616176897013108345l-private-string-username-private-string-password-public-jwttokenrequest-super-public-jwttokenrequeststring-username-string-password-thissetusernameusername-thissetpasswordpassword-public-string-getusername-return-thisusername-public-void-setusernamestring-username-thisusername-username-public-string-getpassword-return-thispassword-public-void-setpasswordstring-password-thispassword-password-public-class-jwttokenresponse-implements-serializable-private-static-final-long-serialversionuid-8317676219297719109l-private-final-string-token-public-jwttokenresponsestring-token-thistoken-token-public-string-gettoken-return-thistoken"><div class="codehilite"><pre><span class="kn">package</span> <span class="nn">com.in28minutes.todoservices.jwt</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">java.util.ArrayList</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">java.util.List</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">java.util.Optional</span><span class="o">;</span>

<span class="kn">import</span> <span class="nn">org.springframework.security.core.userdetails.UserDetails</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.security.core.userdetails.UserDetailsService</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.security.core.userdetails.UsernameNotFoundException</span><span class="o">;</span>
<span class="kn">import</span> <span class="nn">org.springframework.stereotype.Service</span><span class="o">;</span>

<span class="nd">@Service</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtInMemoryUserDetailsService</span> <span class="kd">implements</span> <span class="n">UserDetailsService</span> <span class="o">{</span>

  <span class="kd">static</span> <span class="n">List</span><span class="o">&lt;</span><span class="n">JwtUserDetails</span><span class="o">&gt;</span> <span class="n">inMemoryUserList</span> <span class="o">=</span> <span class="k">new</span> <span class="n">ArrayList</span><span class="o">&lt;&gt;();</span>

  <span class="kd">static</span> <span class="o">{</span>
    <span class="n">inMemoryUserList</span><span class="o">.</span><span class="na">add</span><span class="o">(</span><span class="k">new</span> <span class="n">JwtUserDetails</span><span class="o">(</span><span class="mi">1L</span><span class="o">,</span> <span class="s">&quot;in28minutes&quot;</span><span class="o">,</span>
        <span class="s">&quot;$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e&quot;</span><span class="o">,</span> <span class="s">&quot;ROLE_USER_2&quot;</span><span class="o">));</span>
  <span class="o">}</span>

  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="n">UserDetails</span> <span class="nf">loadUserByUsername</span><span class="o">(</span><span class="n">String</span> <span class="n">username</span><span class="o">)</span> <span class="kd">throws</span> <span class="n">UsernameNotFoundException</span> <span class="o">{</span>
    <span class="n">Optional</span><span class="o">&lt;</span><span class="n">JwtUserDetails</span><span class="o">&gt;</span> <span class="n">findFirst</span> <span class="o">=</span> <span class="n">inMemoryUserList</span><span class="o">.</span><span class="na">stream</span><span class="o">()</span>
        <span class="o">.</span><span class="na">filter</span><span class="o">(</span><span class="n">user</span> <span class="o">-&gt;</span> <span class="n">user</span><span class="o">.</span><span class="na">getUsername</span><span class="o">().</span><span class="na">equals</span><span class="o">(</span><span class="n">username</span><span class="o">)).</span><span class="na">findFirst</span><span class="o">();</span>

    <span class="k">if</span> <span class="o">(!</span><span class="n">findFirst</span><span class="o">.</span><span class="na">isPresent</span><span class="o">())</span> <span class="o">{</span>
      <span class="k">throw</span> <span class="k">new</span> <span class="n">UsernameNotFoundException</span><span class="o">(</span><span class="n">String</span><span class="o">.</span><span class="na">format</span><span class="o">(</span><span class="s">&quot;USER_NOT_FOUND &#39;%s&#39;.&quot;</span><span class="o">,</span> <span class="n">username</span><span class="o">));</span>
    <span class="o">}</span>

    <span class="k">return</span> <span class="n">findFirst</span><span class="o">.</span><span class="na">get</span><span class="o">();</span>
  <span class="o">}</span>

<span class="o">}</span>


<span class="nd">@Component</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtTokenAuthorizationOncePerRequestFilter</span> <span class="kd">extends</span> <span class="n">OncePerRequestFilter</span> <span class="o">{</span>

    <span class="kd">private</span> <span class="kd">final</span> <span class="n">Logger</span> <span class="n">logger</span> <span class="o">=</span> <span class="n">LoggerFactory</span><span class="o">.</span><span class="na">getLogger</span><span class="o">(</span><span class="k">this</span><span class="o">.</span><span class="na">getClass</span><span class="o">());</span>

    <span class="nd">@Autowired</span>
    <span class="kd">private</span> <span class="n">UserDetailsService</span> <span class="n">jwtInMemoryUserDetailsService</span><span class="o">;</span>

    <span class="nd">@Autowired</span>
    <span class="kd">private</span> <span class="n">JwtTokenUtil</span> <span class="n">jwtTokenUtil</span><span class="o">;</span>

    <span class="nd">@Value</span><span class="o">(</span><span class="s">&quot;${jwt.http.request.header}&quot;</span><span class="o">)</span>
    <span class="kd">private</span> <span class="n">String</span> <span class="n">tokenHeader</span><span class="o">;</span>

    <span class="nd">@Override</span>
    <span class="kd">protected</span> <span class="kt">void</span> <span class="nf">doFilterInternal</span><span class="o">(</span><span class="n">HttpServletRequest</span> <span class="n">request</span><span class="o">,</span> <span class="n">HttpServletResponse</span> <span class="n">response</span><span class="o">,</span> <span class="n">FilterChain</span> <span class="n">chain</span><span class="o">)</span> <span class="kd">throws</span> <span class="n">ServletException</span><span class="o">,</span> <span class="n">IOException</span> <span class="o">{</span>
        <span class="n">logger</span><span class="o">.</span><span class="na">debug</span><span class="o">(</span><span class="s">&quot;Authentication Request For &#39;{}&#39;&quot;</span><span class="o">,</span> <span class="n">request</span><span class="o">.</span><span class="na">getRequestURL</span><span class="o">());</span>

        <span class="kd">final</span> <span class="n">String</span> <span class="n">requestTokenHeader</span> <span class="o">=</span> <span class="n">request</span><span class="o">.</span><span class="na">getHeader</span><span class="o">(</span><span class="k">this</span><span class="o">.</span><span class="na">tokenHeader</span><span class="o">);</span>

        <span class="n">String</span> <span class="n">username</span> <span class="o">=</span> <span class="kc">null</span><span class="o">;</span>
        <span class="n">String</span> <span class="n">jwtToken</span> <span class="o">=</span> <span class="kc">null</span><span class="o">;</span>
        <span class="k">if</span> <span class="o">(</span><span class="n">requestTokenHeader</span> <span class="o">!=</span> <span class="kc">null</span> <span class="o">&amp;&amp;</span> <span class="n">requestTokenHeader</span><span class="o">.</span><span class="na">startsWith</span><span class="o">(</span><span class="s">&quot;Bearer &quot;</span><span class="o">))</span> <span class="o">{</span>
            <span class="n">jwtToken</span> <span class="o">=</span> <span class="n">requestTokenHeader</span><span class="o">.</span><span class="na">substring</span><span class="o">(</span><span class="mi">7</span><span class="o">);</span>
            <span class="k">try</span> <span class="o">{</span>
                <span class="n">username</span> <span class="o">=</span> <span class="n">jwtTokenUtil</span><span class="o">.</span><span class="na">getUsernameFromToken</span><span class="o">(</span><span class="n">jwtToken</span><span class="o">);</span>
            <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">IllegalArgumentException</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
                <span class="n">logger</span><span class="o">.</span><span class="na">error</span><span class="o">(</span><span class="s">&quot;JWT_TOKEN_UNABLE_TO_GET_USERNAME&quot;</span><span class="o">,</span> <span class="n">e</span><span class="o">);</span>
            <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">ExpiredJwtException</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
                <span class="n">logger</span><span class="o">.</span><span class="na">warn</span><span class="o">(</span><span class="s">&quot;JWT_TOKEN_EXPIRED&quot;</span><span class="o">,</span> <span class="n">e</span><span class="o">);</span>
            <span class="o">}</span>
        <span class="o">}</span> <span class="k">else</span> <span class="o">{</span>
            <span class="n">logger</span><span class="o">.</span><span class="na">warn</span><span class="o">(</span><span class="s">&quot;JWT_TOKEN_DOES_NOT_START_WITH_BEARER_STRING&quot;</span><span class="o">);</span>
        <span class="o">}</span>

        <span class="n">logger</span><span class="o">.</span><span class="na">debug</span><span class="o">(</span><span class="s">&quot;JWT_TOKEN_USERNAME_VALUE &#39;{}&#39;&quot;</span><span class="o">,</span> <span class="n">username</span><span class="o">);</span>
        <span class="k">if</span> <span class="o">(</span><span class="n">username</span> <span class="o">!=</span> <span class="kc">null</span> <span class="o">&amp;&amp;</span> <span class="n">SecurityContextHolder</span><span class="o">.</span><span class="na">getContext</span><span class="o">().</span><span class="na">getAuthentication</span><span class="o">()</span> <span class="o">==</span> <span class="kc">null</span><span class="o">)</span> <span class="o">{</span>

            <span class="n">UserDetails</span> <span class="n">userDetails</span> <span class="o">=</span> <span class="k">this</span><span class="o">.</span><span class="na">jwtInMemoryUserDetailsService</span><span class="o">.</span><span class="na">loadUserByUsername</span><span class="o">(</span><span class="n">username</span><span class="o">);</span>

            <span class="k">if</span> <span class="o">(</span><span class="n">jwtTokenUtil</span><span class="o">.</span><span class="na">validateToken</span><span class="o">(</span><span class="n">jwtToken</span><span class="o">,</span> <span class="n">userDetails</span><span class="o">))</span> <span class="o">{</span>
                <span class="n">UsernamePasswordAuthenticationToken</span> <span class="n">usernamePasswordAuthenticationToken</span> <span class="o">=</span> <span class="k">new</span> <span class="n">UsernamePasswordAuthenticationToken</span><span class="o">(</span><span class="n">userDetails</span><span class="o">,</span> <span class="kc">null</span><span class="o">,</span> <span class="n">userDetails</span><span class="o">.</span><span class="na">getAuthorities</span><span class="o">());</span>
                <span class="n">usernamePasswordAuthenticationToken</span><span class="o">.</span><span class="na">setDetails</span><span class="o">(</span><span class="k">new</span> <span class="n">WebAuthenticationDetailsSource</span><span class="o">().</span><span class="na">buildDetails</span><span class="o">(</span><span class="n">request</span><span class="o">));</span>
                <span class="n">SecurityContextHolder</span><span class="o">.</span><span class="na">getContext</span><span class="o">().</span><span class="na">setAuthentication</span><span class="o">(</span><span class="n">usernamePasswordAuthenticationToken</span><span class="o">);</span>
            <span class="o">}</span>
        <span class="o">}</span>

        <span class="n">chain</span><span class="o">.</span><span class="na">doFilter</span><span class="o">(</span><span class="n">request</span><span class="o">,</span> <span class="n">response</span><span class="o">);</span>
    <span class="o">}</span>
<span class="o">}</span>


<span class="nd">@Component</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtTokenUtil</span> <span class="kd">implements</span> <span class="n">Serializable</span> <span class="o">{</span>

  <span class="kd">static</span> <span class="kd">final</span> <span class="n">String</span> <span class="n">CLAIM_KEY_USERNAME</span> <span class="o">=</span> <span class="s">&quot;sub&quot;</span><span class="o">;</span>
  <span class="kd">static</span> <span class="kd">final</span> <span class="n">String</span> <span class="n">CLAIM_KEY_CREATED</span> <span class="o">=</span> <span class="s">&quot;iat&quot;</span><span class="o">;</span>
  <span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="kt">long</span> <span class="n">serialVersionUID</span> <span class="o">=</span> <span class="o">-</span><span class="mi">3301605591108950415L</span><span class="o">;</span>
  <span class="kd">private</span> <span class="n">Clock</span> <span class="n">clock</span> <span class="o">=</span> <span class="n">DefaultClock</span><span class="o">.</span><span class="na">INSTANCE</span><span class="o">;</span>

  <span class="nd">@Value</span><span class="o">(</span><span class="s">&quot;${jwt.signing.key.secret}&quot;</span><span class="o">)</span>
  <span class="kd">private</span> <span class="n">String</span> <span class="n">secret</span><span class="o">;</span>

  <span class="nd">@Value</span><span class="o">(</span><span class="s">&quot;${jwt.token.expiration.in.seconds}&quot;</span><span class="o">)</span>
  <span class="kd">private</span> <span class="n">Long</span> <span class="n">expiration</span><span class="o">;</span>

  <span class="kd">public</span> <span class="n">String</span> <span class="nf">getUsernameFromToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">getClaimFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">,</span> <span class="n">Claims</span><span class="o">::</span><span class="n">getSubject</span><span class="o">);</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="n">Date</span> <span class="nf">getIssuedAtDateFromToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">getClaimFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">,</span> <span class="n">Claims</span><span class="o">::</span><span class="n">getIssuedAt</span><span class="o">);</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="n">Date</span> <span class="nf">getExpirationDateFromToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">getClaimFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">,</span> <span class="n">Claims</span><span class="o">::</span><span class="n">getExpiration</span><span class="o">);</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="o">&lt;</span><span class="n">T</span><span class="o">&gt;</span> <span class="n">T</span> <span class="nf">getClaimFromToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">,</span> <span class="n">Function</span><span class="o">&lt;</span><span class="n">Claims</span><span class="o">,</span> <span class="n">T</span><span class="o">&gt;</span> <span class="n">claimsResolver</span><span class="o">)</span> <span class="o">{</span>
    <span class="kd">final</span> <span class="n">Claims</span> <span class="n">claims</span> <span class="o">=</span> <span class="n">getAllClaimsFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">);</span>
    <span class="k">return</span> <span class="n">claimsResolver</span><span class="o">.</span><span class="na">apply</span><span class="o">(</span><span class="n">claims</span><span class="o">);</span>
  <span class="o">}</span>

  <span class="kd">private</span> <span class="n">Claims</span> <span class="nf">getAllClaimsFromToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">Jwts</span><span class="o">.</span><span class="na">parser</span><span class="o">().</span><span class="na">setSigningKey</span><span class="o">(</span><span class="n">secret</span><span class="o">).</span><span class="na">parseClaimsJws</span><span class="o">(</span><span class="n">token</span><span class="o">).</span><span class="na">getBody</span><span class="o">();</span>
  <span class="o">}</span>

  <span class="kd">private</span> <span class="n">Boolean</span> <span class="nf">isTokenExpired</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="kd">final</span> <span class="n">Date</span> <span class="n">expiration</span> <span class="o">=</span> <span class="n">getExpirationDateFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">);</span>
    <span class="k">return</span> <span class="n">expiration</span><span class="o">.</span><span class="na">before</span><span class="o">(</span><span class="n">clock</span><span class="o">.</span><span class="na">now</span><span class="o">());</span>
  <span class="o">}</span>

  <span class="kd">private</span> <span class="n">Boolean</span> <span class="nf">ignoreTokenExpiration</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="c1">// here you specify tokens, for that the expiration is ignored</span>
    <span class="k">return</span> <span class="kc">false</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="n">String</span> <span class="nf">generateToken</span><span class="o">(</span><span class="n">UserDetails</span> <span class="n">userDetails</span><span class="o">)</span> <span class="o">{</span>
    <span class="n">Map</span><span class="o">&lt;</span><span class="n">String</span><span class="o">,</span> <span class="n">Object</span><span class="o">&gt;</span> <span class="n">claims</span> <span class="o">=</span> <span class="k">new</span> <span class="n">HashMap</span><span class="o">&lt;&gt;();</span>
    <span class="k">return</span> <span class="n">doGenerateToken</span><span class="o">(</span><span class="n">claims</span><span class="o">,</span> <span class="n">userDetails</span><span class="o">.</span><span class="na">getUsername</span><span class="o">());</span>
  <span class="o">}</span>

  <span class="kd">private</span> <span class="n">String</span> <span class="nf">doGenerateToken</span><span class="o">(</span><span class="n">Map</span><span class="o">&lt;</span><span class="n">String</span><span class="o">,</span> <span class="n">Object</span><span class="o">&gt;</span> <span class="n">claims</span><span class="o">,</span> <span class="n">String</span> <span class="n">subject</span><span class="o">)</span> <span class="o">{</span>
    <span class="kd">final</span> <span class="n">Date</span> <span class="n">createdDate</span> <span class="o">=</span> <span class="n">clock</span><span class="o">.</span><span class="na">now</span><span class="o">();</span>
    <span class="kd">final</span> <span class="n">Date</span> <span class="n">expirationDate</span> <span class="o">=</span> <span class="n">calculateExpirationDate</span><span class="o">(</span><span class="n">createdDate</span><span class="o">);</span>

    <span class="k">return</span> <span class="n">Jwts</span><span class="o">.</span><span class="na">builder</span><span class="o">().</span><span class="na">setClaims</span><span class="o">(</span><span class="n">claims</span><span class="o">).</span><span class="na">setSubject</span><span class="o">(</span><span class="n">subject</span><span class="o">).</span><span class="na">setIssuedAt</span><span class="o">(</span><span class="n">createdDate</span><span class="o">)</span>
        <span class="o">.</span><span class="na">setExpiration</span><span class="o">(</span><span class="n">expirationDate</span><span class="o">).</span><span class="na">signWith</span><span class="o">(</span><span class="n">SignatureAlgorithm</span><span class="o">.</span><span class="na">HS512</span><span class="o">,</span> <span class="n">secret</span><span class="o">).</span><span class="na">compact</span><span class="o">();</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="n">Boolean</span> <span class="nf">canTokenBeRefreshed</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="o">(!</span><span class="n">isTokenExpired</span><span class="o">(</span><span class="n">token</span><span class="o">)</span> <span class="o">||</span> <span class="n">ignoreTokenExpiration</span><span class="o">(</span><span class="n">token</span><span class="o">));</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="n">String</span> <span class="nf">refreshToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
    <span class="kd">final</span> <span class="n">Date</span> <span class="n">createdDate</span> <span class="o">=</span> <span class="n">clock</span><span class="o">.</span><span class="na">now</span><span class="o">();</span>
    <span class="kd">final</span> <span class="n">Date</span> <span class="n">expirationDate</span> <span class="o">=</span> <span class="n">calculateExpirationDate</span><span class="o">(</span><span class="n">createdDate</span><span class="o">);</span>

    <span class="kd">final</span> <span class="n">Claims</span> <span class="n">claims</span> <span class="o">=</span> <span class="n">getAllClaimsFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">);</span>
    <span class="n">claims</span><span class="o">.</span><span class="na">setIssuedAt</span><span class="o">(</span><span class="n">createdDate</span><span class="o">);</span>
    <span class="n">claims</span><span class="o">.</span><span class="na">setExpiration</span><span class="o">(</span><span class="n">expirationDate</span><span class="o">);</span>

    <span class="k">return</span> <span class="n">Jwts</span><span class="o">.</span><span class="na">builder</span><span class="o">().</span><span class="na">setClaims</span><span class="o">(</span><span class="n">claims</span><span class="o">).</span><span class="na">signWith</span><span class="o">(</span><span class="n">SignatureAlgorithm</span><span class="o">.</span><span class="na">HS512</span><span class="o">,</span> <span class="n">secret</span><span class="o">).</span><span class="na">compact</span><span class="o">();</span>
  <span class="o">}</span>

  <span class="kd">public</span> <span class="n">Boolean</span> <span class="nf">validateToken</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">,</span> <span class="n">UserDetails</span> <span class="n">userDetails</span><span class="o">)</span> <span class="o">{</span>
    <span class="n">JwtUserDetails</span> <span class="n">user</span> <span class="o">=</span> <span class="o">(</span><span class="n">JwtUserDetails</span><span class="o">)</span> <span class="n">userDetails</span><span class="o">;</span>
    <span class="kd">final</span> <span class="n">String</span> <span class="n">username</span> <span class="o">=</span> <span class="n">getUsernameFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">);</span>
    <span class="k">return</span> <span class="o">(</span><span class="n">username</span><span class="o">.</span><span class="na">equals</span><span class="o">(</span><span class="n">user</span><span class="o">.</span><span class="na">getUsername</span><span class="o">())</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="n">isTokenExpired</span><span class="o">(</span><span class="n">token</span><span class="o">));</span>
  <span class="o">}</span>

  <span class="kd">private</span> <span class="n">Date</span> <span class="nf">calculateExpirationDate</span><span class="o">(</span><span class="n">Date</span> <span class="n">createdDate</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="k">new</span> <span class="n">Date</span><span class="o">(</span><span class="n">createdDate</span><span class="o">.</span><span class="na">getTime</span><span class="o">()</span> <span class="o">+</span> <span class="n">expiration</span> <span class="o">*</span> <span class="mi">1000</span><span class="o">);</span>
  <span class="o">}</span>
<span class="o">}</span>

<span class="nd">@Component</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtUnAuthorizedResponseAuthenticationEntryPoint</span> <span class="kd">implements</span> <span class="n">AuthenticationEntryPoint</span><span class="o">,</span> <span class="n">Serializable</span> <span class="o">{</span>

  <span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="kt">long</span> <span class="n">serialVersionUID</span> <span class="o">=</span> <span class="o">-</span><span class="mi">8970718410437077606L</span><span class="o">;</span>

  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="kt">void</span> <span class="nf">commence</span><span class="o">(</span><span class="n">HttpServletRequest</span> <span class="n">request</span><span class="o">,</span> <span class="n">HttpServletResponse</span> <span class="n">response</span><span class="o">,</span>
      <span class="n">AuthenticationException</span> <span class="n">authException</span><span class="o">)</span> <span class="kd">throws</span> <span class="n">IOException</span> <span class="o">{</span>
    <span class="n">response</span><span class="o">.</span><span class="na">sendError</span><span class="o">(</span><span class="n">HttpServletResponse</span><span class="o">.</span><span class="na">SC_UNAUTHORIZED</span><span class="o">,</span>
        <span class="s">&quot;You would need to provide the Jwt Token to Access This resource&quot;</span><span class="o">);</span>
  <span class="o">}</span>
<span class="o">}</span>


<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtUserDetails</span> <span class="kd">implements</span> <span class="n">UserDetails</span> <span class="o">{</span>

  <span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="kt">long</span> <span class="n">serialVersionUID</span> <span class="o">=</span> <span class="mi">5155720064139820502L</span><span class="o">;</span>

  <span class="kd">private</span> <span class="kd">final</span> <span class="n">Long</span> <span class="n">id</span><span class="o">;</span>
  <span class="kd">private</span> <span class="kd">final</span> <span class="n">String</span> <span class="n">username</span><span class="o">;</span>
  <span class="kd">private</span> <span class="kd">final</span> <span class="n">String</span> <span class="n">password</span><span class="o">;</span>
  <span class="kd">private</span> <span class="kd">final</span> <span class="n">Collection</span><span class="o">&lt;?</span> <span class="kd">extends</span> <span class="n">GrantedAuthority</span><span class="o">&gt;</span> <span class="n">authorities</span><span class="o">;</span>

  <span class="kd">public</span> <span class="nf">JwtUserDetails</span><span class="o">(</span><span class="n">Long</span> <span class="n">id</span><span class="o">,</span> <span class="n">String</span> <span class="n">username</span><span class="o">,</span> <span class="n">String</span> <span class="n">password</span><span class="o">,</span> <span class="n">String</span> <span class="n">role</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">this</span><span class="o">.</span><span class="na">id</span> <span class="o">=</span> <span class="n">id</span><span class="o">;</span>
    <span class="k">this</span><span class="o">.</span><span class="na">username</span> <span class="o">=</span> <span class="n">username</span><span class="o">;</span>
    <span class="k">this</span><span class="o">.</span><span class="na">password</span> <span class="o">=</span> <span class="n">password</span><span class="o">;</span>

    <span class="n">List</span><span class="o">&lt;</span><span class="n">SimpleGrantedAuthority</span><span class="o">&gt;</span> <span class="n">authorities</span> <span class="o">=</span> <span class="k">new</span> <span class="n">ArrayList</span><span class="o">&lt;</span><span class="n">SimpleGrantedAuthority</span><span class="o">&gt;();</span>
    <span class="n">authorities</span><span class="o">.</span><span class="na">add</span><span class="o">(</span><span class="k">new</span> <span class="n">SimpleGrantedAuthority</span><span class="o">(</span><span class="n">role</span><span class="o">));</span>

    <span class="k">this</span><span class="o">.</span><span class="na">authorities</span> <span class="o">=</span> <span class="n">authorities</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@JsonIgnore</span>
  <span class="kd">public</span> <span class="n">Long</span> <span class="nf">getId</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">id</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="n">String</span> <span class="nf">getUsername</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">username</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@JsonIgnore</span>
  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="kt">boolean</span> <span class="nf">isAccountNonExpired</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="kc">true</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@JsonIgnore</span>
  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="kt">boolean</span> <span class="nf">isAccountNonLocked</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="kc">true</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@JsonIgnore</span>
  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="kt">boolean</span> <span class="nf">isCredentialsNonExpired</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="kc">true</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@JsonIgnore</span>
  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="n">String</span> <span class="nf">getPassword</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">password</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="n">Collection</span><span class="o">&lt;?</span> <span class="kd">extends</span> <span class="n">GrantedAuthority</span><span class="o">&gt;</span> <span class="nf">getAuthorities</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">authorities</span><span class="o">;</span>
  <span class="o">}</span>

  <span class="nd">@Override</span>
  <span class="kd">public</span> <span class="kt">boolean</span> <span class="nf">isEnabled</span><span class="o">()</span> <span class="o">{</span>
    <span class="k">return</span> <span class="kc">true</span><span class="o">;</span>
  <span class="o">}</span>

<span class="o">}</span>


<span class="nd">@Configuration</span>
<span class="nd">@EnableWebSecurity</span>
<span class="nd">@EnableGlobalMethodSecurity</span><span class="o">(</span><span class="n">prePostEnabled</span> <span class="o">=</span> <span class="kc">true</span><span class="o">)</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JWTWebSecurityConfig</span> <span class="kd">extends</span> <span class="n">WebSecurityConfigurerAdapter</span> <span class="o">{</span>

    <span class="nd">@Autowired</span>
    <span class="kd">private</span> <span class="n">JwtUnAuthorizedResponseAuthenticationEntryPoint</span> <span class="n">jwtUnAuthorizedResponseAuthenticationEntryPoint</span><span class="o">;</span>

    <span class="nd">@Autowired</span>
    <span class="kd">private</span> <span class="n">UserDetailsService</span> <span class="n">jwtInMemoryUserDetailsService</span><span class="o">;</span>

    <span class="nd">@Autowired</span>
    <span class="kd">private</span> <span class="n">JwtTokenAuthorizationOncePerRequestFilter</span> <span class="n">jwtAuthenticationTokenFilter</span><span class="o">;</span>

    <span class="nd">@Value</span><span class="o">(</span><span class="s">&quot;${jwt.get.token.uri}&quot;</span><span class="o">)</span>
    <span class="kd">private</span> <span class="n">String</span> <span class="n">authenticationPath</span><span class="o">;</span>

    <span class="nd">@Autowired</span>
    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">configureGlobal</span><span class="o">(</span><span class="n">AuthenticationManagerBuilder</span> <span class="n">auth</span><span class="o">)</span> <span class="kd">throws</span> <span class="n">Exception</span> <span class="o">{</span>
        <span class="n">auth</span>
            <span class="o">.</span><span class="na">userDetailsService</span><span class="o">(</span><span class="n">jwtInMemoryUserDetailsService</span><span class="o">)</span>
            <span class="o">.</span><span class="na">passwordEncoder</span><span class="o">(</span><span class="n">passwordEncoderBean</span><span class="o">());</span>
    <span class="o">}</span>

    <span class="nd">@Bean</span>
    <span class="kd">public</span> <span class="n">PasswordEncoder</span> <span class="nf">passwordEncoderBean</span><span class="o">()</span> <span class="o">{</span>
        <span class="k">return</span> <span class="k">new</span> <span class="n">BCryptPasswordEncoder</span><span class="o">();</span>
    <span class="o">}</span>

    <span class="nd">@Bean</span>
    <span class="nd">@Override</span>
    <span class="kd">public</span> <span class="n">AuthenticationManager</span> <span class="nf">authenticationManagerBean</span><span class="o">()</span> <span class="kd">throws</span> <span class="n">Exception</span> <span class="o">{</span>
        <span class="k">return</span> <span class="kd">super</span><span class="o">.</span><span class="na">authenticationManagerBean</span><span class="o">();</span>
    <span class="o">}</span>

    <span class="nd">@Override</span>
    <span class="kd">protected</span> <span class="kt">void</span> <span class="nf">configure</span><span class="o">(</span><span class="n">HttpSecurity</span> <span class="n">httpSecurity</span><span class="o">)</span> <span class="kd">throws</span> <span class="n">Exception</span> <span class="o">{</span>
        <span class="n">httpSecurity</span>
            <span class="o">.</span><span class="na">csrf</span><span class="o">().</span><span class="na">disable</span><span class="o">()</span>
            <span class="o">.</span><span class="na">exceptionHandling</span><span class="o">().</span><span class="na">authenticationEntryPoint</span><span class="o">(</span><span class="n">jwtUnAuthorizedResponseAuthenticationEntryPoint</span><span class="o">).</span><span class="na">and</span><span class="o">()</span>
            <span class="o">.</span><span class="na">sessionManagement</span><span class="o">().</span><span class="na">sessionCreationPolicy</span><span class="o">(</span><span class="n">SessionCreationPolicy</span><span class="o">.</span><span class="na">STATELESS</span><span class="o">).</span><span class="na">and</span><span class="o">()</span>
            <span class="o">.</span><span class="na">authorizeRequests</span><span class="o">()</span>
            <span class="o">.</span><span class="na">anyRequest</span><span class="o">().</span><span class="na">authenticated</span><span class="o">();</span>

       <span class="n">httpSecurity</span>
            <span class="o">.</span><span class="na">addFilterBefore</span><span class="o">(</span><span class="n">jwtAuthenticationTokenFilter</span><span class="o">,</span> <span class="n">UsernamePasswordAuthenticationFilter</span><span class="o">.</span><span class="na">class</span><span class="o">);</span>

        <span class="n">httpSecurity</span>
            <span class="o">.</span><span class="na">headers</span><span class="o">()</span>
            <span class="o">.</span><span class="na">frameOptions</span><span class="o">().</span><span class="na">sameOrigin</span><span class="o">()</span>  <span class="c1">//H2 Console Needs this setting</span>
            <span class="o">.</span><span class="na">cacheControl</span><span class="o">();</span> <span class="c1">//disable caching</span>
    <span class="o">}</span>

    <span class="nd">@Override</span>
    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">configure</span><span class="o">(</span><span class="n">WebSecurity</span> <span class="n">webSecurity</span><span class="o">)</span> <span class="kd">throws</span> <span class="n">Exception</span> <span class="o">{</span>
        <span class="n">webSecurity</span>
            <span class="o">.</span><span class="na">ignoring</span><span class="o">()</span>
            <span class="o">.</span><span class="na">antMatchers</span><span class="o">(</span>
                <span class="n">HttpMethod</span><span class="o">.</span><span class="na">POST</span><span class="o">,</span>
                <span class="n">authenticationPath</span>
            <span class="o">)</span>
            <span class="o">.</span><span class="na">antMatchers</span><span class="o">(</span><span class="n">HttpMethod</span><span class="o">.</span><span class="na">OPTIONS</span><span class="o">,</span> <span class="s">&quot;/**&quot;</span><span class="o">)</span>
            <span class="o">.</span><span class="na">and</span><span class="o">()</span>
            <span class="o">.</span><span class="na">ignoring</span><span class="o">()</span>
            <span class="o">.</span><span class="na">antMatchers</span><span class="o">(</span>
                <span class="n">HttpMethod</span><span class="o">.</span><span class="na">GET</span><span class="o">,</span>
                <span class="s">&quot;/&quot;</span> <span class="c1">//Other Stuff You want to Ignore</span>
            <span class="o">)</span>
            <span class="o">.</span><span class="na">and</span><span class="o">()</span>
            <span class="o">.</span><span class="na">ignoring</span><span class="o">()</span>
            <span class="o">.</span><span class="na">antMatchers</span><span class="o">(</span><span class="s">&quot;/h2-console/**/**&quot;</span><span class="o">);</span><span class="c1">//Should not be in Production!</span>
    <span class="o">}</span>
<span class="o">}</span>

<span class="nd">@RestController</span>
<span class="nd">@CrossOrigin</span><span class="o">(</span><span class="n">origins</span><span class="o">=</span><span class="s">&quot;http://localhost:4200&quot;</span><span class="o">)</span>
<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtAuthenticationRestController</span> <span class="o">{</span>

  <span class="nd">@Value</span><span class="o">(</span><span class="s">&quot;${jwt.http.request.header}&quot;</span><span class="o">)</span>
  <span class="kd">private</span> <span class="n">String</span> <span class="n">tokenHeader</span><span class="o">;</span>

  <span class="nd">@Autowired</span>
  <span class="kd">private</span> <span class="n">AuthenticationManager</span> <span class="n">authenticationManager</span><span class="o">;</span>

  <span class="nd">@Autowired</span>
  <span class="kd">private</span> <span class="n">JwtTokenUtil</span> <span class="n">jwtTokenUtil</span><span class="o">;</span>

  <span class="nd">@Autowired</span>
  <span class="kd">private</span> <span class="n">UserDetailsService</span> <span class="n">jwtInMemoryUserDetailsService</span><span class="o">;</span>

  <span class="nd">@RequestMapping</span><span class="o">(</span><span class="n">value</span> <span class="o">=</span> <span class="s">&quot;${jwt.get.token.uri}&quot;</span><span class="o">,</span> <span class="n">method</span> <span class="o">=</span> <span class="n">RequestMethod</span><span class="o">.</span><span class="na">POST</span><span class="o">)</span>
  <span class="kd">public</span> <span class="n">ResponseEntity</span><span class="o">&lt;?&gt;</span> <span class="n">createAuthenticationToken</span><span class="o">(</span><span class="nd">@RequestBody</span> <span class="n">JwtTokenRequest</span> <span class="n">authenticationRequest</span><span class="o">)</span>
      <span class="kd">throws</span> <span class="n">AuthenticationException</span> <span class="o">{</span>

    <span class="n">authenticate</span><span class="o">(</span><span class="n">authenticationRequest</span><span class="o">.</span><span class="na">getUsername</span><span class="o">(),</span> <span class="n">authenticationRequest</span><span class="o">.</span><span class="na">getPassword</span><span class="o">());</span>

    <span class="kd">final</span> <span class="n">UserDetails</span> <span class="n">userDetails</span> <span class="o">=</span> <span class="n">jwtInMemoryUserDetailsService</span><span class="o">.</span><span class="na">loadUserByUsername</span><span class="o">(</span><span class="n">authenticationRequest</span><span class="o">.</span><span class="na">getUsername</span><span class="o">());</span>

    <span class="kd">final</span> <span class="n">String</span> <span class="n">token</span> <span class="o">=</span> <span class="n">jwtTokenUtil</span><span class="o">.</span><span class="na">generateToken</span><span class="o">(</span><span class="n">userDetails</span><span class="o">);</span>

    <span class="k">return</span> <span class="n">ResponseEntity</span><span class="o">.</span><span class="na">ok</span><span class="o">(</span><span class="k">new</span> <span class="n">JwtTokenResponse</span><span class="o">(</span><span class="n">token</span><span class="o">));</span>
  <span class="o">}</span>

  <span class="nd">@RequestMapping</span><span class="o">(</span><span class="n">value</span> <span class="o">=</span> <span class="s">&quot;${jwt.refresh.token.uri}&quot;</span><span class="o">,</span> <span class="n">method</span> <span class="o">=</span> <span class="n">RequestMethod</span><span class="o">.</span><span class="na">GET</span><span class="o">)</span>
  <span class="kd">public</span> <span class="n">ResponseEntity</span><span class="o">&lt;?&gt;</span> <span class="n">refreshAndGetAuthenticationToken</span><span class="o">(</span><span class="n">HttpServletRequest</span> <span class="n">request</span><span class="o">)</span> <span class="o">{</span>
    <span class="n">String</span> <span class="n">authToken</span> <span class="o">=</span> <span class="n">request</span><span class="o">.</span><span class="na">getHeader</span><span class="o">(</span><span class="n">tokenHeader</span><span class="o">);</span>
    <span class="kd">final</span> <span class="n">String</span> <span class="n">token</span> <span class="o">=</span> <span class="n">authToken</span><span class="o">.</span><span class="na">substring</span><span class="o">(</span><span class="mi">7</span><span class="o">);</span>
    <span class="n">String</span> <span class="n">username</span> <span class="o">=</span> <span class="n">jwtTokenUtil</span><span class="o">.</span><span class="na">getUsernameFromToken</span><span class="o">(</span><span class="n">token</span><span class="o">);</span>
    <span class="n">JwtUserDetails</span> <span class="n">user</span> <span class="o">=</span> <span class="o">(</span><span class="n">JwtUserDetails</span><span class="o">)</span> <span class="n">jwtInMemoryUserDetailsService</span><span class="o">.</span><span class="na">loadUserByUsername</span><span class="o">(</span><span class="n">username</span><span class="o">);</span>

    <span class="k">if</span> <span class="o">(</span><span class="n">jwtTokenUtil</span><span class="o">.</span><span class="na">canTokenBeRefreshed</span><span class="o">(</span><span class="n">token</span><span class="o">))</span> <span class="o">{</span>
      <span class="n">String</span> <span class="n">refreshedToken</span> <span class="o">=</span> <span class="n">jwtTokenUtil</span><span class="o">.</span><span class="na">refreshToken</span><span class="o">(</span><span class="n">token</span><span class="o">);</span>
      <span class="k">return</span> <span class="n">ResponseEntity</span><span class="o">.</span><span class="na">ok</span><span class="o">(</span><span class="k">new</span> <span class="n">JwtTokenResponse</span><span class="o">(</span><span class="n">refreshedToken</span><span class="o">));</span>
    <span class="o">}</span> <span class="k">else</span> <span class="o">{</span>
      <span class="k">return</span> <span class="n">ResponseEntity</span><span class="o">.</span><span class="na">badRequest</span><span class="o">().</span><span class="na">body</span><span class="o">(</span><span class="kc">null</span><span class="o">);</span>
    <span class="o">}</span>
  <span class="o">}</span>

  <span class="nd">@ExceptionHandler</span><span class="o">({</span> <span class="n">AuthenticationException</span><span class="o">.</span><span class="na">class</span> <span class="o">})</span>
  <span class="kd">public</span> <span class="n">ResponseEntity</span><span class="o">&lt;</span><span class="n">String</span><span class="o">&gt;</span> <span class="nf">handleAuthenticationException</span><span class="o">(</span><span class="n">AuthenticationException</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
    <span class="k">return</span> <span class="n">ResponseEntity</span><span class="o">.</span><span class="na">status</span><span class="o">(</span><span class="n">HttpStatus</span><span class="o">.</span><span class="na">UNAUTHORIZED</span><span class="o">).</span><span class="na">body</span><span class="o">(</span><span class="n">e</span><span class="o">.</span><span class="na">getMessage</span><span class="o">());</span>
  <span class="o">}</span>

  <span class="kd">private</span> <span class="kt">void</span> <span class="nf">authenticate</span><span class="o">(</span><span class="n">String</span> <span class="n">username</span><span class="o">,</span> <span class="n">String</span> <span class="n">password</span><span class="o">)</span> <span class="o">{</span>
    <span class="n">Objects</span><span class="o">.</span><span class="na">requireNonNull</span><span class="o">(</span><span class="n">username</span><span class="o">);</span>
    <span class="n">Objects</span><span class="o">.</span><span class="na">requireNonNull</span><span class="o">(</span><span class="n">password</span><span class="o">);</span>

    <span class="k">try</span> <span class="o">{</span>
      <span class="n">authenticationManager</span><span class="o">.</span><span class="na">authenticate</span><span class="o">(</span><span class="k">new</span> <span class="n">UsernamePasswordAuthenticationToken</span><span class="o">(</span><span class="n">username</span><span class="o">,</span> <span class="n">password</span><span class="o">));</span>
    <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">DisabledException</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
      <span class="k">throw</span> <span class="k">new</span> <span class="n">AuthenticationException</span><span class="o">(</span><span class="s">&quot;USER_DISABLED&quot;</span><span class="o">,</span> <span class="n">e</span><span class="o">);</span>
    <span class="o">}</span> <span class="k">catch</span> <span class="o">(</span><span class="n">BadCredentialsException</span> <span class="n">e</span><span class="o">)</span> <span class="o">{</span>
      <span class="k">throw</span> <span class="k">new</span> <span class="n">AuthenticationException</span><span class="o">(</span><span class="s">&quot;INVALID_CREDENTIALS&quot;</span><span class="o">,</span> <span class="n">e</span><span class="o">);</span>
    <span class="o">}</span>
  <span class="o">}</span>
<span class="o">}</span>

<span class="kd">public</span> <span class="kd">class</span> <span class="nc">AuthenticationException</span> <span class="kd">extends</span> <span class="n">RuntimeException</span> <span class="o">{</span>
    <span class="kd">public</span> <span class="nf">AuthenticationException</span><span class="o">(</span><span class="n">String</span> <span class="n">message</span><span class="o">,</span> <span class="n">Throwable</span> <span class="n">cause</span><span class="o">)</span> <span class="o">{</span>
        <span class="kd">super</span><span class="o">(</span><span class="n">message</span><span class="o">,</span> <span class="n">cause</span><span class="o">);</span>
    <span class="o">}</span>
<span class="o">}</span>

<span class="kd">public</span> <span class="kd">class</span>  <span class="nc">JwtTokenRequest</span> <span class="kd">implements</span> <span class="n">Serializable</span> <span class="o">{</span>

  <span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="kt">long</span> <span class="n">serialVersionUID</span> <span class="o">=</span> <span class="o">-</span><span class="mi">5616176897013108345L</span><span class="o">;</span>

  <span class="kd">private</span> <span class="n">String</span> <span class="n">username</span><span class="o">;</span>
    <span class="kd">private</span> <span class="n">String</span> <span class="n">password</span><span class="o">;</span>

    <span class="kd">public</span> <span class="nf">JwtTokenRequest</span><span class="o">()</span> <span class="o">{</span>
        <span class="kd">super</span><span class="o">();</span>
    <span class="o">}</span>

    <span class="kd">public</span> <span class="nf">JwtTokenRequest</span><span class="o">(</span><span class="n">String</span> <span class="n">username</span><span class="o">,</span> <span class="n">String</span> <span class="n">password</span><span class="o">)</span> <span class="o">{</span>
        <span class="k">this</span><span class="o">.</span><span class="na">setUsername</span><span class="o">(</span><span class="n">username</span><span class="o">);</span>
        <span class="k">this</span><span class="o">.</span><span class="na">setPassword</span><span class="o">(</span><span class="n">password</span><span class="o">);</span>
    <span class="o">}</span>

    <span class="kd">public</span> <span class="n">String</span> <span class="nf">getUsername</span><span class="o">()</span> <span class="o">{</span>
        <span class="k">return</span> <span class="k">this</span><span class="o">.</span><span class="na">username</span><span class="o">;</span>
    <span class="o">}</span>

    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">setUsername</span><span class="o">(</span><span class="n">String</span> <span class="n">username</span><span class="o">)</span> <span class="o">{</span>
        <span class="k">this</span><span class="o">.</span><span class="na">username</span> <span class="o">=</span> <span class="n">username</span><span class="o">;</span>
    <span class="o">}</span>

    <span class="kd">public</span> <span class="n">String</span> <span class="nf">getPassword</span><span class="o">()</span> <span class="o">{</span>
        <span class="k">return</span> <span class="k">this</span><span class="o">.</span><span class="na">password</span><span class="o">;</span>
    <span class="o">}</span>

    <span class="kd">public</span> <span class="kt">void</span> <span class="nf">setPassword</span><span class="o">(</span><span class="n">String</span> <span class="n">password</span><span class="o">)</span> <span class="o">{</span>
        <span class="k">this</span><span class="o">.</span><span class="na">password</span> <span class="o">=</span> <span class="n">password</span><span class="o">;</span>
    <span class="o">}</span>
<span class="o">}</span>

<span class="kd">public</span> <span class="kd">class</span> <span class="nc">JwtTokenResponse</span> <span class="kd">implements</span> <span class="n">Serializable</span> <span class="o">{</span>

  <span class="kd">private</span> <span class="kd">static</span> <span class="kd">final</span> <span class="kt">long</span> <span class="n">serialVersionUID</span> <span class="o">=</span> <span class="mi">8317676219297719109L</span><span class="o">;</span>

  <span class="kd">private</span> <span class="kd">final</span> <span class="n">String</span> <span class="n">token</span><span class="o">;</span>

    <span class="kd">public</span> <span class="nf">JwtTokenResponse</span><span class="o">(</span><span class="n">String</span> <span class="n">token</span><span class="o">)</span> <span class="o">{</span>
        <span class="k">this</span><span class="o">.</span><span class="na">token</span> <span class="o">=</span> <span class="n">token</span><span class="o">;</span>
    <span class="o">}</span>

    <span class="kd">public</span> <span class="n">String</span> <span class="nf">getToken</span><span class="o">()</span> <span class="o">{</span>
        <span class="k">return</span> <span class="k">this</span><span class="o">.</span><span class="na">token</span><span class="o">;</span>
    <span class="o">}</span>
<span class="o">}</span>
</pre></div><a class="headerlink" href="#package-comin28minutestodoservicesjwt-import-javautilarraylist-import-javautillist-import-javautiloptional-import-orgspringframeworksecuritycoreuserdetailsuserdetails-import-orgspringframeworksecuritycoreuserdetailsuserdetailsservice-import-orgspringframeworksecuritycoreuserdetailsusernamenotfoundexception-import-orgspringframeworkstereotypeservice-service-public-class-jwtinmemoryuserdetailsservice-implements-userdetailsservice-static-listjwtuserdetails-inmemoryuserlist-new-arraylist-static-inmemoryuserlistaddnew-jwtuserdetails1l-in28minutes-2a103zhzbnpv1hfzbleu5qsdojutk2je6w6pnnnyc1ujwpczh4pl6e-role_user_2-override-public-userdetails-loaduserbyusernamestring-username-throws-usernamenotfoundexception-optionaljwtuserdetails-findfirst-inmemoryuserliststream-filteruser-usergetusernameequalsusernamefindfirst-if-findfirstispresent-throw-new-usernamenotfoundexceptionstringformatuser_not_found-s-username-return-findfirstget-component-public-class-jwttokenauthorizationonceperrequestfilter-extends-onceperrequestfilter-private-final-logger-logger-loggerfactorygetloggerthisgetclass-autowired-private-userdetailsservice-jwtinmemoryuserdetailsservice-autowired-private-jwttokenutil-jwttokenutil-valuejwthttprequestheader-private-string-tokenheader-override-protected-void-dofilterinternalhttpservletrequest-request-httpservletresponse-response-filterchain-chain-throws-servletexception-ioexception-loggerdebugauthentication-request-for-requestgetrequesturl-final-string-requesttokenheader-requestgetheaderthistokenheader-string-username-null-string-jwttoken-null-if-requesttokenheader-null-requesttokenheaderstartswithbearer-jwttoken-requesttokenheadersubstring7-try-username-jwttokenutilgetusernamefromtokenjwttoken-catch-illegalargumentexception-e-loggererrorjwt_token_unable_to_get_username-e-catch-expiredjwtexception-e-loggerwarnjwt_token_expired-e-else-loggerwarnjwt_token_does_not_start_with_bearer_string-loggerdebugjwt_token_username_value-username-if-username-null-securitycontextholdergetcontextgetauthentication-null-userdetails-userdetails-thisjwtinmemoryuserdetailsserviceloaduserbyusernameusername-if-jwttokenutilvalidatetokenjwttoken-userdetails-usernamepasswordauthenticationtoken-usernamepasswordauthenticationtoken-new-usernamepasswordauthenticationtokenuserdetails-null-userdetailsgetauthorities-usernamepasswordauthenticationtokensetdetailsnew-webauthenticationdetailssourcebuilddetailsrequest-securitycontextholdergetcontextsetauthenticationusernamepasswordauthenticationtoken-chaindofilterrequest-response-component-public-class-jwttokenutil-implements-serializable-static-final-string-claim_key_username-sub-static-final-string-claim_key_created-iat-private-static-final-long-serialversionuid-3301605591108950415l-private-clock-clock-defaultclockinstance-valuejwtsigningkeysecret-private-string-secret-valuejwttokenexpirationinseconds-private-long-expiration-public-string-getusernamefromtokenstring-token-return-getclaimfromtokentoken-claimsgetsubject-public-date-getissuedatdatefromtokenstring-token-return-getclaimfromtokentoken-claimsgetissuedat-public-date-getexpirationdatefromtokenstring-token-return-getclaimfromtokentoken-claimsgetexpiration-public-t-t-getclaimfromtokenstring-token-functionclaims-t-claimsresolver-final-claims-claims-getallclaimsfromtokentoken-return-claimsresolverapplyclaims-private-claims-getallclaimsfromtokenstring-token-return-jwtsparsersetsigningkeysecretparseclaimsjwstokengetbody-private-boolean-istokenexpiredstring-token-final-date-expiration-getexpirationdatefromtokentoken-return-expirationbeforeclocknow-private-boolean-ignoretokenexpirationstring-token-here-you-specify-tokens-for-that-the-expiration-is-ignored-return-false-public-string-generatetokenuserdetails-userdetails-mapstring-object-claims-new-hashmap-return-dogeneratetokenclaims-userdetailsgetusername-private-string-dogeneratetokenmapstring-object-claims-string-subject-final-date-createddate-clocknow-final-date-expirationdate-calculateexpirationdatecreateddate-return-jwtsbuildersetclaimsclaimssetsubjectsubjectsetissuedatcreateddate-setexpirationexpirationdatesignwithsignaturealgorithmhs512-secretcompact-public-boolean-cantokenberefreshedstring-token-return-istokenexpiredtoken-ignoretokenexpirationtoken-public-string-refreshtokenstring-token-final-date-createddate-clocknow-final-date-expirationdate-calculateexpirationdatecreateddate-final-claims-claims-getallclaimsfromtokentoken-claimssetissuedatcreateddate-claimssetexpirationexpirationdate-return-jwtsbuildersetclaimsclaimssignwithsignaturealgorithmhs512-secretcompact-public-boolean-validatetokenstring-token-userdetails-userdetails-jwtuserdetails-user-jwtuserdetails-userdetails-final-string-username-getusernamefromtokentoken-return-usernameequalsusergetusername-istokenexpiredtoken-private-date-calculateexpirationdatedate-createddate-return-new-datecreateddategettime-expiration-1000-component-public-class-jwtunauthorizedresponseauthenticationentrypoint-implements-authenticationentrypoint-serializable-private-static-final-long-serialversionuid-8970718410437077606l-override-public-void-commencehttpservletrequest-request-httpservletresponse-response-authenticationexception-authexception-throws-ioexception-responsesenderrorhttpservletresponsesc_unauthorized-you-would-need-to-provide-the-jwt-token-to-access-this-resource-public-class-jwtuserdetails-implements-userdetails-private-static-final-long-serialversionuid-5155720064139820502l-private-final-long-id-private-final-string-username-private-final-string-password-private-final-collection-extends-grantedauthority-authorities-public-jwtuserdetailslong-id-string-username-string-password-string-role-thisid-id-thisusername-username-thispassword-password-listsimplegrantedauthority-authorities-new-arraylistsimplegrantedauthority-authoritiesaddnew-simplegrantedauthorityrole-thisauthorities-authorities-jsonignore-public-long-getid-return-id-override-public-string-getusername-return-username-jsonignore-override-public-boolean-isaccountnonexpired-return-true-jsonignore-override-public-boolean-isaccountnonlocked-return-true-jsonignore-override-public-boolean-iscredentialsnonexpired-return-true-jsonignore-override-public-string-getpassword-return-password-override-public-collection-extends-grantedauthority-getauthorities-return-authorities-override-public-boolean-isenabled-return-true-configuration-enablewebsecurity-enableglobalmethodsecurityprepostenabled-true-public-class-jwtwebsecurityconfig-extends-websecurityconfigureradapter-autowired-private-jwtunauthorizedresponseauthenticationentrypoint-jwtunauthorizedresponseauthenticationentrypoint-autowired-private-userdetailsservice-jwtinmemoryuserdetailsservice-autowired-private-jwttokenauthorizationonceperrequestfilter-jwtauthenticationtokenfilter-valuejwtgettokenuri-private-string-authenticationpath-autowired-public-void-configureglobalauthenticationmanagerbuilder-auth-throws-exception-auth-userdetailsservicejwtinmemoryuserdetailsservice-passwordencoderpasswordencoderbean-bean-public-passwordencoder-passwordencoderbean-return-new-bcryptpasswordencoder-bean-override-public-authenticationmanager-authenticationmanagerbean-throws-exception-return-superauthenticationmanagerbean-override-protected-void-configurehttpsecurity-httpsecurity-throws-exception-httpsecurity-csrfdisable-exceptionhandlingauthenticationentrypointjwtunauthorizedresponseauthenticationentrypointand-sessionmanagementsessioncreationpolicysessioncreationpolicystatelessand-authorizerequests-anyrequestauthenticated-httpsecurity-addfilterbeforejwtauthenticationtokenfilter-usernamepasswordauthenticationfilterclass-httpsecurity-headers-frameoptionssameorigin-h2-console-needs-this-setting-cachecontrol-disable-caching-override-public-void-configurewebsecurity-websecurity-throws-exception-websecurity-ignoring-antmatchers-httpmethodpost-authenticationpath-antmatchershttpmethodoptions-and-ignoring-antmatchers-httpmethodget-other-stuff-you-want-to-ignore-and-ignoring-antmatchersh2-consoleshould-not-be-in-production-restcontroller-crossoriginoriginshttplocalhost4200-public-class-jwtauthenticationrestcontroller-valuejwthttprequestheader-private-string-tokenheader-autowired-private-authenticationmanager-authenticationmanager-autowired-private-jwttokenutil-jwttokenutil-autowired-private-userdetailsservice-jwtinmemoryuserdetailsservice-requestmappingvalue-jwtgettokenuri-method-requestmethodpost-public-responseentity-createauthenticationtokenrequestbody-jwttokenrequest-authenticationrequest-throws-authenticationexception-authenticateauthenticationrequestgetusername-authenticationrequestgetpassword-final-userdetails-userdetails-jwtinmemoryuserdetailsserviceloaduserbyusernameauthenticationrequestgetusername-final-string-token-jwttokenutilgeneratetokenuserdetails-return-responseentityoknew-jwttokenresponsetoken-requestmappingvalue-jwtrefreshtokenuri-method-requestmethodget-public-responseentity-refreshandgetauthenticationtokenhttpservletrequest-request-string-authtoken-requestgetheadertokenheader-final-string-token-authtokensubstring7-string-username-jwttokenutilgetusernamefromtokentoken-jwtuserdetails-user-jwtuserdetails-jwtinmemoryuserdetailsserviceloaduserbyusernameusername-if-jwttokenutilcantokenberefreshedtoken-string-refreshedtoken-jwttokenutilrefreshtokentoken-return-responseentityoknew-jwttokenresponserefreshedtoken-else-return-responseentitybadrequestbodynull-exceptionhandler-authenticationexceptionclass-public-responseentitystring-handleauthenticationexceptionauthenticationexception-e-return-responseentitystatushttpstatusunauthorizedbodyegetmessage-private-void-authenticatestring-username-string-password-objectsrequirenonnullusername-objectsrequirenonnullpassword-try-authenticationmanagerauthenticatenew-usernamepasswordauthenticationtokenusername-password-catch-disabledexception-e-throw-new-authenticationexceptionuser_disabled-e-catch-badcredentialsexception-e-throw-new-authenticationexceptioninvalid_credentials-e-public-class-authenticationexception-extends-runtimeexception-public-authenticationexceptionstring-message-throwable-cause-supermessage-cause-public-class-jwttokenrequest-implements-serializable-private-static-final-long-serialversionuid-5616176897013108345l-private-string-username-private-string-password-public-jwttokenrequest-super-public-jwttokenrequeststring-username-string-password-thissetusernameusername-thissetpasswordpassword-public-string-getusername-return-thisusername-public-void-setusernamestring-username-thisusername-username-public-string-getpassword-return-thispassword-public-void-setpasswordstring-password-thispassword-password-public-class-jwttokenresponse-implements-serializable-private-static-final-long-serialversionuid-8317676219297719109l-private-final-string-token-public-jwttokenresponsestring-token-thistoken-token-public-string-gettoken-return-thistoken" title="Permanent link"></a></h2>
<h3 id="course-recording-notes">Course Recording Notes<a class="headerlink" href="#course-recording-notes" title="Permanent link"></a></h3>
<p>#### Preview Video
- Welcome to course on <em>*</em> in ** simple steps.
- I&rsquo;m Ranga Karanam. I&rsquo;ve so and so much experience with &hellip; I&rsquo;ve been using this framework for &hellip;
- At in28minutes, we ask one question everyday - How to create more effective courses? All our success - <em>*</em> students on Udemy and <em>*</em> subscribers on Youtube - is a result of this pursuit of excellence.
- You will develop <em>*</em> and <em>*</em> using <em>*</em>
- You will  learn the basics like <em>*</em> and move on to the advanced concepts like <em><strong>.
- You will use 
  - &hellip; todo &hellip;
  - Maven for dependency management, building and running the application in tomcat.
  - Eclipse IDE
- All the code for this course and the step by step details are in our Github repository. 
- We have an awesome installation guide to help you install Maven and Eclipse. You are NOT expected to have any experience with Eclipse, Maven, or Tomcat.
- What are we waiting for? Lets have some fun with *</strong> in *</em>* steps. We had a lot of fun creating this course for you and We are confident that you will have a lot of fun. I hope you are as excited as we are to learn more. Go ahead and enroll for the course. Or take a test drive with a free preview. See you in the course.</p>
<h4 id="course-intro-video">Course Intro Video<a class="headerlink" href="#course-intro-video" title="Permanent link"></a></h4>
<ul>
<li>Welcome to this course on *<strong>. We are excited to teach you how to build awesome *</strong>. </li>
<li>In this video, we introduce you to the different sections of the course. By the end of the video you should have a clear idea of how to make the best use of the course.</li>
<li>We have organized this course into 6 different sections. We have designed each section to be independent of each other. That means, you have the flexibility of customizing the course based on your skills and your needs. </li>
<li>If you have experience with Spring and Spring Boot, you can skip these sections.</li>
<li>Lets get a quick overview of each of the sections now:</li>
<li>Section I is an one hour introduction to Spring </li>
<li>Section II is an one hour introduction to Spring Boot..</li>
<li>In summary this is your course. Feel free to create your own path and tailor it to your needs.</li>
<li>I will see you in the next video where we introduce you to our github repository</li>
</ul>
<h4 id="overview-of-the-github-repository">Overview of the Github Repository<a class="headerlink" href="#overview-of-the-github-repository" title="Permanent link"></a></h4>
<ul>
<li>Welcome Back. In this video, we give you an overview of how our github repository for this course is organized. </li>
<li>Github repository for this course is at <em>*</em>*.</li>
<li>Home page of the github repository has an overview of the course and installation guide</li>
<li>For each hands-on section of the course, we have a seperate folder in the repository. You can see these five folders for <em>*</em> different sections</li>
<li>Folder 1 contains &hellip;</li>
<li>Folder 2 contains &hellip;</li>
<li>Folder 3 contains &hellip;</li>
<li>Each of these folders contain</li>
<li>Step by Step details of the sections</li>
<li>Complete code example at the end of the section</li>
<li>Intermediate backups at different stages of the section</li>
<li>Useful Links</li>
<li>For example, let&rsquo;s look at the folder for <em>*</em>. Home page of the folder contains</li>
<li>Step by step details : What are we going to do in each step</li>
<li>Useful Links : Different links that would be useful during the course</li>
<li>Complete Code, Snippets and Examples : Example code that your can use during the section. For example, If you are using a class and you do not know the package of the class, you can search here and quickly find what you would need.</li>
<li>Intermediate Backups : You can download any of these zips and import them into Eclipse as maven projects. File &gt; Import &gt; Existing Maven Projects.</li>
<li>Understanding our github repository is key part of making best use of this course. I recommend to spend some time with our github repository and I will see you in the next video.</li>
</ul>
<h4 id="installation-of-tools-video">Installation of Tools Video<a class="headerlink" href="#installation-of-tools-video" title="Permanent link"></a></h4>
<ul>
<li>In this video, we will help you install all the basic tools to get you started with the course</li>
<li>We use </li>
<li>Maven for Dependency Management</li>
<li>Eclipse as IDE</li>
<li>..</li>
<li>Step by step details to install Java, Eclipse and Maven are in the installation guide present here. Also included are links to 5 videos that will help you to install and trouble shoot installations.</li>
<li>If you have any problems during the course, we recommend you to look at the troubleshooting section of the installation playlist.</li>
<li>Get your tools ready and I will see you in the course</li>
</ul>
<h4 id="each-section-introduction">Each Section Introduction<a class="headerlink" href="#each-section-introduction" title="Permanent link"></a></h4>
<ul>
<li>Why is this section important to the course?</li>
<li>What is discussed in this section?</li>
<li>What is the github folder for this section?</li>
<li>Can a student skip this sections?</li>
<li>Is there a trouble shooting guide?</li>
<li>What are the backups available?</li>
<li>Are examples in this section dependent on any other section?</li>
</ul>
<h4 id="conclusion-video">Conclusion Video<a class="headerlink" href="#conclusion-video" title="Permanent link"></a></h4>
<ul>
<li>Congratulations! You have successfully completed the course on &hellip; We covered a wide range of topics starting from Spring, Spring Boot to ..... I&rsquo;m sure you had a lot of fun doing this course. If you loved this course, we would love to hear from you. Do not forget to leave us a review. Until we see you in another in28minutes course, here&rsquo;s bye from the team here at in28minutes.</li>
<li>To find out more about <em>*</em> use these References  </li>
</ul>
<h2 id="templates">Templates<a class="headerlink" href="#templates" title="Permanent link"></a></h2>
<h3 id="welcome-message">Welcome Message<a class="headerlink" href="#welcome-message" title="Permanent link"></a></h3>
<div class="codehilite"><pre>## ADD A FEW SAMPLE REVIEWS AFter a couple of months
## ADD A FEW SAMPLE REVIEWS - in the description of the course 

Congratulations on joining this course from in28Minutes. 

There are three things you need to understand before you start this course!

1...... Listen + See + Do Hands-on + Repeat = 90% Retention
For the first 2 hours, we repeat a few concepts to help you retain them. .

2...... Set Yourself a Goal
Set 1 hour aside every day for the next week for this course! No exceptions allowed :) 

3...... Udemy asks you for a review very early in the course! If you are not ready for giving a review, you can skip giving a review.

Thank you and enjoy the course,
Ranga From in28Minutes
</pre></div>

<h3 id="thank-you-for-completing-the-course-message">Thank You for completing the course message<a class="headerlink" href="#thank-you-for-completing-the-course-message" title="Permanent link"></a></h3>
<div class="codehilite"><pre>Congratulations on completing the course from in28Minutes.

Good Luck for your future.

Thank you ,
Ranga from in28Minutes
</pre></div>

<h3 id="bonus-lectures">Bonus Lectures<a class="headerlink" href="#bonus-lectures" title="Permanent link"></a></h3>
<p>TITLE : Bonus Lecture : Coupons for My Best-Selling Courses -30 Day Money Back Guarantee</p>
<div class="codehilite"><pre>I hope you enjoyed it! 

Connect and share your success (Course Completion Certificate) on Linked In - https://www.linkedin.com/in/rangakaranam/

Here are coupons for many of my best-selling courses. Please click the images/courses below to watch the course video previews (all of these courses have 30-day 100% money back guarantees):

- Copy relevant courses from https://github.com/in28minutes/learn
</pre></div>

<h3 id="other-courses">Other Courses<a class="headerlink" href="#other-courses" title="Permanent link"></a></h3>
<ul>
<li>300+ Videos and Courses - <a href="https://github.com/in28minutes/learn">https://github.com/in28minutes/learn</a></li>
<li><a href="http://www.springboottutorial.com/spring-boot-tutorials-for-beginners">25 Videos and Articles for Beginners on Spring Boot</a></li>
</ul>
<h2 id="about-in28minutes">About in28Minutes<a class="headerlink" href="#about-in28minutes" title="Permanent link"></a></h2>
<ul>
<li>At in28Minutes, we ask ourselves one question everyday. How do we help you learn effectively - that is more quickly and retain more of what you have learnt?</li>
<li>We use Problem-Solution based Step-By-Step Hands-on Approach With Practical, Real World Application Examples. </li>
<li>Our success on Udemy and Youtube (2 Million Views &amp; 12K Subscribers) speaks volumes about the success of our approach.</li>
<li>While our primary expertise is on Development, Design &amp; Architecture Java &amp; Related Frameworks (Spring, Struts, Hibernate) we are expanding into the front-end world (Bootstrap, JQuery, React JS). </li>
</ul>
<h3 id="our-beliefs">Our Beliefs<a class="headerlink" href="#our-beliefs" title="Permanent link"></a></h3>
<ul>
<li>Best Courses are interactive and fun.</li>
<li>Foundations for building high quality applications are best laid down while learning.</li>
</ul>
<h3 id="our-approach">Our Approach<a class="headerlink" href="#our-approach" title="Permanent link"></a></h3>
<ul>
<li>Problem Solution based Step by Step Hands-on Learning</li>
<li>Practical, Real World Application Examples.</li>
<li>We use 80-20 Rule. We discuss 20% things used 80% of time in depth. We touch upon other things briefly equipping you with enough knowledge to find out more on your own. </li>
<li>We will be developing a demo application in the course, which could be reused in your projects, saving hours of your effort.</li>
<li>We love open source and therefore, All our code is open source too and available on Github.</li>
</ul>
<h4 id="troubleshooting">Troubleshooting<a class="headerlink" href="#troubleshooting" title="Permanent link"></a></h4>
<p><div class="codehilite"><pre>Rangas-MacBook-Pro:04-10-2018 rangaraokaranam$ node -v

Rangas-MacBook-Pro:04-10-2018 rangaraokaranam$ npm -v
6.4.1

#Global
npm uninstall -g React-cli
npm cache verify
npm install -g @React/cli@7.0.3

#Inside the project - If you had an earlier version of React cli
rm -rf node_modules
npm uninstall --save-dev React-cli
npm install --save-dev @React/cli@latest
npm install
</pre></div>
- Why Visual Studio Code?
  - <a href="https://trends.google.com/trends/explore?date=all&amp;q=%2Fm%2F0k2kj45,%2Fm%2F0_x5x3g,%2Fm%2F0134xwrk,%2Fm%2F0b6h18n">https://trends.google.com/trends/explore?date=all&amp;q=%2Fm%2F0k2kj45,%2Fm%2F0_x5x3g,%2Fm%2F0134xwrk,%2Fm%2F0b6h18n</a>
- We use Light Theme
- Install
    - Auto Import - Automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX
    - Reload to Activate</p>
<h2 id="what-you-will-learn_1">What You will Learn?<a class="headerlink" href="#what-you-will-learn_1" title="Permanent link"></a></h2>
<h3 id="big-picture">Big Picture<a class="headerlink" href="#big-picture" title="Permanent link"></a></h3>
<ul>
<li>What is the High Level Architecture of our Full Stack Application?</li>
<li>What is an SPA?</li>
<li>What is React?</li>
</ul>
<h3 id="typescript-and-javascript">TypeScript and JavaScript<a class="headerlink" href="#typescript-and-javascript" title="Permanent link"></a></h3>
<ul>
<li>I&rsquo;m new to TypeScript. Will I be able to adapt to it?</li>
<li>How does a JavaScript Class compare to a Java Class?</li>
<li>Packages vs Modules</li>
<li>import statements</li>
<li>Decorator vs Annotation</li>
<li>What is a JavaScript Module?</li>
<li>How does JavaScript Syntax compare to Java Syntax?</li>
<li>Arrays - Filtering, Spread Operator and Functional Stuff</li>
<li>Custom Objects</li>
</ul>
<h3 id="react-basics">React Basics<a class="headerlink" href="#react-basics" title="Permanent link"></a></h3>
<ul>
<li>What is React Component?</li>
<li>What are the conventions for file extensions in React Projects?</li>
<li>How do you build forms in React? How do you do Form Validation?</li>
<li>What is Routing?</li>
<li>How do you implement Routing in React?</li>
<li>How do you call HTTP Services in React?</li>
</ul>
<h3 id="running-react-applications">Running React Applications<a class="headerlink" href="#running-react-applications" title="Permanent link"></a></h3>
<ul>
<li>What is Root Component? What are Bootstrap Components? How is the React Application Bootstrapped?  <code>\src\index.html</code>, <code>\src\main.ts</code>, <code>AppModule</code>, <code>AppComponent</code></li>
<li>Do Browsers understand JSX? How does JSX code get converted to JavaScript code? </li>
</ul>
<h2 id="automated-tests-and-code-quality">Automated Tests and Code Quality<a class="headerlink" href="#automated-tests-and-code-quality" title="Permanent link"></a></h2>
<ul>
<li>What are unit tests? How are unit tests organized in React? How is different from Java?</li>
<li>How can you run tests? <code>\src\karma.conf.ts</code></li>
<li>What are coding standards? How can you check coding standards for React Cli Project? What is Lint? What is Linting? Is there a Standard Style Guide for React? <code>\tslint.json</code></li>
<li>How can I run coding standards check for React Projects?</li>
</ul>
<h2 id="course-details">Course Details<a class="headerlink" href="#course-details" title="Permanent link"></a></h2>
<h3 id="request-urls-and-examples">Request URLs and Examples<a class="headerlink" href="#request-urls-and-examples" title="Permanent link"></a></h3>
<h4 id="common-headers">Common Headers<a class="headerlink" href="#common-headers" title="Permanent link"></a></h4>
<div class="codehilite"><pre>Origin - http://localhost:4200
Content-Type - application/json
Authorization 
- Bearer *** or
- Basic *****
</pre></div>

<h4 id="retrieve-all-todos-for-a-user">Retrieve all todos for a user<a class="headerlink" href="#retrieve-all-todos-for-a-user" title="Permanent link"></a></h4>
<ul>
<li>GET - <a href="http://localhost:8080/users/in28minutes/todos">http://localhost:8080/users/in28minutes/todos</a></li>
</ul>
<div class="codehilite"><pre>[
  {
    id: 1,
    username: &quot;in28minutes&quot;,
    description: &quot;Learn to Dance 2&quot;,
    targetDate: &quot;2018-11-09T12:05:18.647+0000&quot;,
   : false,
  },
  {
    id: 2,
    username: &quot;in28minutes&quot;,
    description: &quot;Learn about Microservices 2&quot;,
    targetDate: &quot;2018-11-09T12:05:18.647+0000&quot;,
   : false,
  },
  {
    id: 3,
    username: &quot;in28minutes&quot;,
    description: &quot;Learn about React&quot;,
    targetDate: &quot;2018-11-09T12:05:18.647+0000&quot;,
   : false,
  },
]
</pre></div>

<h4 id="retrieve-a-specific-todo">Retrieve a specific todo<a class="headerlink" href="#retrieve-a-specific-todo" title="Permanent link"></a></h4>
<ul>
<li>GET - <a href="http://localhost:8080/users/in28minutes/todos/1">http://localhost:8080/users/in28minutes/todos/1</a></li>
</ul>
<div class="codehilite"><pre>{
  id: 1,
  username: &quot;in28minutes&quot;,
  description: &quot;Learn to Dance 2&quot;,
  targetDate: &quot;2018-11-09T12:05:18.647+0000&quot;,
 : false,
}
</pre></div>

<h4 id="creating-a-new-todo">Creating a new todo<a class="headerlink" href="#creating-a-new-todo" title="Permanent link"></a></h4>
<ul>
<li>POST to <a href="http://localhost:8080/users/in28minutes/todos">http://localhost:8080/users/in28minutes/todos</a> with BODY of Request given below</li>
</ul>
<div class="codehilite"><pre>{
  &quot;username&quot;: &quot;in28minutes&quot;,
  &quot;description&quot;: &quot;Learn to Drive a Car&quot;,
  &quot;targetDate&quot;: &quot;2018-11-09T10:49:23.566+0000&quot;,
  &quot;done&quot;: false
}
</pre></div>

<h4 id="updating-a-new-todo">Updating a new todo<a class="headerlink" href="#updating-a-new-todo" title="Permanent link"></a></h4>
<ul>
<li><a href="http://localhost:8080/users/in28minutes/todos/1">http://localhost:8080/users/in28minutes/todos/1</a> with BODY of Request given below</li>
</ul>
<div class="codehilite"><pre>{
  &quot;id&quot;: 1
  &quot;username&quot;: &quot;in28minutes&quot;,
  &quot;description&quot;: &quot;Learn to Drive a Car&quot;,
  &quot;targetDate&quot;: &quot;2018-11-09T10:49:23.566+0000&quot;,
  &quot;done&quot;: false
}
</pre></div>

<h4 id="delete-todo">Delete todo<a class="headerlink" href="#delete-todo" title="Permanent link"></a></h4>
<ul>
<li>DELETE to <a href="http://localhost:8080/users/in28minutes/todos/1">http://localhost:8080/users/in28minutes/todos/1</a></li>
</ul>
<h3 id="jwt-authenticate">JWT Authenticate<a class="headerlink" href="#jwt-authenticate" title="Permanent link"></a></h3>
<ul>
<li>POST to <a href="http://localhost:8080/authenticate">http://localhost:8080/authenticate</a></li>
</ul>
<div class="codehilite"><pre>{
  &quot;username&quot;:&quot;ranga&quot;,
  &quot;password&quot;:&quot;password@!23@#!&quot;
}
</pre></div>

<p>Response</p>
<div class="codehilite"><pre>{
&quot;token&quot;: &quot;eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW5nYSIsImV4cCI6MTU0MjQ3MjA3NCwiaWF0IjoxNTQxODY3Mjc0fQ.kD6UJQyxjSPMzAhoTJRr-Z5UL-FfgsyxbdseWQvk0fLi7eVXAKhBkWfj06SwH43sY_ZWBEeLuxaE09szTboefw&quot;
}
</pre></div>

<p>Other URLS
- Refresh - <a href="http://localhost:8080/authenticate">http://localhost:8080/authenticate</a></p>
<h3 id="useful-links">Useful Links<a class="headerlink" href="#useful-links" title="Permanent link"></a></h3>
<ul>
<li><a href="http://www.in28minutes.com">Our Website</a></li>
<li><a href="http://facebook.com/in28minutes">Facebook</a></li>
<li><a href="http://twitter.com/in28minutes">Twitter</a></li>
<li><a href="https://plus.google.com/u/3/110861829188024231119">Google Plus</a></li>
</ul>
<h2 id="connection-to-mysql">Connection to MySQL<a class="headerlink" href="#connection-to-mysql" title="Permanent link"></a></h2>
<h2 id="create-sequence-hibernate_sequence-start-with-1-increment-by-1-create-table-todo-id-bigint-not-null-description-varchar255-is_done-boolean-not-null-target_date-timestamp-username-varchar255-primary-key-id"><div class="codehilite"><pre>create sequence hibernate_sequence start with 1 increment by 1

create table todo (
    id bigint not null, 
    description varchar(255), 
    is_done boolean not null, 
    target_date timestamp, 
    username varchar(255), 
    primary key (id))
</pre></div><a class="headerlink" href="#create-sequence-hibernate_sequence-start-with-1-increment-by-1-create-table-todo-id-bigint-not-null-description-varchar255-is_done-boolean-not-null-target_date-timestamp-username-varchar255-primary-key-id" title="Permanent link"></a></h2>
<p>launch.json
<div class="codehilite"><pre><span class="p">{</span>
    <span class="err">//</span> <span class="err">Use</span> <span class="err">IntelliSense</span> <span class="err">to</span> <span class="err">learn</span> <span class="err">about</span> <span class="err">possible</span> <span class="err">attributes.</span>
    <span class="err">//</span> <span class="err">Hover</span> <span class="err">to</span> <span class="err">view</span> <span class="err">descriptions</span> <span class="err">of</span> <span class="err">existing</span> <span class="err">attributes.</span>
    <span class="err">//</span> <span class="err">For</span> <span class="err">more</span> <span class="err">information,</span> <span class="err">visit:</span> <span class="err">https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="nt">&quot;version&quot;</span><span class="p">:</span> <span class="s2">&quot;0.2.0&quot;</span><span class="p">,</span>
    <span class="nt">&quot;configurations&quot;</span><span class="p">:</span> <span class="p">[</span>
        <span class="p">{</span>
            <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;chrome&quot;</span><span class="p">,</span>
            <span class="nt">&quot;request&quot;</span><span class="p">:</span> <span class="s2">&quot;launch&quot;</span><span class="p">,</span>
            <span class="nt">&quot;name&quot;</span><span class="p">:</span> <span class="s2">&quot;Launch Chrome against localhost&quot;</span><span class="p">,</span>
            <span class="nt">&quot;url&quot;</span><span class="p">:</span> <span class="s2">&quot;http://localhost:4200&quot;</span><span class="p">,</span><span class="err">//Line</span> <span class="err">Changed</span>
            <span class="nt">&quot;webRoot&quot;</span><span class="p">:</span> <span class="s2">&quot;${workspaceFolder}&quot;</span>
        <span class="p">}</span>
    <span class="p">]</span>
<span class="p">}</span>
</pre></div></p>
<ul>
<li><a href="https://auth0.com/blog/creating-beautiful-apps-with-React-material/">https://auth0.com/blog/creating-beautiful-apps-with-React-material/</a></li>
</ul>
<div class="codehilite"><pre>npm install @React/material @React/cdk
&lt;link href=&quot;https://fonts.googleapis.com/icon?family=Material+Icons&quot; rel=&quot;stylesheet&quot;&gt;
npm install @React/flex-layout rxjs-compat
</pre></div>

<h2 id="diagrams">Diagrams<a class="headerlink" href="#diagrams" title="Permanent link"></a></h2>
<ul>
<li>Courtesy <a href="http://viz-js.com/">http://viz-js.com/</a></li>
</ul>
<div class="codehilite"><pre>graph architecture {
node[style=filled,color=&quot;#59C8DE&quot;]
//node [style=filled,color=&quot;#D14D28&quot;, fontcolor=white];
rankdir = TB;
node[shape=record]

FRONTEND[label=&lt;React Application&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;Modern JavaScript - ES6&lt;/FONT&gt;&gt;];

REST[label=&lt;RESTFUL API&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;Spring Boot on Java&lt;/FONT&gt;&gt;];

DB[label=&lt;Database&gt;];

FRONTEND -- REST -- DB
DB[shape=cylinder]
}

digraph architecture {
node[style=filled,color=&quot;#59C8DE&quot;]
//node [style=filled,color=&quot;#D14D28&quot;, fontcolor=white];
rankdir = TB;
node[shape=record]

FRONTEND[label=&lt;React Application&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;JavaScript&lt;/FONT&gt;&gt;];

MODULE0[label=&lt;Components&gt;];

MODULE1[label=&lt;Libraries&gt;];

COMPONENT01[label=&lt;Login&gt;];
COMPONENT02[label=&lt;Logout&gt;];
COMPONENT03[label=&lt;ListTodo&gt;];
COMPONENT04[label=&lt;Todo&gt;];
COMPONENT05[label=&lt;Header&gt;];
COMPONENT06[label=&lt;Footer&gt;];
COMPONENT07[label=&lt;Menu&gt;];

COMPONENT11[label=&lt;Formik&gt;];
COMPONENT12[label=&lt;Axios&gt;];
COMPONENT13[label=&lt;ReactRouter&gt;];

FRONTEND -&gt; MODULE0
FRONTEND -&gt; MODULE1

MODULE0 -&gt; COMPONENT01
MODULE0 -&gt; COMPONENT02
MODULE0 -&gt; COMPONENT03
MODULE0 -&gt; COMPONENT04
MODULE0 -&gt; COMPONENT05
MODULE0 -&gt; COMPONENT06
MODULE0 -&gt; COMPONENT07

MODULE1 -&gt; COMPONENT11
MODULE1 -&gt; COMPONENT12
MODULE1 -&gt; COMPONENT13

}


graph architecture {

node[style=filled,color=&quot;#59C8DE&quot;]
//node [style=filled,color=&quot;#D14D28&quot;, fontcolor=white];
rankdir = TB;
node[shape=record]

COMPONENT[label=&lt;Component&gt;];

View[label=&lt;View&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;JSX or Javascript&lt;/FONT&gt;&gt;];
Logic[label=&lt;Logic&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;Javascript&lt;/FONT&gt;&gt;];
Styling[label=&lt;Styling&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;CSS&lt;/FONT&gt;&gt;];
State[label=&lt;State&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;Internal Data Store&lt;/FONT&gt;&gt;];
Props[label=&lt;Props&lt;BR /&gt;
   &lt;FONT POINT-SIZE=&quot;9&quot;&gt;Pass Data&lt;/FONT&gt;&gt;];

COMPONENT -- View
COMPONENT -- Logic
COMPONENT -- Styling
COMPONENT -- State
COMPONENT -- Props
}

graph architecture {

node[style=filled,color=&quot;#59C8DE&quot;]
//node [style=filled,color=&quot;#D14D28&quot;, fontcolor=white];
rankdir = TB;
node[shape=record]

React -- Components
Components -- JSX
Components -- State
Components -- Props
React -- Features
Features -- Routing
Features -- Forms
Features -- RestAPICalls
Features -- Authentication

RestAPICalls[label=&lt;Rest API Calls&gt;]
Forms[label=&lt;Forms and Validation&gt;]

}
</pre></div>

<h2 id="todo">Todo<a class="headerlink" href="#todo" title="Permanent link"></a></h2>
<ul>
<li>JavaScript</li>
<li>Object Review {property1, property2}</li>
<li>Object Clone overview</li>
<li>Arrow Operator</li>
<li>What is npm?</li>
<li>What is WebPack?</li>
<li>Common Error Handling and Server Side Validation and Other REST API Features?</li>
<li>Common Message Component for RESTful Calls</li>
<li>Moving <a class="magiclink magiclink-github magiclink-mention" href="https://github.com/CrossOrigin" title="GitHub User: CrossOrigin">@CrossOrigin</a> to a Common Location</li>
<li>What is Bundling? What are runtime.js, polyfills.js, styles.js, vendor.js, main.js? How are they generated? <code>\src\main.ts</code>, <code>\src\polyfills.ts</code>, <code>\src\styles.css</code>, <code>\src\**\*.component.css</code></li>
<li>How can I rollback changes made by React CLI?</li>
<li>How can you learn to write tests for React? </li>
<li>How can you learn to write end to end tests for React?</li>
<li>What are Dependency Injection Options other than root?</li>
<li>Spring Security Authorization</li>
<li>What are the different kinds of Data Binding?</li>
<li>/blog/src/app/basics/basics.component.html</li>
<li>React Specific Syntax<ul>
<li>[class.active]=&rdquo;isActive()&rdquo;</li>
<li>[style.font]=&rdquo;determineFont&rdquo;</li>
</ul>
</li>
<li>How do you build various form elements in React? </li>
<li>/blog/src/app/box/box.component.html</li>
<li>/blog/src/app/form/form.component.html</li>
<li>What is a Child Component?</li>
<li>person-row.component.html, person.component.html</li>
<li>How can you configure environment configuration in React Projects? src\environments folder</li>
<li>How do you create a production deployment? What are the production optimizations that are? What is Uglification? What is Minification?</li>
<li><a href="https://medium.com/frontend-coach/7-must-have-visual-studio-code-extensions-for-React-af9c476147fd">https://medium.com/frontend-coach/7-must-have-visual-studio-code-extensions-for-React-af9c476147fd</a></li>
<li>Dev vs Prod Configuration</li>
<li>Deployment</li>
<li>Seperate vs Together</li>
<li>Deploying to Cloud</li>
<li>Material Design</li>
<li>Debugging with Visual Studio Code</li>
<li>To debug the client side React code, we&rsquo;ll need to install the Debugger for Chrome extension - <a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome">https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome</a></li>
<li>Open the Extensions view (⇧⌘X or Ctrl+Shift+X)</li>
<li>Type Debugger for Chrome</li>
<li>Install</li>
<li>Reload</li>
<li>Go to the Debug view (⇧⌘D or Ctrl+Shift+D)</li>
<li>Click on gear button to create launch.json</li>
<li>Choose Chrome from the Select Environment dropdown</li>
<li>Set URL to &ldquo;url&rdquo;: &ldquo;<a href="http://localhost:4200">http://localhost:4200</a>&ldquo;</li>
<li>Running Examples</li>
<li>Download the zip or clone the Git repository.</li>
<li>Unzip the zip file (if you downloaded one)</li>
<li>Open Command Prompt and Change directory (cd) to folder containing pom.xml</li>
<li>Open Eclipse <ul>
<li>File -&gt; Import -&gt; Existing Maven Project -&gt; Navigate to the folder where you unzipped the zip</li>
<li>Select the right project</li>
</ul>
</li>
<li>Choose the Spring Boot Application file (search for file with <a class="magiclink magiclink-github magiclink-mention" href="https://github.com/SpringBootApplication" title="GitHub User: SpringBootApplication">@SpringBootApplication</a>)</li>
<li>Right Click on the file and Run as Java Application</li>
<li>You are all Set</li>
<li>For help : use our installation guide - <a href="https://www.youtube.com/playlist?list=PLBBog2r6uMCSmMVTW_QmDLyASBvovyAO3">https://www.youtube.com/playlist?list=PLBBog2r6uMCSmMVTW_QmDLyASBvovyAO3</a></li>
</ul>
<h2 id="next-steps">Next Steps<a class="headerlink" href="#next-steps" title="Permanent link"></a></h2>
<ul>
<li>Modern JavaScript </li>
<li><a href="https://github.com/mbeaudru/modern-js-cheatsheet#tdz_sample">https://github.com/mbeaudru/modern-js-cheatsheet#tdz_sample</a></li>
<li><a href="https://learnxinyminutes.com/docs/javascript/">https://learnxinyminutes.com/docs/javascript/</a></li>
<li><a href="https://github.com/mjavascript/mastering-modular-javascript/blob/master/chapters/ch01.asciidoc">https://github.com/mjavascript/mastering-modular-javascript/blob/master/chapters/ch01.asciidoc</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript">https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript</a></li>
<li>Modern Javascript Quickly - <a href="https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c">https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c</a></li>
<li>React</li>
<li><a href="https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html">https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html</a></li>
<li>class vs className - <a href="https://stackoverflow.com/questions/46989454/class-vs-classname-in-react-16">https://stackoverflow.com/questions/46989454/class-vs-classname-in-react-16</a></li>
<li><a href="https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1">https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1</a></li>
<li><a href="https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes">https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes</a></li>
</ul>
<h2 id="old-starting-up-code">OLD Starting Up Code<a class="headerlink" href="#old-starting-up-code" title="Permanent link"></a></h2>
<h2 id="example-1">Example 1<a class="headerlink" href="#example-1" title="Permanent link"></a></h2>
<p>import React, { Component } from &ldquo;react&rdquo;;
import ReactDOM from &ldquo;react-dom&rdquo;;</p>
<p>import &ldquo;./styles.css&rdquo;;</p>
<p>function App() {
  //Basics
  // No playing with DOM</p>
<p>// Extension
  //Simple React Snippets
  //Prettier code formatter</p>
<p>//JSX
  //babeljs.io/repl
  const heading = &ldquo;Hello World 1&rdquo;;</p>
<p>const element = <h1>{heading}</h1>;</p>
<p>const header = <h1>Heading</h1>;</p>
<p>const body = <div> Content </div>;</p>
<p>const footer = <div class="test"> Footer </div>;</p>
<p>const textAreaDefault = &ldquo;Text Area Default Value&rdquo;;</p>
<p>//const twoTagsAreNotAllowedAsReturn = <h1></h1><h2></h2>
  //React.Fragment instead of div as parent</p>
<p>//const allTagsShouldBeClosed = <div>
  //class vs className - <a href="https://stackoverflow.com/questions/46989454/class-vs-classname-in-react-16">https://stackoverflow.com/questions/46989454/class-vs-classname-in-react-16</a>
  //camelcase
  const whitespaceJSX1 = <p>Word1 Word2 Word3</p>; //Spaces consolidated to 1
  const whitespaceJSX2 = <p>Line 1 Line 2</p>;</p>
<p>const array = [1, 2, 3];</p>
<p>const selectValues = [&ldquo;a&rdquo;, &ldquo;b&rdquo;, &ldquo;c&rdquo;];</p>
<p>/*
  function TodoExampleWithFunction() {
    return &lsquo;<h2>TodoExampleWithFunction</h2>&lsquo;;
  }
*/</p>
<p>function TodoExampleWithFunction() {
    return <h2>TodoExampleWithFunction</h2>;
  }</p>
<p>class EventsComponent extends Component {
    constructor() {
      super();
      this.state = {
        currentEvent: &ldquo;&rdquo;
      };
      this.registerEvent = this.registerEvent.bind(this);
    }
    registerEvent(e) {
      //console.log(e.type);
      this.setState({ currentEvent: e.type });
    }
    render() {
      return (
        <div>
          <textarea
            onClick={this.registerEvent}
            onKeyPress={this.registerEvent}
            onBlur={this.registerEvent}
            onChange={this.registerEvent}
            onDoubleClick={this.registerEvent}
            onFocus={this.registerEvent}
            onMouseEnter={this.registerEvent}
            onCopy={this.registerEvent}
            defaultValue="some text"
          />
          <div>{this.state.currentEvent}</div>
        </div>
      );
    }
  }</p>
<p>class TodoExampleWithClass extends Component {
    render() {
      return <h2>TodoExampleWithClass</h2>;
    }
  }</p>
<p>class ConditionalComponent extends Component {
    render() {
      return <div>{this.props.show &amp;&amp; <h3> Show </h3>}</div>;
    }
  }</p>
<p>class ParentComponent extends Component {
    constructor(props) {
      super();
      //alert(props.children);
    }
    render() {
      return <h3>{this.props.children}</h3>;
    }
  }</p>
<p>class ParentComponentWithEventsAndStateV1 extends Component {
    constructor(props) {
      super();
      //alert(props.children);
    }
    render() {
      return <ChildComponentV1 />;
    }
  }</p>
<p>class ChildComponentV1 extends Component {
    constructor() {
      super();
      this.state = {
        currentEvent: &ldquo;&rdquo;
      };
    }
    registerEvent(e) {
      this.setState({ currentEvent: e.type });
    }
    render() {
      return (
        <div>
          <input type="text" onChange={this.registerEvent.bind(this)} />
          <div>{this.state.currentEvent}</div>
        </div>
      );
    }
  }</p>
<p>class ParentComponentWithEventsAndState extends Component {
    constructor() {
      super();
      this.state = {
        currentEvent: &ldquo;&rdquo;
      };
    }</p>
<div class="codehilite"><pre>registerEvent(e) {
  this.setState({
    currentEvent: e.type + e.target.id + &quot; &quot; + e.target.value
  });
}

render() {
  return (
    &lt;div&gt;
      &lt;ChildComponent
        id=&quot;1&quot;
        registerEvent={this.registerEvent.bind(this)}
      /&gt;
      &lt;ChildComponent
        id=&quot;2&quot;
        registerEvent={this.registerEvent.bind(this)}
      /&gt;
      &lt;div&gt;{this.state.currentEvent}&lt;/div&gt;
    &lt;/div&gt;
  );
}
</pre></div>


<p>}</p>
<p>class ChildComponent extends Component {
    render() {
      return (
        <div>
          <input
            type="text"
            id={this.props.id}
            onChange={this.props.registerEvent.bind(this)}
          />
        </div>
      );
    }
  }</p>
<p>class DisplayTodo extends Component {
    constructor(props) {
      super();
      //alert(JSON.stringify(props));
    }</p>
<div class="codehilite"><pre>render() {
  return (
    &lt;div&gt;
      &lt;h3&gt;{this.props.title}&lt;/h3&gt;
      {this.props.description}
    &lt;/div&gt;
  );
}
</pre></div>


<p>}</p>
<p>class Counter extends Component {
    constructor() {
      super();
      this.state = {
        count: 0
      };
    }</p>
<div class="codehilite"><pre>incrementCounterWithoutNeedingBind = () =&gt; {
  //alert(this);
};

incrementCounter() {
  //alert(this);
  //alert(this.state);
  //alert(this.state.count);
  this.setState({
    count: this.state.count + 1
  });
}

render() {
  return (
    &lt;div&gt;
      &lt;button onClick={this.incrementCounter.bind(this)}&gt;Click Here&lt;/button&gt;
      counter - {this.state.count}
    &lt;/div&gt;
  );
}
</pre></div>


<p>}</p>
<p>return (
    <div>
      <EventsComponent />
      {header}
      <DisplayTodo title="Todo Title" description="Do something good" />
      <DisplayTodo title="Todo Title 2" description="Do something else good" />
      <ConditionalComponent show />
      <ConditionalComponent />
      <ParentComponent>Parent Component</ParentComponent>
      <ParentComponentWithEventsAndState />
      <TodoExampleWithFunction />
      <TodoExampleWithClass />
      <Counter />
      {whitespaceJSX1}
      {whitespaceJSX2}
      {body}
      <textarea defaultValue={textAreaDefault} />
      <select defaultValue="a">
        {selectValues.map(x =&gt; {
          return <option value={x}>{x}</option>;
        })}
      </select></p>
<div class="codehilite"><pre>  {array.map((elt, i) =&gt; {
    return (
      &lt;div&gt;
        {i} - {elt}
      &lt;/div&gt;
    );
  })}
  {footer}
&lt;/div&gt;
</pre></div>


<p>);
}</p>
<p>const rootElement = document.getElementById(&ldquo;root&rdquo;);</p>
<p>ReactDOM.render(<App />, rootElement);</p>
<h2 id="example-2">Example 2<a class="headerlink" href="#example-2" title="Permanent link"></a></h2>
<div class="codehilite"><pre>button
  background-color: green
  color: white
  padding: 15px 32px
  font-size: 16px
  width: 100px

.count
  font-size: 50px
  padding: 15px 32px
</pre></div>

<p>class Application extends React.Component {</p>
<p>constructor(props) {
    super(props)
    this.incrementTotalCount = this.incrementTotalCount.bind(this)
    this.reset = this.reset.bind(this)
    this.state = {
      totalCount : 0
    }
  }</p>
<p>incrementTotalCount(by = 1) {
    this.setState (
    {totalCount: this.state.totalCount+by}
    )
  }</p>
<p>reset() {
    console.log(&lsquo;reset&rsquo;);
  }</p>
<p>render() {
    return  <div>
          <Counter incrementTotal={this.incrementTotalCount} incrementBy={100}/></p>
<div class="codehilite"><pre>      &lt;Counter incrementTotal={this.incrementTotalCount} incrementBy={10}/&gt;

      &lt;Counter incrementTotal={this.incrementTotalCount} incrementBy={5}/&gt;
      &lt;Counter incrementTotal={this.incrementTotalCount} incrementBy={2}/&gt;

  &lt;div className=&quot;count&quot;&gt;Total Count - {this.state.totalCount}&lt;/div&gt;
  &lt;button onClick={this.reset}&gt;RESET&lt;/button&gt;
  &lt;/div&gt;
</pre></div>


<p>}<br />
}</p>
<p>class Counter extends React.Component {</p>
<p>constructor(props) {
    super(props)
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.state = {
      count:0
    }
  }</p>
<p>increment() {
    this.setState(
      {count: this.state.count+this.props.incrementBy}
    )
    this.props.incrementTotal(this.props.incrementBy);
  }</p>
<p>decrement() {
    this.setState(
      {count: this.state.count-this.props.incrementBy}
    )
  }</p>
<p>render() {
    return <div>
        <button onClick={this.increment}>+{this.props.incrementBy}</button>
        <button onClick={this.decrement}>-{this.props.incrementBy}</button>
        <span className="count">{this.state.count}</span>
    </div>;
  }
}</p>
<p>React.render(<Application name="Ranga" todo={{desc:'Learn Angular 8'}}/> , document.getElementById(&lsquo;app&rsquo;));</p>
<p>// React.render(<Application name="Ranga" todo={{desc:'Learn Angular 8'}}/> , document.getElementById(&lsquo;app&rsquo;));</p>
<h2 id="example-4-v3">Example 4 - V3<a class="headerlink" href="#example-4-v3" title="Permanent link"></a></h2>
<h3 id="publicindexhtml">/public/index.html<a class="headerlink" href="#publicindexhtml" title="Permanent link"></a></h3>
<h2 id="doctype-html-html-langen-head-meta-charsetutf-8-link-relshortcut-icon-hrefpublic_urlfaviconico-meta-nameviewport-contentwidthdevice-width-initial-scale1-shrink-to-fitno-meta-nametheme-color-content000000-manifestjson-provides-metadata-used-when-your-web-app-is-added-to-the-homescreen-on-android-see-httpsdevelopersgooglecomwebfundamentalsweb-app-manifest-link-relmanifest-hrefpublic_urlmanifestjson-notice-the-use-of-public_url-in-the-tags-above-it-will-be-replaced-with-the-url-of-the-public-folder-during-the-build-only-files-inside-the-public-folder-can-be-referenced-from-the-html-unlike-faviconico-or-faviconico-public_urlfaviconico-will-work-correctly-both-with-client-side-routing-and-a-non-root-public-url-learn-how-to-configure-a-non-root-public-url-by-running-npm-run-build-titlemy-react-apptitle-head-body-noscriptyou-need-to-enable-javascript-to-run-this-appnoscript-div-idrootdiv-this-html-file-is-a-template-if-you-open-it-directly-in-the-browser-you-will-see-an-empty-page-you-can-add-webfonts-meta-tags-or-analytics-to-this-file-the-build-step-will-place-the-bundled-scripts-into-the-body-tag-to-begin-the-development-run-npm-start-or-yarn-start-to-create-a-production-bundle-use-npm-run-build-or-yarn-build-body-html"><div class="codehilite"><pre><span class="cp">&lt;!DOCTYPE html&gt;</span>
<span class="p">&lt;</span><span class="nt">html</span> <span class="na">lang</span><span class="o">=</span><span class="s">&quot;en&quot;</span><span class="p">&gt;</span>
  <span class="p">&lt;</span><span class="nt">head</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">meta</span> <span class="na">charset</span><span class="o">=</span><span class="s">&quot;utf-8&quot;</span> <span class="p">/&gt;</span>
    <span class="p">&lt;</span><span class="nt">link</span> <span class="na">rel</span><span class="o">=</span><span class="s">&quot;shortcut icon&quot;</span> <span class="na">href</span><span class="o">=</span><span class="s">&quot;%PUBLIC_URL%/favicon.ico&quot;</span> <span class="p">/&gt;</span>
    <span class="p">&lt;</span><span class="nt">meta</span>
      <span class="na">name</span><span class="o">=</span><span class="s">&quot;viewport&quot;</span>
      <span class="na">content</span><span class="o">=</span><span class="s">&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;</span>
    <span class="p">/&gt;</span>
    <span class="p">&lt;</span><span class="nt">meta</span> <span class="na">name</span><span class="o">=</span><span class="s">&quot;theme-color&quot;</span> <span class="na">content</span><span class="o">=</span><span class="s">&quot;#000000&quot;</span> <span class="p">/&gt;</span>
    <span class="c">&lt;!--</span>
<span class="c">      manifest.json provides metadata used when your web app is added to the</span>
<span class="c">      homescreen on Android. See https://developers.google.com/web/fundamentals/web-app-manifest/</span>
<span class="c">    --&gt;</span>
    <span class="p">&lt;</span><span class="nt">link</span> <span class="na">rel</span><span class="o">=</span><span class="s">&quot;manifest&quot;</span> <span class="na">href</span><span class="o">=</span><span class="s">&quot;%PUBLIC_URL%/manifest.json&quot;</span> <span class="p">/&gt;</span>
    <span class="c">&lt;!--</span>
<span class="c">      Notice the use of %PUBLIC_URL% in the tags above.</span>
<span class="c">      It will be replaced with the URL of the `public` folder during the build.</span>
<span class="c">      Only files inside the `public` folder can be referenced from the HTML.</span>

<span class="c">      Unlike &quot;/favicon.ico&quot; or &quot;favicon.ico&quot;, &quot;%PUBLIC_URL%/favicon.ico&quot; will</span>
<span class="c">      work correctly both with client-side routing and a non-root public URL.</span>
<span class="c">      Learn how to configure a non-root public URL by running `npm run build`.</span>
<span class="c">    --&gt;</span>
    <span class="p">&lt;</span><span class="nt">title</span><span class="p">&gt;</span>My React App<span class="p">&lt;/</span><span class="nt">title</span><span class="p">&gt;</span>
  <span class="p">&lt;/</span><span class="nt">head</span><span class="p">&gt;</span>
  <span class="p">&lt;</span><span class="nt">body</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">noscript</span><span class="p">&gt;</span>You need to enable JavaScript to run this app.<span class="p">&lt;/</span><span class="nt">noscript</span><span class="p">&gt;</span>
    <span class="p">&lt;</span><span class="nt">div</span> <span class="na">id</span><span class="o">=</span><span class="s">&quot;root&quot;</span><span class="p">&gt;&lt;/</span><span class="nt">div</span><span class="p">&gt;</span>
    <span class="c">&lt;!--</span>
<span class="c">      This HTML file is a template.</span>
<span class="c">      If you open it directly in the browser, you will see an empty page.</span>

<span class="c">      You can add webfonts, meta tags, or analytics to this file.</span>
<span class="c">      The build step will place the bundled scripts into the &lt;body&gt; tag.</span>

<span class="c">      To begin the development, run `npm start` or `yarn start`.</span>
<span class="c">      To create a production bundle, use `npm run build` or `yarn build`.</span>
<span class="c">    --&gt;</span>
  <span class="p">&lt;/</span><span class="nt">body</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">html</span><span class="p">&gt;</span>
</pre></div><a class="headerlink" href="#doctype-html-html-langen-head-meta-charsetutf-8-link-relshortcut-icon-hrefpublic_urlfaviconico-meta-nameviewport-contentwidthdevice-width-initial-scale1-shrink-to-fitno-meta-nametheme-color-content000000-manifestjson-provides-metadata-used-when-your-web-app-is-added-to-the-homescreen-on-android-see-httpsdevelopersgooglecomwebfundamentalsweb-app-manifest-link-relmanifest-hrefpublic_urlmanifestjson-notice-the-use-of-public_url-in-the-tags-above-it-will-be-replaced-with-the-url-of-the-public-folder-during-the-build-only-files-inside-the-public-folder-can-be-referenced-from-the-html-unlike-faviconico-or-faviconico-public_urlfaviconico-will-work-correctly-both-with-client-side-routing-and-a-non-root-public-url-learn-how-to-configure-a-non-root-public-url-by-running-npm-run-build-titlemy-react-apptitle-head-body-noscriptyou-need-to-enable-javascript-to-run-this-appnoscript-div-idrootdiv-this-html-file-is-a-template-if-you-open-it-directly-in-the-browser-you-will-see-an-empty-page-you-can-add-webfonts-meta-tags-or-analytics-to-this-file-the-build-step-will-place-the-bundled-scripts-into-the-body-tag-to-begin-the-development-run-npm-start-or-yarn-start-to-create-a-production-bundle-use-npm-run-build-or-yarn-build-body-html" title="Permanent link"></a></h2>
<h3 id="publicmanifestjson">/public/manifest.json<a class="headerlink" href="#publicmanifestjson" title="Permanent link"></a></h3>
<h2 id="short_name-react-app-name-create-react-app-sample-icons-src-faviconico-sizes-64x64-32x32-24x24-16x16-type-imagex-icon-start_url-display-standalone-theme_color-000000-background_color-ffffff"><div class="codehilite"><pre><span class="p">{</span>
  <span class="nt">&quot;short_name&quot;</span><span class="p">:</span> <span class="s2">&quot;React App&quot;</span><span class="p">,</span>
  <span class="nt">&quot;name&quot;</span><span class="p">:</span> <span class="s2">&quot;Create React App Sample&quot;</span><span class="p">,</span>
  <span class="nt">&quot;icons&quot;</span><span class="p">:</span> <span class="p">[</span>
    <span class="p">{</span>
      <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;favicon.ico&quot;</span><span class="p">,</span>
      <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;64x64 32x32 24x24 16x16&quot;</span><span class="p">,</span>
      <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/x-icon&quot;</span>
    <span class="p">}</span>
  <span class="p">],</span>
  <span class="nt">&quot;start_url&quot;</span><span class="p">:</span> <span class="s2">&quot;.&quot;</span><span class="p">,</span>
  <span class="nt">&quot;display&quot;</span><span class="p">:</span> <span class="s2">&quot;standalone&quot;</span><span class="p">,</span>
  <span class="nt">&quot;theme_color&quot;</span><span class="p">:</span> <span class="s2">&quot;#000000&quot;</span><span class="p">,</span>
  <span class="nt">&quot;background_color&quot;</span><span class="p">:</span> <span class="s2">&quot;#ffffff&quot;</span>
<span class="p">}</span>
</pre></div><a class="headerlink" href="#short_name-react-app-name-create-react-app-sample-icons-src-faviconico-sizes-64x64-32x32-24x24-16x16-type-imagex-icon-start_url-display-standalone-theme_color-000000-background_color-ffffff" title="Permanent link"></a></h2>
<h3 id="buildmanifestjson">/build/manifest.json<a class="headerlink" href="#buildmanifestjson" title="Permanent link"></a></h3>
<h2 id="short_name-react-app-name-create-react-app-sample-icons-src-faviconico-sizes-64x64-32x32-24x24-16x16-type-imagex-icon-start_url-display-standalone-theme_color-000000-background_color-ffffff_1"><div class="codehilite"><pre><span class="p">{</span>
  <span class="nt">&quot;short_name&quot;</span><span class="p">:</span> <span class="s2">&quot;React App&quot;</span><span class="p">,</span>
  <span class="nt">&quot;name&quot;</span><span class="p">:</span> <span class="s2">&quot;Create React App Sample&quot;</span><span class="p">,</span>
  <span class="nt">&quot;icons&quot;</span><span class="p">:</span> <span class="p">[</span>
    <span class="p">{</span>
      <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;favicon.ico&quot;</span><span class="p">,</span>
      <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;64x64 32x32 24x24 16x16&quot;</span><span class="p">,</span>
      <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/x-icon&quot;</span>
    <span class="p">}</span>
  <span class="p">],</span>
  <span class="nt">&quot;start_url&quot;</span><span class="p">:</span> <span class="s2">&quot;.&quot;</span><span class="p">,</span>
  <span class="nt">&quot;display&quot;</span><span class="p">:</span> <span class="s2">&quot;standalone&quot;</span><span class="p">,</span>
  <span class="nt">&quot;theme_color&quot;</span><span class="p">:</span> <span class="s2">&quot;#000000&quot;</span><span class="p">,</span>
  <span class="nt">&quot;background_color&quot;</span><span class="p">:</span> <span class="s2">&quot;#ffffff&quot;</span>
<span class="p">}</span>
</pre></div><a class="headerlink" href="#short_name-react-app-name-create-react-app-sample-icons-src-faviconico-sizes-64x64-32x32-24x24-16x16-type-imagex-icon-start_url-display-standalone-theme_color-000000-background_color-ffffff_1" title="Permanent link"></a></h2>
<h3 id="srcbootstrapcss">/src/bootstrap.css<a class="headerlink" href="#srcbootstrapcss" title="Permanent link"></a></h3>
<h2 id="import-urlhttpsunpkgcombootstrap410distcssbootstrapmincss"><div class="codehilite"><pre><span class="k">@import</span> <span class="nt">url</span><span class="o">(</span><span class="nt">https</span><span class="o">://</span><span class="nt">unpkg</span><span class="nc">.com</span><span class="o">/</span><span class="nt">bootstrap</span><span class="k">@4</span><span class="nc">.1.0</span><span class="o">/</span><span class="nt">dist</span><span class="o">/</span><span class="nt">css</span><span class="o">/</span><span class="nt">bootstrap</span><span class="nc">.min.css</span><span class="o">)</span>
</pre></div><a class="headerlink" href="#import-urlhttpsunpkgcombootstrap410distcssbootstrapmincss" title="Permanent link"></a></h2>
<h3 id="srcappcss">/src/App.css<a class="headerlink" href="#srcappcss" title="Permanent link"></a></h3>
<h2 id="footer-position-absolute-bottom-0-width100-height-40px-background-color-222222-color-white-app-text-align-center-app-logo-animation-app-logo-spin-infinite-20s-linear-height-40vmin-app-header-background-color-282c34-min-height-100vh-display-flex-flex-direction-column-align-items-center-justify-content-center-font-size-calc10px-2vmin-color-white-app-link-color-61dafb-keyframes-app-logo-spin-from-transform-rotate0deg-to-transform-rotate360deg"><div class="codehilite"><pre><span class="nc">.footer</span> <span class="p">{</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">absolute</span><span class="p">;</span>
  <span class="k">bottom</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span><span class="m">100%</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">40px</span><span class="p">;</span>
  <span class="k">background-color</span><span class="o">:</span> <span class="m">#222222</span><span class="p">;</span>
  <span class="k">color</span><span class="o">:</span> <span class="nb">white</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.App</span> <span class="p">{</span>
  <span class="k">text-align</span><span class="o">:</span> <span class="k">center</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.App-logo</span> <span class="p">{</span>
  <span class="n">animation</span><span class="o">:</span> <span class="n">App</span><span class="o">-</span><span class="n">logo</span><span class="o">-</span><span class="n">spin</span> <span class="n">infinite</span> <span class="m">20s</span> <span class="n">linear</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">40</span><span class="n">vmin</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.App-header</span> <span class="p">{</span>
  <span class="k">background-color</span><span class="o">:</span> <span class="m">#282c34</span><span class="p">;</span>
  <span class="k">min-height</span><span class="o">:</span> <span class="m">100</span><span class="n">vh</span><span class="p">;</span>
  <span class="k">display</span><span class="o">:</span> <span class="n">flex</span><span class="p">;</span>
  <span class="n">flex</span><span class="o">-</span><span class="k">direction</span><span class="o">:</span> <span class="n">column</span><span class="p">;</span>
  <span class="n">align</span><span class="o">-</span><span class="n">items</span><span class="o">:</span> <span class="k">center</span><span class="p">;</span>
  <span class="k">justify</span><span class="o">-</span><span class="k">content</span><span class="o">:</span> <span class="k">center</span><span class="p">;</span>
  <span class="k">font-size</span><span class="o">:</span> <span class="n">calc</span><span class="p">(</span><span class="m">10px</span> <span class="o">+</span> <span class="m">2</span><span class="n">vmin</span><span class="p">);</span>
  <span class="k">color</span><span class="o">:</span> <span class="nb">white</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.App-link</span> <span class="p">{</span>
  <span class="k">color</span><span class="o">:</span> <span class="m">#61dafb</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@keyframes</span> <span class="nt">App-logo-spin</span> <span class="p">{</span>
  <span class="nt">from</span> <span class="p">{</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">rotate</span><span class="p">(</span><span class="m">0</span><span class="n">deg</span><span class="p">);</span>
  <span class="p">}</span>
  <span class="nt">to</span> <span class="p">{</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">rotate</span><span class="p">(</span><span class="m">360</span><span class="n">deg</span><span class="p">);</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div><a class="headerlink" href="#footer-position-absolute-bottom-0-width100-height-40px-background-color-222222-color-white-app-text-align-center-app-logo-animation-app-logo-spin-infinite-20s-linear-height-40vmin-app-header-background-color-282c34-min-height-100vh-display-flex-flex-direction-column-align-items-center-justify-content-center-font-size-calc10px-2vmin-color-white-app-link-color-61dafb-keyframes-app-logo-spin-from-transform-rotate0deg-to-transform-rotate360deg" title="Permanent link"></a></h2>
<h3 id="srcindexjs">/src/index.js<a class="headerlink" href="#srcindexjs" title="Permanent link"></a></h3>
<h2 id="import-react-from-react-import-reactdom-from-react-dom-import-indexcss-import-app-from-app-import-as-serviceworker-from-serviceworker-reactdomrenderapp-documentgetelementbyidroot-if-you-want-your-app-to-work-offline-and-load-faster-you-can-change-unregister-to-register-below-note-this-comes-with-some-pitfalls-learn-more-about-service-workers-httpbitlycra-pwa-serviceworkerunregister"><div class="codehilite"><pre><span class="kr">import</span> <span class="nx">React</span> <span class="nx">from</span> <span class="s1">&#39;react&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">ReactDOM</span> <span class="nx">from</span> <span class="s1">&#39;react-dom&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="s1">&#39;./index.css&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">App</span> <span class="nx">from</span> <span class="s1">&#39;./App&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="o">*</span> <span class="nx">as</span> <span class="nx">serviceWorker</span> <span class="nx">from</span> <span class="s1">&#39;./serviceWorker&#39;</span><span class="p">;</span>

<span class="nx">ReactDOM</span><span class="p">.</span><span class="nx">render</span><span class="p">(</span><span class="o">&lt;</span><span class="nx">App</span> <span class="o">/&gt;</span><span class="p">,</span> <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s1">&#39;root&#39;</span><span class="p">));</span>

<span class="c1">// If you want your app to work offline and load faster, you can change</span>
<span class="c1">// unregister() to register() below. Note this comes with some pitfalls.</span>
<span class="c1">// Learn more about service workers: http://bit.ly/CRA-PWA</span>
<span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">unregister</span><span class="p">();</span>
</pre></div><a class="headerlink" href="#import-react-from-react-import-reactdom-from-react-dom-import-indexcss-import-app-from-app-import-as-serviceworker-from-serviceworker-reactdomrenderapp-documentgetelementbyidroot-if-you-want-your-app-to-work-offline-and-load-faster-you-can-change-unregister-to-register-below-note-this-comes-with-some-pitfalls-learn-more-about-service-workers-httpbitlycra-pwa-serviceworkerunregister" title="Permanent link"></a></h2>
<h3 id="srcindexcss">/src/index.css<a class="headerlink" href="#srcindexcss" title="Permanent link"></a></h3>
<h2 id="body-margin-0-padding-0-font-family-apple-system-blinkmacsystemfont-segoe-ui-roboto-oxygen-ubuntu-cantarell-fira-sans-droid-sans-helvetica-neue-sans-serif-webkit-font-smoothing-antialiased-moz-osx-font-smoothing-grayscale-code-font-family-source-code-pro-menlo-monaco-consolas-courier-new-monospace"><div class="codehilite"><pre><span class="nt">body</span> <span class="p">{</span>
  <span class="k">margin</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">padding</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">font-family</span><span class="o">:</span> <span class="o">-</span><span class="n">apple</span><span class="o">-</span><span class="n">system</span><span class="o">,</span> <span class="n">BlinkMacSystemFont</span><span class="o">,</span> <span class="s2">&quot;Segoe UI&quot;</span><span class="o">,</span> <span class="s2">&quot;Roboto&quot;</span><span class="o">,</span> <span class="s2">&quot;Oxygen&quot;</span><span class="o">,</span>
    <span class="s2">&quot;Ubuntu&quot;</span><span class="o">,</span> <span class="s2">&quot;Cantarell&quot;</span><span class="o">,</span> <span class="s2">&quot;Fira Sans&quot;</span><span class="o">,</span> <span class="s2">&quot;Droid Sans&quot;</span><span class="o">,</span> <span class="s2">&quot;Helvetica Neue&quot;</span><span class="o">,</span>
    <span class="k">sans-serif</span><span class="p">;</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="k">font</span><span class="o">-</span><span class="n">smoothing</span><span class="o">:</span> <span class="n">antialiased</span><span class="p">;</span>
  <span class="o">-</span><span class="n">moz</span><span class="o">-</span><span class="n">osx</span><span class="o">-</span><span class="k">font</span><span class="o">-</span><span class="n">smoothing</span><span class="o">:</span> <span class="n">grayscale</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">code</span> <span class="p">{</span>
  <span class="k">font-family</span><span class="o">:</span> <span class="n">source</span><span class="o">-</span><span class="n">code</span><span class="o">-</span><span class="n">pro</span><span class="o">,</span> <span class="n">Menlo</span><span class="o">,</span> <span class="n">Monaco</span><span class="o">,</span> <span class="n">Consolas</span><span class="o">,</span> <span class="s2">&quot;Courier New&quot;</span><span class="o">,</span>
    <span class="k">monospace</span><span class="p">;</span>
<span class="p">}</span>
</pre></div><a class="headerlink" href="#body-margin-0-padding-0-font-family-apple-system-blinkmacsystemfont-segoe-ui-roboto-oxygen-ubuntu-cantarell-fira-sans-droid-sans-helvetica-neue-sans-serif-webkit-font-smoothing-antialiased-moz-osx-font-smoothing-grayscale-code-font-family-source-code-pro-menlo-monaco-consolas-courier-new-monospace" title="Permanent link"></a></h2>
<h3 id="srcapptestjs">/src/App.test.js<a class="headerlink" href="#srcapptestjs" title="Permanent link"></a></h3>
<h2 id="import-react-from-react-import-reactdom-from-react-dom-import-app-from-app-itrenders-without-crashing-const-div-documentcreateelementdiv-reactdomrenderapp-div-reactdomunmountcomponentatnodediv"><div class="codehilite"><pre><span class="kr">import</span> <span class="nx">React</span> <span class="nx">from</span> <span class="s1">&#39;react&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">ReactDOM</span> <span class="nx">from</span> <span class="s1">&#39;react-dom&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">App</span> <span class="nx">from</span> <span class="s1">&#39;./App&#39;</span><span class="p">;</span>

<span class="nx">it</span><span class="p">(</span><span class="s1">&#39;renders without crashing&#39;</span><span class="p">,</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
  <span class="kr">const</span> <span class="nx">div</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;div&#39;</span><span class="p">);</span>
  <span class="nx">ReactDOM</span><span class="p">.</span><span class="nx">render</span><span class="p">(</span><span class="o">&lt;</span><span class="nx">App</span> <span class="o">/&gt;</span><span class="p">,</span> <span class="nx">div</span><span class="p">);</span>
  <span class="nx">ReactDOM</span><span class="p">.</span><span class="nx">unmountComponentAtNode</span><span class="p">(</span><span class="nx">div</span><span class="p">);</span>
<span class="p">});</span>
</pre></div><a class="headerlink" href="#import-react-from-react-import-reactdom-from-react-dom-import-app-from-app-itrenders-without-crashing-const-div-documentcreateelementdiv-reactdomrenderapp-div-reactdomunmountcomponentatnodediv" title="Permanent link"></a></h2>
<h3 id="srcserviceworkerjs">/src/serviceWorker.js<a class="headerlink" href="#srcserviceworkerjs" title="Permanent link"></a></h3>
<h2 id="this-optional-code-is-used-to-register-a-service-worker-register-is-not-called-by-default-this-lets-the-app-load-faster-on-subsequent-visits-in-production-and-gives-it-offline-capabilities-however-it-also-means-that-developers-and-users-will-only-see-deployed-updates-on-subsequent-visits-to-a-page-after-all-the-existing-tabs-open-on-the-page-have-been-closed-since-previously-cached-resources-are-updated-in-the-background-to-learn-more-about-the-benefits-of-this-model-and-instructions-on-how-to-opt-in-read-httpbitlycra-pwa-const-islocalhost-boolean-windowlocationhostname-localhost-1-is-the-ipv6-localhost-address-windowlocationhostname-1-1270018-is-considered-localhost-for-ipv4-windowlocationhostnamematch-127250-520-40-9010-90-93-export-function-registerconfig-if-processenvnode_env-production-serviceworker-in-navigator-the-url-constructor-is-available-in-all-browsers-that-support-sw-const-publicurl-new-urlprocessenvpublic_url-windowlocationhref-if-publicurlorigin-windowlocationorigin-our-service-worker-wont-work-if-public_url-is-on-a-different-origin-from-what-our-page-is-served-on-this-might-happen-if-a-cdn-is-used-to-serve-assets-see-httpsgithubcomfacebookcreate-react-appissues2374-return-windowaddeventlistenerload-const-swurl-processenvpublic_urlservice-workerjs-if-islocalhost-this-is-running-on-localhost-lets-check-if-a-service-worker-still-exists-or-not-checkvalidserviceworkerswurl-config-add-some-additional-logging-to-localhost-pointing-developers-to-the-service-workerpwa-documentation-navigatorserviceworkerreadythen-consolelog-this-web-app-is-being-served-cache-first-by-a-service-worker-to-learn-more-visit-httpbitlycra-pwa-else-is-not-localhost-just-register-service-worker-registervalidswswurl-config-function-registervalidswswurl-config-navigatorserviceworker-registerswurl-thenregistration-registrationonupdatefound-const-installingworker-registrationinstalling-if-installingworker-null-return-installingworkeronstatechange-if-installingworkerstate-installed-if-navigatorserviceworkercontroller-at-this-point-the-updated-precached-content-has-been-fetched-but-the-previous-service-worker-will-still-serve-the-older-content-until-all-client-tabs-are-closed-consolelog-new-content-is-available-and-will-be-used-when-all-tabs-for-this-page-are-closed-see-httpbitlycra-pwa-execute-callback-if-config-configonupdate-configonupdateregistration-else-at-this-point-everything-has-been-precached-its-the-perfect-time-to-display-a-content-is-cached-for-offline-use-message-consolelogcontent-is-cached-for-offline-use-execute-callback-if-config-configonsuccess-configonsuccessregistration-catcherror-consoleerrorerror-during-service-worker-registration-error-function-checkvalidserviceworkerswurl-config-check-if-the-service-worker-can-be-found-if-it-cant-reload-the-page-fetchswurl-thenresponse-ensure-service-worker-exists-and-that-we-really-are-getting-a-js-file-const-contenttype-responseheadersgetcontent-type-if-responsestatus-404-contenttype-null-contenttypeindexofjavascript-1-no-service-worker-found-probably-a-different-app-reload-the-page-navigatorserviceworkerreadythenregistration-registrationunregisterthen-windowlocationreload-else-service-worker-found-proceed-as-normal-registervalidswswurl-config-catch-consolelog-no-internet-connection-found-app-is-running-in-offline-mode-export-function-unregister-if-serviceworker-in-navigator-navigatorserviceworkerreadythenregistration-registrationunregister"><div class="codehilite"><pre><span class="c1">// This optional code is used to register a service worker.</span>
<span class="c1">// register() is not called by default.</span>

<span class="c1">// This lets the app load faster on subsequent visits in production, and gives</span>
<span class="c1">// it offline capabilities. However, it also means that developers (and users)</span>
<span class="c1">// will only see deployed updates on subsequent visits to a page, after all the</span>
<span class="c1">// existing tabs open on the page have been closed, since previously cached</span>
<span class="c1">// resources are updated in the background.</span>

<span class="c1">// To learn more about the benefits of this model and instructions on how to</span>
<span class="c1">// opt-in, read http://bit.ly/CRA-PWA</span>

<span class="kr">const</span> <span class="nx">isLocalhost</span> <span class="o">=</span> <span class="nb">Boolean</span><span class="p">(</span>
  <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">hostname</span> <span class="o">===</span> <span class="s1">&#39;localhost&#39;</span> <span class="o">||</span>
    <span class="c1">// [::1] is the IPv6 localhost address.</span>
    <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">hostname</span> <span class="o">===</span> <span class="s1">&#39;[::1]&#39;</span> <span class="o">||</span>
    <span class="c1">// 127.0.0.1/8 is considered localhost for IPv4.</span>
    <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">hostname</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span>
      <span class="sr">/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/</span>
    <span class="p">)</span>
<span class="p">);</span>

<span class="kr">export</span> <span class="kd">function</span> <span class="nx">register</span><span class="p">(</span><span class="nx">config</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">NODE_ENV</span> <span class="o">===</span> <span class="s1">&#39;production&#39;</span> <span class="o">&amp;&amp;</span> <span class="s1">&#39;serviceWorker&#39;</span> <span class="k">in</span> <span class="nx">navigator</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// The URL constructor is available in all browsers that support SW.</span>
    <span class="kr">const</span> <span class="nx">publicUrl</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">URL</span><span class="p">(</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PUBLIC_URL</span><span class="p">,</span> <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">href</span><span class="p">);</span>
    <span class="k">if</span> <span class="p">(</span><span class="nx">publicUrl</span><span class="p">.</span><span class="nx">origin</span> <span class="o">!==</span> <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">origin</span><span class="p">)</span> <span class="p">{</span>
      <span class="c1">// Our service worker won&#39;t work if PUBLIC_URL is on a different origin</span>
      <span class="c1">// from what our page is served on. This might happen if a CDN is used to</span>
      <span class="c1">// serve assets; see https://github.com/facebook/create-react-app/issues/2374</span>
      <span class="k">return</span><span class="p">;</span>
    <span class="p">}</span>

    <span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;load&#39;</span><span class="p">,</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="kr">const</span> <span class="nx">swUrl</span> <span class="o">=</span> <span class="err">`</span><span class="nx">$</span><span class="p">{</span><span class="nx">process</span><span class="p">.</span><span class="nx">env</span><span class="p">.</span><span class="nx">PUBLIC_URL</span><span class="p">}</span><span class="o">/</span><span class="nx">service</span><span class="o">-</span><span class="nx">worker</span><span class="p">.</span><span class="nx">js</span><span class="err">`</span><span class="p">;</span>

      <span class="k">if</span> <span class="p">(</span><span class="nx">isLocalhost</span><span class="p">)</span> <span class="p">{</span>
        <span class="c1">// This is running on localhost. Let&#39;s check if a service worker still exists or not.</span>
        <span class="nx">checkValidServiceWorker</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">,</span> <span class="nx">config</span><span class="p">);</span>

        <span class="c1">// Add some additional logging to localhost, pointing developers to the</span>
        <span class="c1">// service worker/PWA documentation.</span>
        <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">ready</span><span class="p">.</span><span class="nx">then</span><span class="p">(()</span> <span class="o">=&gt;</span> <span class="p">{</span>
          <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span>
            <span class="s1">&#39;This web app is being served cache-first by a service &#39;</span> <span class="o">+</span>
              <span class="s1">&#39;worker. To learn more, visit http://bit.ly/CRA-PWA&#39;</span>
          <span class="p">);</span>
        <span class="p">});</span>
      <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
        <span class="c1">// Is not localhost. Just register service worker</span>
        <span class="nx">registerValidSW</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">,</span> <span class="nx">config</span><span class="p">);</span>
      <span class="p">}</span>
    <span class="p">});</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">registerValidSW</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">,</span> <span class="nx">config</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span>
    <span class="p">.</span><span class="nx">register</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">)</span>
    <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="nx">registration</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">registration</span><span class="p">.</span><span class="nx">onupdatefound</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
        <span class="kr">const</span> <span class="nx">installingWorker</span> <span class="o">=</span> <span class="nx">registration</span><span class="p">.</span><span class="nx">installing</span><span class="p">;</span>
        <span class="k">if</span> <span class="p">(</span><span class="nx">installingWorker</span> <span class="o">==</span> <span class="kc">null</span><span class="p">)</span> <span class="p">{</span>
          <span class="k">return</span><span class="p">;</span>
        <span class="p">}</span>
        <span class="nx">installingWorker</span><span class="p">.</span><span class="nx">onstatechange</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
          <span class="k">if</span> <span class="p">(</span><span class="nx">installingWorker</span><span class="p">.</span><span class="nx">state</span> <span class="o">===</span> <span class="s1">&#39;installed&#39;</span><span class="p">)</span> <span class="p">{</span>
            <span class="k">if</span> <span class="p">(</span><span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">controller</span><span class="p">)</span> <span class="p">{</span>
              <span class="c1">// At this point, the updated precached content has been fetched,</span>
              <span class="c1">// but the previous service worker will still serve the older</span>
              <span class="c1">// content until all client tabs are closed.</span>
              <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span>
                <span class="s1">&#39;New content is available and will be used when all &#39;</span> <span class="o">+</span>
                  <span class="s1">&#39;tabs for this page are closed. See http://bit.ly/CRA-PWA.&#39;</span>
              <span class="p">);</span>

              <span class="c1">// Execute callback</span>
              <span class="k">if</span> <span class="p">(</span><span class="nx">config</span> <span class="o">&amp;&amp;</span> <span class="nx">config</span><span class="p">.</span><span class="nx">onUpdate</span><span class="p">)</span> <span class="p">{</span>
                <span class="nx">config</span><span class="p">.</span><span class="nx">onUpdate</span><span class="p">(</span><span class="nx">registration</span><span class="p">);</span>
              <span class="p">}</span>
            <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
              <span class="c1">// At this point, everything has been precached.</span>
              <span class="c1">// It&#39;s the perfect time to display a</span>
              <span class="c1">// &quot;Content is cached for offline use.&quot; message.</span>
              <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Content is cached for offline use.&#39;</span><span class="p">);</span>

              <span class="c1">// Execute callback</span>
              <span class="k">if</span> <span class="p">(</span><span class="nx">config</span> <span class="o">&amp;&amp;</span> <span class="nx">config</span><span class="p">.</span><span class="nx">onSuccess</span><span class="p">)</span> <span class="p">{</span>
                <span class="nx">config</span><span class="p">.</span><span class="nx">onSuccess</span><span class="p">(</span><span class="nx">registration</span><span class="p">);</span>
              <span class="p">}</span>
            <span class="p">}</span>
          <span class="p">}</span>
        <span class="p">};</span>
      <span class="p">};</span>
    <span class="p">})</span>
    <span class="p">.</span><span class="k">catch</span><span class="p">(</span><span class="nx">error</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="s1">&#39;Error during service worker registration:&#39;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
    <span class="p">});</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">checkValidServiceWorker</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">,</span> <span class="nx">config</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Check if the service worker can be found. If it can&#39;t reload the page.</span>
  <span class="nx">fetch</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">)</span>
    <span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="c1">// Ensure service worker exists, and that we really are getting a JS file.</span>
      <span class="kr">const</span> <span class="nx">contentType</span> <span class="o">=</span> <span class="nx">response</span><span class="p">.</span><span class="nx">headers</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;content-type&#39;</span><span class="p">);</span>
      <span class="k">if</span> <span class="p">(</span>
        <span class="nx">response</span><span class="p">.</span><span class="nx">status</span> <span class="o">===</span> <span class="mi">404</span> <span class="o">||</span>
        <span class="p">(</span><span class="nx">contentType</span> <span class="o">!=</span> <span class="kc">null</span> <span class="o">&amp;&amp;</span> <span class="nx">contentType</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s1">&#39;javascript&#39;</span><span class="p">)</span> <span class="o">===</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span>
      <span class="p">)</span> <span class="p">{</span>
        <span class="c1">// No service worker found. Probably a different app. Reload the page.</span>
        <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">ready</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="nx">registration</span> <span class="o">=&gt;</span> <span class="p">{</span>
          <span class="nx">registration</span><span class="p">.</span><span class="nx">unregister</span><span class="p">().</span><span class="nx">then</span><span class="p">(()</span> <span class="o">=&gt;</span> <span class="p">{</span>
            <span class="nb">window</span><span class="p">.</span><span class="nx">location</span><span class="p">.</span><span class="nx">reload</span><span class="p">();</span>
          <span class="p">});</span>
        <span class="p">});</span>
      <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
        <span class="c1">// Service worker found. Proceed as normal.</span>
        <span class="nx">registerValidSW</span><span class="p">(</span><span class="nx">swUrl</span><span class="p">,</span> <span class="nx">config</span><span class="p">);</span>
      <span class="p">}</span>
    <span class="p">})</span>
    <span class="p">.</span><span class="k">catch</span><span class="p">(()</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span>
        <span class="s1">&#39;No internet connection found. App is running in offline mode.&#39;</span>
      <span class="p">);</span>
    <span class="p">});</span>
<span class="p">}</span>

<span class="kr">export</span> <span class="kd">function</span> <span class="nx">unregister</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;serviceWorker&#39;</span> <span class="k">in</span> <span class="nx">navigator</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">navigator</span><span class="p">.</span><span class="nx">serviceWorker</span><span class="p">.</span><span class="nx">ready</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="nx">registration</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">registration</span><span class="p">.</span><span class="nx">unregister</span><span class="p">();</span>
    <span class="p">});</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div><a class="headerlink" href="#this-optional-code-is-used-to-register-a-service-worker-register-is-not-called-by-default-this-lets-the-app-load-faster-on-subsequent-visits-in-production-and-gives-it-offline-capabilities-however-it-also-means-that-developers-and-users-will-only-see-deployed-updates-on-subsequent-visits-to-a-page-after-all-the-existing-tabs-open-on-the-page-have-been-closed-since-previously-cached-resources-are-updated-in-the-background-to-learn-more-about-the-benefits-of-this-model-and-instructions-on-how-to-opt-in-read-httpbitlycra-pwa-const-islocalhost-boolean-windowlocationhostname-localhost-1-is-the-ipv6-localhost-address-windowlocationhostname-1-1270018-is-considered-localhost-for-ipv4-windowlocationhostnamematch-127250-520-40-9010-90-93-export-function-registerconfig-if-processenvnode_env-production-serviceworker-in-navigator-the-url-constructor-is-available-in-all-browsers-that-support-sw-const-publicurl-new-urlprocessenvpublic_url-windowlocationhref-if-publicurlorigin-windowlocationorigin-our-service-worker-wont-work-if-public_url-is-on-a-different-origin-from-what-our-page-is-served-on-this-might-happen-if-a-cdn-is-used-to-serve-assets-see-httpsgithubcomfacebookcreate-react-appissues2374-return-windowaddeventlistenerload-const-swurl-processenvpublic_urlservice-workerjs-if-islocalhost-this-is-running-on-localhost-lets-check-if-a-service-worker-still-exists-or-not-checkvalidserviceworkerswurl-config-add-some-additional-logging-to-localhost-pointing-developers-to-the-service-workerpwa-documentation-navigatorserviceworkerreadythen-consolelog-this-web-app-is-being-served-cache-first-by-a-service-worker-to-learn-more-visit-httpbitlycra-pwa-else-is-not-localhost-just-register-service-worker-registervalidswswurl-config-function-registervalidswswurl-config-navigatorserviceworker-registerswurl-thenregistration-registrationonupdatefound-const-installingworker-registrationinstalling-if-installingworker-null-return-installingworkeronstatechange-if-installingworkerstate-installed-if-navigatorserviceworkercontroller-at-this-point-the-updated-precached-content-has-been-fetched-but-the-previous-service-worker-will-still-serve-the-older-content-until-all-client-tabs-are-closed-consolelog-new-content-is-available-and-will-be-used-when-all-tabs-for-this-page-are-closed-see-httpbitlycra-pwa-execute-callback-if-config-configonupdate-configonupdateregistration-else-at-this-point-everything-has-been-precached-its-the-perfect-time-to-display-a-content-is-cached-for-offline-use-message-consolelogcontent-is-cached-for-offline-use-execute-callback-if-config-configonsuccess-configonsuccessregistration-catcherror-consoleerrorerror-during-service-worker-registration-error-function-checkvalidserviceworkerswurl-config-check-if-the-service-worker-can-be-found-if-it-cant-reload-the-page-fetchswurl-thenresponse-ensure-service-worker-exists-and-that-we-really-are-getting-a-js-file-const-contenttype-responseheadersgetcontent-type-if-responsestatus-404-contenttype-null-contenttypeindexofjavascript-1-no-service-worker-found-probably-a-different-app-reload-the-page-navigatorserviceworkerreadythenregistration-registrationunregisterthen-windowlocationreload-else-service-worker-found-proceed-as-normal-registervalidswswurl-config-catch-consolelog-no-internet-connection-found-app-is-running-in-offline-mode-export-function-unregister-if-serviceworker-in-navigator-navigatorserviceworkerreadythenregistration-registrationunregister" title="Permanent link"></a></h2>
<h3 id="srclogosvg">/src/logo.svg<a class="headerlink" href="#srclogosvg" title="Permanent link"></a></h3>
<h2 id="svg-xmlnshttpwwww3org2000svg-viewbox0-0-8419-5953-g-fill61dafb-path-dm6663-2965c0-325-407-633-1031-824-144-636-8-1142-202-1304-65-38-141-56-224-56v223c46-0-839-114-26-136-78-195-375-149-757-11-94-29-193-51-294-196-48-41-85-635-109-135-185-275-353-416-50-326-303-632-469-84-469v78c-275-0-635-196-999-536-364-338-724-532-999-532v223c207-0-514-165-84-466-14-147-28-314-413-499-226-24-44-61-636-11-23-10-4-197-52-29-47-382-11-679-146-758-3-18-69-26-115-26v785c-84-0-16-18-226-56-281-162-344-667-199-1301-622-192-1027-499-1027-823-0-325-407-633-1031-824-144-636-8-1142-202-1304-65-38-141-56-225-56-275-0-635-196-999-536-364-338-724-532-999-532-84-0-16-18-226-56-281-162-344-667-199-1301-62-191-1025-499-1025-823zm-1302-667c-37-129-83-262-135-395-41-8-84-16-131-24-46-8-95-158-144-234-142-21-279-47-41-79zm-458-1065c-78-135-158-263-241-382-149-13-30-2-452-2-151-0-302-7-45-19-83-119-164-246-242-38-76-131-145-264-208-398-62-134-132-268-207-399-78-135-158-263-241-382-149-13-30-2-452-2-151-0-3027-45-19-83-119-164-246-242-38-76-131-145-264-208-398-63-134-132-268-207-399zm323-13c54-134-10-268-138-398-131-32-269-59-412-8-49-77-98-156-144-237-46-8-89-161-13-241zm4212-430c-93-96-186-203-278-32-9-4-1827-2757-94-0-187-2-278-7-9-117-183-224-275-32zm-744-589c-142-21-279-47-41-79-37-129-83-262-135-395-41-8-84-16-131-24-47-8-95-158-144-234zm4207-163c93-96-186-203-278-32-9-4-182-7-275-7-94-0-1872-2787-9-117-183-224-275-32zm-74-589c-49-77-98-156-144-237-46-8-89-16-13-24-54-134-10-268-138-398-131-31-269-58-412-79zm-905-1252c-354-151-583-349-583-506-0-157-229-356-583-506-86-37-18-7-277-101-57-196-132-40-225-609-92-208-166-411-222-606-99-31-193-65-28-102zm310-490c-136-78-195-375-149-757-11-94-29-193-51-294-196-48-41-85-635-109-135-185-275-353-416-50-326-303-632-469-84-469-45-1-83-1-113-27zm2372-762c47-382-11-679-146-758-3-18-69-26-115-26-207-0-514-165-84-466-14-147-28-314-413-499-226-24-44-61-636-11-23-101-41-198-52-291zm385-667c-86-37-18-7-277-101-57-196-132-40-225-609-92-208-166-411-222-606-99-31-193-65-281-102-354-151-583-349-583-506-1-157-23-356-584-506zm3208-784z-circle-cx4209-cy2965-r457-path-dm5205-781z-g-svg"><div class="codehilite"><pre>&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 841.9 595.3&quot;&gt;
    &lt;g fill=&quot;#61DAFB&quot;&gt;
        &lt;path d=&quot;M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z&quot;/&gt;
        &lt;circle cx=&quot;420.9&quot; cy=&quot;296.5&quot; r=&quot;45.7&quot;/&gt;
        &lt;path d=&quot;M520.5 78.1z&quot;/&gt;
    &lt;/g&gt;
&lt;/svg&gt;
</pre></div><a class="headerlink" href="#svg-xmlnshttpwwww3org2000svg-viewbox0-0-8419-5953-g-fill61dafb-path-dm6663-2965c0-325-407-633-1031-824-144-636-8-1142-202-1304-65-38-141-56-224-56v223c46-0-839-114-26-136-78-195-375-149-757-11-94-29-193-51-294-196-48-41-85-635-109-135-185-275-353-416-50-326-303-632-469-84-469v78c-275-0-635-196-999-536-364-338-724-532-999-532v223c207-0-514-165-84-466-14-147-28-314-413-499-226-24-44-61-636-11-23-10-4-197-52-29-47-382-11-679-146-758-3-18-69-26-115-26v785c-84-0-16-18-226-56-281-162-344-667-199-1301-622-192-1027-499-1027-823-0-325-407-633-1031-824-144-636-8-1142-202-1304-65-38-141-56-225-56-275-0-635-196-999-536-364-338-724-532-999-532-84-0-16-18-226-56-281-162-344-667-199-1301-62-191-1025-499-1025-823zm-1302-667c-37-129-83-262-135-395-41-8-84-16-131-24-46-8-95-158-144-234-142-21-279-47-41-79zm-458-1065c-78-135-158-263-241-382-149-13-30-2-452-2-151-0-302-7-45-19-83-119-164-246-242-38-76-131-145-264-208-398-62-134-132-268-207-399-78-135-158-263-241-382-149-13-30-2-452-2-151-0-3027-45-19-83-119-164-246-242-38-76-131-145-264-208-398-63-134-132-268-207-399zm323-13c54-134-10-268-138-398-131-32-269-59-412-8-49-77-98-156-144-237-46-8-89-161-13-241zm4212-430c-93-96-186-203-278-32-9-4-1827-2757-94-0-187-2-278-7-9-117-183-224-275-32zm-744-589c-142-21-279-47-41-79-37-129-83-262-135-395-41-8-84-16-131-24-47-8-95-158-144-234zm4207-163c93-96-186-203-278-32-9-4-182-7-275-7-94-0-1872-2787-9-117-183-224-275-32zm-74-589c-49-77-98-156-144-237-46-8-89-16-13-24-54-134-10-268-138-398-131-31-269-58-412-79zm-905-1252c-354-151-583-349-583-506-0-157-229-356-583-506-86-37-18-7-277-101-57-196-132-40-225-609-92-208-166-411-222-606-99-31-193-65-28-102zm310-490c-136-78-195-375-149-757-11-94-29-193-51-294-196-48-41-85-635-109-135-185-275-353-416-50-326-303-632-469-84-469-45-1-83-1-113-27zm2372-762c47-382-11-679-146-758-3-18-69-26-115-26-207-0-514-165-84-466-14-147-28-314-413-499-226-24-44-61-636-11-23-101-41-198-52-291zm385-667c-86-37-18-7-277-101-57-196-132-40-225-609-92-208-166-411-222-606-99-31-193-65-281-102-354-151-583-349-583-506-1-157-23-356-584-506zm3208-784z-circle-cx4209-cy2965-r457-path-dm5205-781z-g-svg" title="Permanent link"></a></h2>
<h3 id="srcappjs">/src/App.js<a class="headerlink" href="#srcappjs" title="Permanent link"></a></h3>
<h2 id="todo-eventpreventdefault-constants-for-url-import-react-component-from-react-import-browserrouter-as-router-route-link-switch-from-react-router-dom-import-bootstrapcss-import-appcss-import-redirect-from-react-router-domredirect-import-welcomeservice-from-serviceswelcomeservice-import-todoservice-from-servicestodoservice-import-formik-form-field-errormessage-from-formik-import-moment-from-moment-import-axios-from-axios-axiosinterceptorsrequestuse-config-if-basicauthenticationserviceinstanceisuseralreadyloggedin-configheadersauthorization-basicauthenticationserviceinstancegetauthenticatedtoken-consolelogconfigheadersauthorization-return-config-error-promiserejecterror-consolelogafter-thisisuserloggedin-class-basicauthenticationservice-executejwtauthenticationserviceusername-password-return-axiosposthttplocalhost8080authenticate-username-password-registersuccessfulloginforjwtusername-token-sessionstoragesetitemauthenticateruser-username-sessionstoragesetitemtoken-bearer-token-executebasicauthenticationserviceusername-password-let-basicauthheaderstring-basic-windowbtoausername-password-return-axiosgethttplocalhost8080basicauth-headers-authorization-basicauthheaderstring-registersuccessfulloginusername-password-let-basicauthheaderstring-basic-windowbtoausername-password-sessionstoragesetitemauthenticateruser-username-sessionstoragesetitemtoken-basicauthheaderstring-isuseralreadyloggedin-let-user-sessionstoragegetitemauthenticateruser-let-result-user-null-consoleloguserloggedin-result-return-result-getusername-return-sessionstoragegetitemauthenticateruser-getauthenticatedtoken-if-thisisuseralreadyloggedin-return-sessionstoragegetitemtoken-logout-sessionstorageremoveitemauthenticateruser-sessionstorageremoveitemtoken-const-basicauthenticationserviceinstance-new-basicauthenticationservice-const-usercontext-reactcreatecontext-const-usercontextconsumer-usercontextconsumer-class-usercontextprovider-extends-component-state-username-isuserloggedin-false-userloggedinsuccessfully-username-thisuserloggedinsuccessfullyusername-userloggedout-thisuserloggedout-userloggedinsuccessfully-username-thissetstate-username-isuserloggedin-true-userloggedout-thissetstate-username-isuserloggedin-false-render-consolelogthisprops-return-usercontextprovider-valuethisstate-thispropschildren-usercontextprovider-class-login-extends-component-constructorprops-superprops-thisloginclicked-thisloginclickedbindthis-thishandleusernamechange-thishandleusernamechangebindthis-thishandlepasswordchange-thishandlepasswordchangebindthis-thisstate-username-in28minutes-password-dummy-invalidlogin-false-static-contexttype-usercontext-render-const-warningmessage-thisstateinvalidlogin-invalid-login-return-h1-loginh1-div-classnamecontainer-thisstateinvalidlogin-div-classnamealert-alert-warningwarningmessagediv-div-user-name-input-typetext-nameusername-valuethisstateusername-onchangethishandleusernamechange-password-input-typepassword-namepassword-valuethisstatepassword-onchangethishandlepasswordchange-button-onclickthisloginclicked-classnamebtn-btn-successloginbutton-usercontextconsumer-context-divpcontextusernamepdiv-usercontextconsumer-div-div-handleusernamechangeevent-thissetstate-username-eventtargetvalue-handlepasswordchangeevent-thissetstate-password-eventtargetvalue-loginclickede-hardcoded-auth-consolelogthisstate-const-isvaliduser-new-hardcodedauthenticationcomponentauthenticatethisstateusername-thisstatepassword-const-isvaliduser-todoserviceexecutebasicauthenticationservicethisstateusername-thisstatepassword-if-isvaliduser-thissetstate-invalidlogin-false-consolelogthiscontext-thiscontextuserloggedinsuccessfullythisstateusername-consolelogthisstate-thispropshistorypushwelcome-thispropshistorypushwelcomethisstateusername-else-thissetstate-invalidlogin-true-loginclickede-basic-authentication-consolelogthisstate-const-isvaliduser-new-hardcodedauthenticationcomponentauthenticatethisstateusername-thisstatepassword-basicauthenticationserviceinstanceexecutebasicauthenticationservicethisstateusername-thisstatepasswordthenresponse-basicauthenticationserviceinstanceexecutejwtauthenticationservicethisstateusername-thisstatepasswordthenresponse-consolelogexecution-successful-thissetstate-invalidlogin-false-thiscontextuserloggedinsuccessfullythisstateusername-thiscontextuserloggedinsuccessfullythisstateusername-basicauthenticationserviceinstanceregistersuccessfulloginthisstateusername-thisstatepassword-basicauthenticationserviceinstanceregistersuccessfulloginforjwtthisstateusername-responsedatatoken-thispropshistorypushwelcomethisstateusername-error-thissetstate-invalidlogin-true-class-logout-extends-component-constructorprops-superprops-render-var-myinterceptor-axiosinterceptorsrequestusefunction-axiosinterceptorsrequesteject0-return-h1you-are-logged-outh1-div-classnamecontainer-thank-you-for-using-our-application-div-const-authenticatedroute-component-component-authenticated-rest-usercontextconsumer-isuserloggedin-route-render-props-basicauthenticationserviceinstanceisuseralreadyloggedin-component-props-usernamebasicauthenticationserviceinstancegetusername-redirect-tologin-redirect-to-why-pathname-login-state-from-propslocation-rest-usercontextconsumer-class-app-extends-component-render-return-usercontextprovider-router-menumenu-div-classnamecontainer-switch-route-exact-path-componentlogin-route-exact-pathlogin-componentlogin-authenticatedroute-pathwelcomename-componentwelcome-authenticatedroute-pathtodotodoid-componenttodo-authenticatedroute-pathtodos-componentlisttodo-route-pathlogout-componentlogout-route-componenterror-switch-div-footerfooter-router-usercontextprovider-class-todo-extends-component-constructorprops-superprops-thisvalidate-thisvalidatebindthis-thisonsubmit-thisonsubmitbindthis-thisstate-id-propsmatchparamstodoid-description-targetdate-componentdidmount-if-thisstateid-1-todoserviceretrievetodoin28minutes-thisstateidthenresponse-thissetstate-responsedata-targetdate-momentresponsedatatargetdateformatyyyy-mm-dd-validatevalues-let-errors-if-valuesdescription-errorsdescription-enter-valid-values-else-if-valuesdescriptionlength-5-errorsdescription-enter-atleast-5-characters-in-description-if-momentvaluestargetdateisvalid-errorstargetdate-enter-valid-target-date-return-errors-onsubmitvalues-if-thisstateid-1-todoservicecreatetodoin28minutes-description-valuesdescription-targetdate-valuestargetdate-thenresponse-consolelogresponsedata-thispropshistorypushtodos-else-todoserviceupdatetodoin28minutes-thisstateid-id-thisstateid-description-valuesdescription-targetdate-valuestargetdate-thenresponse-consolelogresponsedata-thispropshistorypushtodos-render-const-description-targetdate-thisstate-return-h1todoh1-div-classnamecontainer-formik-initialvalues-description-targetdate-validateonblurfalse-enablereinitializetrue-validatethisvalidate-onsubmitthisonsubmit-errors-issubmitting-form-errormessage-classnamealert-alert-warning-componentdiv-namedescription-errormessage-classnamealert-alert-warning-componentdiv-nametargetdate-fieldset-classnameform-group-labeldescriptionlabel-field-classnameform-control-errorsdescription-invalid-typetext-namedescription-fieldset-fieldset-classnameform-group-labeltarget-datelabel-field-classnameform-control-errorstargetdate-invalid-typedate-nametargetdate-fieldset-button-classnamebtn-btn-success-typesubmit-disabledissubmittingsavebutton-form-formik-div-class-listtodo-extends-component-static-contexttype-usercontext-constructorprops-superprops-thisrefreshtodos-thisrefreshtodosbindthis-thisshownewtodopage-thisshownewtodopagebindthis-thisshowupdatetodopage-thisshowupdatetodopagebindthis-thisshowdeletetodopage-thisshowdeletetodopagebindthis-thisstate-todo-id-1-description-learn-to-dance-thisstate-todos-id-1-description-learn-to-dance-old-done-false-targetdate-new-date-id-2-description-become-an-expert-at-angular-old-done-false-targetdate-new-date-id-3-description-visit-india-old-done-false-targetdate-new-date-message-shownewtodopage-thispropshistorypushtodo-1-showupdatetodopagee-todo-consoleloge-todo-thispropshistorypushtodotodoid-showdeletetodopagee-todo-consoleloge-todo-todoservicedeletetodothispropsusername-todoidthenresponse-consolelogresponse-thissetstate-message-delete-of-todo-todoid-successful-thisrefreshtodos-componentdidmount-thisrefreshtodos-refreshtodos-todoserviceretrievealltodosin28minutesthenresponse-thissetstate-todos-responsedata-catcherror-consolelogerror-render-return-table-border1-captionmy-todoscaption-thead-tr-thidth-thdescriptionth-tr-thead-tbody-tr-ththisstatetodoidth-ththisstatetododescriptionth-tr-tbody-table-const-todosview-thisstatetodosmaptodo-tr-keytodoid-tdtododescriptiontd-tdtodotargetdatetostringtd-tdtododonetostringtd-tdbutton-onclicke-thisshowupdatetodopagee-todo-classnamebtn-btn-successupdatebuttontd-tdbutton-onclicke-thisshowdeletetodopagee-todo-classnamebtn-btn-warningdeletebuttontd-tr-return-h1-my-todosh1-div-classnamecontainer-thisstatemessage-div-classnamealert-alert-success-thisstatemessagediv-table-classnametable-thead-tr-thdescriptionth-thtarget-dateth-this-completedth-thupdateth-thdeleteth-tr-thead-tbody-todosview-tbody-table-div-classnamerow-button-onclickthisshownewtodopage-classnamebtn-btn-successaddbutton-div-div-class-error-extends-component-render-return-error-component-class-welcome-extends-component-constructorprops-superprops-thisgethelloworldbean-thisgethelloworldbeanbindthis-thisgethelloworld-thisgethelloworldbindthis-thisstate-username-propsmatchparamsname-welcomemessagefromservice-gethelloworld-welcomeserviceretrievehelloworldmessagethenres-thissetstate-welcomemessagefromservice-resdata-catcherror-consolelogerror-gethelloworldbean-welcomeserviceretrievehelloworldbeanthenres-welcomeserviceretrievehelloworldpathvariablethisstateusernamethenres-thissetstate-welcomemessagefromservice-resdatamessage-catcherror-consolelogerror-componentdidmount-thisgethelloworld-render-return-h1-welcomeh1-divwelcome-thisstateusername-view-your-link-totodostodoslinkdiv-divmessage-from-service-thisstatewelcomemessagefromservicediv-divbutton-classnamebtn-btn-success-onclickthisgethelloworldbeanclick-this-to-get-welcome-messagebuttondiv-class-menu-extends-component-static-contexttype-usercontext-render-const-isuserloggedin-basicauthenticationserviceinstanceisuseralreadyloggedin-return-header-nav-classnamenavbar-navbar-expand-md-navbar-dark-bg-dark-div-a-hrefhttpswwwin28minutescom-classnamenavbar-brand-in28minutesa-div-ul-classnamenavbar-nav-isuserloggedin-li-classnamenav-link-link-towelcomein28minutes-classnamenav-linkhomelink-li-isuserloggedin-li-classnamenav-link-link-totodos-classnamenav-linktodoslink-li-ul-ul-classnamenavbar-nav-navbar-collapse-justify-content-end-isuserloggedin-li-classnamenav-link-a-hreflogin-classnamenav-linklogina-li-isuserloggedin-li-classnamenav-link-link-tologout-classnamenav-link-onclickbasicauthenticationserviceinstancelogoutlogoutlink-li-ul-nav-header-class-footer-extends-component-render-return-footer-classnamefooter-div-classnamecontainer-span-classnametext-mutedall-rights-reserved-2018-in28minutesspan-div-footer-export-default-app"><div class="codehilite"><pre><span class="c1">//TODO - event.preventDefault(), Constants for URL</span>

<span class="kr">import</span> <span class="nx">React</span><span class="p">,</span> <span class="p">{</span> <span class="nx">Component</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;react&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="p">{</span>
  <span class="nx">BrowserRouter</span> <span class="nx">as</span> <span class="nx">Router</span><span class="p">,</span>
  <span class="nx">Route</span><span class="p">,</span>
  <span class="nx">Link</span><span class="p">,</span>
  <span class="nx">Switch</span>
<span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;react-router-dom&#39;</span>
<span class="kr">import</span> <span class="s1">&#39;./bootstrap.css&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="s1">&#39;./App.css&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">Redirect</span> <span class="nx">from</span> <span class="s1">&#39;react-router-dom/Redirect&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">WelcomeService</span> <span class="nx">from</span> <span class="s1">&#39;./services/WelcomeService&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">TodoService</span> <span class="nx">from</span> <span class="s1">&#39;./services/TodoService&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">Formik</span><span class="p">,</span> <span class="nx">Form</span><span class="p">,</span> <span class="nx">Field</span><span class="p">,</span> <span class="nx">ErrorMessage</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;formik&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">moment</span> <span class="nx">from</span> <span class="s1">&#39;moment&#39;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">axios</span> <span class="nx">from</span> <span class="s2">&quot;axios&quot;</span><span class="p">;</span>

<span class="nx">axios</span><span class="p">.</span><span class="nx">interceptors</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span>
  <span class="nx">config</span> <span class="o">=&gt;</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">isUserAlreadyLoggedIn</span><span class="p">())</span> <span class="p">{</span>
      <span class="nx">config</span><span class="p">.</span><span class="nx">headers</span><span class="p">.</span><span class="nx">authorization</span> <span class="o">=</span> <span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">getAuthenticatedToken</span><span class="p">();</span>
    <span class="p">}</span>
    <span class="c1">//console.log(config.headers.authorization)</span>
    <span class="k">return</span> <span class="nx">config</span><span class="p">;</span>
  <span class="p">},</span>
  <span class="nx">error</span> <span class="o">=&gt;</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">reject</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span>
<span class="p">);</span>
<span class="c1">//console.log(&#39;after &#39; + this.isUserLoggedIn());</span>

<span class="kr">class</span> <span class="nx">BasicAuthenticationService</span> <span class="p">{</span>

  <span class="nx">executeJWTAuthenticationService</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">password</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">post</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/authenticate`, {</span>
      <span class="nx">username</span><span class="p">,</span>
      <span class="nx">password</span>
    <span class="p">});</span>
  <span class="p">}</span>

  <span class="nx">registerSuccessfulLoginForJWT</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">token</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">setItem</span><span class="p">(</span><span class="s1">&#39;authenticaterUser&#39;</span><span class="p">,</span> <span class="nx">username</span><span class="p">);</span>
    <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">setItem</span><span class="p">(</span><span class="s1">&#39;token&#39;</span><span class="p">,</span> <span class="err">`</span><span class="nx">Bearer</span> <span class="nx">$</span><span class="p">{</span><span class="nx">token</span><span class="p">}</span><span class="err">`</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">executeBasicAuthenticationService</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">password</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">let</span> <span class="nx">basicAuthHeaderString</span> <span class="o">=</span> <span class="s1">&#39;Basic &#39;</span> <span class="o">+</span> <span class="nb">window</span><span class="p">.</span><span class="nx">btoa</span><span class="p">(</span><span class="nx">username</span> <span class="o">+</span> <span class="s1">&#39;:&#39;</span> <span class="o">+</span> <span class="nx">password</span><span class="p">);</span>
    <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/basicauth`, { headers: { authorization: basicAuthHeaderString } });</span>
  <span class="p">}</span>

  <span class="nx">registerSuccessfulLogin</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">password</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">let</span> <span class="nx">basicAuthHeaderString</span> <span class="o">=</span> <span class="s1">&#39;Basic &#39;</span> <span class="o">+</span> <span class="nb">window</span><span class="p">.</span><span class="nx">btoa</span><span class="p">(</span><span class="nx">username</span> <span class="o">+</span> <span class="s1">&#39;:&#39;</span> <span class="o">+</span> <span class="nx">password</span><span class="p">);</span>
    <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">setItem</span><span class="p">(</span><span class="s1">&#39;authenticaterUser&#39;</span><span class="p">,</span> <span class="nx">username</span><span class="p">);</span>
    <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">setItem</span><span class="p">(</span><span class="s1">&#39;token&#39;</span><span class="p">,</span> <span class="nx">basicAuthHeaderString</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">isUserAlreadyLoggedIn</span><span class="p">()</span> <span class="p">{</span>
    <span class="kd">let</span> <span class="nx">user</span> <span class="o">=</span> <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s1">&#39;authenticaterUser&#39;</span><span class="p">)</span>
    <span class="kd">let</span> <span class="nx">result</span> <span class="o">=</span> <span class="o">!</span><span class="p">(</span><span class="nx">user</span> <span class="o">===</span> <span class="kc">null</span><span class="p">)</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;userloggedin &#39;</span> <span class="o">+</span> <span class="nx">result</span><span class="p">)</span>
    <span class="k">return</span> <span class="nx">result</span>
  <span class="p">}</span>

  <span class="nx">getUserName</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s1">&#39;authenticaterUser&#39;</span><span class="p">)</span>
  <span class="p">}</span>

  <span class="nx">getAuthenticatedToken</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isUserAlreadyLoggedIn</span><span class="p">())</span>
      <span class="k">return</span> <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s1">&#39;token&#39;</span><span class="p">)</span>
  <span class="p">}</span>

  <span class="nx">logout</span><span class="p">()</span> <span class="p">{</span>
    <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">removeItem</span><span class="p">(</span><span class="s1">&#39;authenticaterUser&#39;</span><span class="p">)</span>
    <span class="nx">sessionStorage</span><span class="p">.</span><span class="nx">removeItem</span><span class="p">(</span><span class="s1">&#39;token&#39;</span><span class="p">)</span>
  <span class="p">}</span>
<span class="p">}</span>



<span class="kr">const</span> <span class="nx">BasicAuthenticationServiceInstance</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">BasicAuthenticationService</span><span class="p">();</span>

<span class="kr">const</span> <span class="nx">UserContext</span> <span class="o">=</span> <span class="nx">React</span><span class="p">.</span><span class="nx">createContext</span><span class="p">()</span>

<span class="kr">const</span> <span class="nx">UserContextConsumer</span> <span class="o">=</span> <span class="nx">UserContext</span><span class="p">.</span><span class="nx">Consumer</span>

<span class="kr">class</span> <span class="nx">UserContextProvider</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>

  <span class="nx">state</span> <span class="o">=</span> <span class="p">{</span>
    <span class="nx">username</span><span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">,</span>
    <span class="nx">isUserLoggedin</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span>
    <span class="nx">userLoggedInSuccessfully</span><span class="o">:</span> <span class="p">(</span><span class="nx">username</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">userLoggedInSuccessfully</span><span class="p">(</span><span class="nx">username</span><span class="p">),</span>
    <span class="nx">userLoggedOut</span><span class="o">:</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">userLoggedOut</span><span class="p">()</span>
  <span class="p">}</span>

  <span class="nx">userLoggedInSuccessfully</span> <span class="o">=</span> <span class="nx">username</span> <span class="o">=&gt;</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span> <span class="nx">username</span><span class="p">,</span> <span class="nx">isUserLoggedin</span><span class="o">:</span> <span class="kc">true</span> <span class="p">})</span>
  <span class="p">}</span>

  <span class="nx">userLoggedOut</span> <span class="o">=</span> <span class="p">()</span> <span class="o">=&gt;</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span> <span class="nx">username</span><span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="nx">isUserLoggedin</span><span class="o">:</span> <span class="kc">false</span> <span class="p">})</span>
  <span class="p">}</span>

  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="c1">//console.log(this.props)</span>
    <span class="k">return</span> <span class="p">(</span>
      <span class="o">&lt;</span><span class="nx">UserContext</span><span class="p">.</span><span class="nx">Provider</span> <span class="nx">value</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">}</span><span class="o">&gt;</span>
        <span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">children</span><span class="p">}</span>
      <span class="o">&lt;</span><span class="err">/UserContext.Provider&gt;</span>
    <span class="p">)</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kr">class</span> <span class="nx">Login</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>

  <span class="nx">constructor</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span> <span class="p">{</span>
    <span class="kr">super</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">loginClicked</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">loginClicked</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">handleUsernameChange</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleUsernameChange</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">handlePasswordChange</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">handlePasswordChange</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>

    <span class="k">this</span><span class="p">.</span><span class="nx">state</span> <span class="o">=</span> <span class="p">{</span>
      <span class="nx">username</span><span class="o">:</span> <span class="s1">&#39;in28minutes&#39;</span><span class="p">,</span>
      <span class="nx">password</span><span class="o">:</span> <span class="s1">&#39;dummy&#39;</span><span class="p">,</span>
      <span class="nx">invalidLogin</span><span class="o">:</span> <span class="kc">false</span>
    <span class="p">}</span>

  <span class="p">}</span>

  <span class="c1">//static contextType = UserContext;</span>

  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="kr">const</span> <span class="nx">warningMessage</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">invalidLogin</span> <span class="o">?</span> <span class="s2">&quot;invalid Login&quot;</span> <span class="o">:</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>

    <span class="k">return</span> <span class="o">&lt;&gt;</span>
      <span class="o">&lt;</span><span class="nx">h1</span><span class="o">&gt;</span> <span class="nx">Login</span><span class="o">!&lt;</span><span class="err">/h1&gt;</span>
      <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;container&quot;</span><span class="o">&gt;</span>
        <span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">invalidLogin</span> <span class="o">&amp;&amp;</span>
          <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;alert alert-warning&quot;</span><span class="o">&gt;</span><span class="p">{</span><span class="nx">warningMessage</span><span class="p">}</span><span class="o">&lt;</span><span class="err">/div&gt;}</span>
        <span class="o">&lt;</span><span class="nx">div</span><span class="o">&gt;</span>
          <span class="nx">User</span> <span class="nx">Name</span> <span class="o">:</span> <span class="o">&lt;</span><span class="nx">input</span> <span class="nx">type</span><span class="o">=</span><span class="s2">&quot;text&quot;</span> <span class="nx">name</span><span class="o">=</span><span class="s2">&quot;username&quot;</span> <span class="nx">value</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">username</span><span class="p">}</span> <span class="nx">onChange</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">handleUsernameChange</span><span class="p">}</span> <span class="o">/&gt;</span>
          <span class="nx">Password</span> <span class="o">:</span> <span class="o">&lt;</span><span class="nx">input</span> <span class="nx">type</span><span class="o">=</span><span class="s2">&quot;password&quot;</span> <span class="nx">name</span><span class="o">=</span><span class="s2">&quot;password&quot;</span> <span class="nx">value</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">password</span><span class="p">}</span> <span class="nx">onChange</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">handlePasswordChange</span><span class="p">}</span> <span class="o">/&gt;</span>
          <span class="o">&lt;</span><span class="nx">button</span> <span class="nx">onClick</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">loginClicked</span><span class="p">}</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;btn btn-success&quot;</span><span class="o">&gt;</span><span class="nx">Login</span><span class="o">&lt;</span><span class="err">/button&gt;</span>


          <span class="p">{</span><span class="cm">/* &lt;UserContextConsumer&gt;</span>
<span class="cm">            {(context) =&gt; (&lt;div&gt;&lt;p&gt;{context.username}&lt;/p&gt;&lt;/div&gt;)}</span>
<span class="cm">          &lt;/UserContextConsumer&gt; */</span><span class="p">}</span>
        <span class="o">&lt;</span><span class="err">/div&gt;</span>
      <span class="o">&lt;</span><span class="err">/div&gt;</span>
    <span class="o">&lt;</span><span class="err">/&gt;</span>
  <span class="p">}</span>

  <span class="nx">handleUsernameChange</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span> <span class="nx">username</span><span class="o">:</span> <span class="nx">event</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">value</span> <span class="p">});</span>
  <span class="p">}</span>

  <span class="nx">handlePasswordChange</span><span class="p">(</span><span class="nx">event</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span> <span class="nx">password</span><span class="o">:</span> <span class="nx">event</span><span class="p">.</span><span class="nx">target</span><span class="p">.</span><span class="nx">value</span> <span class="p">});</span>
  <span class="p">}</span>

  <span class="c1">// loginClicked(e) { //Hardcoded Auth</span>
  <span class="c1">//   //console.log(this.state)</span>
  <span class="c1">//   const isValidUser = new HardcodedAuthenticationComponent().authenticate(this.state.username, this.state.password);</span>
  <span class="c1">//   //const isValidUser = TodoService.executeBasicAuthenticationService(this.state.username, this.state.password);</span>

  <span class="c1">//   if (isValidUser) {</span>
  <span class="c1">//     this.setState({ invalidLogin: false });</span>
  <span class="c1">//     console.log(this.context);</span>
  <span class="c1">//     this.context.userLoggedInSuccessfully(this.state.username);</span>
  <span class="c1">//     //console.log(this.state);</span>
  <span class="c1">//     //this.props.history.push(&#39;/welcome/&#39;)</span>
  <span class="c1">//     this.props.history.push(`/welcome/${this.state.username}`)</span>
  <span class="c1">//   } else {</span>
  <span class="c1">//     this.setState({ invalidLogin: true });</span>
  <span class="c1">//   }</span>
  <span class="c1">// }</span>

  <span class="nx">loginClicked</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="c1">//Basic Authentication</span>
    <span class="c1">//console.log(this.state)</span>
    <span class="c1">//const isValidUser = new HardcodedAuthenticationComponent().authenticate(this.state.username, this.state.password);</span>

    <span class="c1">//BasicAuthenticationServiceInstance.executeBasicAuthenticationService(this.state.username, this.state.password).then(response =&gt; {</span>
    <span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">executeJWTAuthenticationService</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">username</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">password</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;execution successful&#39;</span><span class="p">)</span>

      <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span> <span class="nx">invalidLogin</span><span class="o">:</span> <span class="kc">false</span> <span class="p">});</span>
      <span class="c1">//this.context.userLoggedInSuccessfully(this.state.username);</span>

      <span class="c1">//this.context.userLoggedInSuccessfully(this.state.username);</span>
      <span class="c1">//BasicAuthenticationServiceInstance.registerSuccessfulLogin(this.state.username, this.state.password);</span>
      <span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">registerSuccessfulLoginForJWT</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">username</span><span class="p">,</span> <span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">token</span><span class="p">);</span>

      <span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">history</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="err">`</span><span class="o">/</span><span class="nx">welcome</span><span class="o">/</span><span class="nx">$</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">username</span><span class="p">}</span><span class="err">`</span><span class="p">)</span>

    <span class="p">},</span> <span class="nx">error</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span> <span class="nx">invalidLogin</span><span class="o">:</span> <span class="kc">true</span> <span class="p">});</span>
    <span class="p">});</span>
  <span class="p">}</span>
<span class="p">}</span>


<span class="kr">class</span> <span class="nx">Logout</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>

  <span class="nx">constructor</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span> <span class="p">{</span>
    <span class="kr">super</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span>
  <span class="p">}</span>

  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">myInterceptor</span> <span class="o">=</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">interceptors</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">use</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span><span class="cm">/*...*/</span> <span class="p">});</span>
    <span class="nx">axios</span><span class="p">.</span><span class="nx">interceptors</span><span class="p">.</span><span class="nx">request</span><span class="p">.</span><span class="nx">eject</span><span class="p">(</span><span class="mi">0</span><span class="p">);</span>

    <span class="k">return</span> <span class="o">&lt;&gt;</span>
      <span class="o">&lt;</span><span class="nx">h1</span><span class="o">&gt;</span><span class="nx">You</span> <span class="nx">are</span> <span class="nx">logged</span> <span class="nx">out</span><span class="o">&lt;</span><span class="err">/h1&gt;</span>
      <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;container&quot;</span><span class="o">&gt;</span>
        <span class="nx">Thank</span> <span class="nx">You</span> <span class="nx">For</span> <span class="nx">Using</span> <span class="nx">Our</span> <span class="nx">Application</span><span class="p">.</span>
                <span class="o">&lt;</span><span class="err">/div&gt;</span>
    <span class="o">&lt;</span><span class="err">/&gt;</span>
  <span class="p">}</span>
<span class="p">}</span>


<span class="kr">const</span> <span class="nx">AuthenticatedRoute</span> <span class="o">=</span> <span class="p">({</span> <span class="nx">component</span><span class="o">:</span> <span class="nx">Component</span><span class="p">,</span> <span class="nx">authenticated</span><span class="p">,</span> <span class="p">...</span><span class="nx">rest</span> <span class="p">})</span> <span class="o">=&gt;</span> <span class="p">(</span>
  <span class="c1">// &lt;UserContextConsumer&gt;</span>
  <span class="c1">//   {({ isUserLoggedin }) =&gt; (</span>

  <span class="o">&lt;</span><span class="nx">Route</span>
    <span class="nx">render</span><span class="o">=</span><span class="p">{</span>
      <span class="nx">props</span> <span class="o">=&gt;</span>
        <span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">isUserAlreadyLoggedIn</span><span class="p">()</span>
          <span class="o">?</span> <span class="o">&lt;</span><span class="nx">Component</span> <span class="p">{...</span><span class="nx">props</span><span class="p">}</span> <span class="nx">username</span><span class="o">=</span><span class="p">{</span><span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">getUserName</span><span class="p">()}</span> <span class="o">/&gt;</span>
          <span class="o">:</span> <span class="o">&lt;</span><span class="nx">Redirect</span> <span class="nx">to</span><span class="o">=</span><span class="s2">&quot;/login&quot;</span> <span class="o">/&gt;</span>
      <span class="c1">// &lt;Redirect to={{ WHY!!</span>
      <span class="c1">//   pathname: &quot;/login&quot;,</span>
      <span class="c1">//   state: { from: props.location }</span>
      <span class="c1">// }} </span>
      <span class="c1">// /&gt;</span>

    <span class="p">}</span>
    <span class="p">{...</span><span class="nx">rest</span><span class="p">}</span>
  <span class="o">/&gt;</span>
  <span class="c1">//   )}</span>
  <span class="c1">// &lt;/UserContextConsumer&gt;</span>
<span class="p">)</span>

<span class="kr">class</span> <span class="nx">App</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>
  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="p">(</span>
      <span class="c1">//&lt;UserContextProvider&gt;</span>
      <span class="o">&lt;</span><span class="nx">Router</span><span class="o">&gt;</span>
        <span class="o">&lt;&gt;</span>
          <span class="o">&lt;</span><span class="nx">Menu</span><span class="o">&gt;&lt;</span><span class="err">/Menu&gt;</span>
          <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;container&quot;</span><span class="o">&gt;</span>
            <span class="o">&lt;</span><span class="nx">Switch</span><span class="o">&gt;</span>
              <span class="o">&lt;</span><span class="nx">Route</span> <span class="nx">exact</span> <span class="nx">path</span><span class="o">=</span><span class="s2">&quot;/&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nx">Login</span><span class="p">}</span> <span class="o">/&gt;</span>
              <span class="o">&lt;</span><span class="nx">Route</span> <span class="nx">exact</span> <span class="nx">path</span><span class="o">=</span><span class="s2">&quot;/login&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nx">Login</span><span class="p">}</span> <span class="o">/&gt;</span>
              <span class="o">&lt;</span><span class="nx">AuthenticatedRoute</span> <span class="nx">path</span><span class="o">=</span><span class="s2">&quot;/welcome/:name&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nx">Welcome</span><span class="p">}</span> <span class="o">/&gt;</span>
              <span class="o">&lt;</span><span class="nx">AuthenticatedRoute</span> <span class="nx">path</span><span class="o">=</span><span class="s2">&quot;/todo/:todoId&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nx">Todo</span><span class="p">}</span> <span class="o">/&gt;</span>
              <span class="o">&lt;</span><span class="nx">AuthenticatedRoute</span> <span class="nx">path</span><span class="o">=</span><span class="s2">&quot;/todos&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nx">ListTodo</span><span class="p">}</span> <span class="o">/&gt;</span>
              <span class="o">&lt;</span><span class="nx">Route</span> <span class="nx">path</span><span class="o">=</span><span class="s2">&quot;/logout&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nx">Logout</span><span class="p">}</span> <span class="o">/&gt;</span>
              <span class="o">&lt;</span><span class="nx">Route</span> <span class="nx">component</span><span class="o">=</span><span class="p">{</span><span class="nb">Error</span><span class="p">}</span> <span class="o">/&gt;</span>
            <span class="o">&lt;</span><span class="err">/Switch&gt;</span>
          <span class="o">&lt;</span><span class="err">/div&gt;</span>
          <span class="o">&lt;</span><span class="nx">Footer</span><span class="o">&gt;&lt;</span><span class="err">/Footer&gt;</span>
        <span class="o">&lt;</span><span class="err">/&gt;</span>
      <span class="o">&lt;</span><span class="err">/Router&gt;</span>
      <span class="c1">// &lt;/UserContextProvider&gt;</span>
    <span class="p">);</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kr">class</span> <span class="nx">Todo</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>

  <span class="nx">constructor</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span> <span class="p">{</span>
    <span class="kr">super</span><span class="p">(</span><span class="nx">props</span><span class="p">);</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">validate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">validate</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">onSubmit</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">onSubmit</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">state</span> <span class="o">=</span> <span class="p">{</span>
      <span class="nx">id</span><span class="o">:</span> <span class="nx">props</span><span class="p">.</span><span class="nx">match</span><span class="p">.</span><span class="nx">params</span><span class="p">.</span><span class="nx">todoId</span><span class="p">,</span>
      <span class="nx">description</span><span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">,</span>
      <span class="nx">targetDate</span><span class="o">:</span> <span class="s1">&#39;&#39;</span>
    <span class="p">}</span>
  <span class="p">}</span>

  <span class="nx">componentDidMount</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">id</span> <span class="o">!=</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span>
      <span class="nx">TodoService</span><span class="p">.</span><span class="nx">retrieveTodo</span><span class="p">(</span><span class="s1">&#39;in28minutes&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">id</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
        <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span>
          <span class="p">...</span><span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span> <span class="nx">targetDate</span><span class="o">:</span> <span class="nx">moment</span><span class="p">(</span><span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">targetDate</span><span class="p">).</span><span class="nx">format</span><span class="p">(</span><span class="s1">&#39;YYYY-MM-DD&#39;</span><span class="p">)</span>
        <span class="p">})</span>
      <span class="p">});</span>
    <span class="p">}</span>
  <span class="p">}</span>

  <span class="nx">validate</span><span class="p">(</span><span class="nx">values</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">let</span> <span class="nx">errors</span> <span class="o">=</span> <span class="p">{};</span>
    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">values</span><span class="p">.</span><span class="nx">description</span><span class="p">)</span> <span class="p">{</span>
      <span class="nx">errors</span><span class="p">.</span><span class="nx">description</span> <span class="o">=</span> <span class="s2">&quot;Enter valid values&quot;</span><span class="p">;</span>
    <span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">values</span><span class="p">.</span><span class="nx">description</span><span class="p">.</span><span class="nx">length</span> <span class="o">&lt;</span> <span class="mi">5</span><span class="p">)</span> <span class="p">{</span>
      <span class="nx">errors</span><span class="p">.</span><span class="nx">description</span> <span class="o">=</span> <span class="s2">&quot;Enter atleast 5 characters in Description&quot;</span>
    <span class="p">}</span>
    <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">moment</span><span class="p">(</span><span class="nx">values</span><span class="p">.</span><span class="nx">targetDate</span><span class="p">).</span><span class="nx">isValid</span><span class="p">())</span> <span class="p">{</span>
      <span class="nx">errors</span><span class="p">.</span><span class="nx">targetDate</span> <span class="o">=</span> <span class="s2">&quot;Enter valid Target Date&quot;</span>
    <span class="p">}</span>
    <span class="k">return</span> <span class="nx">errors</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nx">onSubmit</span><span class="p">(</span><span class="nx">values</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">id</span> <span class="o">===</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span>
      <span class="nx">TodoService</span><span class="p">.</span><span class="nx">createTodo</span><span class="p">(</span><span class="s1">&#39;in28minutes&#39;</span><span class="p">,</span> <span class="p">{</span>
        <span class="nx">description</span><span class="o">:</span> <span class="nx">values</span><span class="p">.</span><span class="nx">description</span><span class="p">,</span>
        <span class="nx">targetDate</span><span class="o">:</span> <span class="nx">values</span><span class="p">.</span><span class="nx">targetDate</span>
      <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">);</span>
        <span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">history</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;/todos&#39;</span><span class="p">);</span>
      <span class="p">});</span>
    <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
      <span class="nx">TodoService</span><span class="p">.</span><span class="nx">updateTodo</span><span class="p">(</span><span class="s1">&#39;in28minutes&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">id</span><span class="p">,</span> <span class="p">{</span>
        <span class="nx">id</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">id</span><span class="p">,</span>
        <span class="nx">description</span><span class="o">:</span> <span class="nx">values</span><span class="p">.</span><span class="nx">description</span><span class="p">,</span>
        <span class="nx">targetDate</span><span class="o">:</span> <span class="nx">values</span><span class="p">.</span><span class="nx">targetDate</span>
      <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">);</span>
        <span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">history</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;/todos&#39;</span><span class="p">);</span>
      <span class="p">});</span>
    <span class="p">}</span>
  <span class="p">}</span>

  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="kr">const</span> <span class="p">{</span> <span class="nx">description</span><span class="p">,</span> <span class="nx">targetDate</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span> <span class="p">}</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span> <span class="o">||</span> <span class="p">{};</span>
    <span class="k">return</span> <span class="p">(</span>
      <span class="o">&lt;&gt;</span>
        <span class="o">&lt;</span><span class="nx">h1</span><span class="o">&gt;</span><span class="nx">Todo</span><span class="o">&lt;</span><span class="err">/h1&gt;</span>
        <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;container&quot;</span><span class="o">&gt;</span>
          <span class="o">&lt;</span><span class="nx">Formik</span>
            <span class="nx">initialValues</span><span class="o">=</span><span class="p">{{</span> <span class="nx">description</span><span class="p">,</span> <span class="nx">targetDate</span> <span class="p">}}</span>
            <span class="nx">validateOnBlur</span><span class="o">=</span><span class="p">{</span><span class="kc">false</span><span class="p">}</span>
            <span class="nx">enableReinitialize</span><span class="o">=</span><span class="p">{</span><span class="kc">true</span><span class="p">}</span>
            <span class="nx">validate</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">validate</span><span class="p">}</span>
            <span class="nx">onSubmit</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">onSubmit</span><span class="p">}</span><span class="o">&gt;</span>
            <span class="p">{({</span> <span class="nx">errors</span><span class="p">,</span> <span class="nx">isSubmitting</span> <span class="p">})</span> <span class="o">=&gt;</span> <span class="p">(</span>
              <span class="o">&lt;</span><span class="nx">Form</span><span class="o">&gt;</span>
                <span class="o">&lt;</span><span class="nx">ErrorMessage</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;alert alert-warning&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="s2">&quot;div&quot;</span> <span class="nx">name</span><span class="o">=</span><span class="s2">&quot;description&quot;</span> <span class="o">/&gt;</span>
                <span class="o">&lt;</span><span class="nx">ErrorMessage</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;alert alert-warning&quot;</span> <span class="nx">component</span><span class="o">=</span><span class="s2">&quot;div&quot;</span> <span class="nx">name</span><span class="o">=</span><span class="s2">&quot;targetDate&quot;</span> <span class="o">/&gt;</span>
                <span class="o">&lt;</span><span class="nx">fieldset</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;form-group&quot;</span><span class="o">&gt;</span>
                  <span class="o">&lt;</span><span class="nx">label</span><span class="o">&gt;</span><span class="nx">Description</span><span class="o">&lt;</span><span class="err">/label&gt;</span>
                  <span class="o">&lt;</span><span class="nx">Field</span> <span class="nx">className</span><span class="o">=</span><span class="p">{</span><span class="err">`</span><span class="nx">form</span><span class="o">-</span><span class="nx">control</span> <span class="nx">$</span><span class="p">{</span><span class="nx">errors</span><span class="p">.</span><span class="nx">description</span> <span class="o">?</span> <span class="s1">&#39;invalid&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">}</span><span class="err">`</span><span class="p">}</span> <span class="nx">type</span><span class="o">=</span><span class="s2">&quot;text&quot;</span> <span class="nx">name</span><span class="o">=</span><span class="s2">&quot;description&quot;</span> <span class="o">/&gt;</span>
                <span class="o">&lt;</span><span class="err">/fieldset&gt;</span>
                <span class="o">&lt;</span><span class="nx">fieldset</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;form-group&quot;</span><span class="o">&gt;</span>
                  <span class="o">&lt;</span><span class="nx">label</span><span class="o">&gt;</span><span class="nx">Target</span> <span class="nb">Date</span><span class="o">&lt;</span><span class="err">/label&gt;</span>
                  <span class="o">&lt;</span><span class="nx">Field</span> <span class="nx">className</span><span class="o">=</span><span class="p">{</span><span class="err">`</span><span class="nx">form</span><span class="o">-</span><span class="nx">control</span> <span class="nx">$</span><span class="p">{</span><span class="nx">errors</span><span class="p">.</span><span class="nx">targetDate</span> <span class="o">?</span> <span class="s1">&#39;invalid&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">}</span><span class="err">`</span><span class="p">}</span> <span class="nx">type</span><span class="o">=</span><span class="s2">&quot;date&quot;</span> <span class="nx">name</span><span class="o">=</span><span class="s2">&quot;targetDate&quot;</span> <span class="o">/&gt;</span>
                <span class="o">&lt;</span><span class="err">/fieldset&gt;</span>
                <span class="o">&lt;</span><span class="nx">button</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;btn btn-success&quot;</span> <span class="nx">type</span><span class="o">=</span><span class="s2">&quot;submit&quot;</span> <span class="nx">disabled</span><span class="o">=</span><span class="p">{</span><span class="nx">isSubmitting</span><span class="p">}</span><span class="o">&gt;</span><span class="nx">Save</span><span class="o">&lt;</span><span class="err">/button&gt;</span>
              <span class="o">&lt;</span><span class="err">/Form&gt;</span>
            <span class="p">)}</span>
          <span class="o">&lt;</span><span class="err">/Formik&gt;</span>
        <span class="o">&lt;</span><span class="err">/div &gt;</span>
      <span class="o">&lt;</span><span class="err">/&gt;</span>
    <span class="p">);</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kr">class</span> <span class="nx">ListTodo</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>

  <span class="c1">//static contextType = UserContext;</span>

  <span class="nx">constructor</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span> <span class="p">{</span>
    <span class="kr">super</span><span class="p">(</span><span class="nx">props</span><span class="p">)</span>

    <span class="k">this</span><span class="p">.</span><span class="nx">refreshTodos</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">refreshTodos</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">showNewTodoPage</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">showNewTodoPage</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">showUpdateTodoPage</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">showUpdateTodoPage</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">showDeleteTodoPage</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">showDeleteTodoPage</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">)</span>

    <span class="c1">// this.state = {</span>
    <span class="c1">//     todo : {</span>
    <span class="c1">//       id : 1,</span>
    <span class="c1">//       description: &#39;Learn to Dance&#39;</span>
    <span class="c1">//   }</span>
    <span class="c1">// }</span>

    <span class="k">this</span><span class="p">.</span><span class="nx">state</span> <span class="o">=</span> <span class="p">{</span>
      <span class="nx">todos</span><span class="o">:</span> <span class="p">[</span>
        <span class="p">{</span>
          <span class="nx">id</span><span class="o">:</span> <span class="mi">1</span><span class="p">,</span>
          <span class="nx">description</span><span class="o">:</span> <span class="s1">&#39;Learn to Dance - old&#39;</span><span class="p">,</span>
          <span class="nx">done</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span>
          <span class="nx">targetDate</span><span class="o">:</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(),</span>
        <span class="p">},</span>
        <span class="p">{</span>
          <span class="nx">id</span><span class="o">:</span> <span class="mi">2</span><span class="p">,</span>
          <span class="nx">description</span><span class="o">:</span> <span class="s1">&#39;Become an Expert at Angular - old&#39;</span><span class="p">,</span>
          <span class="nx">done</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span>
          <span class="nx">targetDate</span><span class="o">:</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(),</span>
        <span class="p">},</span>
        <span class="p">{</span>
          <span class="nx">id</span><span class="o">:</span> <span class="mi">3</span><span class="p">,</span>
          <span class="nx">description</span><span class="o">:</span> <span class="s1">&#39;Visit India - old&#39;</span><span class="p">,</span>
          <span class="nx">done</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span>
          <span class="nx">targetDate</span><span class="o">:</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(),</span>
        <span class="p">},</span>
      <span class="p">],</span>
      <span class="nx">message</span><span class="o">:</span> <span class="s1">&#39;&#39;</span>
    <span class="p">}</span>


  <span class="p">}</span>

  <span class="nx">showNewTodoPage</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">history</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;/todo/-1&#39;</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">showUpdateTodoPage</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">todo</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">todo</span><span class="p">);</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">history</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="err">`</span><span class="o">/</span><span class="nx">todo</span><span class="o">/</span><span class="nx">$</span><span class="p">{</span><span class="nx">todo</span><span class="p">.</span><span class="nx">id</span><span class="p">}</span><span class="err">`</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">showDeleteTodoPage</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">todo</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">todo</span><span class="p">);</span>
    <span class="nx">TodoService</span><span class="p">.</span><span class="nx">deleteTodo</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">props</span><span class="p">.</span><span class="nx">username</span><span class="p">,</span> <span class="nx">todo</span><span class="p">.</span><span class="nx">id</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">response</span><span class="p">);</span>
      <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span>
        <span class="nx">message</span><span class="o">:</span> <span class="err">`</span><span class="nx">Delete</span> <span class="nx">of</span> <span class="nx">Todo</span> <span class="nx">$</span><span class="p">{</span><span class="nx">todo</span><span class="p">.</span><span class="nx">id</span><span class="p">}</span> <span class="nx">Successful</span><span class="o">!</span><span class="err">`</span><span class="p">,</span>
      <span class="p">});</span>
      <span class="k">this</span><span class="p">.</span><span class="nx">refreshTodos</span><span class="p">();</span>
    <span class="p">}</span>
    <span class="p">)</span>
  <span class="p">}</span>

  <span class="nx">componentDidMount</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">refreshTodos</span><span class="p">();</span>
  <span class="p">}</span>

  <span class="nx">refreshTodos</span><span class="p">()</span> <span class="p">{</span>
    <span class="nx">TodoService</span><span class="p">.</span><span class="nx">retrieveAllTodos</span><span class="p">(</span><span class="s1">&#39;in28minutes&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">response</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span>
        <span class="nx">todos</span><span class="o">:</span> <span class="nx">response</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span>
      <span class="p">})</span>
    <span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="nx">error</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span>
    <span class="p">});</span>
  <span class="p">}</span>

  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="c1">//   return &lt;table border=&quot;1&quot;&gt;</span>
    <span class="c1">//     &lt;caption&gt;My Todo&#39;s&lt;/caption&gt;</span>
    <span class="c1">//     &lt;thead&gt;</span>
    <span class="c1">//       &lt;tr&gt;</span>
    <span class="c1">//         &lt;th&gt;id&lt;/th&gt;</span>
    <span class="c1">//         &lt;th&gt;description&lt;/th&gt;</span>
    <span class="c1">//       &lt;/tr&gt;</span>
    <span class="c1">//     &lt;/thead&gt;</span>
    <span class="c1">//     &lt;tbody&gt;</span>
    <span class="c1">//     &lt;tr&gt;</span>
    <span class="c1">//         &lt;th&gt;{this.state.todo.id}&lt;/th&gt;</span>
    <span class="c1">//         &lt;th&gt;{this.state.todo.description}&lt;/th&gt;</span>
    <span class="c1">//       &lt;/tr&gt;</span>
    <span class="c1">//     &lt;/tbody&gt;</span>
    <span class="c1">// &lt;/table&gt;</span>

    <span class="kr">const</span> <span class="nx">todosView</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">todos</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">todo</span> <span class="o">=&gt;</span>
      <span class="o">&lt;</span><span class="nx">tr</span> <span class="nx">key</span><span class="o">=</span><span class="p">{</span><span class="nx">todo</span><span class="p">.</span><span class="nx">id</span><span class="p">}</span><span class="o">&gt;</span>
        <span class="o">&lt;</span><span class="nx">td</span><span class="o">&gt;</span><span class="p">{</span><span class="nx">todo</span><span class="p">.</span><span class="nx">description</span><span class="p">}</span><span class="o">&lt;</span><span class="err">/td&gt;</span>
        <span class="o">&lt;</span><span class="nx">td</span><span class="o">&gt;</span><span class="p">{</span><span class="nx">todo</span><span class="p">.</span><span class="nx">targetDate</span><span class="p">.</span><span class="nx">toString</span><span class="p">()}</span><span class="o">&lt;</span><span class="err">/td&gt;</span>
        <span class="o">&lt;</span><span class="nx">td</span><span class="o">&gt;</span><span class="p">{</span><span class="nx">todo</span><span class="p">.</span><span class="nx">done</span><span class="p">.</span><span class="nx">toString</span><span class="p">()}</span><span class="o">&lt;</span><span class="err">/td&gt;</span>
        <span class="o">&lt;</span><span class="nx">td</span><span class="o">&gt;&lt;</span><span class="nx">button</span> <span class="nx">onClick</span><span class="o">=</span><span class="p">{((</span><span class="nx">e</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">showUpdateTodoPage</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">todo</span><span class="p">))}</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;btn btn-success&quot;</span><span class="o">&gt;</span><span class="nx">Update</span><span class="o">&lt;</span><span class="err">/button&gt;&lt;/td&gt;</span>
        <span class="o">&lt;</span><span class="nx">td</span><span class="o">&gt;&lt;</span><span class="nx">button</span> <span class="nx">onClick</span><span class="o">=</span><span class="p">{((</span><span class="nx">e</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">showDeleteTodoPage</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">todo</span><span class="p">))}</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;btn btn-warning&quot;</span><span class="o">&gt;</span><span class="nx">Delete</span><span class="o">&lt;</span><span class="err">/button&gt;&lt;/td&gt;</span>

      <span class="o">&lt;</span><span class="err">/tr&gt;</span>
    <span class="p">);</span>

    <span class="k">return</span> <span class="p">(</span>
      <span class="o">&lt;&gt;</span>
        <span class="o">&lt;</span><span class="nx">h1</span><span class="o">&gt;</span> <span class="nx">My</span> <span class="nx">Todo</span><span class="s1">&#39;s&lt;/h1&gt;</span>
<span class="s1">        &lt;div className=&quot;container&quot;&gt;</span>
<span class="s1">          {this.state.message &amp;&amp; &lt;div className=&quot;alert alert-success&quot; &gt;{this.state.message}&lt;/div&gt;}</span>
<span class="s1">          &lt;table className=&quot;table&quot;&gt;</span>
<span class="s1">            &lt;thead&gt;</span>
<span class="s1">              &lt;tr&gt;</span>
<span class="s1">                &lt;th&gt;Description&lt;/th&gt;</span>
<span class="s1">                &lt;th&gt;Target Date&lt;/th&gt;</span>
<span class="s1">                &lt;th&gt;is Completed?&lt;/th&gt;</span>
<span class="s1">                &lt;th&gt;Update&lt;/th&gt;</span>
<span class="s1">                &lt;th&gt;Delete&lt;/th&gt;</span>
<span class="s1">              &lt;/tr&gt;</span>
<span class="s1">            &lt;/thead&gt;</span>
<span class="s1">            &lt;tbody&gt;</span>
<span class="s1">              {todosView}</span>
<span class="s1">            &lt;/tbody&gt;</span>
<span class="s1">          &lt;/table&gt;</span>
<span class="s1">          &lt;div className=&quot;row&quot;&gt;</span>
<span class="s1">            &lt;button onClick={this.showNewTodoPage} className=&quot;btn btn-success&quot;&gt;Add&lt;/button&gt;</span>
<span class="s1">          &lt;/div&gt;</span>
<span class="s1">        &lt;/div&gt;</span>
<span class="s1">      &lt;/&gt;</span>
<span class="s1">    )</span>

<span class="s1">  }</span>
<span class="s1">}</span>

<span class="s1">class Error extends Component {</span>
<span class="s1">  render() {</span>
<span class="s1">    return &lt;&gt;Error Component!&lt;/&gt;</span>
<span class="s1">  }</span>
<span class="s1">}</span>


<span class="s1">class Welcome extends Component {</span>

<span class="s1">  constructor(props) {</span>
<span class="s1">    super(props)</span>

<span class="s1">    this.getHelloWorldBean = this.getHelloWorldBean.bind(this);</span>
<span class="s1">    this.getHelloWorld = this.getHelloWorld.bind(this);</span>

<span class="s1">    this.state = {</span>
<span class="s1">      username: props.match.params.name,</span>
<span class="s1">      welcomeMessageFromService: &#39;</span><span class="err">&#39;</span>
    <span class="p">}</span>

  <span class="p">}</span>

  <span class="nx">getHelloWorld</span><span class="p">()</span> <span class="p">{</span>
    <span class="nx">WelcomeService</span><span class="p">.</span><span class="nx">retrieveHelloWorldMessage</span><span class="p">().</span><span class="nx">then</span><span class="p">((</span><span class="nx">res</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span>
        <span class="nx">welcomeMessageFromService</span><span class="o">:</span> <span class="nx">res</span><span class="p">.</span><span class="nx">data</span>
      <span class="p">});</span>
    <span class="p">}).</span><span class="k">catch</span><span class="p">((</span><span class="nx">error</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span>
    <span class="p">});</span>
  <span class="p">}</span>

  <span class="nx">getHelloWorldBean</span><span class="p">()</span> <span class="p">{</span>
    <span class="c1">//WelcomeService.retrieveHelloWorldBean().then((res) =&gt; {</span>
    <span class="nx">WelcomeService</span><span class="p">.</span><span class="nx">retrieveHelloWorldPathVariable</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">username</span><span class="p">).</span><span class="nx">then</span><span class="p">((</span><span class="nx">res</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="k">this</span><span class="p">.</span><span class="nx">setState</span><span class="p">({</span>
        <span class="nx">welcomeMessageFromService</span><span class="o">:</span> <span class="nx">res</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">message</span>
      <span class="p">});</span>
    <span class="p">}).</span><span class="k">catch</span><span class="p">((</span><span class="nx">error</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span>
    <span class="p">});</span>
  <span class="p">}</span>

  <span class="nx">componentDidMount</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">this</span><span class="p">.</span><span class="nx">getHelloWorld</span><span class="p">();</span>
  <span class="p">}</span>

  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="o">&lt;&gt;</span>
      <span class="o">&lt;</span><span class="nx">h1</span><span class="o">&gt;</span> <span class="nx">Welcome</span><span class="o">!&lt;</span><span class="err">/h1&gt;</span>
      <span class="o">&lt;</span><span class="nx">div</span><span class="o">&gt;</span><span class="nx">Welcome</span> <span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">username</span><span class="p">}.</span>
        <span class="nx">View</span> <span class="nx">your</span> <span class="o">&lt;</span><span class="nx">Link</span> <span class="nx">to</span><span class="o">=</span><span class="s2">&quot;/todos&quot;</span><span class="o">&gt;</span><span class="nx">Todos</span><span class="o">&lt;</span><span class="err">/Link&gt;&lt;/div&gt;</span>
      <span class="o">&lt;</span><span class="nx">div</span><span class="o">&gt;</span><span class="nx">Message</span> <span class="nx">from</span> <span class="nx">Service</span> <span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">state</span><span class="p">.</span><span class="nx">welcomeMessageFromService</span><span class="p">}</span><span class="o">&lt;</span><span class="err">/div&gt;</span>
      <span class="o">&lt;</span><span class="nx">div</span><span class="o">&gt;&lt;</span><span class="nx">button</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;btn btn-success&quot;</span> <span class="nx">onClick</span><span class="o">=</span><span class="p">{</span><span class="k">this</span><span class="p">.</span><span class="nx">getHelloWorldBean</span><span class="p">}</span><span class="o">&gt;</span><span class="nx">Click</span> <span class="k">this</span> <span class="nx">to</span> <span class="nx">get</span> <span class="nx">welcome</span> <span class="nx">message</span><span class="o">&lt;</span><span class="err">/button&gt;&lt;/div&gt;</span>
    <span class="o">&lt;</span><span class="err">/&gt;</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kr">class</span> <span class="nx">Menu</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>
  <span class="c1">//static contextType = UserContext;</span>
  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>

    <span class="kr">const</span> <span class="nx">isUserLoggedin</span> <span class="o">=</span> <span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">isUserAlreadyLoggedIn</span><span class="p">()</span>

    <span class="k">return</span> <span class="p">(</span>
      <span class="o">&lt;</span><span class="nx">header</span><span class="o">&gt;</span>
        <span class="o">&lt;</span><span class="nx">nav</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;navbar navbar-expand-md navbar-dark bg-dark&quot;</span><span class="o">&gt;</span>
          <span class="o">&lt;</span><span class="nx">div</span><span class="o">&gt;</span>
            <span class="o">&lt;</span><span class="nx">a</span> <span class="nx">href</span><span class="o">=</span><span class="s2">&quot;https://www.in28minutes.com&quot;</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;navbar-brand&quot;</span><span class="o">&gt;</span>
              <span class="nx">in28minutes</span><span class="o">&lt;</span><span class="err">/a&gt;</span>
          <span class="o">&lt;</span><span class="err">/div&gt;</span>

          <span class="o">&lt;</span><span class="nx">ul</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;navbar-nav&quot;</span><span class="o">&gt;</span>
            <span class="p">{</span> <span class="nx">isUserLoggedin</span> <span class="o">&amp;&amp;</span>
              <span class="o">&lt;</span><span class="nx">li</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span>
                <span class="o">&lt;</span><span class="nx">Link</span> <span class="nx">to</span><span class="o">=</span><span class="s2">&quot;/welcome/in28minutes&quot;</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span><span class="nx">Home</span><span class="o">&lt;</span><span class="err">/Link&gt;</span>
              <span class="o">&lt;</span><span class="err">/li&gt;</span>
            <span class="p">}</span>
            <span class="p">{</span>
              <span class="nx">isUserLoggedin</span> <span class="o">&amp;&amp;</span> <span class="o">&lt;</span><span class="nx">li</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span>
                <span class="o">&lt;</span><span class="nx">Link</span> <span class="nx">to</span><span class="o">=</span><span class="s2">&quot;/todos&quot;</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span><span class="nx">Todos</span><span class="o">&lt;</span><span class="err">/Link&gt;</span>
              <span class="o">&lt;</span><span class="err">/li&gt;</span>
            <span class="p">}</span>
          <span class="o">&lt;</span><span class="err">/ul&gt;</span>

          <span class="o">&lt;</span><span class="nx">ul</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;navbar-nav navbar-collapse justify-content-end&quot;</span><span class="o">&gt;</span>
            <span class="p">{</span><span class="o">!</span><span class="nx">isUserLoggedin</span> <span class="o">&amp;&amp;</span> <span class="o">&lt;</span><span class="nx">li</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span>
                <span class="o">&lt;</span><span class="nx">a</span> <span class="nx">href</span><span class="o">=</span><span class="s2">&quot;/login&quot;</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span><span class="nx">Login</span><span class="o">&lt;</span><span class="err">/a&gt;</span>
              <span class="o">&lt;</span><span class="err">/li&gt;}</span>
            <span class="p">{</span><span class="nx">isUserLoggedin</span> <span class="o">&amp;&amp;</span> <span class="o">&lt;</span><span class="nx">li</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span><span class="o">&gt;</span>
              <span class="o">&lt;</span><span class="nx">Link</span> <span class="nx">to</span><span class="o">=</span><span class="s2">&quot;/logout&quot;</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;nav-link&quot;</span> <span class="nx">onClick</span><span class="o">=</span><span class="p">{</span><span class="nx">BasicAuthenticationServiceInstance</span><span class="p">.</span><span class="nx">logout</span><span class="p">}</span><span class="o">&gt;</span><span class="nx">Logout</span><span class="o">&lt;</span><span class="err">/Link&gt;</span>
            <span class="o">&lt;</span><span class="err">/li&gt;}</span>
          <span class="o">&lt;</span><span class="err">/ul&gt;</span>
        <span class="o">&lt;</span><span class="err">/nav&gt;</span>
      <span class="o">&lt;</span><span class="err">/header&gt;</span>
    <span class="p">)</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kr">class</span> <span class="nx">Footer</span> <span class="kr">extends</span> <span class="nx">Component</span> <span class="p">{</span>
  <span class="nx">render</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="o">&lt;</span><span class="nx">footer</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;footer&quot;</span><span class="o">&gt;</span>
      <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;container&quot;</span><span class="o">&gt;</span>
        <span class="o">&lt;</span><span class="nx">span</span> <span class="nx">className</span><span class="o">=</span><span class="s2">&quot;text-muted&quot;</span><span class="o">&gt;</span><span class="nx">All</span> <span class="nx">Rights</span> <span class="nx">Reserved</span> <span class="mi">2018</span> <span class="err">@</span><span class="nx">in28minutes</span><span class="o">&lt;</span><span class="err">/span&gt;</span>
      <span class="o">&lt;</span><span class="err">/div&gt;</span>
    <span class="o">&lt;</span><span class="err">/footer&gt;</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kr">export</span> <span class="k">default</span> <span class="nx">App</span><span class="p">;</span>
</pre></div><a class="headerlink" href="#todo-eventpreventdefault-constants-for-url-import-react-component-from-react-import-browserrouter-as-router-route-link-switch-from-react-router-dom-import-bootstrapcss-import-appcss-import-redirect-from-react-router-domredirect-import-welcomeservice-from-serviceswelcomeservice-import-todoservice-from-servicestodoservice-import-formik-form-field-errormessage-from-formik-import-moment-from-moment-import-axios-from-axios-axiosinterceptorsrequestuse-config-if-basicauthenticationserviceinstanceisuseralreadyloggedin-configheadersauthorization-basicauthenticationserviceinstancegetauthenticatedtoken-consolelogconfigheadersauthorization-return-config-error-promiserejecterror-consolelogafter-thisisuserloggedin-class-basicauthenticationservice-executejwtauthenticationserviceusername-password-return-axiosposthttplocalhost8080authenticate-username-password-registersuccessfulloginforjwtusername-token-sessionstoragesetitemauthenticateruser-username-sessionstoragesetitemtoken-bearer-token-executebasicauthenticationserviceusername-password-let-basicauthheaderstring-basic-windowbtoausername-password-return-axiosgethttplocalhost8080basicauth-headers-authorization-basicauthheaderstring-registersuccessfulloginusername-password-let-basicauthheaderstring-basic-windowbtoausername-password-sessionstoragesetitemauthenticateruser-username-sessionstoragesetitemtoken-basicauthheaderstring-isuseralreadyloggedin-let-user-sessionstoragegetitemauthenticateruser-let-result-user-null-consoleloguserloggedin-result-return-result-getusername-return-sessionstoragegetitemauthenticateruser-getauthenticatedtoken-if-thisisuseralreadyloggedin-return-sessionstoragegetitemtoken-logout-sessionstorageremoveitemauthenticateruser-sessionstorageremoveitemtoken-const-basicauthenticationserviceinstance-new-basicauthenticationservice-const-usercontext-reactcreatecontext-const-usercontextconsumer-usercontextconsumer-class-usercontextprovider-extends-component-state-username-isuserloggedin-false-userloggedinsuccessfully-username-thisuserloggedinsuccessfullyusername-userloggedout-thisuserloggedout-userloggedinsuccessfully-username-thissetstate-username-isuserloggedin-true-userloggedout-thissetstate-username-isuserloggedin-false-render-consolelogthisprops-return-usercontextprovider-valuethisstate-thispropschildren-usercontextprovider-class-login-extends-component-constructorprops-superprops-thisloginclicked-thisloginclickedbindthis-thishandleusernamechange-thishandleusernamechangebindthis-thishandlepasswordchange-thishandlepasswordchangebindthis-thisstate-username-in28minutes-password-dummy-invalidlogin-false-static-contexttype-usercontext-render-const-warningmessage-thisstateinvalidlogin-invalid-login-return-h1-loginh1-div-classnamecontainer-thisstateinvalidlogin-div-classnamealert-alert-warningwarningmessagediv-div-user-name-input-typetext-nameusername-valuethisstateusername-onchangethishandleusernamechange-password-input-typepassword-namepassword-valuethisstatepassword-onchangethishandlepasswordchange-button-onclickthisloginclicked-classnamebtn-btn-successloginbutton-usercontextconsumer-context-divpcontextusernamepdiv-usercontextconsumer-div-div-handleusernamechangeevent-thissetstate-username-eventtargetvalue-handlepasswordchangeevent-thissetstate-password-eventtargetvalue-loginclickede-hardcoded-auth-consolelogthisstate-const-isvaliduser-new-hardcodedauthenticationcomponentauthenticatethisstateusername-thisstatepassword-const-isvaliduser-todoserviceexecutebasicauthenticationservicethisstateusername-thisstatepassword-if-isvaliduser-thissetstate-invalidlogin-false-consolelogthiscontext-thiscontextuserloggedinsuccessfullythisstateusername-consolelogthisstate-thispropshistorypushwelcome-thispropshistorypushwelcomethisstateusername-else-thissetstate-invalidlogin-true-loginclickede-basic-authentication-consolelogthisstate-const-isvaliduser-new-hardcodedauthenticationcomponentauthenticatethisstateusername-thisstatepassword-basicauthenticationserviceinstanceexecutebasicauthenticationservicethisstateusername-thisstatepasswordthenresponse-basicauthenticationserviceinstanceexecutejwtauthenticationservicethisstateusername-thisstatepasswordthenresponse-consolelogexecution-successful-thissetstate-invalidlogin-false-thiscontextuserloggedinsuccessfullythisstateusername-thiscontextuserloggedinsuccessfullythisstateusername-basicauthenticationserviceinstanceregistersuccessfulloginthisstateusername-thisstatepassword-basicauthenticationserviceinstanceregistersuccessfulloginforjwtthisstateusername-responsedatatoken-thispropshistorypushwelcomethisstateusername-error-thissetstate-invalidlogin-true-class-logout-extends-component-constructorprops-superprops-render-var-myinterceptor-axiosinterceptorsrequestusefunction-axiosinterceptorsrequesteject0-return-h1you-are-logged-outh1-div-classnamecontainer-thank-you-for-using-our-application-div-const-authenticatedroute-component-component-authenticated-rest-usercontextconsumer-isuserloggedin-route-render-props-basicauthenticationserviceinstanceisuseralreadyloggedin-component-props-usernamebasicauthenticationserviceinstancegetusername-redirect-tologin-redirect-to-why-pathname-login-state-from-propslocation-rest-usercontextconsumer-class-app-extends-component-render-return-usercontextprovider-router-menumenu-div-classnamecontainer-switch-route-exact-path-componentlogin-route-exact-pathlogin-componentlogin-authenticatedroute-pathwelcomename-componentwelcome-authenticatedroute-pathtodotodoid-componenttodo-authenticatedroute-pathtodos-componentlisttodo-route-pathlogout-componentlogout-route-componenterror-switch-div-footerfooter-router-usercontextprovider-class-todo-extends-component-constructorprops-superprops-thisvalidate-thisvalidatebindthis-thisonsubmit-thisonsubmitbindthis-thisstate-id-propsmatchparamstodoid-description-targetdate-componentdidmount-if-thisstateid-1-todoserviceretrievetodoin28minutes-thisstateidthenresponse-thissetstate-responsedata-targetdate-momentresponsedatatargetdateformatyyyy-mm-dd-validatevalues-let-errors-if-valuesdescription-errorsdescription-enter-valid-values-else-if-valuesdescriptionlength-5-errorsdescription-enter-atleast-5-characters-in-description-if-momentvaluestargetdateisvalid-errorstargetdate-enter-valid-target-date-return-errors-onsubmitvalues-if-thisstateid-1-todoservicecreatetodoin28minutes-description-valuesdescription-targetdate-valuestargetdate-thenresponse-consolelogresponsedata-thispropshistorypushtodos-else-todoserviceupdatetodoin28minutes-thisstateid-id-thisstateid-description-valuesdescription-targetdate-valuestargetdate-thenresponse-consolelogresponsedata-thispropshistorypushtodos-render-const-description-targetdate-thisstate-return-h1todoh1-div-classnamecontainer-formik-initialvalues-description-targetdate-validateonblurfalse-enablereinitializetrue-validatethisvalidate-onsubmitthisonsubmit-errors-issubmitting-form-errormessage-classnamealert-alert-warning-componentdiv-namedescription-errormessage-classnamealert-alert-warning-componentdiv-nametargetdate-fieldset-classnameform-group-labeldescriptionlabel-field-classnameform-control-errorsdescription-invalid-typetext-namedescription-fieldset-fieldset-classnameform-group-labeltarget-datelabel-field-classnameform-control-errorstargetdate-invalid-typedate-nametargetdate-fieldset-button-classnamebtn-btn-success-typesubmit-disabledissubmittingsavebutton-form-formik-div-class-listtodo-extends-component-static-contexttype-usercontext-constructorprops-superprops-thisrefreshtodos-thisrefreshtodosbindthis-thisshownewtodopage-thisshownewtodopagebindthis-thisshowupdatetodopage-thisshowupdatetodopagebindthis-thisshowdeletetodopage-thisshowdeletetodopagebindthis-thisstate-todo-id-1-description-learn-to-dance-thisstate-todos-id-1-description-learn-to-dance-old-done-false-targetdate-new-date-id-2-description-become-an-expert-at-angular-old-done-false-targetdate-new-date-id-3-description-visit-india-old-done-false-targetdate-new-date-message-shownewtodopage-thispropshistorypushtodo-1-showupdatetodopagee-todo-consoleloge-todo-thispropshistorypushtodotodoid-showdeletetodopagee-todo-consoleloge-todo-todoservicedeletetodothispropsusername-todoidthenresponse-consolelogresponse-thissetstate-message-delete-of-todo-todoid-successful-thisrefreshtodos-componentdidmount-thisrefreshtodos-refreshtodos-todoserviceretrievealltodosin28minutesthenresponse-thissetstate-todos-responsedata-catcherror-consolelogerror-render-return-table-border1-captionmy-todoscaption-thead-tr-thidth-thdescriptionth-tr-thead-tbody-tr-ththisstatetodoidth-ththisstatetododescriptionth-tr-tbody-table-const-todosview-thisstatetodosmaptodo-tr-keytodoid-tdtododescriptiontd-tdtodotargetdatetostringtd-tdtododonetostringtd-tdbutton-onclicke-thisshowupdatetodopagee-todo-classnamebtn-btn-successupdatebuttontd-tdbutton-onclicke-thisshowdeletetodopagee-todo-classnamebtn-btn-warningdeletebuttontd-tr-return-h1-my-todosh1-div-classnamecontainer-thisstatemessage-div-classnamealert-alert-success-thisstatemessagediv-table-classnametable-thead-tr-thdescriptionth-thtarget-dateth-this-completedth-thupdateth-thdeleteth-tr-thead-tbody-todosview-tbody-table-div-classnamerow-button-onclickthisshownewtodopage-classnamebtn-btn-successaddbutton-div-div-class-error-extends-component-render-return-error-component-class-welcome-extends-component-constructorprops-superprops-thisgethelloworldbean-thisgethelloworldbeanbindthis-thisgethelloworld-thisgethelloworldbindthis-thisstate-username-propsmatchparamsname-welcomemessagefromservice-gethelloworld-welcomeserviceretrievehelloworldmessagethenres-thissetstate-welcomemessagefromservice-resdata-catcherror-consolelogerror-gethelloworldbean-welcomeserviceretrievehelloworldbeanthenres-welcomeserviceretrievehelloworldpathvariablethisstateusernamethenres-thissetstate-welcomemessagefromservice-resdatamessage-catcherror-consolelogerror-componentdidmount-thisgethelloworld-render-return-h1-welcomeh1-divwelcome-thisstateusername-view-your-link-totodostodoslinkdiv-divmessage-from-service-thisstatewelcomemessagefromservicediv-divbutton-classnamebtn-btn-success-onclickthisgethelloworldbeanclick-this-to-get-welcome-messagebuttondiv-class-menu-extends-component-static-contexttype-usercontext-render-const-isuserloggedin-basicauthenticationserviceinstanceisuseralreadyloggedin-return-header-nav-classnamenavbar-navbar-expand-md-navbar-dark-bg-dark-div-a-hrefhttpswwwin28minutescom-classnamenavbar-brand-in28minutesa-div-ul-classnamenavbar-nav-isuserloggedin-li-classnamenav-link-link-towelcomein28minutes-classnamenav-linkhomelink-li-isuserloggedin-li-classnamenav-link-link-totodos-classnamenav-linktodoslink-li-ul-ul-classnamenavbar-nav-navbar-collapse-justify-content-end-isuserloggedin-li-classnamenav-link-a-hreflogin-classnamenav-linklogina-li-isuserloggedin-li-classnamenav-link-link-tologout-classnamenav-link-onclickbasicauthenticationserviceinstancelogoutlogoutlink-li-ul-nav-header-class-footer-extends-component-render-return-footer-classnamefooter-div-classnamecontainer-span-classnametext-mutedall-rights-reserved-2018-in28minutesspan-div-footer-export-default-app" title="Permanent link"></a></h2>
<h3 id="srcservicestodoservicejs">/src/services/TodoService.js<a class="headerlink" href="#srcservicestodoservicejs" title="Permanent link"></a></h3>
<h2 id="import-axios-from-axios-class-todoservice-retrievealltodosusername-return-axiosgethttplocalhost8080usersusernametodos-return-axiosgethttpin28minutes-restful-web-servicescfappsiousersusernametodos-deletetodousername-id-return-axiosdeletehttplocalhost8080usersusernametodosid-retrievetodousername-id-consolelogid-return-axiosgethttplocalhost8080usersusernametodosid-updatetodousername-id-todo-return-axiosputhttplocalhost8080usersusernametodosid-todo-createtodousername-todo-return-axiosposthttplocalhost8080usersusernametodos-todo-export-default-new-todoservice"><div class="codehilite"><pre><span class="kr">import</span> <span class="nx">axios</span> <span class="nx">from</span> <span class="s2">&quot;axios&quot;</span><span class="p">;</span>

<span class="kr">class</span> <span class="nx">TodoService</span> <span class="p">{</span>

    <span class="nx">retrieveAllTodos</span><span class="p">(</span><span class="nx">username</span><span class="p">)</span> <span class="p">{</span>

        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/users/${username}/todos`);</span>
        <span class="c1">//return axios.get(`http://in28minutes-restful-web-services.cfapps.io/users/${username}/todos`);</span>
    <span class="p">}</span>

    <span class="nx">deleteTodo</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">id</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="k">delete</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/users/${username}/todos/${id}`);</span>
    <span class="p">}</span>

    <span class="nx">retrieveTodo</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">id</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">id</span><span class="p">)</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/users/${username}/todos/${id}`);</span>
    <span class="p">}</span>

    <span class="nx">updateTodo</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">id</span><span class="p">,</span> <span class="nx">todo</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">put</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/users/${username}/todos/${id}`, todo);</span>
    <span class="p">}</span>

    <span class="nx">createTodo</span><span class="p">(</span><span class="nx">username</span><span class="p">,</span> <span class="nx">todo</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">post</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/users/${username}/todos`, todo);</span>
    <span class="p">}</span>
<span class="p">}</span>

<span class="kr">export</span> <span class="k">default</span> <span class="k">new</span> <span class="nx">TodoService</span><span class="p">();</span>
</pre></div><a class="headerlink" href="#import-axios-from-axios-class-todoservice-retrievealltodosusername-return-axiosgethttplocalhost8080usersusernametodos-return-axiosgethttpin28minutes-restful-web-servicescfappsiousersusernametodos-deletetodousername-id-return-axiosdeletehttplocalhost8080usersusernametodosid-retrievetodousername-id-consolelogid-return-axiosgethttplocalhost8080usersusernametodosid-updatetodousername-id-todo-return-axiosputhttplocalhost8080usersusernametodosid-todo-createtodousername-todo-return-axiosposthttplocalhost8080usersusernametodos-todo-export-default-new-todoservice" title="Permanent link"></a></h2>
<h3 id="srcserviceswelcomeservicejs">/src/services/WelcomeService.js<a class="headerlink" href="#srcserviceswelcomeservicejs" title="Permanent link"></a></h3>
<h2 id="import-axios-from-axios-class-welcomeservice-retrievehelloworldbean-return-axiosgethttplocalhost8080hello-world-bean-retrievehelloworldmessage-return-axiosgethttplocalhost8080hello-world-retrievehelloworldpathvariablename-return-axiosgethttplocalhost8080hello-worldpath-variablename-export-default-new-welcomeservice"><div class="codehilite"><pre><span class="kr">import</span> <span class="nx">axios</span> <span class="nx">from</span> <span class="s2">&quot;axios&quot;</span><span class="p">;</span>

<span class="kr">class</span> <span class="nx">WelcomeService</span> <span class="p">{</span>

    <span class="nx">retrieveHelloWorldBean</span><span class="p">()</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;http://localhost:8080/hello-world-bean&#39;</span><span class="p">);</span>
    <span class="p">}</span>

    <span class="nx">retrieveHelloWorldMessage</span><span class="p">()</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/hello-world`);</span>
    <span class="p">}</span>

    <span class="nx">retrieveHelloWorldPathVariable</span><span class="p">(</span><span class="nx">name</span><span class="p">){</span>
        <span class="k">return</span> <span class="nx">axios</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="err">`</span><span class="nx">http</span><span class="o">:</span><span class="c1">//localhost:8080/hello-world/path-variable/${name}`);   </span>
    <span class="p">}</span>

<span class="p">}</span>

<span class="kr">export</span> <span class="k">default</span> <span class="k">new</span> <span class="nx">WelcomeService</span><span class="p">();</span>
</pre></div><a class="headerlink" href="#import-axios-from-axios-class-welcomeservice-retrievehelloworldbean-return-axiosgethttplocalhost8080hello-world-bean-retrievehelloworldmessage-return-axiosgethttplocalhost8080hello-world-retrievehelloworldpathvariablename-return-axiosgethttplocalhost8080hello-worldpath-variablename-export-default-new-welcomeservice" title="Permanent link"></a></h2>
<h3 id="packagejson">/package.json<a class="headerlink" href="#packagejson" title="Permanent link"></a></h3>
<h2 id="name-my-todo-app-version-010-private-true-dependencies-axios-0180-formik-151-moment-2240-react-1670-react-dom-1670-react-router-dom-431-react-scripts-213-validator-10110-scripts-start-port4200-react-scripts-start-build-react-scripts-build-test-react-scripts-test-eject-react-scripts-eject-eslintconfig-extends-react-app-browserslist-02-not-dead-not-ie-11-not-op_mini-all"><div class="codehilite"><pre><span class="p">{</span>
  <span class="nt">&quot;name&quot;</span><span class="p">:</span> <span class="s2">&quot;my-todo-app&quot;</span><span class="p">,</span>
  <span class="nt">&quot;version&quot;</span><span class="p">:</span> <span class="s2">&quot;0.1.0&quot;</span><span class="p">,</span>
  <span class="nt">&quot;private&quot;</span><span class="p">:</span> <span class="kc">true</span><span class="p">,</span>
  <span class="nt">&quot;dependencies&quot;</span><span class="p">:</span> <span class="p">{</span>
    <span class="nt">&quot;axios&quot;</span><span class="p">:</span> <span class="s2">&quot;^0.18.0&quot;</span><span class="p">,</span>
    <span class="nt">&quot;formik&quot;</span><span class="p">:</span> <span class="s2">&quot;^1.5.1&quot;</span><span class="p">,</span>
    <span class="nt">&quot;moment&quot;</span><span class="p">:</span> <span class="s2">&quot;^2.24.0&quot;</span><span class="p">,</span>
    <span class="nt">&quot;react&quot;</span><span class="p">:</span> <span class="s2">&quot;^16.7.0&quot;</span><span class="p">,</span>
    <span class="nt">&quot;react-dom&quot;</span><span class="p">:</span> <span class="s2">&quot;^16.7.0&quot;</span><span class="p">,</span>
    <span class="nt">&quot;react-router-dom&quot;</span><span class="p">:</span> <span class="s2">&quot;^4.3.1&quot;</span><span class="p">,</span>
    <span class="nt">&quot;react-scripts&quot;</span><span class="p">:</span> <span class="s2">&quot;2.1.3&quot;</span><span class="p">,</span>
    <span class="nt">&quot;validator&quot;</span><span class="p">:</span> <span class="s2">&quot;^10.11.0&quot;</span>
  <span class="p">},</span>
  <span class="nt">&quot;scripts&quot;</span><span class="p">:</span> <span class="p">{</span>
    <span class="nt">&quot;start&quot;</span><span class="p">:</span> <span class="s2">&quot;PORT=4200 react-scripts start&quot;</span><span class="p">,</span>
    <span class="nt">&quot;build&quot;</span><span class="p">:</span> <span class="s2">&quot;react-scripts build&quot;</span><span class="p">,</span>
    <span class="nt">&quot;test&quot;</span><span class="p">:</span> <span class="s2">&quot;react-scripts test&quot;</span><span class="p">,</span>
    <span class="nt">&quot;eject&quot;</span><span class="p">:</span> <span class="s2">&quot;react-scripts eject&quot;</span>
  <span class="p">},</span>
  <span class="nt">&quot;eslintConfig&quot;</span><span class="p">:</span> <span class="p">{</span>
    <span class="nt">&quot;extends&quot;</span><span class="p">:</span> <span class="s2">&quot;react-app&quot;</span>
  <span class="p">},</span>
  <span class="nt">&quot;browserslist&quot;</span><span class="p">:</span> <span class="p">[</span>
    <span class="s2">&quot;&gt;0.2%&quot;</span><span class="p">,</span>
    <span class="s2">&quot;not dead&quot;</span><span class="p">,</span>
    <span class="s2">&quot;not ie &lt;= 11&quot;</span><span class="p">,</span>
    <span class="s2">&quot;not op_mini all&quot;</span>
  <span class="p">]</span>
<span class="p">}</span>
</pre></div><a class="headerlink" href="#name-my-todo-app-version-010-private-true-dependencies-axios-0180-formik-151-moment-2240-react-1670-react-dom-1670-react-router-dom-431-react-scripts-213-validator-10110-scripts-start-port4200-react-scripts-start-build-react-scripts-build-test-react-scripts-test-eject-react-scripts-eject-eslintconfig-extends-react-app-browserslist-02-not-dead-not-ie-11-not-op_mini-all" title="Permanent link"></a></h2>
<p>class Application extends React.Component {
  render() {
    return <Counters /></p>
<p>}
}</p>
<p>class Counters extends React.Component {</p>
<p>constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }</p>
<p>increment = (by) =&gt; {
    console.log(&lsquo;increment&rsquo; + by)
  }</p>
<p>render() {
    return <div>
              <Counter by={1} increment={this.increment}/>
              <Counter by={2} increment={this.increment}/>
              <Counter by={5} increment={this.increment}/>
              Current value is {this.state.counter}
    </div></p>
<p>}<br />
}</p>
<p>class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
    this.increment = this.increment.bind(this)
  }
  render() {
    return <div><button onClick={() => this.props.increment(this.props.by)}&gt;+{this.props.by}</button> <div>Current value is {this.state.counter}</div></div>
  }
  increment() {
    this.setState( {
        counter: this.state.counter + this.props.by
      }
    )  <br />
  }
}</p>
<p>React.render(<Application name="Ranga" todo={{desc:'Learn Angular 8'}}/> , document.getElementById(&lsquo;app&rsquo;));</p>
<h3 id="last-attempt">Last Attempt<a class="headerlink" href="#last-attempt" title="Permanent link"></a></h3>
<p>import React, { Component } from &lsquo;react&rsquo;;
import {BrowserRouter as Router, Route} from &lsquo;react-router-dom&rsquo;;
import &lsquo;./App.css&rsquo;;</p>
<p>class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          &lt;&gt;
            <Route exact path="/" component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/welcome" component={WelcomeComponent} />
          </>
        </Router>
      </div>
    );
  }
}</p>
<p>class LoginComponent extends Component {</p>
<p>constructor(props) {
    super(props)
    this.state = {
      username: &lsquo;in28minutes&rsquo;,
      password: &lsquo;&rsquo;,
      hasLoginFailed: false,
      message: &lsquo;&rsquo;
    }
  }</p>
<p>handleUsernameChange = (event) =&gt; {
    this.setState({ username: event.target.value });
  }</p>
<p>handlePasswordChange = (event) =&gt; {
    this.setState({ [event.target.name]: event.target.value });
  }</p>
<p>loginClicked = (e) =&gt; {
    if(this.state.username===&rsquo;in28minutes&rsquo; &amp;&amp; this.state.password===&rsquo;dummy&rsquo;) {
      this.props.history.push(&lsquo;/welcome&rsquo;);
    } else {
      this.setState({ hasLoginFailed: true })
    }</p>
<p>}</p>
<p>render() {
    return (
      <div className="LoginComponent">
          <div>{this.state.message}</div>
          <ShowValidationMessage showErrorMessage={this.state.hasLoginFailed}/>
          <input type="text" name="username" value={this.state.username}  onChange={this.handleUsernameChange} />
          <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button onClick={this.loginClicked}>Login</button>
          {/<em><br/>
          {this.state.username} - {this.state.password}</em>/}
      </div>
    )
  }
}</p>
<p>function ShowValidationMessage(props) {
  if(props.showErrorMessage) {
    return <div>Please enter valid credentials</div>
  }
  return null
}</p>
<p>function WelcomeComponent() {
    return <div>Welcome to in28Minutes </div>
}</p>
<p>export default App;</p></article></body></html>
```
---

### /restful-web-services/src/test/java/com/in28minutes/rest/webservices/restfulwebservices/RestfulWebServicesApplicationTests.java

```java
package com.in28minutes.rest.webservices.restfulwebservices;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RestfulWebServicesApplicationTests {

	@Test
	public void contextLoads() {
	}

}
```
---

### /restful-web-services/src/main/resources/application.properties

```properties
logging.level.org.springframework = info
```
---

### /restful-web-services/src/main/java/com/in28minutes/rest/webservices/restfulwebservices/helloworld/HelloWorldController.java

```java
package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
@CrossOrigin(origins="http://localhost:4200")
//
public class HelloWorldController {

	@GetMapping(path = "/hello-world")
	public String helloWorld() {
		return "Hello World";
	}

	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World");
	}
	
	///hello-world/path-variable/in28minutes
	@GetMapping(path = "/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		//throw new RuntimeException("Something went wrong");
		return new HelloWorldBean(String.format("Hello World, %s", name));
	}
}
```
---

### /restful-web-services/src/main/java/com/in28minutes/rest/webservices/restfulwebservices/helloworld/HelloWorldBean.java

```java
package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

public class HelloWorldBean {

	private String message;

	public HelloWorldBean(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return String.format("HelloWorldBean [message=%s]", message);
	}

}
```
---

### /restful-web-services/src/main/java/com/in28minutes/rest/webservices/restfulwebservices/todo/TodoHardcodedService.java

```java
package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService {

	private static List<Todo> todos = new ArrayList<>();
	private static int idCounter = 0;

	static {
		todos.add(new Todo(++idCounter, "in28minutes", "Learn to Dance 2", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Microservices 2", new Date(), false));
		todos.add(new Todo(++idCounter, "in28minutes", "Learn about Angular", new Date(), false));
	}

	public List<Todo> findAll() {
		return todos;
	}

	public Todo deleteById(long id) {
		Todo todo = findById(id);

		if (todo == null)
			return null;

		if (todos.remove(todo)) {
			return todo;
		}

		return null;
	}

	public Todo findById(long id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}

		return null;
	}
}
```
---

### /restful-web-services/src/main/java/com/in28minutes/rest/webservices/restfulwebservices/todo/TodoResource.java

```java
package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoResource {

	@Autowired
	private TodoHardcodedService todoService;

	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		// Thread.sleep(3000);
		return todoService.findAll();
	}

	// DELETE /users/{username}/todos/{id}
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {

		Todo todo = todoService.deleteById(id);

		if (todo != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}
}
```
---

### /restful-web-services/src/main/java/com/in28minutes/rest/webservices/restfulwebservices/todo/Todo.java

```java
package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.Date;

public class Todo {
	private long id;
	private String username;
	private String description;
	private Date targetDate;
	private boolean isDone;

	public Todo(long id, String username, String description, Date targetDate, boolean isDone) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.isDone = isDone;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		if (id != other.id)
			return false;
		return true;
	}

	
}
```
---

### /restful-web-services/src/main/java/com/in28minutes/rest/webservices/restfulwebservices/RestfulWebServicesApplication.java

```java
package com.in28minutes.rest.webservices.restfulwebservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestfulWebServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestfulWebServicesApplication.class, args);
	}
}
```
---
