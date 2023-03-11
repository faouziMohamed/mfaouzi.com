/* eslint-disable no-console */
import NextAuth, { Account, Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';

import { capitalize } from '@/lib/utils';

import {
  addNewUser,
  getUserByProviderId,
  updateUser,
} from '@/Repository/guestbook.queries';

import { AppUser } from '@/types/guestbook/guestbook.types';

type ProviderProfile = Profile & { avatar_url: string; login: string };

function assembleNewUser(account: Account, profile: ProviderProfile) {
  const user: AppUser = {
    providerId: account.providerAccountId,
    email: profile.email!,
    avatarUrl: profile.avatar_url,
    fullName: capitalize(profile.name || profile.login),
    providerName: account.provider,
  };
  return user;
}

function getUpdatedFields(maybeUser: AppUser, profile: Profile) {
  const updatedFields: Partial<AppUser> = {};
  if (maybeUser.email !== profile.email) {
    updatedFields.email = profile.email;
  }
  if (maybeUser.avatarUrl !== profile.image) {
    updatedFields.avatarUrl = profile.image!;
  }
  if (maybeUser.fullName !== profile.name) {
    updatedFields.fullName = profile.name!;
  }
  return updatedFields;
}

type ObjectWithUser<T extends object> = T & { user: AppUser };
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    async jwt({ token, user, account }) {
      // user and account are only available on sign in
      console.log('jwt STARTED', { token, user, account }, '\n\n');
      if (user) {
        const tk = token as ObjectWithUser<JWT>;
        tk.user = {
          providerName: account!.provider,
          providerId: user.id,
          email: user.email!,
          avatarUrl: user.image!,
          fullName: capitalize(user.name!),
        };
      }
      console.log('jwt', { token }, '\n\n');
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token }) {
      console.log('session STARTED', { session });
      const tk = token as ObjectWithUser<JWT>;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Ignore default user type
      session.user = { ...tk.user };
      console.log('session ENDED', { session }, '\n\n');
      return session;
    },
    async signIn(props) {
      const { account, profile } = props;
      console.log('signIn STARTED', { account, profile });
      try {
        // If the user doesn't exist, create a new user
        const maybeUser = await getUserByProviderId(account!.providerAccountId);
        if (!maybeUser) {
          const providerProfile = profile as ProviderProfile;
          const newUser = assembleNewUser(account!, providerProfile);
          await addNewUser(newUser);
          return true;
        }
        // check if the avatar, email and the fullName are the same as the one in the database
        const updatedFields = getUpdatedFields(maybeUser, profile!);
        if (Object.keys(updatedFields).length > 0) {
          await updateUser(maybeUser.providerId, updatedFields);
        }
        console.log('SIGN IN ENDED', maybeUser, '\n\n');
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return false;
      }
    },
  },
});