import Image from "next/image"

const PhoneFeedDemo = () => {
  return (
    <div className="w-[220px] h-[450px]">
      <div className="absolute overflow-hidden h-[445px] rounded-[30px]">
        <Image
          alt="demoFeed"
          src="/images/landing/demoFeedForIphone.png"
          id="feed"
          className=""
          width={220}
          height={2000}
        ></Image>
        <Image
          alt="demoFeedIphoneScreen"
          src="/images/landing/iphoneScreenFeed.png"
          width={350}
          height={780}
          className="absolute top-0 "
        ></Image>
      </div>
    </div>
  )
}

export default PhoneFeedDemo
