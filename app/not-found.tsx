import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 grid-bg">
      <div className="text-center">
        <div className="font-display text-[20vw] text-yellow-400/10 leading-none select-none">404</div>
        <h1 className="font-display text-4xl md:text-6xl text-white uppercase -mt-8 relative z-10">
          Page <span className="text-yellow-400">introuvable</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link href="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link href="/order" className="btn-secondary">
            Passer une commande
          </Link>
        </div>
      </div>
    </section>
  );
}
