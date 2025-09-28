    'use client'

    import Image from "next/image"
    import { Header } from "@/components/header"
    import { Footer } from "@/components/footer"
    import { FloatingActions } from "@/components/floating-actions"
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { getPosts, getPages, type WordPressPost, type WordPressPage } from "@/lib/wordpress-api" 
    import { Calendar, User, ImageOff } from "lucide-react"
    import { useEffect, useState } from "react"

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
    const [pages, setPages] = useState<WordPressPage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
        try {
            setLoading(true)
            const [postsData, pagesData] = await Promise.all([
            getPosts(),
            getPages()
            ])
            setPosts(postsData)
            setPages(pagesData)
        } catch (err) {
            setError('Failed to fetch WordPress content')
            console.error('Error fetching WordPress data:', err)
        } finally {
            setLoading(false)
        }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                    WordPress Content
                </h1>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <span className="ml-4 text-lg">Loading WordPress content...</span>
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
                    WordPress Content
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
        
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                WordPress Content
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Latest updates, articles, and information from our WordPress site
                </p>
            </div>

            {/* Posts Section */}
            {posts.length > 0 && (
                <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                    <div key={post.id} className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300">
                        {/* Featured Image */}
                        {post._embedded?.['wp:featuredmedia']?.[0] && (
                        <div className="aspect-video overflow-hidden rounded-xl mb-4 relative bg-white/10">
                            <WordPressImage
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                            className="w-full h-full"
                            />
                        </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="inline-block bg-black/20 px-3 py-1 rounded-lg text-sm font-medium mb-4">
                            BLOG
                        </div>
                        
                        {/* Description */}
                        <div 
                            className="text-white/90 mb-6 line-clamp-2 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]*>/g, '') }}
                        />
                        
                        {/* Specs */}
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-white/80 text-sm">Published</span>
                                <span className="font-semibold">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-white/80 text-sm">Category</span>
                                <span className="font-semibold">Article</span>
                            </div>
                        </div>
                        
                        {/* Book Now Button */}
                        <a
                            href={`https://krishtiwari.xyz/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-white/15 hover:bg-white/25 text-center py-3 rounded-xl font-medium transition-colors backdrop-blur-sm border border-white/20"
                        >
                            Read More
                        </a>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {/* No Content Message */}
            {posts.length === 0 && pages.length === 0 && (
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

        <Footer />
        <FloatingActions />
        </main>
    )
    }