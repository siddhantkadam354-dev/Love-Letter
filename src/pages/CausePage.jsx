import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import '../styles/cause.css'
import d1 from '../assets/d1.jpg'
import nickJudy from '../assets/nick judy.jpg'

// ── Content — written from the heart ──
const feelings = [
    {
        emoji: '🌧️',
        text: 'If the world offered me everything I ever wished for — success, recognition, a life that shines — but you were not part of it, I would give it all back without a second thought.\n\nBecause none of it means anything if I cannot share it with you.\n\nI would rather have a quiet, ordinary life beside you than the most extraordinary life without you.',
        isShayri: true,
    },
    {
        emoji: '😊',
        text: 'My favourite thing is making you laugh — not because it is easy, but because in that one moment, I know I brought something light into your day.\n\nYour happiness is not something I take lightly. It matters to me in a way I cannot quite put into words.\n\nWhen you smile, it is like a reminder that the right things in life are always worth holding onto.',
        isShayri: true,
    },
    {
        emoji: '🌙',
        text: '"sitaaron se bhari hui raatein pasand hai.\n\ndur se suni uski baatein pasand hai.\n\ntareef ke qabil hai uske baal bhi par,\n\nmujhe zyada uski aakhein pasand hai..!!"\n\n— yeh shayri sirf tere liye hai. 💜',
        isShayri: true,
    },
]

const FLOATS = ['🌸', '✨', '💖', '🌹', '⭐', '💫']

function FeelingCard({ feeling }) {
    const cardRef = useRef(null)
    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 40, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
            )
        }
    }, [])

    return (
        <motion.div
            ref={cardRef}
            className={`feeling-card${feeling.isShayri ? ' feeling-shayri' : ''}`}
            whileHover={{ scale: 1.01 }}
        >
            <div className="feeling-emoji">{feeling.emoji}</div>
            <div
                className="feeling-text"
                style={feeling.isShayri ? { whiteSpace: 'pre-line', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '2.2', color: 'rgba(255,220,255,0.95)' } : {}}
            >
                {feeling.text}
            </div>
        </motion.div>
    )
}

export default function CausePage() {
    const navigate = useNavigate()
    const cursorRef = useRef(null)
    const btnRef = useRef(null)
    const [shown, setShown] = useState([])
    const [busy, setBusy] = useState(false)
    const [storyMode, setStoryMode] = useState(false)
    const idxRef = useRef(0)

    // heart cursor
    useEffect(() => {
        const move = (e) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.18 })
            }
        }
        document.addEventListener('mousemove', move)
        return () => document.removeEventListener('mousemove', move)
    }, [])

    // floating emojis
    useEffect(() => {
        const iv = setInterval(() => {
            const el = document.createElement('div')
            el.className = 'cause-float'
            el.textContent = FLOATS[Math.floor(Math.random() * FLOATS.length)]
            el.style.cssText = `left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;font-size:${Math.random() * 16 + 10}px;`
            document.body.appendChild(el)
            gsap.to(el, {
                y: -500, opacity: 0,
                duration: Math.random() * 8 + 8,
                onComplete: () => el.remove()
            })
        }, 2000)
        return () => clearInterval(iv)
    }, [])

    const handleBtn = () => {
        if (storyMode) {
            gsap.to('body', {
                opacity: 0, duration: 0.8,
                onComplete: () => { gsap.set('body', { opacity: 1 }); navigate('/scroll') }
            })
            return
        }
        if (busy) return
        const idx = idxRef.current
        if (idx >= feelings.length) return

        setBusy(true)
        gsap.to(btnRef.current, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 })
        setShown(prev => [...prev, feelings[idx]])
        idxRef.current = idx + 1

        if (idxRef.current === feelings.length) {
            setTimeout(() => {
                gsap.to(btnRef.current, {
                    scale: 1.08, duration: 0.5, ease: 'elastic.out',
                    onComplete: () => setStoryMode(true)
                })
                setBusy(false)
            }, 600)
        } else {
            setTimeout(() => setBusy(false), 500)
        }
    }

    return (
        <div className="cause-root">
            {/* Nick & Judy background image with overlay */}
            <div className="cause-bg" style={{ backgroundImage: `url(${nickJudy})` }} />
            <div className="cause-bg-overlay" />
            {/* heart cursor */}
            <div ref={cursorRef} className="cause-cursor">
                <svg viewBox="0 0 24 24">
                    <path fill="#ff2d85" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>

            <div className="cause-inner">
                {/* Header */}
                <motion.h1
                    className="cause-title"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                    What I Feel For You
                </motion.h1>
                <motion.p
                    className="cause-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Every word below is from my heart
                </motion.p>

                {/* Cards */}
                <AnimatePresence>
                    {shown.map((f, i) => (
                        <FeelingCard key={i} feeling={f} />
                    ))}
                </AnimatePresence>

                {/* Button */}
                <motion.button
                    ref={btnRef}
                    className={`reveal-btn${storyMode ? ' story-mode' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleBtn}
                >
                    {storyMode
                        ? 'Read My Letter 💌'
                        : shown.length === 0
                            ? 'Open My Heart 💕'
                            : 'There\'s More... 🌹'}
                </motion.button>

                {shown.length > 0 && (
                    <motion.p
                        className="card-counter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {shown.length} / {feelings.length} feelings revealed
                    </motion.p>
                )}

                {/* Akshada image after all revealed */}
                {shown.length === feelings.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                        style={{
                            marginTop: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <img
                            src={d1}
                            alt="Akshada"
                            style={{
                                width: 160, height: 160, borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid rgba(255,105,180,0.5)',
                                boxShadow: '0 0 40px rgba(255,45,133,0.4)',
                            }}
                        />
                        <p style={{ color: 'rgba(255,180,220,0.8)', fontSize: '1rem', fontStyle: 'italic' }}>
                            "Go, grow, shine and be happy — that alone means everything to me." 🌸
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
