export const countries = [
  { code: "japan", name: "Japan", flag: "🇯🇵", fallback: "JP" },
  { code: "south-korea", name: "South Korea", flag: "🇰🇷", fallback: "KR" },
  { code: "china", name: "China", flag: "🇨🇳", fallback: "CN" },
  { code: "mexico", name: "Mexico", flag: "🇲🇽", fallback: "MX" },
  { code: "france", name: "France", flag: "🇫🇷", fallback: "FR" },
  { code: "vietnam", name: "Vietnam", flag: "🇻🇳", fallback: "VN" },
  { code: "canada", name: "Canada", flag: "🇨🇦", fallback: "CA" },
  { code: "us", name: "United States", flag: "🇺🇸", fallback: "US" },
]

export const getCountryByCode = (code: string) => {
  return countries.find((country) => country.code === code)
}
