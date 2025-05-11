'use client';

import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ConfirmModal } from '@/components/confirm-modal';
import { Edit, Trash, Plus, LogIn, UserPlus, LogOut, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  author?: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts/');
        setPosts(res.data.payload);
      } catch (err) {
        toast.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/posts/${id}/`);
      setPosts(prev => prev.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    } finally {
      setDeletePostId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-gray-300 hover:bg-gray-800 p-2"
            >
              <Home className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Likho Posts
            </h1>
          </div>
          {token ? (
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => router.push('/posts/create')}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 gap-2"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
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
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg shadow-xl p-6 h-64 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded mb-2 w-full"></div>
                <div className="h-3 bg-gray-700 rounded mb-2 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              No Posts Found
            </h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              {token ? 'Start sharing your ideas with the community' : 'Sign in to create your first post'}
            </p>
            <div className="flex gap-4">
              {token ? (
                <Button
                  onClick={() => router.push('/posts/create')}
                  className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Post
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => router.push('/login')} 
                    className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/register')} 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Card className="border-none bg-transparent">
                    <CardHeader>
                      <CardTitle className="text-gray-100 line-clamp-1">{post.title}</CardTitle>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        {post.author && <span>By {post.author}</span>}
                        {post.created_at && (
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 line-clamp-3">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        onClick={() => router.push(`/posts/`)}
                        className="text-blue-400 hover:bg-gray-700 gap-2"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      {token && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/posts/${post.id}/edit`)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 gap-2"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <ConfirmModal
                            isOpen={deletePostId === post.id}
                            onClose={() => setDeletePostId(null)}
                            onConfirm={() => handleDelete(post.id)}
                            title="Delete Post"
                            description="Are you sure you want to delete this post?"
                          >
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-2"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </ConfirmModal>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {!token && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-16 text-center"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-100">
                  Ready to share your story?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={() => router.push('/register')}
                    className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Join Likho
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Discord</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Likho by Shafiullah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}