import React, { createContext, useContext, useMemo, useState } from 'react';

const NotificationContext = createContext(null);

function createNotificationItem(title, message, type = 'info') {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
  };
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    createNotificationItem(
      'Welcome to Apps Marketplace',
      'Explore premium digital products and business applications built for modern businesses.',
      'success'
    ),
    createNotificationItem(
      'Featured App Updated',
      'A new premium business app is now highlighted in the marketplace.',
      'info'
    ),
    createNotificationItem(
      'Special Offer',
      'Selected apps now include updated pricing and limited-time offers.',
      'info'
    ),
    createNotificationItem(
      'Marketplace News',
      'New business solutions are now available in the catalog.',
      'info'
    ),
  ]);

  const addNotification = (title, message, type = 'info') => {
    const item = createNotificationItem(title, message, type);
    setNotifications((prev) => [item, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotifications must be used inside NotificationProvider');
  }

  return context;
}