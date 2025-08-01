export const etiquettePacksData = {
  dining: {
    name: "Dining Etiquette",
    description: "table manners, tipping customs",
    icon: "Utensils",
    tips: [
      {
        id: "dining-1",
        title: "Chopstick Etiquette",
        summary: "Never stick chopsticks upright in rice",
        detail:
          "In Japan and China, placing chopsticks vertically in a bowl of rice resembles incense sticks at a funeral and is considered extremely bad luck and disrespectful.",
        country: "Japan",
        importance: "high" as const,
        category: "table-manners",
      },
      {
        id: "dining-2",
        title: "French Bread Rules",
        summary: "Place bread directly on the table, not on your plate",
        detail:
          "In France, bread is placed directly on the tablecloth to the left of your plate, never on the plate itself. Tear off small pieces with your hands rather than biting into the whole piece.",
        country: "France",
        importance: "medium" as const,
        category: "table-manners",
      },
      {
        id: "dining-3",
        title: "Chinese Tea Pouring",
        summary: "Tap two fingers when someone pours your tea",
        detail:
          "When someone pours tea for you in China, tap your index and middle finger on the table twice. This gesture shows gratitude and dates back to imperial times when emperors would disguise themselves among commoners.",
        country: "China",
        importance: "medium" as const,
        category: "beverages",
      },
      {
        id: "dining-4",
        title: "Mexican Tipping Culture",
        summary: "10-15% tip is standard in restaurants",
        detail:
          "In Mexico, tipping (propina) is expected in restaurants, bars, and for services. 10-15% is standard for restaurants, and always tip in cash even if paying by card.",
        country: "Mexico",
        importance: "medium" as const,
        category: "tipping",
      },
      {
        id: "dining-5",
        title: "Vietnamese Chopstick Placement",
        summary: "Place chopsticks parallel on your bowl when finished",
        detail:
          "In Vietnam, when you're finished eating, place your chopsticks parallel across the top of your bowl. Never leave them sticking up or crossed - it's considered bad luck.",
        country: "Vietnam",
        importance: "medium" as const,
        category: "table-manners",
      },
      {
        id: "dining-6",
        title: "Canadian Restaurant Etiquette",
        summary: "Always say please and thank you to servers",
        detail:
          "Canadian dining culture emphasizes politeness. Always say 'please' when ordering and 'thank you' when served. Tipping 18-20% is standard for good service.",
        country: "Canada",
        importance: "medium" as const,
        category: "service",
      },
      {
        id: "dining-7",
        title: "American Portion Sizes",
        summary: "Don't feel obligated to finish large portions",
        detail:
          "American restaurant portions are notoriously large. It's completely normal to ask for a 'to-go box' or 'doggy bag' to take leftovers home. Servers expect this and won't be offended.",
        country: "United States",
        importance: "low" as const,
        category: "portions",
      },
      {
        id: "dining-8",
        title: "Korean Drinking Etiquette",
        summary: "Never pour your own drink",
        detail:
          "In Korea, it's considered rude to pour your own alcoholic drink. Always pour for others and wait for them to pour for you. Use both hands when receiving a drink from someone older.",
        country: "South Korea",
        importance: "high" as const,
        category: "beverages",
      },
      {
        id: "dining-9",
        title: "Japanese Slurping Noodles",
        summary: "Slurping shows appreciation for the food",
        detail:
          "In Japan, slurping your noodles (especially ramen and soba) is not only acceptable but encouraged. It shows appreciation for the food and helps cool the noodles.",
        country: "Japan",
        importance: "medium" as const,
        category: "table-manners",
      },
      {
        id: "dining-10",
        title: "French Wine Service",
        summary: "Wait for the host to start drinking",
        detail:
          "In France, wait for the host to make the first toast or take the first sip before drinking wine. It's also polite to maintain eye contact during toasts.",
        country: "France",
        importance: "medium" as const,
        category: "beverages",
      },
      {
        id: "dining-11",
        title: "Chinese Lazy Susan Etiquette",
        summary: "Always turn clockwise and serve others first",
        detail:
          "At Chinese restaurants with lazy Susans, always turn the table clockwise and serve the person to your right before serving yourself. This shows respect and consideration.",
        country: "China",
        importance: "medium" as const,
        category: "table-manners",
      },
      {
        id: "dining-12",
        title: "Mexican Street Food Etiquette",
        summary: "Eat tacos with your hands, not utensils",
        detail:
          "In Mexico, street tacos are meant to be eaten with your hands. Using a fork and knife marks you as a tourist. Squeeze lime, add salsa, and enjoy the authentic experience.",
        country: "Mexico",
        importance: "low" as const,
        category: "street-food",
      },
      {
        id: "dining-13",
        title: "Vietnamese Pho Etiquette",
        summary: "Add herbs and condiments to taste",
        detail:
          "When eating pho in Vietnam, it's normal to customize your bowl with the provided herbs, bean sprouts, lime, and chili. Don't feel obligated to use everything - add what you like.",
        country: "Vietnam",
        importance: "low" as const,
        category: "local-dishes",
      },
      {
        id: "dining-14",
        title: "Canadian Coffee Culture",
        summary: "Tim Hortons is a cultural institution",
        detail:
          "In Canada, Tim Hortons ('Timmies') is more than just coffee - it's a cultural touchstone. Ordering a 'double-double' (two cream, two sugar) shows you understand Canadian coffee culture.",
        country: "Canada",
        importance: "low" as const,
        category: "coffee-culture",
      },
      {
        id: "dining-15",
        title: "Korean Banchan Sharing",
        summary: "Side dishes are meant to be shared",
        detail:
          "In Korea, banchan (side dishes) are communal and meant to be shared by everyone at the table. Don't take a banchan dish for yourself - use the serving spoons provided.",
        country: "South Korea",
        importance: "medium" as const,
        category: "sharing",
      },
    ],
  },
  social: {
    name: "Social Customs",
    description: "greetings, personal space, gestures",
    icon: "Users",
    tips: [
      {
        id: "social-1",
        title: "Japanese Bowing Depth",
        summary: "Deeper bows show more respect",
        detail:
          "In Japan, a slight nod (15°) is casual, a standard bow (30°) is polite, and a deep bow (45°) shows great respect or apology. Match the depth of the person bowing to you.",
        country: "Japan",
        importance: "high" as const,
        category: "greetings",
      },
      {
        id: "social-2",
        title: "French Cheek Kissing",
        summary: "Start with the right cheek, number varies by region",
        detail:
          "In France, cheek kissing (la bise) varies by region - some do 2 kisses, others 3 or 4. Always start with the right cheek (your left). When in doubt, follow the other person's lead.",
        country: "France",
        importance: "medium" as const,
        category: "greetings",
      },
      {
        id: "social-3",
        title: "Chinese Face Concept",
        summary: "Never cause someone to lose face in public",
        detail:
          "In China, 'face' (mianzi) is crucial. Never criticize, correct, or embarrass someone in front of others. If you need to address an issue, do it privately. Helping someone save face builds strong relationships.",
        country: "China",
        importance: "high" as const,
        category: "communication",
      },
      {
        id: "social-4",
        title: "Mexican Personal Space",
        summary: "Expect closer physical proximity during conversations",
        detail:
          "Mexicans tend to stand closer during conversations than North Americans or Northern Europeans. Stepping back can be seen as cold or unfriendly. Embrace the warmer interaction style.",
        country: "Mexico",
        importance: "medium" as const,
        category: "personal-space",
      },
      {
        id: "social-5",
        title: "Vietnamese Respect for Elders",
        summary: "Always greet the oldest person first",
        detail:
          "In Vietnam, age hierarchy is very important. Always greet the oldest person in a group first, and use appropriate titles. Showing respect for elders is fundamental to Vietnamese culture.",
        country: "Vietnam",
        importance: "high" as const,
        category: "hierarchy",
      },
      {
        id: "social-6",
        title: "Canadian Apology Culture",
        summary: "Saying 'sorry' is reflexive and polite",
        detail:
          "Canadians say 'sorry' frequently, even when not at fault. It's a social lubricant that shows politeness and consideration. Don't be surprised if someone apologizes for something you did.",
        country: "Canada",
        importance: "medium" as const,
        category: "communication",
      },
      {
        id: "social-7",
        title: "American Small Talk",
        summary: "Weather and sports are safe conversation starters",
        detail:
          "Americans often engage in small talk with strangers. Weather, local sports teams, and general observations are safe topics. Avoid politics, religion, or personal finances in casual conversations.",
        country: "United States",
        importance: "medium" as const,
        category: "conversation",
      },
      {
        id: "social-8",
        title: "Korean Age Hierarchy",
        summary: "Age determines speech level and behavior",
        detail:
          "In Korea, age determines the level of formality in speech and behavior. It's normal to ask someone's age when you first meet to know how to address them properly. Older people are always addressed more formally.",
        country: "South Korea",
        importance: "high" as const,
        category: "hierarchy",
      },
      {
        id: "social-9",
        title: "Japanese Gift Giving",
        summary: "Presentation is as important as the gift",
        detail:
          "In Japan, how you wrap a gift is crucial. Use quality wrapping paper, avoid bright colors for formal occasions. The recipient will carefully unwrap to preserve the paper, showing respect for your effort.",
        country: "Japan",
        importance: "medium" as const,
        category: "gift-giving",
      },
      {
        id: "social-10",
        title: "French Punctuality",
        summary: "Being fashionably late is acceptable for social events",
        detail:
          "In France, arriving exactly on time for dinner parties is considered rude - it suggests the hosts aren't ready. Arrive 10-15 minutes late for social events, but be punctual for business meetings.",
        country: "France",
        importance: "medium" as const,
        category: "timing",
      },
      {
        id: "social-11",
        title: "Chinese Business Cards",
        summary: "Receive with both hands and study carefully",
        detail:
          "In China, always receive business cards with both hands and take a moment to read them respectfully. Never write on someone's business card or put it in your back pocket - it shows disrespect.",
        country: "China",
        importance: "high" as const,
        category: "business-etiquette",
      },
      {
        id: "social-12",
        title: "Mexican Machismo Awareness",
        summary: "Gender roles may be more traditional",
        detail:
          "In Mexico, traditional gender roles may be more pronounced than in other countries. Men might be expected to pay for meals or open doors. Be respectful of these customs while staying true to your values.",
        country: "Mexico",
        importance: "medium" as const,
        category: "gender-roles",
      },
      {
        id: "social-13",
        title: "Vietnamese Name Usage",
        summary: "Use titles and family names appropriately",
        detail:
          "In Vietnam, use titles like 'anh' (older brother), 'chị' (older sister), or 'em' (younger sibling) based on relative age. Family names come first, so Nguyen Van Nam would be addressed as Mr. Nguyen.",
        country: "Vietnam",
        importance: "high" as const,
        category: "names",
      },
      {
        id: "social-14",
        title: "Canadian Multiculturalism",
        summary: "Embrace and respect cultural diversity",
        detail:
          "Canada prides itself on multiculturalism. Showing interest in and respect for different cultures is highly valued. Don't assume someone's background based on appearance - Canada is incredibly diverse.",
        country: "Canada",
        importance: "medium" as const,
        category: "diversity",
      },
      {
        id: "social-15",
        title: "Korean Nunchi Concept",
        summary: "Read the room and social atmosphere",
        detail:
          "Nunchi is the Korean ability to sense what others are thinking and feeling. Pay attention to non-verbal cues, group dynamics, and unspoken social rules. Good nunchi is highly valued in Korean society.",
        country: "South Korea",
        importance: "high" as const,
        category: "social-awareness",
      },
    ],
  },
  business: {
    name: "Business Protocol",
    description: "meetings, cards, punctuality",
    icon: "MapPin",
    tips: [
      {
        id: "business-1",
        title: "Japanese Business Card Ritual",
        summary: "Receive cards with both hands and study them",
        detail:
          "In Japan, business cards (meishi) are sacred. Receive them with both hands, read them carefully, and place them respectfully on the table during meetings. Never write on them or put them in your back pocket.",
        country: "Japan",
        importance: "high" as const,
        category: "cards",
      },
      {
        id: "business-2",
        title: "French Business Lunch Culture",
        summary: "Business is often conducted over long lunches",
        detail:
          "In France, business lunches are important and can last 2-3 hours. Don't rush the meal or immediately dive into business talk. Relationship building over food is crucial to French business culture.",
        country: "France",
        importance: "high" as const,
        category: "dining",
      },
      {
        id: "business-3",
        title: "Chinese Guanxi Building",
        summary: "Relationships are more important than contracts",
        detail:
          "In China, guanxi (relationships) are fundamental to business success. Invest time in building personal relationships, attend social events, and maintain long-term connections. Trust comes before transactions.",
        country: "China",
        importance: "high" as const,
        category: "relationships",
      },
      {
        id: "business-4",
        title: "Mexican Business Hierarchy",
        summary: "Respect for authority and seniority is important",
        detail:
          "In Mexican business culture, hierarchy is respected. Always greet the most senior person first, use formal titles, and show deference to age and position. Personal relationships are crucial for business success.",
        country: "Mexico",
        importance: "high" as const,
        category: "hierarchy",
      },
      {
        id: "business-5",
        title: "Vietnamese Business Patience",
        summary: "Decision-making can be slow and consensus-based",
        detail:
          "In Vietnam, business decisions often require consensus and can take time. Be patient with the process and avoid pressuring for quick decisions. Building trust and relationships is more important than speed.",
        country: "Vietnam",
        importance: "medium" as const,
        category: "decision-making",
      },
      {
        id: "business-6",
        title: "Canadian Business Politeness",
        summary: "Extreme politeness is expected in all interactions",
        detail:
          "Canadian business culture emphasizes politeness and consideration. Always say 'please' and 'thank you,' avoid interrupting, and be respectful of different viewpoints. Consensus-building is valued over aggressive tactics.",
        country: "Canada",
        importance: "medium" as const,
        category: "communication",
      },
      {
        id: "business-7",
        title: "American Business Directness",
        summary: "Direct communication and efficiency are valued",
        detail:
          "American business culture values directness, efficiency, and results. Get to the point quickly, be clear about expectations, and don't take direct feedback personally. Time is money in American business.",
        country: "United States",
        importance: "medium" as const,
        category: "communication",
      },
      {
        id: "business-8",
        title: "Korean Business Hierarchy",
        summary: "Age and position determine meeting protocol",
        detail:
          "In Korean business, hierarchy is paramount. The most senior person enters rooms first, speaks first, and makes final decisions. Use both hands when exchanging business cards and bow appropriately based on rank.",
        country: "South Korea",
        importance: "high" as const,
        category: "hierarchy",
      },
      {
        id: "business-9",
        title: "Japanese Consensus Building",
        summary: "Decisions are made through nemawashi",
        detail:
          "In Japan, real decisions happen before meetings through nemawashi (behind-the-scenes consensus building). Meetings are often for formal approval of pre-agreed decisions. Be patient with this process.",
        country: "Japan",
        importance: "high" as const,
        category: "decision-making",
      },
      {
        id: "business-10",
        title: "French Business Dress Code",
        summary: "Elegant, conservative dress is essential",
        detail:
          "French business culture places high importance on appearance. Dress conservatively but elegantly. Quality over flashiness is key - invest in well-tailored, classic pieces rather than trendy items.",
        country: "France",
        importance: "medium" as const,
        category: "appearance",
      },
      {
        id: "business-11",
        title: "Chinese Gift Giving Taboos",
        summary: "Avoid clocks, white flowers, and sets of four",
        detail:
          "In Chinese business culture, clocks symbolize death, white flowers are for funerals, and the number four sounds like 'death.' Stick to quality items in sets of eight (lucky number) or other auspicious numbers.",
        country: "China",
        importance: "medium" as const,
        category: "gifts",
      },
      {
        id: "business-12",
        title: "Mexican Business Relationships",
        summary: "Personal connections drive business success",
        detail:
          "In Mexico, business is personal. Invest time in getting to know your colleagues and clients personally. Family, hobbies, and personal interests are appropriate business conversation topics.",
        country: "Mexico",
        importance: "high" as const,
        category: "relationships",
      },
      {
        id: "business-13",
        title: "Vietnamese Business Cards",
        summary: "Present and receive with both hands",
        detail:
          "In Vietnam, business cards should be presented and received with both hands and a slight bow. Take time to read the card before putting it away. Never write on someone's business card in their presence.",
        country: "Vietnam",
        importance: "high" as const,
        category: "cards",
      },
      {
        id: "business-14",
        title: "Canadian Business Meetings",
        summary: "Punctuality and preparation are highly valued",
        detail:
          "In Canada, arrive on time or slightly early for business meetings. Come prepared with agendas and materials. Canadians value efficiency but also want everyone to have a chance to contribute to discussions.",
        country: "Canada",
        importance: "medium" as const,
        category: "meetings",
      },
      {
        id: "business-15",
        title: "Korean After-Work Socializing",
        summary: "Hoesik (company dinner) is crucial for relationships",
        detail:
          "In Korea, hoesik (company dinner and drinking) is essential for building business relationships. Participation is often expected, and important business discussions frequently happen over drinks after work.",
        country: "South Korea",
        importance: "high" as const,
        category: "socializing",
      },
    ],
  },
  "gift-giving": {
    name: "Gift Giving",
    description: "occasions, taboos, wrapping",
    icon: "Gift",
    tips: [
      {
        id: "gift-1",
        title: "Chinese Number Superstitions",
        summary: "Avoid gifts in sets of four, prefer eight",
        detail:
          "The number four (四) sounds like 'death' (死) in Chinese, making it extremely unlucky. Eight (八) sounds like 'prosperity' (发) and is considered very lucky. Always give gifts in sets of eight when possible.",
        country: "China",
        importance: "high" as const,
        category: "numbers",
      },
      {
        id: "gift-2",
        title: "Japanese Wrapping Importance",
        summary: "Presentation is as important as the gift itself",
        detail:
          "In Japan, how you wrap a gift (tsutsumi) is crucial. Use quality wrapping paper, avoid bright colors for formal occasions, and never use white and red together (funeral colors). The recipient will carefully unwrap to preserve the paper.",
        country: "Japan",
        importance: "medium" as const,
        category: "wrapping",
      },
      {
        id: "gift-3",
        title: "French Wine Etiquette",
        summary: "Never bring wine to a dinner party",
        detail:
          "In France, bringing wine to a dinner party implies the host's wine selection isn't good enough. Instead, bring flowers, chocolates, or a small gift for the hostess. If you must bring wine, present it for 'another occasion.'",
        country: "France",
        importance: "medium" as const,
        category: "occasions",
      },
      {
        id: "gift-4",
        title: "Mexican Flower Colors",
        summary: "Avoid red flowers and marigolds",
        detail:
          "In Mexico, red flowers are associated with spells and witchcraft, while marigolds are used for Day of the Dead celebrations. Stick to pink, yellow, or white flowers for positive occasions.",
        country: "Mexico",
        importance: "medium" as const,
        category: "flowers",
      },
      {
        id: "gift-5",
        title: "Vietnamese Gift Wrapping",
        summary: "Avoid white wrapping paper",
        detail:
          "In Vietnam, white is associated with death and mourning. Use colorful wrapping paper, preferably red or gold which symbolize luck and prosperity. Present gifts with both hands and a slight bow.",
        country: "Vietnam",
        importance: "medium" as const,
        category: "wrapping",
      },
      {
        id: "gift-6",
        title: "Canadian Gift Giving",
        summary: "Thoughtful, practical gifts are appreciated",
        detail:
          "Canadians appreciate practical, thoughtful gifts over expensive ones. Something from your home country or region is always well-received. Avoid overly personal gifts unless you know the person well.",
        country: "Canada",
        importance: "low" as const,
        category: "selection",
      },
      {
        id: "gift-7",
        title: "American Gift Opening",
        summary: "Open gifts immediately with enthusiasm",
        detail:
          "In the US, gifts should be opened immediately when received, and the recipient should show genuine enthusiasm and gratitude. Saving gifts to open later can be seen as rude or unappreciative.",
        country: "United States",
        importance: "medium" as const,
        category: "opening",
      },
      {
        id: "gift-8",
        title: "Korean Gift Wrapping",
        summary: "Use both hands and bow when presenting",
        detail:
          "In Korea, present gifts with both hands and a slight bow. The wrapping should be neat and elegant. Avoid wrapping gifts in white paper (associated with death) or using red ink for cards.",
        country: "South Korea",
        importance: "high" as const,
        category: "presentation",
      },
      {
        id: "gift-9",
        title: "Japanese Omiyage Culture",
        summary: "Bring gifts for everyone when returning from travel",
        detail:
          "In Japan, omiyage (souvenirs) are expected when you return from travel. Bring small, individually wrapped gifts for colleagues and friends - usually local specialties or sweets from where you visited.",
        country: "Japan",
        importance: "high" as const,
        category: "occasions",
      },
      {
        id: "gift-10",
        title: "French Flower Numbers",
        summary: "Give odd numbers of flowers, avoid 13",
        detail:
          "In France, always give odd numbers of flowers, but never 13 (unlucky). Red roses are for romantic partners only. For hosts, choose yellow, pink, or white flowers in bouquets of 3, 5, 7, or 9.",
        country: "France",
        importance: "medium" as const,
        category: "flowers",
      },
      {
        id: "gift-11",
        title: "Chinese Red Envelope Money",
        summary: "Give money in red envelopes for celebrations",
        detail:
          "For Chinese celebrations like weddings or New Year, money is given in red envelopes (hongbao). The amount should be even numbers (except 4) and preferably contain the lucky number 8.",
        country: "China",
        importance: "high" as const,
        category: "money-gifts",
      },
      {
        id: "gift-12",
        title: "Mexican Quinceañera Gifts",
        summary: "Religious items and jewelry are traditional",
        detail:
          "For Mexican quinceañeras (15th birthday celebrations), traditional gifts include religious items like crosses or medals, jewelry, or items for the young woman's hope chest. Money is also appropriate.",
        country: "Mexico",
        importance: "medium" as const,
        category: "occasions",
      },
      {
        id: "gift-13",
        title: "Vietnamese Tet Gifts",
        summary: "Lucky money and symbolic items for New Year",
        detail:
          "During Vietnamese Tet (New Year), give lucky money in red envelopes to children and unmarried adults. Fruits like oranges and tangerines symbolize luck and prosperity. Avoid giving clocks or mirrors.",
        country: "Vietnam",
        importance: "medium" as const,
        category: "occasions",
      },
      {
        id: "gift-14",
        title: "Canadian Hostess Gifts",
        summary: "Wine, flowers, or dessert are appropriate",
        detail:
          "When invited to a Canadian home, bring wine, flowers, or a dessert to share. Canadians appreciate the gesture but won't be offended if you don't bring anything. A simple 'thank you' card later is also nice.",
        country: "Canada",
        importance: "low" as const,
        category: "occasions",
      },
      {
        id: "gift-15",
        title: "Korean Wedding Gifts",
        summary: "Money in white envelopes is traditional",
        detail:
          "For Korean weddings, money is the traditional gift, presented in a white envelope. The amount should be odd numbers and avoid amounts with 4. Write your name clearly on the envelope for the gift registry.",
        country: "South Korea",
        importance: "high" as const,
        category: "occasions",
      },
    ],
  },
}

// Helper function to get all etiquette tips for search
export const getAllEtiquetteTips = () => {
  const allTips = []
  for (const pack of Object.values(etiquettePacksData)) {
    allTips.push(
      ...pack.tips.map((tip) => ({
        ...tip,
        packName: pack.name,
        packId: Object.keys(etiquettePacksData).find(
          (key) => etiquettePacksData[key as keyof typeof etiquettePacksData] === pack,
        ),
      })),
    )
  }
  return allTips
}

// Helper function to get etiquette tips by country
export const getEtiquetteTipsByCountry = (country: string) => {
  const allTips = getAllEtiquetteTips()
  return allTips.filter((tip) => tip.country === country)
}
