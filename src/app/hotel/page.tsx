"use client"
import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {Hotel} from "@/app/service/interfaces/hotel";
import {Type} from "@/app/service/interfaces/type";
import {listAllType} from "@/app/service/hotelService";
import {listAllHotel} from "@/app/service/hotelService";
import "./style.css";
import topBanner from '@/public/top-banner.jpg';

const Hotel = () => {
    const router = useRouter();
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [types, setTypes] = useState<Type[]>([])
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSticky, setIsSticky] = useState(false);


    const getHomeDataWithOutFilter = async () => {
        setIsLoading(true)
        try {
            const listRoomsResponse = await listAllHotel()
            const {data} = listRoomsResponse.data
            setHotels(data)
            console.log(listRoomsResponse)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
        setIsLoading(false)
    }

    const getTypeData = async () => {
        try {
            const listTypeResponse = await listAllType()
            const {data} = listTypeResponse.data
            setTypes(data)
        } catch (err) {
            const errorMessage = err.response
            alert(errorMessage)
        }
    }
    const handleHotelClick = (hotelName: string) => {
        router.push(`/hotel/${hotelName}`);
        console.log(hotelName)
    };

    useEffect(() => {
        getHomeDataWithOutFilter()
    }, [])

    useEffect(() => {
        getTypeData()
    }, [])

    const HotelSearch = () => {

        useEffect(() => {
            const handleScroll = () => {
                const scrollTop = window.scrollY;
                setIsSticky(scrollTop > 702);
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <div className={`hotel-search ${isSticky ? 'sticky' : ''}`}>
                <div className="hotel-checkin-out-box">
                    <div className="hotel-checkin-box-title">Time</div>
                    <div className="hotel-checkin-out">
                        <label htmlFor="checkin">Check-in</label>
                        <input type="date" id="checkin"/>
                    </div>
                    <div className="hotel-checkin-out">
                        <label htmlFor="checkout">Check-out</label>
                        <input type="date" id="checkout"/>
                    </div>
                </div>
                <div className="hotel-type-box">
                    <div className="hotel-type-box-title">Hotel type</div>
                    <div className="hotel-type">
                        {types && types.map((type, index) => (
                            <div key={index}>
                                <input type="radio" id={`type-${index}`} name="type" value={type.name}/>
                                <label htmlFor={`type-${index}`}>{type.name}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="hotel-search-button">Search</button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        HotelSearch
    }, []);


    return (
        <>
                <header>
                    <div className="top-banner" style={{backgroundImage: `url(${topBanner.src})`}}>
                        <div className="navbar">
                            <div className="menu">
                                <ul>
                                    <li className="li">Home</li>
                                    <li className="li">Service</li>
                                    <li className="li">Pricing</li>
                                    <li className="li" style={{color: '#f8b600'}}>Up ur hotel!
                                    </li>
                                </ul>
                            </div>
                            <div className="sign-in-button">Sign in</div>
                        </div>
                        <div className={'text-banner'}>
                            <h6 className="text-white">Away from monotonous life</h6>
                            <h1 className="text-white">Magical Travel</h1>
                            <p className="text-white">
                                If you are looking at blank cassettes on the web, you may be very confused at the
                                difference
                                in price. You may see some for as low as $.17 each.
                            </p>
                        </div>
                        <div className="overlay"></div>
                    </div>
                </header>
                <div className="filter-bar">
                    <label htmlFor="numOfPeople">Số người:</label>
                    <input type="number" id="numOfPeople" name="numOfPeople" min="1"/>

                    <label htmlFor="city">Thành phố:</label>
                    <input type="text" id="city" name="city"/>

                    <label htmlFor="checkInDate">Ngày đến:</label>
                    <input type="date" id="checkInDate" name="checkInDate"/>

                    <label htmlFor="checkOutDate">Ngày đi:</label>
                    <input type="date" id="checkOutDate" name="checkOutDate"/>

                    <button className="filter-button">Lọc</button>
                </div>
                <div className="body-container">
                    <HotelSearch>
                    </HotelSearch>
                    <div className="hotel-list">
                        <h1 className="hotel-list-title">Hotels List</h1>
                        {isLoading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        <ul>
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
                                        <button className="book-button"
                                                onClick={() => handleHotelClick(hotel.name)}>Book
                                            Now
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </>
    );
};

export default Hotel;

