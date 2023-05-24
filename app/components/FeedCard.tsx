import Image from "next/image"

type CardProps = {
  title: string
  body: string
  ranking: number
  media: string[] // Assume this is an array of URLs for images
  mediaType: "twitter" | "internet" | "news" | "research"
  link: string
}

const FeedCard = ({ title, body, ranking, media, mediaType, link }: CardProps) => {
  let icon = "/images/feedCard/internetIcon.svg"
  console.log(mediaType)
  switch (mediaType) {
    case "twitter":
      icon = "/images/twitterIcon.svg"
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
  console.log(icon)
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 md:max-w-2xl m-4 p-6">
      <div className="w-full flex justify-between pb-3">
        <h3 className="text-[16px] font-medium text-gray-900">{title}</h3>
        <Image src={icon} alt="mediaType icon" width={22} height={22} />
      </div>
      <p className="text-gray-500 text-sm">{body}</p>
      <div className="flex overflow-x-scroll space-x-4 pt-4">
        {media.length !== 0 && (
          <>
            {media.map((imgUrl, index) => (
              <img key={index} src={imgUrl} alt={`media ${index}`} className="round" />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default FeedCard
