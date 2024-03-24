"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/hotel/service/interfaces/hotel";
import {getHotelDetails, getRoomByHotelName, getRoomsByHotelName} from '@/app/hotel/service/hotelService';
import {Room} from "@/app/hotel/service/interfaces/room";
import {number} from "prop-types";
import {RoomBooking} from "@/app/hotel/service/interfaces/roomBooking";

const Book = () => {
    const hotelName = usePathname();
    const [hotelDetails, setHotelDetails] = useState<Hotel>();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [countRooms, setCountRooms] = useState<number>(1);
    const [price, setPrice] = useState<number>(0);
    const roomBooking = useSearchParams();
    const roomBookingList = roomBooking.get('roomBooking')
    const [roomBookingDetail, setRoomBookingDetail] = useState<RoomBooking[]>([]);
    const getRoomBooingDetail = () => {
        setRoomBookingDetail(roomBookingList ? JSON.parse(roomBookingList) : [])
        console.log(roomBookingDetail)
    }

    const handleClick = (roomName: string, price: number, countRooms: number) => {
        setPrice(prevPrice => prevPrice + price * countRooms);
        setRoomBooking(roomBooking => [...roomBooking, {name: roomName, numberOfRoom: countRooms}])
    };

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCountRooms = parseInt(event.target.value);
        setCountRooms(newCountRooms);
    };

    useEffect(() => {
        getRoomBooingDetail();
    }, []);

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
                        <li className="li">Courses</li>
                        <li className="li">Pricing</li>
                        <li className="li">Previews</li>
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
                                            </select >
                                            <button className='select-button'
                                                    onClick={() => handleClick(room.name, room.price.valueOf(), countRooms)}>Select
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
                    <div className="hotel-add-button">Book Now</div>
                </div>
            </div>
        </div>
    );
};

export default Book;
