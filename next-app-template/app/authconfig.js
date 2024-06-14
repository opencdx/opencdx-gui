export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request }) {
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            
        },
    },
};