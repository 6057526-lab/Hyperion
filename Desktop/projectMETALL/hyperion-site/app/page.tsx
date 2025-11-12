'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [content, setContent] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const loadContent = async () => {
    try {
      let url = '/api/content'
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`
      } else if (selectedCategory) {
        url += `?category=${encodeURIComponent(selectedCategory)}`
      }
      
      const response = await fetch(url)
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
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

  useEffect(() => {
    loadContent()
    loadCategories()
  }, [selectedCategory, searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedCategory('') // Сброс категории при поиске
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
    setSearchQuery('') // Сброс поиска при выборе категории
  }

  return (
    <div className="container">
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Hyperion CMS</h1>
        <p style={{ color: '#666' }}>Система управления контентом</p>
        <Link href="/admin" style={{ 
          display: 'inline-block', 
          marginTop: '20px',
          padding: '10px 20px',
          background: '#0070f3',
          color: 'white',
          borderRadius: '5px'
        }}>
          Админ-панель
        </Link>
      </header>

      {/* Поиск и фильтры */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Поиск по контенту..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleCategoryChange('')}
                style={{
                  padding: '10px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  background: selectedCategory === '' ? '#0070f3' : '#f0f0f0',
                  color: selectedCategory === '' ? 'white' : '#333',
                  cursor: 'pointer'
                }}
              >
                Все
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    background: selectedCategory === cat ? '#0070f3' : '#f0f0f0',
                    color: selectedCategory === cat ? 'white' : '#333',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          Загрузка...
        </div>
      ) : (
        <>
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
                  <h2 style={{ marginBottom: '10px' }}>{item.title}</h2>
                )}
                {item.text && (
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{item.text}</p>
                )}
                <small style={{ color: '#999' }}>
                  {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                </small>
              </div>
            ))}
          </div>

          {content.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <p>
                {searchQuery || selectedCategory 
                  ? 'Ничего не найдено' 
                  : 'Контент пока отсутствует. Добавьте его через админ-панель!'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

