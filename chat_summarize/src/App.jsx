import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CoverPg from './components/cover.jsx' 
import AIChat from './components/chatbot.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoverPg />} />
        <Route path="/chat" element={<AIChat />} />
      </Routes>
    </BrowserRouter>
  );
}
