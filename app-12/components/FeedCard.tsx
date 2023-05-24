import { GlobeAltIcon } from "@heroicons/react/24/outline"

interface IFeedCard extends IFeedPost {}

const FeedCard = ({ title, body, significance, media, source, link }: IFeedCard) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 md:max-w-2xl m-4 p-8">
      <div className="w-full flex justify-between">
        <h3 className="text-sm font-medium text-gray-900"> </h3>
        <p className="text-sm font-medium text-gray-900">{significance}</p>
      </div>
    </div>
  )
}

export default FeedCard
