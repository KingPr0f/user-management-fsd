import React, { useState } from 'react';
import { Button } from 'shared/ui';
import { UserModal } from 'features/users/ui/UserModal';

export const CreateUserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Создать пользователя
      </Button>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={null} />
    </>
  );
};
