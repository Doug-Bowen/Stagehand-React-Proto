import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ContentPageLoading } from 'styles/page.styles';
import SharedLayout from './components/SharedLayout/SharedLayout';

const CreatePage = lazy(() => import('./CreatePage/CreatePage'));
const DetailsPage = lazy(() => import('./DetailsPage/DetailsPage'));

const AuthorizationsContainer = () => (
    <Switch>
        <SharedLayout>
            <Suspense fallback={<ContentPageLoading>Loading...</ContentPageLoading>}>
                <Route path='/authorizations/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/authorizations/details'>
                    <DetailsPage />
                </Route>
            </Suspense>
        </SharedLayout>
    </Switch>
);

export default AuthorizationsContainer;
