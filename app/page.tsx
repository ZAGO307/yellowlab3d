"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowRight, Zap, Shield, Clock, Star, ChevronDown,
  Layers, Box, Wrench, Paintbrush
} from "lucide-react";

/* ─── Marquee data ─── */
const MARQUEE = [
  "FDM", "Résine", "Prototypage", "Série", "Post-Traitement",
  "Peinture", "Modélisation", "Livraison 24h", "Qualité Pro",
];

/* ─── Stats ─── */
const STATS = [
  { value: "500+", label: "Projets livrés" },
  { value: "24h", label: "Délai moyen" },
  { value: "0.05mm", label: "Précision max" },
  { value: "98%", label: "Clients satisfaits" },
];

/* ─── Services ─── */
const SERVICES = [
  {
    icon: Layers,
    title: "Impression FDM",
    desc: "Filament fondu — idéal pour pièces fonctionnelles, prototypes solides et grandes séries.",
    price: "dès 0,05 €/g",
    tag: "Populaire",
  },
  {
    icon: Box,
    title: "Impression Résine",
    desc: "Haute résolution UV — parfait pour bijoux, figurines, dentaire et pièces ultra-détaillées.",
    price: "dès 0,15 €/g",
    tag: "Premium",
  },
  {
    icon: Wrench,
    title: "Post-traitement",
    desc: "Ponçage, primer, assemblage — on transforme votre pièce brute en produit fini.",
    price: "dès 5 €",
    tag: "Add-on",
  },
  {
    icon: Paintbrush,
    title: "Peinture & Finition",
    desc: "Peinture aérosol, patine, vernis — des finitions dignes d'un studio professionnel.",
    price: "dès 15 €",
    tag: "Add-on",
  },
];

/* ─── Process steps ─── */
const STEPS = [
  { num: "01", title: "Uploadez votre fichier", desc: "STL, OBJ, STEP, SolidWorks — on accepte tous les formats." },
  { num: "02", title: "Choisissez vos options", desc: "Matériau, couleur, qualité, finition — tout est personnalisable." },
  { num: "03", title: "Payez en ligne", desc: "Paiement sécurisé par carte, virement ou PayPal." },
  { num: "04", title: "Recevez votre pièce", desc: "Livraison en 24 à 72h selon la complexité de votre projet." },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: "Lucas Moreau",
    role: "Ingénieur mécanicien",
    text: "Qualité irréprochable, délais tenus. J'ai commandé 30 pièces pour un prototype, tout était parfait.",
  },
  {
    name: "Camille Dupont",
    role: "Designer produit",
    text: "Le post-traitement est bluffant. On ne dirait pas du tout de l'impression 3D. Je recommande vivement.",
  },
  {
    name: "Antoine Bernard",
    role: "Startup fondateur",
    text: "Tarifs clairs, réactivité top, livraison en 24h. C'est mon partenaire fabrication de référence.",
  },
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
        {/* Yellow accent blob */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-400 opacity-5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-yellow-400 opacity-5 blur-3xl rounded-full pointer-events-none" />

        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display text-[22vw] text-white/[0.02] uppercase tracking-tighter leading-none whitespace-nowrap"
          >
            YLAB
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            <div
              className="animate-fade-up opacity-0 reveal"
              style={{ transitionDuration: "0.6s", transition: "opacity 0.6s, transform 0.6s" }}
            >
              <span className="section-tag">Service professionnel</span>
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
              De la conception à la livraison en 24h. FDM, résine, post-traitement — 
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

            {/* Trust badges */}
            <div
              className="flex flex-wrap gap-6 mt-12 animate-fade-up opacity-0 reveal"
              style={{ transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s" }}
            >
              {[
                { icon: Zap, label: "Livraison express 24h" },
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

        {/* Scroll indicator */}
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

      {/* ═══ STATS ═══ */}
      <section className="py-20 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="text-center reveal opacity-0"
                style={{ transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s` }}
              >
                <div className="font-display text-5xl md:text-6xl text-yellow-400">{s.value}</div>
                <div className="text-gray-500 text-sm uppercase tracking-widest mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                {/* Step number */}
                <div className="font-display text-7xl text-gray-900 select-none mb-4">{s.num}</div>
                <h3 className="font-display text-xl text-white uppercase tracking-wide mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                {/* Arrow between steps */}
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
              <span className="inline-block px-3 py-1 text-xs font-body tracking-widest uppercase border border-black/30 text-black/60 mb-4">
                Matériaux
              </span>
              <h2 className="font-display text-5xl md:text-7xl uppercase text-black leading-none">
                Plus de<br />20 matériaux<br />disponibles.
              </h2>
              <p className="mt-6 text-black/70 text-lg max-w-md leading-relaxed">
                PLA, PETG, ABS, TPU, Nylon, résine standard, résine flexible, résine castable et bien plus. 
                Le matériau parfait pour chaque application.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-black text-yellow-400 font-display text-xl tracking-wider uppercase transition-all hover:bg-gray-900"
                style={{clipPath:'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))'}}
              >
                Voir les matériaux <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["PLA", "PETG", "ABS", "TPU", "Résine", "Nylon", "FLEX", "Composite"].map((m) => (
                <div key={m} className="bg-black/10 border border-black/20 p-4 hover:bg-black/20 transition-colors">
                  <span className="font-display text-2xl text-black uppercase">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 bg-black grid-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center reveal opacity-0" style={{ transition: "opacity 0.6s, transform 0.6s" }}>
            <span className="section-tag">Témoignages</span>
            <h2 className="section-title mt-2">
              Ils nous font <span className="text-yellow-400">confiance.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="card p-8 reveal opacity-0"
                style={{ transition: `opacity 0.6s ${i * 0.15}s, transform 0.6s ${i * 0.15}s, border-color 0.2s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
                  <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center font-display text-black text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SNIPPET ═══ */}
      <section className="py-24 border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center reveal opacity-0" style={{ transition: "opacity 0.6s, transform 0.6s" }}>
            <span className="section-tag">FAQ</span>
            <h2 className="section-title mt-2">
              Questions <span className="text-yellow-400">fréquentes</span>
            </h2>
          </div>

          {[
            { q: "Quels formats de fichiers acceptez-vous ?", a: "Nous acceptons STL, OBJ, STEP, STP, SolidWorks (.sldprt), Fusion 360, et plus. Si votre format n'est pas dans la liste, contactez-nous." },
            { q: "Quel est le délai de livraison ?", a: "La majorité de nos commandes sont expédiées en 24 à 72h. Pour les grandes séries ou les finitions complexes, comptez 5 à 7 jours ouvrés." },
            { q: "Puis-je commander en petite quantité ?", a: "Absolument. On accepte à partir d'une seule pièce. Plus vous commandez, plus le coût unitaire diminue." },
            { q: "Comment est calculé le prix ?", a: "Le prix dépend du poids de matière, de la technologie choisie (FDM ou résine), et des options de finition. Obtenez un devis instantané sur notre page commande." },
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
