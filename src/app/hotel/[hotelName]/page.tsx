"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/service/interfaces/hotel";
import {getHotelDetails, getRoomByHotelName, getRoomsByHotelName} from '@/app/service/hotelService';
import "./detail-style.css"
import {Room} from "@/app/service/interfaces/room";
import {number} from "prop-types";
import {RoomBooking} from "@/app/service/interfaces/roomBooking";

const HotelDetailPage = () => {
    const router = useRouter();
    const hotelName = usePathname();
    const [hotelDetails, setHotelDetails] = useState<Hotel>();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [countRooms, setCountRooms] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const [roomBooking, setRoomBooking] = useState<RoomBooking[]>([]);
    const getHotelDetailByHotelName = async () => {
        try {
            const response = await getHotelDetails(hotelName?.split('/')[2]);
            if (response) {
                const data = response.data?.data;

                setHotelDetails(data);
            } else {
                throw new Error('Failed to fetch hotel details');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBooking = (roomBooking: RoomBooking[]) => {
        router.push(`/book/?roomBooking=${JSON.stringify(roomBooking)}&totalPrice=${price}`)
        console.log(roomBooking)
    }

    const getRooms = async () => {
        try {
            const response = await getRoomsByHotelName(hotelName?.split('/')[2]);
            if (response) {
                const data = response.data?.data;
                console.log(data)
                setRooms(data)
            } else {
                throw new Error('Failed to fetch rooms');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = (roomId: string, roomName: string, price: number, countRooms: number) => {
        setPrice(prevPrice => prevPrice + price * countRooms);
        setRoomBooking(roomBooking => [...roomBooking, {id: roomId, name: roomName, numberOfRoom: countRooms}])
    };

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCountRooms = parseInt(event.target.value);
        setCountRooms(newCountRooms);
    };

    useEffect(() => {
        getHotelDetailByHotelName();
    }, [hotelName]);

    useEffect(() => {
        getRooms();
    }, [hotelName]);

    if (!hotelDetails) {
        return <div>Loading...</div>;
    }

    // @ts-ignore
    return (
        <div className="container">
            <div className="navbar">
                <div className="logo">Lesson</div>
                <div className="menu">
                    <ul>
                        <li className="li">Home</li>
                        <li className="li">Service</li>
                        <li className="li">Pricing</li>
                        <li className="li" style={{color: '#0000FF'}}>Up ur hotel!</li>
                    </ul>
                    <div className="sign-in-button">Sign in</div>
                </div>
            </div>
            <div className="main-container">
                <div className="center-container">
                    <div className="hotel-details-container">
                        <div className="hotel-details-container-header">
                            <h1 className="hotel-details-container-name">{hotelDetails.name}</h1>
                            <div className="hotel-details-container-address">
                                <span>{hotelDetails.address}</span>
                            </div>
                        </div>
                        <div className="image-container">
                            <div className="hotel-detail-image" style={{
                                backgroundImage: `url(${hotelDetails.image})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'auto',
                                backgroundPosition: 'center'
                            }}></div>
                        </div>
                        <div className="hotel-details-container-description">
                            <p>
                                {hotelDetails.description}
                            </p>
                        </div>
                    </div>
                    <div className="rooms-container">
                        <div className="rooms-header">
                            <h2>Rooms</h2>
                        </div>
                        <div className="rooms-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Type</th>
                                    <th>Capacity</th>
                                    <th>Price</th>
                                    <th>Number of rooms</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rooms && rooms.map((room, index) => (
                                    <tr key={index} className="room-item">
                                        <td>{room.name}</td>
                                        <td>{room.description}</td>
                                        <td>{room.type}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.price}</td>
                                        <td className={'select-td'}>
                                            <select onChange={(e) => handleChangeSelect(e)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <button className='select-button'
                                                    onClick={() => handleClick(room.id, room.name, room.price.valueOf(), countRooms)}>Select
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="sub-container">
                    <h2>Selected Rooms</h2>
                    <p>Selected Rooms:</p>
                    <ul>
                        {roomBooking && roomBooking.map((roomBooking, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className={'select-room-content'}>
                                <li key={index}>{roomBooking.name}</li>
                                <p key={index}> Number of room: {roomBooking.numberOfRoom}</p>
                            </div>

                        ))}
                    </ul>
                    <p>Total Price: {price}</p>
                    <div className="hotel-add-button" onClick={() => handleBooking(roomBooking)}>Book Now</div>
                </div>
            </div>
        </div>
    );
};
export default HotelDetailPage;
