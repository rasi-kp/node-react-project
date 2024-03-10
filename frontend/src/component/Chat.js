import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUser } from '../context/usercontext'

const socket = io.connect("http://localhost:5001"); // Replace with your server URL

function App({ closechat }) {
    const { userRole } = useUser();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [showModal, setShowModal] = React.useState(true);

    const getmessage = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/message', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        if (!response) {
            throw new Error('Failed to sign in');
        }
        const data = await response.json();
        console.log(data.messages);
        setMessages([...messages, data.messages]);
    }
    const insertmessage = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                content:inputMessage,
            }),
        });
        if (!response) {
            throw new Error('Failed to sign in');
        }
    }
    const sendMessage = () => {
        console.log(userRole);
        insertmessage()
        socket.emit("message", inputMessage);
        setInputMessage('');
    };
    useEffect(async () => {
        const fetchData = async () => {
            console.log("useeffect selected");
            socket.on("message", (data) => {
                console.log(data);
            });
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/message', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            console.log(data.messages);
            setMessages([...messages, ...data.messages]);
            console.log("useeffect finish");
        };
        fetchData()
    }, []);

    return (
        <>
            {showModal && (
                <div className="fixed bottom-0 right-0 mb-4 mr-4">
                    <div id="chat-container" className="bg-white shadow-md rounded-lg max-w-lg w-full">
                        <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Socket.io Chat App</p>
                            <button
                                id="close-chat"
                                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                                onClick={closechat}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 h-80 overflow-y-auto">
                        <div className="mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
                            </div>
                            {messages.map((message, index) => (
                                <div key={index} className="mb-2 text-right">
                                    <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{message}</p>
                                </div>
                            ))}
                            
                        </div>

                        <div className="p-4 border-t flex">
                            <div className="flex-1">
                                <input
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    id="user-input"
                                    type="text"
                                    placeholder="Type a message"
                                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                id="send-button" onClick={sendMessage}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
