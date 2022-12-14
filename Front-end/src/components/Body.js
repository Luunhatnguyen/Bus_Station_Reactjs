import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { PayProvider } from '../context/PayContext'
import ScrollToTop from './ScrollToTop';
import Footer2 from './Footer';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import TripList from '../pages/TripList';
import TourDetail from '../pages/TripDetail';
import Articals from '../pages/Garages';
import ArticalDetails from '../pages/GarageDetails';
import Booking1 from '../pages/Booking1';
import Booking2 from '../pages/Booking2';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Page404 from '../pages/Page404'
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';
import LoginAdmin from '../pages/LoginAdmin';
import Admin from '../pages/Admin';
import AddArtical from '../pages/AddGarage';
import UpdateArtical from '../pages/UpdateGarage';
import TourDelete from '../pages/TripDelete';
import Booking3 from '../pages/Booking3';
import Routed from '../pages/Route';
import Bills from './Bills';
import Apptest from './Apptest';
import MomoReturn from '../pages/MoMoReturn';

export default function Body(props) {
    return (
        <PayProvider>
        <div className="boxed_wrapper">
            <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/route-list/" element={<TripList/>} />
                        <Route exact path="/routed/" element= {<Routed />} />
                        <Route exact path="/route-detail/:routerId/" element={<TourDetail/>} />
                        <Route exact path="/route-detail/:routerId/booking-1" element={<Booking1/>} />
                        <Route exact path="/route-detail/:routerId/booking-2" element={<Booking2/>} />
                        <Route exact path="/route-detail/booking-3" element={<Booking3/>} />
                        <Route path="*" element={<Page404/>} />
                        <Route exact path="/contact" element={<Contact/>} />
                        <Route exact path="/about-us" element={<About/>} />
                        <Route exact path="/login" element={<Login/>} />
                        <Route exact path="/register" element={<Register/>} />
                        <Route exact path="/change-password" element={<ChangePassword/>} />
                        <Route exact path="/forgot-password" element={<ForgotPassword/>} />
                        <Route exact path="/reset-password/:token" element={<ResetPassword/>} />
                        <Route exact path="/garage" element={<Articals/>} />
                        <Route exact path="/bus-details/:busId" element={<ArticalDetails/>} />
                        <Route  path ='/loginAdmin' element ={<LoginAdmin />} />
                        <Route  path ='/admin' element ={<Admin />} />
                        <Route  path="/addArtical" element={<AddArtical/>} />
                        <Route  path="/articals/:articalId/update" element={<UpdateArtical/>} />
                        <Route  path="/deleteTour" element={<TourDelete/>} />

                        <Route path="/apptest/" element={<Apptest />} />
                        <Route path="/MomoReturn" element={<MomoReturn />} />
                        <Route path="/bills" element={<Bills />} />
                    </Routes>
                    <ScrollToTop />
                    <Footer2 />
            </BrowserRouter>
        </div>
    </PayProvider>
       
    )
}