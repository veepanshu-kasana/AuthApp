import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import { Button, Input, Label } from './components/ui';

// Logo Icon used in the top-left corner
const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

// GitHub Icon for the social login button
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


// --- Main App Component ---
export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize session and subscribe to auth state changes
    let subscription: { unsubscribe: () => void } | null = null;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    }).catch(() => {
      setSession(null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    if (listener?.subscription) {
      subscription = listener.subscription as unknown as { unsubscribe: () => void };
    }

    return () => {
      try {
        subscription?.unsubscribe();
      } catch (_e) {
        // ignore
      }
    };
  }, []);


  const toggleAuthMode = () => {
    setIsLogin(prevState => !prevState);
    setError(null); // Clear errors when switching modes
    setMessage(null);
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let authResponse;
      if (isLogin) {
        authResponse = await supabase.auth.signInWithPassword({ email, password });
      } else {
        authResponse = await supabase.auth.signUp({ email, password });
      }
      if (authResponse.error) throw authResponse.error;

      // Success: show friendly message and clear inputs for signup
      setError(null);
      if (isLogin) {
        setMessage('Signed in successfully.');
      } else {
        // Signup often requires email confirmation depending on Supabase settings
        // Supabase may return no `user` object when an account already exists or when
        // confirmation is required. Inspect the response to provide a clearer message.
        const user = authResponse?.data?.user ?? (authResponse as any)?.user ?? null;
        const respMsg = (authResponse as any)?.error?.message || (authResponse as any)?.error_description || '';

        if (user) {
          // Real user object returned -> signup succeeded
          setMessage('Successfully signed up. Please check your email to confirm your account if required.');
          setEmail('');
          setPassword('');
        } else {
          // If no user is returned, be conservative: the email may already exist or confirmation may be required.
          // Show a clear, actionable message instead of the optimistic 'signed up' message.
          if (respMsg && /already|duplicate/i.test(String(respMsg))) {
            setMessage('A user with this email is already registered. Try signing in or reset your password.');
          } else {
            setMessage('Signup submitted. This email may already be registered or confirmation is pending — try signing in or check your inbox.');
          }
        }
      }
      
    } catch (error: any) {
      const raw = error?.message || error?.error_description || String(error);
      // Friendly handling for already-registered users
      const lower = raw.toLowerCase();
      if (lower.includes('already') || lower.includes('duplicate')) {
        setMessage('A user with this email is already registered. Try signing in or reset your password.');
        setError(null);
      } else {
        setError(raw);
        setMessage(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  }

  // If user is logged in, show a welcome message and sign out button
    if (session) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
        <p className="mb-8 text-gray-400">You are logged in as {session.user.email}</p>
        <Button variant="destructive" onClick={handleSignOut} className="h-10 px-6">
          Sign Out
        </Button>
      </div>
    );
  }

  // If user is not logged in, show the authentication form
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 font-sans">
      <div className="relative hidden h-full flex-col bg-zinc-950 p-10 text-white border-r border-zinc-800 lg:flex">
         <div className="relative z-20 flex items-center text-lg font-medium">
             <LogoIcon className="h-6 w-6 mr-2" />
             Excellence Technologies
         </div>
         <div className="relative z-20 mt-auto">
             <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;Excellence Technologies is an Integrated Web and Mobile Solutions provider dedicated to aiding businesses
                   around the world to increase their profitability and efficiency.&rdquo;
                </p>
                <footer className="text-sm">Veepanshu Kasana</footer>
             </blockquote>
         </div>
      </div>
       <div className="bg-black flex items-center justify-center p-8">
         <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
               <h1 className="text-2xl font-semibold tracking-tight text-white">
                  {isLogin ? 'Welcome Back' : 'Create an account'}
               </h1>
               <p className="text-sm text-gray-400">
                  {isLogin ? 'Enter your credentials to access your account' : 'Enter your email below to create your account'}
               </p>
            </div>
            
            <div className="grid gap-6">
               <form onSubmit={handleSubmit}>
                  <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="email" className="text-sm text-gray-300">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 bg-transparent text-white placeholder:text-gray-500 border-gray-700"
                />
              </div>
              <div className="grid gap-1 mt-2">
                <Label htmlFor="password" className="text-sm text-gray-300">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 bg-transparent text-white placeholder:text-gray-500 border-gray-700"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-2 h-10 bg-blue-600 text-white">
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
                  </div>
               </form>
               {error && <p className="text-red-500 text-sm text-center">{error}</p>}
               {message && <p className="text-green-400 text-sm text-center">{message}</p>}
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <span className="w-full border-t border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                     <span className="bg-black px-2 text-gray-400">
                     Or continue with
                     </span>
                  </div>
               </div>
          <Button
            variant="outline"
            onClick={handleGitHubSignIn}
            className="w-full h-10 inline-flex items-center justify-center border border-gray-800 bg-transparent text-white hover:bg-gray-900"
          >
            <GitHubIcon className="mr-2 h-4 w-4 text-white" />
            <span className="text-white">GitHub</span>
          </Button>
            </div>

            <p className="px-8 text-center text-sm text-gray-400">
               {isLogin ? "Don't have an account? " : "Already have an account? "}
               <button onClick={toggleAuthMode} className="underline underline-offset-4 hover:text-gray-200 font-semibold focus:outline-none">
                  {isLogin ? "Sign Up" : "Sign In"}
               </button>
            </p>
         </div>
      </div>
    </div>
  );
}

