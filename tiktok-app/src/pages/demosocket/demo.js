import React, {useEffect, useRef, useState} from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const SOCKET_URL = 'http://localhost:8080/ws-endpoint';

export default function DemoSocket(){
    const [stompClient, setStompClient] = useState(null);
    useEffect(() => {
        const client = new Client({
            brokerURL: "http://localhost:8080/ws-endpoint",
            webSocketFactory: () => {
                return new SockJS(SOCKET_URL);
            },
            debug: function (str) {
                console.log(str);
            },
        });

        client.onConnect = function (frame) {
            client.subscribe("/app/chat", message => {
                console.log(JSON.parse(message.body))
            })
        };
        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
        client.activate()

        setStompClient(client)

        return (() => {
            client.forceDisconnect();
        })
    },[]);

    const [message, setMessage] = useState()

    const sendMessage = (e) => {


        const chatMessage = {
            name: message,
        };

        stompClient.send('/topic/hello', {}, JSON.stringify(chatMessage));
        setMessage('');
    }
    return (
        <div className={"w-10/12 mx-auto p-5"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex"}>
                    <div className={"mr-2 font-light flex items-center"}>WebSocket connection</div>
                    <button className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"} >Connect</button>
                    <button className={"hover:bg-second_primary-300"}>Disconnect</button>
                </div>
                <form className={"flex items-center"} onSubmit={(e) => {sendMessage(e)}}>
                    <h5 className={"mr-2"}>What is your name ?</h5>
                    <input value={message} className={"flex-1 border-2"}/>
                    <button type={"submit"} className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"}>Connect</button>
                </form>
            </div>
            <div className={"flex flex-col"}>
            <h5>Greetings</h5>
                <p>Hello</p>
            </div>
        </div>
    )
}