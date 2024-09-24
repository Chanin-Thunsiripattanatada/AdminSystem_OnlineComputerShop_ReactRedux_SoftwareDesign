import React, { useEffect, useState } from 'react';
import { useSubscription, useStompClient } from 'react-stomp-hooks';
const WebSocketNotification = () => {
    const [lastMessage, setLastMessage] = useState("No message received yet");
    const client = useStompClient();

    useEffect(() => {
        if (client) {
            console.log('WebSocket connection established.');
        } else {
            console.log('WebSocket not connected.');
        }
    }, [client]);

    useSubscription("/topic/notifications", (message) => {
        setLastMessage(message.body);
        console.log('Received message:', message.body);
    });

    return <div>Last Message: {lastMessage}</div>;
    
};

export default WebSocketNotification;
