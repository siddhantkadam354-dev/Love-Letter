import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import '../styles/gallery.css'
import galleryBg from '../assets/gallrybg.jpg'

// ── Auto-load all gallery images ──
const imageModules = import.meta.glob('../assets/gallery*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', { eager: true })
const allImages = Object.entries(imageModules)
    .sort(([a], [b]) => {
        const numA = parseInt(a.match(/gallery(\d+)/)?.[1] || 0)
        const numB = parseInt(b.match(/gallery(\d+)/)?.[1] || 0)
        return numA - numB
    })
    .map(([, m]) => m.default)

// ── Chapter definitions ──
const CHAPTERS = [
    { label: 'Chapter I', title: 'Where It All Began', count: 5 },
    { label: 'Chapter II', title: 'The Quiet Moments', count: 5 },
    { label: 'Chapter III', title: 'When You Smile Like That', count: 5 },
    { label: 'Chapter IV', title: 'All the In-Betweens', count: 5 },
    { label: 'Chapter V', title: 'My Favourite View', count: null },
]

function buildChapterGroups(images) {
    const groups = []
    let idx = 0
    for (const ch of CHAPTERS) {
        const count = ch.count === null ? images.length - idx : ch.count
        const slice = images.slice(idx, idx + count)
        if (slice.length > 0) groups.push({ ...ch, images: slice, startIdx: idx })
        idx += count
    }
    return groups
}

// Random tilt values per photo — stable across renders
const TILTS = Array.from({ length: 200 }, () => {
    const v = (Math.random() * 6 - 3).toFixed(2)
    return `${v}deg`
})

// Random heart sticker on ~30% of photos
const HAS_HEART = Array.from({ length: 200 }, () => Math.random() < 0.3)
const HAS_PIN = Array.from({ length: 200 }, () => Math.random() < 0.2)

// ── Sparkle dots background ──
const SPARKLES = Array.from({ length: 30 }, () => ({
    w: Math.random() * 3 + 1.5,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    dur: `${Math.random() * 4 + 3}s`,
    delay: `${Math.random() * 5}s`,
}))

// ── Lightbox ──
function Lightbox({ images, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex)
    const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), [])
    const next = useCallback(() => setCurrent(c => Math.min(images.length - 1, c + 1)), [images.length])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [prev, next, onClose])

    return (
        <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div className="lightbox-toolbar" onClick={e => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose}>✕ Close</button>
                <span className="lightbox-counter">{current + 1} of {images.length}</span>
                <span style={{ width: 70 }} />
            </div>

            <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        src={images[current]}
                        alt=""
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.25 }}
                        draggable={false}
                    />
                </AnimatePresence>
            </div>

            {current > 0 && (
                <button className="lightbox-nav prev" onClick={e => { e.stopPropagation(); prev() }}>
                    <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
            )}
            {current < images.length - 1 && (
                <button className="lightbox-nav next" onClick={e => { e.stopPropagation(); next() }}>
                    <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
            )}

            <div className="lightbox-caption">
                every picture carries a feeling only we can understand 💜
            </div>
        </motion.div>
    )
}

// ── Main Page ──
export default function GalleryPage() {
    const navigate = useNavigate()
    const [lightbox, setLightbox] = useState(null)
    const chapterGroups = buildChapterGroups(allImages)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [])

    const handleNext = () => {
        gsap.to('body', {
            opacity: 0, duration: 0.7,
            onComplete: () => { gsap.set('body', { opacity: 1 }); navigate('/memories') }
        })
    }

    if (allImages.length === 0) {
        return (
            <div className="gallery-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                    <p>Add images as <code style={{ color: '#ff69b4' }}>gallery1.jpg</code>, <code style={{ color: '#ff69b4' }}>gallery2.jpg</code>... to <code style={{ color: '#ff69b4' }}>src/assets/</code></p>
                </div>
            </div>
        )
    }

    return (
        <div className="gallery-root">
            {/* Background Image with low opacity */}
            <div className="gallery-bg" style={{ backgroundImage: `url(${galleryBg})` }} />
            <div className="gallery-bg-overlay" />

            {/* Sparkle background dots */}
            <div className="gallery-sparkles">
                {SPARKLES.map((s, i) => (
                    <div
                        key={i}
                        className="gallery-sparkle-dot"
                        style={{
                            width: s.w, height: s.w,
                            left: s.left, top: s.top,
                            '--dur': s.dur, '--delay': s.delay,
                        }}
                    />
                ))}
            </div>

            {/* Hero title */}
            <motion.div
                className="gallery-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="gallery-hero-title">Our Memories 📷💜</div>
                <div className="gallery-hero-sub">some moments are too beautiful to ever forget</div>
            </motion.div>

            {/* Chapters */}
            {chapterGroups.map((ch, ci) => (
                <div key={ci}>
                    {/* Chapter heading */}
                    <motion.div
                        className="gallery-chapter-heading"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="gallery-chapter-num">{ch.label}</div>
                        <div className="gallery-chapter-name">✦ {ch.title} ✦</div>
                        <div className="gallery-chapter-line" />
                    </motion.div>

                    {/* Polaroid grid */}
                    <div className="polaroid-grid">
                        {ch.images.map((src, pi) => {
                            const absIdx = ch.startIdx + pi
                            return (
                                <motion.div
                                    key={pi}
                                    className="polaroid"
                                    style={{ '--tilt': TILTS[absIdx] }}
                                    initial={{ opacity: 0, y: 30, rotate: TILTS[absIdx] }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: pi * 0.06, duration: 0.5, ease: 'easeOut' }}
                                    onClick={() => setLightbox(absIdx)}
                                >
                                    <img src={src} alt="" loading="lazy" />
                                    <div className="polaroid-caption">
                                        {absIdx + 1} / {allImages.length}
                                    </div>
                                    {HAS_HEART[absIdx] && (
                                        <div className="polaroid-heart">💕</div>
                                    )}
                                    {HAS_PIN[absIdx] && (
                                        <div className="polaroid-pin" />
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            ))}

            {/* Continue button */}
            <motion.div
                className="gallery-continue"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <p>there is still one more thing left to say...</p>
                <motion.button
                    className="gallery-continue-btn"
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                >
                    Read My Letter 💌
                </motion.button>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <Lightbox
                        images={allImages}
                        startIndex={lightbox}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
