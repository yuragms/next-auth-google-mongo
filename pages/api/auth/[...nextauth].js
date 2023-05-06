import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';
import { compare } from 'bcryptjs';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: 'Connection Failed...!';
        });
        // check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }
        //compare()
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        //incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }
        return result;
      },
    }),
    // ...add more providers here
  ],
  secret: '2Qw/f3K7HO7b4gF/1IlvJh/g5h/P6Idz1PQVcXKjXiA=',
};
export default NextAuth(authOptions);
