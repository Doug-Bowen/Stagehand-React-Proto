import styled from '@emotion/styled/macro';
import colors from '../../styles/colors';
import { FormSectionProps } from './FormSection';

export const Grid = styled.div<FormSectionProps>(({ columns }) => ({
    display: 'grid',
    gridGap: 16,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    '> div': {
        display: 'flex',
        gap: 16
    },
    input: {
        backgroundColor: colors.white
    }
}));

export const Label = styled.div({
    color: colors.doveGrey,
    fontSize: 12,
    marginBottom: 8
});
