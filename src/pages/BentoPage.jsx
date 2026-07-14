import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/bento.css';

// Reusing some assets
import scroll1 from '../assets/scroll1.mp4';
import scroll2 from '../assets/scroll2.mp4';
import scroll3 from '../assets/scroll3.mp4';
import scroll4 from '../assets/scroll4.mp4';
import scroll5 from '../assets/scroll5.mp4';
import scroll6 from '../assets/scroll6.mp4';
import scroll7 from '../assets/scroll7.mp4';

// Bento Wall Assets
import bentoVideo1 from '../assets/Bento Wall/WhatsApp Video 2026-03-19 at 11.17.01 AM.mp4';
import bentoVideo2 from '../assets/Bento Wall/WhatsApp Video 2026-03-21 at 9.31.54 PM.mp4';
import bentoVideo3 from '../assets/Bento Wall/WhatsApp Video 2026-03-21 at 9.33.21 PM.mp4';
import bentoVideo4 from '../assets/Bento Wall/WhatsApp Video 2026-03-21 at 9.29.24 PM.mp4';


const bentoItems = [
    { type: 'video', src: scroll1, title: "The Beginning", desc: "Where our journey started", class: "span-2-2" },
    { type: 'video', src: bentoVideo1, title: "Heartbeat", desc: "Every moment with you is a gift", class: "" },
    { type: 'video', src: bentoVideo2, title: "Precious Moments", desc: "In a hundred lifetimes, I'd choose you.", class: "span-1-2" },
    { type: 'video', src: scroll2, title: "Authenticity", desc: "You saw me as I am", class: "span-1-1" },
    { type: 'video', src: bentoVideo3, title: "Sweetness", desc: "Your laugh is my favorite soundtrack", class: "" },
    { type: 'video', src: scroll3, title: "Choice", desc: " Choosing you, every single day", class: "span-2-1" },
    { type: 'video', src: scroll4, title: "The Present", desc: "Gratitude for now", class: "span-1-2" },
    { type: 'video', src: scroll5, title: "Deep Connection", desc: "Beyond words", class: "span-2-1" },
    { type: 'video', src: bentoVideo4, title: "Our Future", desc: "Walking hand in hand toward everything", class: "" },
    { type: 'video', src: scroll6, title: "Pure Peace", desc: "Your soul in tranquility", class: "span-1-1" },
    { type: 'video', src: scroll7, title: "Forever", desc: "Thank you for existing", class: "span-1-1" },
];

export default function BentoPage() {
    const navigate = useNavigate();

    return (
        <div className="bento-container">
            <header className="bento-header">
                <motion.h1 
                    className="bento-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Memory Wall
                </motion.h1>
                <p className="bento-subtitle">A tapestry of our favorite moments</p>
            </header>

            <motion.div 
                className="bento-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                {bentoItems.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        className={`bento-item ${item.class || ''} ${item.type === 'quote' ? 'quote-cell' : ''}`}
                        whileHover={{ scale: 1.02, y: -5 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                        {item.type === 'video' && (
                            <>
                                <video src={item.src} autoPlay loop muted playsInline className="bento-video" />
                                <div className="bento-overlay">
                                    <h3 className="bento-item-title">{item.title}</h3>
                                    <p className="bento-item-desc">{item.desc}</p>
                                </div>
                            </>
                        )}

                        {item.type === 'text' && (
                            <div className="bento-overlay" style={{ background: 'none' }}>
                                <h3 className="bento-item-title" style={{ color: '#ffc1d7' }}>{item.title}</h3>
                                <p className="bento-item-desc">{item.desc}</p>
                            </div>
                        )}

                        {item.type === 'quote' && (
                            <div className="bento-quote-text">
                                {item.text}
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            <motion.div 
                className="bento-nav-btn"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1 }}
                style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '4rem' }}
            >
                <button 
                    onClick={() => navigate('/letter')}
                    className="next-page-btn"
                    style={{ 
                        background: 'linear-gradient(45deg, #ff2d85, #ff69b4)',
                        fontSize: '1.25rem',
                        padding: '1.1rem 3rem'
                    }}
                >
                    Finally, Read My Letter 💌
                </button>
            </motion.div>
        </div>
    );
}
