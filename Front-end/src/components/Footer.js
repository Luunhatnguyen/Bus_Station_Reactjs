import React from 'react'
import {FaFacebookSquare,FaTwitterSquare,FaPinterestSquare,FaInstagramSquare,FaGooglePlay} from "react-icons/fa"

export default function Footer2(){
    return(
        <>
        <div class="footer-39201">
            <div class="container">
            <div class="row">
                <div class="col-md mb-4 mb-md-0">
                    <h3>Service</h3>
                    <ul class="list-unstyled nav-links">
                    <li><a href="#" className="bx bx-chevron-right"/>Domestic Trips</li>
                    <li><a href="#">Foreign trip</a></li>
                    <li><a href="#">Car rental</a></li>
                    <li><a href="#">Recruit</a></li>
                    </ul>
                </div>
                <div class="col-md mb-4 mb-md-0">
                    <h3>Information</h3>
                    <ul class="list-unstyled nav-links">
                    <li><a href="#">News</a></li>
                    <li><a href="#">Sitemap</a></li>
                    <li><a href="#">Point route</a></li>
                    <li><a href="#">Private Policy</a></li>
                    </ul>
                </div>
                <div class="col-md mb-4 mb-md-0">
                    <h3>Contact</h3>
                    <ul class="list-unstyled nav-links">
                    <li><a href="#">240 Hà Huy Giáp, Quận 12, TPHCM</a></li>
                    <li><a href="#">Phone: 0354444899</a></li>
                    <li><a href="#">Phone: 0949860429</a></li>
                    <li><a href="#">Email :info@busVietNam</a></li>
                    </ul>
                </div>
                <div class="col-md-4 mb-4 mb-md-0">
                    <h3>Subscribe</h3>
                    <p class="mb-4">Thanks you</p>
                    <form action="#" class="subscribe">
                        <input type="text" class="form-control" placeholder="Email của Quý Khách"/>
                        <input type="submit" class="btn btn-submit" value="Send"/>
                    </form>
                </div>
            </div>
            {/* <MessengerCustomerChat
                pageId="110579418287262"
                appId="5029245373832378"
                /> */}

            <div class="row align-items-center">
                <div class="col-12">
                    <div class="border-top my-5"></div>
                </div>
                <div class="col-sm-9">
                    <p><small>Bus Station &copy; 2022 All Rights Reserved.</small></p>
                </div>
                <div class="col-sm-3 text-md-right">
                    <ul class="social list-unstyled">
                    <li><a href="#"  ><span><FaFacebookSquare/></span></a></li>
                    <li><a href="#"><span><FaTwitterSquare/></span></a></li>
                    <li><a href="#"><span><FaPinterestSquare/></span></a></li>
                    <li><a href="#"><span><FaInstagramSquare/></span></a></li>
                    <li><a href="#"><span><FaGooglePlay/></span></a></li>
                    </ul>
                </div>
            </div>
            </div>
    </div>
    </>
    )
}