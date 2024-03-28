"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';
import {bookRoom, getHotelDetails, getRoomByHotelName, getRoomsByHotelName} from '@/app/service/hotelService';
import {RoomBooking} from "@/app/service/interfaces/roomBooking";
import "./style.css"

const Book = () => {
    const roomBooking = useSearchParams();
    const roomBookingList = roomBooking.get('roomBooking')
    const totalPrice = roomBooking.get('totalPrice')

    const [roomBookingDetail, setRoomBookingDetail] = useState<RoomBooking[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const getRoomBooingDetail = () => {
        setRoomBookingDetail(roomBookingList ? JSON.parse(roomBookingList) : [])
    }


    const handleBooking = async (firstName: string, lastName: string, email: string, number: string) => {
        let ids = roomBookingDetail.map((item) => item.id).join(',');
        console.log(ids)
        try {
            const { data } = await bookRoom(firstName, lastName, email, number, ids);
            alert("Đã đặt phòng thành công");
        } catch (err) {
            alert("Phòng đã có người đặt vui lòng chọn phòng khác");
        }
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
                        <li className="li">Service</li>
                        <li className="li">Pricing</li>
                        <li className="li" style={{color: '#f8b600'}}>Up ur hotel!</li>
                    </ul>
                    <div className="sign-in-button">Sign in</div>
                </div>
            </div>
            <div className={'booking-body-container'}>
                <div className={'booking-room-detail'}>
                    <h1 className={'booking-room-detail-title'}>Your booked rooms detail</h1>
                    <div className={'booking-room-detail-content'}>
                        {roomBookingDetail.map((booking, index) => (
                            <div key={index} className="booking-room-info">
                                <p> Name room:  {booking.name}</p>
                                <p> Count: {booking.numberOfRoom}</p>
                            </div>
                        )) }
                        <p style={{fontWeight: 'bold', color:'#f8b600', fontSize: '30px'}}>Total price: {totalPrice}</p>
                    </div>
                </div>
                <div className="booker-information">
                    <form id="booker-form" onSubmit={() => handleBooking(firstName, lastName, email, number)}>
                        <label htmlFor="firstname">First Name:</label>
                        <input type="text" id="firstname" name="firstName" onChange={(e) => setFirstName(e.target.value)} required/>

                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" id="lastname" name="lastName" onChange={(e) => setLastName(e.target.value)}required/>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}required/>

                        <label htmlFor="phone">Number:</label>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" onChange={(e) => setNumber(e.target.value)}required/>

                        <button type="submit">Đặt phòng</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Book;
