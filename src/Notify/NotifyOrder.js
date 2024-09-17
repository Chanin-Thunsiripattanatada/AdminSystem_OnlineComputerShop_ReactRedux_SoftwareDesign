import React, { useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useLocation, useNavigate } from 'react-router-dom';

const ManagementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      // Subscribe to the topic when the user is on the /management route
      if (location.pathname === '/ระบบจัดการ') {
        stompClient.subscribe('/topic/orders', (notification) => {
          console.log('Notification received:', notification.body);

          // Optionally, handle the notification or navigate to /management
          navigate('/management'); // You can also do other actions here
        });
      }
    }, (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      // Disconnect WebSocket when component unmounts
      stompClient.disconnect();
    };
  }, [location.pathname, navigate]);

  return (
    <div>
      <h1>Management Page</h1>
      {/* Render notifications or management content */}
    </div>
  );
};

export default ManagementPage;
