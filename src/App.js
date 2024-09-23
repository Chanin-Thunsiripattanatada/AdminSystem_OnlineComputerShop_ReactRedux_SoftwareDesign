import AdminMenu from './components/AdminMenu';
import ProductTablePage from './components/ProductPage/ProductTablePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddProductPage from './components/ProductPage/AddProductPage';
import OrderTablePage from './components/OrderPage/OrderTablePage';
import CustomerTablePage from './components/CustomerPage/CustomerTablePage';
import LoginPage from './components/LoginPage/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';
import WebSocketNotification from './components/WebSocketNotification';
import { StompSessionProvider } from "react-stomp-hooks";

const WS_URL = 'ws://localhost:8080/ws';
function App() {
  return (
    <div className="App">

      <StompSessionProvider url={WS_URL}>
        <BrowserRouter>
          <Routes>
            <Route path="/" >
              <Route index element={<LoginPage />}></Route>
              <Route path="/ระบบจัดการ" element={<ProtectedRoute><AdminMenu /><WebSocketNotification /></ProtectedRoute>}>
                <Route path="จัดการรายการสินค้า" element={<><ProductTablePage /></>} />
                <Route path="เพิ่มรายการสินค้า" element={<AddProductPage />} />
                <Route path="จัดการรายการซื้อขายลูกค้า" element={<OrderTablePage />} />
                <Route path="จัดการรายการลูกค้า" element={<CustomerTablePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </StompSessionProvider>

    </div>
  );
}

export default App;
