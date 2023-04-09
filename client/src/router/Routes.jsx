import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  Prompt,
} from 'react-router-dom';
import appRoutersInit from './appRoutersInit';

const Routes = () => {
  return (
    <Router>
        <Switch>
            {
                appRoutersInit.map((item, index) => {
                    return <Route path={item.path} key={index} component={item.component} />
                })
            }
        </Switch>
    </Router>
  );
};

export default Routes;
