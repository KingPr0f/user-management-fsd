import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Убрал BrowserRouter, он обычно в index.tsx, но если у тебя тут - ок
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntdApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';



// ИМПОРТЫ (baseUrl="src", поэтому без @/)
import { ROUTES } from 'shared/consts'; 
import { Loader } from 'shared/ui';
import { RequireAuth } from './providers/RouteProvider/ui/RequireAuth';


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
  
  <Route 
    path={ROUTES.USERS} 
    element={
      <RequireAuth>
        <UsersPageAsync />
      </RequireAuth>
    } 
  />

  {/* Вместо Navigate показываем страницу 404 по ТЗ */}
  <Route path="*" element={<NotFoundPageAsync />} />
</Routes>
          </Suspense>
      </AntdApp>
    </ConfigProvider>
  </QueryClientProvider>
);