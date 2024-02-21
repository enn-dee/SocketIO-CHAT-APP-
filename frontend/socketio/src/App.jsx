import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io("http://localhost:3001");
// const username = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUN] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("chat msg", (payload) => {
      setMessages([...messages, payload]);
    });

    socket.on("disconnect", () => {
      console.log("user got disconnected");
    });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("chat msg", { message, username });
    setMessage("");
  };
  if (loader) {
    return (
      <div>
        <h3>Setup Your Username</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUN(e.target.value)}
          placeholder="Enter username"
        />
        <button
          onClick={() => {
            setLoader(false);
          }}
        >
          Enter chat
        </button>
      </div>
    );
  }
  return (
    <div>
      <h3>Chat</h3>
      <ul>
        {messages.map((payload, index) => (
          <li key={index} style={{ listStyle: "none", margin: "1rem 0" }}>
            <span
              style={{
                padding: "4px",
                background: "tomato",
                borderRadius: "3px",
                margin: "4px",
              }}
            >
              {payload.username}
            </span>

            {payload.message}
          </li>
        ))}
      </ul>
      <form>
        <input
          type="text"
          placeholder="type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" onClick={handleSend}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
