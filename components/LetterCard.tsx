
import React from 'react';
import { GeneratedLetter } from '../types';

interface LetterCardProps {
  letter: GeneratedLetter;
  photo?: string;
  senderName: string;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, photo, senderName }) => {
  return (
    <div className="relative max-w-2xl mx-auto print-container p-4">
      {/* Physical Letter Container */}
      <div id="letter-content" className="paper-texture min-h-[500px] p-8 md:p-14 shadow-2xl border border-orange-100 relative overflow-hidden flex flex-col">
        
        {/* Dried Flower Graphic Element */}
        <div className="absolute top-10 right-8 opacity-40 pointer-events-none no-print">
           <svg width="60" height="120" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 200C50 200 50 120 50 80C50 40 30 20 50 0C70 20 50 40 50 80" stroke="#8b4513" strokeWidth="2"/>
            <circle cx="50" cy="15" r="10" fill="#d2b48c" opacity="0.5"/>
            <path d="M50 80C50 80 70 60 90 70C70 80 50 80 50 80Z" fill="#556b2f" opacity="0.3"/>
            <path d="M50 110C50 110 30 130 10 120C30 110 50 110 50 110Z" fill="#556b2f" opacity="0.3"/>
          </svg>
        </div>

        {/* Polaroid Style Image Section */}
        {photo && (
          <div className="flex justify-center mb-10">
            <div className="polaroid-frame max-w-[240px] transition-transform hover:scale-105 duration-300">
              <img src={photo} alt="Memory" className="w-full h-auto aspect-square object-cover grayscale-[20%]" />
              <div className="mt-4 text-center font-letter text-slate-400 text-xs italic">
                A memory of us...
              </div>
            </div>
          </div>
        )}
        
        {/* Letter Text Content */}
        <div className="flex-grow">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-serif-elegant text-slate-800 italic border-b border-orange-200 pb-2">
              {letter.title}
            </h2>
          </div>

          <div className="font-letter text-xl md:text-2xl text-slate-800 leading-relaxed whitespace-pre-wrap antialiased">
            {letter.content}
          </div>

          <div className="mt-10 font-letter text-2xl text-slate-900 border-t border-orange-100 pt-4 italic">
            Forever yours,<br/>
            {senderName}
          </div>
        </div>

        {/* Subtle Watermark for SongCart Branding */}
        <div className="mt-16 pt-8 text-center no-print">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 opacity-50">
            Lovingly created by SongCart.in
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterCard;
