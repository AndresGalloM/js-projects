import { useWordsStore } from "../store/words"

export const Results = () => {
  const {correct, incorrect, missed} = useWordsStore(state => state.stats)

  return (
    <div className='results'>
      <div>
        <p>Characters</p>
        <p>{correct + incorrect + missed}</p>
      </div>
      <div>
        <p>Corrects</p>
        <p>{correct}</p>
      </div>
      <div>
        <p>Incorrects</p>
        <p>{incorrect}</p>
      </div>
      <div>
        <p>Missed</p>
        <p>{missed}</p>
      </div>
    </div>
  )
}