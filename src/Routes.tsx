import { FC, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthorizationsContainer from 'containers/Authorizations';
import DashboardContainer from 'containers/Dashboard';

const Routes: FC = () => {

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <Router>
                <Switch>
                    <Route path='/authorizations'>
                        <AuthorizationsContainer />
                    </Route>
                    <Route path='/'>
                        <DashboardContainer />
                    </Route>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default Routes;
