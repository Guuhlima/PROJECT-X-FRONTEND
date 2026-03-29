"use client";

import Button from "@/app/shared/components/Button/Button";
import Input from "@/app/shared/components/Input/Input";
import Link from "next/link";
import FutureTrail from "../../shared/components/FutureTrail";
import { UserSchema, FormData } from "../../schemas/User/User";
import { useRef, useState } from "react";
import Toast from "@/app/shared/error/components/toast/Toast";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import InlineSwal from "@/app/shared/components/InlineSwal";
import GoogleButton from "@/app/shared/components/Button/GoogleButton";

type RegisterApiErrorResponse = {
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof FormData, string>>;
};

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [swalOpen, setSwalOpen] = useState(false);
  const swalTargetRef = useRef<HTMLDivElement | null>(null);

  function handleChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setGlobalError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGlobalError(null);
    setFieldErrors({ name: undefined, email: undefined, password: undefined });

    const parsed = UserSchema.safeParse(form);
    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: f.name?.[0],
        email: f.email?.[0],
        password: f.password?.[0],
      });
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/users", parsed.data);
      setSwalOpen(true);

    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        const { status, data } = err.response;
        const errorData = data as RegisterApiErrorResponse;

        if (status === 409) {
          setGlobalError("Este e-mail já está em uso.");
          setFieldErrors(prev => ({ ...prev, email: "E-mail já cadastrado." }));
          return;
        }

        if (status === 400 || status === 422) {
          const fieldErrors = errorData.errors;

          if (fieldErrors) {
            setFieldErrors(prev => ({
              ...prev,
              name: fieldErrors.name ?? prev.name,
              email: fieldErrors.email ?? prev.email,
              password: fieldErrors.password ?? prev.password,
            }));
          }

          const msg =
            errorData.message ||
            errorData.error ||
            "Falha de validação.";
          setGlobalError(msg);
          return;
        }

        const msg =
          errorData.message ||
          errorData.error ||
          `Falha ao criar usuário (HTTP ${status}).`;
        setGlobalError(msg);
      } else {
        setGlobalError("Erro de rede ou servidor indisponível.");
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
          <div className="relative w-full max-w-md rounded-3xl border border-border bg-card/95 p-8 shadow-xl backdrop-blur">
            <div
              ref={swalTargetRef}
              className="pointer-events-none absolute inset-0"
            />

            <InlineSwal
              open={swalOpen}
              target={swalTargetRef.current}
              variant="success"
              title="Account created"
              message="Your account has been successfully created. Before proceeding to login, please confirm the information that was sent to your email."
              timerMs={5000}
              widthPx={360}
              offsetTopPx={110}
              onClose={() => {
                setSwalOpen(false);
                router.push("/login");
              }}
            />

            <div className="mb-8 space-y-2 text-center">
              <span className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Trakify
              </span>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Criar conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Configure seu acesso para gerenciar produtos, movimentacoes e operacoes.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Nome de usuario</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Como deseja aparecer"
                  value={form.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                  disabled={loading}
                />
                {fieldErrors.name && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("email", e.target.value)
                  }
                  disabled={loading}
                />
                {fieldErrors.email && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">Senha</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha segura"
                  value={form.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("password", e.target.value)
                  }
                  disabled={loading}
                />
                {fieldErrors.password && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={loading} className="w-full py-2.5">
                <span className="inline-flex items-center gap-2">
                  {loading && (
                    <span
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
                      aria-hidden="true"
                    />
                  )}
                  {loading ? "Criando conta..." : "Criar conta"}
                </span>
              </Button>

              <p className="text-sm leading-6 text-muted-foreground">
                Ao continuar, voce concorda com nossos{" "}
                <span className="font-medium text-primary underline underline-offset-4">Termos</span>{" "}
                e a{" "}
                <span className="font-medium text-primary underline underline-offset-4">Politica de privacidade</span>.
              </p>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" aria-hidden="true"></div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Ou continue com
                </span>
                <div className="h-px flex-1 bg-border" aria-hidden="true"></div>
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
                Ja possui conta?{" "}
                <Link href="/login" className="font-medium text-primary transition hover:opacity-80">
                  Entrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
