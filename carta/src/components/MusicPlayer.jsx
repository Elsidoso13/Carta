import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './MusicPlayer.css';
import song from './cancion/Frank Ocean - White Ferrari.flac';

const messages = [
    { start: 0, end: 10, text: "Cada mañana que te veo, me arrepiento en no hablarte" },
    { start: 10, end: 20, text: "Tienes un cabello hermoso y tienes unos ojos que cada vez que intento verlos, siento que estoy atrapado en tu rostro" },
    { start: 20, end: 32, text: "Si nadie te lo ha dicho... eres una mujer que cada mañana puede brillar, veo tu energía y tu sonrisa que puede iluminar a cualquier persona" },
    { start: 32, end: 44, text: "Y la verdad lo tienes todo, en tan solo pensar que soy tan serio, pero podría sentirme agusto porque eres magia dentro de unos bellos ojos" },
    { start: 44, end: 54, text: "Esos bellos lentes que me hacen pensar que tu nombre debe ser una utopía dentro de mi cabeza " },
    { start: 54, end: 64, text: "Si pudiera te demostraría mi mundo, pero honestamente quiero conocer el tuyo " },
    { start: 64, end: 1000, text: "¿Podría tener el placer de entrar a tu mundo?" }
];

const MusicPlayer = ({ isOpen }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("Presiona el botón de 'Pause' para reproducir la carta (viene con canción)");
    const audioRef = useRef(null);

    // Remove useEffect for src loading if we use src prop directly. 
    // However, to ensure it doesn't reload on every render if that was the issue, 
    // putting it in the audio tag is usually fine for imported assets. 
    // But let's verify if we need to keep the ref logic. 
    // For simplicity and standard React behavior with imports:

    const [showOptions, setShowOptions] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    const [showRoses, setShowRoses] = useState(false);

    // Remove useEffect for isPlaying dependency to avoid race conditions. 
    // We will control audio directly in togglePlay and handlers.

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const foundMessage = messages.find(msg => currentTime >= msg.start && currentTime < msg.end);

            // Show roses after the first message (approx 10 seconds)
            if (currentTime > 10 && !showRoses) {
                setShowRoses(true);
            }

            if (foundMessage && foundMessage.text !== currentMessage) {
                setCurrentMessage(foundMessage.text);

                // Check if it's the specific question message
                if (foundMessage.text.includes("¿Podría tener el placer de entrar a tu mundo?")) {
                    setShowOptions(true);
                } else {
                    setShowOptions(false);
                    setFeedbackMessage(null);
                }
            }
        }
    };

    const sendEmail = (type, data) => {
        // Replace these with your actual EmailJS keys
        const SERVICE_ID = 'service_mwed2ig';
        const TEMPLATE_ID = 'template_gt86z7o';
        const PUBLIC_KEY = 'jmGqDf7hOtNrIgqbC';

        const templateParams = {
            to_email: 'pacouser2552@gmail.com',
            message_type: type,
            user_data: data,
        };

        // Note: You need to create an EmailJS template that uses {{to_email}}, {{message_type}}, and {{user_data}}
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
            }, (err) => {
                console.error('Failed to send email:', err);
            });
    };

    const handleOptionClick = (option) => {
        if (option === 'yes') {
            setFeedbackMessage('input_phone');
        } else if (option === 'no') {
            setFeedbackMessage('Acepto tu decisión. Gracias por escuchar.');
            setShowOptions(false);
            sendEmail('Rejection', 'User selected: No gracias');
        } else if (option === 'bf') {
            setFeedbackMessage('Entiendo, gracias por tu honestidad. Que seas muy feliz.');
            setShowOptions(false);
            sendEmail('Rejection', 'User selected: Tiene novio');
        }
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        setFeedbackMessage(`¡Gracias! Te escribiré pronto. (${phoneNumber})`);
        sendEmail('Phone Number', phoneNumber);
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => console.error("Playback failed", e));
            }
        }
    };

    // Instead of returning null when !isOpen, we let the parent handle visibility via CSS.
    // However, if the component logic relies on mounting/unmounting for cleanup, we need to be careful.
    // Given App.jsx passes isOpen, and wraps it in a div that controls visibility:
    // <div className={`transition-wrapper ${stage === 2 ? 'visible' : 'hidden'}`}>
    //   <MusicPlayer isOpen={stage === 2} />
    // </div>
    // If we remove 'if (!isOpen) return null', the component stays mounted but hidden.
    // This allows audio to keep playing if stage changes (though typically stage 2 is final).
    // More importantly, it prevents accidental unmounts if parent rerenders.

    return (
        <div className="music-player-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className={`flowers-container ${showRoses ? 'roses-visible' : ''}`}>
                {/* Left Flower */}
                <div className="flower flower-left">
                    <div className="petal petal1"></div>
                    <div className="petal petal2"></div>
                    <div className="petal petal3"></div>
                    <div className="petal petal4"></div>
                    <div className="petal petal5"></div>
                    <div className="petal petal6"></div>
                    <div className="petal petal7"></div>
                    <div className="petal petal8"></div>
                    <div className="center"></div>
                </div>

                {/* Right Flower */}
                <div className="flower flower-right">
                    <div className="petal petal1"></div>
                    <div className="petal petal2"></div>
                    <div className="petal petal3"></div>
                    <div className="petal petal4"></div>
                    <div className="petal petal5"></div>
                    <div className="petal petal6"></div>
                    <div className="petal petal7"></div>
                    <div className="petal petal8"></div>
                    <div className="center"></div>
                </div>

                {/* Side Left Flower */}
                <div className="flower flower-side-left">
                    <div className="petal petal1"></div>
                    <div className="petal petal2"></div>
                    <div className="petal petal3"></div>
                    <div className="petal petal4"></div>
                    <div className="petal petal5"></div>
                    <div className="petal petal6"></div>
                    <div className="petal petal7"></div>
                    <div className="petal petal8"></div>
                    <div className="center"></div>
                </div>

                {/* Side Right Flower */}
                <div className="flower flower-side-right">
                    <div className="petal petal1"></div>
                    <div className="petal petal2"></div>
                    <div className="petal petal3"></div>
                    <div className="petal petal4"></div>
                    <div className="petal petal5"></div>
                    <div className="petal petal6"></div>
                    <div className="petal petal7"></div>
                    <div className="petal petal8"></div>
                    <div className="center"></div>
                </div>
            </div>
            <div className="player-wrapper">
                <div className="card">
                    <div className="top">
                        <div className="pfp">
                            <div className="playing">
                                <div className={`greenline line-1 ${!isPlaying ? 'paused' : ''}`}></div>
                                <div className={`greenline line-2 ${!isPlaying ? 'paused' : ''}`}></div>
                                <div className={`greenline line-3 ${!isPlaying ? 'paused' : ''}`}></div>
                                <div className={`greenline line-4 ${!isPlaying ? 'paused' : ''}`}></div>
                                <div className={`greenline line-5 ${!isPlaying ? 'paused' : ''}`}></div>
                            </div>
                        </div>
                        <div className="texts">
                            <p className="title-1">White Ferrari</p>
                            <p className="title-2">Frank Ocean</p>
                        </div>
                    </div>

                    <div className="controls">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="20" width="24" className="volume_button">
                            <path clipRule="evenodd" d="M11.26 3.691A1.2 1.2 0 0 1 12 4.8v14.4a1.199 1.199 0 0 1-2.048.848L5.503 15.6H2.4a1.2 1.2 0 0 1-1.2-1.2V9.6a1.2 1.2 0 0 1 1.2-1.2h3.103l4.449-4.448a1.2 1.2 0 0 1 1.308-.26Zm6.328-.176a1.2 1.2 0 0 1 1.697 0A11.967 11.967 0 0 1 22.8 12a11.966 11.966 0 0 1-3.515 8.485 1.2 1.2 0 0 1-1.697-1.697A9.563 9.563 0 0 0 20.4 12a9.565 9.565 0 0 0-2.812-6.788 1.2 1.2 0 0 1 0-1.697Zm-3.394 3.393a1.2 1.2 0 0 1 1.698 0A7.178 7.178 0 0 1 18 12a7.18 7.18 0 0 1-2.108 5.092 1.2 1.2 0 1 1-1.698-1.698A4.782 4.782 0 0 0 15.6 12a4.78 4.78 0 0 0-1.406-3.394 1.2 1.2 0 0 1 0-1.698Z" fillRule="evenodd"></path>
                        </svg>
                        <div className="volume">
                            <div className="slider">
                                <div className="green"></div>
                            </div>
                            <div className="circle"></div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
                            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm.848-12.352a1.2 1.2 0 0 0-1.696-1.696l-3.6 3.6a1.2 1.2 0 0 0 0 1.696l3.6 3.6a1.2 1.2 0 0 0 1.696-1.696L11.297 13.2H15.6a1.2 1.2 0 1 0 0-2.4h-4.303l1.551-1.552Z" fillRule="evenodd"></path>
                        </svg>

                        <div onClick={togglePlay} style={{ cursor: 'pointer' }}>
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
                                    <path clipRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1z" fillRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
                                    <path clipRule="evenodd" d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0ZM8.4 9.6a1.2 1.2 0 1 1 2.4 0v4.8a1.2 1.2 0 1 1-2.4 0V9.6Zm6-1.2a1.2 1.2 0 0 0-1.2 1.2v4.8a1.2 1.2 0 1 0 2.4 0V9.6a1.2 1.2 0 0 0-1.2-1.2Z" fillRule="evenodd"></path>
                                </svg>
                            )}
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
                            <path clipRule="evenodd" d="M12 21.6a9.6 9.6 0 1 0 0-19.2 9.6 9.6 0 0 0 0 19.2Zm4.448-10.448-3.6-3.6a1.2 1.2 0 0 0-1.696 1.696l1.551 1.552H8.4a1.2 1.2 0 1 0 0 2.4h4.303l-1.551 1.552a1.2 1.2 0 1 0 1.696 1.696l3.6-3.6a1.2 1.2 0 0 0 0-1.696Z" fillRule="evenodd"></path>
                        </svg>
                        <div className="air"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="heart" stroke="currentColor" fill="none" height="20" width="24">
                            <path d="M3.343 7.778a4.5 4.5 0 0 1 7.339-1.46L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.501 4.501 0 0 1-.975-4.904Z"></path>
                        </svg>
                    </div>

                    <div className="song-time">
                        <p className="timetext time_now">1:31</p>
                        <div className="time">
                            <div className="elapsed"></div>
                        </div>
                        <p className="timetext time_full">3:46</p>
                    </div>
                </div>

                <div className="lyrics-container">
                    <p key={currentMessage} className="lyrics-text">{currentMessage}</p>

                    {showOptions && !feedbackMessage && (
                        <div className="options-container fade-in">
                            <button className="option-btn" onClick={() => handleOptionClick('yes')}>
                                Por supuesto
                            </button>
                            <button className="option-btn" onClick={() => handleOptionClick('no')}>
                                No, gracias
                            </button>
                            <button className="option-btn" onClick={() => handleOptionClick('bf')}>
                                Gracias pero tengo novio
                            </button>
                        </div>
                    )}

                    {feedbackMessage === 'input_phone' && (
                        <form onSubmit={handlePhoneSubmit} className="phone-form fade-in">
                            <input
                                type="tel"
                                className="phone-input"
                                placeholder="Escribe tu número..."
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                autoFocus
                            />
                            <button type="submit" className="option-btn submit-btn">Enviar</button>
                        </form>
                    )}

                    {feedbackMessage && feedbackMessage !== 'input_phone' && (
                        <p className="lyrics-text feedback-text fade-in">{feedbackMessage}</p>
                    )}
                </div>

                <audio
                    ref={audioRef}
                    src={song}
                    loop
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    onPause={() => {
                        console.log('Audio manually paused or interrupted');
                        if (isPlaying) setIsPlaying(false);
                    }}
                    onPlay={() => console.log('Audio playing')}
                    onError={(e) => console.error('Audio error', e.target.error, e)}
                />
            </div>
        </div>
    );
};
export default MusicPlayer;