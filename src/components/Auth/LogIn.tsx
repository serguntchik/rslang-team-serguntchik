import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar } from '@material-ui/core';
import {
    Alert, Container, IconButton, InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { signIn, IFormInput } from '../../core/api';
import './auth.css';

interface ILoginResponse {
    message: string;
    name: string;
    refreshToken: string;
    token: string;
    userId: string;
}
export const LogIn: React.FC = () => {
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isWait, setWait] = useState(false);
    const navigation = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleCloseSnackbar = () => {
        setIncorrectEmail(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormInput>({ mode: 'onChange' });

    const onSubmit = (data: IFormInput) => {
        setWait(true);
        signIn(data)
            .then((loginResponse: ILoginResponse) => {
                localStorage.setItem('token', loginResponse.token);
                localStorage.setItem('refreshToken', loginResponse.refreshToken);
                localStorage.setItem('id', loginResponse.userId);
                localStorage.setItem('name', loginResponse.name);
                setWait(false);
                navigation('/');
            })
            .catch(() => {
                setWait(false);
                setIncorrectEmail(true);
            });
    };

    return (
        <Container>
            <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
                <h2>Log in to your account!</h2>
                <TextField
                    id="outlined-basic-1"
                    label="Email"
                    variant="outlined"
                    required
                    style={{ margin: '10px 0px' }}
                    {...register('email', {
                        required: true,
                        pattern:
                            // eslint-disable-next-line max-len
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                />
                {errors?.email && <p className="auth-error">{errors.email?.message || 'incorrect email'}</p>}

                <TextField
                    id="outlined-basic-2"
                    label="Пароль"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    required
                    style={{ margin: '10px 0px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...register('password', {
                        required: true,
                        minLength: { value: 9, message: 'min length 9 symbol' },
                    })}
                />
                {errors?.password && <p className="auth-error">{errors.password?.message || 'incorrect password'}</p>}

                <Button
                    variant="outlined"
                    type="submit"
                    disabled={!isValid || isWait}
                    color="primary"
                    style={{ margin: '20px 0px' }}
                >
                    Войти
                </Button>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={incorrectEmail}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert severity="error" sx={{ width: '350px' }}>
                        неверный email или пароль!
                    </Alert>
                </Snackbar>
            </form>
            <h3 style={{ textAlign: 'center' }}>
                Нет аккаунта?
                {' '}
                <Link to="/auth">Создать</Link>
            </h3>
        </Container>
    );
};
