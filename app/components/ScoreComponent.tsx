interface IScoreComponentProps {
  title: string
  score: number
  description: string
}

const calculateLeftPercentage = (score: number) => {
  return (score * 100) / 10
}
const calculateRightPercentage = (score: number) => {
  return 100 - calculateLeftPercentage(score)
}
const ScoreComponent = ({ title, score, description }: IScoreComponentProps) => {
  return (
    <div className="pb-3 sm:w-[250px] w-full">
      <div className="">
        <div className="flex justify-between">
          <p className="text-gray-900 dark:text-white">{title}</p>
          <p className="text-gray-900 dark:text-white">{score}</p>
        </div>
        <div className="w-full h-2 flex">
          {calculateLeftPercentage(score) === 100 ? (
            <div className={"bg-indigo-500 w-[" + calculateLeftPercentage(score) + "%] rounded-xl"}></div>
          ) : (
            <div className={"bg-indigo-500 w-[" + calculateLeftPercentage(score) + "%] rounded-l-xl"}></div>
          )}
          <div className={"bg-gray-300 w-[" + calculateRightPercentage(score) + "%] rounded-r-xl"}></div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-400 text-sm pt-2 ">{description}</p>
    </div>
  )
}

export default ScoreComponent
