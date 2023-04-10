import * as React from 'react';
import routers from '../constants/routers.js';
import { Box } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import appRoutersInit from './appRoutersInit';

const Routes = () => {
  const withWrapper = (WrappedWithWrapper) => (prop) =>
    (
      <Box
        display="grid"
        alignItems="center"
        height="100vh"
        width="100vw">
        <Box
          display="grid"
          justifyContent="center"
          component="form"
          gap="10px">
          <WrappedWithWrapper {...prop} />
        </Box>
      </Box>
    );

  const geterateWrapper = (component) => {
    return withWrapper(component);
  };

  return (
    <Router>
      <Switch>
        {appRoutersInit.map((item, index) => {
          if (item.path !== routers.LOGIN || item.path !== routers.REGISTER)
            return (
              <Route
                path={item.path}
                key={index}
                component={geterateWrapper(item.component)}
              />
            );
          return (
            <Route
              path={item.path}
              key={index}
              component={item.component}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default Routes;
