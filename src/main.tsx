import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import './global.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)
