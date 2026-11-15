"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);
    if (!result.success) {
      setError(result.error || 'Registration failed');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full border border-brand-sage/20">
        <h1 className="font-heading text-3xl font-bold text-brand-charcoal text-center mb-6">Register</h1>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4">{error}</div>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-brand-brown text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-2 rounded-xl border border-brand-sage focus:outline-none focus:ring-2 focus:ring-brand-forest"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
            />
          </div>
          <div>
            <label className="block text-brand-brown text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-2 rounded-xl border border-brand-sage focus:outline-none focus:ring-2 focus:ring-brand-forest"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
            />
          </div>
          <div>
            <label className="block text-brand-brown text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-2 rounded-xl border border-brand-sage focus:outline-none focus:ring-2 focus:ring-brand-forest"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
            />
          </div>
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-6 text-center text-brand-brown text-sm">
          Already have an account? <Link href="/login" className="text-brand-terracotta hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
