import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://eric-mern-blog.herokuapp.com/api/"
});