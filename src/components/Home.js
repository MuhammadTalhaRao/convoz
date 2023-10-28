import React, { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../firebase";

const Home = ({ setIsAllowed }) => {
    const [systemPassword, setSystemPassword] = useState("")
    const [userPassword, setUserPassword] = useState("")

    useEffect(() => {
        const q = query(
            collection(db, "credentials"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedCredentials = [];
            QuerySnapshot.forEach((doc) => {
                fetchedCredentials.push({ ...doc.data(), id: doc.id });
            });

            const sortedMessages = fetchedCredentials.sort(
                (a, b) => a.createdAt - b.createdAt
            );

            setSystemPassword(sortedMessages.length > 0 && sortedMessages[0].AppPassword);
        });
        return () => unsubscribe;
    }, [])

    let handlePassword = (event) => {
        setUserPassword(event.target.value)
    }

    // validate password and allow to move forward
    let checkPassword = (event) => {
        event.preventDefault();
        
        console.log("userpass:",userPassword)
        if (userPassword === systemPassword) {
            setIsAllowed(true)
            sessionStorage.setItem('isPassValid', 'true');
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={'home-root'}>
            <Paper elevation={3} className={'home-paper'}>
                <form onSubmit={checkPassword} className={'home-form'}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        className={'home-textField'}
                        onChange={handlePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={'home-button'}
                        onClick={checkPassword}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Home;