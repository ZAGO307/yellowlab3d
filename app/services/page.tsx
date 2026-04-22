"use client";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "PLA",
    subtitle: "Décoration & prototypes",
    highlight: false,
    features: [
      "Impression FDM — Bambu Lab P1S",
      "Résolution 0.2 mm standard",
      "Grande variété de couleurs",
      "Délai 2–4 jours ouvrés",
      "Livraison Suisse & France",
    ],
    rates: [{ label: "Prix au gramme (matière + élec.)", price: "0.05 CHF/g" }],
    cta: "Commander",
  },
  {
    name: "PETG",
    subtitle: "Usage général & fonctionnel",
    highlight: true,
    features: [
      "Impression FDM — Bambu Lab P1S",
      "Résolution 0.2 mm standard",
      "Résistance mécanique & thermique",
      "Idéal pièces fonctionnelles",
      "Délai 2–4 jours ouvrés",
      "Livraison Suisse & France",
    ],
    rates: [{ label: "Prix au gramme (matière + élec.)", price: "0.05 CHF/g" }],
    cta: "Commander",
  },
  {
    name: "ABS",
    subtitle: "Pièces techniques",
    highlight: false,
    features: [
      "Impression FDM — Bambu Lab P1S",
      "Résolution 0.2 mm standard",
      "Résistance thermique jusqu'à 100°C",
      "Post-traitement acétone possible",
      "Délai 2–5 jours ouvrés",
      "Livraison Suisse & France",
    ],
    rates: [{ label: "Prix au gramme (matière + élec.)", price: "0.06 CHF/g" }],
    cta: "Commander",
  },
];

const ADDONS = [
  { name: "Ponçage de surface", price: "8 CHF / pièce" },
  { name: "Primer de surface", price: "10 CHF / pièce" },
  { name: "Inserts filetés (M2–M8)", price: "2 CHF / insert" },
  { name: "Assemblage multi-pièces", price: "15 CHF / assemblage" },
  { name: "Réparation de fichier STL", price: "15 CHF / fichier" },
  { name: "Emballage soigné", price: "5 CHF / colis" },
];

const MATERIALS = [
  { name: "PLA", use: "Décoration, prototypes, maquettes", temp: "60°C", prix: "0.05 CHF/g", couleurs: "Blanc, Noir, Gris, Rouge, Bleu, Jaune" },
  { name: "PETG", use: "Pièces fonctionnelles, usage général", temp: "80°C", prix: "0.05 CHF/g", couleurs: "Transparent, Noir, Blanc, Gris" },
  { name: "ABS", use: "Pièces techniques, résistance chaleur", temp: "100°C", prix: "0.06 CHF/g", couleurs: "Noir, Blanc, Gris" },
];

const SHIPPING = [
  { zone: "Suisse (jusqu'à 500g)", price: "7.00 CHF", delay: "2–3 jours" },
  { zone: "Suisse (500g – 2kg)", price: "9.00 CHF", delay: "2–3 jours" },
  { zone: "Suisse (2kg – 10kg)", price: "13.00 CHF", delay: "2–3 jours" },
  { zone: "France (jusqu'à 500g)", price: "15.00 CHF", delay: "4–6 jours" },
  { zone: "France (500g – 2kg)", price: "22.00 CHF", delay: "4–6 jours" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-6 grid-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400 opacity-5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">Tarifs transparents</span>
          <h1 className="section-title mt-2">
            Services &<br /><span className="text-yellow-400">Tarifs</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-xl text-lg leading-relaxed">
            Pas de surprise. Pas de frais cachés. Des tarifs en CHF calculés au gramme de matière utilisée,
            électricité genevoise et matériaux Bambu Lab inclus.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="section-tag">Matériaux disponibles</span>
            <h2 className="section-title mt-2">Choisissez votre <span className="text-yellow-400">matériau</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 border transition-all duration-200 ${
                  plan.highlight
                    ? "border-yellow-400 yellow-glow bg-yellow-400/5"
                    : "border-gray-800 hover:border-yellow-400/40"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-8">
                    <span className="bg-yellow-400 text-black font-display text-sm px-4 py-1 uppercase tracking-wider">
                      Recommandé
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-3xl text-white uppercase">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.subtitle}</p>
                </div>
                <div className="mb-6 border-b border-gray-800 pb-6">
                  {plan.rates.map((r) => (
                    <div key={r.label} className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{r.label}</span>
                      <span className="font-display text-2xl text-yellow-400">{r.price}</span>
                    </div>
                  ))}
                  <p className="text-gray-600 text-xs mt-2">Minimum de commande : 8 CHF</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/order"
                  className={plan.highlight ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}
                >
                  {plan.cta} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials table */}
      <section className="py-20 px-6 bg-black border-y border-gray-900 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Matériaux</span>
            <h2 className="section-title mt-2">Tableau <span className="text-yellow-400">comparatif</span></h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-yellow-400/30">
                  {["Matériau", "Usage recommandé", "Temp. max", "Couleurs disponibles", "Prix/g"].map((h) => (
                    <th key={h} className="text-left py-4 px-4 font-display text-base text-yellow-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m, i) => (
                  <tr key={m.name} className={`border-b border-gray-900 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                    <td className="py-4 px-4 font-display text-lg text-white">{m.name}</td>
                    <td className="py-4 px-4 text-gray-400">{m.use}</td>
                    <td className="py-4 px-4 text-gray-500">{m.temp}</td>
                    <td className="py-4 px-4 text-gray-400 text-xs">{m.couleurs}</td>
                    <td className="py-4 px-4 font-display text-lg text-yellow-400">{m.prix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-xs mt-4">
            Prix calculés sur la base du filament Bambu Lab, électricité SIG Genève (0.28 CHF/kWh), imprimante P1S. Marge de 50% incluse.
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Extras</span>
            <h2 className="section-title mt-2">Options <span className="text-yellow-400">& finitions</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between p-4 border border-gray-800 hover:border-yellow-400/50 transition-all group"
              >
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{a.name}</span>
                <span className="font-display text-lg text-yellow-400 ml-4 shrink-0">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="py-20 px-6 bg-black border-t border-gray-900 grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Livraison</span>
            <h2 className="section-title mt-2">Tarifs <span className="text-yellow-400">postaux</span></h2>
            <p className="text-gray-500 mt-4 max-w-xl">Livraison via La Poste Suisse. Le tarif est calculé automatiquement selon votre adresse et le poids de votre commande.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-yellow-400/30">
                  {["Zone", "Tarif", "Délai estimé"].map((h) => (
                    <th key={h} className="text-left py-4 px-4 font-display text-base text-yellow-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SHIPPING.map((s, i) => (
                  <tr key={i} className={`border-b border-gray-900 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                    <td className="py-4 px-4 text-gray-300">{s.zone}</td>
                    <td className="py-4 px-4 font-display text-lg text-yellow-400">{s.price}</td>
                    <td className="py-4 px-4 text-gray-500">{s.delay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl uppercase text-black leading-none">
            Prêt à imprimer ?
          </h2>
          <p className="mt-4 text-black/70 text-lg">
            Uploadez votre fichier et obtenez un devis en 2 minutes.
          </p>
          <div className="mt-8">
            <Link
              href="/order"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-yellow-400 font-display text-2xl uppercase tracking-wider hover:bg-gray-900 transition-colors"
              style={{ clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))" }}
            >
              Commander maintenant <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
