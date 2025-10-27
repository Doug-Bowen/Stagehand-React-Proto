import styled from '@emotion/styled/macro';
import colors from 'styles/colors';
import { Content as MainContent } from 'styles/page.styles';
import { Paper as MaterialPaper } from '@mui/material';

/*
    Grid Containers
 */
export const PageLayout = styled.div({
    display: 'grid'
});

export const Widgets = styled.section({
    display: 'grid',
    gap: 34,
    gridTemplateColumns: 'repeat(4, 1fr)'
});

/*
    Content Sections
 */
export const Main = styled.main({
    backgroundColor: colors.wildSand,
    display: 'grid',
    gridTemplateColumns: '337px 1fr'
});

export const SideBar = styled.aside({
    backgroundColor: colors.white,
    borderRight: `1px solid ${colors.alto}`,
    padding: '27px 43px'
});

export const Content = styled(MainContent)({
    gridTemplateRows: '175px 1fr'
});

/*
    Styled Components
 */
export const Paper = styled(MaterialPaper)({
    alignItems: 'center',
    borderRadius: '10px !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    div: {
        fontSize: 48,
        fontWeight: 400
    },
    span: {
        color: colors.doveGrey,
        fontSize: 14
    }
});
