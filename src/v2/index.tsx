import Sparkle from '@chad.b.morrow/sparkles'
import FlipCard from '../components/FlipCard'
import './index.scss'
import coupleImg1 from '@/assets/couple1.svg'
import coupleImg2 from '@/assets/couple2.svg'
import { randomNFromArray } from '@/utils/randomNFromArray'
import { cardInfoList } from './consts'

export default function Version2() {
  const cardList = randomNFromArray(cardInfoList, 3).map((card) => (
    <FlipCard front={card.front} back={card.back} />
  ))
  return (
    <div className="bg-[#060709] h-screen v2-container overflow-x-hidden">
      <div className="text-7xl font-bold text-ba my-10">
        <h1 className="header-title text-center w-3/4 mx-auto">
          希望所有深爱的人能够久别重逢 如我们一样
        </h1>
      </div>
      <div className="flex justify-between w-3/4 mx-auto">
        <img src={coupleImg1} className="w-72" />
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
