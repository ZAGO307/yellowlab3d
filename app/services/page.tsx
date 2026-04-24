"use client";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const MATERIALS = [
  { name: "PLA", use: "Décoration, prototypes, pièces légères", temp: "60°C", prix: "0,07 CHF/g", detail: "Matériau le plus courant. Facile à imprimer, bonne résistance pour un usage général." },
  { name: "PETG", use: "Usage général, pièces résistantes à l'humidité", temp: "80°C", prix: "0,08 CHF/g", detail: "Plus solide que le PLA, résistant à l'humidité. Idéal pour des pièces fonctionnelles." },
  { name: "ABS", use: "Pièces techniques, résistance thermique élevée", temp: "100°C", prix: "0,09 CHF/g", detail: "Résistant à la chaleur et aux chocs. Parfait pour les environnements exigeants." },
];

const INCLUDED = [
  "Supports retirés inclus",
  "Contrôle qualité à la sortie",
  "Fichier vérifié avant impression",
  "Paiement sécurisé Stripe",
  "Email de confirmation",
  "Remboursement si fichier non imprimable",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 grid-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400 opacity-5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">Tarifs transparents · Genève</span>
          <h1 className="section-title mt-2">
            Services &amp;<br /><span className="text-yellow-400">Tarifs</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-xl text-lg leading-relaxed">
            Impression FDM uniquement. Pas de surprise — des tarifs clairs calculés au gramme de matière utilisée.
          </p>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Technologie</span>
            <h2 className="section-title mt-2">Impression <span className="text-yellow-400">FDM</span></h2>
            <p className="text-gray-400 mt-4 max-w-xl">Dépôt de filament fondu — idéal pour prototypes solides, pièces fonctionnelles et petites séries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MATERIALS.map((m) => (
              <div key={m.name} className="border border-gray-800 hover:border-yellow-400/50 p-8 transition-all">
                <div className="font-display text-5xl text-white uppercase mb-4">{m.name}</div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{m.detail}</p>
                <div className="space-y-2 text-sm border-t border-gray-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Usage</span>
                    <span className="text-gray-300 text-right max-w-[60%]">{m.use}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Temp. max</span>
                    <span className="text-gray-300">{m.temp}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-900">
                    <span className="text-gray-400 font-medium">Prix</span>
                    <span className="text-yellow-400 font-display text-2xl">{m.prix}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-sm mt-6">* Prix calculé sur le poids réel de matière utilisée. Ajusté après impression si nécessaire.</p>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Inclus dans chaque commande</span>
            <h2 className="section-title mt-2">Sans <span className="text-yellow-400">frais cachés</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INCLUDED.map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 border border-gray-800">
                <Check size={16} className="text-yellow-400 shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Livraison</span>
            <h2 className="section-title mt-2">Options de <span className="text-yellow-400">livraison</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            {[
              { label: "Swiss Post Standard", delay: "48–72h", price: "7,00 CHF" },
              { label: "Swiss Post Priority", delay: "48h", price: "15,00 CHF" },
              { label: "Retrait en atelier", delay: "Sur rendez-vous · Genève", price: "Gratuit" },
            ].map((d) => (
              <div key={d.label} className="border border-gray-800 p-6 hover:border-yellow-400/40 transition-colors">
                <div className="font-display text-lg text-white uppercase mb-1">{d.label}</div>
                <div className="text-gray-500 text-sm mb-4">{d.delay}</div>
                <div className="text-yellow-400 font-display text-2xl">{d.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl uppercase text-black leading-none">
            Prêt à imprimer ?
          </h2>
          <p className="mt-4 text-black/70 text-lg">Uploadez votre fichier et obtenez un devis en 2 minutes.</p>
          <div className="mt-8">
            <Link
              href="/order"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-yellow-400 font-display text-2xl uppercase tracking-wider hover:bg-gray-900 transition-colors"
              style={{clipPath:'polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))'}}
            >
              Commander maintenant <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
