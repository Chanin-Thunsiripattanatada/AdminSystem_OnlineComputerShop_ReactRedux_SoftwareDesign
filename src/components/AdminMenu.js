import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminMenu() {
    return (
        <>
            <div className="sidebar shadow-lg text-center">
                <p className='prompt-semibold'><img src={require("../assets/images/logo192.png")} width={"100"} /><br />ระบบจัดการร้าน<br />ComCraft
                </p>
                <p style={{ backgroundColor: "grey" }} className='prompt-semibold'>ผู้ใช้งาน : <br/>
                </p>
                <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการข้อมูลสินค้า
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="./แสดงรายการสินค้า">แสดงรายการสินค้า</Link></li>
                    <li><Link class="dropdown-item" to="./เพิ่มแก้ไขลบรายการสินค้า">เพิ่ม/แก้ไข/ลบรายการสินค้า</Link></li>
                </ul>
                <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการรายการซื้อขายลูกค้า
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item" href="#">แสดงรายการลูกค้า<br/>ยืนยันการชำระเงิน</a></li>
                    <li><a class="dropdown-item" href="#">เพิ่ม/แก้ไข/ลบรายการซื้อขายลูกค้า</a></li>
                </ul>
                <a class="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    จัดการข้อมูลลูกค้า
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><Link class="dropdown-item" to="#">แสดงรายการข้อมูลลูกค้า</Link></li>
                </ul>
                <Link style={{ color: "red" }}>Logout</Link>
            </div>
            <Outlet />
        </>
    );
}


export default AdminMenu;