import { useState, useEffect } from 'react';
import './Heart.css';

const Heart = ({ onComplete }) => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        "Hola",
        "Sé que no hemos interactuado mucho pero..."
    ];

    useEffect(() => {
        // Show first message for 2 seconds
        // Show second message for 3 seconds
        // Then complete

        const timer1 = setTimeout(() => {
            setMessageIndex(1);
        }, 2000);

        const timer2 = setTimeout(() => {
            onComplete();
        }, 5500); // 2s (first msg) + 3.5s (second msg)

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <div className="heart-container">
            <div className="heart-content">
                <div className="cssload-main">
                    <div className="cssload-heart">
                        <span className="cssload-heartL"></span>
                        <span className="cssload-heartR"></span>
                        <span className="cssload-square"></span>
                    </div>
                    <div className="cssload-shadow"></div>
                </div>
                <div className="message-container">
                    <p key={messageIndex} className="heart-message fade-in">
                        {messages[messageIndex]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Heart;