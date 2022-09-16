import React from 'react'

const QuizModal = ({correct,num,reset}) => {
  return (
    <div className='quizModalCont'>
        <div className='quizModalContent'>
            <h3>{correct} of {num} are correct!</h3>
            <button onClick={reset}>Try Again?</button>
        </div>
    </div>
  )
}

export default QuizModal