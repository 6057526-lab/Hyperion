'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Ошибка входа')
      }
    } catch (err) {
      setError('Ошибка при входе в систему')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Вход в админ-панель</h1>
        
        {error && (
          <div style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '5px',
            background: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#0070f3' }}>
            Вернуться на главную
          </Link>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          background: '#e7f3ff', 
          borderRadius: '5px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>По умолчанию:</strong><br />
          Логин: admin<br />
          Пароль: admin123<br />
          <small>(Измените в переменных окружения)</small>
        </div>
      </div>
    </div>
  )
}


