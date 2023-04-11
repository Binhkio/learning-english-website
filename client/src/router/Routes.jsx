/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routers from '../constants/routers';
import appRoutersInit from './appRoutersInit';

function Routes() {
  const withWrapper = (WrappedWithWrapper) => {
    const withWrapper = (props) => {
      const { ...rest } = props;
      return (
        <Box display="grid" alignItems="center" height="100vh" width="100vw">
          <Box display="grid" justifyContent="center" component="form" gap="10px">
            <WrappedWithWrapper {...rest} />
          </Box>
        </Box>
      );
    };
    return withWrapper;
  };

  const geterateWrapper = (component) => withWrapper(component);

  return (
    <Router>
      <Switch>
        {appRoutersInit.map((item) => {
          if (item.path !== routers.LOGIN || item.path !== routers.REGISTER) {
            return (
              <Route path={item.path} key={item.path} component={geterateWrapper(item.component)} />
            );
          }
          return <Route path={item.path} key={item.path} component={item.component} />;
        })}
      </Switch>
    </Router>
  );
}

export default Routes;
