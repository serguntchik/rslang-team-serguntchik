import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import {
    Button, Container, IconButton, InputAdornment, TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { createUser, IFormInput } from '../../core/api';
import './auth.css';

export const Authentication: React.FC = () => {
    const [isErrorLogin, setErrorLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isWait, setWait] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormInput>({ mode: 'onChange' });

    const onSubmit = (data: IFormInput) => {
        setErrorLogin(true);
        setWait(true);

        createUser(data)
            .then(() => {
                navigate('/login');
                setWait(false);
            })
            .catch(() => {
                setErrorLogin(false);
                setWait(false);
            });
    };

    return (
        <Container>
            <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
                <h2>Зарегистрироваться</h2>

                <TextField
                    id="outlined-basic-3"
                    label="Имя"
                    variant="outlined"
                    required
                    style={{ width: '100%' }}
                    {...register('name', {
                        required: true,
                        minLength: { value: 3, message: 'min length 3 symbol' },
                    })}
                />
                {errors?.name && <p className="auth-error">{errors.name?.message || 'incorrect Name'}</p>}

                <TextField
                    id="outlined-basic-1"
                    label="Email"
                    variant="outlined"
                    required
                    style={{ margin: '10px 0px', width: '100%' }}
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
                    style={{ margin: '10px 0px', width: '100%' }}
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
                {isErrorLogin || <p className="auth-error">такой email уже зарегистрирован</p>}

                <Button
                    variant="outlined"
                    type="submit"
                    disabled={!isValid || isWait}
                    color="primary"
                    style={{ margin: '20px 0px', width: '100%' }}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <h3 style={{ textAlign: 'center' }}>
                Уже есть аккаунт?
                {' '}
                <Link to="/login">Войти</Link>
            </h3>
        </Container>
    );
};
