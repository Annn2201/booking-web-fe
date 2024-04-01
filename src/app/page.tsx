"use client"

import './home-style.css'
import React, {useState} from "react";
import  { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faStore, faCarSide, faDumbbell} from '@fortawesome/free-solid-svg-icons'
import {SearchRequest} from "@/app/service/interfaces/searchRequest";



const landingPage = () => {
    const [searchRequest, setSearchRequest] = useState<SearchRequest>();
    const handleSearch = () => {

}
    return (
        <>
            <div className={'body-container'}>
                <header>
                    <div className="top-banner">
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
                                If you are looking at blank cassettes on the web, you may be very confused at the difference
                                in price. You may see some for as low as $.17 each.
                            </p>
                        </div>
                        <div className="overlay"></div>
                    </div>
                </header>

                <main>

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
                    <section className="featured-positions">
                        <h2>Bạn muốn tới thành phố nào ?</h2>
                        <div className={'position'}>
                            <div className="position-card">
                                <img src="https://example.com/hotel1.jpg" alt="Hotel 1"/>
                                <h3>Hà Nội</h3>
                                <a href="#">Xem các khách sạn ở đây</a>
                            </div>
                            <div className="position-card">
                                <img src="https://example.com/hotel2.jpg" alt="Hotel 2"/>
                                <h3>Hồ Chí Minh</h3>
                                <a href="#">Xem các khách sạn ở đây</a>
                            </div>
                            <div className="position-card">
                                <img src="https://example.com/hotel3.jpg" alt="Hotel 3"/>
                                <h3>Nha Trang</h3>
                                <a href="#">Xem các khách sạn ở đây</a>
                            </div>
                        </div>
                    </section>
                    <section className="feature-service">
                        <h2>Bạn có muốn sử dụng các dịch vụ khác không ?</h2>
                        <ul className={'service-list'}>
                            <li className={'service-card'}>
                                <FontAwesomeIcon className={'icon'} icon={faCarSide}></FontAwesomeIcon>
                                <p className={'service-text'}>Đặt xe dễ dàng</p>
                            </li>
                            <li className={'service-card'}>
                                <FontAwesomeIcon className={'icon'} icon={faStore}></FontAwesomeIcon>
                                <p className={'service-text'}>Đặt chỗ tại nhà hàng</p>
                            </li>
                        </ul>
                    </section>
                </main>
                <footer>
                    <p>Bản quyền &copy; 2023</p>
                </footer>
            </div>
        </>
    )
}
export default landingPage;