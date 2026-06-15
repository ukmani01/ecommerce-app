import React from 'react';
import { ArrowRight } from 'lucide-react';

// Desktop hero image (unchanged, as per "lab screen already good")
const heroDesktopImg = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1600&q=80";
// Mobile hero image – replaced with the provided Pinterest link
const heroMobileImg = "https://i.pinimg.com/1200x/de/8f/51/de8f51f92276af3990ba51c61a5a2628.jpg";

const EditorialHero = () => {
    return (
        <section className="relative bg-[#FAF7F2] overflow-hidden min-h-screen">
            {/* ===== Gradients / Atmosphere (same as before) ===== */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-black/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl" />
            </div>

            {/* ===== Desktop Hero Image (unchanged) ===== */}
            <div className="absolute inset-0 z-0 hidden md:block">
                <img
                    src={heroDesktopImg}
                    alt="Editorial fashion portrait"
                    className="w-full h-full object-cover object-[center_20%]"
                    style={{ filter: 'brightness(0.75)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent" />
            </div>

            {/* ===== Mobile Hero Image (new Pinterest image, styled like MAARA hero) ===== */}
            <div className="block md:hidden absolute inset-0 z-0">
                <img
                    src={heroMobileImg}
                    alt="Fashion editorial mobile"
                    className="w-full h-full object-cover object-center"
                    style={{ filter: 'brightness(0.7)' }}
                />
                {/* Dark overlay for text readability (matching MAARA hero) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* ===== Text Content Layer ===== */}
            {/* Desktop: original positioning; Mobile: MAARA hero style (bottom-left, like .hero-content) */}
            <div className="relative z-20 flex flex-col justify-end md:justify-center min-h-screen px-6 md:px-12 lg:pl-16 pb-24 md:pb-32 pt-32 md:pt-0">

                {/* Tag line – style matched to MAARA .hero-tag (gold/light) on mobile */}
                <div className="mb-4 md:mb-6">
                    <span className="text-[0.65rem] md:text-[0.7rem] tracking-[0.35em] uppercase text-amber-600/90 font-light font-['Jost',sans-serif] bg-white/40 backdrop-blur-sm px-4 py-1.5 border-l border-amber-700/30">
                        AW24 / / RESONANCE
                    </span>
                </div>

                {/* Main Title – MAARA's .hero-title style applied universally but mobile gets exact sizing and color */}
                <h1 className="font-serif text-[clamp(3rem,12vw,6rem)] leading-[0.95] tracking-[-0.01em] text-stone-900 mb-5 md:mb-6 max-w-4xl">
                    <span className="inline-block">FLUID</span>
                    <br />
                    <span className="italic font-light text-amber-800/90">SHADOW</span>
                </h1>

                {/* Subtitle – matches .hero-sub from MAARA */}
                <div className="max-w-md mb-8 md:mb-10">
                    <p className="text-[0.7rem] md:text-[0.75rem] tracking-[0.15em] text-stone-600/80 leading-relaxed font-light font-['Jost',sans-serif]">
                        Sculptural silhouettes, raw tactility, and the poetry of absence.
                    </p>
                </div>

                {/* Button Group – using MAARA's .btn-primary and .btn-ghost styles for mobile + desktop */}
                <div className="flex flex-wrap gap-4 items-center">
                    <a href="/your-order" className="btn-primary-style">
                        Your Order
                    </a>
                    <a href="/shop-now" className="btn-ghost-style">
                        Shop Now
                    </a>
                </div>

                {/* Metadata (price, pieces left) + Discover link – unchanged content, but mobile spacing adjusted */}
                <div className="mt-12 md:mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-stone-200/60 pt-6 max-w-3xl">
                    <div className="space-y-3">
                        <p className="font-['Jost',sans-serif] text-[0.6rem] tracking-[0.3em] text-stone-500 uppercase">
                            limited series • 12 looks
                        </p>
                        <div className="flex gap-8">
                            <div>
                                <span className="block font-serif text-2xl text-stone-800">€340</span>
                                <span className="font-['Jost',sans-serif] text-[0.65rem] tracking-wide text-stone-500">starting price</span>
                            </div>
                            <div className="w-px h-8 bg-stone-300/50 self-center" />
                            <div>
                                <span className="block font-serif text-2xl text-stone-800">05</span>
                                <span className="font-['Jost',sans-serif] text-[0.65rem] tracking-wide text-stone-500">pieces left</span>
                            </div>
                        </div>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <span className="font-['Jost',sans-serif] text-[0.7rem] tracking-[0.25em] uppercase text-stone-800 font-medium border-b border-stone-800 pb-1 group-hover:border-transparent transition-colors">
                                DISCOVER THE EDITORIAL
                            </span>
                            <ArrowRight size={16} className="text-stone-800 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.2} />
                        </div>
                        <div className="w-12 h-[1px] bg-stone-400 mt-2 group-hover:w-20 transition-all duration-500" />
                    </div>
                </div>

                {/* Credit line (sticky bottom right) – unchanged */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-12 z-30">
                    <p className="font-['Jost',sans-serif] text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] text-white/90 backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-sm">
                        PH. REN HANG · STYLED BY K. YAMAMOTO
                    </p>
                </div>

                {/* Diagonal detail – unchanged */}
                <div className="absolute top-1/4 -left-12 rotate-90 origin-left hidden lg:block opacity-40 pointer-events-none">
                    <span className="font-['Jost',sans-serif] text-[0.65rem] tracking-[0.6em] text-stone-500 uppercase whitespace-nowrap">
                        couture // fragment
                    </span>
                </div>
            </div>

            {/* Bottom gradient line – unchanged */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-stone-300/0 via-stone-400/30 to-stone-300/0" />

            {/* Styles – MAARA hero styling applied to mobile via media queries, desktop stays untouched */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        /* Base button styles (shared) */
        .btn-primary-style {
          padding: 0.85rem 2.5rem;
          background: #C9A96E;
          color: white;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          transition: background 0.3s, transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary-style:hover {
          background: #b8935a;
          transform: translateY(-1px);
        }
        .btn-ghost-style {
          padding: 0.85rem 2rem;
          background: transparent;
          color: #1C1C1C;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: 1px solid rgba(0,0,0,0.2);
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          transition: border-color 0.3s, background 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost-style:hover {
          border-color: #1C1C1C;
          background: rgba(0,0,0,0.03);
        }
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        /* ===== MOBILE-ONLY MAARA HERO STYLES ===== */
        @media (max-width: 768px) {
          /* Reposition text container to bottom-left like MAARA .hero-content */
          .relative.z-20 {
            justify-content: flex-end !important;
            padding-bottom: 5rem !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          /* Adjust tag line to match MAARA hero-tag color (gold) */
          .mb-4 span {
            color: #E8D5A3 !important;
            background: rgba(0,0,0,0.4) !important;
            border-left-color: #C9A96E !important;
            font-size: 0.6rem !important;
          }
          /* Main title – pure white on mobile (like MAARA) */
          h1 {
            color: white !important;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
          }
          h1 .italic {
            color: #E8D5A3 !important;
          }
          /* Subtitle – white with transparency */
          .max-w-md p {
            color: rgba(255,255,255,0.8) !important;
          }
          /* Buttons – adjust size and positioning */
          .btn-primary-style, .btn-ghost-style {
            padding: 0.6rem 1.5rem;
            font-size: 0.6rem;
          }
          .btn-ghost-style {
            border-color: rgba(255,255,255,0.4);
            color: white;
          }
          .btn-ghost-style:hover {
            border-color: white;
            background: rgba(255,255,255,0.1);
          }
          /* Hide metadata and discover link on mobile (to keep MAARA minimalism) – optional, but MAARA hero didn't have that extra info on mobile */
          .mt-12.md\\:mt-16 {
            display: none;
          }
          /* Credit line styling – keep as is but ensure readability */
          .absolute.bottom-6.right-6 p {
            background: rgba(0,0,0,0.5);
            font-size: 0.55rem;
          }
        }
      `}</style>
        </section>
    );
};

export default EditorialHero;