import React from 'react';
import { Switch, Route } from 'react-router';

import Main from 'containers/Main';
import MainMenu from 'containers/MainMenu';
import Notifications from 'containers/Notifications';
import Reports from 'containers/Reports';
import DetailsPage from 'containers/DetailsPage';
import ReportedDetailsPage from 'containers/ReportedDetailsPage';
import About from 'containers/About';
import Login from 'containers/LoginForm';
// import NotFound from 'components/NotFound';
import guard from 'components/AuthGuard';

import './index.css';

const RootRouter = () => (
  <React.Fragment>
    <Switch>
      <Route path="/details/:item_type/:item_id" component={guard(DetailsPage)}/>
      <Route path="/reports/:item_type/:item_id" component={guard(ReportedDetailsPage)}/>
      <Route path="/menu" component={guard(MainMenu)}/>
      <Route path="/notifications" component={guard(Notifications)}/>
      <Route path="/reports" component={guard(Reports)}/>
      <Route exact path="/" component={guard(Main)} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </React.Fragment>
);

RootRouter.propTypes = {
};

RootRouter.defaultProps = {
};

export default RootRouter;
