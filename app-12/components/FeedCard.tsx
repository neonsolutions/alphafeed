import { GlobeAltIcon } from "@heroicons/react/24/outline"

type CardProps = {
  title: string
  body: string
  ranking: number
  media: string // Assume this is a URL for an image
  mediaType: "twitter" | "internet" | "news" | "research"
  link: string
}

const FeedCard = ({ title, body, ranking, media, mediaType, link }: CardProps) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 md:max-w-2xl m-4 p-8">
      <div className="w-full flex justify-between">
        <h3 className="text-sm font-medium text-gray-900"> </h3>
      </div>
    </div>
  )
}

export default FeedCard
