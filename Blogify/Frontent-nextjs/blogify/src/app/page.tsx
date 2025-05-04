'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PenTool, Lock, Users, MessageCircle, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Blogify
          </h1>
          <div className="flex gap-6 items-center">
            <a href="/posts" className="text-gray-300 hover:text-white">Browse Posts</a>
            <a href="/categories" className="text-gray-300 hover:text-white">Categories</a>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Where Ideas Take Flight
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Share your stories, connect with readers, and explore a world of ideas
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => router.push('/posts')}
              className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
            >
              Explore Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            {!token && (
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => router.push('/register')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Join Blogify
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
          Trending Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{post.title}</h3>
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
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <PenTool className="w-12 h-12 mx-auto text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Write with Ease</h3>
            <p className="text-gray-400">Beautiful editor with markdown support</p>
          </div>
          <div className="text-center p-6">
            <Lock className="w-12 h-12 mx-auto text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Secure Platform</h3>
            <p className="text-gray-400">Your content and data are protected</p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 mx-auto text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Grow Your Audience</h3>
            <p className="text-gray-400">Connect with engaged readers</p>
          </div>
          <div className="text-center p-6">
            <MessageCircle className="w-12 h-12 mx-auto text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Engage with Community</h3>
            <p className="text-gray-400">Join discussions and get feedback</p>
          </div>
        </div>
      </section>

      {/* Auth CTA */}
      {!token && (
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Start Your Writing Journey
          </h2>
          <p className="text-gray-300 mb-8">Join thousands of writers sharing their stories</p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => router.push('/register')} 
              className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Create Account
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => router.push('/login')} 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-100">Blogify</h4>
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
          <p>© 2025 Blogify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}