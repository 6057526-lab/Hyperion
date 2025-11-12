import { cookies } from 'next/headers'
import crypto from 'crypto'

// Простая система авторизации с хешированием пароля
// В продакшене используйте более безопасные методы (bcrypt, JWT с refresh tokens)

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + SESSION_SECRET).digest('hex')
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const hashedPassword = hashPassword(password)
  const expectedHash = hashPassword(ADMIN_PASSWORD)
  
  return username === ADMIN_USERNAME && hashedPassword === expectedHash
}

export async function createSession(): Promise<string> {
  const sessionId = crypto.randomBytes(32).toString('hex')
  const cookieStore = await cookies()
  cookieStore.set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 дней
  })
  return sessionId
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('session')?.value || null
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}


