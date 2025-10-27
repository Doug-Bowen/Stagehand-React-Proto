import styled from '@emotion/styled/macro';
import colors from 'styles/colors';

/*
    Grid Containers
 */
export const PageLayout = styled.div({
    display: 'grid',
    gridTemplateRows: 'auto 55px'
});

export const ScrollableContent = styled.div({
    display: 'grid',
    gridTemplateAreas: `
        'header'
        'main'
    `,
    gridTemplateRows: '109px auto',
    overflow: 'auto'
});

/*
    Content Sections
 */
export const Footer = styled.footer({
    borderTop: `1px solid ${colors.alto}`,
    padding: '16px 28px',
    width: '100%'
});
