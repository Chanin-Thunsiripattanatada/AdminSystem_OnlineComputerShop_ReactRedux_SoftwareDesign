import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import WebSocketNotification from "./WebSocketNotification";

function AdminMenu() {
    const { userLogout,token,user } = useAuth();
    const [ userData, setUserData ] = useState('');
    const navigate = useNavigate();
    const handleSubmitLogout = async (e) => {
        e.preventDefault();
        try {
            await userLogout(); // Authenticate and set token
            if (!token) {
                navigate('/');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    }
    useEffect(() => {
        if (user) {
            setUserData(user.username);
        }
    }, [user]); 
    return (
        <>
            <div className="sidebar shadow-lg text-center">
                <p className='prompt-semibold'><img src={require("../assets/images/SD_LOGO.png")} width={"100"} alt="logo brand" /><br />ระบบจัดการร้าน<br />ComCraft
                </p>
                <p style={{ backgroundColor: "grey" }} className='prompt-semibold'>ผู้ใช้งาน : {userData ? userData : ''}<br />
                </p>
                <WebSocketNotification />
                <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการข้อมูลสินค้า
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="./จัดการรายการสินค้า">จัดการรายการสินค้า</Link></li>
                    <li><Link class="dropdown-item" to="./เพิ่มรายการสินค้า">เพิ่มรายการสินค้า</Link></li>
                </ul>
                <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการรายการซื้อขายลูกค้า
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="./จัดการรายการซื้อขายลูกค้า">จัดการรายการซื้อขายลูกค้า<br />ยืนยันการชำระเงิน</Link></li>
                </ul>
                <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการข้อมูลลูกค้า
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="./จัดการรายการลูกค้า">จัดการรายการลูกค้า</Link></li>
                </ul>
                <Link style={{ color: "red" }} onClick={handleSubmitLogout}>Logout</Link>
            </div>
            <Outlet />
        </>
    );
}


export default AdminMenu;