import './index.scss'

interface Props {
    front: {
        title: string
        desc?: string
    }
    back: {
        title: string
        desc?: string
    }
}
export default function FlipCard({front, back}: Props) {
  return (
    <div className="myCard">
      <div className="innerCard">
        <div className="frontSide">
          <p className="title">{front.title}</p>
          <p>{front.desc}</p>
        </div>
        <div className="backSide">
          <p className="title">{back.title}</p>
          <p>{back.desc}</p>
        </div>
      </div>
    </div>
  )
}
