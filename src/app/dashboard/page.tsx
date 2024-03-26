"use client"
import React, {SetStateAction, useEffect, useState} from 'react';
import {Hotel} from "@/app/service/interfaces/hotel";
import "./dashboard-style.css"
import {deleteHotel, listAllHotel} from "@/app/service/hotelService";
import {Modal, Button, Input} from 'antd';
import Link from "next/link";

const Dashboard = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);

    const getHomeDataWithOutFilter = async () => {
        try {
            const listRoomsResponse = await listAllHotel()
            const {data} = listRoomsResponse.data
            setHotels(data)
            console.log(listRoomsResponse)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }

    const deleteHotelById = async (id: string) => {
        try {
            const listRoomsResponse = await deleteHotel(id)
            alert("Đã xóa thành công khách sạn")
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }


    useEffect(() => {
        getHomeDataWithOutFilter();
    }, []);
    const [isLoading, setIsLoading] = useState(false);

    const HotelDetailsModal = ({ hotel, visible, onClose }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [roomData, setRoomData] = useState<Hotel>({});

        // Fetch hotel room details when modal opens (optional)
        useEffect(() => {
            if (visible) {
                setIsLoading(true);
                fetch(`http://192.168.1.10:8080/api/v1/hotel/${hotel.name}`)
                    .then(response => response.json())
                    .then(data => setRoomData(data))
                    .catch(error => console.error(error))
                    .finally(() => setIsLoading(false));
            }
        }, [visible, hotel.id]);

        // @ts-ignore
        return (
            <Modal
                title={hotel.name}
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Button key={'delete'} type={'primary'} style={{backgroundColor: 'red'}} onClick={() => deleteHotelById(hotel.id)}> Xóa khách sạn này </Button>,
                    <Button key="close" type="primary" style={{backgroundColor: 'blue'}}onClick={onClose}>
                        Close
                    </Button>,
                ]}
            >
                {isLoading ? (
                    <p>Loading hotel details...</p>
                ) : (
                    <div>
                        {/* Display retrieved hotel details here */}
                        <p>Address: {hotel.address}</p>
                        <p>Type: {hotel.type}</p>
                        <div style={{backgroundImage: `url(${hotel.image})`, width: '400px', height: '400px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
                        <p>Description: {hotel.description}</p>
                        {/* Conditionally display room details if fetched */}
                    </div>
                )}
            </Modal>
        );
    };

    const AddHotelModal = ({ visible, onClose, onAddHotel }) => {
        const [name, setName] = useState('');
        const [address, setAddress] = useState('');
        const [type, setType] = useState('');
        const [image, setImage] = useState('');
        const [minPrice, setMinPrice] = useState('');
        const [maxPrice, setMaxPrice] = useState('');

        const handleAddHotel = () => {
            // Validate input
            if (!name || !address || !type || !image || !minPrice || !maxPrice) {
                alert('Vui lòng nhập đầy đủ thông tin!');
                return;
            }

            fetch(`http://192.168.1.10:8080/api/v1/hotel/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    address,
                    type,
                    image,
                    minPrice,
                    maxPrice,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Add new hotel to the list
                        onAddHotel(data.hotel);
                        onClose();
                    } else {
                        console.error('Lỗi thêm khách sạn:', data.message);
                    }
                })
                .catch(error => console.error(error));
        };
        return (
            <Modal
                title="Thêm khách sạn mới"
                visible={visible}
                onCancel={onClose}
                footer={[
                    <Button key="close" type="default" onClick={onClose}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddHotel}>
                        Thêm
                    </Button>,
                ]}
            >
                <div className="add-hotel-form">
                    <Input
                        placeholder="Tên khách sạn"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <Input
                        placeholder="Loại khách sạn"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    />
                    <Input
                        placeholder="Hình ảnh"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                    <Input
                        placeholder="Giá thấp nhất"
                        value={minPrice}
                        type="number"
                        onChange={e => setMinPrice(e.target.value)}
                    />
                    <Input
                        placeholder="Giá cao nhất"
                        value={maxPrice}
                        type="number"
                        onChange={e => setMaxPrice(e.target.value)}
                    />
                </div>
            </Modal>
        );
    };

    const [isAddHotelModalVisible, setIsAddHotelModalVisible] = useState(false);


    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

    const handleBookButtonClick = (hotel) => {
        setSelectedHotel(hotel);
        setIsDetailsModalVisible(true);
    };

    const handleDetailsModalClose = () => {
        setSelectedHotel(null);
        setIsDetailsModalVisible(false);
    };
    // @ts-ignore
    return (
        <div className="grid-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1>Booking</h1>
                    <button className="notification-button">Notification</button>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link href="/dashboard" className="active">Quản lý khách sạn đối tác</Link></li>
                        <li><Link href="/dashboard-customer">Quản lý khách du lịch</Link></li>
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
                            <h2>Quản lý khách sạn đối tác</h2>
                        </div>
                        <button className="new-article-button" onClick={() => setIsAddHotelModalVisible(true)}>Thêm khách sạn</button>
                    </div>
                    {isAddHotelModalVisible && (
                        <AddHotelModal
                            visible={isAddHotelModalVisible}
                            onClose={() => setIsAddHotelModalVisible(false)}
                            onAddHotel={hotel => {
                                // Add new hotel to the hotels list
                                setHotels([...hotels, hotel]);
                                setIsAddHotelModalVisible(false);
                            }} /> )}
                    <div className="article-list">
                        {hotels && hotels.map((hotel, index) => (
                            <li className="hotel-item" key={index}>
                                <div className="hotel-image" style={{
                                    backgroundImage: `url(${hotel.image})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'right'
                                }}></div>

                                <div className="hotel-info">
                                    <h2>{hotel.name}</h2>
                                    <p>Address: {hotel.address}</p>
                                    <p>Type: {hotel.type}</p>
                                </div>
                                <div className={'hotel-price'}>
                                    <p className={'hotel-price-text'}>Price: {hotel.minPrice} - {hotel.maxPrice}</p>
                                    <button className="book-button" onClick={() => handleBookButtonClick(hotel)}> Chi tiết
                                    </button>
                                </div>
                            </li>
                        ))}
                    </div>
                    {selectedHotel && (
                        <HotelDetailsModal
                            hotel={selectedHotel}
                            visible={isDetailsModalVisible}
                            onClose={handleDetailsModalClose}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
