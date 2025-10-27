import { FC, ReactNode } from 'react';
import { Footer, PageLayout, ScrollableContent } from './sharedLayout.styles';
import AuthorizationsProvider from 'contexts/Authorizations/AuthorizationsContext';
import Header from '../Header/Header';

interface SharedLayoutProps {
    children?: ReactNode;
}

const SharedLayout: FC<SharedLayoutProps> = ({ children }) => {
    return (
        <AuthorizationsProvider>
            <PageLayout>
                <ScrollableContent>
                    <Header />
                    { children }
                </ScrollableContent>
                <Footer>Footer</Footer>
            </PageLayout>
        </AuthorizationsProvider>
    )
};

export default SharedLayout;
