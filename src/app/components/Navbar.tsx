import { getServerSession } from "next-auth/next"
import Link from "next/link"
import { SignInButton } from "@/app/components/SignInButton"

export async function Navbar() {
  const session = await getServerSession()
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-emerald-400 transition-colors"
          >
            My Blog
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/posts" 
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Posts
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-slate-800" />
              </>
            ) : null}
            
            <SignInButton />
          </div>
        </div>
      </div>
    </nav>
  )
}