import React from 'react';
import { EmotionType, EmotionData } from '../types';
import { EMOTION_THEMES } from '../constants';
import { Settings2, Activity, ShieldCheck } from 'lucide-react';

interface EmotionControlProps {
  currentEmotion: EmotionData;
  onUpdate: (data: EmotionData) => void;
}

const EmotionControl: React.FC<EmotionControlProps> = ({ currentEmotion, onUpdate }) => {
  
  const handleTypeChange = (type: EmotionType) => {
    onUpdate({ ...currentEmotion, primary_emotion: type });
  };

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...currentEmotion, intensity: parseFloat(e.target.value) });
  };

  const handleConfidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...currentEmotion, confidence: parseFloat(e.target.value) });
  };

  const theme = EMOTION_THEMES[currentEmotion.primary_emotion];

  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl h-full flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-1">
          <Settings2 className="w-5 h-5" />
          Emotion Sensors
        </h2>
        <p className="text-xs text-gray-500">Simulate internal bio-feedback state</p>
      </div>

      {/* Emotion Selector Grid */}
      <div className="grid grid-cols-2 gap-3">
        {Object.values(EmotionType).map((type) => {
            const isActive = currentEmotion.primary_emotion === type;
            const Config = EMOTION_THEMES[type];
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 border-2
                  ${isActive 
                    ? `border-[${Config.accentColor}] bg-white shadow-md scale-105 ring-2 ring-offset-1 ring-black/5` 
                    : 'border-transparent hover:bg-gray-50 text-gray-400'
                  }
                `}
                style={{ borderColor: isActive ? undefined : 'transparent' }} // Fallback
              >
                <Config.icon 
                  className={`w-6 h-6 mb-1 ${isActive ? Config.accentColor : 'text-gray-400'}`} 
                />
                <span className={`text-xs font-semibold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                  {type}
                </span>
              </button>
            );
        })}
      </div>

      <div className="space-y-6 mt-2">
        {/* Intensity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> Intensity</span>
            <span className="text-gray-500">{(currentEmotion.intensity * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={currentEmotion.intensity}
            onChange={handleIntensityChange}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-gray-800`}
          />
        </div>

        {/* Confidence Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Sensor Confidence</span>
            <span className="text-gray-500">{(currentEmotion.confidence * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={currentEmotion.confidence}
            onChange={handleConfidenceChange}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-gray-800`}
          />
        </div>
      </div>

      {/* JSON Preview */}
      <div className="mt-auto">
        <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">Live Telemetry</div>
        <div className="bg-gray-900 rounded-lg p-3 overflow-hidden shadow-inner">
          <pre className="text-[10px] leading-tight text-green-400 font-mono">
            {JSON.stringify({
              ...currentEmotion,
              timestamp: "LIVE" 
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EmotionControl;
