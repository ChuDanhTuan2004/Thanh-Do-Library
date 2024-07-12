import React, {useEffect, useRef, useState} from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
const SOCKET_URL = 'http://localhost:8080/ws-endpoint';

export default function DemoSocket(){
    const [stompClient, setStompClient] = useState(null);
    const [name, setName] = useState(null)
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState()
    const connect = (e) => {
        e.preventDefault()
        const client = new Client({
            brokerURL: "http://localhost:8080/ws-endpoint",
            webSocketFactory: () => {
                return new SockJS(SOCKET_URL);
            },
            debug: function (str) {
                console.log(str);
            },
        });
        client.connectHeaders = {
            username: name
        }
        client.activate();

        client.onConnect = function (frame) {
            client.subscribe("/users/topic/messages", message => {
                console.log(message.body)
            })
        };

        client.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
        setStompClient(client)
    }


    const sendMessage = (e) => {
        e.preventDefault()
        stompClient.publish({
            destination: '/app/chat',
            body: message,
            skipContentLengthHeader: true,
        });

        setMessage('');
    }

    const privateConnect = (e) => {
        e.preventDefault()
        const client = new Client({
            brokerURL: "http://localhost:8080/ws-endpoint",
            webSocketFactory: () => {
                return new SockJS(SOCKET_URL);
            },
            debug: function (str) {
                console.log(str);
            },
        });
        client.activate();

        client.onConnect = function (frame) {
            client.subscribe("/users/topic/messages", message => {
                console.log(message.body)
            })
        };

        client.onStompError = function (frame) {
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
        setStompClient(client)


    }
    return (
        <div className={"w-10/12 mx-auto p-5"}>
            <div className={"flex justify-between items-center"}>
                <form className={"flex"} onSubmit={connect}>
                    <input type={"text"}
                           value={name}
                           onChange={(e) => {setName(e.target.value)}}
                    />
                    <button
                        className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"} >Connect</button>
                    <button className={"hover:bg-second_primary-300"}>Disconnect</button>
                </form>
                <form className={"flex items-center"} onSubmit={(e) => {sendMessage(e)}} >
                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className={"flex-1 border-2"}/>
                    <button type={"submit"}  className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"}>Submit</button>
                </form>
            </div>
            <div className={"flex flex-col"}>
            <h5>Greetings</h5>
                <p>Hello</p>
            </div>
        </div>
    )
}