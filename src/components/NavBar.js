import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_focus_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

const NavBar = () => {
    const [user] = useAuthState(auth);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const signOut = () => {
        auth.signOut();
    };

    return (
        <>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        {
                            user ?
                                <Button onClick={signOut} variant="contained">Sign Out</Button>
                                :
                                <>
                                    <img
                                        onClick={googleSignIn}
                                        src={GoogleSignin}
                                        alt="sign in with google"
                                        type="button"
                                    />
                                </>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};
export default NavBar;