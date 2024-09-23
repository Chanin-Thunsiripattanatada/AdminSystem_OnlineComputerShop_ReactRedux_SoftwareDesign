import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function AdminMenu() {
    const { userLogout } = useAuth();
    const { token } = useAuth();
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
    return (
        <>
            <div className="sidebar shadow-lg text-center">
                <p className='prompt-semibold'><img src={require("../assets/images/logo192.png")} width={"100"} alt="logo brand" /><br />ระบบจัดการร้าน<br />ComCraft
                </p>
                <p style={{ backgroundColor: "grey" }} className='prompt-semibold'>ผู้ใช้งาน : <br />
                </p>
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