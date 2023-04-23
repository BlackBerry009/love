import FlipCard from '../components/FlipCard'
import './index.scss'
import coupleImg1 from '@/assets/couple1.svg'
import coupleImg2 from '@/assets/couple2.svg'

export default function Version2() {
  return (
    <div className="bg-[#060709] h-screen v2-container overflow-x-hidden">
      <div className="text-7xl font-bold text-ba my-10">
        <h1 className="header-title text-center w-3/4 mx-auto">
          希望所有深爱的人能够久别重逢 如我们一样
        </h1>
      </div>
      <div>
        <div>
          <img src={coupleImg1} alt="" />
        </div>
        <div>
          <img src={coupleImg2} alt="" />
        </div>
      </div>
      <div>
        <div className="mt-8 flex justify-between mx-auto w-3/5">
          <FlipCard front={{ title: 'abc' }} back={{ title: 'vc' }} />
          <FlipCard front={{ title: 'abc' }} back={{ title: 'vc' }} />
          <FlipCard front={{ title: 'abc' }} back={{ title: 'vc' }} />
        </div>
      </div>
    </div>
  )
}
