import React, { useState, useEffect } from "react";
import { FormControl, Input, IconButton } from "@material-ui/core";
import Message from "./Message";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    // eseEffect if its blank inside [], this code runs ONCE when the app component loads

    useEffect(() => {
        db.collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data(),
                    }))
                );
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
            <form className="app__form">
                <FormControl className="app__FormControl">
                    <Input
                        className="app__Input"
                        placeholder="Enter a message..."
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <IconButton
                        className="app__IconButton"
                        disabled={!input}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={sendMessage}
                    >
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>

            <FlipMove>
                {messages.map(({ id, message }) => (
                    <Message key={id} username={username} message={message} />
                ))}
            </FlipMove>
        </div>
    );
}

export default App;
