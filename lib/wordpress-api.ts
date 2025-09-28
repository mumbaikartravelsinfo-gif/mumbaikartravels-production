const WORDPRESS_API_URL = 'https://krishtiwari.xyz/wp-json/wp/v2'

export interface WordPressPost {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  slug: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WordPressPage {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  slug: string
  date: string
  modified: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

// Fetch all posts with embedded media
export async function getPosts(): Promise<WordPressPost[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=10`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }
    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
  } catch (error) {
    console.error('Error fetching WordPress posts:', error)
    return []
  }
}

// Fetch all pages
export async function getPages(): Promise<WordPressPage[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/pages?_embed&per_page=20`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`)
    }
    const pages = await response.json()
    return Array.isArray(pages) ? pages : []
  } catch (error) {
    console.error('Error fetching WordPress pages:', error)
    return []
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 300 }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`)
    }
    const posts = await response.json()
    return Array.isArray(posts) && posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error('Error fetching WordPress post by slug:', error)
    return null
  }
}

// Fetch page by slug
export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/pages?slug=${slug}&_embed`, {
      next: { revalidate: 300 }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`)
    }
    const pages = await response.json()
    return Array.isArray(pages) && pages.length > 0 ? pages[0] : null
  } catch (error) {
    console.error('Error fetching WordPress page by slug:', error)
    return null
  }
}