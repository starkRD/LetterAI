
import React from 'react';
import { PROMO_URL } from '../constants';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, onDownload }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm no-print">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="relative h-48 bg-rose-500 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/song/800/400" 
            alt="Custom Song" 
            className="w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="text-3xl font-serif-elegant font-bold mb-2">Wait! Make it Unforgettable</h3>
            <p className="text-rose-50 underline decoration-rose-200">A letter is beautiful, but a song is eternal.</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-rose-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 text-center">
          <p className="text-slate-600 mb-6 text-lg">
            Your heartfelt letter is ready! Before you download, would you like to surprise your loved one with a 
            <span className="font-bold text-rose-600"> fully custom song</span> written just for them?
          </p>
          
          <div className="space-y-4">
            <a 
              href={PROMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-rose-600 text-white rounded-xl font-bold text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-200 active:scale-95"
            >
              Take me to Plans & Pricing 🎵
            </a>
            
            <button
  type="button"
  onClick={onDownload}
  className="block w-full py-3 text-slate-500 font-medium hover:text-rose-600 transition-colors"
>
  Just download my free letter for now
</button>
          </div>
          
          <p className="mt-6 text-xs text-slate-400">
            Powered by SongCart.in - Turning your memories into melodies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
