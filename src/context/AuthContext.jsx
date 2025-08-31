import { createContext, useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { getLocalStoragedata, setLocalStorageData } from "../helpers/Storage";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => getLocalStoragedata("token"));

  useEffect(() => {
    if (token) {
      setLocalStorageData("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Notification: {
              paddingMD: 15,
              colorIcon: "rgb(255, 255, 255)",
              colorTextHeading: "rgba(254, 254, 254, 0.88)",
              colorIconHover: "rgb(255, 255, 255)",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AuthContext.Provider>
  );
}
