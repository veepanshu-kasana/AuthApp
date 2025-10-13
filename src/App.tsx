import React from 'react';

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
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 font-sans">
      <div className="relative hidden h-full flex-col bg-zinc-950 p-10 text-white border-r border-zinc-800 lg:flex">
         <div className="relative z-20 flex items-center text-lg font-medium">
             <LogoIcon className="h-6 w-6 mr-2" />
             Acme Inc
         </div>
         <div className="relative z-20 mt-auto">
             <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  eve ==== before.&rdquo;
                </p>
                <footer className="text-sm">Veepanshu Kasana</footer>
             </blockquote>
         </div>
      </div>
       <div className="bg-black flex items-center justify-center p-8">
         <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
               <h1 className="text-2xl font-semibold tracking-tight text-white">
                  Create an account
               </h1>
               <p className="text-sm text-gray-400">
                  Enter your email below to create your account
               </p>
            </div>
            
            {/* Minimalist Auth Form */}
            <div className="grid gap-6">
               <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-2">
                     <div className="grid gap-1">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300" htmlFor="email">
                           Email
                        </label>
                        <input className="flex h-10 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2" id="email" placeholder="name@example.com" type="email" />
                     </div>
                     <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-600/90 h-10 px-4 py-2 w-full mt-2">
                        Sign In with Email
                     </button>
                  </div>
               </form>
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
               <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-800 text-white bg-transparent hover:bg-gray-900 h-10 px-4 py-2 w-full">
                  <GitHubIcon className="mr-2 h-4 w-4" />
                  GitHub
               </button>
            </div>

            <p className="px-8 text-center text-sm text-gray-400">
               By clicking continue, you agree to our{" "}
               <a href="#" className="underline underline-offset-4 hover:text-gray-200">
                  Terms of Service
               </a>{" "}
               and{" "}
               <a href="#" className="underline underline-offset-4 hover:text-gray-200">
                  Privacy Policy
               </a>
               .
            </p>
         </div>
      </div>
    </div>
  );
}

