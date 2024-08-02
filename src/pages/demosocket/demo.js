import React, {useEffect, useState} from 'react'
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs'
import ChatRoom from "../../components/chatRoom/ChatRoom";


let stompClient = null;
const DemoSocket = () => {

    const [userData, setUserData] = useState({
        username: '',
        receiverName: '',
        connected: false,
        message: ''
    });

    const connect = (e) => {
        e.preventDefault()
        stompClient = new Client({
                brokerURL: "ws://localhost:8080/ws",
                webSocketFactory: () => {
                    return new WebSocket("ws://localhost:8080/ws");
                },
                debug: function (str) {
                    console.log(str);
                },
            reconnectDelay: 50000,
            }
        )

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('/user/'+userData.username+'/private', (data) => {
                console.log(data)
            }, {})
        }

        stompClient.activate()

    }

    const sendMessage = (e) => {
        e.preventDefault()

        const chatMessage = {
            senderName: userData.username,
            receiverName: userData.receiverName,
            message: userData.message,
            status:"MESSAGE"
        };

        console.log(chatMessage)

        stompClient.publish({
            destination: "/app/private-message",
            body: JSON.stringify(chatMessage),
            headers: {}
            }
        );
    };

    return (
        <div>
            <div className={"w-10/12 mx-auto p-5"}>
                <div className={"flex justify-between items-center"}>
                    <form className={"flex"} onSubmit={connect}>
                        <input type={"text"}
                               value={userData.username}
                               onChange={(e) => {
                                   setUserData({...userData, username: e.target.value});
                               }}
                        />
                        <button
                            className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"}>Connect
                        </button>
                    </form>
                    <form className={"flex items-center"} onSubmit={(e) => {
                        sendMessage(e)
                    }}>
                        <input
                            value={userData.receiverName}
                            placeholder={"receiver"}
                            onChange={(e) => {
                                setUserData({...userData, receiverName: e.target.value})
                            }}
                            className={"flex-1 border-2"}/>
                        <input
                            value={userData.message}
                            placeholder={"Message"}
                            onChange={(e) => {
                                setUserData({...userData, message: e.target.value});
                            }}
                            className={"flex-1 border-2"}/>
                        <button type={"submit"} className={"ml-3 p-3 rounded-sm hover:bg-second_primary-300"}>Submit
                        </button>
                    </form>
                </div>
                <div className={"flex flex-col"}>
                    <h5>Greetings</h5>
                    <p>Hello</p>
                </div>
            </div>
            <div>
                <ChatRoom />
            </div>
        </div>

    )
}

export default DemoSocket