import styled from '@emotion/styled/macro';
import colors from 'styles/colors';

/*
    Content Sections
 */
export const Main = styled.main({
    backgroundColor: colors.wildSand,
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gridArea: 'main'
});
