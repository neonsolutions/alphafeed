import Image from "next/image"
import { useState } from "react"
import { IFeedPost } from "../interfaces/IFeedPost"

const FeedCard = ({ title, body, scores, media, source, link, publishedAt }: IFeedPost) => {
  let icon = "/images/feedCard/internetIcon.svg"
  const [dropdownVisible, setDropdownVisible] = useState(false) // New state

  switch (source) {
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
    default:
      icon = "/images/feedCard/internetIcon.svg"
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

  const formatPostDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime() // The difference in milliseconds
    const diffSec = diffMs / 1000 // The difference in seconds
    const diffMin = diffSec / 60 // The difference in minutes
    const diffHour = diffMin / 60 // The difference in hours

    if (diffMin < 60) {
      // Less than 1 hour ago
      return `${Math.floor(diffMin)} min ago`
    } else if (diffHour < 24) {
      // More than an hour but less than a day ago
      return `${Math.floor(diffHour)} hours ago`
    } else {
      // More than a day ago
      // Format the date and time to display dd/mm/yy and time
      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0") // Months are zero-indexed in JS
      const year = date.getFullYear().toString().slice(2)
      const hour = date.getHours().toString().padStart(2, "0")
      const minute = date.getMinutes().toString().padStart(2, "0")
      return `${day}/${month}/${year} ${hour}:${minute}`
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 md:max-w-2xl my-8 p-6">
      {publishedAt && <h2 className="text-gray-300 text-xl">{formatPostDate(new Date(publishedAt))}</h2>}
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
              <div className="origin-top-right z-50 absolute -left-10  top-6 w-32 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 transition-all ease-out duration-300 transform opacity-100 scale-100">
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

      {media && (
        <div className="flex overflow-x-scroll space-x-4  pb-4">
          {media.map((imgUrl, index) => (
            <img key={index} src={imgUrl} alt={`media ${index}`} className="rounded-lg" />
          ))}
        </div>
      )}

      <a href={link} target="_blank" className="text-gray-400 text-xs underline">
        {link}
      </a>
    </div>
  )
}

export default FeedCard
