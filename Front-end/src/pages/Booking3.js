import React, { useEffect, useState } from 'react';
import API, { endpoints } from '../configs/Apis';
import PreLoader from '../components/PreLoader';
import PayContext from '../context/PayContext';
import WOW from 'wowjs';
import { useLocation,useParams } from 'react-router-dom'
import pageTitle5 from '../static/image/background/page-title-5.jpg'
import Header from '../components/Header';
import NumberFormat from 'react-number-format';
import { memo } from "react";

function Booking3(props) {

    const [resultCode, setResultCode] = useState(0)

    let notification = <></>
    if (resultCode === 0) {
        notification = <>
            <div className="confirm-box">
                <h3>Payment success</h3>
                <div className="inner-box centred">
                    <div className="icon-box">
                        <i className="far fa-check-circle" />
                    </div>
                    <h3>Thanks for booking the trip</h3>
                    <p>
                    You will receive a confirmation email shortly
                        <br />
                    </p>
                </div>
            </div>
        </>
    } else if (resultCode === 1) {
        notification = <>
            <div className="confirm-box">
                <h3>Thanh toán thất bại</h3>
                <div className="inner-box centred">
                    <div className="icon-box">
                        <i style={{ color: 'red' }} className="far fa-times-circle" />
                    </div>
                    <h3>Vui lòng thử lại</h3>
                    <p>
                        Thắc mắc liên hệ tại
                        <br />
                    </p>
                </div>
            </div>
        </>
    } else if (resultCode === -1) {
        notification = <>
            <div className="confirm-box">
                <h3>Yêu cầu đặt tour đã được ghi nhận lại</h3>
                <div className="inner-box centred">
                    <div className="icon-box">
                        <i style={{ color: 'blue' }} className="far fa-check-circle" />
                    </div>
                    <h3>Cảm ơn đã sử dụng dịch vụ của chúng tôi</h3>
                    <p>
                        <br />
                    </p>
                </div>
            </div>
        </>
    }

   

    return (
        <>
        <Header/>
            <section className="page-title centred" style={{ backgroundImage: `url(${pageTitle5})` }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms">
                        <h1>Confirm</h1>
                        <p>Explore your next great journey</p>
                    </div>
                </div>
            </section>

            <section className="booking-section booking-process-3">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                            <div className="booking-process-content mr-20">
                                <ul className="process-label clearfix">
                                    <li>
                                        <span>1.</span>Customer information
                                    </li>
                                    <li>
                                        <span>2.</span>Payment
                                    </li>
                                    <li className="current">
                                        <span>3.</span>Confirm
                                    </li>
                                </ul>
                                {notification}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default  memo(Booking3);