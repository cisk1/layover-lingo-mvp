export const categories = [
  {
    id: "essentials",
    name: "Travel Essentials",
    icon: "Backpack",
    description: "Must-know phrases and customs for any trip",
  },
  {
    id: "greetings",
    name: "Greetings & Social",
    icon: "Hand",
    description: "Meeting people and social interactions",
  },
  {
    id: "dining",
    name: "Dining & Food",
    icon: "Utensils",
    description: "Restaurant etiquette and food culture",
  },
  {
    id: "money",
    name: "Money & Shopping",
    icon: "DollarSign",
    description: "Prices, haggling, and payment customs",
  },
  {
    id: "business",
    name: "Business & Professional",
    icon: "MapPin",
    description: "Work meetings and professional etiquette",
  },
  {
    id: "emergencies",
    name: "Emergencies & Help",
    icon: "AlertTriangle",
    description: "Getting help when you need it most",
  },
  {
    id: "gifts",
    name: "Gifts & Celebrations",
    icon: "Gift",
    description: "Gift-giving customs and special occasions",
  },
]

export const getCategoryById = (id: string) => {
  return categories.find((category) => category.id === id)
}
