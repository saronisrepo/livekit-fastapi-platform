import { useState } from "react";
import { Room, RoomEvent } from "livekit-client";

export default function VideoRoom() {
    const [identity, setIdentity] = useState("");
    const [roomName, setRoomName] = useState("");

    const [room, setRoom] = useState(null);

    const [connected, setConnected] = useState(false);

    const [participants, setParticipants] = useState([]);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const LIVEKIT_URL =
        "wss://sample-task-d7d7p3se.livekit.cloud";

    const joinRoom = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/get-token?identity=${identity}&room=${roomName}`
            );

            const data = await response.json();

            const lkRoom = new Room();

            await lkRoom.connect(
                LIVEKIT_URL,
                data.token
            );

            await lkRoom.localParticipant.enableCameraAndMicrophone();

            setParticipants([identity]);

            lkRoom.on(
                RoomEvent.ParticipantConnected,
                (participant) => {
                    setParticipants((prev) => [
                        ...prev,
                        participant.identity,
                    ]);
                }
            );

            lkRoom.on(
                RoomEvent.ParticipantDisconnected,
                (participant) => {
                    setParticipants((prev) =>
                        prev.filter(
                            (p) => p !== participant.identity
                        )
                    );
                }
            );

            lkRoom.on(
                RoomEvent.DataReceived,
                (payload, participant) => {
                    const text =
                        new TextDecoder().decode(payload);

                    setMessages((prev) => [
                        ...prev,
                        {
                            sender:
                                participant?.identity || "Unknown",
                            text,
                        },
                    ]);
                }
            );

            setRoom(lkRoom);

            setConnected(true);

            console.log("Connected!");
        } catch (err) {
            console.error(err);
            alert("Failed to join room");
        }
    };

    const leaveRoom = () => {
        if (room) {
            room.disconnect();
        }

        setConnected(false);

        setParticipants([]);

        setMessages([]);

        setRoom(null);
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            await room.localParticipant.publishData(
                new TextEncoder().encode(message)
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: identity,
                    text: message,
                },
            ]);

            setMessage("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "800px",
                margin: "auto",
            }}
        >
            <h1>LiveKit Video Platform</h1>

            {!connected && (
                <>
                    <input
                        type="text"
                        placeholder="Username"
                        value={identity}
                        onChange={(e) =>
                            setIdentity(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Room Name"
                        value={roomName}
                        onChange={(e) =>
                            setRoomName(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    />

                    <button
                        onClick={joinRoom}
                        style={{
                            padding: "10px 20px",
                        }}
                    >
                        Join Room
                    </button>
                </>
            )}

            {connected && (
                <>
                    <h3>Room: {roomName}</h3>

                    <h4>User: {identity}</h4>

                    <button
                        onClick={leaveRoom}
                        style={{
                            padding: "10px",
                            marginBottom: "20px",
                        }}
                    >
                        Leave Room
                    </button>

                    <hr />

                    <h3>Participants</h3>

                    <ul>
                        {participants.map((participant) => (
                            <li key={participant}>
                                {participant}
                            </li>
                        ))}
                    </ul>

                    <hr />

                    <h3>Chat</h3>

                    <div
                        style={{
                            border: "1px solid #ddd",
                            height: "250px",
                            overflowY: "auto",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.sender}</strong>
                                : {msg.text}
                            </div>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        style={{
                            width: "80%",
                            padding: "10px",
                        }}
                    />

                    <button
                        onClick={sendMessage}
                        style={{
                            padding: "10px",
                            marginLeft: "10px",
                        }}
                    >
                        Send
                    </button>
                </>
            )}
        </div>
    );
}