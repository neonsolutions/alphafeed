import { useState } from "react"
import Image from "next/image"

type CardProps = {
  title: string
  body: string
  scores: {
    significance: number
    relevance: number
    impact: number
    novelty: number
    reliability: number
  }
  media: string[] | undefined
  mediaType: "twitter" | "internet" | "news" | "research"
  link: string
}

const FeedCard = ({ title, body, scores, media, mediaType, link }: CardProps) => {
  let icon = "/images/feedCard/internetIcon.svg"
  const [dropdownVisible, setDropdownVisible] = useState(false) // New state

  switch (mediaType) {
    case "twitter":
      icon = "/images/feedCard/twitterIconLight.svg"
      break
    case "internet":
      icon = "/images/feedCard/internetIcon.svg"
      break
    case "news":
      icon = "/images/feedCard/newsIcon.svg"
      break
    case "research":
      icon = "/images/feedCard/researchIcon.svg"
      break
  }

  const renderScoreBar = (score: number) => {
    const scorePercentage = (score / 10) * 100
    return (
      <div className="px-4">
        <div className="h-1 w-full bg-gray-300 rounded-full ">
          <div className="h-full bg-indigo-700 rounded-full" style={{ width: `${scorePercentage}%` }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 md:max-w-2xl my-8 p-6">
      <div className="w-full flex justify-between pb-3">
        <div className="flex justify-start gap-3">
          <h3 className="text-[16px] font-medium text-gray-900">{title}</h3>

          <div
            className="relative inline-flex"
            onMouseEnter={() => setDropdownVisible(true)} // Show dropdown on hover
            onMouseLeave={() => setDropdownVisible(false)} // Hide dropdown on hover exit
          >
            <button className="inline-flex items-center rounded-md bg-gray-100 hover:bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-700/30">
              {scores.significance.toString()}
              <Image alt="downIcon" width={8} height={8} src="/images/feedCard/down.svg" className="ml-1" />
            </button>
            {dropdownVisible && ( // Show dropdown if dropdownVisible is true
              <div className="origin-top-right z-50 absolute left-0 top-6 w-32 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 transition-all ease-out duration-300 transform opacity-100 scale-100">
                <div className="py-1 pb-4" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <p
                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    role="menuitem"
                  >
                    <span>Relevance:</span>
                    <span>{scores.relevance}</span>
                  </p>
                  {renderScoreBar(scores.relevance)}
                  <p
                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    role="menuitem"
                  >
                    <span>Impact:</span>
                    <span>{scores.impact}</span>
                  </p>
                  {renderScoreBar(scores.impact)}
                  <p
                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    role="menuitem"
                  >
                    <span>Novelty:</span>
                    <span>{scores.novelty}</span>
                  </p>
                  {renderScoreBar(scores.novelty)}
                  <p
                    className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                    role="menuitem"
                  >
                    <span>Reliability:</span>
                    <span>{scores.reliability}</span>
                  </p>
                  {renderScoreBar(scores.reliability)}
                </div>
              </div>
            )}
          </div>
        </div>

        <Image src={icon} alt="mediaType icon" width={22} height={22} />
      </div>
      <p className="text-gray-500 text-sm pb-4">{body}</p>

      {media! && (
        <div className="flex overflow-x-scroll space-x-4  pb-4">
          {media.map((imgUrl, index) => (
            <img key={index} src={imgUrl} alt={`media ${index}`} className="rounded-lg" />
          ))}
        </div>
      )}

      <p className="text-gray-400 text-xs underline">{link}</p>
    </div>
  )
}

export default FeedCard
