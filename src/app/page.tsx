import { prisma } from '@/lib/prisma'
import { ArrowRight, Clock, User } from 'lucide-react'
import type { Post } from '@/types/post'

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  }) as Post[]

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-violet-500/20 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-emerald-400 font-medium mb-4 block">Your Digital Space</span>
          <h1 className="text-6xl font-bold mb-6 text-white">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-slate-400 mb-10">
            Exploring ideas, sharing insights, and documenting the journey.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-lg hover:bg-emerald-400 transition-all duration-200 font-medium">
              Start Reading <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-lg hover:bg-slate-700 transition-all duration-200 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">Latest Posts</h2>
          <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.length > 0 ? (
            latestPosts.map((post: Post) => (
              <article 
                key={post.id} 
                className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
              >
                {/* Post image placeholder with gradient */}
                <div className="h-48 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-violet-500/10 group-hover:scale-105 transition-transform duration-300" />
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author.name}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {post.content.slice(0, 150)}...
                  </p>

                  <button className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2">
                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-slate-900 rounded-xl border border-slate-800">
              <p className="text-slate-400 mb-4">No posts yet. Stay tuned!</p>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500 mx-auto rounded-full" />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}