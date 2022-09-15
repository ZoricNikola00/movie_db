import { useGlobalContext } from "../context";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from 'react-loading';
import { useState } from "react";
import QuizQuestions from "../components/Quiz/QuizQuestions";

const Quiz = () => {
    const {fetchData}=useGlobalContext()
    const [quizQuery,setQuizQuery]=useState({number:1,difficulty:'easy',category:'11'})
    const {data,isLoading,isFetching,isError,error,refetch}=useQuery(['quiz'],()=>fetchData(`https://opentdb.com/api.php?amount=${quizQuery.number}&category=${quizQuery.category}&difficulty=${quizQuery.difficulty}&type=multiple`),{enabled:false})
    const [start,setStart]=useState(false)
    if(isLoading && isFetching){
        return <ReactLoading className='loader' type='spinningBubbles' color={'#273b55'} height={'300px'} width={'300px'}/>
    }
    
  return (
    
    <div className="quizContainer">
        {!start && <div className="quizSelection">
            <h1>Quiz</h1>
            <form onSubmit={(e)=>{e.preventDefault();refetch();setStart(true)}}>
                <label>Number Of Questions:</label>
                <input type='number' min='1' max='30' name='number' value={quizQuery.number} onChange={(e)=>setQuizQuery(pre=>({...pre,number:e.target.value}))}/>

                <label>Difficulty:</label>
                <select name='difficulty' value={quizQuery.difficulty} onChange={(e)=>setQuizQuery(pre=>({...pre,difficulty:e.target.value}))}>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
                <div className="quizRadio">
                  <label>
                    <input type="radio" checked={quizQuery.category==='11'} value="11" onChange={(e)=>setQuizQuery(pre=>({...pre,category:e.target.value}))} />
                    Movie
                  </label>
                  <label>
                    <input type="radio" checked={quizQuery.category==='14'} value="14" onChange={(e)=>setQuizQuery(pre=>({...pre,category:e.target.value}))} />
                    TV Shows
                  </label>
                </div>
            <button className="strQuiz" type="submit">Start Quiz</button>
            </form>
        </div>}
        {start && <QuizQuestions questions={data?.results}/>}
    </div>
  )
}

export default Quiz