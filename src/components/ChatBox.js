import React, { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import "./components.css";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);            
        });
        return () => unsubscribe;
    }, []);

    useEffect(()=>{
        scroll.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }, [messages])

    return (
        <main className="container">
            <div className="chat-box">
                {messages?.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                <span ref={scroll}></span>
            </div>
            {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
            <SendMessage scroll={scroll} />
        </main>
    );
};

export default ChatBox;