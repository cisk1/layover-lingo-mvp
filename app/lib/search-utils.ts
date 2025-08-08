// Intent-aware search utilities for Layover Lingo
// This implements semantic search that understands user intent and context

export interface SearchableContent {
  id: string
  phrase: string
  translation: string
  romanization?: string
  context?: string
  culturalNote?: string
  language: string
  country: string
  importance: "high" | "medium" | "low"
  categories?: string[]
  packName?: string
  packId?: string
}

export interface SearchResult {
  content: SearchableContent
  relevanceScore: number
  matchType: 'exact' | 'semantic' | 'contextual' | 'cultural'
  matchedFields: string[]
}

// Intent keywords that map to different types of phrases
const intentKeywords = {
  // Greetings and politeness
  greeting: ['hello', 'hi', 'good morning', 'good afternoon', 'good evening', 'greet', 'meet', 'introduce'],
  goodbye: ['bye', 'goodbye', 'see you', 'farewell', 'leave', 'depart'],
  please: ['please', 'polite', 'request', 'ask nicely', 'kindly'],
  thank: ['thank', 'thanks', 'gratitude', 'appreciate', 'grateful'],
  sorry: ['sorry', 'apologize', 'excuse', 'pardon', 'forgive', 'regret'],
  
  // Basic needs
  help: ['help', 'assist', 'support', 'aid', 'rescue', 'emergency'],
  directions: ['where', 'direction', 'location', 'find', 'lost', 'map', 'navigate'],
  food: ['food', 'eat', 'hungry', 'restaurant', 'meal', 'dining', 'cuisine'],
  water: ['water', 'drink', 'thirsty', 'beverage'],
  bathroom: ['bathroom', 'toilet', 'restroom', 'wc', 'washroom'],
  
  // Transportation
  transport: ['bus', 'train', 'taxi', 'car', 'airport', 'station', 'transport'],
  ticket: ['ticket', 'fare', 'price', 'cost', 'payment', 'buy'],
  
  // Shopping
  shopping: ['buy', 'purchase', 'shop', 'store', 'market', 'price', 'cost'],
  money: ['money', 'cash', 'credit', 'card', 'payment', 'expensive', 'cheap'],
  
  // Communication
  understand: ['understand', 'comprehend', 'clear', 'confused', 'language'],
  speak: ['speak', 'talk', 'conversation', 'communicate', 'language'],
  translate: ['translate', 'meaning', 'what does', 'how do you say'],
  
  // Cultural
  culture: ['culture', 'custom', 'tradition', 'local', 'native', 'etiquette'],
  respect: ['respect', 'polite', 'proper', 'appropriate', 'manners'],
  
  // Emergency
  emergency: ['emergency', 'help', 'danger', 'sick', 'hospital', 'doctor', 'police'],
  
  // Numbers and time
  numbers: ['one', 'two', 'three', 'number', 'count', 'how much', 'quantity'],
  time: ['time', 'hour', 'minute', 'when', 'schedule', 'appointment'],
  
  // Weather
  weather: ['weather', 'hot', 'cold', 'rain', 'sunny', 'temperature'],
  
  // Common actions
  open: ['open', 'close', 'enter', 'exit', 'door', 'window'],
  stop: ['stop', 'wait', 'pause', 'halt', 'don\'t'],
  go: ['go', 'come', 'walk', 'run', 'move', 'travel'],
}

// Contextual synonyms and related terms
const contextualSynonyms = {
  'excuse me': ['pardon', 'sorry', 'apologize', 'forgive', 'disculpe', 'sumimasen', 'excusez-moi'],
  'hello': ['hi', 'greetings', 'good morning', 'good afternoon', 'hola', 'bonjour', 'konnichiwa'],
  'thank you': ['thanks', 'grateful', 'appreciate', 'gracias', 'merci', 'arigato'],
  'goodbye': ['bye', 'farewell', 'see you', 'adios', 'au revoir', 'sayonara'],
  'help': ['assist', 'support', 'aid', 'rescue', 'ayuda', 'aide', 'tasukete'],
  'water': ['drink', 'beverage', 'thirsty', 'agua', 'eau', 'mizu'],
  'food': ['eat', 'hungry', 'meal', 'comida', 'nourriture', 'tabemono'],
  'bathroom': ['toilet', 'restroom', 'wc', 'bano', 'toilettes', 'toire'],
  'money': ['cash', 'payment', 'dinero', 'argent', 'okane'],
  'expensive': ['costly', 'pricey', 'dear', 'caro', 'cher', 'takai'],
  'cheap': ['inexpensive', 'affordable', 'barato', 'pas cher', 'yasui'],
}

