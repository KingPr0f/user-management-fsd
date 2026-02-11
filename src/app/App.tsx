import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntdApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { NotFoundPageAsync } from 'pages/NotFoundPage';
import { LoginPageAsync } from 'pages/LoginPage';
import { UsersPageAsync } from 'pages/UsersPage';

import { ROUTES } from 'shared/consts'; 
import { Loader } from 'shared/ui';
import { RequireAuth } from './providers/RouteProvider/ui/RequireAuth';

// Настраиваю клиент для запросов: отключаю авто-фетч при фокусе окна, чтобы не спамить запросами
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export const App = () => (
  // Оборачиваю приложение в QueryProvider для работы с сервером
  <QueryClientProvider client={queryClient}>
    {/* Русифицирую компоненты Ant Design */}
    <ConfigProvider locale={ruRU}>
      {/* AntdApp нужен для работы контекстных уведомлений (message, notification) в Antd v5 */}
      <AntdApp>
          {/* Suspense показывает лоадер, пока грузится код страницы (code splitting) */}
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Публичный маршрут: Логин */}
              <Route path={ROUTES.LOGIN} element={<LoginPageAsync />} />
              
              {/* Защищенный маршрут: Список пользователей */}
              <Route 
                path={ROUTES.USERS} 
                element={
                  // Обернул в RequireAuth, чтобы пускало только с токеном
                  <RequireAuth>
                    <UsersPageAsync />
                  </RequireAuth>
                } 
              />

              {/* Если зашли в корень, сразу перекидываю на пользователей */}
              <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />

              {/* Обработка несуществующих страниц (404) */}
              <Route path="*" element={<NotFoundPageAsync />} />
            </Routes>
          </Suspense>
      </AntdApp>
    </ConfigProvider>
  </QueryClientProvider>
);