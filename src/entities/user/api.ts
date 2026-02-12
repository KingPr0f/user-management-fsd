import { api } from 'shared/api';
import { User } from './types';

export const userApi = {
  getAll: () => api.get<User[]>('/users').then((response) => response.data),

  create: (data: Omit<User, 'id' | 'createdAt'>) =>
    api.post<User>('/users', data).then((response) => response.data),

  update: (id: string, data: Partial<User>) =>
    api.put<User>(`/users/${id}`, data).then((response) => response.data),

  delete: (id: string) => api.delete(`/users/${id}`).then((response) => response.data),
};