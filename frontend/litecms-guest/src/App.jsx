import { useState, useEffect } from 'react';
import { apiCallTest } from './api'
import './App.css'

function App() {
  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    apiCall();
  }, [])

  const apiCall = async () => {
    try{
      const ip = await apiCallTest();
      setUserIp(ip);
    } catch(er) {
      console.log(er);
    }
  }

  return (
    <>
      <h1>{userIp}</h1>
    </>
  )
}

export default App
