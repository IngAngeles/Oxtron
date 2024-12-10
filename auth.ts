import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import axiosInstance from '@/lib/axios-instance'
import { IUser } from './constants/types'

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async ({ email, password }): Promise<any> => {
        try {
          const { status, data } = await axiosInstance.get('/UsersControl/Mostrar_Usuarios_Email_Pass', {
            params: {
              email,
              'pass': password,
            },
          })

          if (status === 200) {
            const user: IUser = data[0]
            return {
              id: user.idUSerControl,
              phone: user.telephoneUser,
              email: user.email,
              name: user.firstName,
              lastname: user.lastName,
            }
          }

          return null
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }

      return session
    },
  },
})
