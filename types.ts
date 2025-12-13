export enum EmotionType {
  NEUTRAL = 'Neutral',
  HAPPY = 'Happy',
  SAD = 'Sad',
  ANXIOUS = 'Anxious',
  ANGRY = 'Angry',
  STRESSED = 'Stressed'
}

export interface EmotionData {
  primary_emotion: EmotionType;
  intensity: number; // 0.0 to 1.0
  confidence: number; // 0.0 to 1.0
  timestamp: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  relatedEmotion?: EmotionData; // For user messages, what was the context?
}

export interface ThemeConfig {
  bgGradient: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
  icon: any;
}
