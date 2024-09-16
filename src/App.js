import AdminMenu from './components/AdminMenu';
import ProductTablePage from './components/ProductPage/ProductTablePage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import ProductPage from './components/ProductPage/AddProductPage';
import OrderTablePage from './components/OrderPage/OrderTablePage';
import AddOrderPage from './components/OrderPage/AddOrderPage';
import CustomerTablePage from './components/CustomerPage/CustomerTablePage';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
          <Route path="/" >
            <Route index element={<LoginPage />}></Route>
            <Route path="/ระบบจัดการ" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>}>
              <Route path="แสดงรายการสินค้า" element={<ProductTablePage />} />
              <Route path="เพิ่มแก้ไขลบรายการสินค้า" element={<ProductPage />} />
              <Route path="แสดงรายการลูกค้า" element={<OrderTablePage />}/>
              <Route path="เพิ่มแก้ไขลบรายการซื้อขายลูกค้า" element={<AddOrderPage />}/>
              <Route path="แสดงรายการข้อมูลลูกค้า" element={<CustomerTablePage />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
