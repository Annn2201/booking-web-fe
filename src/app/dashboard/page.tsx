"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/hotel/service/interfaces/hotel";
import {getHotelDetails, getRoomByHotelName, getRoomsByHotelName} from '@/app/hotel/service/hotelService';
import {Room} from "@/app/hotel/service/interfaces/room";
import {RoomBooking} from "@/app/hotel/service/interfaces/roomBooking";
import "./dashboard-style.css"

const Dashboard = () => {
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
        <div className="grid-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1>Acme Inc</h1>
                    <button className="notification-button">Notification</button>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#">Articles <span className="badge">12</span></a></li>
                        <li><a href="#">Pages</a></li>
                        <li><a href="#">Media</a></li>
                        <li><a href="#">Settings</a></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <div className="upgrade-card">
                        <h2>Upgrade to Pro</h2>
                        <p>Unlock all features and get unlimited access to our support team</p>
                        <button className="upgrade-button">Upgrade</button>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <header className="main-header">
                    <div className="logo">
                        <h1>Dashboard</h1>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#" className="active">Articles</a></li>
                            <li><a href="#">Pages</a></li>
                            <li><a href="#">Media</a></li>
                            <li><a href="#">Settings</a></li>
                        </ul>
                    </nav>
                    <div className="user-dropdown">
                        <button className="avatar-button">
                            {/*<img src="avatar.jpg" alt="Avatar">*/}
                            <span className="sr-only">Toggle user menu</span>
                        </button>
                        <div className="user-dropdown-content">
                            <p>My Account</p>

                                <p>Settings</p>
                                <p>Support</p>
                                <p>Logout</p>
                        </div>
                    </div>
                </header>
                <main className="main-body">
                    <div className="content-header">
                        <div className="title">
                            <h2>Articles</h2>
                        </div>
                        <button className="new-article-button">New article</button>
                    </div>
                    <div className="article-list">
                        {/*// <!-- Danh sách bài viết sẽ được hiển thị ở đây -->*/}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
