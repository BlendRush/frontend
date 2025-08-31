import { decrypt, encrypt } from "./EntryptionHelper";

export function setLocalStorageData(key, data) {
  const encryptData = encrypt(data);
  localStorage.setItem(key, encryptData);
}

export function getLocalStoragedata(key) {
  const data = localStorage.getItem(key);
  return data !== null ? decrypt(data) : null;
}
