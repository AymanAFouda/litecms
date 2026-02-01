import { useState, useEffect } from 'react';
import { getArticles } from './api'
import './App.css'

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, [])

  const fetchArticles = async () => {
    try{
      const data = await getArticles();
      setArticles(data);
    } catch(er) {
      console.log(er);
    }
  }

  return (
    <>
      {articles.map(article => (
        <>
          <h1>Id: {article.id}</h1>
          <h1>Title: {article.title}</h1>
          <p>{article.content}</p>
        </>
      ))}
    </>
  )
}

export default App
