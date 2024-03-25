"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/hotel/service/interfaces/hotel";
import {getHotelDetails, getRoomByHotelName, getRoomsByHotelName} from '@/app/hotel/service/hotelService';
import {Room} from "@/app/hotel/service/interfaces/room";
import {RoomBooking} from "@/app/hotel/service/interfaces/roomBooking";
import "./style.css"

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

    useEffect(() => {
        getRoomBooingDetail();
    }, []);

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
                        <li className="li" style={{color: '#0000FF'}}>Up ur hotel!</li>
                    </ul>
                    <div className="sign-in-button">Sign in</div>
                </div>
            </div>
            <div className={'booking-body-container'}>
                <div className={'booking-room-detail'}>
                    <h1 className={'booking-room-detail-title'}>Your booked rooms detail</h1>
                    <div className={'booking-room-detail-content'}>
                        <p>Name</p>
                        <p>Count</p>
                        <p>Total price</p>
                    </div>
                </div>
                <div className="booker-information">
                    <form id="booker-form">
                        <label htmlFor="name">Họ và tên:</label>
                        <input type="text" id="name" name="name" required/>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required/>

                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required/>

                        <label htmlFor="address">Địa chỉ:</label>
                        <input type="text" id="address" name="address"/>

                        <button type="submit">Đặt phòng</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Book;
