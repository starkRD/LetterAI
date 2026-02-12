
import React, { useState, useRef } from 'react';
import { LetterCategory, LetterData, GeneratedLetter } from './types';
import { CATEGORIES } from './constants';
import { generateLetter } from './services/geminiService';
import PromotionModal from './components/PromotionModal';
import LetterCard from './components/LetterCard';

const App: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LetterData>({
    senderName: '',
    recipientName: '',
    category: LetterCategory.VALENTINE,
    memory: '',
    tone: 'Heartfelt and Romantic',
    photo: undefined
  });
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter | null>(null);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("Image is too large. Please use a smaller photo (under 4MB).");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const letter = await generateLetter(formData);
      setGeneratedLetter(letter);
      setStep(2);
      // We don't scroll to top here because it's an embedded widget
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTrigger = () => {
    setIsPromoOpen(true);
  };

  const executeDownload = () => {
    window.print();
    setIsPromoOpen(false);
  };

  const resetForm = () => {
    setStep(1);
    setGeneratedLetter(null);
    setFormData({
      ...formData,
      memory: '',
      photo: undefined
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Content Area */}
      <div className="px-4 pb-12">
        {step === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Minimal Intro */}
            <div className="text-center space-y-2 mb-4">
              <h2 className="text-3xl font-serif-elegant font-bold text-slate-900">Write Your Free Letter</h2>
              <p className="text-slate-500 text-sm">Crafted with human heart, not AI fluff.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-orange-50 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">From</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                      value={formData.senderName}
                      onChange={e => setFormData({...formData, senderName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">To</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Their name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                      value={formData.recipientName}
                      onChange={e => setFormData({...formData, recipientName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pick the Occasion</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({...formData, category: cat.id})}
                        className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                          formData.category === cat.id 
                            ? 'bg-rose-600 border-rose-600 text-white shadow-md' 
                            : 'bg-white border-slate-100 text-slate-600 hover:border-rose-200'
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{cat.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Story (In any language)</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="E.g. I still remember our first trip to Manali. You were shivering but didn't take the jacket. I realized then how much I love your stubbornness."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none text-sm"
                    value={formData.memory}
                    onChange={e => setFormData({...formData, memory: e.target.value})}
                  />
                </div>

                {/* Simplified Photo Upload */}
                <div className="flex items-center gap-4">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-grow flex items-center justify-center gap-3 py-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-500 text-xs font-bold hover:bg-rose-50 hover:border-rose-200 transition-all"
                  >
                    {formData.photo ? (
                      <span className="text-rose-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/></svg>
                        Photo Selected
                      </span>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        Attach a Memory Photo
                      </>
                    )}
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.photo && (
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, photo: undefined})}
                      className="text-xs text-rose-500 underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <button 
                  disabled={isLoading}
                  className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 disabled:opacity-70 flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Writing...
                    </>
                  ) : (
                    <>
                      Write My Free Letter
                      <span className="group-hover:translate-x-1 transition-transform">✨</span>
                    </>
                  )}
                </button>

                {error && <p className="text-center text-red-500 text-[10px] font-bold uppercase tracking-wider">{error}</p>}
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in zoom-in duration-500">
            <div className="text-center no-print">
              <h2 className="text-2xl font-serif-elegant font-bold text-slate-800">Your Letter is Ready</h2>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Download and share the love</p>
            </div>

            {generatedLetter && (
              <LetterCard 
                letter={generatedLetter} 
                photo={formData.photo} 
                senderName={formData.senderName} 
              />
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
              <button 
                onClick={handleDownloadTrigger}
                className="w-full sm:w-auto px-12 py-4 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 active:scale-95 transition-all"
              >
                Download My Free Letter 📄
              </button>
              <button 
                onClick={resetForm}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-500 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
              >
                Create Another
              </button>
            </div>
            
            {/* Promo Section as a banner */}
            <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-xl no-print overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-lg font-serif-elegant text-white font-bold mb-2">Wait! Make it Unforgettable 🎵</h3>
              <p className="text-slate-400 text-xs mb-4">
                This letter is perfect. Now imagine it as a <strong>Custom Song</strong> written just for them.
              </p>
              <a 
                href="https://songcart.in/pages/a-custom-song" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-block px-6 py-2 bg-rose-600 text-white rounded-full font-bold text-xs hover:bg-rose-700 transition-all"
              >
                Take me to Song Plans
              </a>
            </div>
          </div>
        )}
      </div>

      <PromotionModal 
        isOpen={isPromoOpen} 
        onClose={() => setIsPromoOpen(false)} 
        onDownload={executeDownload}
      />
    </div>
  );
};

export default App;
