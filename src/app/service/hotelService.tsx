import axios from "axios";
const BASE_URL = 'http://localhost:8080/api/v1/hotel'

export const listAllHotel = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/get-all"),
    })
}

export const listAllType = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/get-type"),
    })
}

export const getRoomByHotelName = (hotelName: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat(`/rooms/${hotelName}`)
    });
}

export const getHotelDetails = (hotelName: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat(`/${hotelName}`),
    });
}

export const getRoomsByHotelName = (hotelName: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat(`/rooms/${hotelName}`),
    });
}

export const bookRoom = (firstName: string, lastName: string, email: string, number: string, ids: string) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat("/book"),
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
            ids: ids
        }
    });
}

export const deleteHotel = (id: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat(`/${id}`),
    });
}

export const createHotelApi = (data: any) => {
    return axios({
        method: "POST",
        url: BASE_URL,
        data: data
    })
}