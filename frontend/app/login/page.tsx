"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "../schemas/login.schema";
import { useAuth } from "../auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router])

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const res = await fetch('http://127.0.0.1:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.status === 201) {
      const data = await res.json();

      localStorage.setItem('access_token', data.access_token);
      setIsLoggedIn(true);

      router.push('/');
    } else if (res.status === 401) {
      const invalidCreds = document.getElementById("invalidCreds");
      
      invalidCreds.classList.remove("hidden");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div id="invalidCreds" className="bg-red-500 text-white p-4 rounded-xl mb-2 hidden">
        Your username or password invalid
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your username"
                      type="string"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}