"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/app/shared/components/Button/Button";
import Input from "@/app/shared/components/Input/Input";
import FutureTrail from "@/app/shared/components/FutureTrail";
import Toast from "@/app/shared/error/components/toast/Toast";

export default function Page() {
  const [email, setEmail] = useState("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGlobalError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setGlobalError("Informe o email para recuperar sua senha.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccessMessage(
        "Se o email existir na plataforma, enviaremos as instrucoes de recuperacao em instantes."
      );
    } catch {
      setGlobalError("Nao foi possivel iniciar a recuperacao de senha.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSubmitting}
                />
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
