import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'shared/ui';
import { UserModal } from 'features/users/ui/UserModal/UserModal'; 

export const CreateUserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        type="primary" 
        size="large" 
        icon={<PlusOutlined />} 
        onClick={() => setIsModalOpen(true)}
      >
        Создать
      </Button>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={null} 
      />
    </>
  );
};