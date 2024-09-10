"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import googleSvg from "../../../../public/google.svg";
import githubSvg from "../../../../public/github.svg";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signInSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico" });

function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    setIsSubmitting(false);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignInWithProvider = async (provider: any) => {
    const result = await signIn(provider, { redirect: false });
    console.log("result on sign in :", result);
    if (result) {
      setErrorMessage("User already exists with this email.");
    } else setErrorMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 to-black">
      <div className="w-full max-w-xl p-8 px-10 pt-10 space-y-6 bg-white rounded-lg shadow-md">
        {/* Headers */}
        <div className="text-center">
          <h1 className="mb-6">
            <span className="text-4xl font-extrabold tracking-tighter lg:text-5xl">
              Welcome Back In
              <br />
            </span>
            <Link
              href={"/"}
              className={`${pacifico.className} text-4xl lg:text-[2.65rem] tracking-normal`}
            >
              Secret Alley
            </Link>
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCredentialsSignIn)} className="space-y-6 px-6">
            {/* identifier */}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter username or email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-password"
                  onClick={() => {
                    setShowPassword((pre) => !pre);
                  }}
                />
                <Label htmlFor="show-password">Show Password </Label>
              </div>
              <p>
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
                  forgot password?
                </Link>
              </p>
            </div>
            {/* Submit button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        {/* OR */}
        <div className="flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-black font-bold dark:text-gray-200">OR</span>
          {errorMessage}
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        {/* Providers */}
        <div className="flex flex-col space-y-2 px-6">
          {/* Google */}
          <Button
            onClick={() => signIn("google")}
            className="py-2 px-4 flex justify-center items-center bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <Image src={googleSvg} alt="google" className="size-7 mr-3"></Image>
            Sign In with Google
          </Button>
          {/* GitHub */}
          <Button
            onClick={() => handleSignInWithProvider("github")}
            className="py-2 px-4 flex justify-center items-center bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <Image src={githubSvg} alt="google" className="mr-3"></Image>
            Sign In with Github
          </Button>
          {/* Twitter */}
          {/* <Button
            onClick={() => signIn("twitter")}
            className="py-2 px-4 flex justify-center items-center bg-black hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"
              />
            </svg>
            &nbsp; Sign in with Twitter
          </Button> */}
        </div>

        {/* Sign-up */}
        <div className="text-center">
          <p>
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign-up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
