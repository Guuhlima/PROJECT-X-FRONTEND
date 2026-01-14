"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/app/lib/api";

export default function ConfirmUserClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();

    api
      .get("/api/user-validation", {
        params: { userId },
        signal: controller.signal as any, 
      })
      .then(() => {
        router.replace("/login");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("User validation failed", error);
      });

    return () => controller.abort();
  }, [userId, router]);

  return <div>Confirmando sua conta...</div>;
}
