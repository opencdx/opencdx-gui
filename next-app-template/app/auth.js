import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import axios from "axios";

const login = async (credentials) => {
    try {
        const user = await axios.post("http://localhost:4001/iam/user/login", credentials);

        if (user.status !== 200) {
            throw new Error("Failed to login!");
        }
        
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        },
    },
});