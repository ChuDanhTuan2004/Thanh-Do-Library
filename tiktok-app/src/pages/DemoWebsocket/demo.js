import {StompSessionProvider, useStompClient, useSubscription} from "react-stomp-hooks";
import {useState} from "react";

const Demo = () => {
    <StompSessionProvider url={'http://localhost:8080/ws-endpoint'}>
            <ChildComponent/>
    </StompSessionProvider>
};

const ChildComponent = () => {
    const [message, setMessage] = useState("");
    // Subscribe to the custom queue
    useSubscription('/queue/reply-' + myUserId, (message) => {setMessage(message.body)});
    return (
        <div> The message from some other user is {message}</div>
    )
}

const PublishComponent = () => {
    const stompClient = useStompClient();

    const publishMessage = () => {
        if(stompClient) {
            stompClient.publish({destination: '/app/user-message-' + userIdToSendMessageTo, body: 'Hello User'})
        }
    }
    return (
        <div onClick={publishMessage}> Send message to user </div>
    )
}

export default Demo;