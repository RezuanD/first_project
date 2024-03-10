"use client";

import Link from "next/link";
import { useAuth } from "./auth.context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:8000/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("access_token");

    setIsLoggedIn(false);

    router.push("/");
  };

  return (
    <div className="flex flex-row justify-between w-[90%] h-20 rounded-2xl mt-8 p-4 border-2 shadow-lg shadow-primary">
      <div className="flex items-center p-2 space-beetwen">
        <Link href="/">
          <h1 className="text-2xl font-bold italic">Bloggers of The World</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <Link href="/article/add">
              <Button>Add Article +</Button>
            </Link>
            <Link href="/">
              <Button onClick={handleLogout}>Logout</Button>
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
