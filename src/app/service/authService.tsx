import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1'

export const loginApi = (username: string, password: string) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/login"),
        data: {
            username,
            password
        }
    });
}

export const registerApi = (username: string, password: string) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/register"),
        data: {
            username,
            password
        }
    })
}

