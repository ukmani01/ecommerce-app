import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImg from '../heroIMG/heroimg.jpg'; // your local high-res image

const EditorialHero = () => {
    return (
        <section className="relative bg-[#F7F5F0] overflow-hidden min-h-[80vh] md:min-h-screen">
            {/* Mobile-only custom styles (unchanged) */}
            <style>
                {`
          @media (max-width: 768px) {
            .mobile-float-letters {
              display: inline-block;
              animation: gentleFloat 3s ease-in-out infinite;
            }
            @keyframes gentleFloat {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-4px); }
              100% { transform: translateY(0px); }
            }
            .readable-text {
              text-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .mobile-shift-up {
              transform: translateY(-10%);
              will-change: transform;
            }
            .desktop-only {
              display: none !important;
            }
            .mobile-image {
              display: block !important;
              position: absolute;
              bottom: 0;
              right: 0;
              width: 100%;
              height: auto;
              object-fit: cover;
              object-position: center;
              z-index: 0;
            }
            .mobile-buttons-container {
              position: absolute !important;
              bottom: 5rem;
              right: 1.5rem;
              display: flex !important;
              flex-direction: column;
              gap: 0.75rem;
              z-index: 30;
            }
            .btn-primary, .btn-secondary {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.5rem 1rem;
              font-size: 0.75rem;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              transition: all 0.25s ease;
              cursor: pointer;
              text-decoration: none;
              border-radius: 9999px;
              width: auto;
              min-width: 110px;
              backdrop-filter: blur(4px);
              background-color: rgba(0, 0, 0, 0.7);
              color: white;
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              animation: gentlePulse 1.5s ease-in-out 0.5s both;
            }
            .btn-secondary {
              background-color: rgba(0, 0, 0, 0.5);
              border-color: rgba(255, 255, 255, 0.3);
            }
            .btn-primary:hover, .btn-secondary:hover {
              transform: scale(1.05);
              background-color: rgba(0, 0, 0, 0.85);
              border-color: white;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            @keyframes gentlePulse {
              0% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.08); opacity: 1; box-shadow: 0 0 0 4px rgba(255,255,255,0.3); }
              100% { transform: scale(1); opacity: 1; }
            }
            .mobile-credit {
              bottom: 1rem !important;
              right: 1rem !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-only {
              display: none !important;
            }
          }
        `}
            </style>

            {/* Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-black/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl" />
            </div>

            {/* Desktop image – your local high-res image */}
            <div className="absolute bottom-0 right-0 z-0 w-full md:w-auto desktop-only">
                <img
                    src={heroImg}
                    alt="Editorial fashion portrait"
                    className="w-full md:w-auto h-auto max-h-[70vh] md:max-h-none object-cover object-[center_30%] md:object-[center_20%] md:h-[95vh] lg:h-screen xl:h-auto xl:max-h-screen drop-shadow-2xl"
                    style={{ filter: 'contrast(1.02) saturate(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F7F5F0]/20 mix-blend-multiply" />
            </div>

            {/* Mobile image – unchanged */}
            <img
                src="https://i.pinimg.com/736x/81/9f/59/819f59066477842e2dd04127b537dce3.jpg"
                alt="Fashion editorial mobile"
                className="mobile-image mobile-only"
            />

            {/* Text layer – FIXED for laptop: reduced left padding and top margin */}
            <div className="relative z-20 flex flex-col justify-start md:justify-center min-h-[80vh] md:min-h-screen px-6 md:px-12 lg:pl-16 py-6 md:py-0 lg:py-0">
                {/* Tag */}
                <div className="flex justify-end md:justify-start">
                    <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-stone-500 font-sans font-light bg-white/40 backdrop-blur-sm px-4 py-2 border-l border-stone-300">
                        AW24 / / RESONANCE
                    </span>
                </div>

                {/* Headline with mobile shift – reduced top margin on laptop */}
                <div className="max-w-3xl mt-4 md:mt-8 lg:mt-12 mobile-shift-up md:translate-y-0">
                    <h1 className="font-serif text-[clamp(2.8rem,10vw,6.2rem)] leading-[0.9] tracking-[-0.02em] text-stone-900 readable-text">
                        <span className="mobile-float-letters">FLUID</span>
                        <br />
                        <span className="italic font-light tracking-[-0.01em] mobile-float-letters" style={{ animationDelay: '0.2s' }}>SHADOW</span>
                    </h1>

                    {/* Desktop text lines */}
                    <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-8 mt-5 md:mt-6 desktop-only">
                        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 readable-text">
                            — The Unseen Line
                        </p>
                        <p className="font-sans text-xs md:text-sm text-stone-600 max-w-xs leading-relaxed font-light readable-text">
                            Sculptural silhouettes, raw tactility, and the poetry of absence.
                        </p>
                    </div>
                </div>

                {/* Desktop metadata and CTA – reduced top margin */}
                <div className="mt-8 md:mt-10 lg:mt-12 flex flex-wrap items-end justify-between gap-6 desktop-only">
                    <div className="space-y-3">
                        <p className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] text-stone-400 uppercase">
                            limited series • 12 looks
                        </p>
                        <div className="flex gap-6 md:gap-10">
                            <div>
                                <span className="block font-serif text-xl md:text-2xl text-stone-800">€340</span>
                                <span className="font-sans text-[8px] md:text-[9px] tracking-wide text-stone-400">starting price</span>
                            </div>
                            <div className="w-px h-6 md:h-8 bg-stone-200 self-center" />
                            <div>
                                <span className="block font-serif text-xl md:text-2xl text-stone-800">05</span>
                                <span className="font-sans text-[8px] md:text-[9px] tracking-wide text-stone-400">pieces left</span>
                            </div>
                        </div>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="font-sans text-[11px] md:text-sm tracking-[0.15em] uppercase text-stone-800 font-medium border-b border-stone-800 pb-1 group-hover:border-transparent transition-colors duration-300">
                                DISCOVER THE EDITORIAL
                            </span>
                            <ArrowRight size={18} className="text-stone-800 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.2} />
                        </div>
                        <div className="w-12 h-[1px] bg-stone-400 mt-2 group-hover:w-20 transition-all duration-500" />
                    </div>
                </div>

                {/* Mobile buttons – unchanged */}
                <div className="mobile-buttons-container mobile-only">
                    <a href="/your-order" className="btn-primary">
                        Your Order
                    </a>
                    <a href="/shop-now" className="btn-secondary">
                        Shop Now
                    </a>
                </div>

                {/* Credit – unchanged */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-12 z-30 text-right md:text-left mobile-credit">
                    <p className="font-sans text-[8px] md:text-[10px] tracking-[0.25em] text-white/80 backdrop-blur-sm bg-black/20 px-2 py-1 md:px-3 md:py-1.5 inline-block rounded-sm">
                        PH. REN HANG · STYLED BY K. YAMAMOTO
                    </p>
                </div>

                {/* Diagonal detail desktop */}
                <div className="absolute top-1/4 -left-12 rotate-90 origin-left hidden lg:block opacity-40">
                    <span className="font-sans text-[10px] tracking-[0.6em] text-stone-400 uppercase whitespace-nowrap">
                        couture // fragment
                    </span>
                </div>
            </div>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-stone-300/0 via-stone-400/30 to-stone-300/0" />
        </section>
    );
};

export default EditorialHero;