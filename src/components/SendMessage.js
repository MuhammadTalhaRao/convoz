import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

const SendMessage = ({ scroll }) => {
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }

        const { uid, displayName, photoURL } = auth.currentUser;

        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid,
        });

        scroll.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
        setMessage("");
    };

    return (
        <form onSubmit={(event) => sendMessage(event)} class="fixed-bottom container d-flex">
            <label htmlFor="messageInput" hidden>
                Enter Message
            </label>
            <TextField
                label="Filled" variant="filled"
                color="primary" focused
                id="messageInput"
                name="messageInput"
                type="text"
                className="w-100"
                placeholder="type message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton type="submit" color="primary" aria-label="add to shopping cart">
                <SendIcon />
            </IconButton>
        </form>
    );
};
export default SendMessage;