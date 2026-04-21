import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <section className="min-h-screen pt-36 pb-24 px-6 grid-bg flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-yellow-400/10 border-2 border-yellow-400 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} className="text-yellow-400" />
        </div>

        <h1 className="font-display text-6xl md:text-8xl uppercase text-white leading-none">
          Commande <span className="text-yellow-400">confirmée !</span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg leading-relaxed">
          Merci pour votre commande. Notre équipe va analyser votre fichier et commencer l'impression très prochainement.
          Vous recevrez un email de confirmation avec les détails de suivi.
        </p>

        <div className="mt-10 p-6 border border-yellow-400/30 bg-yellow-400/5 text-left space-y-3">
          <h3 className="font-display text-xl text-yellow-400 uppercase">Et maintenant ?</h3>
          {[
            "📧 Un email de confirmation vous a été envoyé",
            "🔍 Notre équipe analyse votre fichier sous 2h",
            "🖨️ L'impression démarre dans les 24h",
            "📦 Livraison selon le mode choisi (24–72h)",
          ].map((step) => (
            <p key={step} className="text-gray-300 text-sm">{step}</p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <Link href="/" className="btn-primary">
            Retour à l'accueil <ArrowRight size={18} />
          </Link>
          <Link href="/order" className="btn-secondary">
            Passer une autre commande
          </Link>
        </div>

        <p className="mt-8 text-gray-600 text-sm">
          Une question ? Contactez-nous à{" "}
          <a href="mailto:contact@yellowlab3d.fr" className="text-yellow-400 hover:underline">
            contact@yellowlab3d.fr
          </a>
        </p>
      </div>
    </section>
  );
}
