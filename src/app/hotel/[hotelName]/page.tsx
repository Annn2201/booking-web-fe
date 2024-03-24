"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/hotel/service/interfaces/hotel";
import {getHotelDetails, getRoomByHotelName, getRoomsByHotelName} from '@/app/hotel/service/hotelService';
import "./detail-style.css"
import {Room} from "@/app/hotel/service/interfaces/room";

const HotelDetailPage = () => {
    const hotelName = usePathname();
    const [hotelDetails, setHotelDetails] = useState<Hotel>();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [countRooms, setCountRooms] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState<String[]>([]);
    const [price, setPrice] = useState<number>(0);
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

    const handleClick = (roomName: string, price: number) => {
        setPrice(prevPrice => prevPrice + price);
        setCountRooms(countRooms + 1);
        setSelectedRoom([...selectedRoom, roomName]);
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
                                <div className="hotel-detail-image" style={{backgroundImage: `url(${hotelDetails.image})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'auto',
                                    backgroundPosition: 'center'}}></div>
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
                                </tr>
                                </thead>
                                <tbody>
                                {rooms && rooms.map((room, index) => (
                                    <tr key={index} className="room-item" onClick={() => handleClick(room.name, room.price.valueOf())}>
                                        <td>{room.name}</td>
                                        <td>{room.description}</td>
                                        <td>{room.type}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="sub-container">
                    <h2>Selected Rooms</h2>
                    <p>Count: {countRooms}</p>
                    <p>Selected Rooms:</p>
                    <ul>
                        {selectedRoom.map((roomName, index) => (
                            <li key={index}>{roomName}</li>

                        ))}
                    </ul>
                    <p>Total Price: {price}</p>
                    <div className="hotel-add-button">Book Now</div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetailPage;
