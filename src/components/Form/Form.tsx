import { FC, ReactNode } from 'react';
import styled from '@emotion/styled/macro';
import FormTitle from './FormTitle';

const FormGrid = styled.section({
    alignItems: 'center',
    display: 'grid',
    gridGap: 27
});

interface FormProps {
    title?: string;
    children?: ReactNode;
}

const Form: FC<FormProps> = ({ children, title }) => {
    return (
        <>
            <FormTitle>{title}</FormTitle>
            <FormGrid>
                { children }
            </FormGrid>
        </>
    )
};

export default Form;
