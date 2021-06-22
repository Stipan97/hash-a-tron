export const generateKey = (): string => {
  let key = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 16;
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * length));
  }
  return key;
};