// Cultural context mappings
const culturalContexts = {
  'polite': ['respectful', 'formal', 'proper', 'manners', 'etiquette'],
  'casual': ['informal', 'friendly', 'relaxed', 'casual'],
  'formal': ['official', 'business', 'professional', 'formal'],
  'emergency': ['urgent', 'critical', 'important', 'emergency'],
  'social': ['conversation', 'chat', 'talk', 'social', 'friendly'],
  'business': ['work', 'professional', 'business', 'formal'],
  'travel': ['tourism', 'visitor', 'foreigner', 'travel', 'trip'],
}

export function calculateRelevanceScore(
  query: string,
  content: SearchableContent,
  matchType: string,
  matchedFields: string[]
): number {
  let score = 0
  const queryLower = query.toLowerCase()
  
  // Base scoring based on match type
  switch (matchType) {
    case 'exact':
      score += 100
      break
    case 'semantic':
      score += 80
      break
    case 'contextual':
      score += 60
      break
    case 'cultural':
      score += 40
      break
  }
  
  // Boost for exact phrase matches
  if (content.phrase.toLowerCase().includes(queryLower)) {
    score += 50
  }
  
  // Boost for translation matches
  if (content.translation.toLowerCase().includes(queryLower)) {
    score += 40
  }
  
  // Boost for context matches
  if (content.context?.toLowerCase().includes(queryLower)) {
    score += 30
  }
  
  // Boost for cultural note matches
  if (content.culturalNote?.toLowerCase().includes(queryLower)) {
    score += 25
  }
  
  // Boost for importance
  switch (content.importance) {
    case 'high':
      score += 20
      break
    case 'medium':
      score += 10
      break
    case 'low':
      score += 5
      break
  }
  
  // Boost for multiple field matches
  score += matchedFields.length * 5
  
  // Penalty for very long queries that don't match well
  if (query.length > 20 && score < 30) {
    score -= 10
  }
  
  return Math.max(0, score)
}

export function findIntentMatches(query: string): string[] {
  const queryLower = query.toLowerCase()
  const matches: string[] = []
  
  // Check intent keywords
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      matches.push(intent)
    }
  }
  
  return matches
}

export function findContextualMatches(query: string): string[] {
  const queryLower = query.toLowerCase()
  const matches: string[] = []
  
  // Check contextual synonyms
  for (const [term, synonyms] of Object.entries(contextualSynonyms)) {
    if (queryLower.includes(term) || synonyms.some(synonym => queryLower.includes(synonym))) {
      matches.push(term)
    }
  }
  
  return matches
}

export function findCulturalMatches(query: string): string[] {
  const queryLower = query.toLowerCase()
  const matches: string[] = []
  
  // Check cultural contexts
  for (const [context, keywords] of Object.entries(culturalContexts)) {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      matches.push(context)
    }
  }
  
  return matches
}

