import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [messages, setMessage] = useState([
        { username: "farhan", text: "hey guys" },
        { username: "dzaky", text: "oi" },
        { username: "a", text: "s" },
    ]);
    const [username, setUsername] = useState("");

    //if its blank inside [], this code runs ONCE when the app component loads

    useEffect(() => {
        setUsername(prompt("Please enter your name"));
    }, []);

    const sendMessage = (event) => {
        // all the logic to send a messege goes
        event.preventDefault();
        setMessage([...messages, { username: username, text: input }]);
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
