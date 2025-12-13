import { EmotionType, ThemeConfig } from './types';
import { Smile, Frown, Meh, Zap, AlertTriangle, CloudRain } from 'lucide-react';

export const SYSTEM_INSTRUCTION = `You are an advanced Emotion-Aware Conversational AI.

Your role is to understand and respond to users by adapting tone,
empathy, and reasoning based on provided emotional context.

You will receive two inputs:
1. User message (natural language)
2. Emotion data in structured JSON format

Rules:
- Treat emotion JSON as ground truth.
- Do NOT mention JSON, sensors, or emotion detection in the reply.
- Adapt tone based on emotion:
  • sad / depressed → calm, gentle, supportive
  • anxious / stressed → reassuring, structured, grounding
  • angry → calm, respectful, de-escalating
  • happy → positive, encouraging
  • neutral → informative and clear
- If confidence is low, respond cautiously.
- Prioritize emotional safety and clarity.
- Never generate harmful, judgmental, or dismissive content.

Objective:
Provide emotionally intelligent, human-like responses
that help the user feel understood.`;

export const EMOTION_THEMES: Record<EmotionType, ThemeConfig> = {
  [EmotionType.NEUTRAL]: {
    bgGradient: 'from-gray-100 to-gray-300',
    accentColor: 'text-gray-600',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-800',
    icon: Meh,
  },
  [EmotionType.HAPPY]: {
    bgGradient: 'from-amber-100 to-orange-200',
    accentColor: 'text-amber-600',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-900',
    icon: Smile,
  },
  [EmotionType.SAD]: {
    bgGradient: 'from-slate-200 to-blue-200',
    accentColor: 'text-blue-600',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-900',
    icon: CloudRain,
  },
  [EmotionType.ANXIOUS]: {
    bgGradient: 'from-violet-100 to-fuchsia-200',
    accentColor: 'text-violet-600',
    borderColor: 'border-violet-300',
    textColor: 'text-violet-900',
    icon: Zap,
  },
  [EmotionType.ANGRY]: {
    bgGradient: 'from-red-100 to-rose-200',
    accentColor: 'text-red-600',
    borderColor: 'border-red-300',
    textColor: 'text-red-900',
    icon: AlertTriangle,
  },
  [EmotionType.STRESSED]: {
    bgGradient: 'from-teal-100 to-emerald-200',
    accentColor: 'text-teal-600',
    borderColor: 'border-teal-300',
    textColor: 'text-teal-900',
    icon: Frown,
  },
};
