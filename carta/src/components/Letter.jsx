import './Letter.css';

const Letter = ({ isOpen, onClose }) => {
    return (
        <div className={`letter-container ${isOpen ? 'open' : ''}`}>
            <div className="envelope">
                <div className="envelope-flap"></div>
                <div className="envelope-paper">
                    <div className="letter-content">
                        <h1>Para ti, mi amor</h1>
                        <p>
                            Eres la razón de mi sonrisa, la melodía de mi corazón y el sueño del que nunca quiero despertar.
                            Cada día a tu lado es un regalo, y solo quiero recordarte lo mucho que te amo.
                        </p>
                        <p>Con todo mi cariño,</p>
                        <p>Francisco</p>
                    </div>
                </div>
            </div>
            <button className="close-btn" onClick={onClose}>Cerrar carta</button>
        </div>
    );
};

export default Letter;
