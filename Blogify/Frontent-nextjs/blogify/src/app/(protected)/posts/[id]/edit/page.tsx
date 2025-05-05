'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import API from '@/lib/api';
import { ArrowLeft, Loader2, TextCursorInput, Type, User, Wand2 } from 'lucide-react';

type FormData = {
  title: string;
  content: string;
  author: string;
};

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentLength = watch('content')?.length || 0;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}/`);
        if (res.data.payload) {
          reset({
            title: res.data.payload.title,
            content: res.data.payload.content,
            author: res.data.payload.author
          });
        }
      } catch (error) {
        toast.error('Failed to load post', {
          description: (error as any).response?.data?.message || 'Please try again later.'
        });
        router.push('/posts');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, reset, router]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await API.put(`/posts/${id}/`, data);
      if (res.status === 200) {
        toast.success('Post updated successfully!', {
          description: 'Your changes have been saved and published.'
        });
        router.push('/posts');
      }
    } catch (error) {
      toast.error('Failed to update post', {
        description: (error as any).response?.data?.message || 'Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Edit Post
          </h1>
          <div className="w-[100px]" />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 shadow-xl border border-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="flex items-center gap-2 text-gray-300 mb-2">
                  <Type className="w-5 h-5" />
                  Post Title
                </Label>
                <Input
                  id="title"
                  {...register('title', { 
                    required: 'Title is required',
                    maxLength: {
                      value: 100,
                      message: 'Title must be less than 100 characters'
                    }
                  })}
                  className="bg-gray-700 border-gray-600 text-gray-100 h-12 text-lg"
                  placeholder="Refine your post title..."
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <TextCursorInput className="w-4 h-4" />
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="author" className="flex items-center gap-2 text-gray-300 mb-2">
                  <User className="w-5 h-5" />
                  Author Name
                </Label>
                <Input
                  id="author"
                  {...register('author', { 
                    required: 'Author name is required',
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: 'Please enter a valid name'
                    }
                  })}
                  className="bg-gray-700 border-gray-600 text-gray-100 h-12"
                  placeholder="Update author name"
                />
                {errors.author && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <TextCursorInput className="w-4 h-4" />
                    {errors.author.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="content" className="flex items-center gap-2 text-gray-300">
                    <TextCursorInput className="w-5 h-5" />
                    Post Content
                  </Label>
                  <span className={`text-sm ${contentLength > 5000 ? 'text-red-400' : 'text-gray-400'}`}>
                    {contentLength}/5000
                  </span>
                </div>
                <Textarea
                  id="content"
                  {...register('content', {
                    required: 'Content is required',
                    minLength: {
                      value: 300,
                      message: 'Content must be at least 300 characters'
                    },
                    maxLength: {
                      value: 5000,
                      message: 'Content must be less than 5000 characters'
                    }
                  })}
                  className="bg-gray-700 border-gray-600 text-gray-100 min-h-[300px] text-base"
                  placeholder="Polish your content... (Markdown supported)"
                />
                {errors.content && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                    <TextCursorInput className="w-4 h-4" />
                    {errors.content.message}
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-2">
                  Pro Tip: Use Markdown for formatting (e.g., **bold**, *italic*, # headers)
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/posts')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12 px-6"
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 h-12 px-8 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Update Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}