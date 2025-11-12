import { NextRequest, NextResponse } from 'next/server'
import { getContent, deleteContentItem, searchContent, getContentByCategory, getAllCategories, getContentItem } from '@/lib/content'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const id = searchParams.get('id')

    if (id) {
      // Получить один элемент
      const item = await getContentItem(id)
      if (!item) {
        return NextResponse.json(
          { error: 'Элемент не найден' },
          { status: 404 }
        )
      }
      return NextResponse.json(item)
    }

    if (search) {
      // Поиск
      const results = await searchContent(search)
      return NextResponse.json(results)
    }

    if (category) {
      // Фильтр по категории
      const results = await getContentByCategory(category)
      return NextResponse.json(results)
    }

    // Все категории
    if (searchParams.get('categories') === 'true') {
      const categories = await getAllCategories()
      return NextResponse.json(categories)
    }

    // Весь контент
    const content = await getContent()
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка загрузки контента' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Проверка авторизации
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Не авторизован' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID не указан' },
        { status: 400 }
      )
    }

    await deleteContentItem(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка удаления' },
      { status: 500 }
    )
  }
}

