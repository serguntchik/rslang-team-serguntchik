import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Snackbar } from '@material-ui/core';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { signIn, createUser, IFormInput } from '../../core/api';
import './auth.css';

interface ILoginResponse {
    message: string;
    name: string;
    refreshToken: string;
    token: string;
    userId: string;
}
export const AuthForm: React.FC = () => {
    const [isRegistered, setRegistered] = useState(false);
    const [isErrorLogin, setErrorLogin] = useState(true);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const handleCloseSnackbar = () => {
        setIncorrectEmail(false);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IFormInput>({ mode: 'onChange' });

    const onSubmit = async (data: IFormInput) => {
        setErrorLogin(true);

        if (isRegistered) {
            try {
                await createUser(data);
            } catch (err: unknown) {
                setErrorLogin(false);
                return;
            }
        }

        try {
            const loginResponse: ILoginResponse = await signIn(data);
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('refreshToken', loginResponse.refreshToken);
            localStorage.setItem('id', loginResponse.userId);
            localStorage.setItem('name', loginResponse.name);
            reset();
        } catch (er) {
            setIncorrectEmail(true);
        }
    };

    const handleRegister = () => {
        setRegistered((prevState) => !prevState);
    };

    return (
        <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
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

            {isRegistered && (
                <TextField
                    id="outlined-basic-3"
                    label="Имя"
                    variant="outlined"
                    required
                    {...register('name', {
                        required: true,
                        minLength: { value: 3, message: 'min length 3 symbol' },
                    })}
                />
            )}
            {errors?.name && <p className="auth-error">{errors.name?.message || 'incorrect Name'}</p>}

            {isErrorLogin || <p className="auth-error">такой email уже зарегистрирован</p>}
            <Button
                variant="outlined"
                type="submit"
                disabled={!isValid}
                color="secondary"
                style={{ margin: '20px 0px' }}
            >
                {isRegistered ? 'Зарегистрироваться' : 'Войти'}
            </Button>

            <div className="auth--registration">
                <span className="registration-toggle" onClick={handleRegister}>
                    {isRegistered ? 'Страница логина' : 'Страница регистрации'}
                </span>
            </div>
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
    );
};
