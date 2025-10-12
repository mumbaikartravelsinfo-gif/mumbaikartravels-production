    'use client'

    import Image from "next/image"
    import { Header } from "@/components/header"
    import { Footer } from "@/components/footer"
    import { FloatingActions } from "@/components/floating-actions"
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { getPosts, type WordPressPost } from "@/lib/wordpress-api" 
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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
        try {
            setLoading(true)
            const postsData = await getPosts()
            setPosts(postsData)
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
        `}</style>
        
        <div className="pt-24 pb-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Travel Articles & Blog
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Latest travel guides, tips, and updates from Mumbai Kar Travels
                </p>
            </div>

            {/* Blog Posts Section */}
            {posts.length > 0 ? (
                <div className="space-y-16">
                {posts.map((post, index) => (
                    <article key={post.id} className="prose prose-lg max-w-none">
                    {/* Post Header */}
                    <div className="mb-8 pb-6 border-b-2 border-gray-200">
                        <h1 
                        className="text-4xl font-bold text-gray-900 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
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
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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

        <Footer />
        <FloatingActions />
        </main>
    )
    }