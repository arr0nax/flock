import React from 'react';
import { Switch, Route } from 'react-router';

import Main from 'containers/Main';
import MainMenu from 'containers/MainMenu';
import Notifications from 'containers/Notifications';
import Reports from 'containers/Reports';
import DetailsPage from 'containers/DetailsPage';
import ReportedDetailsPage from 'containers/ReportedDetailsPage';
// import NotFound from 'components/NotFound';

import './index.css';

const RootRouter = () => (
  <React.Fragment>
    <Switch>
      <Route path="/details/:item_type/:item_id" component={DetailsPage}/>
      <Route path="/reports/:item_type/:item_id" component={ReportedDetailsPage}/>
      <Route path="/menu" component={MainMenu}/>
      <Route path="/notifications" component={Notifications}/>
      <Route path="/reports" component={Reports}/>
      <Route exact path="/" component={Main} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </React.Fragment>
);

RootRouter.propTypes = {
};

RootRouter.defaultProps = {
};

export default RootRouter;
