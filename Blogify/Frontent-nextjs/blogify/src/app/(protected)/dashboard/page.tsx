'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LogOut, User, Key, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { token, logout } = useAuth();

  const copyToken = () => {
    navigator.clipboard.writeText(token || '');
    toast.success('Token copied to clipboard!');
  };

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Welcome back! Manage your account and content</p>
        </div>
        <Button
          variant="destructive"
          onClick={logout}
          className="gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">API Token</p>
              <div className="flex gap-2">
                <Input
                  value={token ? `${token.substring(0, 15)}...` : 'No token found'}
                  readOnly
                  className="truncate"
                />
                <Button
                  variant="outline"
                  onClick={copyToken}
                  disabled={!token}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
            <p className="text-sm text-red-500">
              <span className="font-semibold">Security Note:</span> Keep your token secure and never share it publicly
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => window.location.href = '/posts'}
            >
              View All Posts
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => window.location.href = '/posts/create'}
            >
              Create New Post
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Posts</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span>Last Activity</span>
                <span className="font-semibold">-</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <p>No recent activity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}