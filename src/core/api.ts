import axios from 'axios';
import { ICardData, ICreateUserWord, IGetWords } from '../utils/alias';

export interface IFormInput {
    email: string;
    password: string;
    name?: number;
}

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const getWords = async (data: IGetWords) => {
    const response = await axios.get(`${baseUrl}/words?group=${data.group}&page=${data.page}`);
    return response.data;
};

export const createUserWord = async (word: ICardData) => {
    const userId = localStorage.getItem('id');
    await axios.post(
        `${baseUrl}/users/${userId}/words/${word.id}`,
        { difficulty: 'hard' },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    );
};

export const getNewToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const id = localStorage.getItem('id');
    const response = await axios.get(`${baseUrl}/users/${id}/tokens`, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('token', response.data.token);
};

export const createUser = async (data: IFormInput) => {
    const response = await axios.post(`${baseUrl}/users`, data);
    return response.data;
};

export const signIn = async (user: IFormInput) => {
    const response = await axios.post(`${baseUrl}/signin`, user);
    return response.data;
};

axios.interceptors.response.use(
    (response) => response,
    (rej) => {
        if (rej.response.status === 401) {
            getNewToken();
        }
        return Promise.reject(rej);
    },
);
