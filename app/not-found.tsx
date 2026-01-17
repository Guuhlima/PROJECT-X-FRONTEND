import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-7xl font-black tracking-tight">404</div>
        <h1 className="mt-4 text-3xl font-semibold">Pagina nao encontrada</h1>
        <p className="mt-3 text-white/70">
          A pagina que voce tentou acessar nao existe ou foi movida.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/home"
            className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Voltar para o inicio
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:border-white/60 transition"
          >
            Falar com suporte
          </Link>
        </div>
      </div>
    </main>
  );
}
