import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/api/users`

const register = async (userData) => {
    const resp = await axios.post(API_URL, userData);
    
    if(resp.data){
        localStorage.setItem("user", JSON.stringify(resp.data));
        localStorage.setItem("token", resp.data.token);
    }
    
    return resp.data
}

const login = async (userData) => {
    const resp = await axios.post(`${API_URL}/login`, userData);
    
    if(resp.data){
        localStorage.setItem("user", JSON.stringify(resp.data));
        localStorage.setItem("token", resp.data.token);
    }
    
    return resp.data
}

const logout = async () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export const authService = {
    register, login, logout
}

export default authService 

