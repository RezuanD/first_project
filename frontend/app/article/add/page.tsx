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
import { articleAddFormSchema } from "@/app/schemas/articleAdd.schema";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function ArticleCreationPage() {
  const form = useForm<z.infer<typeof articleAddFormSchema>>({
    resolver: zodResolver(articleAddFormSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof articleAddFormSchema>) => {
    const res = await fetch('http://127.0.0.1:8000/blog/article', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accees_token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.status === 201) {
      const data = await res.json();
      
      console.log(data);

      router.push('/');
    }
  };

  return (
    <main className="flex w-[90%] min-h-screen flex-col items-center p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-56" placeholder="Text of Article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-[50%]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
