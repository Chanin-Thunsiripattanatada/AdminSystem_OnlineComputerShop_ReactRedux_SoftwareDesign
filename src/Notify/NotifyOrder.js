import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast'; // For popup notification

const WebSocketNotification = () => {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Create WebSocket connection
        const socket = new WebSocket('ws://localhost:8080/ws'); // WebSocket endpoint from your Spring Boot app

        // Listen for messages
        socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            setMessage(notification.message);
            setShowToast(true);
        };

        // Cleanup WebSocket connection
        return () => {
            socket.close();
        };
    }, []);

    return (
        <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1000,
            }}
        >
            <Toast.Header>
                <strong className="mr-auto">Order Notification</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default WebSocketNotification;
