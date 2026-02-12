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
import { ErrorBoundary } from './providers/ErrorBoundary/ui/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export const App = () => (
  <ErrorBoundary>
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
              <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />
              <Route path="*" element={<NotFoundPageAsync />} />
            </Routes>
          </Suspense>
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);