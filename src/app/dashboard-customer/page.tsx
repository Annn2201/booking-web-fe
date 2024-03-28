"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/service/interfaces/hotel";
import {Room} from "@/app/service/interfaces/room";
import {RoomBooking} from "@/app/service/interfaces/roomBooking";
import "./dashboard-style.css"
import {listAllHotel} from "@/app/service/hotelService";
import { Modal, Button } from 'antd';
import {CustomerResponse} from "@/app/service/interfaces/customerResponse";
import {deleteCustomerApi, listAllCustomer} from "@/app/service/customerService";
import Link from "next/link";

const DashboardCustomer = () => {
    const [customers, setCustomers] = useState<CustomerResponse[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const getAllCustomer = async () => {
        try {
            const listCustomersResponse = await listAllCustomer()
            const {data} = listCustomersResponse.data
            setCustomers(data)
            console.log(listCustomersResponse)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }

    const deleteCustomer = async (id: number) => {
        try {
            const deleteCustomerResponse = await deleteCustomerApi(id)
            console.log(deleteCustomerResponse)
            alert("Đã xóa thành công khách hàng")
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }
    useEffect(() => {
        getAllCustomer();
    }, []);


    const [selectedCustomer, setSelectedCustomner] = useState(null);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

    const handleDeleteButtonClick = (customer) => {
        setSelectedCustomner(customer);
        deleteCustomer(customer)
    };

    const handleDetailsModalClose = () => {
        setSelectedCustomner(null);
        setIsDetailsModalVisible(false);
    };
    // @ts-ignore
    return (
        <div className="grid-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1>Booking</h1>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link href="/dashboard">Quản lý khách sạn đối tác</Link></li>
                        <li><Link href="/dashboard-customer" className="active">Quản lý khách du lịch</Link></li>
                        <li><a href="#">Quản lý dịch vụ</a></li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <header className="main-header">
                    <div className="logo">
                        <h1>Dashboard</h1>
                    </div>
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
                            <h2>Quản lý khách du lịch</h2>
                        </div>
                    </div>
                    <div className="article-list">
                        {customers && customers.map((cus, index) => (
                            <li className="hotel-item" key={index}>

                                <div className="hotel-info">
                                    <h2>Tên: {cus.lastName}</h2>
                                    <p>Họ: {cus.firstName}</p>
                                    <p>Số điện thoai: {cus.number}</p>
                                    <p>Email: {cus.email}</p>
                                    <p>Khách sạn: {cus.hotel}</p>
                                </div>
                                <div className={'hotel-price'}>
                                    <button className="book-button" onClick={() => handleDeleteButtonClick(cus.id)}> Xóa người dùng
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardCustomer;
