import styled from '@emotion/styled/macro';
import colors from './colors';

/*
    Main content pane grid shared between pages
 */
export const Content = styled.div({
    display: 'grid',
    gridGap: 35,
    padding: '35px 37px'
});

/*
    Loading div with the background color matching the Content styled div
 */
export const ContentPageLoading = styled.div({
    backgroundColor: colors.wildSand,
    padding: '35px 37px'
});
