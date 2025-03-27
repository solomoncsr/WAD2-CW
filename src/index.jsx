/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router, A, Navigate } from '@solidjs/router';

import './index.css';
import './assets/bootstrap/js/bootstrap.bundle.min.js';
import './assets/bootstrap/css/bootstrap.min.css';

import Home from './pages/Home';
import Catalogue from './pages/courses/Catalogue';
import Course from './pages/courses/Course';
import MyAccount from './pages/auth/MyAccount';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import UserDetails from './pages/auth/UserDetails';
import Admin from './pages/auth/Admin';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

function App(props) {
  return (
    <div className="cover-container d-flex w-100 h-100 flex-column" style="z-index: 1500;">
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></hr></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
    {props.children}
    </div>
    
  );
}

render(() => (
  <Router root={App}>
    <Route path="/home" component={Home}/>
    <Route path='/catalogue/' component={Catalogue} />
    <Route path='/course/:id' component={Course} />
    <Route path="/my-account">
        <Route path="/" component={MyAccount} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/details" component={UserDetails} />
        <Route path="/admin" component={Admin} />
      </Route>
    <Route path='*' component={() => <Navigate href={'/home'} />} />;
  </Router>
), root);
