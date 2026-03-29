"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "nookies";
import { isAxiosError } from "axios";

import GoogleButton from "@/app/shared/components/Button/GoogleButton";
import FutureTrail from "../../shared/components/FutureTrail";

import { api } from "@/lib/api";
import { FormData, UserSchema } from "@/app/schemas/User/User";
import Toast from "@/app/shared/error/components/toast/Toast";
import Button from "@/app/shared/components/Button/Button";
import Input from "@/app/shared/components/Input/Input";

interface LoginResponse {
  token: string;
}

interface LoginErrorResponse {
  message?: string;
  error?: string;
}

const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

type LoginFormData = Pick<FormData, "email" | "password">;

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange<K extends keyof LoginFormData>(
    key: K,
    value: LoginFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setGlobalError(null);
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGlobalError(null);
    setFieldErrors({ email: undefined, password: undefined });

    const parsed = LoginSchema.safeParse(form);

    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        email: flattened.email?.[0],
        password: flattened.password?.[0],
      });
      setGlobalError("Corrija os campos destacados e tente novamente.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post<LoginResponse>("/api/login", {
        email: parsed.data.email,
        password: parsed.data.password,
      });

      setCookie(undefined, "nextauth.token", data.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      router.push("/home");
    } catch (err) {
      if (isAxiosError(err) && err.response?.data) {
        const data = err.response.data as LoginErrorResponse;
        setGlobalError(data.message || data.error || "Falha ao fazer login.");
      } else {
        setGlobalError("Erro de rede ou servidor indisponivel.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 text-foreground dark:bg-linear-to-tr dark:from-background dark:to-muted">
      {globalError && (
        <Toast
          message={globalError}
          variant="error"
          onClose={() => setGlobalError(null)}
        />
      )}

      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)]">
        <div className="relative hidden overflow-hidden border-r border-border bg-muted/60 lg:flex">
          <div className="absolute inset-0 bg-linear-to-br from-background/10 via-transparent to-primary/10" />
          <div className="relative flex w-full items-center justify-center px-10">
            <FutureTrail />
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card/95 p-8 shadow-xl backdrop-blur">
            <div className="mb-8 space-y-2 text-center">
              <span className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Trakify
              </span>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Tracking your products
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre para acompanhar movimentacoes, estoques e entregas em tempo real.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={loading}
                />
                {fieldErrors.email && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Senha
                  </label>
                  <Link
                    href="/recover-password"
                    className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  disabled={loading}
                />
                {fieldErrors.password && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <Button className="w-full py-2.5" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Ou continue com
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="flex justify-center">
                <GoogleButton
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
                  onCredential={(token) => {
                    console.log("ID Token", token);
                    router.push("/home");
                  }}
                />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Ainda nao tem conta?{" "}
                <Link href="/register" className="font-medium text-primary transition hover:opacity-80">
                  Criar cadastro
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
