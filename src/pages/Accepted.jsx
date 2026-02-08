import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import Button from '../components/Button';
import { FloatingHearts, CursorHearts, triggerConfetti } from '../components/HeartAnimation';

const Accepted = () => {
    const query = useQuery();
    const navigate = useNavigate();

    useEffect(() => {
        triggerConfetti();
        const interval = setInterval(() => {
            triggerConfetti();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toObj = {
        to: query.get('to') || 'My Love',
        from: query.get('from') || 'Secret Admirer',
        img: query.get('img') || null
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <FloatingHearts />
            <CursorHearts />

            <div className="z-10 text-center animate-fade-in-up w-full max-w-lg">
                <div className="mb-8 relative inline-block">
                    <div className="text-9xl animate-heartbeat drop-shadow-2xl">
                        💖
                    </div>
                    {toObj.img && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg animate-pulse">
                            <img src={toObj.img} alt="Us" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4 drop-shadow-sm">
                    Yayyy! 💕
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                    <span className="text-pink-500 font-bold">{toObj.to}</span> said YES to <span className="text-blue-500 font-bold">{toObj.from}</span>!
                </p>

                <div className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-pink-100 mb-8 max-w-sm mx-auto">
                    <p className="text-gray-600 text-sm italic">
                        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."
                    </p>
                </div>

                <div className="flex flex-col gap-4 items-center">
                    {/* <Button onClick={() => navigate('/')} variant="secondary" className="px-8">
                        Create Your Own Link 💌
                    </Button> */}
                    <p className="text-xs text-gray-400 mt-4">Screenshot this and send it to {toObj.from}! 📸</p>
                </div>
            </div>
        </div>
    );
};

export default Accepted;
