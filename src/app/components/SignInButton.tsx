'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { LogIn, LogOut } from 'lucide-react'

export function SignInButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button
        className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-200"
        onClick={() => signOut()}
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    )
  }

  return (
    <button
      className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-400 transition-all duration-200"
      onClick={() => signIn('google')}
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </button>
  )
}