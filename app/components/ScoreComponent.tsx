import React, { useState, useEffect, useRef } from "react"

interface IScoreComponentProps {
  title: string
  score: number
  description: string
}

const calculateLeftPercentage = (score: number) => {
  return (score * 100) / 10
}

const ScoreComponent = ({ title, score, description }: IScoreComponentProps) => {
  const [loadAnimation, setLoadAnimation] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadAnimation(true)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const barClassName = `h-full bg-indigo-500 transition-all duration-[2000ms] ease-in-out ${
    loadAnimation ? "" : "w-0"
  } ${score === 10 ? "rounded-xl" : "rounded-l-xl"}`

  return (
    <div className="pb-3 sm:w-[250px] w-full" ref={ref}>
      <div className="">
        <div className="flex justify-between">
          <p className="text-gray-900 dark:text-white">{title}</p>
          <p className="text-gray-900 dark:text-white">{score}</p>
        </div>
        <div className="w-full h-2 bg-gray-300 rounded-xl">
          <div
            className={barClassName}
            style={{ width: loadAnimation ? `${calculateLeftPercentage(score)}%` : "0%" }}
          ></div>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-400 text-sm pt-2 ">{description}</p>
    </div>
  )
}

export default ScoreComponent
