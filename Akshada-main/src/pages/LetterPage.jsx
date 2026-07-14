import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/letter.css';

const letterContent = [
    {
        title: "To my Akshada",
        text: `I love you so much, Akshada.

Sometimes I sit quietly and think about the day I met you. The day I started understanding you. And I realize that something inside my life changed from that moment. 

There were feelings I had never experienced before. I had never imagined that someone could become this important to me.`,
        footer: "With love, — "
    },
    {
        title: "The Simple Choice",
        text: `And haa! I didn’t plan to fall in love with you. I didn’t think about it deeply or try to control it. It simply happened, my heart choose you on its own and even today I can’t fully explain how or why?

Talking to you… listening to your voice and thoughts has always been the best part of my day. slowly, without even realizing it, I became so comfortable with you that I shared things I had never shared with anyone before.`,
        footer: "Your Safe Place"
    },
    {
        title: "Beauty & Peace",
        text: `You became a place now where my heart felt safe and loved. for the first time in my life, I even wrote and said shayari for someone. If it even felt common to you, I want you to know that it was not. That was super special thing that I can do for someone.

now every song and every shayari I can relate to you. seeing you happy gives me a kind of peace that I can’t explain in words. my only wish is that you stay happy always... you stay happy always and life gives you every beautiful thing you truly deserve.`,
        footer: "My Every Thought"
    },
    {
        title: "Forever Choosing You",
        text: `I just want to give you endless love, care and warmth… and yes I am obsessed! with your soul, your smile and your presence. the love I carry for you is so pure and real.

Akshada, you are the meaning of love to me. I will love you without condition, every single day.

I choose you
my heart chose you
and I will keep choosing you.

I love you, Akshada ❤️`,
        footer: "Always yours"
    }
];

export default function LetterPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    // Fade up decoration elements
    const dots = [
        { top: '10%', left: '5%' }, { top: '30%', left: '15%' }, { top: '50%', left: '8%' },
        { top: '70%', left: '12%' }, { top: '90%', left: '5%' }, { top: '5%', right: '15%' },
        { top: '25%', right: '10%' }, { top: '45%', right: '12%' }, { top: '65%', right: '8%' },
        { top: '85%', right: '15%' }
    ];

    const handleNext = () => {
        if (currentPage < letterContent.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            // End of message back to home or bento
            navigate('/');
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="letter-container">
            {dots.map((d, i) => (
                <div key={i} className="star-decor" style={{ ...d }}>✦</div>
            ))}

            <div className="letter-box">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        className="stationary-paper"
                        initial={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        exit={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <h2 className="letter-title">{letterContent[currentPage].title}</h2>
                        
                        <motion.p 
                            className="letter-text"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {letterContent[currentPage].text}
                        </motion.p>

                        <motion.div 
                            className="letter-footer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            — {letterContent[currentPage].footer}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                <div className="letter-nav">
                    <button 
                        className="letter-btn" 
                        onClick={handlePrev} 
                        disabled={currentPage === 0}
                    >
                        Previous 💌
                    </button>
                    
                    <div className="page-indicator">
                        {currentPage + 1} / {letterContent.length}
                    </div>

                    <button className="letter-btn" onClick={handleNext}>
                        {currentPage === letterContent.length - 1 ? "Start Over ✨" : "Next Page 💌"}
                    </button>
                </div>
            </div>
        </div>
    );
}
