const WORDPRESS_API_URL = 'https://public-api.wordpress.com/wp/v2/sites/mumbaikartravelsinfo-xkgir.wordpress.com'

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
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=100&orderby=date&order=desc`, {
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

// Fetch articles page specifically
export async function getArticlesPage(): Promise<WordPressPage | null> {
  try {
    // First try to fetch by slug 'article'
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=article&_embed`, {
      next: { revalidate: 300 }
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`)
    }
    const posts = await response.json()
    
    // If found as a post, convert it to page format
    if (Array.isArray(posts) && posts.length > 0) {
      return posts[0] as unknown as WordPressPage
    }
    
    // Otherwise try as a page
    const pageResponse = await fetch(`${WORDPRESS_API_URL}/pages?slug=article&_embed`, {
      next: { revalidate: 300 }
    })
    if (!pageResponse.ok) {
      throw new Error(`Failed to fetch article page: ${pageResponse.status}`)
    }
    const pages = await pageResponse.json()
    return Array.isArray(pages) && pages.length > 0 ? pages[0] : null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}