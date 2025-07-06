import { useParams } from "react-router-dom";
import { useState, useEffect, createElement, useRef } from "react";
import "../../../node_modules/socket.io/client-dist/socket.io";
import Alert from "../components/Alert";
import Messages from "../components/Messages";
import ChatInput from "../components/ChatInput";
import ChatButton from "../components/ChatButton";

const socket = io("localhost:3000");

function Channel() {
    const [messages, setMessages] = useState([]);
    const { channelId } = useParams();
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(null);
    const [keys, setKeys] = useState({
        shift: false
    })
    const bottomRef = useRef(null);

    useEffect(() => {
        setName(prompt("Enter a nickname: ") || "anon");

        const handleChatHistory = (data) => {
            if(data.exists == false) {
                setAlert(<Alert title="Error">
                    Channel does not exist.
                </Alert>)
            }
            setMessages(data.chatHistory);
        }

        const handleMessage = (data) => {
            setMessages((prev) => [...prev, data]);
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }

        socket.emit("getChatHistory", channelId);
        socket.on("getChatHistory", handleChatHistory);
        socket.on("message", handleMessage);

        return () => {
            socket.off("getChatHistory", handleChatHistory);
            socket.off("message", handleMessage);
        }
    }, [])

    const handleSend = () => {

        socket.emit("message", {
            content: input,
            channelId: channelId,
            name: name
        })

        setInput("");
    }

    const handleInput = (event) => {
        setInput(event.target.value);
    }

    const handleKeyDown = (event) => {
        if(event.key == "Shift") {
            keys.shift = true;
            setKeys(keys);
        }
        if(event.key == "Enter") {
            console.log(keys.shift)
            if(keys.shift) return;
            event.preventDefault();
            handleSend();
        }
    }

    const handleKeyUp = (event) => {
        if(event.key == "Shift") {
            keys.shift = false;
        }
    }

    return (
        <>
            {alert}
            <Messages data={messages}><div ref={bottomRef} /></Messages>
            <div className="inputDiv">
                <ChatInput value={input} onChange={handleInput} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}></ChatInput>
                <ChatButton onClick={handleSend}>Send</ChatButton>
            </div>
        </>
    )
}

export default Channel;