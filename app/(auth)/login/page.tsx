"use client"

import Button from "@/app/shared/components/Button/Button"
import Input from "@/app/shared/components/Input/Input"
import Link from "next/link"
import FutureTrail from "../../shared/components/FutureTrail"
import GoogleButton from "@/app/shared/components/Button/GoogleButton"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
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

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Senha</label>
                  <Link
                    href="/recover-password"
                    type="button"
                    className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    Esqueci minha senha
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="Sua senha" />
              </div>

              <Button
                className="w-full py-2.5"
                type="button"
                onClick={() => router.push("/home")}
              >
                Entrar
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
                    console.log("ID Token", token)
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
