import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {

  state = {
    hasError: false,
  };


  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Result
            status="500"
            title="Что-то пошло не так"
            subTitle="Произошла непредвиденная ошибка. Попробуйте обновить страницу."
            extra={
              <Button type="primary" onClick={() => window.location.reload()}>
                Обновить страницу
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}