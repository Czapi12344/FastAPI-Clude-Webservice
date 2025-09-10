import { useEffect, useState } from 'react'

const apiBase = import.meta.env.VITE_API_BASE_URL || window.location.origin

export default function App() {
  const [message, setMessage] = useState<string>('Loading...')
  const [dbStatus, setDbStatus] = useState<string>('Testing...')

  useEffect(() => {
    fetch(`${apiBase}/api/hello`)
      .then(r => r.json())
      .then(d => setMessage(d.message))
      .catch(() => setMessage('Error connecting to API'))

    fetch(`${apiBase}/api/db-test`)
      .then(r => r.json())
      .then(d => setDbStatus(d.message))
      .catch(() => setDbStatus('Database test failed'))
  }, [])

  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      maxWidth: 600, 
      margin: '100px auto', 
      padding: 32,
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 8
    }}>
      <h1 style={{ color: '#333', marginBottom: 24 }}>🌍 Hello World!</h1>
      <p style={{ fontSize: 18, color: '#666', marginBottom: 16 }}>
        Frontend: React + Vite
      </p>
      <p style={{ fontSize: 18, color: '#666', marginBottom: 16 }}>
        Backend: {message}
      </p>
      <p style={{ fontSize: 18, color: dbStatus.includes('OK') ? '#28a745' : '#dc3545', marginBottom: 24 }}>
        Database: {dbStatus}
      </p>
      <p style={{ fontSize: 14, color: '#999' }}>
        API Base: <code>{apiBase}</code>
      </p>
    </div>
  )
}
