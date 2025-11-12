'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [contentUpdated, setContentUpdated] = useState(false)

  useEffect(() => {
    checkAuth()
    loadCategories()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      setAuthenticated(data.authenticated)
      if (!data.authenticated) {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    } finally {
      setChecking(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/content?categories=true')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = async (item: any) => {
    setEditingId(item.id)
    setTitle(item.title || '')
    setText(item.text || '')
    setCategory(item.category || '')
    setImage(null)
    setPreview(item.image ? `/uploads/${item.image}` : null)
    setMessage(null)
    
    // Прокрутка к форме
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTitle('')
    setText('')
    setCategory('')
    setImage(null)
    setPreview(null)
    setMessage(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      if (image) {
        formData.append('image', image)
      }
      formData.append('title', title)
      formData.append('text', text)
      
      // Используем новую категорию, если она указана, иначе существующую
      const finalCategory = newCategory.trim() || category
      formData.append('category', finalCategory)
      
      if (editingId) {
        formData.append('id', editingId)
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: editingId ? 'Контент успешно обновлен!' : 'Контент успешно добавлен!' 
        })
        handleCancelEdit()
        router.refresh()
        loadCategories()
        // Обновим список через небольшой таймаут
        setTimeout(() => {
          setContentUpdated((prev) => !prev)
        }, 100)
      } else {
        setMessage({ type: 'error', text: data.error || 'Ошибка загрузки' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при отправке данных' })
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          Проверка авторизации...
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="container">
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem' }}>Админ-панель</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/" className="btn btn-primary">
            На главную
          </Link>
          <button onClick={handleLogout} className="btn" style={{ background: '#666', color: 'white' }}>
            Выйти
          </button>
        </div>
      </header>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>
          {editingId ? 'Редактировать контент' : 'Добавить новый контент'}
        </h2>
        
        {message && (
          <div style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '5px',
            background: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Заголовок (необязательно)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="text">Текст (необязательно)</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите текст..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              {categories.length > 0 && (
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                    setNewCategory('')
                  }}
                  style={{
                    flex: '1',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
              <input
                type="text"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value)
                  setCategory('')
                }}
                placeholder="Или введите новую категорию"
                style={{
                  flex: '1',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Изображение {editingId && '(оставьте пустым, чтобы сохранить текущее)'}</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Сохранение...' : editingId ? 'Сохранить изменения' : 'Добавить контент'}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={handleCancelEdit}
                className="btn"
                style={{ background: '#999', color: 'white' }}
              >
                Отмена
              </button>
            )}
          </div>
        </form>
      </div>

      <ContentList key={contentUpdated ? 'updated' : 'default'} onEdit={handleEdit} />
    </div>
  )
}

const ContentList = ({ onEdit }: { onEdit: (item: any) => void }) => {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return
    }

    try {
      const response = await fetch(`/api/content?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.success) {
        loadContent()
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  useEffect(() => {
    loadContent()
  }, [])


  if (loading) {
    return <div className="card">Загрузка...</div>
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Существующий контент</h2>
      {content.length === 0 ? (
        <div className="card">
          <p style={{ color: '#999', textAlign: 'center' }}>Контент отсутствует</p>
        </div>
      ) : (
        <div className="grid">
          {content.map((item: any) => (
            <div key={item.id} className="card">
              {item.image && (
                <img 
                  src={`/uploads/${item.image}`} 
                  alt={item.title || 'Изображение'}
                  style={{ width: '100%', borderRadius: '5px', marginBottom: '15px' }}
                />
              )}
              {item.category && (
                <span style={{
                  display: 'inline-block',
                  padding: '5px 10px',
                  background: '#e7f3ff',
                  color: '#0070f3',
                  borderRadius: '3px',
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  {item.category}
                </span>
              )}
              {item.title && (
                <h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
              )}
              {item.text && (
                <p style={{ color: '#666', marginBottom: '10px' }}>{item.text}</p>
              )}
              <small style={{ color: '#999', display: 'block', marginBottom: '10px' }}>
                {new Date(item.createdAt).toLocaleDateString('ru-RU')}
              </small>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onEdit(item)}
                  className="btn btn-primary"
                  style={{ flex: '1' }}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger"
                  style={{ flex: '1' }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
