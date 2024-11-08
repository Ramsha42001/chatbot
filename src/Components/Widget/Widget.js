import React, { useState } from "react";
import axios from "axios"; 
import WidgetCss from "./Widget.module.css";
import ChatImage from "./image.png";

const Widget = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);

    
    const [newMessage, setNewMessage] = useState("");

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            
            const userMessage = { sender: "user", text: newMessage };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setNewMessage(""); 

            try {
                const messageQuery = encodeURIComponent(newMessage); 
                const response = await axios.get(`https://rapidbot-2327227512.us-central1.run.app/api/chat?message=${messageQuery}`);

                
                const botMessage = { sender: "bot", text: response.data.text || "I'm here to assist you!" };
                setMessages(prevMessages => [...prevMessages, botMessage]);

            } catch (error) {
                console.error("Error fetching the bot response:", error);
                const errorMessage = { sender: "bot", text: "Sorry, I'm experiencing issues. Please try again later." };
                setMessages(prevMessages => [...prevMessages, errorMessage]);
            }
        }
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    bottom: "40px",
                    right: "40px",
                    cursor: "pointer",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#007bff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "24px",
                    zIndex: 10,
                }}
                onClick={openPopup}
                className={WidgetCss.widget}
            >
                <img className={WidgetCss.image} src={ChatImage} alt="Chat Icon" />
            </div>

            <div className={`${WidgetCss.popup} ${isPopupOpen ? WidgetCss.popupOpen : ""}`}>
                <div className={WidgetCss.popupHeader}>
                    <span>Chatbot Assistant</span>
                    <span className={WidgetCss.closeButton} onClick={closePopup}>
                        &times;
                    </span>
                </div>
                <div className={WidgetCss.popupContent} style={{
                    padding: "10px",
                    overflowY: "auto",
                    flexGrow: 1,
                    borderTop: "1px solid #ddd",
                    borderBottom: "1px solid #ddd",
                }}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                                marginBottom: "8px"
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: message.sender === "user" ? "#007bff" : "#f1f0f0",
                                    color: message.sender === "user" ? "white" : "black",
                                    padding: "8px 12px",
                                    borderRadius: "16px",
                                    maxWidth: "80%",
                                    textAlign: "left"
                                }}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd" }}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        style={{
                            flex: 1,
                            padding: "8px",
                            border: "1px solid #ddd",
                            borderRadius: "16px",
                            outline: "none"
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        style={{
                            marginLeft: "8px",
                            padding: "8px 12px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default Widget;
