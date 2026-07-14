import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import '../styles/landing.css'
import heroVideo from '../assets/hero.mp4'

const PARTICLES = ['💖', '✨', '🌸', '💫', '💕', '🌹', '💝', '⭐']
const TYPING_TEXT = "From the very first day I truly saw you, something inside me changed — and it has never been the same since. 💖"

export default function LandingPage() {
    const navigate = useNavigate()
    const cursorRef = useRef(null)
    const charRef = useRef(0)
    const [typed, setTyped] = useState('')
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize()

    // cursor
    useEffect(() => {
        const move = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + 'px'
                cursorRef.current.style.top = e.clientY + 'px'
            }
        }
        document.addEventListener('mousemove', move)
        return () => document.removeEventListener('mousemove', move)
    }, [])

    // typing effect
    useEffect(() => {
        charRef.current = 0
        const tick = () => {
            if (charRef.current < TYPING_TEXT.length) {
                setTyped((p) => p + TYPING_TEXT[charRef.current])
                charRef.current++
                setTimeout(tick, 50)
            }
        }
        const t = setTimeout(tick, 1200)
        return () => clearTimeout(t)
    }, [])

    // floating particles
    useEffect(() => {
        const iv = setInterval(() => {
            const el = document.createElement('div')
            el.className = 'float-emoji'
            el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
            el.style.cssText = `left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;font-size:${Math.random() * 18 + 14}px;position:fixed;pointer-events:none;z-index:1;`
            document.body.appendChild(el)
            gsap.to(el, {
                y: -600, x: (Math.random() - 0.5) * 120, opacity: 0,
                rotation: Math.random() * 360,
                duration: Math.random() * 5 + 5,
                ease: 'power1.out',
                onComplete: () => el.remove()
            })
        }, 900)
        return () => clearInterval(iv)
    }, [])

    const handleClick = () => {
        setShowConfetti(true)
        setTimeout(() => {
            gsap.to('body', {
                opacity: 0, duration: 0.8,
                onComplete: () => { gsap.set('body', { opacity: 1 }); navigate('/cause') }
            })
        }, 1200)
    }

    return (
        <div className="landing-root">
            {/* Fullscreen video background */}
            <video
                className="landing-video-bg"
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
            />
            {/* Dark overlay for readability */}
            <div className="landing-video-overlay" />
            {showConfetti && (
                <Confetti
                    width={width} height={height}
                    colors={['#ff69b4', '#ff2d85', '#da70d6', '#fff', '#ffb6c1']}
                    numberOfPieces={200}
                    recycle={false}
                    style={{ zIndex: 10 }}
                />
            )}

            <div ref={cursorRef} className="landing-cursor" />

            {/* Animated background glow rings */}
            {[1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    style={{
                        position: 'fixed', borderRadius: '50%',
                        border: `1px solid rgba(255,105,180,${0.08 / i})`,
                        width: `${30 * i}vw`, height: `${30 * i}vw`,
                        left: '50%', top: '50%',
                        translateX: '-50%', translateY: '-50%',
                        zIndex: 0, pointerEvents: 'none',
                    }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                />
            ))}

            {/* Main card */}
            <motion.div
                className="landing-card"
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            >
                <motion.p
                    className="landing-pre"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    A message from my heart
                </motion.p>

                <motion.h1
                    className="landing-name"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                >
                    Akshada
                </motion.h1>

                <motion.p
                    className="landing-ily"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                >
                    I love you.
                </motion.p>

                <motion.p
                    className="landing-sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                >
                    {typed}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >|</motion.span>
                </motion.p>

                <motion.button
                    className="landing-btn"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleClick}
                >
                    Feel My Heart 💕
                </motion.button>
            </motion.div>
        </div>
    )
}
