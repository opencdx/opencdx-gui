
"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};


const schemaLogin = z.object({
  userName: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
    // const { mutate: login, error , data:loginData} = useLogin();

  const validatedFields = schemaLogin.safeParse({
    userName: formData.get("userName"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

//   const responseData = await login(validatedFields.data);
//   debugger
//   console.log(responseData);

//   if (!loginData) {
//     return {
//       ...prevState,
//       zodErrors: null,
//       message: "Ops! Something went wrong. Please try again.",
//     };
//   }

// if (error) {
//     return {
//         ...prevState,
//         strapiErrors: error,
//         zodErrors: null,
//         message: "Failed to Login.",
//     };
// }

// const token = loginData.data.token;
// cookies().set("jwt", token || "", config);

// redirect("/form-builder");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
