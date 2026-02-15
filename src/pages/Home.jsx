import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FloatingHearts, CursorHearts } from '../components/HeartAnimation';

const Home = () => {
    const [formData, setFormData] = useState({
        name: '',
        partner: '',
        emoji: '❤️',
        image: null
    });
    const [isUploading, setIsUploading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const emojis = ['❤️', '💖', '💕', '🌹', '🐻', '🥺', '✨', '💍'];

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/degstwskz/image/upload`;
        const uploadPreset = 'AnniversarySp';

        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: uploadData,
            });
            const data = await response.json();

            if (data.secure_url) {
                setFormData(prev => ({ ...prev, image: data.secure_url }));
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
            alert("Photo upload failed. Please try again or use a different image.");
        } finally {
            setIsUploading(false);
        }
    };

    const generateLink = () => {
        if (!formData.name || !formData.partner) return;

        const params = new URLSearchParams();
        params.set('from', formData.name);
        params.set('to', formData.partner);
        params.set('emoji', formData.emoji);
        if (formData.image) {
            params.set('img', formData.image);
        }

        const url = `${window.location.origin}/valentine?${params.toString()}`;
        setGeneratedLink(url);
        setShowPreview(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('Link copied! Send it to your valentine! 💌');
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <FloatingHearts />
            <CursorHearts />

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-md z-10 border border-pink-100">
                <h1 className="text-3xl font-bold text-pink-600 mb-2 text-center">Valentine Generator 💘</h1>
                <p className="text-gray-600 text-center mb-6">Create a special link to ask your valentine!</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Your Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Romeo"
                            className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 font-medium placeholder-gray-400"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Partner's Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Juliet"
                            className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 font-medium placeholder-gray-400"
                            value={formData.partner}
                            onChange={e => setFormData({ ...formData, partner: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Select Emoji</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {emojis.map(emoji => (
                                <button
                                    key={emoji}
                                    onClick={() => setFormData({ ...formData, emoji })}
                                    className={`text-2xl p-2 rounded-full hover:bg-pink-100 transition ${formData.emoji === emoji ? 'bg-pink-200 scale-110' : ''}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-1">Add Photo (Optional)</label>
                        <div className="relative border-2 border-dashed border-pink-300 rounded-lg p-4 text-center cursor-pointer hover:bg-pink-50 transition">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isUploading}
                            />
                            {isUploading ? (
                                <div className="flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mb-2"></div>
                                    <p className="text-pink-500 text-xs font-medium">Uploading to the clouds... ✨</p>
                                </div>
                            ) : formData.image ? (
                                <div className="relative">
                                    <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover mx-auto rounded-full ring-2 ring-pink-400" />
                                    <span className="text-xs text-pink-500 mt-2 block">Click to change</span>
                                </div>
                            ) : (
                                <p className="text-gray-500">Tap to upload a cute photo 📸</p>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={generateLink}
                        className={`w-full ${!formData.name || !formData.partner || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!formData.name || !formData.partner || isUploading}
                    >
                        {isUploading ? 'Waiting for upload...' : 'Generate Link 🚀'}
                    </Button>

                    {generatedLink && (
                        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
                            <p className="text-green-800 text-sm mb-2 font-medium">✨ Your link is ready!</p>
                            <div className="flex flex-col gap-3">
                                <input
                                    readOnly
                                    value={generatedLink}
                                    className="w-full text-sm bg-white px-3 py-2 rounded border border-gray-200 text-gray-600 truncate focus:outline-none focus:ring-1 focus:ring-green-300"
                                />
                                <Button
                                    variant="secondary"
                                    onClick={copyToClipboard}
                                    className="w-full py-3 text-sm font-semibold shadow-sm active:scale-95 transition-transform bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                                >
                                    Copy Link 📋
                                </Button>
                            </div>

                            <div className="mt-4 pt-4 border-t border-green-100">
                                <p className="text-center text-xs text-gray-500 mb-2">Preview of what they'll see:</p>
                                <div className="bg-pink-100 p-4 rounded-lg text-center transform scale-95 border-2 border-white shadow-sm">
                                    <p className="text-pink-600 font-bold mb-1">Hey {formData.partner} {formData.emoji}</p>
                                    <p className="text-gray-600 text-sm">{formData.name} has a question...</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div><br />
                <h5 className="text-center text-xs text-gray-500 mb-2">Created by ❤️ Navaneeth</h5>
            </div>
        </div>
    );
};

export default Home;

