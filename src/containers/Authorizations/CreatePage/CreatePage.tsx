import { FC } from 'react';
import {
    SideBar,
    Main
} from './createPage.styles';
import { Content } from 'styles/page.styles';
import useFetch from 'hooks/useFetch';
import { Form, FormSection, FormTitle, Well } from 'components';
import { TextField } from '@mui/material';

const CreatePage: FC = () => {
    const { loading, error, data } = useFetch<any>('/arms/data', {}, false, { data: 1 });

    return (
        <Main>
            <Content>
                <Well>
                    <Form title='Renter Information'>
                        <FormSection columns={3} label='Name'>
                            <TextField label='Last Name' size='small' variant='outlined' />
                            <TextField label='First Name' size='small' variant='outlined' />
                        </FormSection>
                        <FormSection columns={3} label='Contact Information'>
                            <TextField label='Primary Phone' size='small' variant='outlined' />
                            <TextField label='Secondary Phone' size='small' variant='outlined' />
                            <TextField label='Email' size='small' variant='outlined' />
                        </FormSection>
                        <FormSection columns={3} label='Address'>
                            <TextField label='Street' size='small' variant='outlined' />
                            <TextField label='City' size='small' variant='outlined' />
                            <div>
                                <TextField label='State' size='small' variant='outlined' />
                                <TextField label='Zip Code' size='small' variant='outlined' />
                            </div>
                        </FormSection>
                    </Form>
                </Well>
                <Well>
                    <Form title='Claim Information'>
                        <FormSection columns={3}>
                            <TextField label='Claim Number' size='small' variant='outlined' />
                            <TextField label='Claim Type' size='small' variant='outlined' />
                        </FormSection>
                        <FormSection columns={3} label='Vehicle Information'>
                            <TextField label='Vehicle Condition' size='small' variant='outlined' />
                            <TextField label='Year' size='small' variant='outlined' />
                            <TextField label='Make' size='small' variant='outlined' />
                            <TextField label='Model' size='small' variant='outlined' />
                        </FormSection>
                    </Form>
                </Well>
            </Content>
            <SideBar>
                <FormTitle>Rental Information</FormTitle>
            </SideBar>
        </Main>
    );
};

export default CreatePage;
