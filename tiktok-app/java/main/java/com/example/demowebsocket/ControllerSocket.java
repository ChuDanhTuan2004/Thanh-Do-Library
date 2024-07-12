package com.example.demowebsocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
@Controller
public class ControllerSocket {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
//    @SendTo("/topic/messages")
    public void sendMessage(SimpMessageHeaderAccessor sha,@Payload String user) {
        String message = "Hello " + sha.getUser().getName();
        System.out.println(user);
        simpMessagingTemplate.convertAndSendToUser(user,"/topic/messages", message);
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        return message;
    }

}
