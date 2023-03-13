import NextAuth, { Account, Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { GUESTBOOK_PAGE } from '@/lib/client-route.contant';
import { capitalize } from '@/lib/utils';

import {
  addNewUser,
  getUserByProviderId,
  updateUser,
} from '@/Repository/guestbook.queries';

import { AppUser, AppUserWithEmail } from '@/types/guestbook/guestbook.types';

type ProviderProfile = Profile & {
  avatar_url: string;
  picture: string;
  login: string;
};

function assembleNewUser(account: Account, profile: ProviderProfile) {
  const user: AppUserWithEmail = {
    providerId: account.providerAccountId,
    email: profile.email!,
    avatar: profile.avatar_url || profile.picture,
    name: capitalize(profile.name || profile.login),
    providerName: account.provider,
  };
  return user;
}

function getUpdatedFields(maybeUser: AppUserWithEmail, profile: Profile) {
  const updatedFields: Partial<AppUserWithEmail> = {};
  if (maybeUser.email !== profile.email) {
    updatedFields.email = profile.email;
  }
  if (maybeUser.avatar !== profile.image) {
    updatedFields.avatar = profile.image!;
  }
  if (maybeUser.name !== profile.name) {
    updatedFields.name = profile.name!;
  }
  return updatedFields;
}

type ObjectWithUser<T extends object> = T & { user: AppUser };
export default NextAuth({
  pages: {
    error: GUESTBOOK_PAGE,
    signIn: GUESTBOOK_PAGE,
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // user and account are only available on sign in
      delete token.email;
      delete token.picture;
      delete token.name;
      if (user) {
        const tk = token as ObjectWithUser<JWT>;
        tk.user = {
          id: user.id,
          avatar: user.image!,
          name: capitalize(user.name!),
        };
      }
      return token;
    },
    session({ session, token }) {
      const tk = token as ObjectWithUser<JWT>;
      delete token.sub;
      session.user = tk.user;
      return session;
    },
    async signIn(props) {
      const { account, profile } = props;
      try {
        // If the user doesn't exist, create a new user
        const maybeUser = await getUserByProviderId(account!.providerAccountId);
        if (!maybeUser) {
          const providerProfile = profile as ProviderProfile;
          const newUser = assembleNewUser(account!, providerProfile);
          await addNewUser(newUser);
          return true;
        }
        // check if the avatar, email and the name are the same as the one in the database
        const updatedFields = getUpdatedFields(maybeUser, profile!);
        if (Object.keys(updatedFields).length > 0) {
          await updateUser(maybeUser.providerId, updatedFields);
        }
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return false;
      }
    },
  },
});
