"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowRight, Zap, Shield, Clock, ChevronDown,
  Layers, Wrench,
} from "lucide-react";

/* ─── Marquee data ─── */
const MARQUEE = [
  "FDM", "PLA", "PETG", "ABS", "Prototypage", "Série",
  "Post-Traitement", "Assemblage", "Livraison rapide", "Qualité Pro",
];

/* ─── Services ─── */
const SERVICES = [
  {
    icon: Layers,
    title: "Impression FDM — PLA",
    desc: "Idéal pour prototypes, déco, pièces légères. Matière économique, grande variété de couleurs.",
    price: "dès 0.05 CHF/g",
    tag: "Populaire",
  },
  {
    icon: Layers,
    title: "Impression FDM — PETG",
    desc: "Usage général, bonne résistance mécanique et thermique. Parfait pour pièces fonctionnelles.",
    price: "dès 0.05 CHF/g",
    tag: "Polyvalent",
  },
  {
    icon: Layers,
    title: "Impression FDM — ABS",
    desc: "Pièces techniques, résistance à la chaleur, post-traitement à l'acétone possible.",
    price: "dès 0.06 CHF/g",
    tag: "Technique",
  },
  {
    icon: Wrench,
    title: "Assemblage & Finition",
    desc: "Ponçage, assemblage multi-pièces, inserts filetés — la pièce brute devient un produit fini.",
    price: "dès 8 CHF",
    tag: "Add-on",
  },
];

