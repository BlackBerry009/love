import './index.scss'


interface Props {
  wordList: string[]
}

export default function FusionChange({ wordList }: Props) {
  return (
    <div className="fusion-change">
      {wordList.map((word) => (
        <div className="word">{word}</div>
      ))}
    </div>
  )
}
