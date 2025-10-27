import { FC } from 'react';
import { Content, Main, PageLayout, Paper, SideBar, Widgets } from './dashboardPage.styles';

const DashboardPage: FC = () => {
    return (
        <PageLayout>
            <Main>
                <SideBar>

                </SideBar>
                <Content>
                    <Widgets>
                        <Paper variant='outlined'>
                            <div>86</div>
                            <span>Total Files</span>
                        </Paper>
                        <Paper variant='outlined'>
                            <div>11.2</div>
                            <span>Avg Length of Rental</span>
                        </Paper>
                        <Paper variant='outlined'>
                            <div>0.2</div>
                            <span>Days Behind</span>
                        </Paper>
                        <Paper variant='outlined'>
                            <div>385.21</div>
                            <span>Avg Total Authorized</span>
                        </Paper>
                    </Widgets>
                </Content>
            </Main>
        </PageLayout>
    );
};

export default DashboardPage;