/* ─── Process steps ─── */
const STEPS = [
  { num: "01", title: "Uploadez votre fichier", desc: "STL, OBJ, STEP, 3MF — on accepte tous les formats." },
  { num: "02", title: "Choisissez vos options", desc: "Matériau, couleur, qualité, finition — tout est personnalisable." },
  { num: "03", title: "Payez en ligne", desc: "Paiement sécurisé par carte ou virement." },
  { num: "04", title: "Recevez votre pièce", desc: "Livraison en 2 à 5 jours ouvrés selon la complexité." },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-20"
      >
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-400 opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-yellow-400 opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[22vw] text-white/[0.02] uppercase tracking-tighter leading-none whitespace-nowrap">
            YLAB
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="animate-fade-up opacity-0 reveal" style={{ transitionDuration: "0.6s", transition: "opacity 0.6s, transform 0.6s" }}>
              <span className="section-tag">Service professionnel — Genève</span>
            </div>
            <h1
              className="font-display uppercase leading-none mt-4 animate-fade-up opacity-0 reveal"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s" }}
            >
              L'impression 3D
              <br />
              <span className="text-yellow-400">sans compromis.</span>
            </h1>
            <p
              className="mt-8 text-lg text-gray-400 max-w-xl leading-relaxed animate-fade-up opacity-0 reveal"
              style={{ transition: "opacity 0.6s 0.2s, transform 0.6s 0.2s" }}
            >
              De la conception à la livraison. FDM haute qualité — PLA, PETG, ABS —
              YellowLAB3D transforme vos fichiers en pièces réelles avec une précision industrielle.
            </p>
            <div
              className="flex flex-wrap gap-4 mt-10 animate-fade-up opacity-0 reveal"
              style={{ transition: "opacity 0.6s 0.3s, transform 0.6s 0.3s" }}
            >
              <Link href="/order" className="btn-primary text-lg">
                Commander maintenant <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-secondary text-lg">
                Voir les tarifs
              </Link>
            </div>
            <div
              className="flex flex-wrap gap-6 mt-12 animate-fade-up opacity-0 reveal"
              style={{ transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s" }}
            >
              {[
                { icon: Zap, label: "Livraison Suisse & France" },
                { icon: Shield, label: "Paiement sécurisé" },
                { icon: Clock, label: "Devis en 2 minutes" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon size={14} className="text-yellow-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Découvrir</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="bg-yellow-400 py-4 overflow-hidden border-y border-yellow-600">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="font-display text-black text-xl uppercase tracking-wider mx-8">
              {item} <span className="text-black/40 mx-2">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ SERVICES ═══ */}
      <section className="py-24 grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 reveal opacity-0" style={{ transition: "opacity 0.6s, transform 0.6s" }}>
            <span className="section-tag">Ce qu'on fait</span>
            <h2 className="section-title mt-2">
              Nos <span className="text-yellow-400">services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="card p-6 reveal opacity-0"
                  style={{ transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s, border-color 0.2s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                      <Icon size={20} className="text-yellow-400" />
                    </div>
                    <span className="text-xs uppercase tracking-wider px-2 py-1 border border-gray-700 text-gray-500">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="mt-auto pt-4 border-t border-gray-800">
                    <span className="text-yellow-400 font-display text-lg">{s.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center reveal opacity-0" style={{ transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s" }}>
            <Link href="/services" className="btn-secondary">
              Voir tous les tarifs →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 reveal opacity-0" style={{ transition: "opacity 0.6s, transform 0.6s" }}>
            <span className="section-tag">Comment ça marche</span>
            <h2 className="section-title mt-2">
              Simple.<br /><span className="text-yellow-400">Rapide.</span> Précis.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className="relative p-8 border border-gray-800 hover:border-yellow-400/50 transition-colors reveal opacity-0"
                style={{ transition: `opacity 0.6s ${i * 0.15}s, transform 0.6s ${i * 0.15}s, border-color 0.2s` }}
              >
                <div className="font-display text-7xl text-gray-900 select-none mb-4">{s.num}</div>
                <h3 className="font-display text-xl text-white uppercase tracking-wide mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <div className="w-6 h-px bg-yellow-400" />
                    <div className="w-2 h-2 border-t border-r border-yellow-400 rotate-45 absolute -right-1 -top-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal opacity-0" style={{ transition: "opacity 0.6s 0.6s, transform 0.6s 0.6s" }}>
            <Link href="/order" className="btn-primary text-lg">
              Commencer mon projet <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MATERIALS FEATURE ═══ */}
      <section className="py-24 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase border border-black/30 text-black/60 mb-4">
                Matériaux
              </span>
              <h2 className="font-display text-5xl md:text-7xl uppercase text-black leading-none">
                3 matériaux<br />sélectionnés<br />avec soin.
              </h2>
              <p className="mt-6 text-black/70 text-lg max-w-md leading-relaxed">
                PLA, PETG, ABS — chaque matériau est choisi pour sa qualité, sa fiabilité
                et son adéquation avec votre projet. Imprimés sur Bambu Lab P1S.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-black text-yellow-400 font-display text-xl tracking-wider uppercase transition-all hover:bg-gray-900"
                style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
              >
                Voir les matériaux <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "PLA", desc: "Décoration, prototypes, usage général", price: "0.05 CHF/g" },
                { name: "PETG", desc: "Pièces fonctionnelles, bonne résistance", price: "0.05 CHF/g" },
                { name: "ABS", desc: "Pièces techniques, résistance thermique", price: "0.06 CHF/g" },
              ].map((m) => (
                <div key={m.name} className="bg-black/10 border border-black/20 p-5 hover:bg-black/20 transition-colors flex items-center justify-between">
                  <div>
                    <span className="font-display text-2xl text-black uppercase">{m.name}</span>
                    <p className="text-black/60 text-sm mt-1">{m.desc}</p>
                  </div>
                  <span className="font-display text-xl text-black">{m.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center reveal opacity-0" style={{ transition: "opacity 0.6s, transform 0.6s" }}>
            <span className="section-tag">FAQ</span>
            <h2 className="section-title mt-2">
              Questions <span className="text-yellow-400">fréquentes</span>
            </h2>
          </div>
          {[
            { q: "Quels formats de fichiers acceptez-vous ?", a: "Nous acceptons STL, OBJ, STEP, STP et 3MF. Si votre format n'est pas dans la liste, contactez-nous." },
            { q: "Livrez-vous en dehors de la Suisse ?", a: "Oui, nous livrons en Suisse et en France via La Poste Suisse. Les frais de port sont calculés automatiquement selon votre adresse et le poids de la commande." },
            { q: "Puis-je commander en petite quantité ?", a: "Absolument, à partir d'une seule pièce. Le tarif minimum est de 8 CHF par commande." },
            { q: "Comment est calculé le prix ?", a: "Le prix dépend du poids de matière imprimée, du matériau choisi (PLA, PETG ou ABS), et des options de finition. Les prix incluent l'électricité et une marge transparente." },
          ].map((faq, i) => (
            <div
              key={i}
              className="border-b border-gray-800 py-6 reveal opacity-0"
              style={{ transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s` }}
            >
              <h3 className="font-display text-xl text-white uppercase tracking-wide mb-2">
                <span className="text-yellow-400 mr-3">→</span>{faq.q}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
          <div className="text-center mt-10">
            <Link href="/contact" className="btn-secondary">
              Poser une autre question →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
