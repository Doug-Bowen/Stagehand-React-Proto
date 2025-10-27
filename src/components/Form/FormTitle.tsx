import { FC, ReactNode } from 'react';
import styled from '@emotion/styled/macro';
import colors from 'styles/colors';

const Heading = styled.h3({
    color: colors.greenPea,
    fontSize: 20,
    fontWeight: 500,
    margin: '0 0 16px 0'
});

interface FormTitleProps {
    children?: ReactNode;
}

const FormTitle: FC<FormTitleProps> = ({ children }) => {
    return (
        <Heading hidden={!children}>{ children }</Heading>
    );
};

export default FormTitle;
