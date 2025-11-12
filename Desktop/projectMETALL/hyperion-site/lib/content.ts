import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const contentFile = path.join(dataDir, 'content.json')

// Создаем директорию и файл, если их нет
function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(contentFile)) {
    fs.writeFileSync(contentFile, JSON.stringify([]))
  }
}

export async function getContent() {
  ensureDataFile()
  const fileContent = fs.readFileSync(contentFile, 'utf-8')
  return JSON.parse(fileContent)
}

export async function saveContent(content: any[]) {
  ensureDataFile()
  fs.writeFileSync(contentFile, JSON.stringify(content, null, 2))
}

export async function addContentItem(item: any) {
  const content = await getContent()
  const newItem = {
    id: Date.now().toString(),
    ...item,
    createdAt: new Date().toISOString()
  }
  content.push(newItem)
  await saveContent(content)
  return newItem
}

export async function deleteContentItem(id: string) {
  const content = await getContent()
  const filtered = content.filter((item: any) => item.id !== id)
  await saveContent(filtered)
}

export async function updateContentItem(id: string, updates: any) {
  const content = await getContent()
  const index = content.findIndex((item: any) => item.id === id)
  
  if (index === -1) {
    throw new Error('Элемент не найден')
  }

  content[index] = {
    ...content[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  await saveContent(content)
  return content[index]
}

export async function getContentItem(id: string) {
  const content = await getContent()
  return content.find((item: any) => item.id === id)
}

export async function searchContent(query: string) {
  const content = await getContent()
  const lowerQuery = query.toLowerCase()
  
  return content.filter((item: any) => {
    const titleMatch = item.title?.toLowerCase().includes(lowerQuery)
    const textMatch = item.text?.toLowerCase().includes(lowerQuery)
    const categoryMatch = item.category?.toLowerCase().includes(lowerQuery)
    return titleMatch || textMatch || categoryMatch
  })
}

export async function getContentByCategory(category: string) {
  const content = await getContent()
  return content.filter((item: any) => item.category === category)
}

export async function getAllCategories() {
  const content = await getContent()
  const categories = new Set<string>()
  content.forEach((item: any) => {
    if (item.category) {
      categories.add(item.category)
    }
  })
  return Array.from(categories).sort()
}

