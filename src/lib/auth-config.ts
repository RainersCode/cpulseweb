import NextAuth, { type NextAuthOptions, type DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '@/lib/supabase'

/**
 * Supabase-based authentication with admin role support
 * Users sign up via Supabase and can be promoted to admin
 */

// Extend NextAuth types to include admin role
declare module 'next-auth' {
  interface User {
    id?: string
    role?: string
  }
  interface Session {
    user: {
      id?: string
      role?: string
    } & DefaultSession['user']
  }
  interface JWT {
    id?: string
    role?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Supabase',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Sign in with Supabase Auth
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error || !data.user) {
            console.warn(`❌ Failed login attempt for: ${credentials.email}`)
            return null
          }

          // Fetch user profile from database to get admin status
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('id, email, name, image, is_admin')
            .eq('id', data.user.id)
            .single()

          if (profileError) {
            console.warn(`⚠️ User profile not found: ${data.user.id}`)
            // Create user profile if it doesn't exist
            const { data: newUser } = await supabase
              .from('users')
              .insert([
                {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.user_metadata?.name || '',
                  is_admin: false,
                },
              ])
              .select('id, email, name, image, is_admin')
              .single()

            console.log(`✅ Successful login: ${credentials.email}`)
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.name || '',
              image: data.user.user_metadata?.avatar_url,
              role: 'user',
            }
          }

          const role = userProfile?.is_admin ? 'admin' : 'user'
          console.log(`✅ Successful login: ${credentials.email} (${role})`)

          return {
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            image: userProfile.image,
            role: role,
          }
        } catch (error) {
          console.error('❌ Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 60 * 60, // Refresh every hour
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
