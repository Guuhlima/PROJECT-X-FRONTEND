"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/app/lib/api";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) return;

    api
      .get("/api/user-validation", { params: { userId } })
      .then(() => {
        router.replace("/login");
      })
      .catch((error) => {
        console.error("User validation failed", error);
      });
  }, [userId, router]);

  return <div>Confirmando sua conta...</div>;
}
