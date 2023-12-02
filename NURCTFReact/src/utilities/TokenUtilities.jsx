import { LOGIN_URL, HOME_URL } from "../navigation/CONSTANTS";

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
}
export const setAuthToken = (token, refresh) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
}
export const validateLogin = (navigate) => {
    const token = getAuthToken();
    if (token==null) {
        navigate(LOGIN_URL);
        return false;
    }
    return true;
}

export const amILog = () => {
    const token = getAuthToken();
    if (token==null) {
        return false;
    }
    return true;
}

export const checkIfUserIsAdmin = () => {
    const is_superuser = localStorage.getItem("is_superuser");
    return is_superuser==="true";
}