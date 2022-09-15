import React, { useState } from 'react'

const QuizQuestions = ({questions}) => {
    const [indxQuest,setIndxQuest]=useState(0)
    const shuffle=(array)=>{
        let currentIndex = array.length,  randomIndex;
              while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    const questionsEl=questions.map((quest,i)=>{
    const {question,incorrect_answers,correct_answer}=quest
    const allAnswers=shuffle([...incorrect_answers,correct_answer])
    return <div className='oneQuestion'>
            <h1 dangerouslySetInnerHTML={{ __html: question }}/>
            <div className='answers'>
                {allAnswers.map((ans,i)=>{
                    return <button key={i}>{ans}</button>
                })}
            </div>
            </div>
    })
  return (
    <div className='quizAnwsers'>
        {questionsEl[indxQuest]}
        <button onClick={()=>setIndxQuest(p=>p+1)}>Next</button>
    </div>
  )
}

export default QuizQuestions