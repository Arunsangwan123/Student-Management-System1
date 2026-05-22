export const getToken = () => localStorage.getItem('sms_token');
export const setToken = (token) => localStorage.setItem('sms_token', token);
export const removeToken = () => localStorage.removeItem('sms_token');
export const isAuthenticated = () => Boolean(getToken());
