import React, { useState } from "react";
import axios from "axios";
import WidgetCss from "./Widget.module.css";
import ChatImage from "./fai1.png";

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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className={WidgetCss.container}>
            <div
                className={WidgetCss.chatIcon}
                onClick={openPopup}
            >
                {!isPopupOpen && (
               <div className={WidgetCss.tooltip}>
               How can I help you?
           </div>
            )}
                <img className={WidgetCss.image} src={ChatImage} alt="Chat Icon" />
            </div>

            

            {isPopupOpen && (
                <div className={`${WidgetCss.popup} ${isPopupOpen ? WidgetCss.popupOpen : ""}`}>
                    <div className={WidgetCss.popupHeader}>
                        <span>Chatbot Assistant</span>
                        <span className={WidgetCss.closeButton} onClick={closePopup}>
                            &times;
                        </span>
                    </div>

                    <div className={WidgetCss.popupContent}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${WidgetCss.message} ${message.sender === "user" ? WidgetCss.userMessage : WidgetCss.botMessage}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>

                    <div className={WidgetCss.messageInputArea}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress} 
                            placeholder="Type a message..."
                            className={WidgetCss.input}
                        />
                        <button
                            onClick={handleSendMessage}
                            className={WidgetCss.sendButton}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Widget;
