import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from '@mui/material/Avatar';
import "./components.css";

const Message = ({ message }) => {
    const [user] = useAuthState(auth);

    return (
        <div
            className={`${message.uid === user.uid ? "message-blue" : "message-orange"}`}>
            <Avatar className="me-1" alt="user avatar" src={message.avatar} />
            <div className="message-content">
                <p className="fw-bold m-0">{message.name}</p>
                <p className="">{message.text}</p>
            </div>
        </div>
    );
};

export default Message;
