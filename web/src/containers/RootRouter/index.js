import React from 'react';
import { Switch, Route } from 'react-router';

import Main from 'containers/Main';
import DetailsPage from 'containers/DetailsPage';
// import NotFound from 'components/NotFound';

import './index.css';

const RootRouter = () => (
  <React.Fragment>
    <Switch>
      <Route path="/details/:item_type/:item_id" component={DetailsPage}/>
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
