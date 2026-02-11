import { api } from 'shared/api';
import { User } from './types';

export const userApi = {
  // Получаю список всех пользователей. .data нужен, так как axios возвращает объект ответа
  getAll: () => api.get<User[]>('/users').then((r) => r.data),
  
  // Создание: исключаю id и дату, так как их генерирует сервер
  create: (data: Omit<User, 'id' | 'createdAt'>) => 
    api.post<User>('/users', data).then((r) => r.data),
    
  // Обновление: Partial позволяет передать только те поля, которые изменились
  update: (id: string, data: Partial<User>) => 
    api.put<User>(`/users/${id}`, data).then((r) => r.data),
    
  // Удаление пользователя по ID
  delete: (id: string) => 
    api.delete(`/users/${id}`).then((r) => r.data),
};