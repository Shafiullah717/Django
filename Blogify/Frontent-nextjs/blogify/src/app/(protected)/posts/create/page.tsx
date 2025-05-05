'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function CreatePostPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const contentLength = watch('content')?.length || 0;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await API.post('/posts/', {
        title: data.title,
        content: data.content,
        author: data.author
      });
      
      if (res.status === 200) {
        toast.success('Post created successfully!', {
          description: 'Your post is now live and visible to the community.'
        });
        router.push('/posts');
      }
    } catch (error) {
      toast.error('Failed to create post', {
        description: (error as any).response?.data?.message || 'Please try again later.'
      });
      console.error('Creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          Create New Post
        </h1>
        <div className="w-[100px]" /> {/* Spacer for alignment */}
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
                placeholder="Craft your perfect title..."
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
                placeholder="Enter your name"
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
                placeholder="Share your story... (Markdown supported)"
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
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 h-12 px-8 gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Publish Post
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