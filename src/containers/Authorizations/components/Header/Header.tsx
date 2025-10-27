import { FC } from 'react';
import styled from '@emotion/styled/macro';
import colors from 'styles/colors';
import { useRouteMatch } from 'react-router-dom';

const StyledHeader = styled.header({
    alignItems: 'center',
    borderBottom: `1px solid ${colors.alto}`,
    display: 'flex',
    gridArea: 'header',
    padding: '16px 40px',
    h3: {
        fontSize: 20,
        fontWeight: 500
    }
});

const Header: FC = () => {
    const createMatch = useRouteMatch('/authorizations/create');

    return (
        <StyledHeader>
            {
                createMatch ? (
                    <h3>Create Authorization</h3>
                ) : (
                    <h3>Details Page</h3>
                )
            }
        </StyledHeader>
    );
};

export default Header;
