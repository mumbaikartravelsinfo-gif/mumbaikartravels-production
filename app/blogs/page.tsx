    'use client'

    import Image from "next/image"
    import { Header } from "@/components/header"
    import { Footer } from "@/components/footer"
    import { FloatingActions } from "@/components/floating-actions"
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { getPosts, type WordPressPost } from "@/lib/wordpress-api" 
    import { Calendar, User, ImageOff, Search, List } from "lucide-react"
    import { useEffect, useState, useRef } from "react"

    // Interface for heading navigation
    interface Heading {
        id: string
        text: string
        postId: number
        postTitle: string
    }

    // Since we're using 'use client', we need to handle data fetching differently
    // We'll fetch data in useEffect instead of using async/await at the component level

    // Component to handle WordPress images with fallback
    function WordPressImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = target.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = 'flex';
    };

    return (
        <div className={`relative ${className}`}>
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            crossOrigin="anonymous"
        />
        {/* Fallback placeholder */}
        <div className="absolute inset-0 bg-gray-200 items-center justify-center" style={{ display: 'none' }}>
            <ImageOff className="h-12 w-12 text-gray-400" />
        </div>
        </div>
    )
    }

    export default function WordPressPage() {
    const [posts, setPosts] = useState<WordPressPost[]>([])
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeHeading, setActiveHeading] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function fetchData() {
        try {
            setLoading(true)
            const postsData = await getPosts()
            setPosts(postsData)
            
            // Extract headings from posts
            const allHeadings: Heading[] = []
            postsData.forEach(post => {
                const tempDiv = document.createElement('div')
                tempDiv.innerHTML = post.content.rendered
                const headingElements = tempDiv.querySelectorAll('.wp-block-heading, h2, h3, h4')
                
                headingElements.forEach((heading, index) => {
                    const headingId = `heading-${post.id}-${index}`
                    const headingText = heading.textContent || ''
                    
                    if (headingText.trim()) {
                        allHeadings.push({
                            id: headingId,
                            text: headingText,
                            postId: post.id,
                            postTitle: post.title.rendered.replace(/<[^>]*>/g, '')
                        })
                    }
                })
            })
            
            setHeadings(allHeadings)
        } catch (err) {
            setError('Failed to fetch WordPress content')
            console.error('Error fetching WordPress data:', err)
        } finally {
            setLoading(false)
        }
        }

        fetchData()
    }, [])

    // Function to add IDs to headings in HTML content
    const addHeadingIds = (content: string, postId: number) => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = content
        const headingElements = tempDiv.querySelectorAll('.wp-block-heading, h2, h3, h4')
        
        headingElements.forEach((heading, index) => {
            const headingId = `heading-${postId}-${index}`
            heading.id = headingId
        })
        
        return tempDiv.innerHTML
    }

    // Scroll to heading
    const scrollToHeading = (headingId: string) => {
        const element = document.getElementById(headingId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setActiveHeading(headingId)
        }
    }

    // Filter headings based on search query
    const filteredHeadings = headings.filter(heading =>
        heading.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        heading.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Intersection Observer for active heading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0px -80% 0px' }
        )

        const headingElements = document.querySelectorAll('[id^="heading-"]')
        headingElements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [posts])

    if (loading) {
        return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                </h1>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <span className="ml-4 text-lg">Loading...</span>
                </div>
                </div>
            </div>
            </div>
            <Footer />
            <FloatingActions />
        </main>
        )
    }

    if (error) {
        return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                </h1>
                <div className="py-20">
                    <p className="text-red-500 text-lg">{error}</p>
                    <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                    Try Again
                    </button>
                </div>
                </div>
            </div>
            </div>
            <Footer />
            <FloatingActions />
        </main>
        )
    }

    return (
        <main className="min-h-screen">
        <Header />
        
        {/* Custom styles for WordPress content */}
        <style jsx global>{`
            .article-content .wp-block-heading,
            .article-content h2,
            .article-content h3,
            .article-content h4 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1f2937;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.3;
            }
            
            .article-content h3 {
            font-size: 1.5rem;
            }
            
            .article-content h4 {
            font-size: 1.25rem;
            }
            
            .article-content p {
            font-size: 1.125rem;
            line-height: 1.75;
            color: #374151;
            margin-bottom: 1.5rem;
            }
            
            .article-content blockquote {
            border-left: 4px solid #ff3131;
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: #6b7280;
            }
            
            .article-content blockquote p {
            margin-bottom: 0.5rem;
            }
            
            .article-content a {
            color: #ff3131;
            text-decoration: underline;
            }
            
            .article-content a:hover {
            color: #cc2727;
            }
            
            .article-content ul,
            .article-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
            }
            
            .article-content li {
            margin-bottom: 0.75rem;
            font-size: 1.125rem;
            line-height: 1.75;
            color: #374151;
            }
            
            .sidebar-nav {
            position: sticky;
            top: 100px;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
            }
            
            .sidebar-nav::-webkit-scrollbar {
            width: 6px;
            }
            
            .sidebar-nav::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
            }
            
            .sidebar-nav::-webkit-scrollbar-thumb {
            background: #ff3131;
            border-radius: 10px;
            }
            
            .sidebar-nav::-webkit-scrollbar-thumb:hover {
            background: #cc2727;
            }
        `}</style>
        
        <div className="pt-24 pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Travel Articles & Blog
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Latest travel guides, tips, and updates from Mumbai Kar Travels
                </p>
            </div>

            {/* Main Content with Sidebar */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:w-80 flex-shrink-0">
                <div className="sidebar-nav bg-gray-50 rounded-lg p-6 border border-gray-200">
                    {/* Search Box */}
                    <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search headings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    </div>

                    {/* Table of Contents */}
                    <div>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-300">
                        <List className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-gray-900">Table of Contents</h3>
                    </div>

                    {filteredHeadings.length > 0 ? (
                        <nav className="space-y-1">
                        {filteredHeadings.map((heading) => (
                            <button
                            key={heading.id}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                activeHeading === heading.id
                                ? 'bg-primary text-white font-medium'
                                : 'text-gray-700 hover:bg-gray-200'
                            }`}
                            >
                            <div className="font-medium truncate">{heading.text}</div>
                            <div className="text-xs opacity-75 truncate">{heading.postTitle}</div>
                            </button>
                        ))}
                        </nav>
                    ) : (
                        <p className="text-sm text-gray-500 italic">No headings found</p>
                    )}
                    </div>
                </div>
                </aside>

                {/* Blog Posts Content */}
                <div className="flex-1 min-w-0" ref={contentRef}>
            {posts.length > 0 ? (
                <div className="space-y-16">
                {posts.map((post, index) => (
                    <article key={post.id} className="prose prose-lg max-w-none">
                    {/* Post Header */}
                    <div className="mb-8 pb-6 border-b-2 border-gray-200">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                            })}
                        </span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                        <div className="mb-8 rounded-lg overflow-hidden">
                        <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                            className="w-full h-auto object-cover"
                        />
                        </div>
                    )}

                    {/* Post Content */}
                    <div 
                        className="article-content text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: addHeadingIds(post.content.rendered, post.id) }}
                    />

                    {/* Separator between posts */}
                    {index < posts.length - 1 && (
                        <hr className="my-16 border-t-2 border-gray-300" />
                    )}
                    </article>
                ))}
                </div>
            ) : (
                /* No Content Message */
                <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-semibold mb-4">No Content Available</h3>
                    <p className="text-muted-foreground">
                    Unable to fetch content from the WordPress site at this time. Please try again later.
                    </p>
                </div>
                </div>
            )}
                </div>
            </div>
            </div>
        </div>

        <Footer />
        <FloatingActions />
        </main>
    )
    }