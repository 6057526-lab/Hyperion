import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { addContentItem, updateContentItem, getContentItem } from '@/lib/content'
import { isAuthenticated } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Проверка авторизации
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    const title = formData.get('title') as string
    const text = formData.get('text') as string
    const category = formData.get('category') as string
    const id = formData.get('id') as string // Для редактирования

    let imageName = null

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Создаем директорию uploads, если её нет
      const uploadsDir = join(process.cwd(), 'public', 'uploads')
      const fs = require('fs')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }

      // Если редактируем, удаляем старое изображение
      if (id) {
        const oldItem = await getContentItem(id)
        if (oldItem?.image) {
          try {
            const oldImagePath = join(uploadsDir, oldItem.image)
            await unlink(oldImagePath)
          } catch (e) {
            // Игнорируем ошибки удаления старого файла
          }
        }
      }

      // Генерируем уникальное имя файла
      const timestamp = Date.now()
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      imageName = `${timestamp}_${originalName}`
      
      const filePath = join(uploadsDir, imageName)
      await writeFile(filePath, buffer)
    } else if (id) {
      // При редактировании без нового файла сохраняем старое изображение
      const oldItem = await getContentItem(id)
      imageName = oldItem?.image || null
    }

    let item
    if (id) {
      // Редактирование
      item = await updateContentItem(id, {
        title: title || '',
        text: text || '',
        category: category || '',
        image: imageName
      })
    } else {
      // Создание нового
      item = await addContentItem({
        title: title || '',
        text: text || '',
        category: category || '',
        image: imageName
      })
    }

    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка загрузки' },
      { status: 500 }
    )
  }
}

