import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import Button from '../components/Button';
import { FloatingHearts, CursorHearts, triggerConfetti } from '../components/HeartAnimation';

const Valentine = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const [noBtnPosition, setNoBtnPosition] = useState({ top: '60%', left: '60%' });
    const [isMoved, setIsMoved] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const noBtnRef = useRef(null);

    const phrases = [
        "No 😢",
        "Are you sure? 🥺",
        "Please no 🥺",
        "Think again! 💭",
        "Last chance! ⚠️",
        "Surely not? 😖",
        "You might regret this! 🙉",
        "Give it another thought! 🤔",
        "Are you absolutely certain? 🧐",
        "This could be a mistake! 😬",
        "Have a heart! ❤️",
        "Don't be so cold! ❄️",
        "Change your mind? 🥲",
        "I wouldn't say no! 😉",
        "Okay… maybe? 😳",
        "Stop clicking! 😤"
    ];

    const toObj = {
        to: query.get('to') || 'My Love',
        from: query.get('from') || 'Secret Admirer',
        emoji: query.get('emoji') || '❤️',
        img: query.get('img') || null
    };

    const name = toObj.to;
    const from = toObj.from;
    const emoji = toObj.emoji;

    const moveButton = () => {
        if (noBtnRef.current) {
            const btnRect = noBtnRef.current.getBoundingClientRect();
            // Use actual dimensions
            const btnWidth = btnRect.width;
            const btnHeight = btnRect.height;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Safe boundaries (padding from edges)
            const padding = 20;
            const maxLeft = viewportWidth - btnWidth - padding;
            const maxTop = viewportHeight - btnHeight - padding;

            // Movement Logic: Smaller of (600px OR 80% of screen dimension)
            const maxMoveX = Math.min(600, viewportWidth * 0.8);
            const maxMoveY = Math.min(600, viewportHeight * 0.8);

            // Generate relative movement (-maxMove to +maxMove)
            // We favor larger moves to make it feel "evasive" but keep it catchable
            const randomDeltaX = (Math.random() - 0.5) * 2 * maxMoveX;
            const randomDeltaY = (Math.random() - 0.5) * 2 * maxMoveY;

            // Calculate potential new position
            let newLeft = btnRect.left + randomDeltaX;
            let newTop = btnRect.top + randomDeltaY;

            // Clamp to safe area ensures it NEVER leaves the screen
            newLeft = Math.max(padding, Math.min(newLeft, maxLeft));
            newTop = Math.max(padding, Math.min(newTop, maxTop));

            setNoBtnPosition({
                left: `${newLeft}px`,
                top: `${newTop}px`,
                position: 'fixed'
            });
            setIsMoved(true);
            setPhraseIndex(prev => (prev + 1) % phrases.length);
        }
    };

    const handleYes = () => {
        triggerConfetti();
        // Pass existing params to accepted page
        const params = new URLSearchParams();
        params.set('to', toObj.to);
        params.set('from', toObj.from);
        if (toObj.img) params.set('img', toObj.img);

        navigate(`/accepted?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-pink-200">
            <FloatingHearts />
            <CursorHearts />

            <div className="z-10 text-center max-w-lg w-full animate-fade-in-up">
                {toObj.img && (
                    <div className="mb-6 flex justify-center">
                        <img src={toObj.img} alt="Us" className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg animate-pulse-slow" />
                    </div>
                )}

                <h2 className="text-2xl md:text-3xl font-medium text-pink-500 mb-2">Hey {name} {emoji}</h2>
                <p className="text-lg text-gray-600 mb-8 italic">{from} has an important question...</p>

                <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-12 drop-shadow-sm leading-tight">
                    Will you be my Valentine? 🌹
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative h-40 md:h-auto w-full px-4">
                    <Button
                        onClick={handleYes}
                        className="text-xl md:text-2xl px-10 py-4 shadow-xl shadow-pink-300/50 animate-bounce-subtle z-20 w-full md:w-auto"
                    >
                        YES! 😍
                    </Button>

                    <button
                        ref={noBtnRef}
                        style={isMoved ? { position: 'fixed', top: noBtnPosition.top, left: noBtnPosition.left, transition: 'all 0.3s ease-out', zIndex: 50 } : {}}
                        onMouseEnter={moveButton}
                        onTouchStart={moveButton}
                        className="px-8 py-3 bg-white text-gray-500 rounded-full font-medium shadow hover:bg-gray-100 transition-colors z-20 whitespace-nowrap min-w-[120px]"
                    >
                        {phrases[phraseIndex]}
                    </button>
                </div>
            </div>

            <div className="fixed bottom-4 text-xs text-pink-300 opacity-50">
                Made with ❤️ by {from}
            </div>
        </div>
    );
};

// Add some custom keyframes safely using style injection if index.css customization is limited
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  .animate-float {
    animation: float 10s linear infinite;
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite ease-in-out;
  }
`;
document.head.appendChild(styleSheet);

export default Valentine;
