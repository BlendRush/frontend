import { createContext, useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { getLocalStoragedata, setLocalStorageData } from "../helpers/Storage";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export function AuthContextProvider({ children }) {
   const urlParams = new URLSearchParams(window.location.search);
  const tokenFromURL = urlParams.get("token");
  const storedToken = getLocalStoragedata("token");
  const initialToken = tokenFromURL || storedToken;
  const [token, setToken] = useState(initialToken);

   useEffect(() => {
    if (tokenFromURL) {
      setLocalStorageData("token", tokenFromURL);
      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanURL);
    }
  }, [tokenFromURL]);

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
