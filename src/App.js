import logo from './logo.svg';
import Login from './components/Login';
import AdminMenu from './components/AdminMenu';
import ProductForm from './components/ProductForm';
import ProductTablePage from './components/ProductTablePage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './components/ProductPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" >
            <Route index element={<Login />}></Route>
            <Route path="/ระบบจัดการ" element={<AdminMenu />}>
              {/* <Route index element={<EditHomepage />} />
              <Route path="จัดการข้อมูลหน้าแรก" element={<EditHomepage />} />
              <Route path="เพิ่มแก้ไขโพสต์" element={<EditPost />} />
              <Route path="เพิ่มแก้ไขเอกสาร" element={<EditDocs />} /> */}
              <Route path="แสดงรายการสินค้า" element={<ProductTablePage />} />
              <Route path="เพิ่มแก้ไขลบรายการสินค้า" element={<ProductPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
