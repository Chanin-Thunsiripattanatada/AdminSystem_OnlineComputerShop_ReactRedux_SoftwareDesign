import React, { useEffect, useState } from 'react';
import { useSubscription, useStompClient } from 'react-stomp-hooks';
import * as StompJs from '@stomp/stompjs'
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
    // const [stompClient, setStompClient] = useState(null);
    // const [connected, setConnected] = useState(false);
    // const [greetings, setGreetings] = useState([]);
    // const [name, setName] = useState("");

    // useEffect(() => {
    //     const client = new StompJs.Client({
    //         brokerURL: 'ws://localhost:8080/ws',
    //         onConnect: (frame) => {
    //             setConnected(true);
    //             console.log('Connected: ' + frame);
    //             client.subscribe('/topic/notifications', (greeting) => {
    //                 const message = JSON.parse(greeting.body).content;
    //                 setGreetings((prevGreetings) => [...prevGreetings, message]);
    //             });
    //         },
    //         onWebSocketError: (error) => {
    //             console.error('Error with websocket', error);
    //         },
    //         onStompError: (frame) => {
    //             console.error('Broker reported error: ' + frame.headers['message']);
    //             console.error('Additional details: ' + frame.body);
    //         }
    //     });
    //     setStompClient(client);

    //     return () => {
    //         client.deactivate(); // Cleanup WebSocket on component unmount
    //         setConnected(false);
    //     };
    // }, []);
    // const connect = () => {
    //     stompClient.activate();
    // };

    // const disconnect = () => {
    //     stompClient.deactivate();
    //     setConnected(false);
    //     console.log("Disconnected");
    // };
    // const sendName = () => {
    //     stompClient.publish({
    //         destination: "/app/hello",
    //         body: JSON.stringify({ name })
    //     });
    // };
    // return (
    //     <div>
    //         <div>
    //             <button onClick={connect} disabled={connected}>Connect</button>
    //             <button onClick={disconnect} disabled={!connected}>Disconnect</button>
    //         </div>
    //         {connected && (
    //             <div>
    //                 <input
    //                     type="text"
    //                     value={name}
    //                     onChange={(e) => setName(e.target.value)}
    //                     placeholder="Enter your name"
    //                 />
    //                 <button onClick={sendName}>Send</button>
    //             </div>
    //         )}
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th>Greetings</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {greetings.map((message, index) => (
    //                     <tr key={index}>
    //                         <td>{message}</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default WebSocketNotification;
