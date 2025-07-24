export const phrasePacksData = {
  essentials: {
    name: "Essentials",
    description: "survival + etiquette",
    icon: "Backpack",
    phrases: [
      {
        id: "ess-1",
        phrase: "Disculpe",
        romanization: "dis-KOOL-peh",
        translation: "Excuse me",
        culturalNote:
          "In Spanish-speaking countries, always say 'disculpe' before asking for help. It's considered rude to start a conversation without this polite opener.",
        language: "spanish",
        difficulty: "beginner" as const,
        context: "Getting attention politely",
      },
      {
        id: "ess-2",
        phrase: "对不起",
        romanization: "duì bu qǐ",
        translation: "I'm sorry / Excuse me",
        culturalNote:
          "This is more formal than '不好意思'. Use when you've made a mistake or need to apologize sincerely.",
        language: "chinese",
        difficulty: "beginner" as const,
        context: "Apologizing formally",
      },
      {
        id: "ess-3",
        phrase: "すみません",
        romanization: "sumimasen",
        translation: "Excuse me / I'm sorry",
        culturalNote:
          "The most versatile Japanese phrase. Use it to get attention, apologize, or say thank you. Essential for daily interactions.",
        language: "japanese",
        difficulty: "beginner" as const,
        context: "Universal politeness",
      },
      {
        id: "ess-4",
        phrase: "Excusez-moi",
        romanization: "ex-koo-zay MWAH",
        translation: "Excuse me",
        culturalNote:
          "Essential in France. Always say this before asking for directions or help. French people appreciate politeness above all else.",
        language: "french",
        difficulty: "beginner" as const,
        context: "Polite attention-getting",
      },
      {
        id: "ess-5",
        phrase: "¿Habla inglés?",
        romanization: "AH-blah in-GLAYS",
        translation: "Do you speak English?",
        culturalNote:
          "Always ask this politely before switching to English. Many locals appreciate the effort even if they don't speak English.",
        language: "spanish",
        difficulty: "beginner" as const,
        context: "Language barrier",
      },
      {
        id: "ess-6",
        phrase: "你会说英语吗？",
        romanization: "nǐ huì shuō yīng yǔ ma",
        translation: "Do you speak English?",
        culturalNote:
          "In China, younger people are more likely to speak English. Don't be offended if they seem shy - they might understand but lack confidence.",
        language: "chinese",
        difficulty: "intermediate" as const,
        context: "Language assistance",
      },
      {
        id: "ess-7",
        phrase: "英語を話せますか？",
        romanization: "eigo wo hanasemasu ka",
        translation: "Can you speak English?",
        culturalNote:
          "Many Japanese people understand English but are hesitant to speak it. Be patient and encouraging.",
        language: "japanese",
        difficulty: "intermediate" as const,
        context: "Language inquiry",
      },
      {
        id: "ess-8",
        phrase: "Parlez-vous anglais?",
        romanization: "par-lay VOO ahn-GLAY",
        translation: "Do you speak English?",
        culturalNote:
          "Always try French first before asking this. Even if they speak English, French people appreciate the effort to speak their language.",
        language: "french",
        difficulty: "beginner" as const,
        context: "Language inquiry",
      },
    ],
  },
  greetings: {
    name: "Greetings & Politeness",
    description: "meet, thank, excuse",
    icon: "Hand",
    phrases: [
      {
        id: "greet-1",
        phrase: "Buenos días",
        romanization: "BWAY-nos DEE-ahs",
        translation: "Good morning",
        culturalNote:
          "Used until around 2 PM. In Latin America, greetings are very important - always greet people when entering shops or elevators.",
        language: "spanish",
        difficulty: "beginner" as const,
        context: "Morning greeting",
      },
      {
        id: "greet-2",
        phrase: "早上好",
        romanization: "zǎo shàng hǎo",
        translation: "Good morning",
        culturalNote: "More formal than just '早'. Use with people you don't know well or in business settings.",
        language: "chinese",
        difficulty: "beginner" as const,
        context: "Formal morning greeting",
      },
      {
        id: "greet-3",
        phrase: "おはようございます",
        romanization: "ohayou gozaimasu",
        translation: "Good morning",
        culturalNote:
          "The polite form of 'good morning'. Use with anyone who isn't a close friend. Bow slightly when saying it.",
        language: "japanese",
        difficulty: "beginner" as const,
        context: "Polite morning greeting",
      },
      {
        id: "greet-4",
        phrase: "Bonjour",
        romanization: "bon-ZHOOR",
        translation: "Hello / Good morning",
        culturalNote:
          "The golden rule in France: always say 'bonjour' when entering any shop, restaurant, or office. It's considered extremely rude not to greet people.",
        language: "french",
        difficulty: "beginner" as const,
        context: "Essential greeting",
      },
      {
        id: "greet-5",
        phrase: "Mucho gusto",
        romanization: "MOO-cho GOOS-toh",
        translation: "Nice to meet you",
        culturalNote:
          "The standard response when being introduced. Often accompanied by a handshake or cheek kiss depending on the country.",
        language: "spanish",
        difficulty: "beginner" as const,
        context: "First meeting",
      },
      {
        id: "greet-6",
        phrase: "很高兴认识你",
        romanization: "hěn gāo xìng rèn shi nǐ",
        translation: "Nice to meet you",
        culturalNote:
          "A warm way to respond to introductions. Chinese people appreciate when foreigners make an effort with longer phrases.",
        language: "chinese",
        difficulty: "intermediate" as const,
        context: "Meeting someone new",
      },
      {
        id: "greet-7",
        phrase: "はじめまして",
        romanization: "hajimemashite",
        translation: "Nice to meet you",
        culturalNote:
          "Always used when meeting someone for the first time. Follow with a bow and your name introduction.",
        language: "japanese",
        difficulty: "beginner" as const,
        context: "First introduction",
      },
      {
        id: "greet-8",
        phrase: "Enchanté(e)",
        romanization: "ahn-shahn-TAY",
        translation: "Nice to meet you",
        culturalNote:
          "Use 'enchanté' if you're male, 'enchantée' if you're female. Often accompanied by a light handshake or cheek kisses among friends.",
        language: "french",
        difficulty: "beginner" as const,
        context: "Meeting someone",
      },
    ],
  },
  money: {
    name: "Money & Shopping",
    description: "prices, haggling, tipping quirks",
    icon: "DollarSign",
    phrases: [
      {
        id: "money-1",
        phrase: "¿Cuánto cuesta?",
        romanization: "KWAN-toh KWES-tah",
        translation: "How much does it cost?",
        culturalNote:
          "The textbook version. In Argentina, locals say '¿Cuánto sale?' instead. Knowing local variations makes you sound less touristy.",
        language: "spanish",
        difficulty: "beginner" as const,
        context: "Asking prices",
      },
      {
        id: "money-2",
        phrase: "多少钱？",
        romanization: "duō shǎo qián",
        translation: "How much money?",
        culturalNote:
          "The most direct way to ask for prices. In markets, expect to haggle - the first price is rarely the final price.",
        language: "chinese",
        difficulty: "beginner" as const,
        context: "Price inquiry",
      },
      {
        id: "money-3",
        phrase: "いくらですか？",
        romanization: "ikura desu ka",
        translation: "How much is it?",
        culturalNote: "Prices are usually fixed in Japan. Haggling is not common except at some tourist markets.",
        language: "japanese",
        difficulty: "beginner" as const,
        context: "Price question",
      },
      {
        id: "money-4",
        phrase: "Combien ça coûte?",
        romanization: "kom-bee-AHN sah KOOT",
        translation: "How much does it cost?",
        culturalNote:
          "Standard way to ask prices in France. Prices are generally fixed, but you can ask for discounts at markets or for bulk purchases.",
        language: "french",
        difficulty: "beginner" as const,
        context: "Price inquiry",
      },
      {
        id: "money-5",
        phrase: "¿Hay descuento?",
        romanization: "AH-ee des-KWEN-toh",
        translation: "Is there a discount?",
        culturalNote:
          "Polite way to ask for a better price. Works better in small shops than chain stores. Smile when asking!",
        language: "spanish",
        difficulty: "intermediate" as const,
        context: "Seeking discounts",
      },
      {
        id: "money-6",
        phrase: "能便宜一点吗？",
        romanization: "néng pián yi yī diǎn ma",
        translation: "Can you make it a bit cheaper?",
        culturalNote:
          "Essential for market shopping in China. Start by offering 30-50% of the asking price and negotiate from there.",
        language: "chinese",
        difficulty: "intermediate" as const,
        context: "Haggling",
      },
      {
        id: "money-7",
        phrase: "クレジットカードは使えますか？",
        romanization: "kurejitto kaado wa tsukaemasu ka",
        translation: "Can I use a credit card?",
        culturalNote:
          "Japan is still largely cash-based. Many small restaurants and shops only accept cash, so always carry yen.",
        language: "japanese",
        difficulty: "intermediate" as const,
        context: "Payment method",
      },
      {
        id: "money-8",
        phrase: "Vous acceptez les cartes?",
        romanization: "voo zak-sep-TAY lay KART",
        translation: "Do you accept cards?",
        culturalNote:
          "Most places in France accept cards, but small cafés and markets might be cash-only. Always good to ask first.",
        language: "french",
        difficulty: "beginner" as const,
        context: "Payment inquiry",
      },
    ],
  },
  emergencies: {
    name: "Emergencies & Help",
    description: 'health, police, "translator please"',
    icon: "AlertTriangle",
    phrases: [
      {
        id: "emerg-1",
        phrase: "¡Ayuda!",
        romanization: "ah-YOO-dah",
        translation: "Help!",
        culturalNote:
          "Universal cry for help. In emergencies, don't worry about perfect pronunciation - people will understand and help.",
        language: "spanish",
        difficulty: "beginner" as const,
        context: "Emergency assistance",
      },
      {
        id: "emerg-2",
        phrase: "救命！",
        romanization: "jiù mìng",
        translation: "Help! / Save me!",
        culturalNote:
          "Used in serious emergencies. For less urgent help, use '帮帮我' (bāng bāng wǒ) which means 'help me please'.",
        language: "chinese",
        difficulty: "beginner" as const,
        context: "Emergency call",
      },
      {
        id: "emerg-3",
        phrase: "助けて！",
        romanization: "tasukete",
        translation: "Help me!",
        culturalNote: "For emergencies. For polite help requests, use '手伝ってください' (tetsudatte kudasai).",
        language: "japanese",
        difficulty: "beginner" as const,
        context: "Urgent help",
      },
      {
        id: "emerg-4",
        phrase: "Au secours!",
        romanization: "oh suh-KOOR",
        translation: "Help!",
        culturalNote:
          "The standard cry for help in French. In less urgent situations, use 'Aidez-moi, s'il vous plaît' (help me, please).",
        language: "french",
        difficulty: "beginner" as const,
        context: "Emergency help",
      },
      {
        id: "emerg-5",
        phrase: "Necesito un médico",
        romanization: "neh-seh-SEE-toh oon MEH-dee-koh",
        translation: "I need a doctor",
        culturalNote:
          "Learn this phrase well. In emergencies, you can also say 'hospital' - most people will understand and help you get there.",
        language: "spanish",
        difficulty: "intermediate" as const,
        context: "Medical emergency",
      },
      {
        id: "emerg-6",
        phrase: "我需要看医生",
        romanization: "wǒ xū yào kàn yī shēng",
        translation: "I need to see a doctor",
        culturalNote:
          "In China, hospitals can be crowded. Consider having this phrase written down to show people if you can't pronounce it clearly.",
        language: "chinese",
        difficulty: "intermediate" as const,
        context: "Medical help",
      },
      {
        id: "emerg-7",
        phrase: "病院はどこですか？",
        romanization: "byouin wa doko desu ka",
        translation: "Where is the hospital?",
        culturalNote:
          "Japanese people are very helpful in emergencies. They may not speak English but will often guide you personally to where you need to go.",
        language: "japanese",
        difficulty: "intermediate" as const,
        context: "Finding medical care",
      },
      {
        id: "emerg-8",
        phrase: "J'ai besoin d'un médecin",
        romanization: "zhay buh-ZWAHN duhn may-duh-SAHN",
        translation: "I need a doctor",
        culturalNote:
          "In France, you can also call SOS Médecins for house calls. Emergency number is 15 for medical emergencies.",
        language: "french",
        difficulty: "intermediate" as const,
        context: "Medical emergency",
      },
    ],
  },
}

// Helper function to get all phrases for search
export const getAllPhrases = () => {
  const allPhrases = []
  for (const pack of Object.values(phrasePacksData)) {
    allPhrases.push(
      ...pack.phrases.map((phrase) => ({
        ...phrase,
        packName: pack.name,
        packId: Object.keys(phrasePacksData).find(
          (key) => phrasePacksData[key as keyof typeof phrasePacksData] === pack,
        ),
      })),
    )
  }
  return allPhrases
}
