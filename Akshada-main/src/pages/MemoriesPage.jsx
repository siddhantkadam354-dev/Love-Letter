import { motion } from 'framer-motion'
import '../styles/memories.css'
import d1 from '../assets/d1.jpg'
import d2 from '../assets/d2.jpg'
import d3 from '../assets/d3.jpg'
import iluVideo from '../assets/ILU.mp4'

const photos = [
    {
        img: d1,
        label: 'The Way You Look at Me 🌙',
        caption: 'There are a thousand things I could say, but nothing compares to the feeling of being seen by you. You look at me like I matter — and somehow, that is everything.',
    },
    {
        img: d2,
        label: 'In the Ordinary Moments ☕',
        caption: 'It is not the grand gestures I will remember. It is the quiet in-between moments — the ones nobody else notices — where I feel most at home with you.',
    },
    {
        img: d3,
        label: 'Always, Without Reason ♾️',
        caption: 'I do not love you because everything is perfect. I love you because even in the imperfect, uncertain, and messy parts of life — you are still the one I choose.',
    },
]

const hearts = [
    { e: '💝', dur: '7s', delay: '0s', tx: '25px', left: '8%' },
    { e: '💖', dur: '9s', delay: '1.5s', tx: '-30px', left: '22%' },
    { e: '🌸', dur: '8s', delay: '3s', tx: '40px', left: '48%' },
    { e: '💓', dur: '6s', delay: '4s', tx: '-25px', left: '68%' },
    { e: '✨', dur: '10s', delay: '2s', tx: '30px', left: '84%' },
    { e: '💕', dur: '7.5s', delay: '5s', tx: '-15px', left: '35%' },
]

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.2, duration: 0.7, ease: 'easeOut' }
    }),
}

export default function MemoriesPage() {
    return (
        <div className="mem-root">
            {/* ILU.mp4 fullscreen background video */}
            <video
                className="mem-bg-video"
                src={iluVideo}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="mem-bg-overlay" />

            {/* Sparkle layer */}
            <div className="mem-sparkle" />

            {/* Floating hearts */}
            <div className="mem-hearts">
                {hearts.map((h, i) => (
                    <div
                        key={i}
                        className="mem-heart"
                        style={{
                            '--dur': h.dur,
                            '--delay': h.delay,
                            '--tx': h.tx,
                            left: h.left,
                        }}
                    >
                        {h.e}
                    </div>
                ))}
            </div>

            {/* Hero */}
            <motion.section
                className="mem-hero"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
            >
                <h1>I Love You, Akshada 💌</h1>
                <p>"Some people come into your life and quietly become the reason everything feels worth it. You are that person for me — and I hope you always know that."</p>
            </motion.section>

            {/* Photo cards */ }
            <div className="mem-gallery">
                {photos.map((p, i) => (
                    <motion.div
                        key={i}
                        className="mem-card"
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img src={p.img} alt={p.label} />
                        <div className="mem-card-label">{p.label}</div>
                        <div className="mem-card-caption">{p.caption}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
