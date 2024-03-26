import axios from "axios";
const BASE_URL = 'http://192.168.1.10:8080/api/v1'

export const listAllCustomer = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/customer"),
    })
}

export const deleteCustomerApi = (id: number) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat(`/customer/${id}`),
    })
}