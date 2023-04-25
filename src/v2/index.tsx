import Sparkle from '@chad.b.morrow/sparkles'
import FlipCard from '../components/FlipCard'
import './index.scss'
import coupleImg1 from '@/assets/couple1.svg'
import coupleImg2 from '@/assets/couple2.svg'
import { randomNFromArray } from '@/utils/randomNFromArray'
import { cardInfoList } from './consts'
import { useEffect, useState } from 'react'

const START_TIME = new Date('2022/10/24').getTime()

const CountDownList = () => {
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      const gapTime = Date.now() - START_TIME
      const days = Math.floor(gapTime / (24 * 60 * 60 * 1000))
      const hours = Math.floor((gapTime / (60 * 60 * 1000)) % 24)
      const minutes = Math.floor((gapTime / (60 * 1000)) % 60)
      const seconds = Math.floor((gapTime / 1000) % 60)
      setDay(days)
      setHour(hours)
      setMinute(minutes)
      setSecond(seconds)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <ul>
      <li>
        <span>{day}</span>days
      </li>
      <li>
        <span>{hour}</span>Hours
      </li>
      <li>
        <span>{minute}</span>Minutes
      </li>
      <li>
        <span>{second}</span>Seconds
      </li>
    </ul>
  )
}

export default function Version2() {
  const cardList = randomNFromArray(cardInfoList, 3).map((card) => (
    <FlipCard front={card.front} back={card.back} />
  ))
  return (
    <div className="bg-[#060709] h-screen v2-container overflow-x-hidden">
      <div className="text-7xl font-bold text-ba my-10">
        <h1 className="header-title text-center w-3/4 mx-auto">
          <p>希望所有深爱的人能够久别重逢</p>
          <p>如我们一样</p>
        </h1>
      </div>
      <div className="flex justify-between w-3/4 mx-auto items-center">
        <img src={coupleImg1} className="w-72" />
        <div id="clock">
          <p className="date">FROM 2022/10/24 TO FOREVER</p>
          <p className="time">
            <CountDownList />
          </p>
        </div>
        <img src={coupleImg2} className="w-72" />
      </div>
      <hr className="my-20" />
      <div className="text-xl text-white text-center">
        想一直一直和你在一起，在平淡的生活里不缺乏浪漫与陪伴，
        <Sparkle>一日三餐，有你便好。</Sparkle>
      </div>
      <div>
        <div className="mt-20 flex justify-between mx-auto w-4/5">
          {cardList}
        </div>
      </div>
    </div>
  )
}
