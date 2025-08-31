import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_ENCRYPTION_KEY;
console.log(key);
if (!key) {
  throw new Error("Encryption key (REACT_APP_ENCRYPTION_KEY) is not set in environment variables");
}

const ENCRYPTION_KEY = key;

export function encrypt(text) {
  const jsonString = JSON.stringify(text);
  return CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
}

export function decrypt(data) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return data;
  }
}

export function encryptRequest(obj) {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(obj),
    ENCRYPTION_KEY
  ).toString();
  return { key: "web", data };
}

export function decryptResponse(response) {
  if (response.data !== null) {
    try {
      const bytes = CryptoJS.AES.decrypt(response.data, ENCRYPTION_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      const parsedData = JSON.parse(decryptedText);
      return {
        data: parsedData,
        message: response.message,
      };
    } catch {
      return response;
    }
  }
  return response;
}
