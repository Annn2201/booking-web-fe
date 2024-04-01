"use client"
import {useState} from "react";

const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());

const landingPage = () => {
    return (
        <>
            <div className={'body'}>
                <header>
                    <nav className="navbar">
                        <a href="#">Trang chủ</a>
                        <a href="#">Giới thiệu</a>
                        <a href="#">Liên hệ</a>
                    </nav>
                    <h1>Đặt phòng khách sạn</h1>
                </header>
                <main>

                    <section className="featured-hotels">
                        <h2>Khách sạn nổi bật</h2>
                        <div className="hotel-card">
                            <img src="https://example.com/hotel1.jpg" alt="Hotel 1"/>
                            <h3>Khách sạn 1</h3>
                            <p>Mô tả khách sạn 1</p>
                            <a href="#">Đặt phòng</a>
                        </div>
                        <div className="hotel-card">
                            <img src="https://example.com/hotel2.jpg" alt="Hotel 2"/>
                            <h3>Khách sạn 2</h3>
                            <p>Mô tả khách sạn 2</p>
                            <a href="#">Đặt phòng</a>
                        </div>
                        <div className="hotel-card">
                            <img src="https://example.com/hotel3.jpg" alt="Hotel 3"/>
                            <h3>Khách sạn 3</h3>
                            <p>Mô tả khách sạn 3</p>
                            <a href="#">Đặt phòng</a>
                        </div>
                    </section>
                    <section className="why-choose-us">
                        <h2>Tại sao chọn chúng tôi?</h2>
                        <ul>
                            <li>Giá cả cạnh tranh</li>
                            <li>Dịch vụ khách hàng tốt</li>
                            <li>Nhiều lựa chọn khách sạn</li>
                            <li>Đặt phòng dễ dàng</li>
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