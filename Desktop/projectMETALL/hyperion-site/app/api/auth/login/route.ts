import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Логин и пароль обязательны' },
        { status: 400 }
      )
    }

    const isValid = await verifyCredentials(username, password)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Неверный логин или пароль' },
        { status: 401 }
      )
    }

    await createSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Ошибка входа' },
      { status: 500 }
    )
  }
}


