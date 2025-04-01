import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  });

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/account');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.full_name,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        toast.success('Account created successfully!');
        navigate('/login');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error(error.message || 'Google signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-nitebite-dark">
      <Navbar transparent={false} />
      <main className="pt-24 pb-16">
        <div className="page-container max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glassmorphic-card p-8 rounded-2xl"
          >
            <h1 className="text-3xl font-bold text-nitebite-highlight text-center mb-8">
              Create Account
            </h1>
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-nitebite-text mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nitebite-text-muted w-5 h-5" />
                  <Input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="pl-10 bg-nitebite-dark-accent/50 border-white/10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-nitebite-text mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nitebite-text-muted w-5 h-5" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 bg-nitebite-dark-accent/50 border-white/10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-nitebite-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nitebite-text-muted w-5 h-5" />
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-10 bg-nitebite-dark-accent/50 border-white/10"
                    placeholder="Create a password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full glassmorphic-button"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up with Email'}
              </Button>
            </form>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-nitebite-dark-accent text-nitebite-text-muted">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-nitebite-dark-accent/50 border-white/10 text-nitebite-text hover:bg-nitebite-dark-accent"
              onClick={handleGoogleSignup}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </Button>
            <p className="mt-6 text-center text-sm text-nitebite-text-muted">
              Already have an account?{' '}
              <Button
                variant="link"
                className="text-nitebite-accent hover:text-nitebite-accent-light p-0"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;