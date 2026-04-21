"use client";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    subtitle: "Pièces simples & tests",
    price: null,
    unit: "calculé par poids",
    highlight: false,
    features: [
      "Impression FDM standard",
      "Matériaux PLA / PETG",
      "Résolution 0.2 mm",
      "Couleur au choix (stock disponible)",
      "Délai 48–72h",
      "Livraison Colissimo",
    ],
    rates: [{ label: "FDM (poids matière)", price: "0,05 €/g" }],
    cta: "Commander",
  },
  {
    name: "Pro",
    subtitle: "Prototypes & séries",
    price: null,
    unit: "calculé par poids",
    highlight: true,
    features: [
      "FDM haute qualité OU Résine UV",
      "Tous matériaux (ABS, Nylon, TPU, PETG-CF…)",
      "Résolution jusqu'à 0.05 mm (résine)",
      "Post-traitement inclus",
      "Délai prioritaire 24h",
      "Livraison suivie express",
      "Support dédié",
    ],
    rates: [
      { label: "FDM Pro (0.1 mm)", price: "0,08 €/g" },
      { label: "Résine standard", price: "0,15 €/g" },
      { label: "Résine Engineering", price: "0,25 €/g" },
    ],
    cta: "Commander Pro",
  },
  {
    name: "Studio",
    subtitle: "Finitions & grandes séries",
    price: null,
    unit: "sur devis",
    highlight: false,
    features: [
      "Tout du plan Pro",
      "Peinture professionnelle",
      "Assemblage multi-pièces",
      "Conditionnement personnalisé",
      "Account manager dédié",
      "Facturation mensuelle possible",
      "NDA disponible",
    ],
    rates: [
      { label: "Volume > 1 kg (FDM)", price: "0,04 €/g" },
      { label: "Volume > 500 g (Résine)", price: "0,12 €/g" },
    ],
    cta: "Demander un devis",
  },
];

const ADDONS = [
  { name: "Post-traitement (ponçage)", price: "5 € / pièce" },
  { name: "Primer de surface", price: "8 € / pièce" },
  { name: "Peinture monocouleur", price: "15 € / pièce" },
  { name: "Peinture multicouleur", price: "25–60 € / pièce" },
  { name: "Patine / effets vieilli", price: "20–50 € / pièce" },
  { name: "Vernis mat / brillant", price: "5 € / pièce" },
  { name: "Inserts filetés", price: "2 € / insert" },
  { name: "Modélisation 3D (design fichier)", price: "50 €/h" },
  { name: "Réparation de fichier STL", price: "15 €/fichier" },
  { name: "Emballage cadeau", price: "5 € / colis" },
];

const MATERIALS = [
  { name: "PLA", tech: "FDM", use: "Décoration, prototypes légers", temp: "60°C", prix: "0,05 €/g" },
  { name: "PETG", tech: "FDM", use: "Usage général, pièces solides", temp: "80°C", prix: "0,06 €/g" },
  { name: "ABS", tech: "FDM", use: "Pièces techniques, post-traitement acétone", temp: "100°C", prix: "0,07 €/g" },
  { name: "TPU", tech: "FDM", use: "Flexible, coques, joints", temp: "60°C", prix: "0,09 €/g" },
  { name: "Nylon PA12", tech: "FDM", use: "Mécanisme, résistance à la fatigue", temp: "120°C", prix: "0,12 €/g" },
  { name: "PETG-CF", tech: "FDM", use: "Rigide, fibres carbone", temp: "90°C", prix: "0,14 €/g" },
  { name: "Résine Std", tech: "Résine", use: "Détails fins, figurines, bijoux", temp: "50°C", prix: "0,15 €/g" },
  { name: "Résine Eng.", tech: "Résine", use: "Dentaire, prototypage précis", temp: "70°C", prix: "0,25 €/g" },
  { name: "Résine Flex.", tech: "Résine", use: "Pièces souples et détaillées", temp: "40°C", prix: "0,20 €/g" },
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
            Pas de surprise. Pas de frais cachés. Des tarifs clairs calculés au gramme de matière utilisée.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
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
                  <div className="mt-4">
                    <span className="text-yellow-400 text-sm uppercase tracking-widest">{plan.unit}</span>
                  </div>
                </div>

                {/* Rates */}
                <div className="mb-6 space-y-2 border-b border-gray-800 pb-6">
                  {plan.rates.map((r) => (
                    <div key={r.label} className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{r.label}</span>
                      <span className="font-display text-lg text-yellow-400">{r.price}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
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

      {/* Add-ons */}
      <section className="py-20 px-6 bg-black border-y border-gray-900 grid-bg">
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

      {/* Materials table */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-tag">Matériaux</span>
            <h2 className="section-title mt-2">Tableau <span className="text-yellow-400">comparatif</span></h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-yellow-400/30">
                  {["Matériau", "Technologie", "Usage recommandé", "Temp. max", "Prix"].map((h) => (
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
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 text-xs uppercase tracking-wider border ${m.tech === "Résine" ? "border-yellow-400/50 text-yellow-400" : "border-gray-600 text-gray-400"}`}>
                        {m.tech}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{m.use}</td>
                    <td className="py-4 px-4 text-gray-500">{m.temp}</td>
                    <td className="py-4 px-4 font-display text-lg text-yellow-400">{m.prix}</td>
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
