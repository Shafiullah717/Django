'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PenTool, Lock, Users, MessageCircle, ArrowRight, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}


export default function Home() {
  const { token } = useAuth();
  const router = useRouter();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/posts/');
        const data = await response.json();
        setFeaturedPosts(data.payload.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Skip to Content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only fixed top-4 left-4 p-2 bg-blue-600 text-white rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Mobile Navigation */}
      <header className="bg-gray-900 border-b border-gray-700 lg:hidden">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          Likho
          </h1>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger aria-label="Open menu">
              <Menu className="h-6 w-6 text-gray-300" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 border-l border-gray-700">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                  Likho
                  </h2>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:bg-gray-800 h-9 w-9"
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                  <SheetClose asChild>
                    <a 
                      href="/posts" 
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Browse Posts
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a 
                      href="/categories" 
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Categories
                    </a>
                  </SheetClose>
                  {token ? (
                    <SheetClose asChild>
                      <Button 
                        onClick={() => router.push('/dashboard')}
                        className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
                      >
                        Dashboard
                      </Button>
                    </SheetClose>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <SheetClose asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => router.push('/login')}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Sign In
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          onClick={() => router.push('/register')}
                          className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
                        >
                          Register
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      
      {/* Desktop Navigation */}
      <header className="bg-gray-900 border-b border-gray-700 hidden lg:block">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          Likho
          </h1>
          <div className="flex gap-6 items-center">
            <a href="/posts" className="text-gray-300 hover:text-blue-400 transition-colors">Browse Posts</a>
            <a href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Categories</a>
            {token ? (
              <Button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
              >
                Dashboard
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/login')}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => router.push('/register')}
                  className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Where Ideas Take Flight
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 px-4">
              Share your stories, connect with readers, and explore a world of ideas
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button 
                size="lg" 
                onClick={() => router.push('/posts')}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 transition-transform hover:scale-105"
              >
                Explore Posts
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              {!token && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => router.push('/register')}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-transform hover:scale-105"
                >
                  Join Likho
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Trending Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg shadow-xl p-6 h-64 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2 w-2/3"></div>
                </div>
              ))
            ) : featuredPosts.length > 0 ? (
              featuredPosts.map(post => (
                <div 
                  key={post.id} 
                  className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-3 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No posts available yet. Be the first to share!
              </div>
            )}
          </div>
        </section>

        {/* Value Propositions */}
        <section className="bg-gray-900 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 hover:bg-gray-800/50 rounded-lg transition-all">
              <PenTool className="w-12 h-12 mx-auto text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Write with Ease</h3>
              <p className="text-gray-400">Beautiful editor with markdown support</p>
            </div>
            <div className="text-center p-6 hover:bg-gray-800/50 rounded-lg transition-all">
              <Lock className="w-12 h-12 mx-auto text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Secure Platform</h3>
              <p className="text-gray-400">Your content and data are protected</p>
            </div>
            <div className="text-center p-6 hover:bg-gray-800/50 rounded-lg transition-all">
              <Users className="w-12 h-12 mx-auto text-blue-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Grow Your Audience</h3>
              <p className="text-gray-400">Connect with engaged readers</p>
            </div>
            <div className="text-center p-6 hover:bg-gray-800/50 rounded-lg transition-all">
              <MessageCircle className="w-12 h-12 mx-auto text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Engage with Community</h3>
              <p className="text-gray-400">Join discussions and get feedback</p>
            </div>
          </div>
        </section>

        {/* Auth CTA */}
        {!token && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <div className="flex flex-col gap-4 sm:gap-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                Start Your Writing Journey
              </h2>
              <p className="text-gray-300 mb-4 md:mb-6">Join thousands of writers sharing their stories</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => router.push('/register')} 
                  className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 gap-2 transition-transform hover:scale-105"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => router.push('/login')} 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 gap-2 transition-transform hover:scale-105"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8 md:py-12 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Likho</h4>
            <p className="text-gray-400">Empowering writers since 2024</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/posts" className="hover:text-blue-400 transition-colors">All Posts</a></li>
              <li><a href="/categories" className="hover:text-blue-400 transition-colors">Categories</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Connect</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Discord</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Likho by Shafiullah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}