import { lazy } from 'react';

const DashboardPage = lazy(() => import('./DashboardPage/DashboardPage'));

const DashboardContainer = () => (
    <DashboardPage />
);

export default DashboardContainer;
