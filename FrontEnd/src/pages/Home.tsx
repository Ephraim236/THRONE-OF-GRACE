import { useCallback, useEffect, useState } from 'react';
import churchLogo from '../assets/church-logo-2.png';
import pastorImage from '../assets/Picture1.png';
import slide1 from '../assets/IMG_3513.jpg';
import slide2 from '../assets/IMG_3746.jpg';
import slide3 from '../assets/IMG_5841.jpg';
import slide4 from '../assets/IMG_5851.jpg';
import slide5 from '../assets/IMG_6889.jpg';
import slide6 from '../assets/IMG_7459.jpg';

const heroSlides = [
  { src: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&h=900&fit=crop&auto=format', alt: 'Church interior' },
  { src: slide1, alt: 'Ministry life' },
  { src: slide2, alt: 'Ministry life' },
  { src: slide3, alt: 'Ministry life' },
  { src: slide4, alt: 'Ministry life' },
  { src: slide5, alt: 'Ministry life' },
  { src: slide6, alt: 'Ministry life' },
];

const SLIDE_INTERVAL = 6000;

const dailyMessages = [
  {
    date: 'October 18, 2026',
    category: 'Sunday Service',
    title: 'Walking by Faith: Trusting God in Uncertain Times',
    duration: '42 min',
    excerpt: 'In a world full of uncertainty, how do we maintain our faith when everything around us seems unstable? Today\'s message explores how walking by faith—rather than by sight—anchors our souls in the unchanging character of God. We look at the life of Abraham as a model of trust, and learn how to cultivate deeper reliance on God’s promises even when the path ahead is unclear.',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
  },
  {
    date: 'October 17, 2026',
    category: 'Evening Worship',
    title: 'The Power of a Surrendered Life',
    duration: '35 min',
    excerpt: 'What does it mean to truly surrender our lives to Christ? This message dives into Romans 12:1-2, calling us to present our bodies as living sacrifices. When we surrender our will, our dreams, and our plans to God, we unlock the fullness of His purpose for our lives. Discover how surrender is not loss, but the path to true fulfillment and spiritual transformation.',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
  },
  {
    date: 'October 16, 2026',
    category: 'Mid-Week Bible Study',
    title: 'Prayer: Communicating with the Divine',
    duration: '28 min',
    excerpt: 'Prayer is the heartbeat of a believer’s relationship with God. Yet so often we struggle with how to pray, what to pray, and whether God is truly listening. In this study, we explore the Lord’s Prayer as a template for powerful, meaningful conversation with our Heavenly Father.',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
  },
  {
    date: 'October 15, 2026',
    category: 'Sunday Service',
    title: 'Grace Upon Grace: The Overflow of God\'s Mercy',
    duration: '38 min',
    excerpt: 'We are saved by grace through faith, and not by works, lest anyone should boast. But what does this grace look like in our daily walk? Join us as we discover how God\'s grace doesn\'t just save us—it sustains us, transforms us, and compels us to extend that same grace to others.',
    videoUrl: 'https://www.youtube.com/watch?v=example4',
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent((index + heroSlides.length) % heroSlides.length);
  }, []);

  return (
    <>
      <section id="home" className="relative min-h-svh flex items-center justify-center overflow-hidden bg-[#081e26]">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${slide.src})`, opacity: i === current ? 1 : 0 }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
        <div className="absolute inset-0 bg-[#081e26]" style={{ opacity: 0.65 }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <img src={churchLogo} alt="Throne of Grace Outreach Ministry Logo"
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full"
          />
          <p className="text-sm font-medium tracking-[0.25em] uppercase mb-4" style={{ color: '#c9951a' }}>
            Welcome to
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white">
            Throne of Grace<br />
            <span style={{ color: '#c9951a' }}>Outreach Ministry</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-2 font-light">To-Go Chapel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href="/events"
              className="px-8 py-3.5 rounded-md text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: '#8b5a2b', color: '#f8f5f0' }}>
              Upcoming Services
            </a>
            <a href="/about"
              className="px-8 py-3.5 rounded-md text-sm font-semibold border transition-all duration-200 hover:bg-[#8b5a2b] hover:text-[#f8f5f0]"
              style={{ border: '1px solid #d7ccc8', color: '#f8f5f0' }}>
              Learn More
            </a>
          </div>
          <p className="text-base md:text-lg text-[#e0e8ec] max-w-2xl mx-auto mb-10 leading-relaxed">
            A community built on faith, grace, and the transforming power of God's Word.
            Join us as we reach the world — one soul at a time.
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '1.75rem' : '0.5rem',
                background: i === current ? '#c9951a' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </section>

    <section className="py-20 px-6 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="flex justify-center lg:justify-end">
             <div className="w-80 md:w-[28rem] max-w-full">
               <img
                 src={pastorImage}
                 alt="Reverend Peter Donkor"
                 className="w-full h-auto object-contain rounded-lg shadow-lg"
               />
             </div>
           </div>
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: '#8b5a2b' }}>
              Meet Our Pastor
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#5d4037] mb-6 leading-tight">
              Reverend Peter Donkor
            </h2>
            <p className="text-sm text-[#6d4c41] font-medium mb-4">
              Founder &amp; General Overseer
            </p>
            <p className="text-[#5d4037] leading-relaxed mb-5 text-lg">
              Rev. Peter Donkor is the Founder and General Overseer of Throne of Grace Outreach Ministry.
              Through God's divine calling, he established the ministry with a clear mandate to preach the Gospel, disciple believers, and establish churches that faithfully proclaim biblical truth.
            </p>
            <p className="text-[#5d4037] leading-relaxed mb-5 text-lg">
              As the spiritual father of the ministry, Rev. Peter Donkor continues to provide visionary leadership, doctrinal guidance, and pastoral oversight. His ministry is characterized by a passion for soul winning, sound biblical teaching, prayer, leadership development, and raising ministers who faithfully serve God's Kingdom.
            </p>
            <p className="text-[#5d4037] leading-relaxed mb-8 text-lg">
              Under his leadership, Throne of Grace Outreach Ministry has experienced steady spiritual growth while remaining firmly committed to its founding vision.
            </p>
            <a href="/about"
              className="inline-block px-8 py-3 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: '#8b5a2b' }}>
              Learn More About Our Ministry
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 bg-[#f5f0e9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: '#8b5a2b' }}>
              Daily Bread
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#5d4037]">
              Daily Messages & Preachings
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {dailyMessages.map((msg, i) => (
              <div key={i} className="border border-[#d7ccc8] rounded-lg p-6"
                style={{ background: '#ffffff' }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#8b5a2b' }}>
                      {msg.date} · {msg.category}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-[#5d4037] leading-tight">{msg.title}</h3>
                  </div>
                  <span className="flex-shrink-0 text-xs px-3 py-1 rounded-md font-medium"
                    style={{ background: '#f0e5dc', color: '#8b5a2b', border: '1px solid #e0d0c0' }}>
                    {msg.duration}
                  </span>
                </div>
                <p className="text-[#6d4c41] leading-relaxed text-sm mb-4">
                  {msg.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <a href={msg.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#6d4c41]"
                    style={{ color: '#8b5a2b' }}>
                    Watch Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6h4v12H10V6zm14 5l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/messages"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: '#8b5a2b', color: '#f8f5f0' }}>
              View All Messages
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
