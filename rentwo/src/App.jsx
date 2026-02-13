import './App.css'
import { useState } from 'react'
import BottomNav from './components/BottomNav'

export default function App() {
  const [activateTab, setActivateTab] = useState('Swipe')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: 16 }}>
        <h2>Aba : <h2>{activateTab}</h2> </h2>
      </div>

        <BottomNav activateTab={activateTab} onTabChange={setActivateTab} />      
    </div>
  )
} 