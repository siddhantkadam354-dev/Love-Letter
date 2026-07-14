import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import '../styles/scrollstory.css'

// Import all 4 scroll videos
import scroll1 from '../assets/scroll1.mp4'
import scroll2 from '../assets/scroll2.mp4'
import scroll3 from '../assets/scroll3.mp4'
import scroll4 from '../assets/scroll4.mp4'
import scroll5 from '../assets/scroll5.mp4'
import scroll6 from '../assets/scroll6.mp4'
import scroll7 from '../assets/scroll7.mp4'

// ── Story chapters — content from the love letter ──
const chapters = [
    {
        video: scroll1,
        number: 'Chapter I',
        title: 'The Moment Everything Shifted',
        quote:
            'The moment I first really looked at you, something in me shifted forever. That was the day my heart quietly gave in — and understood you were someone truly special.',
    },
    {
        video: scroll2,
        number: 'Chapter II',
        title: 'Every Part of Me, Seen',
        quote:
            "You've witnessed every part of me — the flaws, the weak moments, the mistakes, and the better side too. This vulnerability, this openness, this love — I've kept it only for you.",
    },
    {
        video: scroll3,
        number: 'Chapter III',
        title: 'A Bond Beyond Coincidence',
        quote:
            '"What we share isn\'t luck — it\'s a choice I make again every single morning." A connection that asks for no performance, no explanations. Just the two of us. Just this.',
    },
    {
        video: scroll4,
        number: 'Chapter IV',
        title: 'Loving You Needs No Reason',
        quote:
            "There's no habit and no reason behind loving you — it's simply what I choose, every single day, hoping you always feel loved, valued and respected.",
    },
    {
        video: scroll5,
        number: 'Chapter V',
        title: 'Beyond What Words Can Hold',
        quote:
            "I can't put into words exactly what I feel when I'm with you. All I know is I want to pour out every bit of love inside me. There's no hidden reason — it's just my heart, loving you.",
    },
    {
        video: scroll6,
        number: 'Chapter VI',
        title: 'Wishing You a Beautiful Life',
        quote:
            'No matter what struggles life brought, all I ever wished for was a beautiful life for you — a thriving career, a heart full of pride, and a soul that finally feels at peace.',
    },
    {
        video: scroll7,
        number: 'Chapter VII',
        title: 'Always, In Every Lifetime',
        quote:
            '"Across a hundred lifetimes, a hundred worlds, in every version of reality — I would still choose you." Thank you for being who you are. Thank you for existing. Thank you for this love we share.',
        isLast: true,
    },
]

function Chapter({ chapter, index, isActive, isLast, onNext }) {
    const videoRef = useRef(null)
    const sectionRef = useRef(null)

    // play/pause video on active change — load() first so later videos work
    useEffect(() => {
        if (!videoRef.current) return
        if (isActive) {
            // Force load if not loaded yet (fixes videos 5-7 on first visit)
            if (videoRef.current.readyState === 0) {
                videoRef.current.load()
            }
            videoRef.current.play().catch(() => { })
        } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isActive])

    return (
        <div
            ref={sectionRef}
            className={`chapter ${isActive ? 'active' : ''}`}
            data-index={index}
        >
            {/* Video */}
            <video
                ref={videoRef}
                className="chapter-video"
                src={chapter.video}
                loop
                muted
                playsInline
                preload="none"
            />

            {/* Vignette */}
            <div className="chapter-overlay" />

            {/* Content */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="chapter-content"
                        key={`content-${index}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                    >
                        <motion.span
                            className="chapter-number"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {chapter.number}
                        </motion.span>

                        <motion.h2
                            className="chapter-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                        >
                            {chapter.title}
                        </motion.h2>

                        <motion.p
                            className="chapter-quote"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            {chapter.quote}
                        </motion.p>

                        {isLast && (
                            <motion.button
                                className="next-page-btn"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onNext}
                            >
                                Check Our Gallery 📸
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll hint on first chapter */}
            {index === 0 && isActive && (
                <div className="scroll-hint">
                    <span>Scroll</span>
                    <svg viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            )}
        </div>
    )
}

export default function ScrollStoryPage() {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef(null)
    const isScrolling = useRef(false)

    // ── Always start from top / Chapter I on mount ──
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    // IntersectionObserver — watch each .chapter div
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const idx = Number(entry.target.dataset.index)
                        setActiveIndex(idx)
                    }
                })
            },
            { threshold: 0.5 }
        )

        const chapters = containerRef.current?.querySelectorAll('.chapter')
        chapters?.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const scrollToChapter = (idx) => {
        if (isScrolling.current) return
        isScrolling.current = true
        const els = containerRef.current?.querySelectorAll('.chapter')
        els?.[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => { isScrolling.current = false }, 1000)
    }

    // Smooth keyboard navigation
    useEffect(() => {
        const onKey = (e) => {
            if (isScrolling.current) return
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault()
                scrollToChapter(Math.min(activeIndex + 1, chapters.length - 1))
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                scrollToChapter(Math.max(activeIndex - 1, 0))
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [activeIndex])

    const handleNext = () => {
        gsap.to('body', {
            opacity: 0, duration: 0.8,
            onComplete: () => { gsap.set('body', { opacity: 1 }); navigate('/gallery') }
        })
    }

    return (
        <>
            {/* fixed progress dots */}
            <div className="scroll-progress">
                {chapters.map((_, i) => (
                    <div
                        key={i}
                        className={`progress-dot ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => scrollToChapter(i)}
                    />
                ))}
            </div>

            {/* Chapters */}
            <div ref={containerRef} className="scroll-story">
                {chapters.map((ch, i) => (
                    <Chapter
                        key={i}
                        chapter={ch}
                        index={i}
                        isActive={i === activeIndex}
                        isLast={!!ch.isLast}
                        onNext={handleNext}
                    />
                ))}
            </div>
        </>
    )
}
