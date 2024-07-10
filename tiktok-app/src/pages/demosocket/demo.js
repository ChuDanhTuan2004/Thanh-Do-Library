import React, {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';


const SOCKET_URL = 'http://localhost:8080/gs-guide-websocket';

export default function DemoSocket(){
    const [stompClient, setStompClient] = useState(null);
    const connectSocket = () => {
        const socket = new SockJS("https://localhost:8080/gs-guide-websocket")
        const client = Stomp.over(socket);
        client.connect();
    }
    console.log("Stomp client current :" + stompClient)
    useEffect(() => {
        // Khởi tạo kết nối WebSocket
        const socket = new SockJS(SOCKET_URL);
        const client = Stomp.over(socket);
        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            client.subscribe("/topic/greetings", message => {
                console.log(JSON.parse(message.body))
            })
        });
        setStompClient(client)

        return (() => {
            client.disconnect();
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
                    <button className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"} onClick={connectSocket}>Connect</button>
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