import { FC, ReactNode } from 'react';
import styled from '@emotion/styled/macro';
import colors from 'styles/colors';

const StyledDiv = styled.div({
    border: `1px solid ${colors.lightAlto}`,
    borderRadius: 10,
    padding: '30px 45px'
});

interface WellProps {
    children?: ReactNode;
}

const Well: FC<WellProps> = ({ children }) => {
    return (
        <StyledDiv>
            { children }
        </StyledDiv>
    )
};

export default Well;
