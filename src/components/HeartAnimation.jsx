import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.9, 0.2) },
            colors: ['#ff007f', '#ff0000', '#ffccd5']
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.9, 0.2) },
            colors: ['#ff007f', '#ff0000', '#ffccd5']
        });
    }, 250);
};

export const FloatingHearts = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute text-pink-300 opacity-30 animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        fontSize: `${Math.random() * 2 + 1}rem`,
                    }}
                >
                    {['❤️', '💖', '💕', '🌹'][Math.floor(Math.random() * 4)]}
                </div>
            ))}
        </div>
    );
};

export const CursorHearts = () => {
    const [hearts, setHearts] = useState([]);
    const lastCreatedRef = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            createHeart(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            createHeart(touch.clientX, touch.clientY);
        };

        const createHeart = (x, y) => {
            const now = Date.now();
            // User requested MORE hearts/time, so we reduce throttle significantly or remove it
            // A small throttle (20ms) keeps performance okay while looking "smooth" like a trail
            if (now - lastCreatedRef.current < 20) return;
            lastCreatedRef.current = now;

            const id = now + Math.random();
            const newHeart = {
                id,
                x,
                y,
                // ONLY hearts as requested
                emoji: ['❤️', '💖', '💕', '💗', '💓'][Math.floor(Math.random() * 5)],
                velocity: { x: (Math.random() - 0.5) * 2, y: -Math.random() * 2 - 1 },
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
                rotation: Math.random() * 360
            };
            setHearts(prev => [...prev, newHeart]);

            // Clean up after animation duration (3000ms as requested)
            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id));
            }, 3000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="absolute pointer-events-none animate-float-up-fade"
                    style={{
                        left: heart.x,
                        top: heart.y,
                        transform: `translate(-50%, -50%) rotate(${heart.rotation}deg) scale(${heart.scale})`,
                        fontSize: '1.5rem',
                        // Simple inline animation fallback if CSS class isn't enough
                        transition: 'opacity 1s ease-out, transform 1s ease-out',
                        opacity: 0 // handled by animation
                    }}
                >
                    {heart.emoji}
                </div>
            ))}
        </div>
    );
};
