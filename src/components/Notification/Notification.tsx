// src/components/Notification/Notification.tsx
import React from 'react';
import styled from 'styled-components';
import { useNotification } from '@/contexts/NotificationContext';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const NotificationMessage = styled.div<{ type: 'success' | 'error' | 'info' }>`
  background-color: ${({ type }) =>
    type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
`;

const Notification: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <NotificationContainer>
      {notifications.map((notification) => (
        <NotificationMessage key={notification.id} type={notification.type}>
          {notification.message}
          <CloseButton onClick={() => removeNotification(notification.id)}>×</CloseButton>
        </NotificationMessage>
      ))}
    </NotificationContainer>
  );
};

export default Notification;
