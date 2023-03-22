import React from "react";
import { useState , useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login/Login";


function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        window.localStorage.getItem("loggedIn")
    );

    useEffect(() => {
        setIsLoggedIn(window.localStorage.getItem("loggedIn"));
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        exact
                        path="/dash"
                        element={isLoggedIn === "true" ? <App /> : <Login />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Main;