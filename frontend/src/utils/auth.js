export const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    window.dispatchEvent(new Event('authChange'));
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user?.role === 'admin';
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
