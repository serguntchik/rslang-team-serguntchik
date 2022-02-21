import axios from 'axios';
import { ICardData, IGetWords } from '../utils/alias';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export interface IFormInput {
    email: string;
    password: string;
    name?: number;
}

export interface IQueryParams {
    key?: string;
    value?: number | string;
}

export const baseUrl = process.env.REACT_APP_BASE_URL;

// eslint-disable-next-line max-len
const generateQueryString = (queryParams: IQueryParams[] = []) => (queryParams.length ? `?${queryParams.map((item) => `${item.key}=${item.value}`).join('&')}` : '');

// Words
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

export const deletUserWord = async (word: ICardData) => {
    const userId = localStorage.getItem('id');
    await axios.delete(
        /* eslint no-underscore-dangle: [1, { "allow": ["__place"] }] */
        `${baseUrl}/users/${userId}/words/${word._id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    );
};

// Users
export const getNewToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const id = localStorage.getItem('id');
    const response = await axios.get(`${BASE_URL}/users/${id}/tokens`, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('token', response.data.token);
    return response;
};

export const createUser = async (data: IFormInput) => {
    const response = await axios.post(`${BASE_URL}/users`, data);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axios.get(`${baseUrl}/users/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    return response.data;
};

// Sign In
export const signIn = async (user: IFormInput) => {
    const response = await axios.post(`${BASE_URL}/signin`, user);
    return response.data;
};

axios.interceptors.response.use(
    (config) => config,
    (err) => {
        if (err.response.status === 401) {
            getNewToken().then((res) => {
                // eslint-disable-next-line no-param-reassign
                err.config.headers = {
                    Authorization: `Bearer ${res.data.refreshToken}`,
                };
                return axios.request(err.config);
            });
        }
    },
);

// User/AggregatedWords

export const getAllUserAggregatedWords = async (data: IGetWords) => {
    const filter = `;
        }{"$and":[{"userWord.difficulty":"hard", "group":${data.group}, "page":${data.page}}]}`;
    const response = await axios.get(
        `${baseUrl}/users/${data.userId}/aggregatedWords/${generateQueryString([
            { key: 'wordsPerPage', value: 20 },
            { key: 'filter', value: filter },
        ])}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        },
    );
    return response.data[0].paginatedResults;
};
