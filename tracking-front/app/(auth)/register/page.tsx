"use client";

import Button from "@/app/shared/components/Button";
import Input from "@/app/shared/components/Input";
import Link from "next/link";
import FutureTrail from "../../shared/components/FutureTrail";
import { CreateUserSchema, FormData } from "./schema/User";
import { useRef, useState } from "react";
import Toast from "@/app/shared/error/components/Toast";
import { api } from "@/app/lib/api";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import InlineSwal from "@/app/shared/components/InlineSwal";

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

    const parsed = CreateUserSchema.safeParse(form);
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

        if (status === 409) {
          setGlobalError("Este e-mail já está em uso.");
          setFieldErrors(prev => ({ ...prev, email: "E-mail já cadastrado." }));
          return;
        }

        if (status === 400 || status === 422) {
          const fieldErrors = (data as any)?.errors as
            | { name?: string; email?: string; password?: string }
            | undefined;

          if (fieldErrors) {
            setFieldErrors(prev => ({
              ...prev,
              name: fieldErrors.name ?? prev.name,
              email: fieldErrors.email ?? prev.email,
              password: fieldErrors.password ?? prev.password,
            }));
          }

          const msg =
            (data as any)?.message ||
            (data as any)?.error ||
            "Falha de validação.";
          setGlobalError(msg);
          return;
        }

        const msg =
          (data as any)?.message ||
          (data as any)?.error ||
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
    <div className="flex min-h-screen">
      {globalError && (
        <Toast
          message={globalError}
          variant="error"
          onClose={() => setGlobalError(null)}
        />
      )}

      <div className="w-3/4 h-screen bg-gray-200 overflow-hidden">
        <FutureTrail />
      </div>

      <div className="w-px bg-gray-300"></div>

      <div className="w-1/4 flex justify-center items-center">
        <div className="relative flex flex-col w-full max-w-sm gap-4">
          <div
            ref={swalTargetRef}
            className="absolute inset-0 pointer-events-none"
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

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-sm gap-4"
            noValidate
          >
            <span className="text-lg font-semibold text-center text-black">
              Create Your Account
            </span>

            <div className="flex flex-col gap-2">
              <label className="text-black">Username</label>
              <Input
                id="name"
                type="text"
                placeholder="Username"
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("name", e.target.value)
                }
                disabled={loading}
              />
              {fieldErrors.name && (
                <p className="text-xs font-medium text-red-600">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("email", e.target.value)
                }
                disabled={loading}
              />
              {fieldErrors.email && (
                <p className="text-xs font-medium text-red-600">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("password", e.target.value)
                }
                disabled={loading}
              />
              {fieldErrors.password && (
                <p className="text-xs font-medium text-red-600">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              <span className="inline-flex items-center gap-2">
                {loading && (
                  <span
                    className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
                    aria-hidden="true"
                  />
                )}
                {loading ? "Creating..." : "Submit"}
              </span>
            </Button>

            <div>
              <span className="text-sm text-gray-700">
                By continuing to use our service means that you have read and
                agree to
                <span className="text-blue-800 underline"> Terms </span>
                and <span className="text-blue-800 underline"> Privacy </span>
              </span>
            </div>

            <div className="w-full flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300" aria-hidden="true"></div>
              <span className="text-sm text-gray-500">Log in with</span>
              <div className="h-px flex-1 bg-gray-300" aria-hidden="true"></div>
            </div>

            <div className="flex justify-center">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/google-logo.png"
                alt="google-logo"
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-black">
                You have Account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Sing In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}