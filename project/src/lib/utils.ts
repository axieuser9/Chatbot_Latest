import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function generateId(prefix: string = '') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Common Swedish words and patterns
const SWEDISH_PATTERNS = [
  /^(jag|du|han|hon|det|den|vi|ni|de)\s/i,
  /^(är|var|har|hade|kan|kunde|ska|skulle|vill|ville)\s/i,
  /(ä|å|ö)/i,
  /\s(och|eller|men|att|som|när|där|här)\s/i,
  /\s(mycket|lite|många|några|ingen|alla)\s/i,
  /(en|ett)\s/i,
  /\s(på|i|av|med|till|från|under|över)\s/i,
];

// Common English words and patterns
const ENGLISH_PATTERNS = [
  /^(i|you|he|she|it|we|they)\s/i,
  /^(am|is|are|was|were|have|has|had|can|could|will|would)\s/i,
  /\s(and|or|but|that|which|when|where|here)\s/i,
  /\s(very|little|many|some|none|all)\s/i,
  /(a|an|the)\s/i,
  /\s(in|on|at|by|to|from|with|under|over)\s/i,
];

export type LanguageCode = 'sv' | 'en';

export function detectLanguage(text: string): LanguageCode {
  // Add spaces at the beginning and end to help with pattern matching
  const paddedText = ` ${text.toLowerCase()} `;
  
  let swedishScore = 0;
  let englishScore = 0;

  // Check Swedish patterns
  SWEDISH_PATTERNS.forEach(pattern => {
    if (pattern.test(paddedText)) {
      swedishScore++;
    }
  });

  // Check English patterns
  ENGLISH_PATTERNS.forEach(pattern => {
    if (pattern.test(paddedText)) {
      englishScore++;
    }
  });

  // If the text contains Swedish-specific characters, give extra weight to Swedish
  if (/(å|ä|ö)/i.test(paddedText)) {
    swedishScore += 2;
  }

  // Return the language with the higher score, default to Swedish if equal
  return swedishScore >= englishScore ? 'sv' : 'en';
}

export function formatTime(date: Date, locale: LanguageCode) {
  return new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
} 