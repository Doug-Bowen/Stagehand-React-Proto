import styled from '@emotion/styled/macro';
import colors from 'styles/colors';

/*
    Content Sections
 */
export const Main = styled.main({
    backgroundColor: colors.wildSand,
    display: 'grid',
    gridTemplateColumns: '1fr 415px',
    gridArea: 'main'
});

export const SideBar = styled.aside({
    backgroundColor: colors.white,
    borderLeft: `1px solid ${colors.alto}`,
    padding: '27px 43px'
});
