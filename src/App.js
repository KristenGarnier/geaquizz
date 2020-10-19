import React, { Component, useState, useEffect } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './images/dragon.webp';
import './App.css';

function App() {
  const [answersCount, setAnswerCount] = useState({
    TJ: 0,
    TV: 0
  })
  const [answer, setAnswser] = useState('')
  const [question, setQuestion] = useState('')
  const [counter, setCounter] = useState(0)
  const [questionId, setQuestionId] = useState(1)
  const [answerOptions, setAnswerOptions] = useState([]);
  const [result, setResult] = useState({});
  const [category, setCategory] = useState('');

  useEffect(() => {
    setQuestion(quizQuestions[0].question)
    setAnswerOptions(quizQuestions[0].answers)
    setCategory(quizQuestions[0].category)
  }, [])

  function handleAnswerSelected(item) {
    setUserAnswer(item.answerCategory, item.answerType);

    if (questionId < quizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      setTimeout(() => setResults(getResults()), 300);
    }
  }

  function setUserAnswer(type, answer) {
    setAnswerCount(Object.assign({}, answersCount, {
      [type]: (answersCount[type] || 0) + 1
    }))
    setAnswser(answer)
  }

  function setNextQuestion() {
    const counterRef = counter + 1;
    setCounter(counterRef);
    setQuestionId(questionId + 1)
    setQuestion(quizQuestions[counterRef].question)
    setAnswerOptions(quizQuestions[counterRef].answers)
    setAnswser('')
    setCategory(quizQuestions[counterRef].category)
  }

  function getResults() {
    return Object.entries(answersCount).reduce((previous, current) => {
      const [key, value] = current;
      if (value > previous.number) {
        return {
          name: key,
          number: value
        }
      }

      return previous
    }, {
      name: '',
      number: 0
    })
  }

  function setResults(result) {
    setResult(result)
  }

  function renderResult() {
    return <Result quizResult={result} />;
  }

  function renderQuiz() {
    return (
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionId={questionId}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
      />
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>QUIZZ TEAM JEUNE TEAM VIEUX</h2>
        <p>Hey petit vieuje ! Tu ne sais pas si tu es complètement team vieux ou team jeune ?
        Pas de soucis, passe le test du Dragon Rouge pour trouver la caste qui te correspond le mieux !!
        </p>
      </div>
      <h3 className="category">Catégorie : <span>{category}</span></h3>
      {Object.keys(result).length > 0 ? renderResult() : renderQuiz()}
    </div>
  );
}

export default App;
