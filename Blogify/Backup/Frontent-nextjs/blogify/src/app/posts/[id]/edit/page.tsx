'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import API from '@/lib/api';

type FormData = {
  title: string;
  content: string;
  author: string;
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${params.id}/`);
        if (res.data.payload) {
          reset({
            title: res.data.payload.title,
            content: res.data.payload.content,
            author: res.data.payload.author
          });
        }
      } catch (error) {
        toast.error('Failed to load post');
        router.push('/posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id, reset, router]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await API.put(`/posts/${params.id}/`, data);
      
      if (res.status === 200) {
        toast.success('Post updated successfully!');
        router.push('/posts');
      }
    } catch (error) {
      toast.error('Failed to update post');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 max-w-3xl mx-auto">Loading post data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <Button
          variant="outline"
          onClick={() => router.push('/posts')}
        >
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="mt-2"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            {...register('author', { required: 'Author name is required' })}
            className="mt-2"
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            {...register('content', {
              required: 'Content is required',
              minLength: {
                value: 50,
                message: 'Content must be at least 50 characters',
              },
            })}
            className="mt-2 min-h-[200px]"
            placeholder="Write your post content..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}