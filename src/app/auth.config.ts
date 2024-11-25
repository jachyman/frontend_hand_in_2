import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/log-in',
  },
  callbacks: {
    async session({ session, token }) {
      // Add the token to the session object
      session.token = token?.jwt || null;
      return session;
    },
    async jwt({ token, user }) {
      // Add the JWT to the token object
      if (user) {
        token.jwt = user.token; // Assuming `user.token` contains the JWT
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      // Extract the token from the session/auth object
      const isLoggedIn = !!auth?.user; // `user` from session indicates login status
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        return isLoggedIn; // Allow access if logged in
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Providers are empty for now
} satisfies NextAuthConfig;
