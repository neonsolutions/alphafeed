import Image from "next/image"
import { useState } from "react"
import { IFeedPost } from "../interfaces/IFeedPost"
import { XCircleIcon } from "@heroicons/react/24/solid"

const FeedCard = ({ title, body, scores, media, source, link, publishedAt, externalLinks }: IFeedPost) => {
  let icon = "/images/feedCard/internetIcon.svg"
  const [dropdownVisible, setDropdownVisible] = useState(false) // New state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMedia, setModalMedia] = useState("")

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
          <div
            className="h-full bg-indigo-700 dark:bg-indigo-400 rounded-full"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const formatLink = (link: string) => {
    const maxLength = 18 // Maximum number of characters
    return link.length > maxLength ? link.slice(0, maxLength) + "..." : link
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
      if (Math.floor(diffHour) === 1) {
        return `${Math.floor(diffHour)} hour ago`
      } else {
        return `${Math.floor(diffHour)} hours ago`
      }
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
    <div className="my-1 transition-colors duration-500">
      {modalOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="pt-4 px-4 pb-20 text-center sm:p-0  h-screen ">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-800  bg-opacity-75 transition-opacity z-100"
              aria-hidden="true"
              onClick={() => setModalOpen(false)}
            ></div>
            {/* Modal content */}
            <div className="relative inline-block   rounded-lg text-left overflow-hidden shadow-xl max-w-2xl w-full mt-12 z-100 ">
              <div className="sm:flex sm:items-start">
                {[".jpeg", ".jpg", ".gif", ".png"].some((ext) => modalMedia.includes(ext)) ? (
                  <img src={modalMedia} className="rounded-lg w-full" />
                ) : (
                  <video src={modalMedia} className="rounded-lg w-full" controls />
                )}
              </div>
              <button
                className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 p-3 drop-shadow-md  "
                onClick={() => setModalOpen(false)}
              >
                <XCircleIcon className="h-8 w-8 text-gray-500 hover:text-gray-500/80" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-gray-300 dark:text-gray-500 text-[16px] transform -translate-x-44 translate-y-12 w-36 text-right md:block hidden">
        {formatPostDate(new Date(publishedAt))}
      </h2>
      <h2 className="text-gray-300 text-[16px] transform  md:hidden block mt-5 mb-1">
        {formatPostDate(new Date(publishedAt))}
      </h2>
      <div className=" mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 md:max-w-2xl  p-6 w-full">
        <div className="flex justify-between items-start pb-4">
          <div className="flex-grow min-width-0">
            <div className="text-[16px] font-medium text-gray-900 dark:text-white pr-[8px]">{title}</div>
          </div>
          <div className="flex-shrink-0 flex gap-3">
            <div
              className="relative inline-flex"
              onMouseEnter={() => setDropdownVisible(true)} // Show dropdown on hover
              onMouseLeave={() => setDropdownVisible(false)} // Hide dropdown on hover exit
            >
              <button className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-400 ring-1 ring-inset ring-indigo-700/30 dark:ring-indigo-400/70 min-w-[53px]">
                {scores.significance.toFixed(1)}
                <Image
                  alt="downIcon"
                  width={8}
                  height={8}
                  src="/images/feedCard/down.svg"
                  className="ml-1 dark:hidden"
                />
                <Image
                  alt="downIcon"
                  width={8}
                  height={8}
                  src="/images/feedCard/downDark.svg"
                  className="ml-1 dark:block hidden"
                />
              </button>
              {dropdownVisible && ( // Show dropdown if dropdownVisible is true
                <div className="origin-top-right z-50 absolute -left-10  top-6 w-32 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 transition-all ease-out duration-300 transform opacity-100 scale-100">
                  <div className="py-1 pb-4" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <p
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      role="menuitem"
                    >
                      <span>Relevance:</span>
                      <span>{scores.relevance}</span>
                    </p>
                    {renderScoreBar(scores.relevance)}
                    <p
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      role="menuitem"
                    >
                      <span>Impact:</span>
                      <span>{scores.impact}</span>
                    </p>
                    {renderScoreBar(scores.impact)}
                    <p
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                      role="menuitem"
                    >
                      <span>Novelty:</span>
                      <span>{scores.novelty}</span>
                    </p>
                    {renderScoreBar(scores.novelty)}
                    <p
                      className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
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
            <a href={link} target="_blank" className="transform hover:opacity-80 ">
              <Image src={icon} alt="mediaType icon" width={22} height={22} />
            </a>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-300 text-sm pb-4">{body}</p>
        {media && (
          <div className="flex overflow-auto space-x-4 pb-4 ">
            {media.map((url, index) => {
              const isImage = [".jpeg", ".jpg", ".gif", ".png"].some((extension) => url.includes(extension))
              return isImage ? (
                <>
                  {url && (
                    <img
                      key={index}
                      src={url}
                      alt={`media ${index}`}
                      className="rounded-lg max-h-32 cursor-pointer border border-gray-200 dark:border-gray-800"
                      onClick={() => {
                        setModalMedia(url)
                        setModalOpen(true)
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {url && (
                    <video
                      key={index}
                      src={url}
                      className="rounded-lg max-h-32 cursor-pointer border border-gray-200 dark:border-gray-800"
                      controls
                      onClick={() => {
                        setModalMedia(url)
                        setModalOpen(true)
                      }}
                    />
                  )}
                </>
              )
            })}
          </div>
        )}
        <div className="flex flex-wrap">
          {externalLinks && (
            <div className="flex flex-wrap gap-1">
              {externalLinks.map((link, index) => (
                <a href={link} target="_blank" key={"externalLink" + index}>
                  <button className="inline-flex items-center rounded-md  bg-gray-50 dark:bg-black px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-500 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-800 hover:underline ">
                    <img
                      className="py-1 h-5 pr-1 block"
                      src={`http://www.google.com/s2/favicons?domain_url=${link}`}
                      alt="external link favicon"
                    />
                    {formatLink(link)}
                  </button>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedCard
