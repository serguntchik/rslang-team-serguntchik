import axios from 'axios';
import { ApiPath, IGetWords } from '../utils/alias';

export interface IFormInput {
    email: string;
    password: string;
    name?: number;
}

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const getWords = async (data: IGetWords) => {
    const response = await axios.get(`${baseUrl}${ApiPath.word}?group=${data.group}&page=${data.page}`);
    data.setCards(response.data);
};

export const getNewToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const id = localStorage.getItem('id');
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${id}/tokens`, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('token', response.data.token);
};

export const createUser = async (data: IFormInput) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}users`, data);
    return response.data;
};

export const signIn = async (user: IFormInput) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}signin`, user);
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
