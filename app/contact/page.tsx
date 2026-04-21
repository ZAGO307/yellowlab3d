"use client";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-16 px-6 grid-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400 opacity-5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">Nous contacter</span>
          <h1 className="section-title mt-2">
            On est là<br /><span className="text-yellow-400">pour vous.</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl text-lg">
            Une question sur votre projet, un devis particulier, ou besoin de conseils ? Notre équipe répond sous 2h en moyenne.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-6">Informations</h2>
              <ul className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "contact@yellowlab3d.fr", href: "mailto:contact@yellowlab3d.fr" },
                  { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
                  { icon: MapPin, label: "Adresse", value: "12 Rue de la Fabrication\n75011 Paris, France", href: "#" },
                  { icon: Clock, label: "Horaires", value: "Lun–Ven : 9h–18h\nSam : 10h–14h", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-yellow-400/30 bg-yellow-400/5 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-gray-300 hover:text-yellow-400 transition-colors text-sm whitespace-pre-line leading-relaxed">
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-800 p-6">
              <h3 className="font-display text-lg text-white uppercase tracking-wide mb-3">Réponse rapide</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Pour les questions urgentes, appelez-nous directement. Pour les devis, utilisez le formulaire de commande — vous obtiendrez un prix immédiat.
              </p>
              <a href="/order" className="btn-primary mt-4 text-sm px-5 py-3">
                Devis instantané →
              </a>
            </div>

            {/* Map placeholder */}
            <div className="border border-gray-800 h-48 flex items-center justify-center bg-black/40 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="text-center relative z-10">
                <MapPin size={32} className="text-yellow-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">75011 Paris, France</p>
                <a
                  href="https://maps.google.com/?q=75011+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 text-xs hover:underline"
                >
                  Voir sur Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <CheckCircle size={64} className="text-yellow-400 mb-6" />
                <h3 className="font-display text-4xl text-white uppercase">Message envoyé !</h3>
                <p className="text-gray-400 mt-4 max-w-md">
                  Merci pour votre message. Notre équipe vous répondra dans les 2h ouvrées.
                </p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }} className="btn-secondary mt-8">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-8">Envoyer un message</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Nom complet *</label>
                    <input
                      required
                      className="input-field w-full"
                      placeholder="Jean Dupont"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      className="input-field w-full"
                      placeholder="jean@exemple.fr"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Sujet *</label>
                  <select
                    required
                    className="input-field w-full"
                    value={form.subject}
                    onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  >
                    <option value="">Choisissez un sujet</option>
                    <option>Demande de devis</option>
                    <option>Question technique</option>
                    <option>Suivi de commande</option>
                    <option>Partenariat</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Message *</label>
                  <textarea
                    required
                    rows={6}
                    className="input-field w-full resize-none"
                    placeholder="Décrivez votre projet, vos besoins, vos questions…"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">Une erreur est survenue. Veuillez réessayer ou nous contacter par email directement.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center text-lg disabled:opacity-50"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Envoi en cours…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} /> Envoyer le message
                    </span>
                  )}
                </button>
                <p className="text-gray-600 text-xs">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour traiter votre demande. Voir notre{" "}
                  <a href="/confidentialite" className="text-yellow-400/70 hover:text-yellow-400">politique de confidentialité</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ quick */}
      <section className="py-16 px-6 border-t border-gray-900 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-white uppercase tracking-wide mb-8 text-center">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: "Quels formats acceptez-vous ?", a: "STL, OBJ, STEP, STP, 3MF, SolidWorks, Fusion 360, et plus." },
              { q: "Quel est le délai de réponse ?", a: "Nous répondons en moins de 2h en jours ouvrés." },
              { q: "Faites-vous des remises pour les pros ?", a: "Oui ! Contactez-nous pour un tarif volume ou contrat mensuel." },
              { q: "Puis-je venir en atelier ?", a: "Oui sur rendez-vous à Paris (75011). Contactez-nous pour convenir d'un horaire." },
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-800 p-5 hover:border-yellow-400/40 transition-all">
                <p className="font-display text-base text-white uppercase tracking-wide mb-2">{q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
