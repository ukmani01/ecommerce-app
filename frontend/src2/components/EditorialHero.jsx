import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroimg from "../heroIMG/heroimg.jpg"
// Mobile image — TODO: replace with your actual family photo path
import familyImg from "../heroIMG/heroimg2.png"

const heroDesktopImg = heroimg;

const EditorialHero = () => {
    return (
        <section className="relative overflow-hidden">

            {/* =========================================================
                DESKTOP / TABLET (md and up) — original editorial hero
                Untouched. Rendered only at md+ via hidden md:block.
            ========================================================= */}
            <div className="hidden md:block relative bg-[#FAF7F2] min-h-screen">

                {/* Gradients / Atmosphere */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-black/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl" />
                </div>

                {/* Desktop Hero Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroDesktopImg}
                        alt="Editorial fashion portrait"
                        className="w-full h-full object-cover object-[center_20%]"
                        style={{ filter: 'brightness(0.75)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent" />
                </div>

                {/* Text Content Layer */}
                <div className="relative z-20 flex flex-col justify-center min-h-screen px-12 lg:pl-16 pb-32">

                    <div className="mb-6">
                        <span className="text-[0.7rem] tracking-[0.35em] uppercase text-amber-600/90 font-light font-['Jost',sans-serif] bg-white/40 backdrop-blur-sm px-4 py-1.5 border-l border-amber-700/30">
                            AW24 / / RESONANCE
                        </span>
                    </div>

                    <h1 className="font-serif text-[clamp(3rem,12vw,6rem)] leading-[0.95] tracking-[-0.01em] text-stone-900 mb-6 max-w-4xl">
                        <span className="inline-block">FLUID</span>
                        <br />
                        <span className="italic font-light text-amber-800/90">SHADOW</span>
                    </h1>

                    <div className="max-w-md mb-10">
                        <p className="text-[0.75rem] tracking-[0.15em] text-stone-600/80 leading-relaxed font-light font-['Jost',sans-serif]">
                            Sculptural silhouettes, raw tactility, and the poetry of absence.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <a href="/your-order" className="btn-primary-style">
                            Your Order
                        </a>
                        <a href="/shop-now" className="btn-ghost-style">
                            Shop Now
                        </a>
                    </div>

                    <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-stone-200/60 pt-6 max-w-3xl">
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

                    <div className="absolute bottom-8 right-12 z-30">
                        <p className="font-['Jost',sans-serif] text-[0.7rem] tracking-[0.25em] text-white/90 backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-sm">
                            PH. REN HANG · STYLED BY K. YAMAMOTO
                        </p>
                    </div>

                    <div className="absolute top-1/4 -left-12 rotate-90 origin-left hidden lg:block opacity-40 pointer-events-none">
                        <span className="font-['Jost',sans-serif] text-[0.65rem] tracking-[0.6em] text-stone-500 uppercase whitespace-nowrap">
                            couture // fragment
                        </span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-stone-300/0 via-stone-400/30 to-stone-300/0" />
            </div>

            {/* =========================================================
                MOBILE ONLY (below md) — new minimalist family hero
                Rendered only below md via block md:hidden.
                Completely independent from the desktop block above —
                no shared classes, no media-query overrides needed.
            ========================================================= */}
            <div
                className="block md:hidden relative w-full mx-auto"
                style={{
                    height: '70vh',
                    maxWidth: '480px',
                    background: '#F4F3F1', // soft light-gray studio background
                }}
            >
                <div className="absolute inset-0 flex">

                    {/* Content area — left side, ~33% */}
                    <div className="w-[36%] flex flex-col justify-center pl-5 pr-1.5 py-10 box-border">
                        <h1 className="m-0">
                            <span
                                className="block text-black"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: 'clamp(1.3rem, 7vw, 1.55rem)',
                                    letterSpacing: '0.01em',
                                    lineHeight: 1.15,
                                }}
                            >
                                FAMILY
                            </span>
                            <span
                                className="block text-black"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: 'clamp(1.3rem, 7vw, 1.55rem)',
                                    letterSpacing: '0.01em',
                                    lineHeight: 1.15,
                                }}
                            >
                                ESSENTIALS
                            </span>
                            <span
                                className="block"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: 'clamp(0.82rem, 4vw, 0.95rem)',
                                    letterSpacing: '0.1em',
                                    color: 'rgba(0,0,0,0.62)',
                                    marginTop: '0.45rem',
                                }}
                            >
                                FOR EVERYDAY
                            </span>
                        </h1>

                        <button
                            className="mt-6 w-fit rounded-full bg-black text-white"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 500,
                                fontSize: '0.68rem',
                                letterSpacing: '0.12em',
                                padding: '0.65rem 1.3rem',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            SHOP NOW
                        </button>
                    </div>

                    {/* Image area — right side, ~64% */}
                    <div className="w-[64%] h-full flex items-end justify-center">
                        <img
                            src={familyImg}
                            alt="Family wearing everyday essentials"
                            className="h-full w-full"
                            style={{
                                objectFit: 'contain',      // keeps full body visible, no cropping
                                objectPosition: 'bottom right',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Shared styles */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&family=Outfit:wght@300;400;500;600&display=swap');

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
      `}</style>
        </section>
    );
};

export default EditorialHero;