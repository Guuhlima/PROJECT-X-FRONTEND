"use client";

import { useState } from "react";
import Link from "next/link";
import { isAxiosError } from "axios";
import Button from "@/app/shared/components/Button/Button";
import Input from "@/app/shared/components/Input/Input";
import FutureTrail from "@/app/shared/components/FutureTrail";
import Toast from "@/app/shared/error/components/toast/Toast";
import { UserSchema } from "@/app/schemas/User/User";
import { api } from "@/lib/api";

interface ForgotPasswordErrorResponse {
  message?: string;
  error?: string;
}

const ForgotPasswordSchema = UserSchema.pick({
  email: true,
});

export default function Page() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError(null);
    setGlobalError(null);
    setSuccessMessage(null);

    const parsed = ForgotPasswordSchema.safeParse({ email });

    if (!parsed.success) {
      const nextEmailError = parsed.error.flatten().fieldErrors.email?.[0];
      setEmailError(nextEmailError ?? "Informe um email valido.");
      setGlobalError("Corrija o email e tente novamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/api/forgot-password", {
        email: parsed.data.email,
      });
      setSuccessMessage(
        "Se o email existir na plataforma, enviaremos as instrucoes de recuperacao em instantes."
      );
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        const data = error.response.data as ForgotPasswordErrorResponse;
        setGlobalError(
          data.message ||
            data.error ||
            "Nao foi possivel iniciar a recuperacao de senha."
        );
      } else {
        setGlobalError("Erro de rede ou servidor indisponivel.");
      }
    } finally {
      setIsSubmitting(false);
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

      {successMessage && (
        <Toast
          message={successMessage}
          variant="success"
          onClose={() => setSuccessMessage(null)}
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
              <h1 className="text-2xl font-semibold tracking-tight">
                Recuperar senha
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Informe seu email para receber o link de redefinicao e voltar a acessar sua conta.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError(null);
                    setGlobalError(null);
                  }}
                  disabled={isSubmitting}
                />
                {emailError && (
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {emailError}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full py-2.5" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar link de recuperacao"}
              </Button>

              <p className="rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
                Use o mesmo email cadastrado no sistema. Se ele for reconhecido, voce recebera as proximas instrucoes.
              </p>

              <p className="text-center text-sm text-muted-foreground">
                Lembrou sua senha?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary transition hover:opacity-80"
                >
                  Voltar para login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
