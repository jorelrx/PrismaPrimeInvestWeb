import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useAuth } from '@/contexts/AuthContext';
import { LoginContainer, LoginForm, LoginInput, LoginButton } from '../../styles/login/styles';
import { useNotification } from '@/contexts/NotificationContext';
import nookies from 'nookies';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const { addNotification } = useNotification();

    useEffect(() => {
        const message = nookies.get(null).notificationMessage;
        if (message) {
            addNotification(message, 'error');
            nookies.destroy(null, 'notificationMessage');
        }
    }, [addNotification]);

    return (
        <LoginContainer>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => {
            await login(values.email, values.password);
            }}
        >
            <LoginForm>
            <LoginInput name="email" type="email" placeholder="Email" />
            <LoginInput name="password" type="password" placeholder="Password" />
            <LoginButton type="submit">Login</LoginButton>
            </LoginForm>
        </Formik>
        </LoginContainer>
    );
};

export default LoginPage;