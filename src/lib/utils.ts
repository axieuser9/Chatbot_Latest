import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type LanguageCode = 'sv' | 'en'

const SWEDISH_PATTERNS = [
  /^(jag|du|han|hon|det|den|vi|ni|de)\s/i,
  /^(är|var|har|hade|kan|kunde|ska|skulle|vill|ville)\s/i,
  /(ä|å|ö)/i,
  /\s(och|eller|men|att|som|när|där|här)\s/i,
]

const ENGLISH_PATTERNS = [
  /^(i|you|he|she|it|we|they)\s/i,
  /^(am|is|are|was|were|have|has|had|can|could|will|would)\s/i,
  /\s(and|or|but|that|which|when|where|here)\s/i,
  /(a|an|the)\s/i,
]

export function detectLanguage(text: string): LanguageCode {
  const paddedText = ` ${text.toLowerCase()} `
  
  let swedishScore = 0
  let englishScore = 0

  SWEDISH_PATTERNS.forEach(pattern => {
    if (pattern.test(paddedText)) swedishScore++
  })

  ENGLISH_PATTERNS.forEach(pattern => {
    if (pattern.test(paddedText)) englishScore++
  })

  if (/(å|ä|ö)/i.test(paddedText)) {
    swedishScore += 2
  }

  return swedishScore >= englishScore ? 'sv' : 'en'
}

export function formatTime(date: Date, locale: LanguageCode) {
  return new Intl.DateTimeFormat(locale === 'sv' ? 'sv-SE' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function generateMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}