
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      guestbook: {
        Row: {
          id: string
          name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          message?: string
          created_at?: string
        }
      }
      watchlogs: {
        Row: {
          id: string
          title: string
          src: string
          type: 'shows' | 'books'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          src: string
          type: 'shows' | 'books'
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          src?: string
          type?: 'shows' | 'books'
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image: string
          link: string
          tags: string[]
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image: string
          link: string
          tags: string[]
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string
          link?: string
          tags?: string[]
          created_at?: string
        }
      }
      content: {
        Row: {
          key: string
          value: string
          section: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          section: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          section?: string
          updated_at?: string
        }
      }
    }
  }
}
