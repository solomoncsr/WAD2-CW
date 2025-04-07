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
import YourClasses from './pages/auth/YourClasses';
import Admin from './pages/auth/Admin';

import Footer from './components/Footer';

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
        <nav class="navbar navbar-expand-sm bg-body-tertiary p-3">
          <div class="container-fluid">
            <span class="navbar-brand" href="#">Edinburgh School of Dance</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <A class="nav-link active" aria-current="page" href="/home">Home</A>
                </li>
                <li class="nav-item">
                  <A class="nav-link" href="/catalogue">Course Catalogue</A>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    My Account
                  </a>
                  <ul class="dropdown-menu">
                    <li><A class="dropdown-item" href="/my-account/login">Login</A></li>
                    <li><A class="dropdown-item" href="/my-account/sign-up">Sign Up</A></li>
                    <li><hr class="dropdown-divider"></hr></li>
                    <li><A class="dropdown-item" href="/my-account/details">Your Classes</A></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {props.children}
      <Footer />
    </div>
  );
}

render(() => (
  <Router root={App}>
    <Route path="/home" component={Home}/>
    <Route path='/catalogue' component={Catalogue} />
    <Route path='/course/:id' component={Course} />
    <Route path="/my-account">
      <Route path="/" component={MyAccount} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/details" component={YourClasses} />
      <Route path="/admin" component={Admin} />
    </Route>
    <Route path='*' component={() => <Navigate href={'/home'} />} />;
  </Router>
), root);
