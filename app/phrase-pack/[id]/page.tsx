import { phrasePacksData } from "../../data/phrase-packs"
import PhrasePackClient from "./PhrasePackClient"

export function generateStaticParams() {
  return Object.keys(phrasePacksData).map(id => ({ id }))
}

interface PageProps {
  params: {
    id: string
  }
}

export default function PhrasePackPage({ params }: PageProps) {
  const packData = phrasePacksData[params.id as keyof typeof phrasePacksData]
  return <PhrasePackClient packData={packData} />
}
