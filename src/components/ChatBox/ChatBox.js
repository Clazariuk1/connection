import styles from "./Chatbox.module.scss";
// const socketio = require('socket.io')
import io from "socket.io-client"; // Do I need this here? THIS may be the thing that is not helping me
import { useEffect, useState } from "react";

// BEST PRACTICE : Deploy the chatbox SEPARATE from application. 'the hardest thing to do is deploy it in the same browser. It needs its' own server/service app that gets plugged INTO the page.
// EX: Google Sheets is not the same source repo as google docs.
// completely self contained. chat box communicate with chat server and plug the basic tag into the profil page and that's IT.

// Below is functioning differently than Arthur code. is this wrong? THIS is the localhost number that has to match the httpserver in my server file yes?
//  const socket = io.connect("http://localhost:3012");

export default function ChatBox() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [messages, setMessages ] = useState([])
  let delay = true

    socket.on('join_room', function(room){
        setMessages([...messages, `You have entered room ${room}. Happy Connecting!`])
    })

    // const receiveMessage = () => {
    //     setMessages([...messages, messageReceived])
    //     messageReceived('')
    // }
    socket.on("receive_message", function(message){
        // below will permanently trim the messages to a max of 9. Must eventually refactor to allow database storage and models etc. Scroll Chat?
        if (messages.length < 9){
            setMessages([...messages, message])
        }
        // below may not be correct syntax, must confirm with arthur
        else {
        setMessages([...messages.shift(), message])
        }
    })

    const delayReset = () => {
        delay = true
    }

    const joinRoom = () => {
        socket.emit('join_room', room)
    }

// send message here is causing an odd error
  const sendMessage = () => {
    if (delay && message.replace(/\s/g, '') != ''){
        delay = false
        setTimeout(delayReset, 1000)
        socket.emit('send_message', message)
        setMessages([...messages, message])
        setMessage('')
    }
  }

// expand upon THIS message to tell socket io you sent the message and allow browser comms.
// const sendMessage = () => {
//     setMessages([...messages, message])
//     setMessage('')
// }

// How do I get the arrays of messages sent and received to play out in order? Am I pushing messages received into the main messages array?


// use messages.map to effectively create a div for each individual message with styling offered --> Warning: Each child in a list should have a unique "key" prop.
// what's up with that above?
// i feel like data.message here is not accurate for what I need to be doing.
//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//      messageReceived(setMessageReceived)
//      receiveMessage(messageReceived)
//     });
//   }, [socket])
//
// // above use effect is throwing an odd error at present. something not right.
  return (
    <main className={styles.ChatBox}>
      <input className={styles.chatInput}
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        value={room}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input className={styles.chatInput}
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        value={message}
      />
      <button onClick={sendMessage}> Send Message</button>
      <div className={styles.messageBox}>
      <h4> Message Thread:</h4>
      {messages.map((message) => <div className={styles.chatMessage}>{message}</div>)}
      </div>
    </main>
  )
}
