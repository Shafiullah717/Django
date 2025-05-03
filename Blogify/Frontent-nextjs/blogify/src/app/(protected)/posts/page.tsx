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
import { Edit, Trash, Plus } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const { token } = useAuth();
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
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-muted-foreground mt-2">Manage your published articles</p>
        </div>
        <Button
          onClick={() => router.push('/posts/create')}
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
        >
          <Plus size={18} />
          New Post
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-xl" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">No posts found</h2>
            <p className="text-muted-foreground">Get started by creating a new post</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-shadow duration-300 group"
            >
              <CardHeader>
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                {post.created_at && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
              </CardContent>
              {token && (
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/posts/${post.id}/edit`)}
                    className="gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                  
                  {/* Delete Button and Confirmation Modal */}
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
                      // onClick={() => console.log("buthon cliked")}
                    >
                      <Trash size={16} />
                      Delete
                    </Button>
                  </ConfirmModal>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}