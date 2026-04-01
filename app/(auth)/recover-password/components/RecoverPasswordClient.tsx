"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import Button from "@/app/shared/components/Button/Button";
import Input from "@/app/shared/components/Input/Input";
import FutureTrail from "@/app/shared/components/FutureTrail";
import Toast from "@/app/shared/error/components/toast/Toast";
import { UserSchema } from "@/app/schemas/User/User";
import { api } from "@/lib/api";

interface ResetPasswordErrorResponse {
  message?: string;
  error?: string;
}

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordSchema = UserSchema.pick({
  password: true,
});

type RecoverPasswordClientProps = {
  token: string;
};

export default function RecoverPasswordClient({
  token,
}: RecoverPasswordClientProps) {
  const router = useRouter();
  const [form, setForm] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ResetPasswordForm, string>>
  >({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange<K extends keyof ResetPasswordForm>(
    key: K,
    value: ResetPasswordForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    setGlobalError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGlobalError(null);
    setSuccessMessage(null);
    setFieldErrors({ password: undefined, confirmPassword: undefined });

    if (!token) {
      setGlobalError("O link de redefinicao esta incompleto ou invalido.");
      return;
    }

    const parsed = ResetPasswordSchema.safeParse({
      password: form.password,
    });

    if (!parsed.success) {
      const flattened = parsed.error.flatten().fieldErrors;
      setFieldErrors((prev) => ({
        ...prev,
        password: flattened.password?.[0],
      }));
      setGlobalError("Corrija os campos destacados e tente novamente.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: "As senhas nao coincidem.",
      }));
      setGlobalError("Confirme a senha corretamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await api.post<{ message?: string }>("/api/reset-password", {
        token,
        password: parsed.data.password,
      });

      setSuccessMessage(data.message || "Senha redefinida com sucesso.");
      setTimeout(() => router.push("/login"), 1800);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        const data = error.response.data as ResetPasswordErrorResponse;
        setGlobalError(
          data.message || data.error || "Nao foi possivel redefinir a senha."
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
                Redefinir senha
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Escolha uma nova senha para concluir a recuperacao da sua conta.
              </p>
            </div>

            {!token ? (
              <div className="flex flex-col gap-4">
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
                  O token de redefinicao nao foi encontrado na URL.
                </p>
                <Link
                  href="/forgot-password"
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Solicitar novo link
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Nova senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={form.password}
                    onChange={(event) => handleChange("password", event.target.value)}
                    disabled={isSubmitting}
                  />
                  {fieldErrors.password && (
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirmar nova senha
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita a nova senha"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      handleChange("confirmPassword", event.target.value)
                    }
                    disabled={isSubmitting}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full py-2.5" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Redefinir senha"}
                </Button>

                <p className="rounded-2xl border border-border bg-muted/60 px-4 py-3 text-sm leading-6 text-muted-foreground">
                  A nova senha deve seguir as regras de seguranca da plataforma.
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
