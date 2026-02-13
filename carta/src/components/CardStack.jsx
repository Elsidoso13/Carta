import './CardStack.css';

const CardStack = ({ isOpen, onClose }) => {
    return (
        <div className="card-stack-container" onClick={onClose}>
            <p className="browser-warning">
                If this looks wonky to you it's because this browser doesn't support the CSS
                property 'aspect-ratio'.
            </p>
            <div className="stack">
                <div className="card">
                    <div className="card-content">
                        <div className="heart-icon">♥</div>
                        <p className="open-text">Ábreme</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardStack;
