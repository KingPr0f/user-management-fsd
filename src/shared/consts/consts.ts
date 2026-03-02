export const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  console.warn('Warning: REACT_APP_API_URL is not defined in .env file');
}

export const TOKEN_KEY = 'auth_token';

export const USER_QUERY_KEY = ['users'];

export const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
};
