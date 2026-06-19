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
                DESKTOP / TABLET (md and up) — unchanged
            ========================================================= */}
            <div className="hidden md:block relative bg-[#FAF7F2] min-h-screen">
                {/* ... desktop content (exactly as before) ... */}
                {/* I'm keeping the desktop code unchanged; for brevity I'll omit the full desktop code here, 
                    but in your final file, you must keep the entire desktop block unchanged. */}
                {/* For this answer, I'll show only the mobile change. */}
            </div>

            {/* =========================================================
                MOBILE ONLY (below md) — NEW Reformation-style hero
            ========================================================= */}
            <div
                className="block md:hidden relative w-full overflow-hidden"
                style={{ height: "70vh" }}
            >
                {/* Background image — full width & height */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${familyImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />

                {/* Text overlay — positioned top-left with padding */}
                <div
                    className="absolute left-0 top-0 z-10"
                    style={{
                        padding: "30px 24px",
                        maxWidth: "80%",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "2.5rem",
                            lineHeight: "1.05",
                            fontWeight: "bold",
                            color: "#000",
                            marginBottom: "8px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        If you don't
                        <br />
                        know what
                        <br />
                        to wear
                    </h1>
                    <p
                        style={{
                            fontSize: "1rem",
                            color: "#000",
                            fontWeight: 300,
                            marginBottom: "12px",
                        }}
                    >
                        try the Charlee Jean
                    </p>
                    {/* Optional: If you need a button, uncomment below */}
                    {/*
                    <a
                        href="/shop-now"
                        style={{
                            display: "inline-block",
                            padding: "10px 24px",
                            background: "#000",
                            color: "#fff",
                            borderRadius: "999px",
                            textDecoration: "none",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#333"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#000"}
                    >
                        Shop Now
                    </a>
                    */}
                </div>
            </div>

            {/* Shared styles (unchanged) */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
                .btn-primary-style { /* ... existing styles ... */ }
                .btn-ghost-style { /* ... existing styles ... */ }
                .font-serif { font-family: 'Cormorant Garamond', serif; }
            `}</style>
        </section>
    );
};

export default EditorialHero;