'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import API from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, User, ArrowRight, AlertCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post('register/', form);
      const { token, payLoad } = res.data;

      if (token && payLoad?.username) {
        login(token, payLoad.username);
        toast.success('Registration successful!');
        router.push('/dashboard');
      } else {
        setError('Invalid server response');
        toast.error('Registration failed');
      }
    } catch (err) {
      setError((err as any).response?.data?.message || 'Registration failed');
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="text-gray-300 hover:bg-gray-800 gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Button>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Likho
              </h1>
              <CardTitle className="text-3xl font-bold text-gray-100">
                Create Account
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-300 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-400" />
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="h-12 bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-purple-400" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="h-12 bg-gray-700 border-gray-600 text-gray-100"
                    />
                  </div>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg gap-2 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}