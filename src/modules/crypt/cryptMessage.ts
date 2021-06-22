import { AES, enc } from 'crypto-js';

export const encryptMessage = (message: string, key: string): string => {
  return AES.encrypt(message, key).toString();
};

export const decryptMessage = (message: string, key: string): string => {
  return AES.decrypt(message, key).toString(enc.Utf8);
};
