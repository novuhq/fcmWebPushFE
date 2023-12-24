import { useEffect, useState } from 'react'
import { messaging } from './firebase'
import { getToken } from 'firebase/messaging'
import axios from 'axios'
import './App.css'
import { onMessageListener } from './firebase'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  async function requestPermission() {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      // get token
      const token = await getToken(messaging, { vapidkey: import.meta.env.VITE_VAPID_KEY })
    } else if (permission === 'denied') {
      alert('Persmission denied!')
    }
  }


  useEffect(() => {
    requestPermission();
  }, [])

  const onClickHandler = async (e) => {
    e.preventDefault()
    // console.log('clicked')
    await axios.post('http://localhost:3001/sendNotif/create', { title, body })
    setBody('')
    setTitle('')
    // toast(title, body)
    toast.success(<div>{title} - {body}</div>,)
  }
  return (
    <>
      <h1>Hi FCM!</h1>
      <form onSubmit={onClickHandler}>
        <input placeholder='Enter notification title' onChange={(e) => setTitle(e.target.value)} value={title} />
        <input placeholder='Enter notification text' onChange={(e) => setBody(e.target.value)} value={body} />
        <button>Submit</button>
      </form>
      <Toaster />
    </>
  )
}

export default App
