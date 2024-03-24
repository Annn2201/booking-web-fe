import axios from "axios";
const BASE_URL = 'http://192.168.1.10:8080/api/v1/hotel'

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