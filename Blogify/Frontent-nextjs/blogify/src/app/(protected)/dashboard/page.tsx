'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogOut, User, Key, PlusCircle, LayoutDashboard, FileText, Clock, BarChart, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { token, logout, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if auth data is loaded from localStorage
    if (token !== undefined && user !== undefined) {
      setLoading(false);
    }
  }, [token, user]);

  const copyToken = () => {
    navigator.clipboard.writeText(token || '');
    toast.success('Token copied to clipboard!');
  };

  // Mock data - replace with actual API calls
  const stats = {
    totalPosts: 12,
    draftPosts: 2,
    lastActivity: '2 hours ago'
  };

  const recentActivity = [
    { id: 1, action: 'Created post "Next.js Best Practices"', time: '2h ago' },
    { id: 2, action: 'Updated profile information', time: '5h ago' }
  ];

  if (loading) {
    return (
      
      <main className="p-8 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-6 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[120px]" />
        </div>
        {/* Add more skeletons as needed */}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">

    <main className="p-8 max-w-7xl mx-auto min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back, {user?.username || 'User'}! 👋
          </p>
        </motion.div>
        <Button
          variant="destructive"
          onClick={logout}
          className="gap-2 bg-red-600 hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Card */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-100">
                <User className="w-5 h-5 text-blue-400" />
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">API Token</p>
                <div className="flex gap-2">
                  <Input
                    value={token ? `${token.substring(0, 15)}...` : 'No token found'}
                    readOnly
                    className="truncate bg-gray-700 border-gray-600 text-gray-100"
                  />
                  <Button
                    variant="outline"
                    onClick={copyToken}
                    disabled={!token}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>Keep your token secure and never share it publicly</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions Card */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-100">
                <LayoutDashboard className="w-5 h-5 text-purple-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button
                onClick={() => router.push('/posts')}
                className="w-full justify-start gap-2 h-12 text-gray-300 hover:bg-gray-700 bg-gray-800 border border-gray-600"
              >
                <FileText className="w-5 h-5" />
                View All Posts
              </Button>
              <Button
                onClick={() => router.push('/posts/create')}
                className="w-full justify-start gap-2 h-12 text-gray-300 hover:bg-gray-700 bg-gray-800 border border-gray-600"
              >
                <PlusCircle className="w-5 h-5" />
                Create New Post
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Statistics Card */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-gray-100">
                <BarChart className="w-5 h-5 inline-block mr-2 text-blue-400" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Total Posts</span>
                <span className="font-semibold">{stats.totalPosts}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Draft Posts</span>
                <span className="font-semibold">{stats.draftPosts}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Last Activity</span>
                <span className="font-semibold">{stats.lastActivity}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity Card */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-shadow md:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-100">
                <Clock className="w-5 h-5 inline-block mr-2 text-purple-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map(activity => (
                  <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">{activity.action}</span>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-6">
                  No recent activity found
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 border-t border-gray-700 pt-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <Button variant="link" className="text-gray-400">
            Documentation
          </Button>
          <Button variant="link" className="text-gray-400">
            Support
          </Button>
          <Button variant="link" className="text-gray-400">
            Feedback
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Blogify. All rights reserved.
        </p>
      </footer>

      {/* Rest of your dashboard content remains the same */}

    </main>
    </div>
  );
}