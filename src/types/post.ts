export type Author = {
    name: string | null
    image: string | null
  }
  
  export type Post = {
    id: string
    title: string
    content: string
    published: boolean
    createdAt: Date
    author: Author
  }