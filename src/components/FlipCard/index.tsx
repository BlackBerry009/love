import './index.scss'

export interface FlipCardProps {
    front: {
        title: string
        desc?: string
    }
    back: {
        desc?: string
    }
}
export default function FlipCard({front, back}: FlipCardProps) {
  return (
    <div className="myCard">
      <div className="innerCard">
        <div className="frontSide">
          <p className="title">{front.title}</p>
          <p>{front.desc}</p>
        </div>
        <div className="backSide">
          <p>{back.desc}</p>
        </div>
      </div>
    </div>
  )
}
