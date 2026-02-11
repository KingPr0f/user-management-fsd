import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntdApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { NotFoundPageAsync } from 'pages/NotFoundPage';


import { ROUTES } from 'shared/consts'; 
import { Loader } from 'shared/ui';
import { RequireAuth } from './providers/RouteProvider/ui/RequireAuth';


import { LoginPageAsync } from 'pages/LoginPage';


const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={ruRU}>
      <AntdApp>
          <Suspense fallback={<Loader />}>
            <Routes>
  <Route path={ROUTES.LOGIN} element={<LoginPageAsync />} />
  
  

  {/* Вместо Navigate показываем страницу 404 по ТЗ */}
  <Route path="*" element={<NotFoundPageAsync />} />
</Routes>
          </Suspense>
      </AntdApp>
    </ConfigProvider>
  </QueryClientProvider>
);