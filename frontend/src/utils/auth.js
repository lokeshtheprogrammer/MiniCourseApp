export const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