export function performIntentAwareSearch(
  query: string,
  content: SearchableContent[]
): SearchResult[] {
  if (!query.trim()) return []
  
  const queryLower = query.toLowerCase()
  const results: SearchResult[] = []
  
  // Find intent and contextual matches
  const intentMatches = findIntentMatches(query)
  const contextualMatches = findContextualMatches(query)
  const culturalMatches = findCulturalMatches(query)
  
  for (const item of content) {
    let matchType: 'exact' | 'semantic' | 'contextual' | 'cultural' = 'semantic'
    const matchedFields: string[] = []
    
    // Check for exact matches
    if (
      item.phrase.toLowerCase().includes(queryLower) ||
      item.translation.toLowerCase().includes(queryLower) ||
      item.romanization?.toLowerCase().includes(queryLower) ||
      item.context?.toLowerCase().includes(queryLower) ||
      item.culturalNote?.toLowerCase().includes(queryLower)
    ) {
      matchType = 'exact'
      if (item.phrase.toLowerCase().includes(queryLower)) matchedFields.push('phrase')
      if (item.translation.toLowerCase().includes(queryLower)) matchedFields.push('translation')
      if (item.romanization?.toLowerCase().includes(queryLower)) matchedFields.push('romanization')
      if (item.context?.toLowerCase().includes(queryLower)) matchedFields.push('context')
      if (item.culturalNote?.toLowerCase().includes(queryLower)) matchedFields.push('culturalNote')
    }
    
    // Check for semantic matches based on intent
    let hasSemanticMatch = false
    for (const intent of intentMatches) {
      const intentKeywords = intentKeywords[intent as keyof typeof intentKeywords] || []
      for (const keyword of intentKeywords) {
        if (
          item.phrase.toLowerCase().includes(keyword) ||
          item.translation.toLowerCase().includes(keyword) ||
          item.context?.toLowerCase().includes(keyword) ||
          item.culturalNote?.toLowerCase().includes(keyword)
        ) {
          hasSemanticMatch = true
          if (matchType !== 'exact') matchType = 'semantic'
          matchedFields.push('intent')
          break
        }
      }
    }
    
    // Check for contextual matches
    for (const context of contextualMatches) {
      const synonyms = contextualSynonyms[context as keyof typeof contextualSynonyms] || []
      for (const synonym of synonyms) {
        if (
          item.phrase.toLowerCase().includes(synonym) ||
          item.translation.toLowerCase().includes(synonym) ||
          item.context?.toLowerCase().includes(synonym) ||
          item.culturalNote?.toLowerCase().includes(synonym)
        ) {
          if (matchType !== 'exact' && matchType !== 'semantic') matchType = 'contextual'
          matchedFields.push('context')
          break
        }
      }
    }
    
    // Check for cultural matches
    for (const culture of culturalMatches) {
      const keywords = culturalContexts[culture as keyof typeof culturalContexts] || []
      for (const keyword of keywords) {
        if (
          item.context?.toLowerCase().includes(keyword) ||
          item.culturalNote?.toLowerCase().includes(keyword)
        ) {
          if (matchType !== 'exact' && matchType !== 'semantic' && matchType !== 'contextual') {
            matchType = 'cultural'
          }
          matchedFields.push('cultural')
          break
        }
      }
    }
    
    // If we have any type of match, add to results
    if (matchType !== 'semantic' || hasSemanticMatch || matchedFields.length > 0) {
      const relevanceScore = calculateRelevanceScore(query, item, matchType, matchedFields)
      
      if (relevanceScore > 0) {
        results.push({
          content: item,
          relevanceScore,
          matchType,
          matchedFields: [...new Set(matchedFields)] // Remove duplicates
        })
      }
    }
  }
  
  // Sort by relevance score (highest first)
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

// Helper function to get search suggestions based on intent
export function getSearchSuggestions(query: string): string[] {
  const suggestions: string[] = []
  const queryLower = query.toLowerCase()
  
  // Add intent-based suggestions
  const intentMatches = findIntentMatches(query)
  for (const intent of intentMatches) {
    const keywords = intentKeywords[intent as keyof typeof intentKeywords] || []
    suggestions.push(...keywords.slice(0, 3))
  }
  
  // Add contextual suggestions
  const contextualMatches = findContextualMatches(query)
  for (const context of contextualMatches) {
    const synonyms = contextualSynonyms[context as keyof typeof contextualSynonyms] || []
    suggestions.push(...synonyms.slice(0, 2))
  }
  
  return [...new Set(suggestions)].slice(0, 5) // Remove duplicates and limit
}
