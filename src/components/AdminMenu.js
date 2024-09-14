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
                    <li><Link class="dropdown-item" to="./แสดงรายการสินค้า">แสดงรายการสินค้า</Link></li>
                    <li><Link class="dropdown-item" to="./เพิ่มแก้ไขลบรายการสินค้า">เพิ่ม/แก้ไข/ลบรายการสินค้า</Link></li>
                </ul>
                <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการรายการซื้อขายลูกค้า
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="./แสดงรายการลูกค้า">แสดงรายการลูกค้า<br />ยืนยันการชำระเงิน</Link></li>
                    <li><Link class="dropdown-item" to="./เพิ่มแก้ไขลบรายการซื้อขายลูกค้า">เพิ่ม/แก้ไข/ลบรายการซื้อขายลูกค้า</Link></li>
                </ul>
                <Link class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการข้อมูลลูกค้า
                </Link>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="./แสดงรายการข้อมูลลูกค้า">แสดงรายการข้อมูลลูกค้า</Link></li>
                </ul>
                <Link style={{ color: "red" }} onClick={handleSubmitLogout}>Logout</Link>
            </div>
            <Outlet />
        </>
    );
}


export default AdminMenu;