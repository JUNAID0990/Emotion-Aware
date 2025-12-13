import React from 'react';
import { Info } from 'lucide-react';

interface DisclaimerModalProps {
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all scale-100 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full shadow-sm">
            <Info className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Simulation Only</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              This is just a simulation app. It does not use OpenCV for real-time emotion detection, 
              does not collect audio, and does not use other types of multimodal inputs. 
              It is a multimodal AI assistant only in a simulated form.
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-[0.98] duration-150"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;