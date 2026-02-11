import { api } from 'shared/api';
import { User } from './types';

export const userApi = {
  getAll: () => api.get<User[]>('/users').then((r) => r.data),
  
  create: (data: Omit<User, 'id' | 'createdAt'>) => 
    api.post<User>('/users', data).then((r) => r.data),
    
  update: (id: string, data: Partial<User>) => 
    api.put<User>(`/users/${id}`, data).then((r) => r.data),
    
  delete: (id: string) => 
    api.delete(`/users/${id}`).then((r) => r.data),
};