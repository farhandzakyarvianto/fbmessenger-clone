import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    // eseEffect if its blank inside [], this code runs ONCE when the app component loads

    useEffect(() => {
        db.collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);

    useEffect(() => {
        setUsername(prompt("Please enter your name"));
    }, []);

    const sendMessage = (event) => {
        // all the logic to send a messege goes
        event.preventDefault();
        db.collection("messages").add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessages([...messages, { username: username, message: input }]);
        setInput("");
    };
    return (
        <div className="App">
            <h1>FB Messenger Clone</h1>
            <h2>Welcome {username}</h2>
            <form>
                <FormControl>
                    <InputLabel>Enter a message...</InputLabel>
                    <Input
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <Button
                        disabled={!input}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send Message
                    </Button>
                </FormControl>
            </form>

            {messages.map((message) => (
                <Message username={username} message={message} />
            ))}
        </div>
    );
}

export default App;
