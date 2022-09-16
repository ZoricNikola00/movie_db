import React, { useState, useTransition } from 'react'
import QuizModal from './QuizModal'

const QuizQuestions = ({questions,setStart}) => {
    const [indxQuest,setIndxQuest]=useState(0)
    const [correct,setCorrect]=useState(0)
    const [isQuizModal,setIsQuizModal]=useState(false)
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
    const reset=()=>{
      setIndxQuest(0)
      setCorrect(0)
      setIsQuizModal(false)
      setStart(false)
    }
    const checkAnswer=(e,correct)=>{
      if(e.target.textContent===correct){
        if(indxQuest+1===questions.length){
          setCorrect(p=>p+1)
          setIsQuizModal(true)
        }else{
          setCorrect(p=>p+1)
          setIndxQuest(p=>p+1)
        }
      }
      else{
        if(indxQuest+1===questions.length){
          setIsQuizModal(true)
        }
        else{
          setIndxQuest(p=>p+1)
        }
      }
    }
    const questionsEl=questions.map((quest,i,a)=>{
    const {question,incorrect_answers,correct_answer}=quest
    const allAnswers=shuffle([...incorrect_answers,correct_answer])
    return <div key={i} className='oneQuestion'>
            <div className='indxOf'><small>Question Number {i+1} of {a.length}</small></div>
            <h1 dangerouslySetInnerHTML={{ __html: question }}/>
            <div className='answers'>
                {allAnswers.map((ans,i)=>{
                    return <button onClick={(e)=>checkAnswer(e,correct_answer)} key={i} dangerouslySetInnerHTML={{ __html: ans }}/>
                })}
            </div>
            </div>
    })
  return (
    <div className='quizAnwsers'>
        {isQuizModal && <QuizModal correct={correct} reset={reset} num={questions.length}/>}
        {questionsEl[indxQuest]}
        <button className='nextBtnQuiz' onClick={()=>{indxQuest+1===questions.length?setIsQuizModal(true):setIndxQuest(p=>p+1)}}>Next</button>
    </div>
  )
}

export default QuizQuestions