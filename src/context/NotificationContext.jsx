import React, { createContext, useContext } from "react";
import { notification, ConfigProvider } from "antd";

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "bottomRight",
    });
  };

  return (
    <ConfigProvider>
      {contextHolder}
      <NotificationContext.Provider value={{ openNotification, contextHolder }}>
        {children}
      </NotificationContext.Provider>
    </ConfigProvider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
