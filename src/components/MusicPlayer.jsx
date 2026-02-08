import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // A softer, more "lovely" romantic track
    const songUrl = "https://cdn.pixabay.com/download/audio/2024/01/16/audio_e2b99229a4.mp3?filename=romantic-piano-wedding-love-story-cinematic-background-music-185445.mp3";

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Playback failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Attempt auto-play on mount (often blocked by browsers until interaction)
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Auto-play was prevented
                    setIsPlaying(false);
                });
            }
        }

        // Add global click listener to unlock audio context if needed
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused && !isPlaying) {
                // Optional: one-time play on first click if that's desired behavior
                // audioRef.current.play(); 
                // setIsPlaying(true);
            }
        };

        document.addEventListener('click', handleInteraction, { once: true });
        return () => document.removeEventListener('click', handleInteraction);
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio ref={audioRef} src={songUrl} loop />
            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-pink-200 text-pink-500 hover:bg-pink-50 transition-all hover:scale-110 animate-fade-in"
            >
                {isPlaying ? '🎵' : '🔇'}
            </button>
        </div>
    );
};

export default MusicPlayer;
