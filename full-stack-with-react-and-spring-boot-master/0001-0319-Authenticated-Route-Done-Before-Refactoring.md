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
}

export default new AuthenticationService()
```
---

### /frontend/todo-app/src/components/todo/TodoApp.jsx

```
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'

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

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2018 @in28minutes</span>
            </footer>
        )
    }
}

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

class ListTodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos : 
            [
             {id: 1, description : 'Learn to Dance', done:false, targetDate: new Date()},
             {id: 2, description : 'Become an Expert at React', done:false, targetDate: new Date()},
             {id: 3, description : 'Visit India', done:false, targetDate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                 <h1>List Todos</h1>
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
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


class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
            </>
        )        
    }
}

function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support at abcd-efgh-ijkl</div>
}

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

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed) {
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowLoginSuccessMessage(props) {
//     if(props.showSuccessMessage) {
//         return <div>Login Sucessful</div>
//     }
//     return null
// }

export default TodoApp
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
  constructor() {
      super(); //Error 1

    //   this.state = {
    //       counter : 0
    //   }

    //   this.increment = this.increment.bind(this);
    //   this.decrement = this.decrement.bind(this);
  }
  
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
import FirstComponent from './components/learning-examples/FirstComponent'
import SecondComponent from './components/learning-examples/SecondComponent'
import ThirdComponent from './components/learning-examples/ThirdComponent'
import Counter from './components/counter/Counter'
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

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
         My Hello World
         <FirstComponent></FirstComponent>
         <SecondComponent></SecondComponent>
         <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}

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
    "react": "^16.8.4",
    "react-dom": "^16.8.4",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.8"
  },
  "scripts": {
    "start": "react-scripts start",
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

### /diff-2.txt

```
diff --git a/frontend/todo-app/src/components/todo/TodoApp.jsx b/frontend/todo-app/src/components/todo/TodoApp.jsx
index 8179e94..29e225d 100644
--- a/frontend/todo-app/src/components/todo/TodoApp.jsx
+++ b/frontend/todo-app/src/components/todo/TodoApp.jsx
@@ -1,5 +1,6 @@
 import React, {Component} from 'react'
-import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
+import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'
+import AuthenticationService from './AuthenticationService'
 
 class TodoApp extends Component {
     render() {
@@ -11,9 +12,9 @@ class TodoApp extends Component {
                         <Switch>
                             <Route path="/" exact component={LoginComponent}/>
                             <Route path="/login" component={LoginComponent}/>
-                            <Route path="/welcome/:name" component={WelcomeComponent}/>
-                            <Route path="/todos" component={ListTodosComponent}/>
-                            <Route path="/logout" component={LogoutComponent}/>
+                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
+                            <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
+                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                             <Route component={ErrorComponent}/>
                         </Switch>
                         <FooterComponent/>
@@ -26,19 +27,38 @@ class TodoApp extends Component {
     }
 }
 
+class AuthenticatedRoute extends Component {
+    
+    constructor(props) {
+        super(props)
+    }
+    
+    render() {
+        const isUserLoggedIn = AuthenticationService.isUserAlreadyLoggedIn();
+        const loggedInUser = AuthenticationService.getUserName();
+        if(isUserLoggedIn) {
+            return <Route component={this.props.component} {...this.props}/>
+        } else {
+            return <Redirect to="/login" />
+        }
+    }
+}
+
 class HeaderComponent extends Component {
     render() {
+        const isUserLoggedIn = AuthenticationService.isUserAlreadyLoggedIn();
+
         return (
             <header>
                 <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                     <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
                     <ul className="navbar-nav">
-                        <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
-                        <li><Link className="nav-link" to="/todos">Todos</Link></li>
+                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
+                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                     </ul>
                     <ul className="navbar-nav navbar-collapse justify-content-end">
-                        <li><Link className="nav-link" to="/login">Login</Link></li>
-                        <li><Link className="nav-link" to="/logout">Logout</Link></li>
+                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
+                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                     </ul>
                 </nav>
             </header>
@@ -58,6 +78,7 @@ class FooterComponent extends Component {
 
 class LogoutComponent extends Component {
     render() {
+        AuthenticationService.logout();
         return (
             <>
                 <h1>You are logged out</h1>
@@ -114,7 +135,6 @@ class ListTodosComponent extends Component {
     }
 }
 
-
 class WelcomeComponent extends Component {
     render() {
         return (
@@ -177,6 +197,7 @@ class LoginComponent extends Component {
     loginClicked() {
         //in28minutes,dummy
         if(this.state.username==='in28minutes' && this.state.password==='dummy'){
+            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
             this.props.history.push(`/welcome/${this.state.username}`)
             //this.setState({showSuccessMessage:true})
             //this.setState({hasLoginFailed:false})
```
---
