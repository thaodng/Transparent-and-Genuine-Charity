import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import CharityList from './pages/CharityList';
import RegisterCharity from './pages/RegisterCharity';
import Donate from './pages/Donate';
import Prepare from './pages/Prepare';
import ThankYou from './pages/ThankYou';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/charities" component={CharityList} />
        <Route exact path="/register-charity" component={RegisterCharity} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/prepare" component={Prepare} />
        <Route exact path="/thankyou" component={ThankYou} />
      </Switch>
    </Layout>
  );
}

export default App;
