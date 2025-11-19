import { FC, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardContainer from 'containers/Dashboard';
import App2Container from 'containers/App2';
import App3Container from 'containers/App3';

const Routes: FC = () => {

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <Router>
                <Switch>
                    <Route exact path='/app3'>
                        <App3Container />
                    </Route>
                    <Route exact path='/app2'>
                        <App2Container />
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
